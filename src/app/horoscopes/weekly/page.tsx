import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { HOUSE_THEMES, houseFor, SIGN_NAMES } from "@/lib/astro";
import { weekDays, fmtDay } from "@/lib/forecast";
import { AdBanner } from "@/components/ui/AdBanner";

export const revalidate = 3600;

export function generateMetadata(): Metadata {
  const days = weekDays(new Date());
  const range = `${fmtDay(days[0].date, false)} - ${fmtDay(days[6].date, false)}`;
  const title = `Weekly Horoscope for All Signs (${range}) | Horoscopes and Charts`;
  const description = `Weekly horoscope for ${range}: the Moon's sign and phase each day, and which area of life it lights up for every zodiac sign. Calculated from real planetary positions.`;
  return { title, description, openGraph: { title, description, type: "article" } };
}

const FAQ = [
  {
    q: "How is this weekly horoscope made?",
    a: "We calculate where the Moon is each day of the week and apply whole-sign houses from each Sun sign. That shows which area of life (money, home, work, relationships) the Moon highlights for you on each day. The text for each house is general guidance, not a prediction.",
  },
  {
    q: "Why does the week start on Monday?",
    a: "A Monday to Sunday week is easy to plan around. All days and times are shown in UTC, so your local date may differ by a few hours.",
  },
  {
    q: "Is a weekly horoscope accurate?",
    a: "Astrology is a symbolic tradition for reflection and entertainment. The Moon positions here are astronomically calculated, but how they relate to your life is interpretive. Use it as a prompt, not a forecast.",
  },
];

export default function WeeklyHoroscopePage() {
  const days = weekDays(new Date());
  const range = `${fmtDay(days[0].date, false)} - ${fmtDay(days[6].date, false)}`;
  const moveDay = days.slice(1).find((d, i) => d.moonSignIndex !== days[i].moonSignIndex);

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
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Weekly Horoscope</h1>
        <p className="text-amber-300 font-mono text-sm">{range}</p>
        <p className="text-base sm:text-lg text-white/70">
          The Moon changes sign about every two and a half days, so each week moves through different themes. Below is the
          Moon&apos;s path this week and what it highlights for every sign. Looking for monthly themes? See the{" "}
          <Link href="/horoscopes/monthly" className="text-amber-300 underline">
            monthly horoscope
          </Link>
          .
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">The Moon this week</h2>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[480px]">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr>
                <th className="p-3">Day</th>
                <th className="p-3">Moon in</th>
                <th className="p-3">Phase</th>
                <th className="p-3">Lit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {days.map((d) => (
                <tr key={d.date.toISOString()}>
                  <td className="p-3 text-white">{fmtDay(d.date)}</td>
                  <td className="p-3">{SIGN_NAMES[d.moonSignIndex]}</td>
                  <td className="p-3">{d.phase}</td>
                  <td className="p-3">{d.illumination}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {moveDay && (
          <p>
            The Moon moves into {SIGN_NAMES[moveDay.moonSignIndex]} around {fmtDay(moveDay.date)}, which shifts the mood of
            the week from {SIGN_NAMES[days[0].moonSignIndex]} themes to {SIGN_NAMES[moveDay.moonSignIndex]} themes.
          </p>
        )}
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-6">
        <h2 className="text-2xl font-serif font-bold text-white">Weekly horoscope for each sign</h2>
        {ZODIAC_SIGNS.map((s, si) => {
          const hs = days.map((d) => houseFor(si, d.moonSignIndex));
          // compress consecutive days that share a house
          const groups: { from: number; to: number; house: number }[] = [];
          hs.forEach((h, i) => {
            const last = groups[groups.length - 1];
            if (last && last.house === h) last.to = i;
            else groups.push({ from: i, to: i, house: h });
          });
          return (
            <div key={s.id} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-3">
              <h3 className="font-serif font-bold text-white text-lg">
                <Link href={`/horoscopes/${s.id}`} className="hover:text-amber-300">
                  <span className="text-amber-300 mr-2">{s.symbol}</span>
                  {s.name}
                </Link>{" "}
                <span className="text-xs font-normal text-white/50">{s.dates}</span>
              </h3>
              <ul className="space-y-2">
                {groups.map((g) => {
                  const info = HOUSE_THEMES[g.house - 1];
                  const label = g.from === g.to ? fmtDay(days[g.from].date) : `${fmtDay(days[g.from].date)} - ${fmtDay(days[g.to].date)}`;
                  return (
                    <li key={g.from}>
                      <span className="text-amber-300 font-mono text-xs">{label}</span>
                      <span className="text-white/50 text-xs"> · Moon in your {info.name}: {info.theme}</span>
                      <p className="text-sm">{info.advice}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Weekly horoscope FAQ</h2>
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
