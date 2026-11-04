import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { DREAM_ENTRIES } from "@/lib/dreams-data";
import {
  Sparkles,
  BookOpen,
  Brain,
  Compass,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Scroll,
  PenTool,
  Clock,
  Layers,
} from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return DREAM_ENTRIES.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const entry = DREAM_ENTRIES.find((d) => d.slug === params.slug);
  if (!entry) return { title: "Dream Meaning Not Found | AuraPulse" };

  return {
    title: `${entry.title} | AuraPulse`,
    description: entry.quickAnswer,
    openGraph: {
      title: entry.title,
      description: entry.quickAnswer,
      type: "article",
    },
  };
}

export default function DreamDetailPage({ params }: Props) {
  const entry = DREAM_ENTRIES.find((d) => d.slug === params.slug);
  if (!entry) notFound();

  const otherDreams = DREAM_ENTRIES.filter((d) => d.slug !== entry.slug).slice(0, 3);

  // Rich Schema.org Article & FAQPage JSON-LD
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: entry.title,
        description: entry.quickAnswer,
        author: {
          "@type": "Organization",
          name: "AuraPulse Spiritual & Psychological Research Editorial",
        },
        publisher: {
          "@type": "Organization",
          name: "AuraPulse",
          logo: {
            "@type": "ImageObject",
            url: "https://aurapulse.com/favicon.ico",
          },
        },
        mainEntityOfPage: {
          "@type": "WebPage",
          "@id": `https://aurapulse.com/dreams/${entry.slug}`,
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
          href="/dreams"
          className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Dream Dictionary</span>
        </Link>
      </div>

      {/* Hero Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {entry.category}
          </span>
          <span className="text-xs text-white/50 flex items-center font-mono">
            <Clock className="w-3.5 h-3.5 mr-1 text-amber-400" />
            {entry.readTime}
          </span>
          <span className="text-xs text-white/40 font-mono">• Peer-Reviewed Archetypal Analysis</span>
        </div>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-black text-white leading-tight">
          {entry.title}
        </h1>
        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
          {entry.subtitle}
        </p>
      </header>

      {/* Top Banner Ad */}
      <AdBanner format="horizontal" label="SPONSORED DREAM SANCTUARY GUIDANCE" />

      {/* 1. Quick Answer Box (Google Featured Snippet Anchor) */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border-l-4 border-amber-400 bg-amber-950/15 space-y-3">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Core Essence & Quick Summary</span>
        </div>
        <p className="text-sm sm:text-base text-white/95 leading-relaxed font-normal">
          {entry.quickAnswer}
        </p>
      </section>

      {/* 2. Evolutionary Neurobiology & REM Sleep Architecture */}
      <section className="space-y-4 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center space-x-2.5 text-blue-300">
          <div className="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
            <Brain className="w-4 h-4 text-blue-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            1. Evolutionary Neurobiology & REM Sleep Processing
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {entry.neurobiology}
        </p>
      </section>

      {/* 3. Psychological Interpretation (Carl Jung & Depth Psychology) */}
      <section className="space-y-4 glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/20 bg-gradient-to-b from-purple-950/10 to-transparent">
        <div className="flex items-center space-x-2.5 text-purple-300">
          <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
            <Layers className="w-4 h-4 text-purple-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            2. Carl Jung&apos;s Analytical Psychology & Shadow Integration
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {entry.psychological}
        </p>
      </section>

      {/* Mid-Article High CTR AdSense Slot */}
      <AdBanner format="in-article" label="DREAM JOURNAL & MEDITATION APP" />

      {/* 4. Historical & Cross-Cultural Mythology */}
      <section className="space-y-4 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center space-x-2.5 text-amber-300">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Scroll className="w-4 h-4 text-amber-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            3. Cross-Cultural Lore & Ancient Oneirocritic Traditions
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {entry.historicalMythology}
        </p>
      </section>

      {/* 5. Spiritual & Esoteric Guidance */}
      <section className="space-y-4 glass-panel rounded-3xl p-6 sm:p-8 border border-white/10">
        <div className="flex items-center space-x-2.5 text-amber-300">
          <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
            <Compass className="w-4 h-4 text-amber-300" />
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            4. Spiritual Transmutation & Energetic Alignment
          </h2>
        </div>
        <p className="text-sm sm:text-base text-white/80 leading-relaxed font-light">
          {entry.spiritual}
        </p>
        <div className="p-4 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/70">
          <strong className="text-amber-300 font-semibold block mb-1">
            Tarot Archetype Resonance:
          </strong>
          {entry.tarotCardEcho}
        </div>
      </section>

      {/* 6. Specific Dream Variations & Scenarios */}
      <section className="space-y-5">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          5. Specific Contexts & Varied Scenarios
        </h2>
        <div className="space-y-3.5">
          {entry.variations.map((v, i) => (
            <div
              key={i}
              className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2 hover:border-purple-400/40 transition-colors"
            >
              <h3 className="font-serif font-semibold text-base text-amber-300">
                ✦ {v.scenario}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                {v.meaning}
              </p>
              <p className="text-xs text-purple-300/80 italic pt-1">
                Psychological context: {v.psychologicalContext}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Journal Prompts for Self-Inquiry */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 bg-purple-950/10 space-y-4">
        <div className="flex items-center space-x-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <PenTool className="w-4 h-4" />
          <span>Subconscious Reflection</span>
        </div>
        <h3 className="text-lg sm:text-xl font-serif font-bold text-white">
          Self-Inquiry Journaling Prompts
        </h3>
        <ul className="space-y-2.5 text-xs sm:text-sm text-white/85 font-light">
          {entry.journalPrompts.map((prompt, i) => (
            <li key={i} className="flex items-start space-x-2.5">
              <span className="w-5 h-5 rounded-full bg-purple-500/20 text-purple-300 text-xs flex items-center justify-center flex-shrink-0 mt-0.5 font-mono">
                {i + 1}
              </span>
              <span>{prompt}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* 8. Concrete Somatic & Behavioral Action Advice */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 bg-emerald-950/15 space-y-3">
        <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4" />
          <span>Actionable Waking-Life Integration</span>
        </div>
        <h3 className="text-lg font-serif font-bold text-white">
          What To Do in Your Waking Reality
        </h3>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {entry.actionAdvice}
        </p>
      </section>

      {/* 9. Comprehensive FAQ Section */}
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

      {/* Bottom Ad Banner */}
      <AdBanner format="square" label="RECOMMENDED SLEEP & MEDITATION AIDS" />

      {/* Related Dreams Section */}
      <section className="space-y-4 pt-6 border-t border-white/10">
        <h3 className="text-lg font-serif font-bold text-white">
          Explore Other Nocturnal Archetypes
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {otherDreams.map((d) => (
            <Link
              key={d.slug}
              href={`/dreams/${d.slug}`}
              className="glass-panel glass-panel-hover rounded-2xl p-4 border border-white/10 group flex flex-col justify-between"
            >
              <h4 className="text-xs font-serif font-semibold text-white group-hover:text-amber-300 transition-colors line-clamp-2">
                {d.title}
              </h4>
              <span className="text-[11px] text-amber-300 font-medium mt-3 flex items-center">
                <span>Read Analysis &rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
