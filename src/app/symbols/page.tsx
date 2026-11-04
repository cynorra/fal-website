import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Sparkles, ArrowRight, ShieldCheck, Compass } from "lucide-react";
import { SYMBOL_ENTRIES } from "@/lib/symbols-data";
import { AdBanner } from "@/components/ui/AdBanner";
import { GlobalSearchBar } from "@/components/interactive/GlobalSearchBar";

export const metadata: Metadata = {
  title: "Angel Numbers & Sacred Symbols | Numerology & Omens",
  description:
    "Decode repetitive angel numbers (111, 222, 333, 444, 777, 1111) and spirit animal omens. Understand divine synchronicity, twin flame codes, and career messages.",
};

export default function SymbolsHubPage() {
  return (
    <div className="space-y-12 py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Divine Synchronicity Engine</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Angel Numbers & Sacred Omens
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Repetitive numbers and spontaneous animal encounters are subtle vibrational taps on the shoulder from higher realms. Learn what the universe is communicating.
        </p>

        <div className="pt-2 max-w-md mx-auto">
          <GlobalSearchBar />
        </div>
      </div>

      <AdBanner format="horizontal" label="SPONSORED NUMEROLOGY ARCHIVES" />

      {/* Grid of Angel Numbers & Omens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {SYMBOL_ENTRIES.map((entry) => (
          <Link
            key={entry.slug}
            href={`/symbols/${entry.slug}`}
            className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 group flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-medium font-mono">
                  {entry.category}
                </span>
                <span className="text-2xl font-serif font-black text-amber-300">
                  {entry.code}
                </span>
              </div>
              <h2 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                {entry.title}
              </h2>
              <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-light">
                {entry.tagline}
              </p>
            </div>

            <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-300 font-medium">
              <span>Decode Message</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <AdBanner format="in-article" label="NUMEROLOGY CALCULATOR SPONSOR" />
    </div>
  );
}

