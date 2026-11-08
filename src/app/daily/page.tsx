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
      <header className="space-y-2">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Daily Mood and Affirmation Hub</h1>
        <p className="text-base text-white/70">Pick how you feel and get a matching affirmation plus a short breathing exercise.</p>
      </header>

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
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-5 text-white/80 font-light text-sm leading-relaxed">
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">How the hub works</h2>
          <p>Choose the mood closest to how you feel and the hub shows an affirmation and a paced breathing routine for that state. The affirmations are written in advance for each mood; they do not change with the date or predict anything.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">Why pair affirmations with breathing</h2>
          <p>Slow, paced breathing is a commonly recommended way to help the body settle. Saying a calming sentence while breathing gives your attention one thing to hold. The routine here is a simple self-care habit and not a treatment for anxiety or low mood.</p>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-serif font-bold text-white">When to seek more help</h2>
          <p>If low mood, panic or sleeplessness lasts for weeks, talk to a doctor or counselor. Affirmations can support healthy habits but they do not replace professional care.</p>
        </div>
      </section>
    </div>
  );
}

