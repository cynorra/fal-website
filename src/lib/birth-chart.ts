import { moonLongitude, sunLongitude, julianDay, SIGN_NAMES } from "./astro";

// Low-precision planetary positions (Paul Schlyter's "How to compute planetary positions" method).
// Typical error is well under 1 degree for the Sun through Saturn and about 1 degree for Uranus to Pluto,
// which is enough to determine the zodiac sign except when a body is within about a degree of a sign border.

const RAD = Math.PI / 180;
const DEG = 180 / Math.PI;
const norm = (x: number) => ((x % 360) + 360) % 360;
const sin = (d: number) => Math.sin(d * RAD);
const cos = (d: number) => Math.cos(d * RAD);

interface Elements {
  N: number; i: number; w: number; a: number; e: number; M: number;
}

function elementsFor(name: string, d: number): Elements {
  switch (name) {
    case "Mercury":
      return { N: 48.3313 + 3.24587e-5 * d, i: 7.0047 + 5e-8 * d, w: 29.1241 + 1.01444e-5 * d, a: 0.387098, e: 0.205635 + 5.59e-10 * d, M: 168.6562 + 4.0923344368 * d };
    case "Venus":
      return { N: 76.6799 + 2.4659e-5 * d, i: 3.3946 + 2.75e-8 * d, w: 54.891 + 1.38374e-5 * d, a: 0.72333, e: 0.006773 - 1.302e-9 * d, M: 48.0052 + 1.6021302244 * d };
    case "Mars":
      return { N: 49.5574 + 2.11081e-5 * d, i: 1.8497 - 1.78e-8 * d, w: 286.5016 + 2.92961e-5 * d, a: 1.523688, e: 0.093405 + 2.516e-9 * d, M: 18.6021 + 0.5240207766 * d };
    case "Jupiter":
      return { N: 100.4542 + 2.76854e-5 * d, i: 1.303 - 1.557e-7 * d, w: 273.8777 + 1.64505e-5 * d, a: 5.20256, e: 0.048498 + 4.469e-9 * d, M: 19.895 + 0.0830853001 * d };
    case "Saturn":
      return { N: 113.6634 + 2.3898e-5 * d, i: 2.4886 - 1.081e-7 * d, w: 339.3939 + 2.97661e-5 * d, a: 9.55475, e: 0.055546 - 9.499e-9 * d, M: 316.967 + 0.0334442282 * d };
    case "Uranus":
      return { N: 74.0005 + 1.3978e-5 * d, i: 0.7733 + 1.9e-8 * d, w: 96.6612 + 3.0565e-5 * d, a: 19.18171 - 1.55e-8 * d, e: 0.047318 + 7.45e-9 * d, M: 142.5905 + 0.011725806 * d };
    default: // Neptune
      return { N: 131.7806 + 3.0173e-5 * d, i: 1.77 - 2.55e-7 * d, w: 272.8461 - 6.027e-6 * d, a: 30.05826 + 3.313e-8 * d, e: 0.008606 + 2.15e-9 * d, M: 260.2471 + 0.005995147 * d };
  }
}

function solveKepler(M: number, e: number): number {
  let E = M + e * DEG * sin(M) * (1 + e * cos(M));
  for (let k = 0; k < 10; k++) {
    const dE = (E - e * DEG * sin(E) - M) / (1 - e * cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-6) break;
  }
  return E;
}

function helio(name: string, d: number): { x: number; y: number; r: number } {
  const el = elementsFor(name, d);
  const M = norm(el.M);
  const E = solveKepler(M, el.e);
  const xv = el.a * (cos(E) - el.e);
  const yv = el.a * Math.sqrt(1 - el.e * el.e) * sin(E);
  const v = Math.atan2(yv, xv) * DEG;
  const r = Math.sqrt(xv * xv + yv * yv);
  const vw = v + el.w;
  const x = r * (cos(el.N) * cos(vw) - sin(el.N) * sin(vw) * cos(el.i));
  const y = r * (sin(el.N) * cos(vw) + cos(el.N) * sin(vw) * cos(el.i));
  return { x, y, r };
}

