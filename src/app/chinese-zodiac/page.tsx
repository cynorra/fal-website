import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ChineseZodiacCalculator } from "@/components/interactive/ChineseZodiacCalculator";
import { ANIMAL_PROFILES } from "@/lib/chinese-zodiac-data";
import { chineseZodiac } from "@/lib/chinese-calendar";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Chinese Zodiac Calculator: Find Your Animal & Element | AuraPulse",
  description:
    "Free Chinese zodiac calculator. Enter your birth date to find your animal sign and element, with correct Chinese New Year dates, a year chart for 1948 to 2031 and all 12 animal guides.",
};

const YEARS = Array.from({ length: 2031 - 1948 + 1 }, (_, i) => 1948 + i);

export default function ChineseZodiacPage() {
  const rows = YEARS.map((y) => ({ year: y, ...chineseZodiac(y, 7, 1) }));

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Chinese Zodiac Calculator</h1>
        <p className="text-base sm:text-lg text-white/70">
          Find your Chinese zodiac animal and element from your birth date. The calculator uses the real Chinese New Year
          date for your birth year, so January and February births are placed correctly.
        </p>
      </header>

      <ChineseZodiacCalculator />

      <AdBanner format="in-article" />

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">The 12 Chinese zodiac animals</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ANIMAL_PROFILES.map((a) => (
            <Link
              key={a.slug}
              href={`/chinese-zodiac/${a.slug}`}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-purple-400/40 transition-colors block"
            >
              <p className="font-serif font-bold text-white">{a.animal}</p>
              <p className="text-xs text-white/60 mt-1">{a.tagline}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Chinese zodiac years chart (1948 to 2031)</h2>
        <p>
          Find your birth year below. If you were born in January or February, check the exact Chinese New Year date on the
          year page, because the animal year begins on that day rather than on January 1.
        </p>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[420px]">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr>
                <th className="p-3">Year</th>
                <th className="p-3">Animal</th>
                <th className="p-3">Element</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.year}>
                  <td className="p-3">
                    <Link href={`/chinese-zodiac/year/${r.year}`} className="text-amber-300 hover:text-white">
                      {r.year}
                    </Link>
                  </td>
                  <td className="p-3 text-white">{r.animal}</td>
                  <td className="p-3">
                    {r.polarity} {r.element}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">How the Chinese zodiac works</h2>
        <p>
          The Chinese zodiac is a repeating twelve-year cycle in which each year is represented by an animal: Rat, Ox,
          Tiger, Rabbit, Dragon, Snake, Horse, Goat, Monkey, Rooster, Dog and Pig. Combined with five elements (Wood, Fire,
          Earth, Metal and Water) and the yin and yang polarity of each year, the full cycle repeats every sixty years.
        </p>
        <p>
          The animal year follows the Chinese lunisolar calendar. It begins at Chinese New Year, which falls between
          January 21 and February 20 depending on the new moon, not on January 1. Compatibility traditionally groups the
          animals into four trines of three friendly signs, and pairs each animal with an opposite that tends to clash.
          Treat all of this as a cultural tradition for reflection and fun rather than prediction.
        </p>
        <p>
          Looking for the Western system? See the{" "}
          <Link href="/zodiac-signs" className="text-amber-300 underline">
            zodiac signs and dates
          </Link>{" "}
          chart.
        </p>
      </section>
    </article>
  );
}
