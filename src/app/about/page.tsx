import React from "react";
import { Metadata } from "next";
import { Sparkles, ShieldCheck, Heart, Compass, BookOpen } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "About Us | Horoscopes and Charts Cosmic Sanctuary",
  description:
    "Learn about Horoscopes and Charts, our editorial standards, our research philosophy bridging Jungian psychology with esoteric sciences, and our global mission.",
};

export default function AboutPage() {
  return (
    <article className="max-w-3xl mx-auto py-10 space-y-10 text-white/80 leading-relaxed font-light">
      <header className="space-y-4 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amber-300" />
          <span>Our Vision & Origins</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          About Horoscopes and Charts
        </h1>
        <p className="text-sm sm:text-base text-white/60 max-w-xl mx-auto">
          Illuminating the subtle architecture of the soul through timeless archetypes, classical psychology, and modern contemplative interfaces.
        </p>
      </header>

      <AdBanner format="horizontal" label="SPONSORED EDITORIAL" />

      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          Our Guiding Philosophy
        </h2>
        <p className="text-sm sm:text-base">
          Horoscopes and Charts was founded with a singular conviction: that humanity&apos;s ancient hunger for meaning should not be met with shallow clickbait or commercial superstition. We believe the dream world, numerical synchronicities, and planetary transits are sacred psychological mirrors.
        </p>
        <p className="text-sm sm:text-base">
          By combining Carl Jung&apos;s depth psychology with classical astrological principles, we create a sanctuary where curious seekers can decode their nocturnal messages and align with their highest life path.
        </p>
      </section>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center space-y-2">
          <BookOpen className="w-6 h-6 text-purple-300 mx-auto" />
          <h3 className="font-serif font-bold text-sm text-white">Depth Research</h3>
          <p className="text-xs text-white/60">
            Entries draw on established psychological and mythological literature.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center space-y-2">
          <ShieldCheck className="w-6 h-6 text-emerald-300 mx-auto" />
          <h3 className="font-serif font-bold text-sm text-white">Data Privacy</h3>
          <p className="text-xs text-white/60">
            Our interactive tools process calculations locally without harvesting private data.
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-5 border border-white/10 text-center space-y-2">
          <Heart className="w-6 h-6 text-rose-300 mx-auto" />
          <h3 className="font-serif font-bold text-sm text-white">Somatic Care</h3>
          <p className="text-xs text-white/60">
            Grounding mental abstractions into nervous system regulation and gentle breathwork.
          </p>
        </div>
      </section>

      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          Contact Our Editorial Team
        </h2>
        <p className="text-sm">
          Have an inquiry, dream story, or suggestion? We welcome reader feedback and corrections at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`} className="text-amber-300 underline">{CONTACT_EMAIL}</a>.
        </p>
      </section>
    </article>
  );
}