export const PLANETS = ["Sun", "Moon", "Mercury", "Venus", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune", "Pluto"] as const;
export type PlanetName = (typeof PLANETS)[number];

/** Ecliptic longitude (0-360, tropical, geocentric) of a body at a UTC instant. */
export function planetLongitude(name: PlanetName, date: Date): number {
  if (name === "Sun") return sunLongitude(date);
  if (name === "Moon") return moonLongitude(date);
  const d = julianDay(date) - 2451543.5;

  // Sun geocentric rectangular coordinates (needed to convert heliocentric to geocentric)
  const sunLon = sunLongitude(date);
  const sunR = (() => {
    const M = norm(356.047 + 0.9856002585 * d);
    const e = 0.016709 - 1.151e-9 * d;
    const E = M + e * DEG * sin(M) * (1 + e * cos(M));
    return Math.sqrt((cos(E) - e) ** 2 + (1 - e * e) * sin(E) ** 2);
  })();
  const xs = sunR * cos(sunLon);
  const ys = sunR * sin(sunLon);

  if (name === "Pluto") {
    const S = 50.03 + 0.033459652 * d;
    const P = 238.95 + 0.003968789 * d;
    const lon =
      238.9508 + 0.00400703 * d -
      19.799 * sin(P) + 19.848 * cos(P) +
      0.897 * sin(2 * P) - 4.956 * cos(2 * P) +
      0.61 * sin(3 * P) + 1.211 * cos(3 * P) -
      0.341 * sin(4 * P) - 0.19 * cos(4 * P) +
      0.128 * sin(5 * P) - 0.034 * cos(5 * P) -
      0.038 * sin(6 * P) + 0.031 * cos(6 * P) +
      0.02 * sin(S - P) - 0.01 * cos(S - P);
    const r = 40.72 + 6.68 * sin(P) + 6.9 * cos(P) - 1.18 * sin(2 * P) - 0.03 * cos(2 * P) + 0.15 * sin(3 * P) - 0.14 * cos(3 * P);
    const xg = r * cos(lon) + xs;
    const yg = r * sin(lon) + ys;
    return norm(Math.atan2(yg, xg) * DEG);
  }

  const h = helio(name, d);
  const xg = h.x + xs;
  const yg = h.y + ys;
  let lon = Math.atan2(yg, xg) * DEG;

  // Mutual perturbations of the giant planets
  const Mj = elementsFor("Jupiter", d).M;
  const Ms = elementsFor("Saturn", d).M;
  const Mu = elementsFor("Uranus", d).M;
  if (name === "Jupiter") {
    lon +=
      -0.332 * sin(2 * Mj - 5 * Ms - 67.6) - 0.056 * sin(2 * Mj - 2 * Ms + 21) + 0.042 * sin(3 * Mj - 5 * Ms + 21) -
      0.036 * sin(Mj - 2 * Ms) + 0.022 * cos(Mj - Ms) + 0.023 * sin(2 * Mj - 3 * Ms + 52) - 0.016 * sin(Mj - 5 * Ms - 69);
  } else if (name === "Saturn") {
    lon +=
      0.812 * sin(2 * Mj - 5 * Ms - 67.6) - 0.229 * cos(2 * Mj - 4 * Ms - 2) + 0.119 * sin(Mj - 2 * Ms - 3) +
      0.046 * sin(2 * Mj - 6 * Ms - 69) + 0.014 * sin(Mj - 3 * Ms + 32);
  } else if (name === "Uranus") {
    lon += 0.04 * sin(Ms - 2 * Mu + 6) + 0.035 * sin(Ms - 3 * Mu + 33) - 0.015 * sin(Mj - Mu + 20);
  }
  return norm(lon);
}

export interface PlacedBody {
  name: PlanetName;
  longitude: number;
  signIndex: number;
  sign: string;
  degree: number; // 0-29
  minute: number;
}

export function place(name: PlanetName, longitude: number): PlacedBody {
  const lon = norm(longitude);
  const signIndex = Math.floor(lon / 30);
  const inSign = lon - signIndex * 30;
  return { name, longitude: lon, signIndex, sign: SIGN_NAMES[signIndex], degree: Math.floor(inSign), minute: Math.floor((inSign % 1) * 60) };
}

// Greenwich mean sidereal time in degrees
function gmst(date: Date): number {
  const d = julianDay(date) - 2451545.0;
  return norm(280.46061837 + 360.98564736629 * d);
}

function obliquity(date: Date): number {
  const T = (julianDay(date) - 2451545.0) / 36525;
  return 23.439291 - 0.0130042 * T;
}

/** Ascendant and Midheaven longitudes for a UTC instant at geographic latitude / east longitude (degrees). */
export function angles(date: Date, latitude: number, longitudeEast: number): { asc: number; mc: number } {
  const ramc = norm(gmst(date) + longitudeEast);
  const eps = obliquity(date);
  const asc = Math.atan2(cos(ramc), -(sin(eps) * Math.tan(latitude * RAD) + cos(eps) * sin(ramc))) * DEG;
  const mc = Math.atan2(sin(ramc), cos(ramc) * cos(eps)) * DEG;
  return { asc: norm(asc), mc: norm(mc) };
}

/** UTC offset in minutes for an IANA zone at a given local wall-clock time (uses the browser tz database). */
export function localToUtc(tz: string, y: number, mo: number, d: number, h: number, mi: number): Date {
  const fmt = new Intl.DateTimeFormat("en-US", {
    timeZone: tz,
    hourCycle: "h23",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const offsetAt = (ms: number) => {
    const p = Object.fromEntries(fmt.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
    const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
    return asUtc - Math.floor(ms / 1000) * 1000;
  };
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  const o1 = offsetAt(guess);
  let t = guess - o1;
  const o2 = offsetAt(t);
  if (o2 !== o1) t = guess - o2;
  return new Date(t);
}

export interface ChartResult {
  bodies: PlacedBody[];
  asc?: PlacedBody;
  mc?: PlacedBody;
  utc: Date;
}

export function computeChart(utc: Date, coords?: { lat: number; lon: number }): ChartResult {
  const bodies = PLANETS.map((n) => place(n, planetLongitude(n, utc)));
  if (!coords) return { bodies, utc };
  const a = angles(utc, coords.lat, coords.lon);
  return { bodies, asc: place("Sun", a.asc), mc: place("Sun", a.mc), utc };
}
