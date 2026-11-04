"use client";

import React, { useState } from "react";
import { AURA_QUESTIONS, AURA_RESULTS, AuraResult } from "@/lib/quiz-data";
import { Sparkles, ArrowRight, RotateCcw, Share2, CheckCircle2, Shield } from "lucide-react";
import confetti from "canvas-confetti";
import { AdBanner } from "@/components/ui/AdBanner";

export function AuraQuizWidget() {
  const [currentStep, setCurrentStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({
    indigo: 0,
    violet: 0,
    gold: 0,
    emerald: 0,
    rose: 0,
    crystal: 0,
  });
  const [finalAura, setFinalAura] = useState<AuraResult | null>(null);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState<number | null>(null);

  const currentQ = AURA_QUESTIONS[currentStep];
  const progressPercent = Math.round(((currentStep + 1) / AURA_QUESTIONS.length) * 100);

  const handleSelectOption = (idx: number) => {
    setSelectedOptionIdx(idx);

    setTimeout(() => {
      // Add scores
      const option = currentQ.options[idx];
      const newScores = { ...scores };
      Object.entries(option.auraPoints).forEach(([auraKey, pts]) => {
        newScores[auraKey] = (newScores[auraKey] || 0) + pts;
      });
      setScores(newScores);
      setSelectedOptionIdx(null);

      if (currentStep + 1 < AURA_QUESTIONS.length) {
        setCurrentStep((prev) => prev + 1);
      } else {
        // Calculate winner
        let highestAura = "violet";
        let maxVal = -1;
        Object.entries(newScores).forEach(([key, val]) => {
          if (val > maxVal) {
            maxVal = val;
            highestAura = key;
          }
        });

        const result = AURA_RESULTS[highestAura] || AURA_RESULTS.violet;
        setFinalAura(result);

        try {
          confetti({
            particleCount: 70,
            spread: 80,
            origin: { y: 0.6 },
            colors: ["#a855f7", "#6366f1", "#fbbf24", "#34d399"],
          });
        } catch (e) {}
      }
    }, 350);
  };

  const handleRestart = () => {
    setCurrentStep(0);
    setScores({
      indigo: 0,
      violet: 0,
      gold: 0,
      emerald: 0,
      rose: 0,
      crystal: 0,
    });
    setFinalAura(null);
    setSelectedOptionIdx(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-purple-500/20 shadow-2xl relative">
      {!finalAura ? (
        <div>
          {/* Header & Step Tracker */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs uppercase tracking-widest text-purple-300 font-mono">
              Question {currentStep + 1} of {AURA_QUESTIONS.length}
            </span>
            <span className="text-xs text-white/50 font-mono">{progressPercent}% Completed</span>
          </div>

          {/* Animated Progress Bar */}
          <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mb-8">
            <div
              className="h-full bg-gradient-to-r from-purple-500 to-amber-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Question Text */}
          <div className="mb-8">
            <h3 className="text-xl md:text-2xl font-serif font-bold text-white tracking-wide leading-snug">
              {currentQ.question}
            </h3>
          </div>

          {/* Options List */}
          <div className="space-y-3.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedOptionIdx === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl glass-panel border transition-all duration-200 flex items-start space-x-3.5 group cursor-pointer ${
                    isSelected
                      ? "border-amber-400 bg-purple-600/20 text-white scale-[1.01]"
                      : "border-white/10 hover:border-purple-400/40 hover:bg-white/5 text-white/80"
                  }`}
                >
                  <div
                    className={`w-6 h-6 rounded-full border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                      isSelected
                        ? "border-amber-400 bg-amber-400 text-cosmic-950 font-bold"
                        : "border-white/20 group-hover:border-purple-400"
                    }`}
                  >
                    {isSelected ? <CheckCircle2 className="w-4 h-4 text-cosmic-950" /> : <span className="text-xs">{idx + 1}</span>}
                  </div>
                  <span className="text-sm font-medium leading-relaxed group-hover:text-white">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Mid-Quiz In-Article Ad for Retention and AdSense Optimization */}
          {currentStep === 3 && (
            <div className="mt-8">
              <AdBanner format="in-article" label="SPONSORED QUIZ BREAK" />
            </div>
          )}
        </div>
      ) : (
        /* Result Screen */
        <div className="animate-in fade-in zoom-in-95 duration-500 space-y-8">
          <div className="text-center max-w-lg mx-auto">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Aura Analysis Complete</span>
            </div>
            <h2 className="text-3xl font-serif font-black text-white">Your Dominant Aura Color</h2>
          </div>

          {/* The Glowing Aura Card */}
          <div className="glass-panel rounded-3xl p-6 md:p-8 border-2 border-white/20 relative overflow-hidden text-center shadow-2xl">
            {/* Ambient Aura Background */}
            <div
              className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
              style={{ backgroundColor: finalAura.hex }}
            />

            <div className="relative z-10 flex flex-col items-center">
              {/* Glowing Aura Orb */}
              <div
                className="w-24 h-24 rounded-full shadow-[0_0_50px_rgba(255,255,255,0.4)] flex items-center justify-center mb-4 transition-transform animate-pulse-slow"
                style={{
                  background: `radial-gradient(circle at 35% 35%, #ffffff 0%, ${finalAura.hex} 70%)`,
                }}
              >
                <Sparkles className="w-10 h-10 text-white" />
              </div>

              <span className="text-xs uppercase tracking-widest font-mono text-white/60 mb-1">
                {finalAura.sacredChakra}
              </span>
              <h3 className="text-3xl font-serif font-black text-white tracking-wide">
                {finalAura.name}
              </h3>
              <p className="text-sm font-medium text-amber-300 mt-1">{finalAura.tagline}</p>

              <p className="text-sm text-white/80 leading-relaxed max-w-xl mt-4 font-light text-left">
                {finalAura.description}
              </p>

              {/* Superpowers & Shadow Side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mt-6 text-left">
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs font-semibold text-emerald-300 uppercase tracking-wider block mb-2">
                    ✦ Aura Superpowers
                  </span>
                  <ul className="space-y-1 text-xs text-white/70">
                    {finalAura.superpowers.map((sp, i) => (
                      <li key={i} className="flex items-center space-x-1.5">
                        <span className="text-amber-400">•</span>
                        <span>{sp}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <span className="text-xs font-semibold text-purple-300 uppercase tracking-wider block mb-2">
                    ✦ Sacred Alignment
                  </span>
                  <div className="text-xs text-white/70 space-y-2">
                    <p>
                      <strong className="text-white/90">Power Crystal:</strong>{" "}
                      {finalAura.companionCrystal}
                    </p>
                    <p>
                      <strong className="text-white/90">Shadow Vulnerability:</strong>{" "}
                      {finalAura.shadowSide}
                    </p>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handleRestart}
                  className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/10"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Retake Aura Quiz</span>
                </button>
              </div>
            </div>
          </div>

          <AdBanner format="in-article" label="AURA CALIBRATION & HEALING ACCESSORIES" />
        </div>
      )}
    </div>
  );
}

