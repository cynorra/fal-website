/**
 * Topic queue for the generator, taken from the Keyword Planner exports in the repo root
 * (Keyword Stats 2026-11-08 *.csv; volumes are Google's bucketed monthly searches).
 * `volume: 0` means the keyword is not in the current export (volume unknown); never invent a volume.
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
    keyword: 'birth chart',
    volume: 500000,
    cluster: 'charts',
    asset: 'a table of which placements change within a day (Rising sign, houses, the Moon) and which barely move (outer planets), with computed examples',
    links: ['/tools/birth-chart', '/tools/rising-moon'],
    chartExample: true,
  },
  {
    title: 'Astrological Aspects Explained: Conjunction, Sextile, Square, Trine and Opposition',
    keyword: 'astrological aspects',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'charts',
    asset: 'a table of the five major aspects with their angles and the orb astrologers commonly allow, and a worked example that measures the angles between planets in a computed chart',
    links: ['/tools/birth-chart', '/compatibility'],
    chartExample: true,
  },
  {
    title: 'What Is a Cusp Sign? Birthdays Between Two Zodiac Signs Explained',
    keyword: 'zodiac signs',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'the sign boundary dates from the facts table, why they move by a day, and a decision procedure for a reader born within a day of a boundary',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Why Zodiac Signs and Dates Differ Between Websites and Books',
    keyword: 'zodiac signs and dates',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'an explanation of the Sun entering each sign at a different hour each year, with the standard date table, and when the difference actually matters',
    links: ['/zodiac-signs'],
  },
  {
    title: 'Tropical vs Sidereal Zodiac: Why Western and Vedic Astrology Differ',
    keyword: 'vedic astrology',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'a comparison table of the two systems (reference point, sign boundaries, who uses them) and the reason the sidereal dates run roughly 23 to 24 days later',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Synastry Chart Explained: How Astrologers Compare Two Birth Charts',
    keyword: 'synastry chart',
    volume: 50000,
    cluster: 'charts',
    asset: 'a step-by-step comparison of two example placements, showing which aspects between the two charts astrologers look at first, kept honest about being symbolic',
    links: ['/compatibility', '/tools/birth-chart'],
    chartExample: true,
  },
  {
    title: 'Decans Explained: The Three 10-Degree Parts of Each Zodiac Sign',
    keyword: 'decans',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'zodiac',
    asset: 'a table showing how each sign splits into three decans of 10 degrees, how the traditional rulers are assigned, and how to find the decan of a given degree',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Cardinal, Fixed and Mutable Zodiac Signs: How Modalities Work',
    keyword: 'zodiac signs',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'a table of the twelve signs by modality and season, with the reason each modality starts, holds or ends a season',
    links: ['/zodiac-signs', '/zodiac-signs/element/fire'],
  },
  {
    title: 'Mercury Retrograde Explained: What the Term Means and What It Does Not',
    keyword: 'mercury retrograde',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'charts',
    asset: 'the astronomical reason a planet appears to move backwards, and an honest account of what the astrological tradition claims versus what has no support',
    links: ['/horoscopes/weekly', '/horoscopes/monthly'],
  },
  {
    title: 'How the Moon Changes Sign Every Two and a Half Days',
    keyword: 'moon sign',
    volume: 50000,
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
    keyword: 'life path number',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'numbers',
    asset: 'three fully worked reductions of different birth dates, including one that ends on a master number and the common mistake of reducing it too early',
    links: ['/tools/life-path-number', '/life-path/life-path-number-11'],
  },
  {
    title: 'Why Repeating Numbers Seem to Follow You: Angel Numbers and the Frequency Illusion',
    keyword: 'angel numbers',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'numbers',
    asset: 'a side-by-side of the symbolic reading and the psychological explanation for noticing 11:11 or 333, with a simple way to test how often you really see them',
    links: ['/symbols/angel-number-1111', '/symbols/angel-number-333'],
  },
  {
    title: 'How to Keep a Dream Journal That Makes Recurring Dreams Easier to Understand',
    keyword: 'dream journal',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'dreams',
    asset: 'a concrete journal template with the fields worth recording, an example entry, and how to spot a recurring pattern across a month of entries',
    links: ['/dreams'],
  },
  {
    title: 'Why We Dream About Falling and Teeth: Common Dream Themes and Ordinary Explanations',
    keyword: 'dream about falling',
    volume: 0, // not in the current Keyword Planner export: volume unknown
    cluster: 'dreams',
    asset: 'a table of common dream themes with the traditional symbolic reading beside the sleep-science explanation, stating plainly which parts are speculation',
    links: ['/dreams/teeth-falling-out', '/dreams/falling-from-heights'],
  },
  // ---- added 2026-11-08 from the Keyword Planner export (volumes are the export's buckets) ----
  {
    title: 'What Is a Moon Sign? How It Is Calculated and What Astrologers Say It Shows',
    keyword: 'moon sign',
    volume: 50000,
    cluster: 'charts',
    asset: 'a worked example that finds the Moon sign of a fictional birth from its computed position, a table of how long the Moon stays in a sign, and the common mistake of confusing the Moon sign with the Sun sign',
    links: ['/tools/rising-moon', '/tools/birth-chart', '/horoscopes/weekly'],
    chartExample: true,
  },
  {
    title: 'Rising Sign (Ascendant) Explained: Why It Changes About Every Two Hours',
    keyword: 'rising sign',
    volume: 50000,
    cluster: 'charts',
    asset: 'the reason the Ascendant moves through all twelve signs in a day, a table of the approximate time each sign rises, and a worked example in which a few minutes of birth-time error would or would not change the sign',
    links: ['/tools/rising-moon', '/tools/birth-chart'],
    chartExample: true,
  },
  {
    title: 'How to Read a Natal Chart Step by Step for Beginners',
    keyword: 'natal chart',
    volume: 50000,
    cluster: 'charts',
    asset: 'a numbered reading order (Sun, Moon, Rising sign, then planets, houses and aspects) applied to one computed example chart, with the placements shown at each step',
    links: ['/tools/birth-chart', '/zodiac-signs'],
    chartExample: true,
  },
  {
    title: 'Natal Chart vs Birth Chart: Are They Different?',
    keyword: 'birth chart natal chart',
    volume: 500000,
    cluster: 'charts',
    asset: 'a short comparison table of the terms people use for the same chart (natal chart, birth chart, astrology chart, horoscope chart), and what the word horoscope means in astrology versus in a newspaper column',
    links: ['/tools/birth-chart', '/horoscopes'],
  },
  {
    title: 'Ascendant Calculator Explained: How the Rising Sign Is Worked Out From Time and Place',
    keyword: 'ascendant calculator',
    volume: 50000,
    cluster: 'charts',
    asset: 'a plain-language walk through the inputs a calculator needs (date, exact time, time zone, latitude and longitude), why each one matters, and a worked example with the resulting Rising sign',
    links: ['/tools/rising-moon', '/tools/birth-chart'],
    chartExample: true,
  },
  {
    title: 'Natal Chart Compatibility: Which Placements Astrologers Compare Beyond the Sun Sign',
    keyword: 'natal chart compatibility',
    volume: 50000,
    cluster: 'charts',
    asset: 'a table of the placements usually compared between two charts (Sun, Moon, Venus, Mars, Rising) and what each pairing is traditionally said to show, with a clear statement of how little evidence there is for any of it',
    links: ['/compatibility', '/tools/birth-chart'],
    chartExample: true,
  },
  {
    title: 'Vedic Astrology Chart Basics: Sidereal Signs and the Ayanamsa Shift',
    keyword: 'vedic astrology chart',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'a table comparing the same example date in the tropical and sidereal zodiacs, and the idea of the ayanamsa as the offset between the two systems, without claiming details of Vedic interpretation that the page cannot support',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: "Mayan Astrology: How the 260-Day Tzolk'in Calendar Is Built",
    keyword: 'mayan astrology',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'the arithmetic of the 260-day cycle (13 numbers combined with 20 day signs), a table showing how the two counts interlock, and an honest note on what is documented about the calendar versus modern astrology built on it',
    links: ['/chinese-zodiac', '/zodiac-signs'],
  },
  {
    title: 'Hindu Astrology (Jyotisha) Explained: How It Differs From Western Astrology',
    keyword: 'hindu astrology',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'a comparison table of the two traditions on the points that can be stated safely (zodiac type, the rising sign as the starting point, the Moon sign emphasis in some Indian practice), without inventing technical detail',
    links: ['/zodiac-signs', '/tools/rising-moon'],
  },
  {
    title: 'Ophiuchus Zodiac Sign: Why the Sun Crosses a 13th Constellation but Astrology Keeps 12 Signs',
    keyword: 'ophiuchus zodiac',
    volume: 5000,
    cluster: 'zodiac',
    asset: 'the difference between a constellation and a 30-degree sign, the idea of precession shifting the two apart, and a table of why twelve equal signs are used, stated without disputed date claims',
    links: ['/zodiac-signs'],
  },
  {
    title: 'Western Astrology Explained: The Tropical Zodiac, Planets, Houses and Aspects',
    keyword: 'western astrology',
    volume: 5000,
    cluster: 'zodiac',
    asset: 'a one-page map of how the parts fit together (zodiac, planets, houses, aspects) with a table of what each part answers, linking to the detailed guides on this site for each',
    links: ['/zodiac-signs', '/tools/birth-chart'],
  },
  {
    title: 'Virgo Moon Sign: What a Moon in Virgo Means in Each of the 12 Houses',
    keyword: 'virgo moon sign',
    volume: 5000,
    cluster: 'charts',
    asset: 'a table of the Moon in Virgo placed in each of the 12 whole-sign houses, using the site house descriptions, and how Virgo as a mutable earth sign colours the Moon',
    links: ['/horoscopes/virgo', '/tools/rising-moon'],
  },
  {
    title: 'Scorpio Moon Sign: How a Moon in Scorpio Differs From a Sun in Scorpio',
    keyword: 'scorpio moon sign',
    volume: 5000,
    cluster: 'charts',
    asset: 'a side-by-side table of the Sun in Scorpio and the Moon in Scorpio (what each is said to describe), and how Scorpio as a fixed water sign shapes both',
    links: ['/horoscopes/scorpio', '/tools/rising-moon'],
  },
  {
    title: 'Sagittarius Moon Sign: How a Fire-Sign Moon Differs From an Earth or Water Moon',
    keyword: 'sagittarius moon sign',
    volume: 5000,
    cluster: 'charts',
    asset: 'a comparison table of a Moon in Sagittarius against Moons in Aries, Leo, Taurus and Cancer, using element and modality, with the traditional reading of each stated as tradition',
    links: ['/horoscopes/sagittarius', '/zodiac-signs'],
  },
  {
    title: 'Pisces Moon Sign: What a Mutable Water Moon Is Said to Show',
    keyword: 'pisces moon sign',
    volume: 5000,
    cluster: 'charts',
    asset: 'how a Moon in Pisces compares with the other two water Moons (Cancer and Scorpio) on modality and ruler, plus the 12-house table of what a Pisces Moon is traditionally read to emphasise',
    links: ['/horoscopes/pisces', '/zodiac-signs/element/water'],
  },
  {
    title: 'Astrology Compatibility Beyond Sun Signs: Elements, Aspects and the Moon',
    keyword: 'astrology compatibility',
    volume: 50000,
    cluster: 'zodiac',
    asset: 'a table of the five layers astrologers cite (element, modality, aspect, Moon, Venus and Mars) with how this site scores a pair, and an honest statement about the lack of evidence for compatibility claims',
    links: ['/compatibility', '/zodiac-signs/element/fire'],
  },
  {
    title: 'Chinese Zodiac Elements: How Wood, Fire, Earth, Metal and Water Change Each Animal',
    keyword: 'chinese zodiac',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'the rule that links a year ending digit to an element, a 60-year cycle table showing one full run of animal and element pairs, and a worked example for a specific birth year',
    links: ['/chinese-zodiac', '/chinese-zodiac/year/1990'],
  },
  {
    title: 'Chinese Astrology Signs Beyond the Animal Year: Hours, Months and the Four Pillars',
    keyword: 'chinese astrology signs',
    volume: 500000,
    cluster: 'zodiac',
    asset: 'a table of the twelve two-hour periods and their animals, and an explanation of why the birth hour, day, month and year are called four pillars, kept to widely documented structure',
    links: ['/chinese-zodiac'],
  },
  {
    title: 'Numerology and Astrology: How the Two Systems Differ',
    keyword: 'numerology and astrology',
    volume: 500,
    cluster: 'numbers',
    asset: 'a comparison table of what each system uses as input (birth date digits versus planetary positions), what each outputs, and a worked example of the same birth date run through the Life Path method and a birth chart',
    links: ['/tools/life-path-number', '/tools/birth-chart'],
  },
];
