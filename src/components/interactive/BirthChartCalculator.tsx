"use client";

import React, { useMemo, useState } from "react";
import Link from "next/link";
import { CITIES } from "@/lib/cities";
import { computeChart, localToUtc, ChartResult, PlacedBody } from "@/lib/birth-chart";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { ZODIAC_PROFILES } from "@/lib/zodiac-profiles";
import { planetReading, HOUSE_MEANING } from "@/lib/planet-text";
import { SIGN_NAMES } from "@/lib/astro";

const GLYPH: Record<string, string> = {
  Sun: "☉", Moon: "☽", Mercury: "☿", Venus: "♀", Mars: "♂", Jupiter: "♃", Saturn: "♄", Uranus: "♅", Neptune: "♆", Pluto: "♇",
};
const SIGN_GLYPH = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];
const ELEMENT = ["Fire", "Earth", "Air", "Water"];
const MODALITY = ["Cardinal", "Fixed", "Mutable"];

const fmtPos = (b: PlacedBody) => `${b.degree}° ${String(b.minute).padStart(2, "0")}′`;

function Wheel({ chart, hasAngles }: { chart: ChartResult; hasAngles: boolean }) {
  const ascLon = hasAngles && chart.asc ? chart.asc.signIndex * 30 : 0; // whole-sign: first house starts at the sign boundary
  const toAngle = (lon: number) => ((180 + (lon - ascLon)) * Math.PI) / 180; // Asc sign boundary at 9 o'clock, signs run counter-clockwise
  const cx = 160;
  const cy = 160;
  const pt = (lon: number, r: number) => [cx + r * Math.cos(toAngle(lon)), cy - r * Math.sin(toAngle(lon))];

  const sorted = [...chart.bodies].sort((a, b) => a.longitude - b.longitude);
  const radii: Record<string, number> = {};
  let last = -100;
  let tier = 0;
  sorted.forEach((b) => {
    tier = b.longitude - last < 9 ? (tier + 1) % 3 : 0;
    radii[b.name] = 90 - tier * 16;
    last = b.longitude;
  });

  return (
    <svg viewBox="0 0 320 320" className="w-full max-w-sm mx-auto" role="img" aria-label="Birth chart wheel">
      <circle cx={cx} cy={cy} r={150} fill="none" stroke="rgba(255,255,255,0.25)" />
      <circle cx={cx} cy={cy} r={115} fill="none" stroke="rgba(255,255,255,0.2)" />
      <circle cx={cx} cy={cy} r={50} fill="none" stroke="rgba(255,255,255,0.15)" />
      {Array.from({ length: 12 }).map((_, i) => {
        const lon = i * 30;
        const [x1, y1] = pt(lon, 115);
        const [x2, y2] = pt(lon, 150);
        const [x3, y3] = pt(lon, 50);
        const [gx, gy] = pt(lon + 15, 132);
        return (
          <g key={i}>
            <line x1={x3} y1={y3} x2={x2} y2={y2} stroke="rgba(255,255,255,0.18)" />
            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(255,255,255,0.3)" />
            <text x={gx} y={gy} fill="#fcd34d" fontSize="14" textAnchor="middle" dominantBaseline="central">
              {SIGN_GLYPH[i]}
            </text>
          </g>
        );
      })}
      {hasAngles &&
        Array.from({ length: 12 }).map((_, h) => {
          const signIdx = ((chart.asc?.signIndex ?? 0) + h) % 12;
          const [nx, ny] = pt(signIdx * 30 + 15, 62);
          return (
            <text key={h} x={nx} y={ny} fill="rgba(255,255,255,0.45)" fontSize="9" textAnchor="middle" dominantBaseline="central">
              {h + 1}
            </text>
          );
        })}
      {chart.bodies.map((b) => {
        const [x, y] = pt(b.longitude, radii[b.name]);
        return (
          <text key={b.name} x={x} y={y} fill="#e9d5ff" fontSize="15" textAnchor="middle" dominantBaseline="central">
            {GLYPH[b.name]}
          </text>
        );
      })}
    </svg>
  );
}

