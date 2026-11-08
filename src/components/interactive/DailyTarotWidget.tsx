"use client";

import React, { useState } from "react";
import { TAROT_DECK, TarotCard } from "@/lib/tarot-data";
import { Sparkles, RotateCcw, Heart, Shield, Award } from "lucide-react";
import confetti from "canvas-confetti";
import { AdBanner } from "@/components/ui/AdBanner";

export function DailyTarotWidget() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [revealedCard, setRevealedCard] = useState<TarotCard | null>(null);
  const [isFlipping, setIsFlipping] = useState(false);

  // Initialized deterministically for 100% hydration safety; randomized on mount
  const [cardChoices, setCardChoices] = useState<TarotCard[]>(() => TAROT_DECK.slice(0, 3));

  React.useEffect(() => {
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    setCardChoices(shuffled.slice(0, 3));
  }, []);

  const handlePickCard = (index: number) => {
    if (selectedIdx !== null || isFlipping) return;

    setSelectedIdx(index);
    setIsFlipping(true);

    setTimeout(() => {
      const card = cardChoices[index];
      setRevealedCard(card);
      setIsFlipping(false);

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#fbbf24", "#a855f7", "#6366f1"],
        });
      } catch (e) {
        // Safe fallback
      }
    }, 700);
  };

  const handleReset = () => {
    setSelectedIdx(null);
    setRevealedCard(null);
    const shuffled = [...TAROT_DECK].sort(() => 0.5 - Math.random());
    setCardChoices(shuffled.slice(0, 3));
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-purple-500/20 shadow-2xl relative overflow-hidden">
      {/* Background ambient aura */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="text-center max-w-xl mx-auto mb-8 relative z-10">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
          <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
          <span>Interactive Daily Oracle</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
          Draw Your Daily Tarot Card
        </h2>
        <p className="text-sm text-white/60 mt-2">
          Center your breathing, hold your inquiry in your heart, and select the card that magnetically calls to you.
        </p>
      </div>

      {/* The 3 Cards Selection Spread */}
      {!revealedCard ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 my-8 max-w-2xl mx-auto perspective-1000">
          {[0, 1, 2].map((idx) => {
            const isChosen = selectedIdx === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => handlePickCard(idx)}
                disabled={selectedIdx !== null}
                className={`group relative h-72 sm:h-80 w-full rounded-2xl p-1 transition-all duration-500 text-left cursor-pointer transform-style-3d ${
                  isChosen
                    ? "scale-105 ring-2 ring-amber-400"
                    : selectedIdx !== null
                    ? "opacity-40 scale-95"
                    : "hover:-translate-y-3 hover:shadow-2xl hover:shadow-purple-600/30"
                }`}
              >
                {/* Card Back Face */}
                <div className="w-full h-full rounded-2xl bg-gradient-to-br from-cosmic-800 via-cosmic-900 to-cosmic-950 border border-purple-500/30 p-4 flex flex-col items-center justify-between shadow-xl relative overflow-hidden group-hover:border-amber-400/50 transition-colors">
                  {/* Ornate Tarot Card Back Design */}
                  <div className="w-full h-full border border-purple-400/20 rounded-xl p-3 flex flex-col items-center justify-between relative bg-white/[0.02]">
                    <div className="flex justify-between w-full text-amber-300/60 text-xs">
                      <span>✦</span>
                      <span>✦</span>
                    </div>

                    <div className="relative flex flex-col items-center justify-center">
                      <div className="w-16 h-16 rounded-full border border-amber-400/30 flex items-center justify-center bg-purple-950/40 group-hover:scale-110 transition-transform">
                        <span className="text-2xl text-amber-300">☽ ◯ ☾</span>
                      </div>
                      <span className="text-[10px] uppercase tracking-widest text-white/40 mt-3 font-mono">
                        Card #{idx + 1}
                      </span>
                    </div>

                    <div className="flex justify-between w-full text-amber-300/60 text-xs">
                      <span>✦</span>
                      <span>✦</span>
                    </div>
                  </div>

                  {/* Shimmer line on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent -translate-y-full group-hover:translate-y-full transition-transform duration-1000" />
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        /* Revealed Card Layout */
        <div className="my-6 max-w-2xl mx-auto animate-in fade-in zoom-in-95 duration-500">
          <div className="glass-panel rounded-3xl border border-amber-500/30 p-6 md:p-8 bg-gradient-to-b from-cosmic-900/90 to-cosmic-950/90 shadow-2xl relative">
            <div className="flex flex-col md:flex-row items-center gap-6">
              {/* Card Visual Plate */}
              <div className="w-48 h-72 rounded-2xl bg-gradient-to-br from-purple-900/60 via-cosmic-900 to-indigo-950 border-2 border-amber-400/60 p-4 flex flex-col items-center justify-between text-center shadow-xl flex-shrink-0 relative overflow-hidden">
                <div className="flex justify-between w-full text-amber-400 text-xs font-serif font-bold">
                  <span>{revealedCard.roman}</span>
                  <span>{revealedCard.roman}</span>
                </div>

                <div className="my-auto flex flex-col items-center">
                  <div className="w-20 h-20 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-4xl mb-3 text-amber-300 animate-pulse-slow">
                    {revealedCard.symbolGlyph}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-white tracking-wide">
                    {revealedCard.name}
                  </h3>
                  <span className="text-[10px] uppercase tracking-widest text-amber-300/80 font-mono mt-1">
                    {revealedCard.arcana} Arcana
                  </span>
                </div>

                <div className="text-[11px] text-white/40 font-mono">
                  {revealedCard.element}
                </div>
              </div>

              {/* Card Interpretation Details */}
              <div className="flex-1 space-y-4 text-left">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 uppercase tracking-wide">
                      Upright Guidance
                    </span>
                    <span className="text-xs text-white/40">• Today&apos;s Transmission</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-white mt-1">
                    {revealedCard.name}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {revealedCard.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-[11px] text-purple-200"
                      >
                        {kw}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="text-sm text-white/80 leading-relaxed font-light">
                  {revealedCard.uprightMeaning}
                </p>

                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/20 text-xs text-purple-200">
                  <strong className="text-amber-300 font-semibold block mb-1">
                    Cosmic Action Advice:
                  </strong>
                  {revealedCard.guidance}
                </div>

                <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5 text-xs text-white/70 italic">
                  &ldquo;{revealedCard.affirmation}&rdquo;
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-xs text-white/40">
                Tarot transmissions refresh with your daily intention.
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/15 text-white text-xs font-medium transition-colors border border-white/10"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Draw Another Card</span>
              </button>
            </div>
          </div>

          {/* AdSense In-Flow Banner after user interacts */}
          <AdBanner format="in-article" label="RECOMMENDED CELESTIAL PRODUCTS" />
        </div>
      )}
    </div>
  );
}

