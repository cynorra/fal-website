import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { calculateCompatibility } from "@/lib/compatibility-data";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import {
  Heart,
  Sparkles,
  Flame,
  MessageCircle,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Layers,
  Crown,
  Compass,
} from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import { ZODIAC_PROFILE_BY_ID } from "@/lib/zodiac-profiles";
import { aspectBetween, modalityText } from "@/lib/aspects";

interface Props {
  params: { pair: string };
}

const SIGN_IDS = ZODIAC_SIGNS.map((z) => z.id);

function parsePair(pair: string): [string, string] | null {
  const parts = pair.split("-and-");
  if (parts.length !== 2 || !SIGN_IDS.includes(parts[0]) || !SIGN_IDS.includes(parts[1])) return null;
  return [parts[0], parts[1]];
}

export function generateStaticParams() {
  return SIGN_IDS.flatMap((a) => SIGN_IDS.map((b) => ({ pair: `${a}-and-${b}` })));
}

export function generateMetadata({ params }: Props): Metadata {
  const parts = parsePair(params.pair);
  if (!parts) return { title: "Compatibility Not Found | AuraPulse", robots: { index: false } };
  const canonicalSlug = [...parts].sort((x, y) => SIGN_IDS.indexOf(x) - SIGN_IDS.indexOf(y)).join("-and-");

  const nameA = parts[0].charAt(0).toUpperCase() + parts[0].slice(1);
  const nameB = parts[1].charAt(0).toUpperCase() + parts[1].slice(1);

  return {
    title: `${nameA} and ${nameB} Compatibility: Love, Chemistry & Match | AuraPulse`,
    description: `Complete relationship analysis for ${nameA} and ${nameB}. Explore elemental alchemy, bedroom chemistry, communication traps, and long-term marriage potential.`,
    alternates: { canonical: `/compatibility/${canonicalSlug}` },
  };
}

