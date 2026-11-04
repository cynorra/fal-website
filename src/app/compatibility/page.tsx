import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Heart, Sparkles, Flame, ArrowRight } from "lucide-react";
import { ZodiacMatrixWidget } from "@/components/interactive/ZodiacMatrixWidget";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Zodiac Compatibility Matrix | Love, Chemistry & Synastry Matcher",
  description:
    "Explore in-depth astrological compatibility between all 12 zodiac signs. Calculate love scores, communication balance, and elemental synastry.",
};

export default function CompatibilityPage() {
  const popularPairs = [
    { a: "Aries", b: "Leo", slug: "aries-and-leo", highlight: "Fiery Passion & Playful Devotion" },
    { a: "Taurus", b: "Virgo", slug: "taurus-and-virgo", highlight: "Grounded Security & Lasting Bond" },
    { a: "Gemini", b: "Libra", slug: "gemini-and-libra", highlight: "Intellectual Chemistry & Free Flow" },
    { a: "Cancer", b: "Scorpio", slug: "cancer-and-scorpio", highlight: "Profound Soul-Merging Intimacy" },
    { a: "Aries", b: "Scorpio", slug: "aries-and-scorpio", highlight: "Magnetic Tension & Intense Transformation" },
    { a: "Leo", b: "Sagittarius", slug: "leo-and-sagittarius", highlight: "Boundless Adventure & Solar Joy" },
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>Cosmic Synastry Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Zodiac Compatibility Matrix
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          How do your elements interact? Water cools Fire, Air fuels Flame, and Earth grounds Vision. Test your connection below.
        </p>
      </div>

      <AdBanner format="horizontal" label="SPONSORED SYNASTRY REPORT" />

      {/* Main Interactive Matrix Engine */}
      <ZodiacMatrixWidget />

      {/* Popular Pairings Grid */}
      <section className="space-y-6 pt-6">
        <h2 className="text-2xl font-serif font-bold text-white text-center">
          Popular Astrological Synastry Pairs
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularPairs.map((pair) => (
            <Link
              key={pair.slug}
              href={`/compatibility/${pair.slug}`}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold">
                  <Flame className="w-3.5 h-3.5" />
                  <span>Synastry Analysis</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {pair.a} & {pair.b}
                </h3>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  {pair.highlight}
                </p>
              </div>

              <span className="text-[11px] text-amber-300 font-medium mt-4 flex items-center">
                <span>Read Full 1,000-Word Guide &rarr;</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <AdBanner format="in-article" label="COUPLES HOROSCOPE & TAROT READING" />
    </div>
  );
}

