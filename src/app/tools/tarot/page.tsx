import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { DailyTarotWidget } from "@/components/interactive/DailyTarotWidget";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Daily Tarot Card Draw | Free 3D Interactive Card Reading",
  description:
    "Draw your single card tarot reading for today. Reveal insights from the Major Arcana for love, career, and spiritual guidance.",
};

export default function TarotPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      <div>
        <Link
          href="/tools"
          className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Daily Tarot Card Reading</h1>
        <p className="text-base text-white/70">Draw one card for today and read its upright and reversed meaning. Use it as a prompt for reflection, not a prediction.</p>
      </header>

      <DailyTarotWidget />

      {/* Deep SEO Article */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 text-white/80 font-light text-sm leading-relaxed">
        <h3 className="text-xl font-serif font-bold text-white">
          How to Read Tarot as a Subconscious Mirror
        </h3>
        <p>
          Tarot is not about fatalistic fortune telling; it is a profound archetypal system of self-reflection. When you draw a card on AuraPulse, your intuitive subconscious selects a pictorial symbol that mirrors the energetic currents operating below your everyday awareness.
        </p>
        <p>
          Use your daily card as a contemplative anchor: whenever you face a difficult decision during your day, recall the wisdom of the archetype you revealed this morning.
        </p>
      </section>

      <AdBanner format="in-article" label="AUTHENTIC TAROT DECKS & SILK MATS" />
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 text-white/80 font-light text-sm leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">How this tarot draw works</h2>
          <p>This tool shuffles a small deck of 10 Major Arcana cards and shows one at random. Each card has an upright meaning and a reversed meaning, and the card changes every time you draw. It is a reduced deck for quick daily reflection, not a full 78-card reading.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">How to use your card</h2>
          <p>Read the card, notice your first reaction, and write one sentence about how it might apply to today. Tarot is most useful as a mirror: the symbol gives you words for a mood or decision you already carry. Treat it as entertainment and self-reflection rather than fortune-telling.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">Tarot questions</h2>
          <p>Is a one-card draw accurate? There is no evidence that tarot predicts events, so use the card as a prompt. What does a reversed card mean? It usually points to the same theme blocked, internal or overdone. Can I draw more than once? Yes, but many readers keep to one card a day so the symbol has time to sink in.</p>
        </div>
      </section>
    </div>
  );
}

