import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { ZODIAC_PROFILE_BY_ID } from "@/lib/zodiac-profiles";
import { SignFinder } from "@/components/interactive/SignFinder";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";
import { MONTHS } from "@/lib/zodiac-calendar";

export const metadata: Metadata = {
  title: "Zodiac Signs & Dates: Complete Chart of All 12 Signs | AuraPulse",
  description:
    "Zodiac signs and dates for all 12 astrology signs: Aries to Pisces date ranges, symbols, elements, modalities and ruling planets, plus a free tool to find your star sign.",
};

const ELEMENTS = [
  { name: "Fire", signs: ["aries", "leo", "sagittarius"], text: "Energetic, enthusiastic and action-oriented." },
  { name: "Earth", signs: ["taurus", "virgo", "capricorn"], text: "Practical, grounded and dependable." },
  { name: "Air", signs: ["gemini", "libra", "aquarius"], text: "Curious, social and idea-driven." },
  { name: "Water", signs: ["cancer", "scorpio", "pisces"], text: "Emotional, intuitive and empathetic." },
];

const MODALITIES = [
  { name: "Cardinal", signs: ["aries", "cancer", "libra", "capricorn"], text: "Initiators that start each season." },
  { name: "Fixed", signs: ["taurus", "leo", "scorpio", "aquarius"], text: "Stabilizers that sustain and persist." },
  { name: "Mutable", signs: ["gemini", "virgo", "sagittarius", "pisces"], text: "Adapters that close each season." },
];

const FAQ = [
  { q: "What are the 12 zodiac signs and their dates?", a: "Aries (Mar 21 – Apr 19), Taurus (Apr 20 – May 20), Gemini (May 21 – Jun 20), Cancer (Jun 21 – Jul 22), Leo (Jul 23 – Aug 22), Virgo (Aug 23 – Sep 22), Libra (Sep 23 – Oct 22), Scorpio (Oct 23 – Nov 21), Sagittarius (Nov 22 – Dec 21), Capricorn (Dec 22 – Jan 19), Aquarius (Jan 20 – Feb 18) and Pisces (Feb 19 – Mar 20)." },
  { q: "Why do zodiac dates differ between websites?", a: "The Sun changes sign at a slightly different moment each year, and the exact time depends on your time zone. Most sites round to the nearest day, so boundary dates can vary by one day." },
  { q: "What is a cusp sign?", a: "People born within about a day of a boundary are sometimes called cusp babies. Astrologically you have only one Sun sign, set by the exact moment of birth, but you may recognize traits of both neighbors." },
  { q: "What is the difference between tropical and sidereal zodiac dates?", a: "Western astrology uses the tropical zodiac tied to the seasons, as shown here. Vedic (sidereal) astrology uses the fixed stars and its dates run roughly 23 to 24 days later." },
  { q: "What about Ophiuchus, the 13th sign?", a: "Ophiuchus is a constellation the Sun passes through, but astrology uses 12 equal 30-degree signs based on the seasons, not on the constellations. Ophiuchus is not part of Western astrology." },
];

