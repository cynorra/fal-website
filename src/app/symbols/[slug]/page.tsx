import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { SYMBOL_ENTRIES } from "@/lib/symbols-data";
import {
  Sparkles,
  Heart,
  DollarSign,
  Compass,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Layers,
  Scroll,
} from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";
import { SYMBOL_SEO_TITLES } from "@/lib/seo-titles";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return SYMBOL_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = SYMBOL_ENTRIES.find((s) => s.slug === params.slug);
  if (!entry) return { title: "Symbol Meaning Not Found | AuraPulse" };

  return {
    title: `${SYMBOL_SEO_TITLES[entry.slug] ?? entry.title} | AuraPulse`,
    description: entry.tagline,
    openGraph: {
      title: entry.title,
      description: entry.tagline,
      type: "article",
    },
  };
}

export default function SymbolDetailPage({ params }: Props) {
  const entry = SYMBOL_ENTRIES.find((s) => s.slug === params.slug);
  if (!entry) notFound();

  const others = SYMBOL_ENTRIES.filter((s) => s.slug !== entry.slug).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: entry.title,
        description: entry.tagline,
        author: {
          "@type": "Organization",
          name: "AuraPulse Editorial Team",
        },
        publisher: {
          "@type": "Organization",
          name: "AuraPulse",
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `${SITE_URL}/symbols/${entry.slug}`,
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: entry.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Back button */}
      <div>
        <Link
          href="/symbols"
          className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Symbols & Numbers</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {entry.category}
          </span>
          <span className="text-xs text-white/50 flex items-center font-mono">
            <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
            {entry.readTime}
          </span>
          <span className="text-xs text-white/40 font-mono">• Sacred Numerology Dossier</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-amber-500/20 border border-amber-500/30 flex items-center justify-center font-serif font-black text-2xl text-amber-300 flex-shrink-0">
            {entry.code.slice(0, 4)}
          </div>
          <div>
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight">
              {entry.title}
            </h1>
          </div>
        </div>
        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
          {entry.tagline}
        </p>
      </header>

      {/* Top Banner Ad */}
      <AdBanner format="horizontal" label="SPONSORED NUMEROLOGY ADVICE" />

      {/* 1. Pythagorean Numerology & Sacred Mathematics */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center space-x-2.5 text-amber-300">
          <Layers className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            1. Pythagorean Numerology & Sacred Mathematics
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.pythagoreanNumerology}
        </p>
      </section>

      {/* 2. Carl Jung's Synchronicity Phenomenon */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/20 bg-gradient-to-b from-purple-950/10 to-transparent space-y-4">
        <div className="flex items-center space-x-2.5 text-purple-300">
          <Sparkles className="w-5 h-5 text-purple-300" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            2. The Synchronicity Trigger: Why You Keep Seeing This
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.synchronicityContext}
        </p>
      </section>

      {/* Mid In-Article Ad */}
      <AdBanner format="in-article" label="TWIN FLAME ASTROLOGY SPONSOR" />

      {/* 3. Love & Twin Flame Dynamics */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 space-y-4 bg-gradient-to-b from-rose-950/10 to-transparent">
        <div className="flex items-center space-x-2.5 text-rose-300">
          <Heart className="w-5 h-5 text-rose-400" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            3. Love, Relationships & Twin Flame Dynamics
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.loveAndTwinFlame}
        </p>
      </section>

      {/* 4. Career, Finances & Material Abundance */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 space-y-4 bg-gradient-to-b from-emerald-950/10 to-transparent">
        <div className="flex items-center space-x-2.5 text-emerald-300">
          <DollarSign className="w-5 h-5 text-emerald-400" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            4. Career, Vocation & Material Manifestation
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.careerAndMoney}
        </p>
      </section>

      {/* 5. Historical & Mythological Roots */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <div className="flex items-center space-x-2.5 text-amber-300">
          <Scroll className="w-5 h-5 text-amber-400" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            5. Ancient Lore & Mythological Lineage
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.historicalMythology}
        </p>
      </section>

      {/* 6. Spiritual Meaning & Angelic Transmission */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-4">
        <div className="flex items-center space-x-2.5 text-purple-300">
          <Compass className="w-5 h-5 text-purple-300" />
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            6. Angelic Guidance & Archangelic Resonance
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.spiritualMeaning}
        </p>
      </section>

      {/* 7. Action Protocol & Sacred Declaration */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-400/30 bg-amber-950/15 space-y-4">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Physical World Integration Protocol</span>
        </div>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
          What To Do Right Now When You See This Sign
        </h3>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
          {entry.actionGuide}
        </p>
        <div className="pt-2">
          <blockquote className="p-4 rounded-2xl bg-cosmic-950/80 border border-amber-400/40 text-amber-200 text-sm sm:text-base italic font-serif text-center">
            &ldquo;{entry.affirmation}&rdquo;
          </blockquote>
        </div>
      </section>

      {/* 8. Frequently Asked Questions */}
      {entry.faq && entry.faq.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {entry.faq.map((q, i) => (
              <div key={i} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
                <h4 className="font-serif font-semibold text-sm sm:text-base text-amber-300">
                  {q.question}
                </h4>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Bottom Ad */}
      <AdBanner format="square" label="RECOMMENDED TALISMANS & CRYSTALS" />

      {/* Related Symbols */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="text-lg font-serif font-bold text-white">
          Discover Other Synchronistic Numbers
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {others.map((s) => (
            <Link
              key={s.slug}
              href={`/symbols/${s.slug}`}
              className="glass-panel glass-panel-hover rounded-2xl p-4 border border-white/10 group flex flex-col justify-between"
            >
              <span className="text-xl font-serif font-black text-amber-300">{s.code}</span>
              <h4 className="text-xs font-serif font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-1 mt-1">
                {s.title}
              </h4>
              <span className="text-[11px] text-purple-300 font-medium mt-3 flex items-center">
                <span>View &rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
