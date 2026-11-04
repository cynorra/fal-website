"use client";

import React, { useState } from "react";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { calculateCompatibility, CompatibilityReport } from "@/lib/compatibility-data";
import { Heart, Sparkles, MessageCircle, Flame, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";
import { AdBanner } from "@/components/ui/AdBanner";

export function ZodiacMatrixWidget() {
  const [signA, setSignA] = useState("aries");
  const [signB, setSignB] = useState("scorpio");

  const report: CompatibilityReport = calculateCompatibility(signA, signB);

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-purple-500/20 shadow-2xl relative">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium mb-3">
          <Heart className="w-3.5 h-3.5 text-rose-400" />
          <span>12x12 Astrological Matrix</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
          Zodiac Compatibility Engine
        </h2>
        <p className="text-sm text-white/60 mt-2">
          Select two sun signs to reveal synastry percentages, elemental tension, romantic harmony, and cosmic advice.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto mb-8">
        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <label className="text-xs text-white/50 block mb-1.5 font-medium">Your Sun Sign</label>
          <select
            value={signA}
            onChange={(e) => setSignA(e.target.value)}
            className="w-full bg-cosmic-950 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
          >
            {ZODIAC_SIGNS.map((s) => (
              <option key={s.id} value={s.id} className="bg-cosmic-950 text-white">
                {s.symbol} {s.name} ({s.element})
              </option>
            ))}
          </select>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-white/10">
          <label className="text-xs text-white/50 block mb-1.5 font-medium">Partner&apos;s Sun Sign</label>
          <select
            value={signB}
            onChange={(e) => setSignB(e.target.value)}
            className="w-full bg-cosmic-950 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
          >
            {ZODIAC_SIGNS.map((s) => (
              <option key={s.id} value={s.id} className="bg-cosmic-950 text-white">
                {s.symbol} {s.name} ({s.element})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Report Cards */}
      <div className="max-w-2xl mx-auto glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 bg-gradient-to-b from-cosmic-900/90 to-cosmic-950/90 shadow-2xl">
        <div className="text-center mb-6">
          <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30 uppercase tracking-wider inline-block mb-2">
            {report.verdict}
          </span>
          <h3 className="text-2xl font-serif font-black text-white">
            {report.signA} & {report.signB} Synastry
          </h3>
          <div className="text-4xl font-serif font-black gold-gradient-text mt-2">
            {report.overallScore}%
          </div>
          <span className="text-[11px] text-white/50 uppercase tracking-widest font-mono">
            Overall Harmonic Match
          </span>
        </div>

        {/* 3 Metric Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1.5 text-rose-400 text-xs font-semibold mb-1">
              <Heart className="w-3.5 h-3.5" />
              <span>Love & Devotion</span>
            </div>
            <span className="text-xl font-bold text-white">{report.loveScore}%</span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-rose-500 rounded-full transition-all duration-500"
                style={{ width: `${report.loveScore}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1.5 text-amber-400 text-xs font-semibold mb-1">
              <Flame className="w-3.5 h-3.5" />
              <span>Magnetic Chemistry</span>
            </div>
            <span className="text-xl font-bold text-white">{report.chemistryScore}%</span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-amber-500 rounded-full transition-all duration-500"
                style={{ width: `${report.chemistryScore}%` }}
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/10 text-center">
            <div className="flex items-center justify-center space-x-1.5 text-indigo-400 text-xs font-semibold mb-1">
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Communication</span>
            </div>
            <span className="text-xl font-bold text-white">{report.communicationScore}%</span>
            <div className="w-full h-1 bg-white/10 rounded-full mt-2 overflow-hidden">
              <div
                className="h-full bg-indigo-500 rounded-full transition-all duration-500"
                style={{ width: `${report.communicationScore}%` }}
              />
            </div>
          </div>
        </div>

        <p className="text-sm text-white/80 leading-relaxed font-light text-left mt-4">
          {report.summary}
        </p>

        <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-xs text-purple-200 text-left mt-4">
          <strong className="text-amber-300 font-semibold block mb-1">
            ✦ Synastry Growth Advice:
          </strong>
          {report.cosmicAdvice}
        </div>

        <div className="mt-6 text-center">
          <Link
            href={`/compatibility/${report.slug}`}
            className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-amber-200 font-medium transition-colors"
          >
            <span>Read Complete 1,000-Word Compatibility Guide for {report.signA} & {report.signB}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      <AdBanner format="in-article" label="RELATIONSHIP & SYNASTRY SPONSOR" />
    </div>
  );
}

