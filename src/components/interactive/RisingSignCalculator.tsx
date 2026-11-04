"use client";

import React, { useState } from "react";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { Sparkles, Sun, Moon, Compass, MapPin, Clock, ArrowRight } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import confetti from "canvas-confetti";

export function RisingSignCalculator() {
  const [birthDate, setBirthDate] = useState("1997-08-15");
  const [birthTime, setBirthTime] = useState("07:30");
  const [birthPlace, setBirthPlace] = useState("New York, USA");
  const [result, setResult] = useState<any | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();

    const d = new Date(birthDate);
    const [hours, mins] = birthTime.split(":").map(Number);
    const dayOfYear = Math.floor((d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));

    // Calculate approximate Sun Sign
    const month = d.getMonth() + 1;
    const day = d.getDate();
    let sunIndex = 0;
    if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunIndex = 0; // Aries
    else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunIndex = 1; // Taurus
    else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunIndex = 2; // Gemini
    else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunIndex = 3; // Cancer
    else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunIndex = 4; // Leo
    else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunIndex = 5; // Virgo
    else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunIndex = 6; // Libra
    else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunIndex = 7; // Scorpio
    else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunIndex = 8; // Sagittarius
    else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunIndex = 9; // Capricorn
    else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunIndex = 10; // Aquarius
    else sunIndex = 11; // Pisces

    // Rising sign shifts roughly every 2 hours from sunrise (~6 AM = Sun Sign)
    const hoursFromSunrise = (hours - 6 + 24) % 24;
    const risingShift = Math.floor(hoursFromSunrise / 2);
    const risingIndex = (sunIndex + risingShift) % 12;

    // Moon sign shifts every ~2.3 days (~13.2 degrees/day)
    const moonShift = Math.floor((dayOfYear * 13.2) / 30) % 12;
    const moonIndex = (sunIndex + moonShift + 3) % 12;

    const sunSign = ZODIAC_SIGNS[sunIndex];
    const risingSign = ZODIAC_SIGNS[risingIndex];
    const moonSign = ZODIAC_SIGNS[moonIndex];

    setResult({
      sunSign,
      risingSign,
      moonSign,
      birthPlace,
      time: birthTime,
    });

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
        colors: ["#fbbf24", "#38bdf8", "#f43f5e"],
      });
    } catch (e) {}
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-3xl p-6 md:p-10 border border-purple-500/20 shadow-2xl relative">
      <div className="text-center max-w-xl mx-auto mb-8">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium mb-3">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>Natal Chart Trigon</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold text-white tracking-wide">
          Rising & Moon Sign Calculator
        </h2>
        <p className="text-sm text-white/60 mt-2">
          Unlock your &ldquo;Big Three&rdquo; trinity: your Core Ego (Sun), your Emotional Subconscious (Moon), and your Aura Mask (Rising / Ascendant).
        </p>
      </div>

      <form onSubmit={handleCalculate} className="max-w-xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
          <label className="text-[11px] text-white/50 block mb-1">Date of Birth</label>
          <input
            type="date"
            required
            value={birthDate}
            onChange={(e) => setBirthDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
          <label className="text-[11px] text-white/50 block mb-1 flex items-center">
            <Clock className="w-3 h-3 mr-1 text-purple-400" />
            Time of Birth
          </label>
          <input
            type="time"
            required
            value={birthTime}
            onChange={(e) => setBirthTime(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="glass-panel p-3.5 rounded-2xl border border-white/10">
          <label className="text-[11px] text-white/50 block mb-1 flex items-center">
            <MapPin className="w-3 h-3 mr-1 text-amber-400" />
            Birth City
          </label>
          <input
            type="text"
            required
            value={birthPlace}
            onChange={(e) => setBirthPlace(e.target.value)}
            placeholder="City, Country"
            className="w-full bg-white/5 border border-white/10 rounded-xl px-2.5 py-2 text-xs text-white focus:outline-none focus:border-purple-400"
          />
        </div>

        <div className="sm:col-span-3 text-center pt-2">
          <button
            type="submit"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-amber-500 hover:from-purple-500 hover:to-amber-400 text-white font-medium text-xs shadow-lg shadow-purple-950/50 transition-all duration-300 inline-flex items-center space-x-2"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Calculate Big Three Trinity</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </form>

      {/* Result Cards */}
      {result && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Sun Sign */}
            <div className="glass-panel rounded-2xl p-5 border border-amber-400/30 text-center relative overflow-hidden bg-gradient-to-b from-amber-950/20 to-transparent">
              <div className="w-12 h-12 rounded-full bg-amber-400/10 border border-amber-400/30 flex items-center justify-center mx-auto mb-3 text-amber-300">
                <Sun className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-amber-300 font-mono block">
                Sun Sign (Ego & Core)
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {result.sunSign.symbol} {result.sunSign.name}
              </h3>
              <p className="text-xs text-white/60 mt-2 font-light leading-relaxed">
                Your conscious identity, vitality, and life mission in this physical incarnation.
              </p>
            </div>

            {/* Moon Sign */}
            <div className="glass-panel rounded-2xl p-5 border border-blue-400/30 text-center relative overflow-hidden bg-gradient-to-b from-blue-950/20 to-transparent">
              <div className="w-12 h-12 rounded-full bg-blue-400/10 border border-blue-400/30 flex items-center justify-center mx-auto mb-3 text-blue-300">
                <Moon className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-blue-300 font-mono block">
                Moon Sign (Emotions & Instinct)
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {result.moonSign.symbol} {result.moonSign.name}
              </h3>
              <p className="text-xs text-white/60 mt-2 font-light leading-relaxed">
                Your private subconscious landscape, emotional vulnerabilities, and primal safety needs.
              </p>
            </div>

            {/* Rising Sign */}
            <div className="glass-panel rounded-2xl p-5 border border-purple-400/30 text-center relative overflow-hidden bg-gradient-to-b from-purple-950/20 to-transparent">
              <div className="w-12 h-12 rounded-full bg-purple-400/10 border border-purple-400/30 flex items-center justify-center mx-auto mb-3 text-purple-300">
                <Compass className="w-6 h-6" />
              </div>
              <span className="text-[10px] uppercase tracking-widest text-purple-300 font-mono block">
                Rising / Ascendant (Aura & Lens)
              </span>
              <h3 className="text-xl font-serif font-bold text-white mt-1">
                {result.risingSign.symbol} {result.risingSign.name}
              </h3>
              <p className="text-xs text-white/60 mt-2 font-light leading-relaxed">
                The energetic filter through which you meet the world, your aura appearance, and life path.
              </p>
            </div>
          </div>

          <AdBanner format="in-article" label="PERSONALIZED NATAL ASTROLOGY CHART" />
        </div>
      )}
    </div>
  );
}

