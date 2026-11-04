import React from "react";
import Link from "next/link";
import { Sparkles, Moon, BookOpen, Compass, Heart, ArrowRight, Layers, ShieldCheck, Flame, Star } from "lucide-react";
import { GlobalSearchBar } from "@/components/interactive/GlobalSearchBar";
import { DailyTarotWidget } from "@/components/interactive/DailyTarotWidget";
import { MoonPhaseMatcher } from "@/components/interactive/MoonPhaseMatcher";
import { MoodAffirmationHub } from "@/components/interactive/MoodAffirmationHub";
import { AdBanner } from "@/components/ui/AdBanner";
import { DREAM_ENTRIES } from "@/lib/dreams-data";
import { SYMBOL_ENTRIES } from "@/lib/symbols-data";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";

export default function HomePage() {
  const featuredDreams = DREAM_ENTRIES.slice(0, 4);
  const featuredSymbols = SYMBOL_ENTRIES.slice(0, 4);

  return (
    <div className="space-y-24 py-6 md:py-12">
      {/* HERO SECTION (Magic UI / Aceternity UI style) */}
      <section className="relative text-center max-w-4xl mx-auto pt-6 pb-12 flex flex-col items-center">
        {/* Glowing Pill Badge */}
        <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500/10 via-indigo-500/10 to-amber-500/10 border border-purple-500/30 text-purple-200 text-xs font-medium mb-6 shadow-lg shadow-purple-950/40">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-spin-slow" />
          <span className="tracking-wide">THE MODERN SANCTUARY FOR INTUITIVE SOULS</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-black tracking-tight text-white leading-[1.1] mb-6">
          Decode Your Dreams. <br />
          <span className="gold-gradient-text font-serif">Align With the Cosmos.</span>
        </h1>

        <p className="text-base sm:text-lg text-white/70 max-w-2xl font-light leading-relaxed mb-8">
          Bridge ancient esoteric wisdom with Jungian subconscious psychology. Access verified dream symbols, celestial synastry, angel numerology, and daily tarot reflections.
        </p>

        {/* Global Instant Search */}
        <div className="w-full mb-8">
          <GlobalSearchBar />
        </div>

        {/* Quick Shortcut Pills (High-Volume SEO Keywords) */}
        <div className="flex flex-wrap items-center justify-center gap-2 text-xs">
          <span className="text-white/40 mr-1 font-mono">Trending Searches:</span>
          <Link
            href="/dreams/snakes-in-dreams"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-amber-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>🐍 Snake Dream Meaning</span>
          </Link>
          <Link
            href="/dreams/pregnancy-dream-meaning"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-purple-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>🤰 Pregnancy in Dreams</span>
          </Link>
          <Link
            href="/dreams/dream-about-your-ex"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-rose-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>💔 Dreaming of an Ex</span>
          </Link>
          <Link
            href="/symbols/angel-number-444"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-emerald-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>🛡️ 444 Angel Number</span>
          </Link>
          <Link
            href="/symbols/angel-number-888"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-amber-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>💰 888 Wealth & Money</span>
          </Link>
          <Link
            href="/symbols/angel-number-555"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-blue-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>⚡ 555 Transformation</span>
          </Link>
          <Link
            href="/tools/moon-phase"
            className="px-3 py-1 rounded-full glass-panel border border-white/10 hover:border-indigo-400/40 text-white/80 hover:text-white transition-colors flex items-center space-x-1"
          >
            <span>🌙 Moon Phase Soulmate</span>
          </Link>
        </div>
      </section>

      {/* TOP LEADERBOARD AD BANNER */}
      <AdBanner format="horizontal" label="SPONSORED SANCTUARY GUIDANCE" />

      {/* BENTO GRID OF CORE PILLARS (Magic UI / Bento Grid) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
              EXPLORE THE PORTAL
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Esoteric Wisdom at Your Fingertips
            </h2>
          </div>
          <Link
            href="/tools"
            className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-purple-200 transition-colors"
          >
            <span>View All Interactive Tools</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {/* Card 1: Dream Dictionary (Span 2) */}
          <Link
            href="/dreams"
            className="md:col-span-2 glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-colors" />
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-300">
                <BookOpen className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-purple-300/80 font-mono">
                Encyclopedic Archives • 100+ Guides
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                Jungian Dream Dictionary
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Analyze nightly symbols through psychoanalysis and mystical lore. From falling and flying to serpents and water floods.
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-medium text-amber-300">
              <span>Browse Dream Library</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 2: Angel Numbers & Omens */}
          <Link
            href="/symbols"
            className="glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-amber-300/80 font-mono">
                Numerology
              </span>
              <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                Angel Numbers & Omens
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Unpack repetitive number sequences (111, 444, 777), animal messengers, and ear ringing signals.
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-medium text-amber-300">
              <span>Decode Numbers</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 3: Moon Phase Soulmate Matcher */}
          <Link
            href="/tools/moon-phase"
            className="glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-300">
                <Moon className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-blue-300/80 font-mono">
                Interactive Viral Tool
              </span>
              <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                Moon Phase Matcher
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Match birth moon phases side by side with accurate astronomical synastry scoring.
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-medium text-amber-300">
              <span>Check Soulmate Moon</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 4: Daily Zodiac Horoscopes */}
          <Link
            href="/horoscopes"
            className="glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-indigo-300/80 font-mono">
                Daily Forecasts
              </span>
              <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                12 Zodiac Signs
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Fresh celestial forecasts for love, career, luck, and crystals tailored to your planetary ruler.
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-medium text-amber-300">
              <span>Read Your Horoscope</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 5: Zodiac Compatibility Matrix (Span 2) */}
          <Link
            href="/compatibility"
            className="md:col-span-2 glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center text-rose-300">
                <Heart className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-rose-300/80 font-mono">
                144 Sign Pairings
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                Zodiac Compatibility Engine
              </h3>
              <p className="text-xs sm:text-sm text-white/70 leading-relaxed font-light">
                Explore comprehensive love, communication, and chemistry ratings between all 12 astrological signs.
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-medium text-amber-300">
              <span>Calculate Synastry</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* Card 6: 7-Step Aura Quiz */}
          <Link
            href="/tools/aura-quiz"
            className="glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 relative overflow-hidden group flex flex-col justify-between"
          >
            <div className="space-y-3 relative z-10">
              <div className="w-10 h-10 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-xs uppercase tracking-widest text-teal-300/80 font-mono">
                Personality & Energy
              </span>
              <h3 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                Aura Color Quiz
              </h3>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Discover whether your field vibrates in Royal Indigo, Mystic Violet, or Radiant Gold.
              </p>
            </div>
            <div className="mt-6 flex items-center space-x-2 text-xs font-medium text-amber-300">
              <span>Take Aura Quiz</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        </div>
      </section>

      {/* INTERACTIVE COMPONENT 1: DAILY TAROT DRAW */}
      <section className="py-6">
        <DailyTarotWidget />
      </section>

      {/* FEATURED DREAM DICTIONARY ENTRIES (SEO ANCHOR) */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-purple-300">
              ENCYCLOPEDIC REPOSITORIES
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Trending Dream Interpretations
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              In-depth psychological and spiritual decoders compiled by esoteric scholars.
            </p>
          </div>
          <Link
            href="/dreams"
            className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors"
          >
            <span>Explore All Dreams</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredDreams.map((dream) => (
            <Link
              key={dream.slug}
              href={`/dreams/${dream.slug}`}
              className="glass-panel glass-panel-hover rounded-3xl p-6 border border-white/10 group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-medium">
                    {dream.category}
                  </span>
                  <span className="text-[11px] text-white/40 font-mono">Jungian Guide</span>
                </div>
                <h3 className="text-lg font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {dream.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 leading-relaxed">
                  {dream.quickAnswer}
                </p>
              </div>

              <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-purple-300">
                <span className="text-[11px] text-white/40 italic">
                  Echo: {dream.tarotCardEcho}
                </span>
                <span className="font-medium group-hover:translate-x-1 transition-transform inline-flex items-center">
                  Read Analysis &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* MID-CONTENT HIGH-PERFORMANCE AD SLOT */}
      <AdBanner format="in-article" label="SANCTUARY SPONSOR" />

      {/* INTERACTIVE COMPONENT 2: MOON PHASE MATCHER */}
      <section className="py-6">
        <MoonPhaseMatcher />
      </section>

      {/* FEATURED ANGEL NUMBERS */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-amber-300">
              SACRED NUMEROLOGY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mt-1">
              Repetitive Angel Numbers
            </h2>
            <p className="text-xs sm:text-sm text-white/60 mt-1">
              Discover the divine synchronicity when numbers repeat across your clock and reality.
            </p>
          </div>
          <Link
            href="/symbols"
            className="inline-flex items-center space-x-1.5 text-xs text-amber-300 hover:text-amber-200 transition-colors"
          >
            <span>All Angel Numbers</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredSymbols.map((item) => (
            <Link
              key={item.slug}
              href={`/symbols/${item.slug}`}
              className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 group flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-purple-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center font-serif font-bold text-lg text-amber-300 group-hover:scale-105 transition-transform">
                  {item.code}
                </div>
                <h3 className="font-serif font-semibold text-sm text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                  {item.title}
                </h3>
                <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                  {item.tagline}
                </p>
              </div>

              <span className="text-[11px] text-amber-400 font-medium mt-4 block group-hover:translate-x-1 transition-transform">
                Read Meaning &rarr;
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* INTERACTIVE COMPONENT 3: DAILY MOOD & AFFIRMATION */}
      <section className="py-6">
        <MoodAffirmationHub />
      </section>

      {/* EDITORIAL TRUST & COMPLIANCE BANNER (Crucial for AdSense) */}
      <section className="glass-panel rounded-3xl p-8 border border-white/10 bg-gradient-to-r from-cosmic-900 via-cosmic-950 to-cosmic-900 text-center max-w-4xl mx-auto space-y-4">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mx-auto text-emerald-400">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-serif font-bold text-white">
          Our Editorial Integrity & Research Standards
        </h3>
        <p className="text-xs sm:text-sm text-white/70 max-w-2xl mx-auto leading-relaxed font-light">
          Every dream analysis, numerological frequency, and astrological synastry chart on AuraPulse is thoroughly researched, citing classical Carl Jung psychology, archetypal mythology, and astronomical ephemeris standards. We reject generic auto-generated spam in favor of deep, contemplative literature.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-4 text-xs text-amber-300">
          <Link href="/about" className="hover:underline">
            About Our Mission &rarr;
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/editorial-standards" className="hover:underline">
            Editorial Guidelines &rarr;
          </Link>
          <span className="text-white/20">•</span>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy & Cookies &rarr;
          </Link>
        </div>
      </section>
    </div>
  );
}

