import { moonLongitude, sunLongitude, signIndexOf, moonPhase, SIGN_NAMES } from "./astro";

const norm = (x: number) => ((x % 360) + 360) % 360;
const HOUR = 3600 * 1000;
const DAY = 24 * HOUR;

export interface DayInfo {
  date: Date;
  moonSignIndex: number;
  phase: string;
  illumination: number;
}

export function startOfWeekUtc(now: Date): Date {
  const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
  const dow = (d.getUTCDay() + 6) % 7; // Monday = 0
  return new Date(d.getTime() - dow * DAY);
}

export function weekDays(now: Date): DayInfo[] {
  const start = startOfWeekUtc(now);
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(start.getTime() + i * DAY);
    const noon = new Date(date.getTime() + 12 * HOUR);
    const p = moonPhase(noon);
    return { date, moonSignIndex: signIndexOf(moonLongitude(noon)), phase: p.name, illumination: p.illumination };
  });
}

export interface MoonEvent {
  kind: "New Moon" | "Full Moon";
  date: Date;
  signIndex: number;
}

/** New and full Moons (hour precision) inside a UTC month. */
export function monthMoonEvents(year: number, month: number): MoonEvent[] {
  const start = Date.UTC(year, month, 1);
  const end = Date.UTC(year, month + 1, 1);
  const out: MoonEvent[] = [];
  const elong = (t: number) => {
    const d = new Date(t);
    return norm(moonLongitude(d) - sunLongitude(d));
  };
  let prev = elong(start);
  for (let t = start + HOUR; t < end; t += HOUR) {
    const cur = elong(t);
    if (prev > 300 && cur < 60) out.push({ kind: "New Moon", date: new Date(t), signIndex: signIndexOf(moonLongitude(new Date(t))) });
    if (prev < 180 && cur >= 180) out.push({ kind: "Full Moon", date: new Date(t), signIndex: signIndexOf(moonLongitude(new Date(t))) });
    prev = cur;
  }
  return out;
}

export interface SunIngress {
  signIndex: number;
  date: Date;
}

/** Days within the month on which the Sun enters a new sign (day precision, noon UTC). */
export function monthSunIngresses(year: number, month: number): { startSign: number; ingresses: SunIngress[] } {
  const days = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
  const at = (d: number) => signIndexOf(sunLongitude(new Date(Date.UTC(year, month, d, 12))));
  const startSign = at(1);
  const ingresses: SunIngress[] = [];
  let prev = startSign;
  for (let d = 2; d <= days; d++) {
    const cur = at(d);
    if (cur !== prev) ingresses.push({ signIndex: cur, date: new Date(Date.UTC(year, month, d)) });
    prev = cur;
  }
  return { startSign, ingresses };
}

export const signName = (i: number) => SIGN_NAMES[i];

export function fmtDay(d: Date, withWeekday = true): string {
  return new Intl.DateTimeFormat("en-US", {
    timeZone: "UTC",
    weekday: withWeekday ? "short" : undefined,
    month: "short",
    day: "numeric",
  }).format(d);
}

export function fmtDateTimeUtc(d: Date): string {
  return (
    new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hour12: false }).format(d) +
    " UTC"
  );
}
