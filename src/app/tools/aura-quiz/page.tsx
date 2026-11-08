import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { AuraQuizWidget } from "@/components/interactive/AuraQuizWidget";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Aura Color Quiz | Discover Your Dominant Energy Frequency",
  description:
    "Answer 7 intuitive questions to reveal whether your auric field radiates in Royal Indigo, Mystic Violet, Radiant Gold, or Emerald Green.",
};

export default function AuraQuizPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      <div>
        <Link
          href="/tools"
          className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Tools</span>
        </Link>
      </div>

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Aura Color Quiz</h1>
        <p className="text-base text-white/70">Seven questions about how you react in everyday situations, scored into a dominant aura color.</p>
      </header>

      <AuraQuizWidget />

      {/* SEO Article */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 text-white/80 font-light text-sm leading-relaxed">
        <h3 className="text-xl font-serif font-bold text-white">
          Understanding the Human Biofield & Aura Layers
        </h3>
        <p>
          Every living organism emits an electromagnetic biofield (measurable via Kirlian photography and SQUID magnetometers). In metaphysical traditions, this field reflects the health of your chakras, emotional memory, and spiritual purpose.
        </p>
        <p>
          By aligning with your true aura color, you can choose gemstones, meditation frequencies, and lifestyle habits that amplify your natural magnetic gifts.
        </p>
      </section>

      <AdBanner format="in-article" label="AURA CLEANSING SOUND BOWLS" />
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 text-white/80 font-light text-sm leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">How the aura quiz is scored</h2>
          <p>Each answer awards points to one or more aura colors. When you finish, the color with the most points becomes your dominant aura, shown with its strengths, shadow side, companion crystal and associated chakra. The result depends only on your answers, so the same answers always give the same color.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">What aura colors mean</h2>
          <p>In spiritual traditions, an aura is described as a field of color around a person that reflects mood and temperament. There is no scientific evidence that auras can be measured, and aura photography shows heat and moisture, not energy. The colors here are a vocabulary for describing your personality style.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">Aura quiz questions</h2>
          <p>Can my aura color change? Since the quiz reflects your current answers, yes. Take it again when your mood or circumstances change. Is this a personality test? It is a light-hearted reflection tool, not a psychological assessment.</p>
        </div>
      </section>
    </div>
  );
}

