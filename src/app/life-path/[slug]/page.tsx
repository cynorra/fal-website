import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { LIFE_PATH_ENTRIES, LIFE_PATH_BY_NUMBER } from "@/lib/life-path-data";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return LIFE_PATH_ENTRIES.map((e) => ({ slug: e.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const e = LIFE_PATH_ENTRIES.find((x) => x.slug === params.slug);
  if (!e) return { title: "Life Path Not Found | AuraPulse", robots: { index: false } };
  return {
    title: `Life Path Number ${e.number} Meaning: ${e.archetype} | AuraPulse`,
    description: `Life Path ${e.number} (${e.archetype}) meaning: strengths, challenges, love, career, money and compatibility. ${e.tagline}`,
    openGraph: { title: `Life Path Number ${e.number} Meaning`, type: "article" },
  };
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-2xl font-serif font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}

export default function LifePathDetail({ params }: Props) {
  const e = LIFE_PATH_ENTRIES.find((x) => x.slug === params.slug);
  if (!e) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `Life Path Number ${e.number} Meaning: ${e.archetype}`,
        description: e.tagline,
        author: { "@type": "Organization", name: "AuraPulse Editorial Team" },
        publisher: { "@type": "Organization", name: "AuraPulse" },
        mainEntityOfPage: `${SITE_URL}/life-path/${e.slug}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: e.faq.map((f) => ({
          "@type": "Question",
          name: f.question,
          acceptedAnswer: { "@type": "Answer", text: f.answer },
        })),
      },
    ],
  };

  const related = [...e.compatibility.best, ...e.compatibility.challenging].filter(
    (n, i, a) => a.indexOf(n) === i && LIFE_PATH_BY_NUMBER[n]
  );

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-10 text-sm text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href="/tools/life-path-number"
        className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Life Path Number Calculator</span>
      </Link>

      <header className="space-y-3">
        <p className="text-xs uppercase tracking-widest text-purple-300 font-mono">
          {e.isMaster ? "Master Number" : "Life Path"} {e.number} · {e.archetype}
        </p>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Life Path Number {e.number} Meaning</h1>
        <p className="text-base text-white/70">{e.tagline}</p>
      </header>

      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <p className="text-xs uppercase tracking-widest text-amber-300 font-mono mb-1">Quick answer</p>
        <p>
          Life Path {e.number} is known as {e.archetype}. Its core lesson: {e.lesson}
        </p>
      </div>

      <Section title={`What Life Path ${e.number} means`}>
        {e.overview.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </Section>

      <AdBanner format="in-article" />

      <div className="grid sm:grid-cols-2 gap-6">
        <Section title="Strengths">
          <ul className="list-disc pl-5 space-y-1">
            {e.strengths.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>
        <Section title="Challenges">
          <ul className="list-disc pl-5 space-y-1">
            {e.challenges.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </Section>
      </div>

      <Section title="Love and relationships">
        <p>{e.love}</p>
      </Section>
      <Section title="Career">
        <p>{e.career}</p>
      </Section>
      <Section title="Money">
        <p>{e.money}</p>
      </Section>

      <Section title="Compatibility">
        <p>
          Traditionally strongest matches: {e.compatibility.best.map((n) => `Life Path ${n}`).join(", ")}. Paths that
          need more conscious effort: {e.compatibility.challenging.map((n) => `Life Path ${n}`).join(", ")}.
        </p>
        <p>{e.compatibility.note}</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {related.map((n) => (
            <Link
              key={n}
              href={`/life-path/${LIFE_PATH_BY_NUMBER[n].slug}`}
              className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs hover:border-purple-400/40"
            >
              Life Path {n}
            </Link>
          ))}
        </div>
      </Section>

      <Section title="Growth practices">
        <ul className="list-disc pl-5 space-y-1">
          {e.growth.map((g) => (
            <li key={g}>{g}</li>
          ))}
        </ul>
      </Section>

      <Section title="Frequently asked questions">
        <div className="space-y-4">
          {e.faq.map((f) => (
            <div key={f.question}>
              <h3 className="font-serif font-bold text-white">{f.question}</h3>
              <p>{f.answer}</p>
            </div>
          ))}
        </div>
      </Section>

      <p className="text-xs text-white/40 border-t border-white/10 pt-4">
        Numerology is a symbolic tradition offered for self-reflection and entertainment. It is not a substitute for
        professional medical, legal or financial advice.
      </p>

      <AdBanner format="horizontal" />
    </article>
  );
}
