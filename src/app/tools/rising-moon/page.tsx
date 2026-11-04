import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { RisingSignCalculator } from "@/components/interactive/RisingSignCalculator";
import { ArrowLeft } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Rising & Moon Sign Calculator | Natal Astrology Big Three",
  description:
    "Calculate your exact Ascendant (Rising sign) and Moon sign using your birth date, time, and location. Uncover your complete astrological trinity.",
};

export default function RisingMoonPage() {
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

      <RisingSignCalculator />

      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 text-white/80 font-light text-sm leading-relaxed">
        <h3 className="text-xl font-serif font-bold text-white">
          Why Your Rising Sign Dictates Your Life Path
        </h3>
        <p>
          While your Sun sign represents who you are becoming and your Moon sign reflects where you came from emotionally, your Rising Sign (Ascendant) is the ship in which you sail through this lifetime. It establishes the layout of the 12 astrological houses in your birth chart.
        </p>
      </section>

      <AdBanner format="in-article" label="PRECISION NATAL BIRTH CHART APP" />
    </div>
  );
}

