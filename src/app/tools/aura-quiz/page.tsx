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
    </div>
  );
}

