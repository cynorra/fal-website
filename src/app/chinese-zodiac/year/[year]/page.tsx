import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ANIMAL_BY_NAME, ELEMENT_NOTES, TRINES, CLASHES } from "@/lib/chinese-zodiac-data";
import { chineseNewYear, chineseZodiac } from "@/lib/chinese-calendar";
import { AdBanner } from "@/components/ui/AdBanner";

interface Props {
  params: { year: string };
}

const FIRST = 1948;
const LAST = 2031;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function generateStaticParams() {
  return Array.from({ length: LAST - FIRST + 1 }, (_, i) => ({ year: String(FIRST + i) }));
}

function info(y: number) {
  const z = chineseZodiac(y, 7, 1);
  const start = chineseNewYear(y);
  const nextStart = chineseNewYear(y + 1);
  const prev = chineseZodiac(y - 1, 7, 1);
  return { z, start, nextStart, prev };
}

export function generateMetadata({ params }: Props): Metadata {
  const y = Number(params.year);
  if (!(y >= FIRST && y <= LAST)) return { title: "Chinese Zodiac Not Found | AuraPulse", robots: { index: false } };
  const { z } = info(y);
  return {
    title: `${y} Chinese Zodiac: ${z.element} ${z.animal} | AuraPulse`,
    description: `${y} Chinese zodiac sign: ${z.polarity} ${z.element} ${z.animal}. Chinese New Year date, exact zodiac year range, personality, element meaning and compatibility.`,
  };
}

export default function YearPage({ params }: Props) {
  const y = Number(params.year);
  if (!(y >= FIRST && y <= LAST)) notFound();
  const { z, start, nextStart, prev } = info(y);
  const a = ANIMAL_BY_NAME[z.animal];
  const prevA = ANIMAL_BY_NAME[prev.animal];
  const fmt = (d: { month: number; day: number }, yr: number) => `${MONTHS[d.month - 1]} ${d.day}, ${yr}`;
  const end = new Date(Date.UTC(y + 1, nextStart.month - 1, nextStart.day) - 86400000);
  const endStr = `${MONTHS[end.getUTCMonth()]} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  const slugOf = (n: string) => ANIMAL_BY_NAME[n].slug;

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-10 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <Link href="/chinese-zodiac" className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Chinese Zodiac Calculator</span>
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          {y} Chinese Zodiac: {z.element} {z.animal}
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          People born in {y} are {z.polarity} {z.element} {z.animal}s, with one important exception: the first weeks of
          the year.
        </p>
      </header>

      <section className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
        <h2 className="font-serif font-bold text-white">Quick answer</h2>
        <p>
          The {y} zodiac year ran from <strong className="text-white">{fmt(start, y)}</strong> to{" "}
          <strong className="text-white">{endStr}</strong>. If you were born on or after {fmt(start, y)}, your sign is the{" "}
          {z.element} {z.animal}. If you were born earlier in {y}, you belong to the {prev.element} {prev.animal} of{" "}
          {prev.zodiacYear}.
        </p>
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">
          {z.element} {z.animal} personality
        </h2>
        <p>{a.tagline}</p>
        <p>{a.personality[0]}</p>
        <p>{ELEMENT_NOTES[z.element]}</p>
        <p>
          <strong className="text-white">Strengths:</strong> {a.strengths.join(", ")}.{" "}
          <strong className="text-white">Watch for:</strong> {a.weaknesses.join(", ")}.
        </p>
        <p>
          Read the full{" "}
          <Link href={`/chinese-zodiac/${a.slug}`} className="text-amber-300 underline">
            {z.animal} guide
          </Link>{" "}
          for love, career and compatibility.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">Born early in {y}?</h2>
        <p>
          The Chinese zodiac follows the lunisolar calendar, so a January or February birth often belongs to the previous
          animal. In {y}, Chinese New Year fell on {fmt(start, y)}. Anyone born before that date is a {prev.element}{" "}
          {prev.animal} instead.{" "}
          <Link href={`/chinese-zodiac/${prevA.slug}`} className="text-amber-300 underline">
            See the {prev.animal} guide
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{z.animal} compatibility</h2>
        <p>
          The {z.animal} is traditionally most harmonious with{" "}
          {TRINES[z.animal].map((f, i) => (
            <React.Fragment key={f}>
              {i > 0 && " and "}
              <Link href={`/chinese-zodiac/${slugOf(f)}`} className="text-amber-300 underline">
                {f}
              </Link>
            </React.Fragment>
          ))}
          , and tends to clash with the{" "}
          <Link href={`/chinese-zodiac/${slugOf(CLASHES[z.animal])}`} className="text-amber-300 underline">
            {CLASHES[z.animal]}
          </Link>
          .
        </p>
      </section>

      <nav className="flex items-center justify-between border-t border-white/10 pt-6 text-sm">
        {y > FIRST ? (
          <Link href={`/chinese-zodiac/year/${y - 1}`} className="inline-flex items-center space-x-2 text-purple-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>{y - 1}</span>
          </Link>
        ) : (
          <span />
        )}
        {y < LAST ? (
          <Link href={`/chinese-zodiac/year/${y + 1}`} className="inline-flex items-center space-x-2 text-purple-300 hover:text-white">
            <span>{y + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <p className="text-xs text-white/40">
        The Chinese zodiac is a cultural tradition offered for reflection and entertainment.
      </p>
    </article>
  );
}
