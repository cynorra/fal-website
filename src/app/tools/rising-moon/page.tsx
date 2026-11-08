import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BirthChartCalculator } from "@/components/interactive/BirthChartCalculator";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Rising Sign Calculator: Find Your Ascendant, Moon & Sun Sign | Horoscopes and Charts",
  description:
    "Free rising sign calculator. Enter your birth date, time and city to find your Rising sign (Ascendant), Moon sign and Sun sign, calculated from real planetary positions.",
};

export default function RisingMoonPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <Link href="/tools" className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Tools</span>
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Rising Sign Calculator</h1>
        <p className="text-base sm:text-lg text-white/70">
          Find your Rising sign (Ascendant), Moon sign and Sun sign, the astrological Big Three. The result also includes
          every planet, your houses and a chart wheel.
        </p>
      </header>

      <BirthChartCalculator />

      <AdBanner format="in-article" />

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">What is a rising sign?</h2>
        <p>
          Your rising sign, or Ascendant, is the zodiac sign that was rising over the eastern horizon at the exact time and
          place you were born. Because the sky appears to turn once a day, the rising sign changes about every two hours,
          which is why you need your birth time and birth city to find it.
        </p>
        <p>
          While your Sun sign reflects your core identity and your Moon sign your inner emotional world, the Rising sign
          describes your outward manner: the first impression you make and the lens through which you approach new
          situations. It also sets the first house of your chart, so it shapes how every other planet is placed.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">What is a moon sign?</h2>
        <p>
          The Moon moves through a zodiac sign roughly every two and a half days, so your Moon sign depends on your birth
          date and, if you were born near a sign change, your birth time. It describes your emotional needs, habits and what
          helps you feel secure. Learn more in each sign guide such as{" "}
          <Link href="/horoscopes/cancer" className="text-amber-300 underline">
            Cancer
          </Link>{" "}
          or{" "}
          <Link href="/horoscopes/pisces" className="text-amber-300 underline">
            Pisces
          </Link>
          .
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">What if I do not know my birth time?</h2>
        <p>
          Tick the unknown birth time option to get your Sun sign, Moon sign and planets without the Rising sign. Your
          birth certificate often lists the time, or a parent may remember it. You can also read the{" "}
          <Link href="/zodiac-signs" className="text-amber-300 underline">
            zodiac signs and dates
          </Link>{" "}
          chart to confirm your Sun sign, or see the full{" "}
          <Link href="/tools/birth-chart" className="text-amber-300 underline">
            birth chart calculator
          </Link>
          .
        </p>
      </section>
    </div>
  );
}
