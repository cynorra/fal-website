"use client";

import React, { useEffect } from "react";
import { Sparkles } from "lucide-react";

interface AdBannerProps {
  slotId?: string;
  format?: "in-article" | "horizontal" | "square" | "sticky-footer";
  className?: string;
  label?: string;
}

export function AdBanner({
  slotId = "1234567890",
  format = "horizontal",
  className = "",
  label = "SPONSORED GUIDANCE",
}: AdBannerProps) {
  useEffect(() => {
    try {
      if (typeof window !== "undefined" && (window as any).adsbygoogle) {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      }
    } catch (err) {
      // Ignore if AdSense blocked by ad blocker
    }
  }, []);

  if (format === "sticky-footer") {
    return (
      <aside aria-label="Advertisement" className="fixed bottom-0 left-0 right-0 z-40 bg-cosmic-950/90 backdrop-blur-md border-t border-purple-500/20 py-2 px-4 flex flex-col items-center justify-center">
        <span className="text-[10px] uppercase tracking-widest text-white/40 mb-1">{label}</span>
        <div className="w-full max-w-4xl h-14 rounded-lg bg-cosmic-900/60 border border-white/5 flex items-center justify-center text-xs text-white/50">
          <Sparkles className="w-3.5 h-3.5 mr-2 text-amber-400/60" />
          <span>Reserved AdSense Mobile Sticky Anchor Slot (Responsive)</span>
        </div>
      </aside>
    );
  }

  const heightClasses = {
    "in-article": "min-h-[140px] md:min-h-[180px]",
    "horizontal": "min-h-[90px] md:min-h-[110px]",
    "square": "min-h-[250px] w-full max-w-[320px] mx-auto",
  }[format];

  return (
    <aside aria-label="Advertisement" className={`my-8 rounded-2xl overflow-hidden glass-panel border border-white/10 p-4 transition-all duration-300 relative group ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] uppercase tracking-widest text-white/40 font-medium">
          {label}
        </span>
        <span className="text-[10px] text-white/30 hover:text-white/60 cursor-pointer">Ad Choices</span>
      </div>

      <div
        className={`w-full ${heightClasses} rounded-xl bg-gradient-to-r from-purple-950/20 via-cosmic-900/40 to-indigo-950/20 border border-purple-500/10 flex flex-col items-center justify-center text-center p-4 relative overflow-hidden`}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.08)_0%,transparent_70%)] pointer-events-none" />
        
        <div className="z-10 flex flex-col items-center space-y-1">
          <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center border border-purple-500/20 text-purple-300 mb-1">
            <Sparkles className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-xs font-medium text-white/70">
            AdSense Premium Display Placement
          </p>
          <p className="text-[11px] text-white/40 max-w-sm">
            Targeted esoteric, mindfulness & lifestyle ads automatically render here once publisher ID is connected.
          </p>
        </div>

        {/* Real AdSense tag - rendered dynamically if client ID is set in env */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID && (
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        )}
      </div>
    </aside>
  );
}

