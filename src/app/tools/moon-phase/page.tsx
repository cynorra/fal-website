import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { MoonPhaseMatcher } from "@/components/interactive/MoonPhaseMatcher";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Moon Phase Soulmate Matcher | Test Your Birth Moon Compatibility",
  description:
    "Align your birth moon phases side by side. Uses astronomical synodic algorithms to reveal your emotional resonance and soulmate match percentage.",
};

export default function MoonPhasePage() {
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

      <MoonPhaseMatcher />

      {/* Deep SEO Article below the tool */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 text-white/80 font-light text-sm leading-relaxed">
        <h3 className="text-xl font-serif font-bold text-white">
          The Astrological Science of Moon Phase Synastry
        </h3>
        <p>
          While Western astrology often fixates exclusively on the Sun sign, traditional esoteric synastry acknowledges the Moon as the supreme driver of intimate relationship longevity. The Moon governs our autonomic nervous system, childhood conditioning, subconscious habits, and emotional communication.
        </p>
        <p>
          When two individuals born under complementary lunar phases unite—such as a New Moon visionary paired with a Full Moon illuminator—their bond mimics the natural 29.5-day synodic cycle of ebb, flow, seed, and harvest.
        </p>
      </section>

      <AdBanner format="in-article" label="LUNAR JEWELRY & MOONSTONE TALISMANS" />
    </div>
  );
}

