import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Moon, Sparkles, Flame, Droplets, Wind, Mountain, ArrowRight } from "lucide-react";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { AdBanner } from "@/components/ui/AdBanner";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Horoscope Today: All 12 Zodiac Signs, Traits & Dates | AuraPulse",
  description:
    "Horoscope today for every zodiac sign: Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius and Pisces, with personality, dates, compatibility and today's Moon transit.",
};

export const revalidate = 3600; // refresh the displayed date hourly

export default function HoroscopesHubPage() {
  const todayFormatted = formatDate();

  return (
    <div className="space-y-12 py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium">
          <Moon className="w-3.5 h-3.5 text-amber-300" />
          <span>Planetary Transits • {todayFormatted}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Daily Zodiac Horoscopes
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Navigate your day with cosmic wisdom. Select your sun sign below to receive targeted insights for romance, vocational success, and mental vitality.
        </p>
        <p className="text-sm">
          <Link href="/horoscopes/weekly" className="text-amber-300 underline mr-4">
            Weekly horoscope
          </Link>
          <Link href="/horoscopes/monthly" className="text-amber-300 underline">
            Monthly horoscope
          </Link>
        </p>
      </div>

      <AdBanner format="horizontal" label="SPONSORED ASTROLOGY FORECAST" />

      {/* 12 Signs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {ZODIAC_SIGNS.map((sign) => {
          const elementIcons = {
            Fire: Flame,
            Earth: Mountain,
            Air: Wind,
            Water: Droplets,
          };
          const ElementIcon = elementIcons[sign.element];

          return (
            <Link
              key={sign.id}
              href={`/horoscopes/${sign.id}`}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-white/10 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                    {sign.symbol}
                  </span>
                  <div className="flex items-center space-x-1 text-[11px] font-mono text-purple-300 px-2 py-0.5 rounded-full bg-white/5 border border-white/10">
                    <ElementIcon className="w-3 h-3 text-amber-400" />
                    <span>{sign.element}</span>
                  </div>
                </div>

                <div>
                  <h2 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                    {sign.name}
                  </h2>
                  <span className="text-xs text-white/40 font-mono block">{sign.dates}</span>
                </div>

                <p className="text-xs text-white/70 line-clamp-3 leading-relaxed font-light">
                  {sign.overview}
                </p>
              </div>

              <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-300 font-medium">
                <span>Daily Guidance</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      <AdBanner format="in-article" label="PERSONAL NATAL HOROSCOPE APP" />
    </div>
  );
}

