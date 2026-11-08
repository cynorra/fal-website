/**
 * Evidence the article must use: a worked example computed by the SAME code the site's
 * birth chart calculator runs (src/lib/birth-chart.ts), so the placements in an article are
 * real calculations, never invented. The birth is fictional (not a real person).
 */
import { computeChart } from '../../../src/lib/birth-chart';

export interface ChartExample {
  date: string; // YYYY-MM-DD
  time: string; // HH:MM UTC
  placements: { body: string; sign: string; degree: number; minute: number }[];
  asc?: string;
}

function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

/** A deterministic example birth for a slug: a date in 1970-1999, 06:00-17:59 UTC, London coordinates for the Rising sign. */
export function chartExampleFor(slug: string): ChartExample {
  const h = hash(slug);
  const year = 1970 + (h % 30);
  const month = ((h >> 5) % 12) + 1;
  const day = ((h >> 9) % 28) + 1;
  const hour = 6 + ((h >> 14) % 12);
  const minute = ((h >> 18) % 4) * 15;
  const utc = new Date(Date.UTC(year, month - 1, day, hour, minute));
  const c = computeChart(utc, { lat: 51.5, lon: -0.12 });
  return {
    date: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    time: `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} UTC`,
    placements: c.bodies.map((b) => ({ body: b.name, sign: b.sign, degree: b.degree, minute: b.minute })),
    asc: c.asc ? `${c.asc.sign} ${c.asc.degree}°${String(c.asc.minute).padStart(2, '0')}'` : undefined,
  };
}

export function chartExampleBlock(ex: ChartExample): string {
  return `\nWORKED EXAMPLE DATA (computed by this site's own birth chart calculator; a FICTIONAL example birth, never describe it as a real person or a celebrity):
Birth: ${ex.date}, ${ex.time}, London (51.5N, 0.12W).
${ex.placements.map((p) => `- ${p.body} in ${p.sign} at ${p.degree}°${String(p.minute).padStart(2, '0')}'`).join('\n')}
${ex.asc ? `- Rising sign (Ascendant): ${ex.asc}\n` : ''}Use at least 4 of these placements, with their exact signs, in the article. Do not add other placements, degrees or dates that are not listed. Whole-sign houses: the Rising sign is the 1st house and each following sign is the next house.\n`;
}

/** At least `need` of the supplied placements must appear as "<Body> in <Sign>". */
export function findExampleUsageIssues(html: string, ex: ChartExample | undefined, need = 4): string[] {
  if (!ex) return [];
  const plain = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const used = ex.placements.filter((p) => new RegExp(`${p.body}\\s+(?:is\\s+)?in\\s+${p.sign}`, 'i').test(plain) || new RegExp(`${p.body}[^.]{0,25}${p.sign}`, 'i').test(plain));
  return used.length >= need ? [] : [`uses only ${used.length} of the supplied example placements (need ${need}): work the example with its exact signs, e.g. "${ex.placements[0].body} in ${ex.placements[0].sign}"`];
}
