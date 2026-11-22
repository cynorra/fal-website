import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LifePathCalculator } from "@/components/interactive/LifePathCalculator";
import { LIFE_PATH_ENTRIES, calculateLifePath } from "@/lib/life-path-data";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Life Path Number Calculator (Free) | Horoscopes and Charts",
  description:
    "Calculate your Life Path Number from your birth date. See the step-by-step Pythagorean method, master numbers 11, 22 and 33, and read what each life path means.",
};

const EXAMPLES: [number, number, number, string][] = [
  [1992, 5, 3, "3 May 1992"],
  [1985, 3, 15, "15 March 1985"],
  [1976, 4, 22, "22 April 1976"],
  [2000, 12, 30, "30 December 2000"],
];

const MASTER = [11, 22, 33].map((n) => LIFE_PATH_ENTRIES.find((e) => e.number === n)!);

const FAQS = [
  {
    q: "How do I calculate my life path number?",
    a: "Reduce your birth month, birth day and birth year each to a single digit, add the three results and reduce the total again. Keep 11, 22 and 33 as they are. For example 15 March 1985 gives 3 + 6 + 5 = 14, which reduces to 5.",
  },
  {
    q: "What are the master numbers 11, 22 and 33?",
    a: "Master numbers are the double-digit numbers 11, 22 and 33. In most modern systems they are not reduced to 2, 4 and 6 when they appear in your month, day, year or final total. Tradition says people with a master number carry that number's larger potential alongside the everyday traits of its single-digit root.",
  },
  {
    q: "Is the life path number the same as the destiny number?",
    a: "No. The life path number comes only from your birth date. The destiny, or expression, number comes from the letters of your full birth name, and the birthday number is simply the day of the month you were born.",
  },
  {
    q: "Does the order of month, day and year change the result?",
    a: "No. You add the three reduced parts, and addition does not depend on order, so 3 May 1992 and 5 March 1992 would both be worked out from the same three parts. Only keep an eye on which number is the month and which is the day when you type the date.",
  },
  {
    q: "Can my life path number change?",
    a: "No. It is fixed by your birth date. Changing your name does not change it, although the name-based numbers in numerology would change.",
  },
  {
    q: "Is numerology scientific?",
    a: "No. Numerology is a symbolic tradition and there is no scientific evidence that a number from your birth date predicts your life. Treat the result as a prompt for reflection, not as advice or prediction.",
  },
];

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

      <section className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-white">More worked examples</h2>
        <p>
          The steps below are generated by the same function the calculator uses, so they always match its result. Notice how a master number can appear
          at one step (the total in the first example, the day in the third) and still end up reduced in the final answer.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {EXAMPLES.map(([y, m, d, label]) => {
            const r = calculateLifePath(y, m, d);
            return (
              <div key={label} className="glass-panel rounded-2xl p-5 border border-white/10 font-mono text-xs space-y-1">
                <p className="text-white">{label}</p>
                {r.steps.map((s) => (
                  <p key={s}>{s}</p>
                ))}
                <p className="text-amber-300">Life Path Number: {r.number}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-white">Master numbers 11, 22 and 33</h2>
        <p>
          Master numbers are the repeated digits 11, 22 and 33. When one of them shows up in your month, day, year or final total, most modern guides keep
          it instead of reducing it, which is why a date such as 3 May 1992 gives an 11 rather than a 2. The reduced root is still part of the picture: 11
          reduces to 2, 22 to 4 and 33 to 6.
        </p>
        <ul className="space-y-3">
          {MASTER.map((e) => (
            <li key={e.slug}>
              <Link href={`/life-path/${e.slug}`} className="text-amber-300 underline">
                Life Path {e.number}: {e.archetype}
              </Link>
              <span className="text-white/70"> {e.tagline}</span>
            </li>
          ))}
        </ul>
        <p>
          Numerologists describe master numbers as demanding as well as promising, which is why many people choose to read both the master number and its
          root number. That is a convention within the tradition, not something that can be measured.
        </p>
      </section>

      <section className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-white">Life path number vs destiny number vs birthday number</h2>
        <p>
          Numerology uses several core numbers, and they answer different questions. The <strong className="text-white">life path number</strong> comes from your
          full birth date and describes the main theme of your life. The <strong className="text-white">destiny or expression number</strong> comes from the
          letters in your full birth name, using the Pythagorean chart where A, J and S equal 1, B, K and T equal 2, and so on up to 9. The{" "}
          <strong className="text-white">birthday number</strong> is just the day of the month you were born, read as a talent that sits on top of your life path.
        </p>
      </section>

      <section className="space-y-4 text-sm text-white/80 font-light leading-relaxed">
        <h2 className="text-2xl font-serif font-bold text-white">Life path number questions</h2>
        {FAQS.map((f) => (
          <div key={f.q} className="space-y-1">
            <h3 className="font-serif font-bold text-white text-lg">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
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
