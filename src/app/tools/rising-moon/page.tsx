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

const COMPARE = [
  { sign: "Sun sign", changes: "About every 30 days", needs: "Birth date", describes: "Core identity and drive" },
  { sign: "Moon sign", changes: "About every 2.5 days", needs: "Birth date, and time if the Moon changed sign that day", describes: "Emotional needs and habits" },
  { sign: "Rising sign", changes: "About every 2 hours", needs: "Birth date, exact time and city", describes: "Outward manner and first impressions" },
];

const FAQS = [
  {
    q: "How do I find my moon sign and rising sign?",
    a: "Enter your birth date, birth time and birth city in the calculator above. The Moon sign needs the date (and the time if the Moon changed sign on your birthday). The Rising sign needs the exact time and the city, because it depends on which sign was on the eastern horizon at that place.",
  },
  {
    q: "Is the rising sign the same as the ascendant?",
    a: "Yes. Rising sign and ascendant are two names for the same point: the zodiac sign and degree rising over the eastern horizon when you were born. It also marks the start of the first house.",
  },
  {
    q: "Can I calculate my rising sign without a birth time?",
    a: "Not reliably. The rising sign moves through all twelve signs every day, so a guess can be off by several signs. Without a birth time the calculator still gives you the Sun sign, the Moon sign (unless it changed sign that day) and the planets.",
  },
  {
    q: "Does my birth city matter?",
    a: "Yes. Longitude shifts local time by about four minutes per degree, and latitude changes how quickly each sign rises. Two people born at the same clock time in different cities can have different rising signs.",
  },
  {
    q: "Which matters more, my sun, moon or rising sign?",
    a: "Astrologers do not agree on a ranking, and none of it has scientific support. In the usual reading the Sun describes core identity, the Moon emotional nature and the Rising sign outward manner, so people tend to read all three together.",
  },
];

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
        <h2 className="text-2xl font-serif font-bold text-white">Sun, moon and rising sign compared</h2>
        <p>
          The three signs people usually mean by the astrological Big Three are easy to mix up. They differ in how fast they change, and therefore in how
          much information you need to find them.
        </p>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr>
                <th className="p-3">Sign</th>
                <th className="p-3">Changes</th>
                <th className="p-3">You need</th>
                <th className="p-3">Usually describes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {COMPARE.map((c) => (
                <tr key={c.sign}>
                  <td className="p-3 text-white">{c.sign}</td>
                  <td className="p-3">{c.changes}</td>
                  <td className="p-3">{c.needs}</td>
                  <td className="p-3">{c.describes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">How this calculator works</h2>
        <p>
          Everything runs in your browser and nothing you enter is sent to a server. Your birth time is converted from local clock time to universal time
          using the time zone of the city you pick, as it was on your birth date, so daylight saving rules of the time are respected as far as your browser&apos;s
          time zone database knows them.
        </p>
        <p>
          The Sun and Moon positions come from short series formulas, and the planets from a low-precision method whose typical error is under one degree
          for the Sun through Saturn and about one degree for Uranus to Pluto. The Rising sign is found from the sidereal time at your birth place, the tilt
          of the Earth&apos;s axis and your latitude. Houses are whole-sign houses, in which the Rising sign is the entire first house, and the zodiac is the
          tropical zodiac used by Western astrology.
        </p>
        <p>
          That precision is enough to name the sign for almost everyone. The exception is a planet or angle that sits within about a degree of a sign
          border; in that case a professional ephemeris could place it in the neighbouring sign, so check the result against a second source if your chart is
          on the edge.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">Why a few minutes can change your rising sign</h2>
        <p>
          The Earth turns 360 degrees in about 24 hours, so on average one degree of the zodiac rises every four minutes and a whole 30-degree sign takes
          about two hours. Signs do not all rise at the same speed, though, and the difference grows with latitude: far from the equator some signs rise
          quickly and others stay on the horizon for much longer.
        </p>
        <p>
          If your birth time is only approximate, or you were born within a quarter of an hour of a sign change, treat the Rising sign as a candidate and read
          the neighbouring sign as well. Birth certificates, hospital records and family stories are the usual sources for an exact time.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">Rising sign calculator questions</h2>
        {FAQS.map((f) => (
          <div key={f.q} className="space-y-1">
            <h3 className="font-serif font-bold text-white text-lg">{f.q}</h3>
            <p>{f.a}</p>
          </div>
        ))}
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
