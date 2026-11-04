import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | AuraPulse",
  description: "Terms and conditions of using AuraPulse esoteric calculators and content archives.",
};

export default function TermsPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 space-y-8 text-white/80 leading-relaxed font-light text-sm">
      <header className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
          Last Updated: November 2026
        </span>
        <h1 className="text-3xl sm:text-4xl font-serif font-black text-white">
          Terms of Service
        </h1>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">1. Acceptance of Terms</h2>
        <p>
          By accessing and utilizing the AuraPulse portal, you agree to comply with and be bound by these Terms of Service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">2. Contemplative & Entertainment Use</h2>
        <p>
          All content, including dream interpretations, angel number readings, tarot cards, astrological horoscopes, and synastry calculators, is intended solely for personal reflection, spiritual contemplation, and entertainment purposes. AuraPulse does not provide licensed medical, legal, or financial counseling.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">3. Intellectual Property</h2>
        <p>
          All custom texts, calculators, algorithmic interpretations, and brand marks on AuraPulse are the exclusive property of the AuraPulse Network and protected under international copyright treaties.
        </p>
      </section>
    </article>
  );
}

