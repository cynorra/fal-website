/**
 * Horoscopes and Charts article generator, adapted from the aiandsoftwarehub / practice-test-daily
 * pipelines for an astrology + dreams + numerology site with a Firestore backend.
 *
 *   npx tsx scripts/pipeline/generate.ts --dry-run        # write nothing; print the verdict
 *   npx tsx scripts/pipeline/generate.ts                  # one article -> Firestore as a draft
 *   npx tsx scripts/pipeline/generate.ts --date 2026-11-12
 *
 * Flow: pick the next topic from topics.ts that passes the topic gate and is not a duplicate ->
 * build its evidence (a worked example chart computed by the site's own calculator, plus the
 * facts block built from the site's reference tables) -> keyword plan (autocomplete) and an
 * editorial form chosen against the corpus -> Gemini writes structured JSON -> deterministic
 * gates -> repair passes with the gate messages -> if it passes, the validated bytes are
 * upserted to Firestore as status 'draft'. Nothing goes live here: auto-publish.ts runs the
 * independent AI audit and publishes.
 *
 * Rules (from the playbook): validated bytes = stored bytes; links to unknown slugs are
 * stripped before validation; truncated output fails; the final Gemini error is never
 * swallowed (exit code 1); nothing is claimed that cannot be checked.
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { initGemini, callGemini, slugify, isDuplicateTopic, fetchAllArticles, upsertArticle, SITE_NAME, SITE_NICHE, type ArticleRow } from './lib/shared';
import { TOPICS, type Topic } from './topics';
import { findTopicIssues, pageExists } from './lib/topic-gate';
import { factsFor, findUngroundedAstroFacts, findUngroundedAstroFactsHtml, findInventedHouseNames, findNumberedHeadings, findPastedQueries } from './lib/facts';
import { chartExampleFor, chartExampleBlock, findExampleUsageIssues, type ChartExample } from './lib/evidence';
import { buildKeywordPlan, keywordPromptBlock, findKeywordCoverageIssues, findPlannerKeywordIssues, plannerKeywordPromptBlock, type KeywordPlan } from './lib/keywords';
import { pickEditorialForm, formPromptBlock, findOpeningIssues, openingKey } from './lib/forms';
import { findLowValueSignals, findBridgeFiller, swapBannedVerbs, findGenericFaqAnswers } from './lib/value';
import { repairMechanical } from './lib/repair';
import { findFactsBlockCopy, findRepeatedSentences, findInventedQuotes } from './lib/copy-check';
import { findStockHeadings, findReusedHeadings, findStockLabels, collectHeadingSet } from './lib/structure';
import { findTitlePasteIssues } from './lib/title-paste';
import { findUnsupportedClaims, findTitlePromiseIssues } from './lib/claims-check';
import { findHypeIssues, findFieldClaimIssues, findBrokenInternalLinks } from './lib/hype-check';

// Long, many-constraint articles need real reasoning; the audit and other short calls keep the cheaper default.
process.env.GEMINI_THINKING ??= 'high';

const ROOT = join(import.meta.dirname, '..', '..');
const DRY = process.argv.includes('--dry-run');
const topicArg = process.argv.indexOf('--topic'); // --topic 4 forces the 5th topic in topics.ts (testing)
const dateArg = process.argv.indexOf('--date');
const PUBLISH_DATE = dateArg > -1 ? process.argv[dateArg + 1] : new Date().toISOString().slice(0, 10);
const MAX_OUTPUT_TOKENS = 16000;
const MIN_WORDS = 900;
const PLANNER_DATE = '2026-11-08';

// ---- output contract ----------------------------------------------------------------------
const SCHEMA = {
  type: 'object',
  properties: {
    title: { type: 'string' },
    metaDescription: { type: 'string' },
    quickAnswer: { type: 'string' },
    bodyHtml: { type: 'string' },
    faqs: { type: 'array', items: { type: 'object', properties: { question: { type: 'string' }, answer: { type: 'string' } }, required: ['question', 'answer'] } },
  },
  required: ['title', 'metaDescription', 'quickAnswer', 'bodyHtml', 'faqs'],
};
interface Draft { title: string; metaDescription: string; quickAnswer: string; bodyHtml: string; faqs: { question: string; answer: string }[] }

const SYSTEM = `You write for ${SITE_NAME}, a free site about ${SITE_NICHE}. You are precise, plain-spoken and honest. You treat astrology, numerology, angel numbers and dream symbolism as symbolic traditions for reflection and entertainment: you explain what the tradition says and how it is used, you never present a reading as a fact about the reader's future, and you say plainly where something is only a tradition or has no scientific support. You never invent facts, studies, statistics, quotes, dates, credentials or personal experiences, and you never claim to have tested, observed or experienced anything. You only state facts that are in the facts block or that are standard, well-established astronomy or arithmetic. You always return only the requested structured output.`;

function buildPrompt(topic: Topic, ex: ChartExample | undefined, plan: KeywordPlan, formBlock: string, candidates: ArticleRow[], feedback = '', previous = ''): string {
  const links = [
    ...topic.links.map((l) => `- ${l} (site page)`),
    ...candidates.filter((c) => c.status === 'published').slice(0, 25).map((c) => `- /blog/${c.slug} — ${c.title}`),
  ].join('\n');
  return `Write an article for this site.
Working title: "${topic.title}"
What this page must deliver that an AI Overview cannot: ${topic.asset}.
${plannerKeywordPromptBlock({ term: topic.keyword, volume: topic.volume, plannerDate: PLANNER_DATE })}
${keywordPromptBlock(plan)}
${factsFor(topic.cluster)}
${ex ? chartExampleBlock(ex) : ''}
${formBlock}
FORMAT
- bodyHtml: HTML using only <h2>, <h3>, <p>, <ul>, <ol>, <li>, <strong>, <em>, <table>/<thead>/<tbody>/<tr>/<th>/<td>, <a href>. No <h1>, no inline styles, no scripts, no markdown, no images.
- 1,200 to 1,700 words in bodyHtml. Short paragraphs. At least one table (a comparison, a calendar, a worked-step table or a term list), because the topic has concrete items to line up.
- Every section must contain something a generic summary lacks: an exact date range or degree from the facts block, a named placement or aspect, a worked step with the numbers shown, a short quoted example, or a clearly labelled limit of the tradition.
- Section headings (H2/H3) must be specific to THIS article's content: short (under ~10 words), with NO numbering or label prefix (not "Belief 1:", "Step 2:", "1."), never stock labels ("Key Takeaways", "Final Thoughts", "Conclusion", "Introduction", "Overview", "What You Need to Know").
- Use the search queries only as topics to cover. Never paste a query word for word into a sentence or heading unless it reads naturally on its own, and never more than once.
- Do not invent names, labels or categories for a tradition (for example titles for the houses): use only the labels in the facts block, or describe the thing in plain words.
- The facts block is reference material, not text to reproduce: never copy its sentences, and never add a paragraph on another tradition (the Chinese zodiac, numerology, houses...) unless the topic is about it. Every paragraph must serve this title; do not pad.
- No quotations at all unless they are short example sentences you wrote yourself; never attribute a saying to "practitioners", "astrologers" or anyone else.
- Be honest about the tradition: state what astrologers or numerologists hold ("In traditional astrology...", "Many practitioners read it as...") and where there is no scientific support. Do not use "scientifically proven", "guaranteed", "accurate predictions", "will happen to you".
- quickAnswer: 2-3 sentences that answer the title directly with a concrete detail; shown in a box at the top.
- faqs: 4 or 5 questions people actually search. EVERY answer must carry at least one concrete detail (a number, a date range, a degree, a named term from the facts block) and be at least 25 words; no dictionary-style definitions.
- metaDescription: 120-160 characters, MUST include the primary keyword ("${topic.keyword}"), no hype, do not start with Discover, Learn, Find out, Explore or Unlock.
- title: 40-90 characters, MUST include the primary keyword ("${topic.keyword}") or a close variant naturally, no promises, no year.
- Primary keyword ("${topic.keyword}") placement: in the title, in the metaDescription, in the first 120 words of the body, in at least one <h2>/<h3> (or an FAQ question), and at least 3 times in the body prose, naturally.
- Internal links: only to these paths, copied exactly, and only where the sentence is genuinely about that page:
${links}
- metaDescription: also never start with Understand, Master, Stop, Uncover or Demystify.
- Do not start with "In this article", "Whether you", "Are you", or any sentence about the article itself.
- Never claim to be an astrologer or to have credentials; never address medical, legal, financial or relationship decisions as advice; never use the words guarantee, guarantees, guaranteed or guaranteeing anywhere, not even when you describe a myth (write "promises" or "ensures" or rephrase).
- Finish all paragraphs and sentences cleanly. Do not leave trailing or unfinished sentences.
${feedback ? `\nYOUR PREVIOUS DRAFT FAILED THESE CHECKS — fix every one:\n${feedback}\n` : ''}`;
}

// ---- assembly: the exact HTML that is validated and stored -----------------------------------
function assemble(d: Draft, knownSlugs: Set<string>): { html: string; title: string; description: string } {
  let body = swapBannedVerbs(d.bodyHtml).trim();
  body = repairMechanical(body);
  // Rule 3: unwrap links to blog posts that do not exist (site pages are checked separately).
  body = body.replace(/<a [^>]*href=["'](?:https?:\/\/[^/"']+)?\/blog\/([^"'#?/]+)\/?["'][^>]*>([\s\S]*?)<\/a>/gi, (m, slug, text) => (knownSlugs.has(slug) ? m : text));
  const html = `<div class="quick-answer"><p><strong>Quick answer:</strong> ${d.quickAnswer.trim()}</p></div>\n\n${body}\n`;
  return { html, title: d.title.trim().slice(0, 90), description: d.metaDescription.trim().replace(/\s+/g, ' ') };
}

/** Links to site pages (not /blog) must point at pages that exist. */
function findBrokenSiteLinks(html: string): string[] {
  const bad = new Set<string>();
  for (const m of html.matchAll(/<a [^>]*href=["']((?:https?:\/\/(?:www\.)?horoscopesandcharts\.com)?\/[^"'#]*)["']/gi)) {
    const path = m[1].replace(/^https?:\/\/(?:www\.)?horoscopesandcharts\.com/, '');
    if (path.startsWith('/blog')) continue;
    if (!pageExists(path)) bad.add(path);
  }
  return [...bad].map((p) => `links to ${p}, which is not a page on this site — link only to the paths listed`);
}

