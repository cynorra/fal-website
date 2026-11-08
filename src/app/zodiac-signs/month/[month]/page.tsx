import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { ZODIAC_PROFILE_BY_ID } from "@/lib/zodiac-profiles";
import { MONTHS, MONTH_BY_SLUG, signOnDay } from "@/lib/zodiac-calendar";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: { month: string };
}

export function generateStaticParams() {
  return MONTHS.map((m) => ({ month: m.slug }));
}

const byId = Object.fromEntries(ZODIAC_SIGNS.map((s) => [s.id, s]));

function ordinal(n: number) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function generateMetadata({ params }: Props): Metadata {
  const m = MONTH_BY_SLUG[params.month];
  if (!m) return { title: "Month Not Found | Horoscopes and Charts", robots: { index: false } };
  const names = m.segments.map(([id]) => byId[id].name);
  const title = `${m.name} Zodiac Signs: ${names.join(" & ")} Dates and Traits | Horoscopes and Charts`;
  const description = `${m.name} zodiac sign dates: ${m.segments
    .map(([id, a, b]) => `${byId[id].name} (${m.name} ${a}-${b})`)
    .join(" and ")}. Day-by-day chart, personality traits and compatibility for ${m.name} birthdays.`;
  return { title, description, openGraph: { title, description, type: "article" } };
}

