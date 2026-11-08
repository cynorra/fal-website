/**
 * The facts an article may state, built from the SAME data the site's pages use
 * (src/lib), so a blog post can never contradict /zodiac-signs or /chinese-zodiac.
 * Update the data files, not this file, when a fact changes.
 *
 * Also the grounding gate: a sentence that gives a date range for a sign must match the table.
 */
import { ZODIAC_SIGNS } from '../../../src/lib/horoscopes-data';
import { ZODIAC_PROFILES } from '../../../src/lib/zodiac-profiles';
import { HOUSE_THEMES } from '../../../src/lib/astro';

export const FACTS_CHECKED = '2026-11-08';

const profile = Object.fromEntries(ZODIAC_PROFILES.map((p) => [p.id, p]));

export const ASTRO_FACTS = `FACTS YOU MAY STATE (from this site's own reference tables, checked ${FACTS_CHECKED}):
Western (tropical) zodiac, sign: dates | element | modality | traditional ruler
${ZODIAC_SIGNS.map((s) => `- ${s.name}: ${s.dates} | ${s.element} | ${s.modality} | ${profile[s.id]?.rulerPlanet ?? s.ruler}`).join('\n')}
Houses (whole-sign system; 1st house = the Rising sign, each following sign is the next house). Use these area-of-life descriptions; the houses have no single agreed "traditional name", so NEVER write "House of ..." names or a "Traditional Name" column:
${HOUSE_THEMES.map((h) => `- ${h.name}: ${h.theme}`).join('\n')}
- Dates shift by about a day from year to year because the Sun enters each sign at a different hour; people born on the boundary should use a birth chart calculator with their birth time and place.
- A birth chart (natal chart) is a map of where the Sun, Moon and planets were, and which sign was rising on the eastern horizon, at the moment of birth. The Sun sign is only one placement of many; the Moon sign and the Rising (Ascendant) sign are the other two most discussed.
- Chinese zodiac: 12 animals in the order Rat, Ox, Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog, Pig; combined with 5 elements (Wood, Fire, Earth, Metal, Water) and yin/yang this forms a 60-year cycle. The sign changes at Chinese New Year (late January to mid February), not on January 1.
- Numerology: the Life Path number is found by reducing the month, day and year of birth and adding them; 11, 22 and 33 are kept as master numbers.
- Astrology, numerology, angel numbers and dream interpretation are symbolic traditions used for reflection and entertainment. They have no scientifically demonstrated predictive power. Say so plainly and never present a symbolic reading as a fact about the reader's future.
Do NOT state: predictions of real events, health, legal or financial advice, scientific studies, statistics or survey results you cannot name, quotes attributed to named astrologers, historical dates you are unsure of, or planetary dates (retrograde periods, eclipses) unless the date is given in the prompt.`;

export const factsFor = (_cluster: string) => ASTRO_FACTS;

const SIGN_NAMES = ZODIAC_SIGNS.map((s) => s.name);
const MONTHS = 'January|February|March|April|May|June|July|August|September|October|November|December';
const abbr = (m: string) => m.slice(0, 3).toLowerCase();
const RANGE_RE = new RegExp(`\\b(${SIGN_NAMES.join('|')})\\b(?:(?!\\b(?:${SIGN_NAMES.join('|')})\\b)[^.]){0,40}?\\(?\\b(${MONTHS})\\.?\\s+(\\d{1,2})\\s*(?:-|–|—|to|through)\\s*(?:(${MONTHS})\\.?\\s+)?(\\d{1,2})\\b`, 'gi');

/** Sign date ranges stated in the text must match the facts table (±0: the table is the single source). */
export function findWrongSignDates(plain: string): string[] {
  const out: string[] = [];
  for (const m of plain.matchAll(RANGE_RE)) {
    const sign = ZODIAC_SIGNS.find((s) => s.name.toLowerCase() === m[1].toLowerCase());
    if (!sign) continue;
    const t = /([A-Za-z]+)\s+(\d{1,2})\s*-\s*([A-Za-z]+)\s+(\d{1,2})/.exec(sign.dates);
    if (!t) continue;
    const m1 = abbr(m[2]);
    const d1 = Number(m[3]);
    const m2 = abbr(m[4] ?? m[2]);
    const d2 = Number(m[5]);
    if (m1 !== abbr(t[1]) || d1 !== Number(t[2]) || m2 !== abbr(t[3]) || d2 !== Number(t[4])) {
      out.push(`states ${sign.name} dates that differ from the facts table (${sign.dates}): "${m[0].slice(0, 90)}" — use the table's dates exactly`);
    }
  }
  return [...new Set(out)];
}

