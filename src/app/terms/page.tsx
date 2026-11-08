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

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">4. Disclaimer of Warranties</h2>
        <p>
          The site and its content are provided &ldquo;as is&rdquo; without warranties of any kind. Astrology, tarot, numerology and
          dream interpretation are not scientifically proven predictive methods. Do not rely on them for medical, legal, financial
          or other important decisions. If you are struggling with your mental health, please contact a qualified professional or a
          local crisis service.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">5. Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by law, AuraPulse is not liable for any damages arising from your use of, or inability to
          use, the site or from decisions made based on its content.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">6. Advertising & Third-Party Links</h2>
        <p>
          The site displays advertising served by third parties such as Google AdSense and may link to external sites. We do not
          endorse advertised products or external content. See our Privacy Policy for details.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-serif font-bold text-white">7. Acceptable Use & Changes</h2>
        <p>
          You agree not to scrape, copy at scale, disrupt, or generate artificial ad impressions or clicks on the site. We may change
          these terms at any time; continued use means you accept the updated terms.
        </p>
      </section>
    </article>
  );
}

