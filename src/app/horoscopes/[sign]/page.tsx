import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import {
  Moon,
  Sparkles,
  Heart,
  Briefcase,
  Activity,
  ArrowLeft,
  ArrowRight,
  ShieldAlert,
  Compass,
  Calendar,
  Layers,
} from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { sign: string };
}

export function generateStaticParams() {
  return ZODIAC_SIGNS.map((s) => ({ sign: s.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const sign = ZODIAC_SIGNS.find((s) => s.id === params.sign);
  if (!sign) return { title: "Zodiac Sign Not Found | AuraPulse" };

  return {
    title: `${sign.name} Horoscope Today: Love, Career & Archetypal Guidance | AuraPulse`,
    description: sign.overview,
    openGraph: {
      title: `${sign.name} Daily Horoscope | AuraPulse`,
      description: sign.overview,
    },
  };
}

export default function SignDetailPage({ params }: Props) {
  const sign = ZODIAC_SIGNS.find((s) => s.id === params.sign);
  if (!sign) notFound();

  const todayFormatted = formatDate();

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${sign.name} Daily Horoscope and Astrological Profile`,
        description: sign.overview,
        author: {
          "@type": "Organization",
          name: "AuraPulse Astrological Ephemeris Guild",
        },
        publisher: {
          "@type": "Organization",
          name: "AuraPulse",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: sign.faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        <Link
          href="/horoscopes"
          className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All 12 Signs</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {sign.element} Element • {sign.modality} Modality
          </span>
          <span className="text-xs text-white/50 font-mono">• {sign.polarity}</span>
          <span className="text-xs text-white/40 font-mono">• {todayFormatted}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center text-4xl text-amber-300 flex-shrink-0">
            {sign.symbol}
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
              {sign.name} Daily Horoscope
            </h1>
            <span className="text-xs text-amber-300 font-mono block mt-1">
              {sign.dates} • {sign.soulArchetype}
            </span>
          </div>
        </div>
      </header>

      <AdBanner format="horizontal" label="DAILY ASTROLOGICAL SPONSOR" />

      {/* Natal Blueprint Metadata Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-white/10 text-xs space-y-1 text-white/70">
          <p>
            <strong className="text-white/95">Planetary Ruler:</strong> {sign.ruler}
          </p>
          <p>
            <strong className="text-white/95">Natural Astrological House:</strong> {sign.naturalHouse}
          </p>
        </div>
        <div className="glass-panel rounded-2xl p-4 border border-white/10 text-xs space-y-1 text-white/70">
          <p>
            <strong className="text-white/95">Sacred Archetype:</strong> {sign.soulArchetype}
          </p>
          <p>
            <strong className="text-white/95">Ruling Day:</strong> {sign.luckyDay}
          </p>
        </div>
      </section>

      {/* 1. Daily Overview & Planetary Transit */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4" />
          <span>Planetary Alignment & Cosmic Overview</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          Today&apos;s Celestial Transmission for {sign.name}
        </h2>
        <p className="text-sm sm:text-base text-white/90 leading-relaxed font-light">
          {sign.overview}
        </p>
      </section>

      {/* 2. Love & Intimacy */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 space-y-3 bg-gradient-to-b from-rose-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-4 h-4 text-rose-400" />
          <span>Love, Romance & Intimate Currents</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
          Emotional Tides & Heart Connection
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {sign.love}
        </p>
      </section>

      <AdBanner format="in-article" label="CELESTIAL COMPATIBILITY READING" />

      {/* 3. Career & Material Abundance */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 space-y-3 bg-gradient-to-b from-emerald-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Briefcase className="w-4 h-4 text-emerald-400" />
          <span>Career, Finances & Vocation</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
          Professional Strategy & Wealth Opportunities
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {sign.career}
        </p>
      </section>

      {/* 4. Somatic Wellness & Nervous System */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-blue-500/20 space-y-3 bg-gradient-to-b from-blue-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-4 h-4 text-blue-400" />
          <span>Somatic Grounding & Physical Health</span>
        </div>
        <h2 className="text-lg sm:text-xl font-serif font-bold text-white">
          Body Wisdom & Energy Recharge
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {sign.wellness}
        </p>
      </section>

      {/* Shadow Trap Alert Box */}
      <section className="glass-panel rounded-2xl p-5 border border-amber-500/30 bg-amber-950/15 space-y-1.5">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <ShieldAlert className="w-4 h-4" />
          <span>The Unconscious Shadow Trap</span>
        </div>
        <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
          {sign.shadowTrap}
        </p>
      </section>

      {/* Lucky Attributes Grid */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="glass-panel rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono block">
            Lucky Number
          </span>
          <span className="text-2xl font-serif font-black text-amber-300 mt-1 block">
            {sign.luckyNumber}
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono block">
            Power Color
          </span>
          <span className="text-xs font-semibold text-white mt-2 block">{sign.luckyColor}</span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono block">
            Resonant Crystal
          </span>
          <span className="text-xs font-semibold text-purple-300 mt-2 block">
            {sign.powerCrystal}
          </span>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-white/10 text-center">
          <span className="text-[10px] text-white/50 uppercase tracking-widest font-mono block">
            Highest Harmony
          </span>
          <span className="text-xs font-semibold text-rose-300 mt-2 block">
            {sign.affinitySign}
          </span>
        </div>
      </section>

      {/* 5. Frequently Asked Questions */}
      {sign.faq && sign.faq.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
            Frequently Asked Questions for {sign.name}
          </h2>
          <div className="space-y-3">
            {sign.faq.map((q, i) => (
              <div key={i} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
                <h4 className="font-serif font-semibold text-sm sm:text-base text-amber-300">
                  {q.question}
                </h4>
                <p className="text-xs sm:text-sm text-white/80 leading-relaxed font-light">
                  {q.answer}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      <AdBanner format="square" label="ZODIAC JEWELRY & TALISMANS" />
    </article>
  );
}