export default function PairCompatibilityPage({ params }: Props) {
  const parts = parsePair(params.pair);
  if (!parts) notFound();

  const [signA, signB] = parts;
  const report = calculateCompatibility(signA, signB);
  const ia = SIGN_IDS.indexOf(signA);
  const ib = SIGN_IDS.indexOf(signB);
  const aspect = aspectBetween(ia, ib);
  const pa = ZODIAC_PROFILE_BY_ID[signA];
  const pb = ZODIAC_PROFILE_BY_ID[signB];
  const nA = report.signA;
  const nB = report.signB;

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12">
      <div>
        <Link
          href="/compatibility"
          className="inline-flex items-center space-x-1.5 text-xs text-rose-300 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Compatibility Matrix</span>
        </Link>
      </div>

      {/* Header */}
      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-rose-500/20 text-rose-300 border border-rose-500/30">
            {report.verdict}
          </span>
          <span className="text-xs text-white/40 font-mono">• Complete Synastry Dossier</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">
          {report.signA} & {report.signB} Compatibility
        </h1>
        <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed">
          {report.summary}
        </p>
      </header>

      <AdBanner format="horizontal" label="SPONSORED SYNASTRY REPORT" />

      {/* Resonance Rating Box */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 bg-gradient-to-b from-cosmic-900/90 to-cosmic-950/90 text-center">
        <span className="text-xs uppercase tracking-widest text-amber-300 font-mono">
          Overall Synastry Resonance
        </span>
        <div className="text-5xl sm:text-6xl font-serif font-black gold-gradient-text my-2">
          {report.overallScore}%
        </div>
        <p className="text-xs text-white/60 max-w-md mx-auto">
          Based on the elements of the two signs and the astrological aspect between them.
        </p>

        {/* 3 Metric Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <span className="text-xs text-rose-300 font-medium block">Love & Soul Devotion</span>
            <span className="text-2xl font-bold text-white mt-1 block">{report.loveScore}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <span className="text-xs text-amber-300 font-medium block">Chemistry & Physical Heat</span>
            <span className="text-2xl font-bold text-white mt-1 block">{report.chemistryScore}%</span>
          </div>

          <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10">
            <span className="text-xs text-indigo-300 font-medium block">Mental & Conversational</span>
            <span className="text-2xl font-bold text-white mt-1 block">{report.communicationScore}%</span>
          </div>
        </div>
      </section>

      {/* 1. Elemental Chemistry & Polarity */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 text-purple-300 text-xs font-semibold uppercase tracking-wider">
          <Layers className="w-4 h-4" />
          <span>Elemental Dynamics</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          1. Elemental Polarities & Emotional Chemistry
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {report.elementalDynamic}
        </p>
      </section>

      {/* Aspect and modality (pair-specific astrology) */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          {nA} and {nB}: the astrological aspect
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          <strong className="text-white">{aspect.name}.</strong> {aspect.text}
        </p>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">{modalityText(ia, ib)}</p>
        <p className="text-xs text-white/50">
          Scores on this page start from the elements of the two signs and are adjusted by their aspect. They are a playful
          reflection tool, not a prediction.
        </p>
      </section>

      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4">
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          How {nA} and {nB} approach love
        </h2>
        <div>
          <h3 className="font-serif font-bold text-white">{nA} in love</h3>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">{pa.loveStyle}</p>
        </div>
        <div>
          <h3 className="font-serif font-bold text-white">{nB} in love</h3>
          <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">{pb.loveStyle}</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 text-sm text-white/80 font-light">
          <div>
            <h3 className="font-serif font-bold text-white mb-1">{nA} brings</h3>
            <p>{pa.strengths.join(", ")}.</p>
            <h3 className="font-serif font-bold text-white mt-3 mb-1">{nA} should watch</h3>
            <p>{pa.weaknesses.join(", ")}.</p>
          </div>
          <div>
            <h3 className="font-serif font-bold text-white mb-1">{nB} brings</h3>
            <p>{pb.strengths.join(", ")}.</p>
            <h3 className="font-serif font-bold text-white mt-3 mb-1">{nB} should watch</h3>
            <p>{pb.weaknesses.join(", ")}.</p>
          </div>
        </div>
        <p className="text-sm text-white/70">
          Read the full profiles:{" "}
          <Link href={`/horoscopes/${signA}`} className="text-amber-300 underline">
            {nA}
          </Link>{" "}
          and{" "}
          <Link href={`/horoscopes/${signB}`} className="text-amber-300 underline">
            {nB}
          </Link>
          .
        </p>
      </section>

      {/* 2. Intimacy & Bedroom Chemistry */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 bg-gradient-to-b from-rose-950/10 to-transparent space-y-3">
        <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Flame className="w-4 h-4 text-rose-400" />
          <span>Intimacy & Physical Chemistry</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          2. Bedroom Dynamics, Passion & Vulnerability
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {report.intimacyAndChemistry}
        </p>
      </section>

      <AdBanner format="in-article" label="COUPLES TAROT SPREAD & SYNASTRY APP" />

      {/* 3. Communication & Mental Cadence */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-indigo-500/20 bg-gradient-to-b from-indigo-950/10 to-transparent space-y-3">
        <div className="flex items-center space-x-2 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <MessageCircle className="w-4 h-4 text-indigo-400" />
          <span>Communication & Conflict</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          3. How They Talk, Disagree & Resolve Tensions
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {report.communicationAndMental}
        </p>
      </section>

      {/* 4. Long-Term Marriage & Domestic Potential */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 bg-gradient-to-b from-emerald-950/10 to-transparent space-y-3">
        <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Crown className="w-4 h-4 text-emerald-400" />
          <span>Longevity & Marriage</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-serif font-bold text-white">
          4. Long-Term Cohabitation, Marriage & Family
        </h2>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {report.longTermMarriagePotential}
        </p>
      </section>

      {/* Strengths & Challenges Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel rounded-3xl p-6 border border-emerald-500/20 space-y-3 bg-emerald-950/10">
          <h3 className="text-lg font-serif font-bold text-emerald-300">
            ✦ Relationship Superpowers
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-white/80 font-light">
            {report.strengths.map((str, i) => (
              <li key={i} className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{str}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="glass-panel rounded-3xl p-6 border border-amber-500/20 space-y-3 bg-amber-950/10">
          <h3 className="text-lg font-serif font-bold text-amber-300">
            ✦ Critical Vulnerabilities to Watch
          </h3>
          <ul className="space-y-2.5 text-xs sm:text-sm text-white/80 font-light">
            {report.challenges.map((chl, i) => (
              <li key={i} className="flex items-start space-x-2">
                <span className="text-amber-400 font-bold">•</span>
                <span>{chl}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 5. Cosmic Advice Protocol */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-purple-500/30 space-y-3">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Compass className="w-4 h-4" />
          <span>The Astrologer&apos;s Prescription</span>
        </div>
        <h3 className="text-xl font-serif font-bold text-white">
          Cosmic Advice for {report.signA} & {report.signB}
        </h3>
        <p className="text-sm sm:text-base text-white/85 leading-relaxed font-light">
          {report.cosmicAdvice}
        </p>
      </section>

      <AdBanner format="square" label="COUPLES ANNIVERSARY GIFTS & CRYSTALS" />
    </article>
  );
}