export default function ZodiacSignsPage() {
  const byId = Object.fromEntries(ZODIAC_SIGNS.map((s) => [s.id, s]));
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: "Zodiac Signs & Dates: Complete Chart of All 12 Signs",
        author: { "@type": "Organization", name: "AuraPulse Editorial Team" },
        publisher: { "@type": "Organization", name: "AuraPulse" },
        mainEntityOfPage: `${SITE_URL}/zodiac-signs`,
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQ.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Zodiac Signs and Dates</h1>
        <p className="text-base sm:text-lg text-white/70">
          The complete chart of all 12 astrological signs: date ranges, symbols, elements, modalities and ruling planets.
          Tap any sign for its personality, compatibility and today&apos;s Moon transit.
        </p>
      </header>

      <SignFinder />

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Zodiac signs dates chart</h2>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[640px]">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr>
                <th className="p-3">Sign</th>
                <th className="p-3">Dates</th>
                <th className="p-3">Element</th>
                <th className="p-3">Modality</th>
                <th className="p-3">Ruler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ZODIAC_SIGNS.map((s) => (
                <tr key={s.id}>
                  <td className="p-3">
                    <Link href={`/horoscopes/${s.id}`} className="text-amber-300 hover:text-white font-medium">
                      <span className="mr-2">{s.symbol}</span>
                      {s.name}
                    </Link>
                  </td>
                  <td className="p-3 text-white">{s.dates}</td>
                  <td className="p-3">{s.element}</td>
                  <td className="p-3">{s.modality}</td>
                  <td className="p-3">{ZODIAC_PROFILE_BY_ID[s.id].rulerPlanet}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-white/50">
          Dates are for the tropical zodiac and can shift by a day depending on the year and your time zone.
        </p>
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Each zodiac sign at a glance</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          {ZODIAC_SIGNS.map((s) => (
            <Link
              key={s.id}
              href={`/horoscopes/${s.id}`}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-purple-400/40 transition-colors block"
            >
              <p className="font-serif font-bold text-white">
                <span className="text-amber-300 mr-2 text-xl">{s.symbol}</span>
                {s.name} <span className="text-xs font-normal text-white/50">{s.dates}</span>
              </p>
              <p className="text-xs text-white/70 mt-2">{ZODIAC_PROFILE_BY_ID[s.id].tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">The four elements</h2>
        <p>
          The twelve signs are split into four elements of three signs each. Signs that share an element tend to
          understand each other quickly.
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {ELEMENTS.map((e) => (
            <div key={e.name} className="glass-panel rounded-2xl p-5 border border-white/10">
              <h3 className="font-serif font-bold text-white">
                <Link href={`/zodiac-signs/element/${e.name.toLowerCase()}`} className="hover:text-amber-300">
                  {e.name} signs
                </Link>
              </h3>
              <p className="text-xs text-white/60 mt-1">{e.text}</p>
              <p className="mt-2 text-sm">
                {e.signs.map((id, n) => (
                  <React.Fragment key={id}>
                    {n > 0 && ", "}
                    <Link href={`/horoscopes/${id}`} className="text-amber-300 hover:text-white">
                      {byId[id].name}
                    </Link>
                  </React.Fragment>
                ))}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Zodiac signs by month</h2>
        <p>Born in a certain month? See which two signs share it, the day-by-day split and the cusp dates.</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {MONTHS.map((m) => (
            <Link
              key={m.slug}
              href={`/zodiac-signs/month/${m.slug}`}
              className="glass-panel rounded-xl p-3 border border-white/10 hover:border-purple-400/40 transition-colors block text-center"
            >
              <span className="block font-serif font-semibold text-white">{m.name}</span>
              <span className="block text-xs text-amber-300 mt-1">
                {m.segments.map(([id]) => byId[id].symbol).join(" ")}
              </span>
            </Link>
          ))}
        </div>
        <p className="text-sm">
          Explore by element:{" "}
          {ELEMENTS.map((e, n) => (
            <React.Fragment key={e.name}>
              {n > 0 && ", "}
              <Link href={`/zodiac-signs/element/${e.name.toLowerCase()}`} className="text-amber-300 hover:text-white">
                {e.name} signs
              </Link>
            </React.Fragment>
          ))}
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">The three modalities</h2>
        <p>Modality describes how a sign acts within its season: starting, sustaining or transitioning.</p>
        <div className="grid sm:grid-cols-3 gap-4">
          {MODALITIES.map((m) => (
            <div key={m.name} className="glass-panel rounded-2xl p-5 border border-white/10">
              <h3 className="font-serif font-bold text-white">{m.name}</h3>
              <p className="text-xs text-white/60 mt-1">{m.text}</p>
              <p className="mt-2 text-sm">{m.signs.map((id) => byId[id].name).join(", ")}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">How zodiac dates work</h2>
        <p>
          Your Sun sign is the zodiac sign the Sun was in on the day you were born. Western astrology divides the
          ecliptic, the Sun&apos;s apparent yearly path, into twelve 30-degree segments that begin at the spring equinox
          with Aries. Because a year is not exactly 365 days, the Sun enters each sign at a different hour from year to year,
          which is why boundary dates may vary by a day.
        </p>
        <p>
          Your Sun sign is only one part of your chart. Your Moon sign shows how you process emotion, and your Rising sign
          shows how you meet the world. You can explore them with our{" "}
          <Link href="/tools/rising-moon" className="text-amber-300 underline">
            rising and moon sign calculator
          </Link>
          , or look up another cycle with the{" "}
          <Link href="/chinese-zodiac" className="text-amber-300 underline">
            Chinese zodiac
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Zodiac signs FAQ</h2>
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
