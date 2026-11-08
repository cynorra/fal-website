/**
 * Gates for padding and fabrication that the claim/hype gates cannot see:
 *  - sentences copied word for word from the facts block (the model dumps the prompt to hit a word count),
 *  - the same sentence appearing twice,
 *  - quotations with no source (a fabricated "As practitioners say, ..." line).
 */
import { ASTRO_FACTS } from './facts';

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim();
const sentences = (text: string) => text.split(/(?<=[.!?])\s+|\n+/).map((s) => s.trim()).filter(Boolean);
const wordsOf = (s: string) => s.split(/\s+/).filter(Boolean).length;

const FACT_SENTENCES = sentences(ASTRO_FACTS.replace(/^- /gm, ''))
  .filter((s) => wordsOf(s) >= 12)
  .map(norm);

/** Sentences of 12+ words lifted verbatim from the facts block. */
export function findFactsBlockCopy(plain: string): string[] {
  const text = norm(plain);
  const hits = FACT_SENTENCES.filter((f) => text.includes(f));
  // One or two restated facts are natural (the topic's own core fact); a dump of the block is padding.
  return hits.length > 2
    ? [`copies ${hits.length} sentence(s) word for word from the facts block (e.g. "${hits[0].slice(0, 90)}…") — the facts are for you to rely on, not to paste; paraphrase and use only what this topic needs`]
    : [];
}

/** The same sentence (8+ words) twice in one article. */
export function findRepeatedSentences(plain: string): string[] {
  const seen = new Map<string, number>();
  for (const s of sentences(plain)) {
    if (wordsOf(s) < 8) continue;
    const k = norm(s);
    seen.set(k, (seen.get(k) ?? 0) + 1);
  }
  const dup = [...seen.entries()].filter(([, n]) => n > 1);
  return dup.length ? [`repeats a sentence word for word (${dup.length}×, e.g. "${dup[0][0].slice(0, 80)}…") — say each thing once`] : [];
}

/** A quoted passage of 8+ words has no named source here, so it cannot be checked: refuse it. */
export function findInventedQuotes(html: string): string[] {
  const text = html.replace(/<[^>]+>/g, ' ');
  const quotes = [...text.matchAll(/["“]([^"”]{40,220})["”]/g)].map((m) => m[1].trim()).filter((q) => wordsOf(q) >= 8 && /[a-z]/.test(q));
  return quotes.length
    ? [`contains a quotation with no named source ("${quotes[0].slice(0, 70)}…") — nothing here can verify it; remove it or state the idea in your own words`]
    : [];
}
