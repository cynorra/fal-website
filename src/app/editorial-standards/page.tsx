import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Editorial Standards & Esoteric Research | Horoscopes and Charts",
  description: "Horoscopes and Charts editorial guidelines, fact-checking principles, and archetypal sourcing standards.",
};

export default function EditorialStandardsPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 space-y-8 text-white/80 leading-relaxed font-light text-sm">
      <header className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
          Trust & Transparency
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">
          Editorial Standards & Methodology
        </h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">1. Psychological Foundation</h2>
        <p>
          Our dream encyclopedia draws directly from Carl G. Jung&apos;s collected works, specifically his research on the collective unconscious, archetypal motifs, and shadow integration. We emphasize dream analysis as self-awareness rather than superstitious panic.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">2. Astrological Calculations</h2>
        <p>
          Our planetary transits, moon phase calculators, and rising sign engines use standard astronomical formulas (such as the mean synodic month for moon phases and sidereal time for rising signs). Results are approximations intended for reflection, not professional ephemeris output.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">3. Original Content & Quality Control</h2>
        <p>
          We do not publish auto-generated thin content. Every guide is written and reviewed by the Horoscopes and Charts editorial team, checked against published psychological and mythological sources, and updated when we find errors.
        </p>
      </section>
    </article>
  );
}

