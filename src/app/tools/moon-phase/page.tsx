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

      <header className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Moon Phase Birthday Matcher</h1>
        <p className="text-base text-white/70">Find the Moon phase on any two birthdays and compare how they relate across the 29.5-day lunar cycle.</p>
      </header>

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
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 text-white/80 font-light text-sm leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">How the Moon phase is calculated</h2>
          <p>The tool counts the days since a known new Moon and divides by the average synodic month of about 29.53 days. The remainder tells you where in the cycle a date falls, from new Moon through first quarter, full Moon and last quarter. This simple method is accurate to roughly a day, which is fine for deciding on a phase name but not for exact timing.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">What the comparison shows</h2>
          <p>Putting two birth phases side by side shows how far apart they sit in the cycle. People born in neighboring phases are described as similar in rhythm, and opposite phases as complementary. This is symbolic: there is no research linking birth phase to relationship outcomes.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">Moon phase questions</h2>
          <p>Does my birth Moon phase matter? In astrology it is a flavor of temperament, not a rule. How accurate is the phase? Within about a day. Where can I see today's phase? The daily horoscope pages show the Moon sign and phase for the current day.</p>
        </div>
      </section>
    </div>
  );
}

