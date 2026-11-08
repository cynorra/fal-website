/**
 * Automatic publish gate (from aiandsoftwarehub's auto-publish.ts, adapted).
 *
 * For every Firestore article in status 'draft' it re-runs the deterministic gates and an
 * independent, stricter AI audit (lib/audit.ts: every problem must quote the article;
 * pass/fail is computed here, not taken from the model). Passers become 'published' on their
 * scheduled day (meta.publishOn, or the next free day, one article a day); failures stay
 * drafts with the reasons in `review`. It fails CLOSED: an audit that cannot run means
 * "hold", never "publish".
 *
 *   npx tsx scripts/pipeline/auto-publish.ts            # dry run: report only
 *   npx tsx scripts/pipeline/auto-publish.ts --apply    # publish the passers
 *   npx tsx scripts/pipeline/auto-publish.ts --apply --min-avg 4.2
 */
import { initGemini, fetchAllArticles, upsertArticle } from './lib/shared';
import { auditArticle, auditIssues } from './lib/audit';
import { findLowValueSignals, findBridgeFiller, findGenericFaqAnswers } from './lib/value';
import { findStockHeadings, findStockLabels } from './lib/structure';
import { findTitlePasteIssues } from './lib/title-paste';
import { findUnsupportedClaims } from './lib/claims-check';
import { findHypeIssues, findFieldClaimIssues, findBrokenInternalLinks } from './lib/hype-check';
import { findFactsBlockCopy, findRepeatedSentences, findInventedQuotes } from './lib/copy-check';
import { ASTRO_FACTS, findUngroundedAstroFacts, findUngroundedAstroFactsHtml, findInventedHouseNames, findNumberedHeadings } from './lib/facts';

const APPLY = process.argv.includes('--apply');
const avgArg = process.argv.indexOf('--min-avg');
const MIN_AVG = avgArg > -1 ? Number(process.argv[avgArg + 1]) : 4.2;
const plain = (html: string) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
const today = () => new Date().toISOString().slice(0, 10);

/** Next date (YYYY-MM-DD) on or after `from` that no published article uses (one article a day). */
function nextFreeDay(from: string, taken: Set<string>): string {
  const d = new Date(`${from}T12:00:00Z`);
  for (;;) {
    const s = d.toISOString().slice(0, 10);
    if (!taken.has(s)) return s;
    d.setUTCDate(d.getUTCDate() + 1);
  }
}

async function main() {
  const clients = initGemini();
  const rows = await fetchAllArticles();
  const drafts = rows.filter((r) => r.status === 'draft');
  const liveSlugs = new Set(rows.filter((r) => r.status === 'published').map((r) => r.slug));
  const taken = new Set(rows.filter((r) => r.status === 'published' && r.published_at).map((r) => r.published_at!.slice(0, 10)));
  console.log(`${drafts.length} draft(s). Mode: ${APPLY ? 'APPLY' : 'dry run'}. Audit bar: average >= ${MIN_AVG}, no category < 3.\n`);

  let published = 0;
  for (const r of drafts) {
    const html = r.body_html;
    const faqs = r.faqs ?? [];
    const reasons: string[] = [];
    reasons.push(...findLowValueSignals(html, r.cluster));
    reasons.push(...findBridgeFiller(html));
    const stock = findStockHeadings(html);
    if (stock.length) reasons.push(`stock headings: ${stock.join(', ')}`);
    reasons.push(...findStockLabels(html));
    reasons.push(...findTitlePasteIssues(html, r.title));
    reasons.push(...findUnsupportedClaims(plain(html)));
    reasons.push(...findHypeIssues(plain(html), 'body'));
    reasons.push(...findFieldClaimIssues({ title: r.title, metaDescription: r.description, faqs }));
    reasons.push(...findBrokenInternalLinks(html, liveSlugs));
    reasons.push(...findUngroundedAstroFactsHtml(html));
    reasons.push(...findInventedHouseNames(html));
    reasons.push(...findFactsBlockCopy(plain(html)));
    reasons.push(...findRepeatedSentences(plain(html)));
    reasons.push(...findInventedQuotes(html));
    reasons.push(...findNumberedHeadings(html));
    reasons.push(...findGenericFaqAnswers(faqs));

    let auditLine = 'not run (earlier gate failed)';
    let audit = null;
    if (reasons.length === 0) {
      audit = await auditArticle(
        clients, r.title, r.cluster, html, MIN_AVG, ASTRO_FACTS,
        "Astrology, numerology, angel numbers and dream symbolism are symbolic traditions; judge whether the article explains the tradition honestly (hedged, no predictions, no invented studies or credentials) and whether any worked example uses the exact placements it states. Sign dates, elements and rulers must match the facts block.",
      );
      if (!audit) reasons.push('AI audit could not run — holding (fails closed)');
      else {
        auditLine = `${audit.pass ? 'PASS' : 'FAIL'} avg ${audit.average.toFixed(1)} (${Object.entries(audit.scores).map(([k, v]) => `${k} ${v}`).join(', ')})`;
        if (!audit.pass) reasons.push(...auditIssues(audit));
      }
    }
    const verdict = reasons.length === 0 ? 'PUBLISH' : 'HOLD';
    console.log(`${verdict.padEnd(7)} ${r.slug}\n        audit ${auditLine}`);
    for (const x of reasons) console.log(`        - ${x.slice(0, 260)}`);
    if (!APPLY) continue;

    if (reasons.length) {
      await upsertArticle({ slug: r.slug, review: { at: new Date().toISOString(), verdict: 'hold', reasons: reasons.slice(0, 12).map((x) => x.slice(0, 400)) } } as never);
      continue;
    }
    const day = nextFreeDay(r.meta?.publishOn && r.meta.publishOn >= today() ? r.meta.publishOn : today(), taken);
    taken.add(day);
    await upsertArticle({
      slug: r.slug,
      status: 'published',
      published_at: `${day}T00:00:00Z`,
      review: { at: new Date().toISOString(), verdict: 'publish', audit: audit && { average: audit.average, scores: audit.scores } },
    } as never);
    published++;
    console.log(`        -> published for ${day}`);
  }
  console.log(`\nDone. ${APPLY ? `Published ${published}.` : 'Dry run — nothing written.'}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
