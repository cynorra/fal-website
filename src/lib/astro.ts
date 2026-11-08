// Low-precision astronomy helpers (accurate to well under a degree for the Sun, ~0.3 degrees for the Moon).
// Good enough to decide which zodiac sign a body is in, and the Moon phase, on a given day.

const RAD = Math.PI / 180;
export const SIGN_NAMES = [
  "Aries",
  "Taurus",
  "Gemini",
  "Cancer",
  "Leo",
  "Virgo",
  "Libra",
  "Scorpio",
  "Sagittarius",
  "Capricorn",
  "Aquarius",
  "Pisces",
];

export function julianDay(date: Date): number {
  return date.getTime() / 86400000 + 2440587.5;
}

const norm = (x: number) => ((x % 360) + 360) % 360;

export function sunLongitude(date: Date): number {
  const n = julianDay(date) - 2451545.0;
  const L = 280.46 + 0.9856474 * n;
  const g = (357.528 + 0.9856003 * n) * RAD;
  return norm(L + 1.915 * Math.sin(g) + 0.02 * Math.sin(2 * g));
}

export function moonLongitude(date: Date): number {
  const T = (julianDay(date) - 2451545.0) / 36525;
  const L =
    218.32 +
    481267.881 * T +
    6.29 * Math.sin((135.0 + 477198.87 * T) * RAD) -
    1.27 * Math.sin((259.3 - 413335.36 * T) * RAD) +
    0.66 * Math.sin((235.7 + 890534.22 * T) * RAD) +
    0.21 * Math.sin((269.9 + 954397.74 * T) * RAD) -
    0.19 * Math.sin((357.5 + 35999.05 * T) * RAD) -
    0.11 * Math.sin((186.5 + 966404.03 * T) * RAD);
  return norm(L);
}

export const signIndexOf = (lon: number) => Math.floor(norm(lon) / 30);

export interface MoonPhaseInfo {
  name: string;
  illumination: number; // 0-100
  waxing: boolean;
}

export function moonPhase(date: Date): MoonPhaseInfo {
  const elong = norm(moonLongitude(date) - sunLongitude(date));
  const illumination = Math.round(((1 - Math.cos(elong * RAD)) / 2) * 100);
  const waxing = elong < 180;
  let name = "New Moon";
  if (elong >= 22.5 && elong < 67.5) name = "Waxing Crescent";
  else if (elong >= 67.5 && elong < 112.5) name = "First Quarter";
  else if (elong >= 112.5 && elong < 157.5) name = "Waxing Gibbous";
  else if (elong >= 157.5 && elong < 202.5) name = "Full Moon";
  else if (elong >= 202.5 && elong < 247.5) name = "Waning Gibbous";
  else if (elong >= 247.5 && elong < 292.5) name = "Last Quarter";
  else if (elong >= 292.5 && elong < 337.5) name = "Waning Crescent";
  return { name, illumination, waxing };
}

export const HOUSE_THEMES: { name: string; theme: string; advice: string }[] = [
  { name: "1st house", theme: "self, body and first impressions", advice: "Your mood and energy are in the spotlight. It is a good day to start something personal or to pay attention to how you present yourself." },
  { name: "2nd house", theme: "money, possessions and self-worth", advice: "Attention turns to resources and values. Review a budget, handle a purchase carefully and notice what you truly value." },
  { name: "3rd house", theme: "communication, siblings and short trips", advice: "Conversations, messages and errands are favored. Reach out to someone, write, or learn something small but useful." },
  { name: "4th house", theme: "home, family and roots", advice: "Emotions gravitate toward home and family. Tidy your space, call a relative or simply give yourself a quiet evening." },
  { name: "5th house", theme: "romance, creativity and play", advice: "A playful, expressive day. Make something, flirt, or take time for a hobby that has no purpose except joy." },
  { name: "6th house", theme: "work routines, health and service", advice: "Practical matters shine. Clear a task list, adjust a habit or look after your body with small, steady steps." },
  { name: "7th house", theme: "partnerships and one-to-one relationships", advice: "Other people are in focus. Listen carefully, handle a negotiation with fairness and check in with a partner or close friend." },
  { name: "8th house", theme: "shared resources, intimacy and change", advice: "A deeper, more private mood. Be honest about shared finances or feelings, and let go of something you have outgrown." },
  { name: "9th house", theme: "travel, learning and big ideas", advice: "Curiosity expands. Study, plan a trip, or explore a belief or philosophy that stretches your usual view." },
  { name: "10th house", theme: "career, reputation and goals", advice: "Ambition and visibility rise. Make progress on a goal that matters publicly and communicate your achievements clearly." },
  { name: "11th house", theme: "friends, groups and future hopes", advice: "Community is highlighted. Connect with friends, join a conversation or work on a long-term wish with others." },
  { name: "12th house", theme: "rest, solitude and the subconscious", advice: "A quiet, reflective day. Rest, journal and give yourself space; avoid forcing decisions while you recharge." },
];

