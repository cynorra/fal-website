import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { Moon, Sparkles, Compass, Heart, ArrowRight, ShieldCheck, Flame, Layers } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Interactive Esoteric Tools & Quizzes | Horoscopes and Charts",
  description:
    "Test your celestial resonance with our Moon Phase Soulmate Matcher, Daily Tarot Draw, 7-Step Aura Color Quiz, and Rising Sign Calculator.",
};

export default function ToolsHubPage() {
  const tools = [
    {
      title: "Moon Phase Soulmate Matcher",
      desc: "Place your birth moons side by side. Uses astronomical synodic algorithms to reveal your emotional resonance.",
      href: "/tools/moon-phase",
      icon: Moon,
      tag: "Viral Synastry Tool",
      color: "from-blue-600/20 to-indigo-950/30",
    },
    {
      title: "Single Card Daily Tarot Draw",
      desc: "Interactive 3D-feel card selection spread. Draw a sacred Major Arcana card to receive clarity for today.",
      href: "/tools/tarot",
      icon: Sparkles,
      tag: "Daily Oracle",
      color: "from-amber-600/20 to-purple-950/30",
    },
    {
      title: "7-Step Aura Color Quiz",
      desc: "Discover whether your electromagnetic field vibrates in Indigo, Violet, Radiant Gold, or Emerald Green.",
      href: "/tools/aura-quiz",
      icon: Compass,
      tag: "Energy Blueprint",
      color: "from-teal-600/20 to-emerald-950/30",
    },
    {
      title: "Rising & Moon Sign Calculator",
      desc: "Enter birth date, time, and birthplace to uncover your Big Three natal trinity.",
      href: "/tools/rising-moon",
      icon: Compass,
      tag: "Astrology Engine",
      color: "from-purple-600/20 to-rose-950/30",
    },
    {
      title: "Free Birth Chart Calculator",
      desc: "Natal chart with Sun, Moon, Rising sign, all planets, houses and a chart wheel.",
      href: "/tools/birth-chart",
      icon: Sparkles,
      tag: "Natal Chart",
      color: "from-indigo-600/20 to-purple-950/30",
    },
    {
      title: "Chinese Zodiac Calculator",
      desc: "Find your Chinese zodiac animal and element with correct Chinese New Year dates.",
      href: "/chinese-zodiac",
      icon: Compass,
      tag: "Eastern Astrology",
      color: "from-rose-600/20 to-amber-950/30",
    },
    {
      title: "Life Path Number Calculator",
      desc: "Find your numerology Life Path Number step by step, including master numbers 11, 22 and 33.",
      href: "/tools/life-path-number",
      icon: Compass,
      tag: "Numerology",
      color: "from-amber-600/20 to-indigo-950/30",
    },
    {
      title: "Mood & Daily Affirmation Hub",
      desc: "Somatic breathwork and bespoke affirmations tailored to your present emotional frequency.",
      href: "/daily",
      icon: Layers,
      tag: "Mindfulness Ritual",
      color: "from-rose-600/20 to-pink-950/30",
    },
    {
      title: "Zodiac Compatibility Matrix",
      desc: "144 astrological sign combinations with love, chemistry, and communication metrics.",
      href: "/compatibility",
      icon: Heart,
      tag: "12x12 Matrix",
      color: "from-purple-600/20 to-indigo-950/30",
    },
  ];

  return (
    <div className="space-y-12 py-6">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-medium">
          <Compass className="w-3.5 h-3.5 text-amber-300" />
          <span>The Interactive Laboratory</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          Esoteric Calculators & Spiritual Quizzes
        </h1>
        <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto font-light leading-relaxed">
          Zero delay, zero subscription gates. Instant client-side calculators designed for intuitive self-discovery and celestial alignment.
        </p>
      </div>

      <AdBanner format="horizontal" label="INTERACTIVE PORTAL SPONSOR" />

      {/* Grid of Tools */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((t) => {
          const Icon = t.icon;
          return (
            <Link
              key={t.href}
              href={t.href}
              className="glass-panel glass-panel-hover rounded-3xl p-6 md:p-8 border border-white/10 group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-300 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-mono text-purple-300 px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10">
                    {t.tag}
                  </span>
                </div>

                <h2 className="text-xl font-serif font-bold text-white group-hover:text-amber-300 transition-colors">
                  {t.title}
                </h2>
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {t.desc}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs text-amber-300 font-medium">
                <span>Launch Interactive Tool</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          );
        })}
      </div>

      <AdBanner format="in-article" label="SANCTUARY SPONSOR" />
    </div>
  );
}

