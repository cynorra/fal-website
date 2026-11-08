import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { BookOpen, Sparkles, ArrowRight, Search, ShieldCheck } from "lucide-react";
import { DREAM_ENTRIES } from "@/lib/dreams-data";
import { AdBanner } from "@/components/ui/AdBanner";
import { GlobalSearchBar } from "@/components/interactive/GlobalSearchBar";

export const metadata: Metadata = {
  title: "Dream Dictionary | A-Z Meaning, Jungian Psychology & Spiritual Symbols",
  description:
    "Explore our comprehensive dream encyclopedia. Decipher what it means to dream of snakes, falling, flying, teeth falling out, water floods, and more.",
};

export default function DreamsHubPage() {
  const categories = ["All", "Animals", "Nature & Elements", "Physical States", "Relationships"];

  return (
    <div className="space-y-12 py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
          <BookOpen className="w-3.5 h-3.5 text-amber-300" />
          <span>The Subconscious Archives</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Encyclopedic Dream Dictionary
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Unlock the nocturnal language of the psyche. Every entry pairs Carl Jung&apos;s analytical shadow psychology with timeless esoteric wisdom.
        </p>

        <div className="pt-2 max-w-md mx-auto">
          <GlobalSearchBar />
        </div>
      </div>

      <AdBanner format="horizontal" label="SPONSORED DREAM ARCHIVE BANNER" />

      {/* Grid of Dreams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DREAM_ENTRIES.map((entry) => (
          <Link
            key={entry.slug}
            href={`/dreams/${entry.slug}`}
            className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 group flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                  {entry.category}
                </span>
                <span className="text-[10px] text-white/40 uppercase font-mono">1,000+ Words</span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {entry.title}
              </h2>
              <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-light">
                {entry.quickAnswer}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-300 font-medium">
              <span>Read Full Analysis</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* In-Article Editorial Content for SEO Depth */}
      <div className="glass-panel rounded-3xl p-8 border border-white/10 space-y-6 max-w-4xl mx-auto my-12 text-white/80 leading-relaxed font-light">
        <h3 className="text-2xl font-serif font-bold text-white">
          How to Interpret Your Dreams: The Jungian Method
        </h3>
        <p className="text-sm">
          In analytical psychology, Swiss psychiatrist Carl Gustav Jung posited that dreams are not arbitrary synaptic firings; they are unvarnished expressions of the unconscious mind. Unlike Sigmund Freud, who viewed dreams primarily as repressed wish fulfillment, Jung understood the dream world as a compensatory system designed to restore psychic equilibrium.
        </p>
        <p className="text-sm">
          When analyzing a dream on Horoscopes and Charts, ask yourself three essential questions: What emotion did I feel upon awakening? What current waking-life situation mirrors the emotional climate of the dream? And what shadow aspect of myself might the central archetype represent?
        </p>
      </div>

      <AdBanner format="in-article" label="DREAM JOURNAL & SOUND BATH TOOLS" />
    </div>
  );
}

