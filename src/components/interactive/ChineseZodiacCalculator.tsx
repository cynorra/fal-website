"use client";

import React, { useState } from "react";
import Link from "next/link";
import { chineseZodiac, chineseNewYear } from "@/lib/chinese-calendar";
import { ANIMAL_BY_NAME } from "@/lib/chinese-zodiac-data";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function ChineseZodiacCalculator() {
  const [date, setDate] = useState("");
  const [error, setError] = useState("");
  const [res, setRes] = useState<{
    animal: string;
    element: string;
    polarity: string;
    zodiacYear: number;
    year: number;
    cny: { month: number; day: number };
  } | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!m) {
      setError("Please enter your full birth date.");
      setRes(null);
      return;
    }
    const [y, mo, d] = [Number(m[1]), Number(m[2]), Number(m[3])];
    if (y < 1900 || y > 2100) {
      setError("Please choose a year between 1900 and 2100.");
      setRes(null);
      return;
    }
    setError("");
    setRes({ ...chineseZodiac(y, mo, d), year: y, cny: chineseNewYear(y) });
  };

  const profile = res ? ANIMAL_BY_NAME[res.animal] : null;

  return (
    <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5">
      <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1">
          <label htmlFor="cz-date" className="text-xs text-white/60 block mb-1">
            Your date of birth
          </label>
          <input
            id="cz-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-purple-400"
          />
        </div>
        <button
          type="submit"
          className="px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium"
        >
          Find my Chinese zodiac
        </button>
      </form>
      {error && <p className="text-xs text-rose-300">{error}</p>}
      {res && profile && (
        <div className="border-t border-white/10 pt-5 space-y-2">
          <p className="text-xs uppercase tracking-widest text-purple-300 font-mono">Your Chinese zodiac</p>
          <p className="text-3xl font-serif font-black text-white">
            {res.element} {res.animal}
          </p>
          <p className="text-sm text-white/70">
            {res.polarity} {res.element} {res.animal} · zodiac year {res.zodiacYear}
          </p>
          <p className="text-xs text-white/50">
            Chinese New Year {res.year} fell on {MONTHS[res.cny.month - 1]} {res.cny.day}. Births before that date belong
            to the previous animal year.
          </p>
          <p className="text-sm text-white/80">{profile.tagline}</p>
          <Link href={`/chinese-zodiac/${profile.slug}`} className="text-sm text-amber-300 underline">
            Read the full {res.animal} guide
          </Link>
        </div>
      )}
    </div>
  );
}