function validate(a: { html: string; title: string; description: string }, d: Draft, topic: Topic, ex: ChartExample | undefined, plan: KeywordPlan, corpus: { headings: Set<string>; openings: Set<string>; slugs: Set<string> }): string[] {
  const plain = a.html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const words = plain.split(' ').length;
  const issues: string[] = [];
  if (a.title.length < 25 || a.title.length > 95) issues.push(`title must be 25-95 characters (is ${a.title.length})`);
  if (a.description.length < 70 || a.description.length > 165) issues.push(`metaDescription must be 70-165 characters (is ${a.description.length})`);
  if (/^(discover|learn\b|find out|explore|unlock)/i.test(a.description)) issues.push('metaDescription opens with a generic template phrase — write one specific to this article');
  if (/\b20[0-2]\d\b/.test(a.title)) issues.push('title contains a year');
  if (words < MIN_WORDS) issues.push(`too short: ${words} words (need ${MIN_WORDS}+ of substance, not padding)`);
  const lastText = d.bodyHtml.replace(/<[^>]+>/g, ' ').trim();
  if (!/[.!?:)"”]$/.test(lastText)) issues.push('body does not end on a finished sentence (truncated output)');
  if (/<h1[\s>]|<script|style=|<img/i.test(a.html)) issues.push('forbidden markup (<h1>, <script>, <img> or inline style)');
  if (!/<table[\s>]/i.test(a.html)) issues.push('no <table>: add one comparison, calendar or worked-step table');
  const h2 = (a.html.match(/<h2[\s>]/gi) ?? []).length;
  if (h2 < 4 || h2 > 9) issues.push(`${h2} H2 sections — use 4 to 8, each on a different point`);
  if (d.faqs.length < 4) issues.push(`only ${d.faqs.length} FAQs (need 4-5)`);
  issues.push(...findLowValueSignals(a.html, topic.cluster));
  issues.push(...findBridgeFiller(a.html));
  const stock = findStockHeadings(a.html);
  if (stock.length) issues.push(`stock headings: ${stock.join(', ')}`);
  issues.push(...findReusedHeadings(a.html, corpus.headings));
  issues.push(...findStockLabels(a.html));
  issues.push(...findTitlePasteIssues(a.html, a.title));
  issues.push(...findUnsupportedClaims(plain));
  issues.push(...findTitlePromiseIssues(a.title, a.html));
  issues.push(...findHypeIssues(plain, 'body'));
  issues.push(...findFieldClaimIssues({ title: a.title, metaDescription: a.description, faqs: d.faqs }));
  issues.push(...findBrokenInternalLinks(a.html, corpus.slugs));
  issues.push(...findBrokenSiteLinks(a.html));
  issues.push(...findUngroundedAstroFactsHtml(a.html));
  issues.push(...findInventedHouseNames(a.html));
  issues.push(...findFactsBlockCopy(plain));
  issues.push(...findRepeatedSentences(plain));
  issues.push(...findInventedQuotes(a.html));
  issues.push(...findNumberedHeadings(a.html));
  issues.push(...findPastedQueries(a.html.replace(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' '), plan.queries, a.title));
  issues.push(...findUngroundedAstroFacts(d.faqs.map((f) => f.answer).join(' ')));
  issues.push(...findOpeningIssues(a.html, corpus.openings));
  issues.push(...findGenericFaqAnswers(d.faqs));
  issues.push(...findExampleUsageIssues(a.html, ex, 3));
  issues.push(...findPlannerKeywordIssues({ term: topic.keyword, volume: topic.volume, plannerDate: PLANNER_DATE }, { title: a.title, seoTitle: a.title, metaDescription: a.description, html: a.html, faqs: d.faqs }).issues);
  issues.push(...findKeywordCoverageIssues(plan, a.html, d.faqs));
  return issues;
}

/** A draft that is too short is expanded in a separate, narrow call (rewriting from scratch makes it worse). */
async function expandIfShort(clients: ReturnType<typeof initGemini>, d: Draft, topic: Topic, ex: ChartExample | undefined): Promise<Draft> {
  const words = d.bodyHtml.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
  if (words >= MIN_WORDS + 150) return d;
  const raw = await callGemini(
    clients,
    `The article body below is only ${words} words. Expand it to at least 1,250 words by adding substance inside the existing sections: a further worked step or example (use ONLY the facts and example data given), an edge case, a limit of the tradition, a table row or two, a short quoted example. Do not add new sections for the sake of length, do not repeat points, keep every heading, the table and all links exactly as they are, and add no claim that is not in the facts block. Keep the tone honest: this is a symbolic tradition, no predictions.
${factsFor(topic.cluster)}
${ex ? chartExampleBlock(ex) : ''}
BODY HTML:
${d.bodyHtml}

Return JSON {"bodyHtml": "..."} with the full expanded body.`,
    { type: 'object', properties: { bodyHtml: { type: 'string' } }, required: ['bodyHtml'] },
    MAX_OUTPUT_TOKENS, false, SYSTEM,
  );
  if (!raw) return d;
  try {
    const out = JSON.parse(raw) as { bodyHtml?: string };
    return out.bodyHtml && out.bodyHtml.length > d.bodyHtml.length ? { ...d, bodyHtml: out.bodyHtml } : d;
  } catch {
    return d;
  }
}

// ---- main ------------------------------------------------------------------------------------
async function main() {
  const clients = initGemini();
  let rows: ArticleRow[] = [];
  try {
    rows = await fetchAllArticles();
  } catch (e) {
    if (!DRY) throw e;
    console.warn(`Firestore not reachable (${(e as Error).message}); dry run continues with an empty corpus.`);
  }
  const titles = rows.map((r) => r.title);
  const corpus = {
    headings: collectHeadingSet(rows.map((r) => r.body_html ?? '')),
    openings: new Set(rows.map((r) => openingKey(r.body_html ?? '')).filter(Boolean)),
    slugs: new Set(rows.filter((r) => r.status === 'published').map((r) => r.slug)),
  };

  const forced = topicArg > -1 ? TOPICS[Number(process.argv[topicArg + 1])] : undefined;
  const topic = forced ?? TOPICS.find((t) => findTopicIssues(t).length === 0 && !isDuplicateTopic(t.title, titles) && !rows.some((r) => r.slug === slugify(t.title)));
  if (!topic) {
    console.log('No eligible topic left in topics.ts — add topics from the Keyword Planner export.');
    return;
  }
  console.log(`Topic: ${topic.title}  [${topic.keyword}, ${topic.volume}/mo, ${topic.cluster}]`);

  const ex = topic.chartExample ? chartExampleFor(slugify(topic.title)) : undefined;
  const plan = await buildKeywordPlan(topic.title);
  const usedForms = rows.map((r) => r.meta?.form);
  const form = pickEditorialForm(topic.cluster, slugify(topic.title), usedForms);
  console.log(`Form: ${form.id} · example chart: ${ex ? `${ex.date} ${ex.time}` : 'none'} · autocomplete queries: ${plan.queries.length}${plan.available ? '' : ' (unavailable)'}`);

  let feedback = '';
  let previous = '';
  for (let attempt = 1; attempt <= 4; attempt++) {
    const raw = await callGemini(clients, buildPrompt(topic, ex, plan, formPromptBlock(form), rows, feedback, previous), SCHEMA, MAX_OUTPUT_TOKENS, false, SYSTEM);
    if (!raw) { console.warn(`Attempt ${attempt}: no completed response from Gemini.`); continue; }
    let d: Draft;
    try { d = JSON.parse(raw); } catch { feedback = '- the response was not valid JSON matching the schema'; console.warn(`Attempt ${attempt}: invalid JSON`); continue; }
    d = await expandIfShort(clients, d, topic, ex);
    const a = assemble(d, corpus.slugs);
    const issues = validate(a, d, topic, ex, plan, corpus);
    if (issues.length) {
      console.warn(`Attempt ${attempt}: ${issues.length} quality issue(s):\n${issues.map((i) => `  - ${i}`).join('\n')}`);
      feedback = issues.map((i) => `- ${i}`).join('\n');
      continue;
    }
    const slug = slugify(a.title);
    if (DRY) {
      const out = join(ROOT, '.dry-run');
      if (!existsSync(out)) mkdirSync(out);
      writeFileSync(join(out, `${slug}.html`), `<h1>${a.title}</h1>\n<p><em>${a.description}</em></p>\n${a.html}\n${d.faqs.map((f) => `<h3>${f.question}</h3><p>${f.answer}</p>`).join('\n')}`);
      console.log(`PASS (dry run): .dry-run/${slug}.html — nothing written to the site or Firestore.`);
      return;
    }
    await upsertArticle({
      slug, title: a.title, description: a.description, body_html: a.html, faqs: d.faqs.map((f) => ({ question: f.question.trim(), answer: f.answer.trim() })),
      cluster: topic.cluster, status: 'draft', published_at: null,
      meta: { form: form.id, keyword: topic.keyword, publishOn: PUBLISH_DATE, volume: topic.volume },
    });
    console.log(`DRAFT written to Firestore (status draft): ${slug}. auto-publish.ts decides if it goes live.`);
    return;
  }
  console.error('FAILED: no draft passed the quality gates after 4 attempts.');
  process.exit(1);
}

main().catch((e) => { console.error(e); process.exit(1); });
