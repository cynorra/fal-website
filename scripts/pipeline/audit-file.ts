/**
 * Runs every deterministic gate and the independent AI audit on a local article HTML file
 * (for example one written by `generate.ts --dry-run`), without touching Firestore:
 *
 *   npx tsx scripts/pipeline/audit-file.ts .dry-run/some-article.html [cluster]
 */
import { readFileSync } from 'node:fs';
import { initGemini } from './lib/shared';
import { auditArticle, auditIssues } from './lib/audit';
import { ASTRO_FACTS, findUngroundedAstroFacts, findUngroundedAstroFactsHtml, findInventedHouseNames, findNumberedHeadings } from './lib/facts';
import { findFactsBlockCopy, findRepeatedSentences, findInventedQuotes } from './lib/copy-check';
import { findLowValueSignals, findBridgeFiller } from './lib/value';
import { findUnsupportedClaims } from './lib/claims-check';
import { findHypeIssues } from './lib/hype-check';

const file = process.argv[2];
const cluster = process.argv[3] ?? 'zodiac';
if (!file) {
  console.error('Usage: npx tsx scripts/pipeline/audit-file.ts <file.html> [cluster]');
  process.exit(1);
}
const raw = readFileSync(file, 'utf8');
const title = /<h1>([\s\S]*?)<\/h1>/.exec(raw)?.[1] ?? file;
const html = raw.replace(/<h1>[\s\S]*?<\/h1>/, '').replace(/<p><em>[\s\S]*?<\/em><\/p>/, '');
const plain = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

const gates: Record<string, string[]> = {
  lowValue: findLowValueSignals(html, cluster),
  bridge: findBridgeFiller(html),
  factsCopy: findFactsBlockCopy(plain),
  repeated: findRepeatedSentences(plain),
  quotes: findInventedQuotes(html),
  houses: findInventedHouseNames(html),
  numbered: findNumberedHeadings(html),
  astroFacts: findUngroundedAstroFactsHtml(html),
  claims: findUnsupportedClaims(plain),
  hype: findHypeIssues(plain, 'body'),
};
for (const [k, v] of Object.entries(gates)) console.log(`${v.length ? 'FAIL' : 'ok  '} ${k}${v.length ? `: ${v[0].slice(0, 200)}` : ''}`);

async function main() {
  const clients = initGemini();
  const audit = await auditArticle(clients, title, cluster, html, 4.2, ASTRO_FACTS, 'Astrology and related traditions are symbolic; judge honesty, originality and padding.');
  if (!audit) console.log('AI audit could not run.');
  else {
    console.log(`AI audit: ${audit.pass ? 'PASS' : 'FAIL'} avg ${audit.average.toFixed(2)} (${Object.entries(audit.scores).map(([k, v]) => `${k} ${v}`).join(', ')})`);
    if (!audit.pass) for (const i of auditIssues(audit)) console.log('  - ' + i.slice(0, 260));
  }
}

main().catch((e) => { console.error(e); process.exit(1); });