/** Sentences that give an element, modality or ruler for a sign that contradicts the table. */
export function findWrongSignAttributes(plain: string): string[] {
  const out: string[] = [];
  for (const s of plain.split(/(?<=[.!?])\s+/)) {
    for (const sign of ZODIAC_SIGNS) {
      const re = new RegExp(`\\b${sign.name}\\b[^.]{0,30}\\b(?:is|as)\\s+an?\\s+(fire|earth|air|water)\\s+sign\\b`, 'i');
      const m = re.exec(s);
      if (m && m[1].toLowerCase() !== sign.element.toLowerCase()) out.push(`calls ${sign.name} a ${m[1].toLowerCase()} sign; the facts table says ${sign.element.toLowerCase()}: "${s.slice(0, 120)}"`);
    }
  }
  return [...new Set(out)];
}

export function findUngroundedAstroFacts(plain: string): string[] {
  const out = [...findWrongSignDates(plain), ...findWrongSignAttributes(plain)];
  for (const s of plain.split(/(?<=[.!?])\s+/)) {
    if (/\b(studies|research|scientists?|surveys?)\s+(?:show|shows|found|has found|have found|prove|proves|suggest|suggests|confirm)/i.test(s) && /\b(astrolog|zodiac|horoscope|birth chart|numerolog|angel number|dream)/i.test(s)) {
      out.push(`cites unnamed research about astrology/numerology/dreams, which nothing here can verify: "${s.slice(0, 120)}" — remove it or say these are symbolic traditions`);
    }
    if (/\b(will|going to)\s+(meet|marry|get pregnant|lose|win|die|be (?:rich|sick|ill))\b/i.test(s) && /\b(you|your)\b/i.test(s)) {
      out.push(`predicts a real event for the reader: "${s.slice(0, 120)}" — describe what a placement symbolises instead`);
    }
  }
  return [...new Set(out)];
}

/** "House of ..." labels: not standardised, so an article that presents them as traditional names is inventing them. */
export function findInventedHouseNames(html: string): string[] {
  const hits = [...html.replace(/<[^>]+>/g, ' ').matchAll(/\bHouses? of (?:the )?[A-Z][a-z]+/g)].map((m) => m[0]);
  const bad = hits.filter((h) => !/House of (?:Commons|Representatives|Lords|Cards|Windsor)/.test(h));
  return bad.length ? [`uses "House of ..." labels (${[...new Set(bad)].slice(0, 3).join(', ')}) as if they were standard names; the houses have no agreed traditional names — describe each by its area of life (see the facts block)`] : [];
}

/** Numbered or labelled headings ("Belief 1:", "Step 2:", "Myth 3") read as one template across articles. */
export function findNumberedHeadings(html: string): string[] {
  const bad = [...html.matchAll(/<h[23][^>]*>\s*((?:\d+[.):]|(?:belief|myth|step|tip|rule|point|mistake|reason|truth|fact)\s*#?\d+)[^<]*)<\/h[23]>/gi)].map((m) => m[1].trim());
  return bad.length ? [`numbered/labelled heading(s) like "${bad[0].slice(0, 60)}" — write each heading as a plain, specific phrase with no "Belief 1:" / "Step 2:" / "1." prefix`] : [];
}

/** Search queries pasted verbatim into sentences read as keyword stuffing. A query that is part of the title is the topic itself and is fine. */
export function findPastedQueries(plain: string, queries: string[], title = ''): string[] {
  const low = plain.toLowerCase();
  const t = title.toLowerCase();
  const stop = new Set(['a', 'an', 'the', 'is', 'are', 'what', 'how', 'to', 'in', 'of', 'do', 'does', 'my', 'your', 'for', 'and', 'or']);
  const content = (x: string) => x.toLowerCase().split(/\W+/).filter((w) => w && !stop.has(w));
  const titleWords = new Set(content(title));
  // A query whose content words are all in the title IS the topic: it may appear naturally.
  const pasted = queries.filter((q) => q.split(/\s+/).length >= 5 && !t.includes(q.toLowerCase()) && !content(q).every((w) => titleWords.has(w)) && low.includes(q.toLowerCase()));
  return pasted.length > 3 ? [`pastes ${pasted.length} search queries verbatim into sentences (e.g. "${pasted[0]}") — answer the question in natural wording; at most three queries may appear word for word`] : [];
}

/**
 * Fact gate for an HTML body: prose is checked sentence by sentence; tables are checked cell by cell,
 * because flattening a two-column comparison table pairs one sign's name with the other sign's dates.
 */
export function findUngroundedAstroFactsHtml(html: string): string[] {
  const noTables = html.replace(/<table[\s\S]*?<\/table>/gi, ' ');
  const flat = (x: string) => x.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  const out = findUngroundedAstroFacts(flat(noTables));
  for (const t of html.matchAll(/<table[\s\S]*?<\/table>/gi)) {
    for (const c of t[0].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)) out.push(...findWrongSignDates(flat(c[1])), ...findWrongSignAttributes(flat(c[1])));
  }
  return [...new Set(out)];
}
