"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sparkles, Moon, Compass, BookOpen, Heart, Menu, X, Layers } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Dreams", href: "/dreams", icon: BookOpen },
    { name: "Symbols & Angels", href: "/symbols", icon: Sparkles },
    { name: "Horoscopes", href: "/horoscopes", icon: Moon },
    { name: "Compatibility", href: "/compatibility", icon: Heart },
    { name: "Tools & Quizzes", href: "/tools", icon: Compass },
    { name: "Daily Mood", href: "/daily", icon: Layers },
  ];

  return (
    <header className="sticky top-4 z-50 px-4 max-w-7xl mx-auto w-full">
      <nav className="glass-panel rounded-full px-5 py-3 border border-white/10 shadow-2xl shadow-purple-950/20 flex items-center justify-between transition-all duration-300">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-600 via-indigo-600 to-amber-400 p-[1px] flex items-center justify-center transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-cosmic-950 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-amber-300 group-hover:rotate-12 transition-transform duration-300" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg font-bold tracking-wider text-white">
              Horoscopes<span className="gold-gradient-text font-serif"> &amp; Charts</span>
            </span>
            <span className="text-[9px] uppercase tracking-widest text-purple-300/60 -mt-1 font-mono">
              Cosmic Wisdom
            </span>
          </div>
        </Link>

        {/* Desktop Links (Watermelon UI / Linear style tabs) */}
        <div className="hidden md:flex items-center space-x-1 bg-white/[0.03] p-1 rounded-full border border-white/5">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center space-x-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-purple-600/30 text-white border border-purple-500/40 shadow-sm shadow-purple-500/20"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? "text-amber-400" : "text-purple-400/80"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* CTA Button */}
        <div className="hidden lg:flex items-center space-x-3">
          <Link
            href="/tools/tarot"
            className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-xs font-medium rounded-full group bg-gradient-to-r from-amber-400 via-purple-500 to-indigo-600 shadow-lg shadow-purple-900/30 hover:shadow-purple-700/50 transition-all duration-300"
          >
            <span className="px-4 py-1.5 transition-all ease-in duration-200 bg-cosmic-950 rounded-full group-hover:bg-transparent flex items-center space-x-1.5 text-white font-medium">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin-slow" />
              <span>Daily Tarot</span>
            </span>
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Toggle Navigation"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden mt-2 p-4 glass-panel rounded-2xl border border-white/10 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200 flex flex-col space-y-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center space-x-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-purple-600/30 text-white border border-purple-500/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? "text-amber-400" : "text-purple-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
          <div className="pt-2 border-t border-white/10">
            <Link
              href="/tools/tarot"
              onClick={() => setIsOpen(false)}
              className="flex items-center justify-center space-x-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-medium text-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>Draw Daily Tarot</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

