"use client";

import React, { useState } from "react";
import { MOOD_STATES, MoodState } from "@/lib/moods-data";
import { Sparkles, Heart, Wind, Shield, RefreshCw } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export function MoodAffirmationHub() {
  const [selectedMood, setSelectedMood] = useState<MoodState>(MOOD_STATES[0]);
  const [isBreathing, setIsBreathing] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-purple-500/20 shadow-2xl relative">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-medium mb-3">
          <Heart className="w-3.5 h-3.5 fill-rose-400" />
          <span>Somatic & Emotional Calibration</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
          How is Your Spirit Feeling Today?
        </h2>
        <p className="text-sm text-white/60 mt-2">
          Select your current emotional frequency to receive your bespoke daily affirmation, soothing breath guidance, and ground your nervous system.
        </p>
      </div>

      {/* Mood Selector Pills (Watermelon UI segmented control feel) */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto mb-8">
        {MOOD_STATES.map((mood) => {
          const isSelected = selectedMood.id === mood.id;
          return (
            <button
              key={mood.id}
              type="button"
              onClick={() => setSelectedMood(mood)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full text-xs font-medium transition-all duration-200 cursor-pointer ${
                isSelected
                  ? "bg-purple-600 text-white shadow-lg shadow-purple-600/30 scale-105 border border-purple-400/50"
                  : "glass-panel text-white/70 hover:text-white hover:bg-white/10 border border-white/5"
              }`}
            >
              <span>{mood.emoji}</span>
              <span>{mood.name}</span>
            </button>
          );
        })}
      </div>

      {/* Affirmation Card */}
      <div className="max-w-2xl mx-auto animate-in fade-in duration-300">
        <div
          className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/20 relative overflow-hidden shadow-2xl"
          style={{
            boxShadow: `0 20px 40px -15px ${selectedMood.glow}`,
          }}
        >
          {/* Subtle Ambient Color Wash */}
          <div
            className="absolute inset-0 opacity-15 blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(circle at center, ${selectedMood.glow} 0%, transparent 80%)`,
            }}
          />

          <div className="relative z-10 flex flex-col items-center text-center space-y-4">
            <span className="text-3xl sm:text-4xl">{selectedMood.emoji}</span>

            <span className="text-xs uppercase tracking-widest font-mono text-purple-300">
              Sacred Frequency: {selectedMood.mantra}
            </span>

            {/* Sacred Affirmation Quote */}
            <blockquote className="text-lg sm:text-xl font-serif font-semibold text-white leading-relaxed max-w-lg">
              &ldquo;{selectedMood.affirmation}&rdquo;
            </blockquote>

            {/* Breathing Circle Widget */}
            <div className="pt-4 pb-2 flex flex-col items-center">
              <button
                type="button"
                onClick={() => setIsBreathing(!isBreathing)}
                className={`relative w-20 h-20 rounded-full border-2 flex items-center justify-center transition-all duration-1000 ${
                  isBreathing
                    ? "border-amber-400 scale-125 bg-amber-400/10 shadow-[0_0_30px_rgba(251,191,36,0.3)] animate-pulse-slow"
                    : "border-purple-400/40 bg-purple-950/30 hover:border-purple-400"
                }`}
              >
                <Wind className={`w-7 h-7 text-amber-300 ${isBreathing ? "animate-spin-slow" : ""}`} />
              </button>
              <span className="text-xs text-white/50 mt-2 font-mono">
                {isBreathing ? "Breathe gently with the pulsation..." : `Click to Start: ${selectedMood.breathPacing}`}
              </span>
            </div>

            {/* Daily Ritual Box */}
            <div className="w-full text-left p-4 rounded-2xl bg-white/[0.03] border border-white/10 mt-4">
              <span className="text-xs font-semibold text-amber-300 uppercase tracking-wider block mb-1">
                ✦ 2-Minute Grounding Ritual:
              </span>
              <p className="text-xs text-white/70 leading-relaxed">
                {selectedMood.ritual}
              </p>
            </div>
          </div>
        </div>

        <AdBanner format="in-article" label="SPONSORED MINDFULNESS SANCTUARY" />
      </div>
    </div>
  );
}

