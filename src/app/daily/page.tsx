import React from "react";
import { Metadata } from "next";
import { MoodAffirmationHub } from "@/components/interactive/MoodAffirmationHub";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Daily Mood & Sacred Affirmations Hub | Somatic Mindfulness",
  description:
    "Select your emotional state to receive targeted daily affirmations, box breathing pacing, and 2-minute nervous system grounding rituals.",
};

export default function DailyMoodPage() {
  return (
    <div className="space-y-10 py-6 max-w-4xl mx-auto">
      <MoodAffirmationHub />

      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-4 text-white/80 font-light text-sm leading-relaxed">
        <h3 className="text-xl font-serif font-bold text-white">
          Neuroscience & The Power of Somatic Affirmations
        </h3>
        <p>
          Affirmations alone do not rewrite neural pathways if the body remains locked in a sympathetic (fight-or-flight) panic state. By coupling conscious affirmations with paced diaphragmatic breathing, we signal safety to the vagus nerve, allowing the prefrontal cortex to absorb positive self-concept.
        </p>
      </section>

      <AdBanner format="in-article" label="MEDITATION APPS & ESSENTIAL OIL BLENDS" />
    </div>
  );
}

