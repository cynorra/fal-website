"use client";

import React, { useState } from "react";
import { Sparkles, Heart, Moon, Calendar, ArrowRight, Share2, Compass } from "lucide-react";
import confetti from "canvas-confetti";
import { AdBanner } from "@/components/ui/AdBanner";

// Astronomical formula to determine moon age & phase
function getMoonPhaseData(dateStr: string) {
  if (!dateStr) return { phaseName: "New Moon", phaseProgress: 0, illumination: 0, description: "Unknown" };

  const date = new Date(dateStr);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Known new moon reference epoch (January 6, 2000, 18:14 UTC)
  const epoch = new Date(Date.UTC(2000, 0, 6, 18, 14)).getTime();
  const current = new Date(Date.UTC(year, month - 1, day, 12, 0)).getTime();
  const diffDays = (current - epoch) / (1000 * 60 * 60 * 24);
  const synodicMonth = 29.53058867;
  const moonAge = ((diffDays % synodicMonth) + synodicMonth) % synodicMonth;
  const progress = moonAge / synodicMonth; // 0 to 1

  let phaseName = "New Moon";
  let illumination = Math.round((1 - Math.cos(progress * 2 * Math.PI)) / 2 * 100);
  let description = "Darkness, fresh beginnings, inward focus.";

  if (progress < 0.03 || progress > 0.97) {
    phaseName = "New Moon";
    description = "A clean energetic slate; intuitive, seed-planting energy.";
  } else if (progress < 0.22) {
    phaseName = "Waxing Crescent";
    description = "Growth, emerging hope, dynamic momentum.";
  } else if (progress < 0.28) {
    phaseName = "First Quarter";
    description = "Determination, overcoming obstacles, active willpower.";
  } else if (progress < 0.47) {
    phaseName = "Waxing Gibbous";
    description = "Refinement, deep devotion, preparing for harvest.";
  } else if (progress < 0.53) {
    phaseName = "Full Moon";
    description = "Peak psychic illumination, radiant clarity, cosmic fruition.";
  } else if (progress < 0.72) {
    phaseName = "Waning Gibbous (Disseminating)";
    description = "Sharing wisdom, deep gratitude, communal harmony.";
  } else if (progress < 0.78) {
    phaseName = "Third Quarter";
    description = "Emotional release, forgiveness, clearing out old karma.";
  } else {
    phaseName = "Waning Crescent (Balsamic)";
    description = "Surrender, deep restorative rest, spiritual transition.";
  }

  return { phaseName, phaseProgress: progress, illumination, description };
}

