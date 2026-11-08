import React from "react";
import Link from "next/link";
import { Sparkles, Heart, Shield, BookOpen, Compass, Mail, Moon } from "lucide-react";
import { ARTICLES } from "@/lib/articles";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 bg-cosmic-950/80 backdrop-blur-xl relative z-10 text-white/70">
      <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-purple-600 to-amber-400 p-[1px] flex items-center justify-center">
                <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center">
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                </div>
              </div>
              <span className="font-serif text-xl font-bold tracking-wider text-white">
                Horoscopes<span className="gold-gradient-text font-serif"> &amp; Charts</span>
              </span>
            </Link>
            <p className="text-sm text-white/60 leading-relaxed max-w-sm">
              Your premier sanctuary for esoteric clarity, Jungian dream symbology, angel numerology, and celestial synastry. Grounded in timeless archetypes and modern mindfulness.
            </p>
            <div className="flex items-center space-x-3 text-xs text-white/40 pt-2">
              <span className="flex items-center">
                <Shield className="w-3.5 h-3.5 text-emerald-400 mr-1" />
                SSL Encrypted
              </span>
              <span>•</span>
              <span>Free to use • No account required</span>
            </div>
          </div>

          {/* Column 1: Kütüphane & SEO */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white mb-4 uppercase">
              Sanctuary Guides
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/dreams" className="hover:text-amber-300 transition-colors">
                  Dream Dictionary
                </Link>
              </li>
              <li>
                <Link href="/symbols" className="hover:text-amber-300 transition-colors">
                  Angel Numbers & Codes
                </Link>
              </li>
              {ARTICLES.length > 0 && (
                <li>
                  <Link href="/blog" className="hover:text-amber-300 transition-colors">
                    Guides &amp; Explainers
                  </Link>
                </li>
              )}
              <li>
                <Link href="/zodiac-signs" className="hover:text-amber-300 transition-colors">
                  Zodiac Signs &amp; Dates
                </Link>
              </li>
              <li>
                <Link href="/chinese-zodiac" className="hover:text-amber-300 transition-colors">
                  Chinese Zodiac Calculator
                </Link>
              </li>
              <li>
                <Link href="/horoscopes" className="hover:text-amber-300 transition-colors">
                  Daily Zodiac Horoscopes
                </Link>
              </li>
              <li>
                <Link href="/compatibility" className="hover:text-amber-300 transition-colors">
                  Zodiac Compatibility Matrix
                </Link>
              </li>
              <li>
                <Link href="/daily" className="hover:text-amber-300 transition-colors">
                  Daily Mood Affirmations
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Interactive Tools */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white mb-4 uppercase">
              Interactive Tools
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/tools/moon-phase" className="hover:text-amber-300 transition-colors">
                  Moon Phase Soulmate Matcher
                </Link>
              </li>
              <li>
                <Link href="/tools/tarot" className="hover:text-amber-300 transition-colors">
                  Single Card Tarot Draw
                </Link>
              </li>
              <li>
                <Link href="/tools/aura-quiz" className="hover:text-amber-300 transition-colors">
                  7-Step Aura Color Quiz
                </Link>
              </li>
              <li>
                <Link href="/tools/birth-chart" className="hover:text-amber-300 transition-colors">
                  Free Birth Chart Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/life-path-number" className="hover:text-amber-300 transition-colors">
                  Life Path Number Calculator
                </Link>
              </li>
              <li>
                <Link href="/tools/rising-moon" className="hover:text-amber-300 transition-colors">
                  Rising & Moon Sign Calculator
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Compliance */}
          <div>
            <h4 className="font-serif text-sm font-semibold tracking-wider text-white mb-4 uppercase">
              Trust & Transparency
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/about" className="hover:text-amber-300 transition-colors">
                  About Horoscopes and Charts
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-amber-300 transition-colors">
                  Contact & Support
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-amber-300 transition-colors">
                  Privacy Policy (GDPR / CCPA)
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-amber-300 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/editorial-standards" className="hover:text-amber-300 transition-colors">
                  Editorial Standards
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Disclaimer Notice (crucial for AdSense approval in esoteric/horoscope niche) */}
        <div className="mt-12 pt-8 border-t border-white/10 text-xs text-white/40 space-y-3">
          <p className="leading-relaxed">
            <strong className="text-white/60">Contemplative & Spiritual Disclaimer:</strong> Horoscopes and Charts offers dream interpretations, astrological calculations, tarot reflections, and numerological insights for self-reflection, mindfulness, and entertainment purposes. Our content does not constitute medical, legal, or licensed financial advice.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/30 pt-4">
            <p>© {new Date().getFullYear()} Horoscopes and Charts. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center">
              Crafted with <Heart className="w-3 h-3 text-rose-500 mx-1 fill-rose-500" /> for curious souls worldwide.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

