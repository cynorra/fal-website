import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { BirthChartCalculator } from "@/components/interactive/BirthChartCalculator";
import { PLANET_THEMES, HOUSE_MEANING } from "@/lib/planet-text";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Free Birth Chart Calculator: Natal Chart with Rising Sign | AuraPulse",
  description:
    "Free birth chart calculator (natal chart): enter your birth date, time and city to see your Sun, Moon, Rising sign, all planets, houses and a chart wheel. Private, runs in your browser.",
};

const FAQ = [
  { q: "What is a birth chart?", a: "A birth chart, also called a natal chart or astrology chart, is a map of the sky at the exact moment and place you were born. It shows the zodiac sign of the Sun, Moon, planets and the Ascendant, and the twelve houses." },
  { q: "What do I need to calculate my birth chart?", a: "Your date of birth, the time you were born and the city of birth. The time matters most for your Rising sign and houses, and it can change the Moon sign if you were born near a sign change." },
  { q: "How accurate is this birth chart calculator?", a: "Planet positions are computed with standard low-precision astronomical formulas that are accurate to well under a degree for the Sun through Saturn and about a degree for Uranus to Pluto. That is enough to determine each sign except when a planet sits within about a degree of a sign border. For professional work, compare with an ephemeris." },
  { q: "What if I do not know my birth time?", a: "Tick the box for unknown birth time. You will get your planet signs (the Moon is usually reliable) but no Rising sign or houses. Many people find their time on a birth certificate or by asking a parent." },
  { q: "Which house system is used?", a: "Whole-sign houses: the sign containing your Ascendant is the first house, the next sign the second house and so on. It is the oldest system and is easy to read." },
  { q: "Is my birth information stored?", a: "No. The chart is calculated in your browser and nothing you enter is sent to our servers." },
];

export default function BirthChartPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: "Birth Chart Calculator",
        applicationCategory: "LifestyleApplication",
        operatingSystem: "Any",
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
        url: `${SITE_URL}/tools/birth-chart`,
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
    <div className="space-y-12 py-6 max-w-4xl mx-auto text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/tools" className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Back to All Tools</span>
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Free Birth Chart Calculator</h1>
        <p className="text-base sm:text-lg text-white/70">
          Create your natal chart in seconds: Sun, Moon, Rising sign, every planet, the twelve houses and a chart wheel,
          with a plain-English reading of each placement.
        </p>
      </header>

      <BirthChartCalculator />

      <AdBanner format="in-article" />

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">What is a birth chart?</h2>
        <p>
          A birth chart (also called a natal chart, astrology chart or horoscope chart) is a snapshot of the sky from the
          place and moment you were born. It records where the Sun, Moon and planets stood in the zodiac, and which sign was
          rising on the eastern horizon. Astrologers read it as a symbolic portrait of temperament, motivations and
          recurring life themes.
        </p>
        <p>
          Most people only know their Sun sign, which depends on your birth date alone. A full chart adds your Moon sign
          (emotions), your Rising sign (how you meet the world) and the position of every planet, which is why two people
          with the same Sun sign can feel so different.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">How to read your birth chart</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>
            <strong className="text-white">Start with the Big Three.</strong> Your Sun sign shows core identity, your Moon
            sign your emotional needs and your Rising sign your outward style. See{" "}
            <Link href="/zodiac-signs" className="text-amber-300 underline">
              all zodiac signs and dates
            </Link>{" "}
            for the meaning of each sign.
          </li>
          <li>
            <strong className="text-white">Look at the planets.</strong> Each planet describes a different part of life, and
            the sign it sits in shows the style.
          </li>
          <li>
            <strong className="text-white">Check the houses.</strong> Houses show the area of life where each planet plays
            out, such as career, relationships or home.
          </li>
          <li>
            <strong className="text-white">Notice the balance.</strong> Many planets in one element or modality suggest a
            dominant style, while an empty one points to a quality you may need to build.
          </li>
        </ol>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">What each planet represents</h2>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm min-w-[520px]">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr>
                <th className="p-3">Planet</th>
                <th className="p-3">Rules</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {Object.entries(PLANET_THEMES).map(([name, t]) => (
                <tr key={name}>
                  <td className="p-3 text-white">{name}</td>
                  <td className="p-3">{t.rules}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">The 12 houses</h2>
        <p>
          The chart is divided into twelve houses, each linked to an area of life. In the whole-sign system used here, your
          Rising sign is the first house and the houses follow the signs in order.
        </p>
        <ul className="grid sm:grid-cols-2 gap-2">
          {HOUSE_MEANING.map((h, i) => (
            <li key={h} className="glass-panel rounded-xl px-4 py-2 border border-white/10 text-sm">
              <span className="text-amber-300 font-mono mr-2">{i + 1}</span>
              {h}
            </li>
          ))}
        </ul>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">Related tools</h2>
        <p>
          Want just the essentials? Try the{" "}
          <Link href="/tools/rising-moon" className="text-amber-300 underline">
            rising and moon sign calculator
          </Link>
          , compare partners in the{" "}
          <Link href="/compatibility" className="text-amber-300 underline">
            zodiac compatibility matrix
          </Link>
          , or explore your{" "}
          <Link href="/tools/life-path-number" className="text-amber-300 underline">
            numerology life path number
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">Birth chart FAQ</h2>
        {FAQ.map((f) => (
          <div key={f.q} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
            <h3 className="font-serif font-semibold text-amber-300">{f.q}</h3>
            <p className="text-sm">{f.a}</p>
          </div>
        ))}
      </section>

      <p className="text-xs text-white/40">
        Astrology is a symbolic tradition offered for self-reflection and entertainment, not a substitute for professional
        advice.
      </p>
    </div>
  );
}
