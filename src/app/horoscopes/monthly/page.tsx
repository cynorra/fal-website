import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { HOUSE_THEMES, houseFor, SIGN_NAMES } from "@/lib/astro";
import { monthMoonEvents, monthSunIngresses, fmtDay } from "@/lib/forecast";
import { AdBanner } from "@/components/ui/AdBanner";

export const revalidate = 3600;

const monthLabel = (d: Date) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", month: "long", year: "numeric" }).format(d);

export function generateMetadata(): Metadata {
  const label = monthLabel(new Date());
  const title = `Monthly Horoscope for ${label}: All 12 Signs | AuraPulse`;
  const description = `Monthly horoscope for ${label}: new and full Moon dates, when the Sun changes sign, and what each zodiac sign should focus on. Calculated from real planetary positions.`;
  return { title, description, openGraph: { title, description, type: "article" } };
}

const FAQ = [
  {
    q: "How is the monthly horoscope calculated?",
    a: "We compute the Sun's sign for each part of the month and the exact times of the new and full Moons. For each Sun sign we then find which house (area of life) the Sun and each lunation fall in, using whole-sign houses. The themes are general guidance, not predictions.",
  },
  {
    q: "What do the new Moon and full Moon mean?",
    a: "A new Moon is traditionally a time for setting intentions; a full Moon is a time for completion and release. The sign each occurs in colors the theme.",
  },
  {
    q: "Are the times accurate?",
    a: "Moon and Sun positions come from a low-precision astronomical model that is approximate: lunation dates can be off by up to a day, so check an ephemeris for the exact minute. Dates are shown in UTC.",
  },
];

export default function MonthlyHoroscopePage() {
  const now = new Date();
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  const label = monthLabel(now);
  const moons = monthMoonEvents(y, m);
  const { startSign, ingresses } = monthSunIngresses(y, m);

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
          }),
        }}
      />
      <Link href="/horoscopes" className="text-xs text-purple-300 hover:text-white">
        ← All 12 zodiac signs
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Monthly Horoscope</h1>
        <p className="text-amber-300 font-mono text-sm">{label}</p>
        <p className="text-base sm:text-lg text-white/70">
          This month&apos;s sky at a glance: when the Sun changes sign, the dates of the new and full Moon, and the area of
          life each sign is invited to focus on. See also the{" "}
          <Link href="/horoscopes/weekly" className="text-amber-300 underline">
            weekly horoscope
          </Link>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Key sky events in {label}</h2>
        <div className="glass-panel rounded-2xl border border-white/10 p-5 space-y-2">
          <p>
            <strong className="text-white">Sun:</strong> in {SIGN_NAMES[startSign]} at the start of the month
            {ingresses.map((g) => `, enters ${SIGN_NAMES[g.signIndex]} around ${fmtDay(g.date, false)}`).join("")}.
          </p>
          {moons.map((e) => (
            <p key={e.kind + e.date.toISOString()}>
              <strong className="text-white">{e.kind}:</strong> {SIGN_NAMES[e.signIndex]}, around {fmtDay(e.date)} (UTC)
            </p>
          ))}
          {moons.length === 0 && <p>No new or full Moon falls inside this calendar month.</p>}
        </div>
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-white">Monthly horoscope for each sign</h2>
        {ZODIAC_SIGNS.map((s, si) => {
          const sunHouse = houseFor(si, startSign);
          const sunInfo = HOUSE_THEMES[sunHouse - 1];
          return (
            <div key={s.id} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
              <h3 className="font-serif font-bold text-white text-lg">
                <Link href={`/horoscopes/${s.id}`} className="hover:text-amber-300">
                  <span className="text-amber-300 mr-2">{s.symbol}</span>
                  {s.name}
                </Link>{" "}
                <span className="text-xs font-normal text-white/50">{s.dates}</span>
              </h3>
              <p>
                <strong className="text-white">Sun in your {sunInfo.name}</strong> ({sunInfo.theme}). {sunInfo.advice}
              </p>
              {ingresses.map((g) => {
                const h = HOUSE_THEMES[houseFor(si, g.signIndex) - 1];
                return (
                  <p key={g.date.toISOString()}>
                    <strong className="text-white">
                      From {fmtDay(g.date, false)}, Sun in your {h.name}
                    </strong>{" "}
                    ({h.theme}). {h.advice}
                  </p>
                );
              })}
              {moons.map((e) => {
                const h = HOUSE_THEMES[houseFor(si, e.signIndex) - 1];
                return (
                  <p key={e.kind + e.date.toISOString()} className="text-sm">
                    <strong className="text-amber-300">
                      {e.kind} ({fmtDay(e.date, false)}) in your {h.name}:
                    </strong>{" "}
                    {e.kind === "New Moon" ? "set an intention around" : "see results and release in the area of"} {h.theme}.
                  </p>
                );
              })}
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Monthly horoscope FAQ</h2>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <div key={f.q} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
              <h3 className="font-serif font-semibold text-amber-300">{f.q}</h3>
              <p className="text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <p className="text-xs text-white/40">
        Astrology is a symbolic tradition for self-reflection and entertainment, not a substitute for professional advice.
      </p>
    </article>
  );
}
