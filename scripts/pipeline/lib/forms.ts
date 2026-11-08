/**
 * Editorial forms — the answer to "scaled content / template farm".
 *
 * Varying headings is not enough: two articles can have different words and still be the same shape
 * (quick answer, definition, 6 numbered sections, FAQ). So every article is assigned ONE editorial form
 * that changes how it is organised, how it opens and what its spine is — a diagnostic tree, a decision
 * memo, an annotated source excerpt, a build log, a misconception-led piece, a worked-numbers piece...
 *
 * The form is chosen from the real corpus: the least-used form that suits the cluster, never one of the
 * last few used, ties broken by a hash of the slug (not a rotating pool — usage counts decide). The
 * chosen id is stored on the article (`editorialForm`) so the next run sees it.
 *
 * The opening of every article is also compared with the corpus (first three words of the first
 * paragraph after the quick-answer box) so no two articles start the same way.
 */
export interface EditorialForm {
  id: string;
  clusters: string[];
  directive: string;
}

const ALL = ['zodiac', 'charts', 'dreams', 'numbers'];

export const EDITORIAL_FORMS: EditorialForm[] = [
  { id: 'worked-example', clusters: ['charts', 'zodiac', 'numbers'], directive: 'Build the article around ONE worked example with every step shown: a specific birth date, chart placement or number reduction taken from the evidence block, worked from the first step to the reading. Each H2 is one step of the working, and the reading comes last, hedged as symbolism.' },
  { id: 'misconception-led', clusters: ['zodiac', 'charts', 'dreams', 'numbers'], directive: 'Organise around three or four specific beliefs readers commonly hold about this topic. Each H2 states the belief in plain words with NO label or number prefix (write "Empty houses mean nothing happens there", not "Belief 1: ..."); the section says what the tradition actually holds, where the popular version goes wrong, and what is genuinely uncertain.' },
  { id: 'question-ladder', clusters: ['zodiac', 'charts', 'dreams', 'numbers'], directive: 'Make the H2s the questions a reader asks next, in the order they ask them, worded as real search queries (see the query list). Each section answers its question in the first sentence, then adds the one detail the short answer leaves out.' },
  { id: 'glossary-walk', clusters: ['charts', 'zodiac', 'numbers'], directive: 'Organise as a guided glossary: each H2 is one term the reader will meet (a placement, an aspect, a house, a number), defined in one sentence, then shown at work in a short example with concrete details, then the common confusion about it.' },
  { id: 'then-and-now', clusters: ['zodiac', 'dreams', 'numbers', 'charts'], directive: 'Organise as a short history of the idea: where the tradition says it comes from, how the meaning changed, and how people use it now. Only state history you can state with confidence; say plainly where origins are legendary or disputed.' },
  { id: 'checklist-with-reasons', clusters: ['charts', 'dreams', 'numbers', 'zodiac'], directive: 'Organise as a checklist where every item carries its reason: the item, the fact or tradition behind it, and what goes wrong if you skip it.' },
  { id: 'scenario-led', clusters: ['dreams', 'numbers'], directive: 'Open with a concrete, ordinary scenario a reader might recognise (without inventing a named person or a claimed real event: use "imagine..." or "a common version of this is..."). Each H2 takes one variation of the scenario and says what it is traditionally read to mean and what ordinary explanation may account for it.' },
  { id: 'compare-and-contrast', clusters: ['zodiac', 'charts', 'numbers'], directive: 'Organise around two or three things readers confuse (two placements, two signs, two numbers). Use one table early that compares them on 4-6 concrete rows, then one H2 per difference that matters, ending with when the difference changes the reading.' },
];

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** Least-used suitable form, excluding the last `recentWindow` used; ties by slug hash. */
export function pickEditorialForm(cluster: string, slug: string, usedNewestFirst: (string | undefined)[], recentWindow = 3): EditorialForm {
  const suitable = EDITORIAL_FORMS.filter((f) => f.clusters.includes(cluster));
  const pool = suitable.length ? suitable : EDITORIAL_FORMS.filter((f) => f.clusters.some((c) => ALL.includes(c)));
  const recent = new Set(usedNewestFirst.filter(Boolean).slice(0, recentWindow) as string[]);
  const counts = new Map<string, number>();
  for (const id of usedNewestFirst) if (id) counts.set(id, (counts.get(id) ?? 0) + 1);
  let candidates = pool.filter((f) => !recent.has(f.id));
  if (candidates.length === 0) candidates = pool;
  const min = Math.min(...candidates.map((f) => counts.get(f.id) ?? 0));
  const least = candidates.filter((f) => (counts.get(f.id) ?? 0) === min);
  return least[hash(`${slug}:form`) % least.length];
}

export function formPromptBlock(form: EditorialForm): string {
  return `\nEDITORIAL FORM FOR THIS ARTICLE (assigned so that this article is not shaped like the others on the site — follow it):\n${form.directive}\nThe form governs the organisation, the opening and the spine of the article. It does not relax any accuracy rule below.\n`;
}

const OPENER_BANNED_RE = /^(in this (article|guide|post|tutorial)|this (article|guide|post) (will|explains|covers)|whether you|if you(?:'|’)?re (a|an|looking|new)|are you (looking|struggling)|welcome to|today(?:,|\s)|as (ai|llms?|developers))/i;

/** First three words of the first paragraph after the quick-answer box. */
export function openingKey(html: string): string {
  const afterBox = html.replace(/^\s*<div[\s\S]*?<\/div>\s*/i, '');
  const m = /<p[^>]*>([\s\S]*?)<\/p>/i.exec(afterBox);
  if (!m) return '';
  return m[1].replace(/<[^>]+>/g, ' ').toLowerCase().replace(/[^a-z0-9\s]/g, ' ').split(/\s+/).filter(Boolean).slice(0, 3).join(' ');
}

export function findOpeningIssues(html: string, corpusOpenings: Set<string>): string[] {
  const issues: string[] = [];
  const afterBox = html.replace(/^\s*<div[\s\S]*?<\/div>\s*/i, '');
  const first = (/<p[^>]*>([\s\S]*?)<\/p>/i.exec(afterBox)?.[1] ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (OPENER_BANNED_RE.test(first)) issues.push(`the opening paragraph starts with a stock opener ("${first.slice(0, 40)}…") — open on the specific symptom, fact, number or scenario this article is about`);
  const key = openingKey(html);
  if (key && corpusOpenings.has(key)) issues.push(`the opening paragraph starts with "${key}…", exactly like another article on this site — start differently`);
  return issues;
}
