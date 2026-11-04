"use client";

import React, { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  size: number;
  opacity: number;
  animationDuration: string;
  animationDelay: string;
}

export function StarsBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    // Generate deterministic stars once on mount
    const generated: Star[] = Array.from({ length: 65 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() > 0.85 ? 2.5 : Math.random() > 0.5 ? 1.5 : 1,
      opacity: 0.2 + Math.random() * 0.7,
      animationDuration: `${2 + Math.random() * 4}s`,
      animationDelay: `${Math.random() * 3}s`,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Deep cosmic ambient aura blobs */}
      <div className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] -z-10" />
      <div className="absolute top-[40%] -left-[10%] w-[600px] h-[500px] bg-indigo-600/10 rounded-full blur-[130px] -z-10" />
      <div className="absolute bottom-[10%] -right-[10%] w-[700px] h-[600px] bg-amber-500/5 rounded-full blur-[160px] -z-10" />

      {/* Twinkling stars */}
      {stars.map((star) => (
        <span
          key={star.id}
          className="absolute rounded-full bg-white transition-opacity"
          style={{
            top: star.top,
            left: star.left,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            boxShadow: star.size > 2 ? "0 0 6px 1px rgba(255, 255, 255, 0.7)" : undefined,
            animation: `pulse ${star.animationDuration} infinite ease-in-out ${star.animationDelay}`,
          }}
        />
      ))}

      {/* Occasional shooting star line */}
      <div className="absolute top-1/4 left-3/4 w-36 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent rotate-[-35deg] animate-pulse" />
    </div>
  );
}

