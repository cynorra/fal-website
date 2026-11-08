import { moonLongitude, sunLongitude } from "./astro";

// Chinese New Year = start of month 1 = the 2nd new moon after the December solstice,
// with dates taken in China Standard Time (UTC+8). Rare leap-month years (e.g. 2033) are an exception.

const DAY = 86400000;
const CST = 8 * 3600000;

const norm180 = (x: number) => ((((x + 180) % 360) + 360) % 360) - 180;

function elongation(t: number): number {
  const d = new Date(t);
  return norm180(moonLongitude(d) - sunLongitude(d));
}

/** First new moon (elongation crosses 0 going up) at or after `from` (ms), via scan + bisection. */
function nextNewMoon(from: number): number {
  let t = from;
  let prev = elongation(t);
  for (let n = 0; n < 40 * 24; n++) {
    const nt = t + 3600000;
    const cur = elongation(nt);
    if (prev < 0 && cur >= 0 && Math.abs(cur - prev) < 90) {
      let lo = t;
      let hi = nt;
      for (let k = 0; k < 30; k++) {
        const mid = (lo + hi) / 2;
        if (elongation(mid) < 0) lo = mid;
        else hi = mid;
      }
      return (lo + hi) / 2;
    }
    t = nt;
    prev = cur;
  }
  return from;
}

const cstDay = (t: number) => Math.floor((t + CST) / DAY);

const cache = new Map<number, { month: number; day: number }>();

/** Gregorian date (month 1-12, day) of Chinese New Year in the given Gregorian year. */
export function chineseNewYear(year: number): { month: number; day: number } {
  const hit = cache.get(year);
  if (hit) return hit;
  // December solstice of the previous year, approx Dec 21 12:00 UTC (refined by bisection on solar longitude 270)
  let lo = Date.UTC(year - 1, 11, 19);
  let hi = Date.UTC(year - 1, 11, 24);
  for (let k = 0; k < 30; k++) {
    const mid = (lo + hi) / 2;
    const lon = sunLongitude(new Date(mid));
    if (lon < 270 && lon > 180) lo = mid;
    else hi = mid;
  }
  const solstice = (lo + hi) / 2;
  const solsticeDay = cstDay(solstice);

  // N0 = last new moon on or before the solstice day (CST); then month 12 = N1, month 1 = N2
  let nm = nextNewMoon(solstice - 31 * DAY);
  const moons: number[] = [];
  while (moons.length < 5) {
    moons.push(nm);
    nm = nextNewMoon(nm + 20 * DAY);
  }
  const startIdx = moons.findIndex((m, i) => cstDay(m) <= solsticeDay && (i + 1 >= moons.length || cstDay(moons[i + 1]) > solsticeDay));
  const cny = moons[startIdx + 2];
  const d = new Date(cny + CST);
  const out = { month: d.getUTCMonth() + 1, day: d.getUTCDate() };
  cache.set(year, out);
  return out;
}

export const ANIMALS = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"] as const;
export const ELEMENTS = ["Wood", "Fire", "Earth", "Metal", "Water"] as const;

/** Animal and element for a Gregorian date, respecting the Chinese New Year boundary. */
export function chineseZodiac(year: number, month = 7, day = 1): { animal: string; element: string; polarity: string; zodiacYear: number } {
  const cny = chineseNewYear(year);
  const zodiacYear = month < cny.month || (month === cny.month && day < cny.day) ? year - 1 : year;
  const animal = ANIMALS[(((zodiacYear - 4) % 12) + 12) % 12];
  const element = ELEMENTS[Math.floor((((zodiacYear - 4) % 10) + 10) % 10 / 2)];
  return { animal, element, polarity: zodiacYear % 2 === 0 ? "Yang" : "Yin", zodiacYear };
}
