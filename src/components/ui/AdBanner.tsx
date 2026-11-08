"use client";

import React, { useEffect } from "react";
import { ADSENSE_CLIENT_ID, ADSENSE_SLOT_ID } from "@/lib/site";

interface AdBannerProps {
  slotId?: string;
  format?: "in-article" | "horizontal" | "square" | "sticky-footer";
  className?: string;
  /** Kept for backwards compatibility; AdSense policy only allows a neutral "Advertisement" label. */
  label?: string;
}

/**
 * Renders a real AdSense unit only when both a publisher ID and an ad slot ID are configured.
 * Otherwise it renders nothing (no placeholder boxes, which violate AdSense policies and hurt UX).
 * Page-level Auto ads (including mobile anchor) are handled by the script in the root layout.
 */
export function AdBanner({ slotId, format = "horizontal", className = "" }: AdBannerProps) {
  const slot = slotId && slotId !== "1234567890" ? slotId : ADSENSE_SLOT_ID;
  const enabled = Boolean(ADSENSE_CLIENT_ID && slot) && format !== "sticky-footer";

  useEffect(() => {
    if (!enabled) return;
    try {
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch {
      // Ad blocker or script not loaded yet - ignore.
    }
  }, [enabled]);

  if (!enabled) return null;

  const minHeight = {
    "in-article": 140,
    horizontal: 90,
    square: 250,
    "sticky-footer": 0,
  }[format];

  return (
    <aside aria-label="Advertisement" className={`my-8 ${className}`}>
      <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1 text-center">
        Advertisement
      </span>
      <div style={{ minHeight }} className="w-full overflow-hidden">
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_CLIENT_ID}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}