export function BirthChartCalculator() {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00");
  const [timeUnknown, setTimeUnknown] = useState(false);
  const [query, setQuery] = useState("");
  const [custom, setCustom] = useState(false);
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [offset, setOffset] = useState("0");
  const [error, setError] = useState("");
  const [chart, setChart] = useState<ChartResult | null>(null);
  const [hasAngles, setHasAngles] = useState(false);
  const [placeLabel, setPlaceLabel] = useState("");

  const cityOptions = useMemo(() => CITIES.map((c) => `${c.name}, ${c.country}`), []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const dm = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!dm) return setError("Please enter your birth date.");
    const [y, mo, d] = [Number(dm[1]), Number(dm[2]), Number(dm[3])];
    if (y < 1900 || y > 2100) return setError("Please choose a year between 1900 and 2100.");
    const [hh, mm] = timeUnknown ? [12, 0] : time.split(":").map(Number);

    let utc: Date;
    let coords: { lat: number; lon: number } | undefined;
    let label = "";

    if (custom) {
      const la = Number(lat);
      const lo = Number(lon);
      const off = Number(offset);
      if (!lat || !lon || Number.isNaN(la) || Number.isNaN(lo) || Math.abs(la) > 89 || Math.abs(lo) > 180) {
        return setError("Enter latitude (-89 to 89) and longitude (-180 to 180) in decimal degrees.");
      }
      utc = new Date(Date.UTC(y, mo - 1, d, hh, mm) - off * 3600000);
      coords = { lat: la, lon: lo };
      label = `${la.toFixed(2)}, ${lo.toFixed(2)} (UTC${off >= 0 ? "+" : ""}${off})`;
    } else {
      const city = CITIES.find((c) => `${c.name}, ${c.country}`.toLowerCase() === query.trim().toLowerCase());
      if (!city) return setError("Choose a city from the list, or use custom coordinates.");
      utc = localToUtc(city.tz, y, mo, d, hh, mm);
      coords = { lat: city.lat, lon: city.lon };
      label = `${city.name}, ${city.country}`;
    }

    const showAngles = !timeUnknown;
    setChart(computeChart(utc, showAngles ? coords : undefined));
    setHasAngles(showAngles);
    setPlaceLabel(label);
  };

  const input =
    "w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400";

  const analysis = useMemo(() => {
    if (!chart) return null;
    const classic = chart.bodies.slice(0, 10);
    const elem = [0, 0, 0, 0];
    const mod = [0, 0, 0];
    classic.forEach((b) => {
      elem[[0, 1, 2, 3][b.signIndex % 4]]++; // Aries Fire, Taurus Earth, Gemini Air, Cancer Water cycle
      mod[b.signIndex % 3]++; // Cardinal, Fixed, Mutable cycle
    });
    return { elem, mod };
  }, [chart]);

  const sun = chart?.bodies[0];
  const moon = chart?.bodies[1];

  return (
    <div className="space-y-8">
      <form onSubmit={submit} className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="bc-date" className="text-xs text-white/60 block mb-1">
              Date of birth
            </label>
            <input id="bc-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className={input} />
          </div>
          <div>
            <label htmlFor="bc-time" className="text-xs text-white/60 block mb-1">
              Time of birth (local)
            </label>
            <input
              id="bc-time"
              type="time"
              value={time}
              disabled={timeUnknown}
              onChange={(e) => setTime(e.target.value)}
              className={`${input} disabled:opacity-40`}
            />
            <label className="flex items-center gap-2 mt-2 text-xs text-white/60">
              <input type="checkbox" checked={timeUnknown} onChange={(e) => setTimeUnknown(e.target.checked)} />
              I don&apos;t know my birth time (no Rising sign or houses)
            </label>
          </div>
        </div>

        {!custom ? (
          <div>
            <label htmlFor="bc-city" className="text-xs text-white/60 block mb-1">
              Birth city
            </label>
            <input
              id="bc-city"
              list="bc-cities"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Start typing, then pick a city"
              className={input}
            />
            <datalist id="bc-cities">
              {cityOptions.map((c) => (
                <option key={c} value={c} />
              ))}
            </datalist>
            <button type="button" onClick={() => setCustom(true)} className="text-xs text-amber-300 underline mt-2">
              My city is not listed
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="grid sm:grid-cols-3 gap-4">
              <div>
                <label htmlFor="bc-lat" className="text-xs text-white/60 block mb-1">
                  Latitude (N positive)
                </label>
                <input id="bc-lat" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="40.71" className={input} />
              </div>
              <div>
                <label htmlFor="bc-lon" className="text-xs text-white/60 block mb-1">
                  Longitude (E positive)
                </label>
                <input id="bc-lon" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="-74.00" className={input} />
              </div>
              <div>
                <label htmlFor="bc-off" className="text-xs text-white/60 block mb-1">
                  UTC offset at birth (hours)
                </label>
                <input id="bc-off" value={offset} onChange={(e) => setOffset(e.target.value)} placeholder="-5" className={input} />
              </div>
            </div>
            <button type="button" onClick={() => setCustom(false)} className="text-xs text-amber-300 underline">
              Back to the city list
            </button>
          </div>
        )}

        {error && <p className="text-xs text-rose-300">{error}</p>}
        <button
          type="submit"
          className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 text-white text-sm font-medium"
        >
          Calculate my birth chart
        </button>
        <p className="text-xs text-white/40">
          Calculated in your browser. Your birth details are never sent or stored.
        </p>
      </form>

      {chart && sun && moon && (
        <div className="space-y-8">
          <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">Your birth chart</h2>
            <p className="text-xs text-white/50">
              {date} {timeUnknown ? "(time unknown, noon used)" : time} · {placeLabel}
            </p>
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <Wheel chart={chart} hasAngles={hasAngles} />
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <tbody className="divide-y divide-white/5">
                    {chart.asc && chart.mc && (
                      <>
                        <tr>
                          <td className="py-2 text-white/60">Ascendant (Rising)</td>
                          <td className="py-2 text-white">
                            {SIGN_GLYPH[chart.asc.signIndex]} {chart.asc.sign} {fmtPos(chart.asc)}
                          </td>
                        </tr>
                        <tr>
                          <td className="py-2 text-white/60">Midheaven</td>
                          <td className="py-2 text-white">
                            {SIGN_GLYPH[chart.mc.signIndex]} {chart.mc.sign} {fmtPos(chart.mc)}
                          </td>
                        </tr>
                      </>
                    )}
                    {chart.bodies.map((b) => (
                      <tr key={b.name}>
                        <td className="py-2 text-white/60">
                          <span className="mr-2 text-purple-300">{GLYPH[b.name]}</span>
                          {b.name}
                        </td>
                        <td className="py-2 text-white">
                          {SIGN_GLYPH[b.signIndex]} {b.sign} {fmtPos(b)}
                          {hasAngles && chart.asc && (
                            <span className="text-white/40 text-xs ml-2">
                              house {((b.signIndex - chart.asc.signIndex + 12) % 12) + 1}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            {!timeUnknown && moon && (
              <p className="text-xs text-white/40">
                Houses use the whole-sign system. The Moon can change sign during a day, so an unknown birth time can make the
                Moon sign uncertain.
              </p>
            )}
          </section>

          {analysis && (
            <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
              <h2 className="text-2xl font-serif font-bold text-white">Element and modality balance</h2>
              <div className="grid sm:grid-cols-2 gap-4 text-sm">
                <div>
                  {ELEMENT.map((e, i) => (
                    <p key={e}>
                      <span className="text-white/60 inline-block w-20">{e}</span>
                      <span className="text-white">{analysis.elem[i]}</span>
                    </p>
                  ))}
                </div>
                <div>
                  {MODALITY.map((m, i) => (
                    <p key={m}>
                      <span className="text-white/60 inline-block w-20">{m}</span>
                      <span className="text-white">{analysis.mod[i]}</span>
                    </p>
                  ))}
                </div>
              </div>
              <p className="text-xs text-white/50">Count of the ten bodies (Sun to Pluto) by element and modality.</p>
            </section>
          )}

          <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
            <h2 className="text-2xl font-serif font-bold text-white">Your Big Three</h2>
            {[
              { label: "Sun", body: sun },
              { label: "Moon", body: moon },
              ...(chart.asc ? [{ label: "Rising", body: chart.asc }] : []),
            ].map(({ label, body }) => {
              const prof = ZODIAC_PROFILES[body.signIndex];
              const z = ZODIAC_SIGNS[body.signIndex];
              const text = label === "Sun" ? prof.personality[0] : label === "Moon" ? prof.moon : prof.rising;
              return (
                <div key={label} className="space-y-1">
                  <h3 className="font-serif font-bold text-white">
                    {label} in {body.sign}
                  </h3>
                  <p className="text-sm text-white/80 font-light leading-relaxed">{text}</p>
                  <Link href={`/horoscopes/${z.id}`} className="text-xs text-amber-300 underline">
                    Read more about {z.name}
                  </Link>
                </div>
              );
            })}
          </section>

          <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
            <h2 className="text-2xl font-serif font-bold text-white">Planets in your chart</h2>
            {chart.bodies
              .filter((b) => !["Sun", "Moon"].includes(b.name))
              .map((b) => (
                <div key={b.name}>
                  <h3 className="font-serif font-bold text-white">
                    {GLYPH[b.name]} {b.name} in {b.sign}
                  </h3>
                  <p className="text-sm text-white/80 font-light">{planetReading(b.name, b.sign)}</p>
                </div>
              ))}
          </section>

          {hasAngles && chart.asc && (
            <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
              <h2 className="text-2xl font-serif font-bold text-white">Your houses (whole sign)</h2>
              <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                {Array.from({ length: 12 }).map((_, h) => {
                  const signIdx = (chart.asc!.signIndex + h) % 12;
                  const inside = chart.bodies.filter((b) => b.signIndex === signIdx).map((b) => b.name);
                  return (
                    <li key={h} className="flex justify-between border-b border-white/5 py-1.5">
                      <span className="text-white/70">
                        {h + 1}. {SIGN_NAMES[signIdx]} <span className="text-white/40 text-xs">({HOUSE_MEANING[h]})</span>
                      </span>
                      <span className="text-purple-300 text-xs">{inside.join(", ")}</span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
