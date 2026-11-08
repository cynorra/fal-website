/**
 * Topic queue for the generator, taken from the Keyword Planner exports in the repo root
 * (Keyword Stats 2026-11-08 *.csv; volumes are Google's bucketed monthly searches).
 * The generator picks the first topic that passes the topic gate and is not a duplicate.
 *
 * Rules for adding topics (they are enforced by lib/topic-gate.ts and the selftest):
 *  - the article must deliver something a one-paragraph AI answer cannot (`asset`):
 *    a worked example from the site's own calculators, a comparison table, a decision procedure;
 *  - no predictions, cures, spells or dated horoscopes (those pages are produced from real positions elsewhere);
 *  - do not duplicate a page that already exists: /zodiac-signs, /zodiac-signs/month/*, /zodiac-signs/element/*,
 *    /horoscopes/*, /compatibility/*, /chinese-zodiac/*, /life-path/*, /dreams/*, /symbols/*.
 */
export type Cluster = 'zodiac' | 'charts' | 'dreams' | 'numbers';

export interface Topic {
  title: string;
  /** The primary search keyword, exactly as in the Keyword Planner export. */
  keyword: string;
  /** Monthly searches bucket from the export (0 = unknown). */
  volume: number;
  cluster: Cluster;
  /** What this page delivers that a short AI answer cannot. */
  asset: string;
  /** Internal pages the article should link to (paths that exist on the site). */
  links: string[];
  /** Whether a computed example chart is supplied as evidence. */
  chartExample?: boolean;
}

export const TOPICS: Topic[] = [
  {
    title: 'Birth Chart Houses Explained: What Each of the 12 Houses Covers',
    keyword: 'birth chart',
    volume: 500000,
    cluster: 'charts',
    asset: 'a worked example chart with every house filled in from the calculator, plus a table of the 12 houses with the area of life each one stands for',
    links: ['/tools/birth-chart', '/zodiac-signs'],
    chartExample: true,
  },
  {
    title: 'Sun Sign, Moon Sign and Rising Sign: What Each One Shows in a Birth Chart',
    keyword: 'birth chart',
    volume: 500000,
    cluster: 'charts',
    asset: 'one worked example in which the Sun, Moon and Rising sign differ, showing how the three read together, and when each is calculated from the birth date, time and place',
    links: ['/tools/rising-moon', '/tools/birth-chart'],
    chartExample: true,
  },
  {
    title: 'Why Birth Time Matters for a Birth Chart (and What You Can Still Read Without It)',
    keyword: 'birth chart calculator',
    volume: 500000,
    cluster: 'charts',
    asset: 'a table of which placements change within a day (Rising sign, houses, the Moon) and which barely move (outer planets), with computed examples',
    links: ['/tools/birth-chart', '/tools/rising-moon'],
    chartExample: true,
  },
  {
    title: 'Astrological Aspects Explained: Conjunction, Sextile, Square, Trine and Opposition',
    keyword: 'astrology chart',
    volume: 500000,
    cluster: 'charts',
    asset: 'a table of the five major aspects with their angles and the orb astrologers commonly allow, and a worked example that measures the angles between planets in a computed chart',
    links: ['/tools/birth-chart', '/compatibility'],
    chartExample: true,
  },
  {
    title: 'What Is a Cusp Sign? Birthdays Between Two Zodiac Signs Explained',
    keyword: 'zodiac signs dates',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'the sign boundary dates from the facts table, why they move by a day, and a decision procedure for a reader born within a day of a boundary',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Why Zodiac Dates Differ Between Websites and Books',
    keyword: 'zodiac signs and dates',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'an explanation of the Sun entering each sign at a different hour each year, with the standard date table, and when the difference actually matters',
    links: ['/zodiac-signs'],
  },
  {
    title: 'Tropical vs Sidereal Zodiac: Why Western and Vedic Signs Differ',
    keyword: 'vedic astrology',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'a comparison table of the two systems (reference point, sign boundaries, who uses them) and the reason the sidereal dates run roughly 23 to 24 days later',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Synastry Charts Explained: How Astrologers Compare Two Birth Charts',
    keyword: 'synastry chart',
    volume: 50000,
    cluster: 'charts',
    asset: 'a step-by-step comparison of two example placements, showing which aspects between the two charts astrologers look at first, kept honest about being symbolic',
    links: ['/compatibility', '/tools/birth-chart'],
    chartExample: true,
  },
  {
    title: 'Decans Explained: The Three 10-Degree Parts of Each Zodiac Sign',
    keyword: 'zodiac signs personality',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'a table showing how each sign splits into three decans of 10 degrees, how the traditional rulers are assigned, and how to find the decan of a given degree',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Cardinal, Fixed and Mutable Signs: How Modalities Work',
    keyword: 'zodiac signs',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'a table of the twelve signs by modality and season, with the reason each modality starts, holds or ends a season',
    links: ['/zodiac-signs', '/zodiac-signs/element/fire'],
  },
  {
    title: 'Mercury Retrograde Explained: What the Term Means and What It Does Not',
    keyword: 'astrology today',
    volume: 50000,
    cluster: 'charts',
    asset: 'the astronomical reason a planet appears to move backwards, and an honest account of what the astrological tradition claims versus what has no support',
    links: ['/horoscopes/weekly', '/horoscopes/monthly'],
  },
  {
    title: 'How the Moon Changes Sign Every Two and a Half Days',
    keyword: 'astrology forecast today',
    volume: 500000,
    cluster: 'charts',
    asset: 'the arithmetic behind the Moon spending about 2.5 days in each sign (a lunar circuit of about 27.3 days across 12 signs), with a small table and how the weekly horoscope page uses it',
    links: ['/horoscopes/weekly', '/tools/moon-phase'],
  },
  {
    title: 'Chinese Zodiac and the Lunar New Year Cutoff: Which Animal Are You if Born in January or February?',
    keyword: 'chinese zodiac',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'why the animal changes at Chinese New Year rather than January 1, a decision procedure for early-year birthdays, and a worked example with two nearby birth dates',
    links: ['/chinese-zodiac'],
  },
  {
    title: 'How to Calculate Your Life Path Number, Including Master Numbers 11, 22 and 33',
    keyword: 'numerology',
    volume: 5000,
    cluster: 'numbers',
    asset: 'three fully worked reductions of different birth dates, including one that ends on a master number and the common mistake of reducing it too early',
    links: ['/tools/life-path-number', '/life-path/life-path-number-11'],
  },
  {
    title: 'Why Repeating Numbers Seem to Follow You: Angel Numbers and the Frequency Illusion',
    keyword: 'angel numbers',
    volume: 5000,
    cluster: 'numbers',
    asset: 'a side-by-side of the symbolic reading and the psychological explanation for noticing 11:11 or 333, with a simple way to test how often you really see them',
    links: ['/symbols/angel-number-1111', '/symbols/angel-number-333'],
  },
  {
    title: 'How to Keep a Dream Journal That Makes Recurring Dreams Easier to Understand',
    keyword: 'dream dictionary',
    volume: 5000,
    cluster: 'dreams',
    asset: 'a concrete journal template with the fields worth recording, an example entry, and how to spot a recurring pattern across a month of entries',
    links: ['/dreams'],
  },
  {
    title: 'Why We Dream About Falling and Teeth: Common Dream Themes and Ordinary Explanations',
    keyword: 'dream dictionary',
    volume: 5000,
    cluster: 'dreams',
    asset: 'a table of common dream themes with the traditional symbolic reading beside the sleep-science explanation, stating plainly which parts are speculation',
    links: ['/dreams/teeth-falling-out', '/dreams/falling-from-heights'],
  },
];