export default function MonthPage({ params }: Props) {
  const m = MONTH_BY_SLUG[params.month];
  if (!m) notFound();

  const idx = MONTHS.findIndex((x) => x.slug === m.slug);
  const prev = MONTHS[(idx + 11) % 12];
  const next = MONTHS[(idx + 1) % 12];
  const [first, second] = m.segments;
  const s1 = byId[first[0]];
  const s2 = byId[second[0]];
  const p1 = ZODIAC_PROFILE_BY_ID[s1.id];
  const p2 = ZODIAC_PROFILE_BY_ID[s2.id];

  const faq = [
    {
      q: `What zodiac signs are in ${m.name}?`,
      a: `${m.name} has two zodiac signs: ${s1.name} for birthdays from ${m.name} ${first[1]} to ${first[2]}, and ${s2.name} for birthdays from ${m.name} ${second[1]} to ${second[2]}. Dates can shift by a day in some years because the Sun changes sign at a different hour each year.`,
    },
    {
      q: `Is a ${m.name} ${first[2]} or ${second[1]} birthday a cusp?`,
      a: `Birthdays within about a day of ${m.name} ${first[2]} / ${second[1]} are often called cusp dates. You still have only one Sun sign, determined by the exact moment of birth and your time zone, but you may recognize traits of both ${s1.name} and ${s2.name}. A birth chart calculator can confirm which side you fall on.`,
    },
    {
      q: `What element are ${m.name} signs?`,
      a: `${s1.name} is a ${s1.element.toLowerCase()} sign (${s1.modality.toLowerCase()}) and ${s2.name} is ${s2.element === s1.element ? "also " : "a "}${s2.element.toLowerCase()} sign (${s2.modality.toLowerCase()}).`,
    },
    {
      q: `What are the most compatible signs for ${m.name} birthdays?`,
      a: `${s1.name} is traditionally most compatible with ${p1.compat.best.join(", ")}, and ${s2.name} with ${p2.compat.best.join(", ")}. Compatibility is symbolic and individual charts matter more than Sun signs alone.`,
    },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${m.name} Zodiac Signs: ${s1.name} and ${s2.name}`,
        author: { "@type": "Organization", name: "Horoscopes and Charts Editorial Team" },
        publisher: { "@type": "Organization", name: "Horoscopes and Charts" },
        mainEntityOfPage: `${SITE_URL}/zodiac-signs/month/${m.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  const days = Array.from({ length: m.days }, (_, i) => i + 1);

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/zodiac-signs" className="text-xs text-purple-300 hover:text-white transition-colors">
        ← Zodiac signs and dates
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">{m.name} Zodiac Signs</h1>
        <p className="text-base sm:text-lg text-white/70">
          People born in {m.name} are {s1.name} {s1.symbol} through {m.name} {first[2]} and {s2.name} {s2.symbol} from{" "}
          {m.name} {second[1]}. Here is the day-by-day chart, what each sign is like and who they match with.
        </p>
      </header>

      <section className="grid sm:grid-cols-2 gap-4">
        {m.segments.map(([id, a, b]) => {
          const s = byId[id];
          return (
            <Link
              key={id}
              href={`/horoscopes/${id}`}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-purple-400/40 transition-colors block"
            >
              <p className="font-serif font-bold text-white text-lg">
                <span className="text-amber-300 mr-2 text-2xl">{s.symbol}</span>
                {s.name}
              </p>
              <p className="text-xs text-amber-300 font-mono mt-1">
                {m.name} {a} - {b}
              </p>
              <p className="text-xs text-white/60 mt-2">
                {s.element} • {s.modality} • ruled by {ZODIAC_PROFILE_BY_ID[id].rulerPlanet}
              </p>
              <p className="text-sm text-white/80 mt-2">{ZODIAC_PROFILE_BY_ID[id].tagline}</p>
            </Link>
          );
        })}
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">{m.name} birthdays by day</h2>
        <p>
          Find your birthday below to see your Sun sign. Boundary dates ({m.name} {first[2]} and {m.name} {second[1]}) can
          change by a day depending on the year and the hour you were born.
        </p>
        <div className="glass-panel rounded-2xl border border-white/10 p-4 grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-1 text-sm">
          {days.map((d) => {
            const s = byId[signOnDay(m, d)];
            const boundary = d === first[2] || d === second[1];
            return (
              <p key={d} className="flex justify-between border-b border-white/5 py-1">
                <span className="text-white/70">
                  {m.name} {ordinal(d)}
                </span>
                <span className={boundary ? "text-amber-300" : "text-white"}>
                  {s.symbol} {s.name}
                </span>
              </p>
            );
          })}
        </div>
      </section>

      <AdBanner format="in-article" />

      {[
        { s: s1, p: p1, range: first },
        { s: s2, p: p2, range: second },
      ].map(({ s, p, range }) => (
        <section key={s.id} className="space-y-3">
          <h2 className="text-2xl font-serif font-bold text-white">
            {s.name}: {m.name} {range[1]}-{range[2]}
          </h2>
          <p>{p.personality[0]}</p>
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="glass-panel rounded-2xl p-5 border border-white/10">
              <h3 className="font-serif font-semibold text-white mb-2">Strengths</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {p.strengths.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <div className="glass-panel rounded-2xl p-5 border border-white/10">
              <h3 className="font-serif font-semibold text-white mb-2">Challenges</h3>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                {p.weaknesses.map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
          </div>
          <p>
            <strong className="text-white">In love:</strong> {p.loveStyle}
          </p>
          <p>
            <strong className="text-white">Best matches:</strong> {p.compat.best.join(", ")}.{" "}
            <Link href={`/horoscopes/${s.id}`} className="text-amber-300 underline">
              Read the full {s.name} guide
            </Link>
            .
          </p>
        </section>
      ))}

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{m.name} cusp birthdays</h2>
        <p>
          Cusp birthdays around {m.name} {first[2]} and {m.name} {second[1]} sit between {s1.name} and {s2.name}.
          Astrology gives you one Sun sign, set by the exact moment of birth, but cusp-born people often identify with both
          neighbors: {s1.name} is {p1.keywords.slice(0, 3).join(", ")} while {s2.name} is{" "}
          {p2.keywords.slice(0, 3).join(", ")}. To check the exact side, use the{" "}
          <Link href="/tools/birth-chart" className="text-amber-300 underline">
            free birth chart calculator
          </Link>{" "}
          with your birth time and place.
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">{m.name} zodiac FAQ</h2>
        <div className="space-y-3">
          {faq.map((f) => (
            <div key={f.q} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
              <h3 className="font-serif font-semibold text-amber-300">{f.q}</h3>
              <p className="text-sm">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="flex flex-wrap items-center justify-between gap-3 text-xs">
        <Link href={`/zodiac-signs/month/${prev.slug}`} className="text-purple-300 hover:text-white">
          ← {prev.name} signs
        </Link>
        <Link href="/zodiac-signs" className="text-purple-300 hover:text-white">
          All months
        </Link>
        <Link href={`/zodiac-signs/month/${next.slug}`} className="text-purple-300 hover:text-white">
          {next.name} signs →
        </Link>
      </nav>

      <p className="text-xs text-white/40">
        Astrology is a symbolic tradition for self-reflection and entertainment, not a substitute for professional advice.
      </p>
    </article>
  );
}
