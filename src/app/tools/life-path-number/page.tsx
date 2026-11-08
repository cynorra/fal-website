import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LifePathCalculator } from "@/components/interactive/LifePathCalculator";
import { LIFE_PATH_ENTRIES } from "@/lib/life-path-data";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Life Path Number Calculator (Free) | AuraPulse",
  description:
    "Calculate your Life Path Number from your birth date. See the step-by-step Pythagorean method, master numbers 11, 22 and 33, and read what each life path means.",
};

export default function LifePathToolPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      <Link href="/tools" className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Tools</span>
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Life Path Number Calculator</h1>
        <p className="text-white/70 font-light">
          Enter your birth date to find your Life Path Number, the most important number in a numerology chart. The
          calculation runs in your browser and nothing you enter is stored.
        </p>
      </header>

      <LifePathCalculator />

      <AdBanner format="in-article" />

      <section className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-white">How to calculate your Life Path Number</h2>
        <p>
          The most widely used method comes from Pythagorean numerology. You reduce the month, the day and the year of
          your birth date separately to a single digit, add the three results, and reduce again if the total has more than
          one digit. The one exception is the master numbers 11, 22 and 33, which are not reduced further.
        </p>
        <div className="glass-panel rounded-2xl p-5 border border-white/10 font-mono text-xs space-y-1">
          <p className="text-white">Example: 29 November 1997</p>
          <p>Month: 11 (master number, kept)</p>
          <p>Day: 2 + 9 = 11 (master number, kept)</p>
          <p>Year: 1 + 9 + 9 + 7 = 26 → 2 + 6 = 8</p>
          <p>Total: 11 + 11 + 8 = 30 → 3 + 0 = 3</p>
          <p className="text-amber-300">Life Path Number: 3</p>
        </div>
        <p>
          Some numerologists reduce master numbers only at the very end, which can produce a different result for certain
          dates. This calculator keeps 11, 22 and 33 at each step, the approach used by most modern guides.
        </p>
        <h2 className="text-2xl font-serif font-bold text-white pt-4">What your Life Path Number represents</h2>
        <p>
          In numerology your Life Path Number describes the main theme of your life: natural talents, recurring
          challenges and the lessons you keep meeting. Think of it as a lens for self-reflection rather than a prediction.
          Numerology is a symbolic tradition, not a science, and it cannot tell you what to do. Use it to ask better
          questions about your habits, relationships and work.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">All Life Path Number meanings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {LIFE_PATH_ENTRIES.map((e) => (
            <Link
              key={e.slug}
              href={`/life-path/${e.slug}`}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-purple-400/40 transition-colors"
            >
              <p className="text-3xl font-serif font-black gold-gradient-text">{e.number}</p>
              <p className="font-serif font-bold text-white text-sm mt-1">{e.archetype}</p>
              <p className="text-xs text-white/60 mt-1">{e.tagline}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
