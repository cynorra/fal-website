export interface MoodState {
  id: string;
  name: string;
  emoji: string;
  color: string;
  glow: string;
  mantra: string;
  affirmation: string;
  ritual: string;
  breathPacing: string;
}

export const MOOD_STATES: MoodState[] = [
  {
    id: "anxious",
    name: "Anxious & Restless",
    emoji: "🌊",
    color: "from-blue-600/30 to-indigo-950/40",
    glow: "rgba(59, 130, 246, 0.4)",
    mantra: "So Hum (I am That)",
    affirmation: "I release what I cannot control. My mind is safe, my body is anchored, and this turbulent wave will pass.",
    ritual: "Drink a glass of warm water. Press your feet flat against the floor. Inhale for 4 seconds, hold for 4, exhale for 6.",
    breathPacing: "Box Breathing (4-4-6)",
  },
  {
    id: "burnt-out",
    name: "Burnt Out & Drained",
    emoji: "🕯️",
    color: "from-amber-600/30 to-orange-950/40",
    glow: "rgba(245, 158, 11, 0.4)",
    mantra: "Peace in stillness",
    affirmation: "Rest is not a reward I must earn; it is the sacred soil from which my strength regrows. I give myself permission to do nothing.",
    ritual: "Step away from all screens for 20 minutes. Lie flat on your back, place your hands over your heart, and close your eyes.",
    breathPacing: "Deep Sigh Exhale (Inhale deep, double puff, long sigh)",
  },
  {
    id: "hopeful",
    name: "Hopeful & Inspired",
    emoji: "✨",
    color: "from-purple-600/30 to-violet-950/40",
    glow: "rgba(168, 85, 247, 0.4)",
    mantra: "Cosmic expansion",
    affirmation: "The universe is orchestrating synchronicities in my favor. My dreams are already preparing a place for me in the physical realm.",
    ritual: "Write down 3 things that would delight you if they happened this month. Feel the excitement as if they exist now.",
    breathPacing: "Solar Expansion Breath (Deep 5s Inhale, 5s Exhale)",
  },
  {
    id: "heartbroken",
    name: "Tender Heart & Grief",
    emoji: "🕊️",
    color: "from-rose-600/30 to-pink-950/40",
    glow: "rgba(244, 63, 94, 0.4)",
    mantra: "Love remains unbroken",
    affirmation: "My broken heart is simply an opening through which higher light enters. I honor my tears as sacred liquid cleansing.",
    ritual: "Wrap yourself in a warm blanket. Place one hand on your chest and whisper: 'You are safe. I love you.'",
    breathPacing: "Heart Coherence (Inhale 5s into chest, Exhale 5s)",
  },
  {
    id: "seeking-clarity",
    name: "Confused / Seeking Direction",
    emoji: "🔮",
    color: "from-cyan-600/30 to-slate-950/40",
    glow: "rgba(6, 182, 212, 0.4)",
    mantra: "Truth reveals itself",
    affirmation: "I don't need to see the entire staircase to take the next illuminated step. Clarity comes from movement, not endless rumination.",
    ritual: "Flip a coin between two choices. Note the exact feeling you had while the coin was in mid-air—that is your true answer.",
    breathPacing: "Alternate Nostril Breathing (Nadi Shodhana)",
  },
  {
    id: "peaceful",
    name: "Serene & Grounded",
    emoji: "🌿",
    color: "from-emerald-600/30 to-teal-950/40",
    glow: "rgba(16, 185, 129, 0.4)",
    mantra: "Rooted in presence",
    affirmation: "I am complete in this present moment. Abundance flows toward my peaceful resonance naturally.",
    ritual: "Offer a sincere compliment to a stranger or send a silent blessing of gratitude to someone who helped you in the past.",
    breathPacing: "Rhythmic Ocean Breath (Ujjayi)",
  },
];

