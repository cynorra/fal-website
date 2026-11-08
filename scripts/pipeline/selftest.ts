/**
 * Offline self-test for the pipeline gates (no network, no keys):
 *   npm run test:pipeline
 * Pins what must be caught and what must not.
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { findUngroundedAstroFacts, findUngroundedAstroFactsHtml, findWrongSignDates, ASTRO_FACTS, findInventedHouseNames, findNumberedHeadings, findPastedQueries } from './lib/facts';
import { findTopicIssues } from './lib/topic-gate';
import { TOPICS } from './topics';
import { findHypeIssues, findBrokenInternalLinks } from './lib/hype-check';
import { findLowValueSignals, measureValue } from './lib/value';
import { findUnsupportedClaims } from './lib/claims-check';
import { whyTopicRefused } from './lib/policy';
import { pickEditorialForm, EDITORIAL_FORMS } from './lib/forms';
import { chartExampleFor, findExampleUsageIssues } from './lib/evidence';
import { ZODIAC_SIGNS } from '../../src/lib/horoscopes-data';
import { repairMechanical } from './lib/repair';
import { findFactsBlockCopy, findRepeatedSentences, findInventedQuotes } from './lib/copy-check';

test('facts gate: the site\'s own sign dates pass, wrong ones fail', () => {
  for (const s of ZODIAC_SIGNS) assert.deepEqual(findWrongSignDates(`${s.name} runs from ${s.dates}.`), [], s.name);
  assert.equal(findWrongSignDates('Aries covers March 15 - April 19.').length, 1);
  assert.deepEqual(findWrongSignDates('Sagittarius, as Scorpio runs from October 23 to November 21, follows it.'), []); // nearest sign wins
  assert.equal(findWrongSignDates('Leo (July 20 - August 22) is a fire sign.').length, 1);
  assert.deepEqual(findWrongSignDates('Aries (March 21 - April 19) begins the zodiac.'), []);
  assert.equal(findUngroundedAstroFacts('Scorpio is a fire sign ruled by Mars.').length, 1);
  assert.deepEqual(findUngroundedAstroFacts('Scorpio is a water sign ruled by Mars.'), []);
  assert.ok(ASTRO_FACTS.includes('Aries: March 21 - April 19'));
});

test('facts gate reads comparison tables cell by cell', () => {
  const ok = '<table><tr><th></th><th>Scorpio</th><th>Sagittarius</th></tr><tr><td>Dates</td><td>Scorpio: October 23 - November 21</td><td>Sagittarius: November 22 - December 21</td></tr></table>';
  assert.deepEqual(findUngroundedAstroFactsHtml(ok), []);
  const bad = '<table><tr><td>Sagittarius: October 23 - November 21</td></tr></table>';
  assert.equal(findUngroundedAstroFactsHtml(bad).length, 1);
  assert.equal(findPastedQueries('Say what is a cusp sign in astrology here, then how to find a cusp sign by date, and when a cusp sign changes by year and why so.', ['what is a cusp sign in astrology', 'how to find a cusp sign by date', 'when a cusp sign changes by year', 'why a cusp sign shifts yearly'], 'What Is a Cusp Sign? Birthdays Between Two Zodiac Signs').length, 0);
});

test('facts gate catches invented research and predictions', () => {
  assert.equal(findUngroundedAstroFacts('Studies show that the zodiac predicts career success.').length, 1);
  assert.equal(findUngroundedAstroFacts('You will meet your partner this year.').length, 1);
  assert.deepEqual(findUngroundedAstroFacts('In traditional astrology the Moon spends about 2.5 days in each sign.'), []);
});

test('gates catch invented house names, numbered headings and pasted queries', () => {
  assert.equal(findInventedHouseNames('<table><tr><td>House of Sharing</td></tr></table>').length, 1);
  assert.deepEqual(findInventedHouseNames('<p>The 7th house covers one-to-one relationships.</p>'), []);
  assert.ok(ASTRO_FACTS.includes('7th house: partnerships') && ASTRO_FACTS.includes('NEVER write'));
  assert.equal(findNumberedHeadings('<h2>Belief 1: Your Sun sign is everything</h2>').length, 1);
  assert.equal(findNumberedHeadings('<h2>3. Empty houses</h2>').length, 1);
  assert.deepEqual(findNumberedHeadings('<h2>Why empty houses are normal</h2>'), []);
  const qs = ['how to read birth chart houses south indian style', 'how to read birth chart houses north indian style', 'how to know your birth chart houses', 'what do houses mean in birth chart', 'birth chart houses'];
  assert.equal(findPastedQueries('Learn how to read birth chart houses south indian style, how to read birth chart houses north indian style, how to know your birth chart houses and what do houses mean in birth chart.', qs).length, 1);
  assert.deepEqual(findPastedQueries('Learn how to read birth chart houses south indian style and how to read birth chart houses north indian style today.', qs), []);
  assert.deepEqual(findPastedQueries('One chart style is the south indian grid.', qs), []);
});

test('mechanical repairs strip heading labels and the word guarantee', () => {
  assert.equal(repairMechanical('<h2>Belief 1: Empty houses mean nothing</h2>'), '<h2>Empty houses mean nothing</h2>');
  assert.equal(repairMechanical('<h2>3. Why houses matter</h2>'), '<h2>Why houses matter</h2>');
  assert.equal(repairMechanical('<h3>Step 2 - Find the Ascendant</h3>'), '<h3>Find the Ascendant</h3>');
  assert.equal(repairMechanical('<p>A house guarantees wealth, and it is guaranteed.</p>'), '<p>A house promises wealth, and it is promised.</p>');
  assert.equal(repairMechanical('<h2>Why empty houses are normal</h2>'), '<h2>Why empty houses are normal</h2>');
});

test('padding gates: facts copied verbatim, repeated sentences and unsourced quotes', () => {
  const copied = 'The Sun sign is only one placement of many; the Moon sign and the Rising (Ascendant) sign are the other two most discussed.';
  assert.deepEqual(findFactsBlockCopy(`Intro here. ${copied} Outro here.`), []); // one restated fact is natural
  const dump = [copied, 'Dates shift by about a day from year to year because the Sun enters each sign at a different hour; people born on the boundary should use a birth chart calculator with their birth time and place.', 'Numerology: the Life Path number is found by reducing the month, day and year of birth and adding them; 11, 22 and 33 are kept as master numbers.'].join(' ');
  assert.equal(findFactsBlockCopy(dump).length, 1);
  assert.deepEqual(findFactsBlockCopy('A paraphrase: besides the Sun, the Moon and the Ascendant carry much of the interpretation in a chart.'), []);
  const rep = 'This particular sentence is long enough to be counted and it repeats.';
  assert.equal(findRepeatedSentences(`${rep} Something else entirely here. ${rep}`).length, 1);
  assert.deepEqual(findRepeatedSentences('One. Two short ones. A single unique long sentence about houses and signs.'), []);
  assert.equal(findInventedQuotes('<p>As practitioners often say, "The chart is a mirror, not a crystal ball, and it shows only symbols."</p>').length, 1);
  assert.deepEqual(findInventedQuotes('<p>The term "cusp" is common.</p>'), []);
});

test('policy refuses promises, spells and dated horoscopes', () => {
  assert.ok(whyTopicRefused('Love Spell That Works in 3 Days'));
  assert.ok(whyTopicRefused('Will You Find Love This Year? Guaranteed Prediction'));
  assert.ok(whyTopicRefused('Lottery Numbers by Zodiac Sign'));
  assert.ok(whyTopicRefused('Aries Horoscope Today'));
  assert.equal(whyTopicRefused('Birth Chart Houses Explained: What Each of the 12 Houses Covers'), null);
});

test('every seed topic passes the topic gate (and links point at real pages)', () => {
  assert.ok(TOPICS.length >= 12);
  for (const t of TOPICS) assert.deepEqual(findTopicIssues(t), [], t.title);
  const bad = { ...TOPICS[0], links: ['/no-such-page'] };
  assert.equal(findTopicIssues(bad).length, 1);
});

test('hype and claims gates', () => {
  assert.ok(findHypeIssues('This method is the gold standard for reading a chart.').length > 0);
  assert.ok(findHypeIssues('This guarantees an accurate reading.').length > 0);
  assert.equal(findHypeIssues('This does not guarantee a particular outcome.').length, 0);
  assert.ok(findUnsupportedClaims('Readers who follow this cut their stress by up to 60%.').length > 0);
});

test('internal links to unknown posts are caught', () => {
  const html = '<p>See <a href="/blog/real-one">this</a> and <a href="/blog/made-up">that</a>.</p>';
  assert.equal(findBrokenInternalLinks(html, new Set(['real-one'])).length, 1);
});

test('value gate: a worked chart passes, generic filler fails', () => {
  const good =
    '<h2>Reading the Moon in Scorpio at 14 degrees</h2><p>Mars and Pluto are the traditional and modern rulers of Scorpio, a fixed water sign that spans October 23 - November 21. A Moon at 14°22\' sits in the second decan, which tradition assigns to Neptune. In the 8th house the same placement is read as a theme of shared resources, while in the 4th house it points to home and family.</p>'.repeat(6);
  assert.deepEqual(findLowValueSignals(good, 'charts'), [], JSON.stringify(measureValue(good)));
  const bad = '<p>' + 'Astrology plays a crucial role in many lives. When it comes to the stars, it is worth noting that everyone is different. '.repeat(30) + '</p>';
  assert.ok(findLowValueSignals(bad, 'charts').length > 0);
});

test('editorial forms rotate and suit every cluster', () => {
  const a = pickEditorialForm('charts', 'x', []);
  const b = pickEditorialForm('charts', 'x', [a.id]);
  assert.notEqual(a.id, b.id);
  for (const c of ['zodiac', 'charts', 'dreams', 'numbers']) assert.ok(EDITORIAL_FORMS.some((f) => f.clusters.includes(c)), c);
});

test('example chart is deterministic, computed by the site\'s calculator and enforced', () => {
  const ex = chartExampleFor('birth-chart-houses-explained');
  assert.deepEqual(ex, chartExampleFor('birth-chart-houses-explained'));
  assert.equal(ex.placements.length, 10);
  assert.ok(ex.asc);
  const text = ex.placements.slice(0, 4).map((p) => `${p.body} in ${p.sign}`).join('. ');
  assert.deepEqual(findExampleUsageIssues(`<p>${text}.</p>`, ex), []);
  assert.equal(findExampleUsageIssues('<p>Nothing here.</p>', ex).length, 1);
  assert.deepEqual(findExampleUsageIssues('<p>Nothing here.</p>', undefined), []);
});

test('generate.ts and auto-publish.ts parse (they start only when run, so compile-check them)', async () => {
  const { transform } = await import('esbuild');
  const fs = await import('node:fs');
  for (const f of ['./generate.ts', './auto-publish.ts']) await transform(fs.readFileSync(new URL(f, import.meta.url), 'utf8'), { loader: 'ts' });
});
