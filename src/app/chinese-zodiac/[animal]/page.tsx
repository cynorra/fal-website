import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ANIMAL_PROFILES, ANIMAL_BY_NAME, TRINES, CLASHES } from "@/lib/chinese-zodiac-data";
import { ANIMALS, chineseZodiac } from "@/lib/chinese-calendar";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: { animal: string };
}

export function generateStaticParams() {
  return ANIMAL_PROFILES.map((a) => ({ animal: a.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const a = ANIMAL_PROFILES.find((x) => x.slug === params.animal);
  if (!a) return { title: "Chinese Zodiac Not Found | AuraPulse", robots: { index: false } };
  return {
    title: `Year of the ${a.animal}: Personality, Years & Compatibility | AuraPulse`,
    description: `Chinese zodiac ${a.animal}: personality, strengths, weaknesses, love, career, lucky numbers and colors, compatibility and every ${a.animal} year. ${a.tagline}`,
  };
}

export default function AnimalPage({ params }: Props) {
  const a = ANIMAL_PROFILES.find((x) => x.slug === params.animal);
  if (!a) notFound();

  const years = Array.from({ length: 2043 - 1936 + 1 }, (_, i) => 1936 + i)
    .map((y) => ({ y, ...chineseZodiac(y, 7, 1) }))
    .filter((r) => r.animal === a.animal);
  const friends = TRINES[a.animal];
  const clash = CLASHES[a.animal];
  const slugOf = (n: string) => ANIMAL_BY_NAME[n].slug;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Year of the ${a.animal}: Chinese Zodiac Personality & Compatibility`,
        author: { "@type": "Organization", name: "AuraPulse Editorial Team" },
        publisher: { "@type": "Organization", name: "AuraPulse" },
        mainEntityOfPage: `${SITE_URL}/chinese-zodiac/${a.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: a.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  const H2 = ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-2xl font-serif font-bold text-white">{children}</h2>
  );

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-10 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/chinese-zodiac" className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Chinese Zodiac Calculator</span>
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Year of the {a.animal}</h1>
        <p className="text-base sm:text-lg text-white/70">{a.tagline}</p>
      </header>

      <section className="space-y-3">
        <H2>{a.animal} personality</H2>
        {a.personality.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
        <div className="grid sm:grid-cols-2 gap-6 pt-2">
          <div>
            <h3 className="font-serif font-bold text-white mb-2">Strengths</h3>
            <ul className="list-disc pl-5 space-y-1">
              {a.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-bold text-white mb-2">Weaknesses</h3>
            <ul className="list-disc pl-5 space-y-1">
              {a.weaknesses.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-3">
        <H2>{a.animal} in love</H2>
        <p>{a.love}</p>
      </section>
      <section className="space-y-3">
        <H2>{a.animal} career</H2>
        <p>{a.career}</p>
      </section>

      <section className="space-y-3">
        <H2>{a.animal} compatibility</H2>
        <p>
          Traditionally the {a.animal} is most harmonious with{" "}
          {friends.map((f, i) => (
            <React.Fragment key={f}>
              {i > 0 && " and "}
              <Link href={`/chinese-zodiac/${slugOf(f)}`} className="text-amber-300 underline">
                {f}
              </Link>
            </React.Fragment>
          ))}
          , the two other animals in its trine. The classic clash is the{" "}
          <Link href={`/chinese-zodiac/${slugOf(clash)}`} className="text-amber-300 underline">
            {clash}
          </Link>
          , the animal opposite it in the cycle. These are traditions, not rules, and individual elements and charts
          matter much more.
        </p>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <h3 className="font-serif font-bold text-white">Lucky numbers</h3>
          <p className="mt-1 text-amber-300">{a.luckyNumbers.join(", ")}</p>
        </div>
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <h3 className="font-serif font-bold text-white">Lucky colors</h3>
          <p className="mt-1 text-amber-300">{a.luckyColors.join(", ")}</p>
        </div>
      </section>

      <section className="space-y-3">
        <H2>{a.animal} years</H2>
        <p>
          People born in these years belong to the {a.animal}. If you were born in January or February, confirm the
          Chinese New Year date on the year page.
        </p>
        <div className="flex flex-wrap gap-2">
          {years
            .filter((r) => r.y >= 1948 && r.y <= 2031)
            .map((r) => (
              <Link
                key={r.y}
                href={`/chinese-zodiac/year/${r.y}`}
                className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-purple-400/40"
              >
                {r.y} · {r.polarity} {r.element}
              </Link>
            ))}
        </div>
      </section>

      <section className="space-y-4">
        <H2>{a.animal} FAQ</H2>
        {a.faq.map((f) => (
          <div key={f.question} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
            <h3 className="font-serif font-semibold text-amber-300">{f.question}</h3>
            <p className="text-sm">{f.answer}</p>
          </div>
        ))}
      </section>

      <p className="text-xs text-white/40 border-t border-white/10 pt-4">
        The Chinese zodiac is a cultural tradition offered for reflection and entertainment. Other animals:{" "}
        {ANIMALS.filter((n) => n !== a.animal).map((n, i) => (
          <React.Fragment key={n}>
            {i > 0 && ", "}
            <Link href={`/chinese-zodiac/${slugOf(n)}`} className="underline">
              {n}
            </Link>
          </React.Fragment>
        ))}
        .
      </p>
    </article>
  );
}
