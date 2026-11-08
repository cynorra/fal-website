"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Calculator, ArrowRight } from "lucide-react";
import { calculateLifePath, LIFE_PATH_BY_NUMBER } from "@/lib/life-path-data";

export function LifePathCalculator() {
  const [date, setDate] = useState("");
  const [result, setResult] = useState<{ number: number; steps: string[] } | null>(null);
  const [error, setError] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!m) {
      setError("Please enter your full birth date.");
      setResult(null);
      return;
    }
    const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (y < 1900 || y > new Date().getFullYear()) {
      setError("Please enter a birth year between 1900 and today.");
      setResult(null);
      return;
    }
    setError("");
    setResult(calculateLifePath(y, mo, d));
  };

  const entry = result ? LIFE_PATH_BY_NUMBER[result.number] : null;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-6">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1">
          <label htmlFor="lp-date" className="text-xs text-white/60 block mb-1">
            Your date of birth
          </label>
          <input
            id="lp-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium flex items-center justify-center space-x-2"
        >
          <Calculator className="w-4 h-4" />
          <span>Calculate</span>
        </button>
      </form>
      {error && <p className="text-xs text-rose-300">{error}</p>}

      {result && entry && (
        <div className="space-y-4 border-t border-white/10 pt-6">
          <p className="text-xs uppercase tracking-widest text-purple-300 font-mono">Your Life Path Number</p>
          <div className="flex items-baseline gap-4">
            <span className="text-6xl font-serif font-black gold-gradient-text">{result.number}</span>
            <div>
              <p className="text-lg font-serif font-bold text-white">{entry.archetype}</p>
              <p className="text-sm text-white/60">{entry.tagline}</p>
            </div>
          </div>
          <ul className="text-xs text-white/60 font-mono space-y-1">
            {result.steps.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
          <Link
            href={`/life-path/${entry.slug}`}
            className="inline-flex items-center space-x-2 text-sm text-amber-300 hover:text-white"
          >
            <span>Read the full Life Path {result.number} guide</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
