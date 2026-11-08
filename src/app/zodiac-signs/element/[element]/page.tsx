import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { ZODIAC_PROFILE_BY_ID } from "@/lib/zodiac-profiles";
import { ELEMENTS, ELEMENT_BY_SLUG, SIGN_IDS_BY_ELEMENT, ELEMENT_SLUGS } from "@/lib/zodiac-calendar";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: { element: string };
}

export function generateStaticParams() {
  return ELEMENTS.map((e) => ({ element: e.slug }));
}

const byId = Object.fromEntries(ZODIAC_SIGNS.map((s) => [s.id, s]));

export function generateMetadata({ params }: Props): Metadata {
  const e = ELEMENT_BY_SLUG[params.element];
  if (!e) return { title: "Element Not Found | Horoscopes and Charts", robots: { index: false } };
  const names = SIGN_IDS_BY_ELEMENT[e.slug].map((id) => byId[id].name);
  const title = `${e.name} Signs in Astrology: ${names.join(", ")} | Horoscopes and Charts`;
  const description = `${e.name} zodiac signs (${names.join(", ")}): personality traits, strengths, challenges, love, career and compatibility with the other elements.`;
  return { title, description, openGraph: { title, description, type: "article" } };
}

export default function ElementPage({ params }: Props) {
  const e = ELEMENT_BY_SLUG[params.element];
  if (!e) notFound();
  const ids = SIGN_IDS_BY_ELEMENT[e.slug];
  const others = ELEMENTS.filter((x) => x.slug !== e.slug);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${e.name} Signs in Astrology`,
        author: { "@type": "Organization", name: "Horoscopes and Charts Editorial Team" },
        publisher: { "@type": "Organization", name: "Horoscopes and Charts" },
        mainEntityOfPage: `${SITE_URL}/zodiac-signs/element/${e.slug}`,
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

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/zodiac-signs" className="text-xs text-purple-300 hover:text-white transition-colors">
        ← Zodiac signs and dates
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">{e.name} Signs in Astrology</h1>
        <p className="text-base sm:text-lg text-white/70">{e.tagline}</p>
        <p>{e.overview}</p>
      </header>

      <section className="grid sm:grid-cols-3 gap-4">
        {ids.map((id) => {
          const s = byId[id];
          return (
            <Link
              key={id}
              href={`/horoscopes/${id}`}
              className="glass-panel rounded-2xl p-5 border border-white/10 hover:border-purple-400/40 transition-colors block"
            >
              <p className="font-serif font-bold text-white">
                <span className="text-amber-300 mr-2 text-xl">{s.symbol}</span>
                {s.name}
              </p>
              <p className="text-xs text-amber-300 font-mono mt-1">{s.dates}</p>
              <p className="text-xs text-white/60 mt-1">
                {s.modality} • {ZODIAC_PROFILE_BY_ID[id].rulerPlanet}
              </p>
              <p className="text-xs text-white/80 mt-2">{ZODIAC_PROFILE_BY_ID[id].tagline}</p>
            </Link>
          );
        })}
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">Core traits of {e.name.toLowerCase()} signs</h2>
        <ul className="list-disc pl-5 space-y-1">
          {e.traits.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <h3 className="font-serif font-semibold text-amber-300 pt-2">Gifts</h3>
        <p>{e.gifts}</p>
        <h3 className="font-serif font-semibold text-amber-300">Challenges</h3>
        <p>{e.challenges}</p>
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{e.name} signs in love and at work</h2>
        <p>
          <strong className="text-white">Love:</strong> {e.love}
        </p>
        <p>
          <strong className="text-white">Career:</strong> {e.work}
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">How the three {e.name.toLowerCase()} signs differ</h2>
        <p>
          Sharing an element does not make the signs identical. Their modality (cardinal, fixed or mutable) changes how
          the element behaves.
        </p>
        <div className="grid sm:grid-cols-3 gap-4">
          {ids.map((id) => {
            const s = byId[id];
            const p = ZODIAC_PROFILE_BY_ID[id];
            return (
              <div key={id} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-1">
                <h3 className="font-serif font-semibold text-white">
                  {s.name} <span className="text-xs text-white/50">({s.modality})</span>
                </h3>
                <p className="text-xs text-white/70">Keywords: {p.keywords.join(", ")}</p>
                <p className="text-xs text-white/70">Growth edge: {p.weaknesses.slice(0, 2).join("; ").toLowerCase()}.</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{e.name} sign compatibility with other elements</h2>
        <div className="space-y-2">
          {ELEMENT_SLUGS.map((k) => (
            <p key={k}>
              <strong className="text-white">
                {e.name} + {k[0].toUpperCase() + k.slice(1)}:
              </strong>{" "}
              {e.withOthers[k]}
            </p>
          ))}
        </div>
        <p>
          Check any pair in detail with our{" "}
          <Link href="/compatibility" className="text-amber-300 underline">
            zodiac compatibility pages
          </Link>
          .
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-serif font-bold text-white">{e.name} signs FAQ</h2>
        <div className="space-y-3">
          {e.faq.map((f) => (
            <div key={f.question} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
              <h3 className="font-serif font-semibold text-amber-300">{f.question}</h3>
              <p className="text-sm">{f.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="flex flex-wrap gap-3 text-xs">
        {others.map((o) => (
          <Link key={o.slug} href={`/zodiac-signs/element/${o.slug}`} className="text-purple-300 hover:text-white">
            {o.name} signs →
          </Link>
        ))}
      </nav>

      <p className="text-xs text-white/40">
        Astrology is a symbolic tradition for self-reflection and entertainment, not a substitute for professional advice.
      </p>
    </article>
  );
}