export const PHASE_ADVICE: Record<string, string> = {
  "New Moon": "A time for quiet reset and setting intentions rather than forcing results.",
  "Waxing Crescent": "Momentum is building. Take the first small step on what you set out to do.",
  "First Quarter": "Tension between plan and reality often appears. Make a decision and adjust.",
  "Waxing Gibbous": "Refine and prepare. Details matter as a project nears completion.",
  "Full Moon": "Emotions and results are visible. A good moment to celebrate, release or see clearly.",
  "Waning Gibbous": "Share what you have learned and express gratitude.",
  "Last Quarter": "Let go of what no longer works and simplify.",
  "Waning Crescent": "Rest and recover before the next cycle begins.",
};

export interface DailyTransit {
  moonSign: string;
  moonSignIndex: number;
  phase: MoonPhaseInfo;
  sunSign: string;
}

export function dailyTransit(date: Date = new Date()): DailyTransit {
  const moonSignIndex = signIndexOf(moonLongitude(date));
  return {
    moonSign: SIGN_NAMES[moonSignIndex],
    moonSignIndex,
    phase: moonPhase(date),
    sunSign: SIGN_NAMES[signIndexOf(sunLongitude(date))],
  };
}

/** Whole-sign house number (1-12) that the Moon occupies for someone with the given Sun/Rising sign index. */
export function houseFor(signIndex: number, bodySignIndex: number): number {
  return ((bodySignIndex - signIndex + 12) % 12) + 1;
}

const CHALDEAN = ["Mars", "Sun", "Venus", "Mercury", "Moon", "Saturn", "Jupiter"];
const SIGN_STARTS: [number, number][] = [
  [3, 21], [4, 20], [5, 21], [6, 21], [7, 23], [8, 23], [9, 23], [10, 23], [11, 22], [12, 22], [1, 20], [2, 19],
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const fmt = (d: Date) => `${MONTHS[d.getUTCMonth()]} ${d.getUTCDate()}`;

/** Three 10-degree decans with Chaldean-order rulers and approximate dates. */
export function decans(signIndex: number): { range: string; ruler: string }[] {
  const [m, d] = SIGN_STARTS[signIndex];
  const start = Date.UTC(2023, m - 1, d); // non-leap reference year; dates are approximate
  const next = SIGN_STARTS[(signIndex + 1) % 12];
  let endYear = 2023;
  if (next[0] < m) endYear = 2024;
  const end = Date.UTC(endYear, next[0] - 1, next[1]) - 86400000;
  const parts = [
    [start, start + 9 * 86400000],
    [start + 10 * 86400000, start + 19 * 86400000],
    [start + 20 * 86400000, end],
  ];
  return parts.map(([a, b], i) => ({
    range: `${fmt(new Date(a))} – ${fmt(new Date(b))}`,
    ruler: CHALDEAN[(signIndex * 3 + i) % 7],
  }));
}

/** Sun sign by calendar date (tropical, standard boundaries). `cusp` is true within a day of a boundary. */
export function signByDate(month: number, day: number): { index: number; cusp: boolean } {
  const doy = (m: number, d: number) => Date.UTC(2023, m - 1, d) / 86400000;
  const t = doy(month, day);
  let found = 9; // Capricorn covers Dec 22 - Jan 19
  for (let i = 0; i < 12; i++) {
    const [m, d] = SIGN_STARTS[i];
    const start = doy(m, d);
    const [nm, nd] = SIGN_STARTS[(i + 1) % 12];
    let end = doy(nm, nd);
    if (end <= start) end += 365;
    const tt = t < start && start > end - 365 && t + 365 < end ? t + 365 : t;
    if (tt >= start && tt < end) {
      found = i;
      const cusp = tt - start < 1 || end - tt <= 1;
      return { index: found, cusp };
    }
  }
  return { index: found, cusp: false };
}