// Realistic SVG Moon renderer
function MoonGraphic({ progress, name }: { progress: number; name: string }) {
  // Illumination ratio from 0 to 1
  const isWaxing = progress <= 0.5;
  const illum = (1 - Math.cos(progress * 2 * Math.PI)) / 2;

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shadow-[0_0_35px_rgba(255,255,255,0.25)] border border-white/20 bg-slate-950">
        {/* Dark base with craters */}
        <div className="absolute inset-0 bg-[#0d0f17] rounded-full">
          <div className="absolute top-4 left-6 w-5 h-5 rounded-full bg-slate-900/60 blur-[1px]" />
          <div className="absolute top-12 left-14 w-8 h-8 rounded-full bg-slate-900/50 blur-[1px]" />
          <div className="absolute bottom-6 left-8 w-6 h-6 rounded-full bg-slate-900/60 blur-[1px]" />
        </div>

        {/* Illuminated portion simulated with glow and curve */}
        <div
          className="absolute inset-0 rounded-full transition-all duration-700 pointer-events-none"
          style={{
            background:
              illum < 0.05
                ? "transparent"
                : illum > 0.95
                ? "radial-gradient(circle at 35% 35%, #fffef0 0%, #e2e8f0 70%, #94a3b8 100%)"
                : isWaxing
                ? `linear-gradient(90deg, transparent ${100 - illum * 100}%, #fefce8 100%)`
                : `linear-gradient(90deg, #fefce8 0%, transparent ${illum * 100}%)`,
            boxShadow: illum > 0.4 ? "inset 0 0 20px rgba(254, 240, 138, 0.4)" : undefined,
          }}
        />

        {/* Outer glowing halo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent pointer-events-none" />
      </div>
      <span className="font-serif text-sm font-semibold text-white mt-3">{name}</span>
    </div>
  );
}

export function MoonPhaseMatcher() {
  const [date1, setDate1] = useState("1998-04-14");
  const [name1, setName1] = useState("You");
  const [date2, setDate2] = useState("1996-10-28");
  const [name2, setName2] = useState("Soulmate");
  const [result, setResult] = useState<any | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    const moon1 = getMoonPhaseData(date1);
    const moon2 = getMoonPhaseData(date2);

    // Synastry score based on harmonic phase difference
    const phaseDiff = Math.abs(moon1.phaseProgress - moon2.phaseProgress);
    const normalizedDiff = Math.min(phaseDiff, 1 - phaseDiff);

    let score = 85;
    let title = "Harmonic Lunar Kinship";
    let message = "";

    if (normalizedDiff < 0.08) {
      // Near identical phases
      score = 96;
      title = "Mirrored Twin Lunar Souls";
      message = "You share almost identical lunar phases. Your emotional rhythms, coping mechanisms, and intuitive needs operate in synchronized lockstep. You instinctively understand each other's moods without words.";
    } else if (normalizedDiff > 0.42 && normalizedDiff < 0.58) {
      // Opposites (New Moon + Full Moon)
      score = 98;
      title = "Sacred Polar Complement (Opposites Complete)";
      message = "The supreme cosmic pairing: one born under the introspective seed of the New Moon, the other under the radiant revelation of the Full Moon. Where one provides quiet grounding, the other breathes vibrant illumination. You complete the whole circle.";
    } else if ((normalizedDiff > 0.20 && normalizedDiff < 0.30) || (normalizedDiff > 0.70 && normalizedDiff < 0.80)) {
      score = 91;
      title = "Dynamic Growth Catalyst";
      message = "A vibrant 90-degree square aspect. Your bond sparks continuous growth, mutual fascination, and energetic passion. You challenge each other to become better versions of yourselves.";
    } else {
      score = 88;
      title = "Flowing Trine Harmony";
      message = "A smooth, nourishing emotional connection. Conflict dissolves quickly because your baseline emotional expectations are naturally compatible.";
    }

    setResult({
      score,
      title,
      message,
      moon1,
      moon2,
      name1: name1 || "Partner 1",
      name2: name2 || "Partner 2",
    });

    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#38bdf8", "#e0e7ff", "#f59e0b", "#c084fc"],
      });
    } catch (e) {}
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-purple-500/20 shadow-2xl relative">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium mb-3">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>Synastry Calculator</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
          Moon Phase Soulmate Matcher
        </h2>
        <p className="text-sm text-white/60 mt-2">
          Discover how your birth moons align. Combine two birthdays to reveal your lunar resonance and soulmate synastry score.
        </p>
      </div>

      <form onSubmit={handleCalculate} className="max-w-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6 my-6">
        {/* Person 1 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block">
            Partner 1 Details
          </span>
          <div>
            <label className="text-[11px] text-white/50 block mb-1">Name / Nickname</label>
            <input
              type="text"
              value={name1}
              onChange={(e) => setName1(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g. Luna"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/50 block mb-1">Birth Date</label>
            <input
              type="date"
              required
              value={date1}
              onChange={(e) => setDate1(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        {/* Person 2 */}
        <div className="glass-panel p-5 rounded-2xl border border-white/10 space-y-3">
          <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block">
            Partner 2 Details
          </span>
          <div>
            <label className="text-[11px] text-white/50 block mb-1">Name / Nickname</label>
            <input
              type="text"
              value={name2}
              onChange={(e) => setName2(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
              placeholder="e.g. Orion"
            />
          </div>
          <div>
            <label className="text-[11px] text-white/50 block mb-1">Birth Date</label>
            <input
              type="date"
              required
              value={date2}
              onChange={(e) => setDate2(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
            />
          </div>
        </div>

        <div className="sm:col-span-2 text-center pt-2">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-medium text-sm shadow-xl shadow-purple-950/50 hover:shadow-purple-700/50 transition-all duration-300 inline-flex items-center justify-center space-x-2"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Align Moon Phases & Calculate Resonance</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Result Section */}
      {result && (
        <div className="mt-10 pt-8 border-t border-white/10 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-amber-400/30 bg-gradient-to-b from-cosmic-900/90 to-cosmic-950/90">
            {/* Visual Moons Side-by-Side */}
            <div className="flex flex-col sm:flex-row items-center justify-around gap-6 my-4">
              <div className="text-center">
                <span className="text-xs text-white/50 block mb-2">{result.name1}</span>
                <MoonGraphic progress={result.moon1.phaseProgress} name={result.moon1.phaseName} />
                <span className="text-[11px] text-purple-300/80 font-mono mt-1 block">
                  {result.moon1.illumination}% Illumination
                </span>
              </div>

              {/* Connector Heart & Score Badge */}
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-400 to-rose-500 flex items-center justify-center shadow-lg shadow-rose-900/40 animate-pulse-slow">
                  <Heart className="w-8 h-8 text-white fill-white" />
                </div>
                <div className="mt-3 text-center">
                  <span className="text-3xl font-serif font-black gold-gradient-text">
                    {result.score}%
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-white/50 block font-mono">
                    Soul Resonance
                  </span>
                </div>
              </div>

              <div className="text-center">
                <span className="text-xs text-white/50 block mb-2">{result.name2}</span>
                <MoonGraphic progress={result.moon2.phaseProgress} name={result.moon2.phaseName} />
                <span className="text-[11px] text-amber-300/80 font-mono mt-1 block">
                  {result.moon2.illumination}% Illumination
                </span>
              </div>
            </div>

            {/* In-depth Interpretation */}
            <div className="mt-8 text-center max-w-xl mx-auto space-y-3">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 uppercase tracking-wider inline-block">
                {result.title}
              </span>
              <p className="text-sm text-white/80 leading-relaxed font-light">
                {result.message}
              </p>
            </div>
          </div>

          <AdBanner format="in-article" label="CELESTIAL COMPATIBILITY SPONSOR" />
        </div>
      )}
    </div>
  );
}

