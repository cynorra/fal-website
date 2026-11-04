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
    </div>
  );
}

