"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { signByDate } from "@/lib/astro";

export function SignFinder() {
  const [date, setDate] = useState("");
  const [res, setRes] = useState<{ index: number; cusp: boolean } | null>(null);

  const find = (e: React.FormEvent) => {
    e.preventDefault();
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(date);
    if (!m) return setRes(null);
    setRes(signByDate(Number(m[2]), Number(m[3])));
  };

  const sign = res ? ZODIAC_SIGNS[res.index] : null;

  return (
    <div className="glass-panel rounded-3xl p-6 border border-white/10 space-y-4">
      <form onSubmit={find} className="flex flex-col sm:flex-row gap-3 sm:items-end">
        <div className="flex-1">
          <label htmlFor="sf-date" className="text-xs text-white/60 block mb-1">
            Your birthday
          </label>
          <input
            id="sf-date"
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
          Find my zodiac sign
        </button>
      </form>
      {sign && (
        <div className="border-t border-white/10 pt-4 space-y-2">
          <p className="text-2xl font-serif font-bold text-white">
            <span className="text-amber-300 mr-2">{sign.symbol}</span>
            {sign.name} <span className="text-sm font-normal text-white/60">({sign.dates})</span>
          </p>
          {res?.cusp && (
            <p className="text-xs text-amber-200">
              You were born within a day of a sign boundary. The exact change depends on the year and your birth time,
              so check an ephemeris or natal chart to be certain.
            </p>
          )}
          <Link href={`/horoscopes/${sign.id}`} className="text-sm text-amber-300 underline">
            Read the full {sign.name} guide
          </Link>
        </div>
      )}
    </div>
  );
}
