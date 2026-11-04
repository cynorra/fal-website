"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Sparkles, BookOpen, Moon, ArrowRight, X } from "lucide-react";
import { DREAM_ENTRIES } from "@/lib/dreams-data";
import { SYMBOL_ENTRIES } from "@/lib/symbols-data";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";

export function GlobalSearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const results = useMemo(() => {
    if (!query.trim() || query.length < 2) return [];

    const q = query.toLowerCase();
    const items: Array<{
      title: string;
      category: string;
      href: string;
      badge: string;
      type: "dream" | "symbol" | "zodiac";
    }> = [];

    // Search dreams
    DREAM_ENTRIES.forEach((d) => {
      if (
        d.title.toLowerCase().includes(q) ||
        d.slug.toLowerCase().includes(q) ||
        d.quickAnswer.toLowerCase().includes(q)
      ) {
        items.push({
          title: d.title,
          category: `Dream Dictionary • ${d.category}`,
          href: `/dreams/${d.slug}`,
          badge: "Dream",
          type: "dream",
        });
      }
    });

    // Search symbols & angel numbers
    SYMBOL_ENTRIES.forEach((s) => {
      if (
        s.code.toLowerCase().includes(q) ||
        s.title.toLowerCase().includes(q) ||
        s.tagline.toLowerCase().includes(q)
      ) {
        items.push({
          title: s.title,
          category: s.category,
          href: `/symbols/${s.slug}`,
          badge: s.code,
          type: "symbol",
        });
      }
    });

    // Search horoscopes
    ZODIAC_SIGNS.forEach((z) => {
      if (
        z.name.toLowerCase().includes(q) ||
        z.element.toLowerCase().includes(q) ||
        z.overview.toLowerCase().includes(q)
      ) {
        items.push({
          title: `${z.symbol} ${z.name} (${z.dates})`,
          category: `Zodiac Horoscope • ${z.element} Element`,
          href: `/horoscopes/${z.id}`,
          badge: z.symbol,
          type: "zodiac",
        });
      }
    });

    return items.slice(0, 7);
  }, [query]);

  return (
    <div className="relative w-full max-w-xl mx-auto z-30">
      <div
        className={`glass-panel rounded-full px-4 py-2.5 border transition-all duration-300 flex items-center space-x-3 shadow-xl ${
          isFocused ? "border-amber-400/60 shadow-purple-900/30 ring-1 ring-amber-400/30" : "border-white/10"
        }`}
      >
        <Search className="w-4 h-4 text-purple-400 flex-shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search dreams, angel numbers (e.g. 111, snake, teeth, owl)..."
          className="w-full bg-transparent text-sm text-white placeholder-white/40 focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="text-white/40 hover:text-white p-0.5 rounded-full"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Instant Dropdown Suggestions */}
      {isFocused && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-panel rounded-2xl border border-white/15 p-2 shadow-2xl backdrop-blur-2xl animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
          {results.length > 0 ? (
            <div className="divide-y divide-white/5">
              {results.map((res, i) => (
                <Link
                  key={i}
                  href={res.href}
                  onClick={() => setIsFocused(false)}
                  className="flex items-center justify-between p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                >
                  <div className="flex items-center space-x-3 overflow-hidden">
                    <span className="w-7 h-7 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-xs font-mono text-amber-300 flex-shrink-0">
                      {res.badge.slice(0, 3)}
                    </span>
                    <div className="overflow-hidden">
                      <h4 className="text-xs font-medium text-white truncate group-hover:text-amber-300 transition-colors">
                        {res.title}
                      </h4>
                      <p className="text-[10px] text-white/40 truncate">{res.category}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-white/30 group-hover:text-white group-hover:translate-x-0.5 transition-all flex-shrink-0 ml-2" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-white/40">
              No cosmic symbols matching &ldquo;{query}&rdquo;. Try &quot;snake&quot;, &quot;111&quot;, or &quot;aries&quot;.
            </div>
          )}
        </div>
      )}
    </div>
  );
}

