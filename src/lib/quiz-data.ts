export interface QuizQuestion {
  id: number;
  question: string;
  options: {
    text: string;
    auraPoints: Record<string, number>;
  }[];
}

export interface AuraResult {
  id: string;
  name: string;
  hex: string;
  gradient: string;
  tagline: string;
  description: string;
  superpowers: string[];
  shadowSide: string;
  companionCrystal: string;
  sacredChakra: string;
}

export const AURA_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "When entering a crowded room, what is your immediate instinctive reaction?",
    options: [
      {
        text: "I immediately feel everyone's unspoken emotional energy and seek a calm corner.",
        auraPoints: { violet: 3, crystal: 2, rose: 1 },
      },
      {
        text: "I scan the room with curiosity, looking for inspiring people or interesting conversations.",
        auraPoints: { gold: 3, emerald: 1 },
      },
      {
        text: "I observe silently from the edge, analyzing body language and intentions.",
        auraPoints: { indigo: 3, crystal: 1 },
      },
      {
        text: "I look for someone who seems isolated or uncomfortable to make them feel welcomed.",
        auraPoints: { rose: 3, emerald: 2 },
      },
    ],
  },
  {
    id: 2,
    question: "Which sacred landscape recharges your spirit most deeply?",
    options: [
      {
        text: "A misty ancient forest drenched in rain and lush moss.",
        auraPoints: { emerald: 3, indigo: 1 },
      },
      {
        text: "A starlit mountaintop under a velvet indigo night sky.",
        auraPoints: { indigo: 3, violet: 2 },
      },
      {
        text: "A sun-drenched golden beach during golden hour.",
        auraPoints: { gold: 3, rose: 1 },
      },
      {
        text: "A secluded waterfall flowing into a crystal-clear spring.",
        auraPoints: { crystal: 3, violet: 1 },
      },
    ],
  },
  {
    id: 3,
    question: "What is your greatest soul frustration in everyday life?",
    options: [
      {
        text: "Superficiality, lies, and people hiding behind fake masks.",
        auraPoints: { indigo: 3, crystal: 2 },
      },
      {
        text: "Cruelty, lack of empathy, and emotional coldness.",
        auraPoints: { rose: 3, emerald: 2 },
      },
      {
        text: "Boredom, routine, and feeling trapped in stagnant structures.",
        auraPoints: { gold: 3, violet: 1 },
      },
      {
        text: "Physical noise, energetic clutter, and chaos in my space.",
        auraPoints: { crystal: 3, indigo: 1 },
      },
    ],
  },
  {
    id: 4,
    question: "When faced with an important crossroads, how do you make your final choice?",
    options: [
      {
        text: "A sudden intuitive knowing or vivid prophetic dream.",
        auraPoints: { violet: 3, indigo: 2 },
      },
      {
        text: "I follow what makes my heart expand with warmth and purpose.",
        auraPoints: { rose: 3, emerald: 1 },
      },
      {
        text: "I envision which path creates the biggest, boldest, most radiant future.",
        auraPoints: { gold: 3, indigo: 1 },
      },
      {
        text: "I retreat into silence until all mental fog settles into crystal clarity.",
        auraPoints: { crystal: 3, emerald: 2 },
      },
    ],
  },
  {
    id: 5,
    question: "Which creative gift feels most natural to you?",
    options: [
      {
        text: "Writing, composing, or interpreting symbolic patterns and mysteries.",
        auraPoints: { indigo: 3, violet: 2 },
      },
      {
        text: "Empowering others, public speaking, or orchestrating big projects.",
        auraPoints: { gold: 3, emerald: 1 },
      },
      {
        text: "Healing, comforting words, nurturing plants, or culinary arts.",
        auraPoints: { emerald: 3, rose: 3 },
      },
      {
        text: "Meditation, energetic clearing, or bringing sacred minimalism into spaces.",
        auraPoints: { crystal: 3, violet: 1 },
      },
    ],
  },
  {
    id: 6,
    question: "What do close friends value most about your presence?",
    options: [
      {
        text: "My unconditional acceptance and loving, judgment-free listening.",
        auraPoints: { rose: 3, emerald: 2 },
      },
      {
        text: "My uncanny ability to predict outcomes and give deep, wise advice.",
        auraPoints: { indigo: 3, violet: 2 },
      },
      {
        text: "My infectious optimism and ability to make life feel like a grand adventure.",
        auraPoints: { gold: 3, rose: 1 },
      },
      {
        text: "My peaceful, grounding energy that instantly eases their anxiety.",
        auraPoints: { crystal: 3, emerald: 2 },
      },
    ],
  },
  {
    id: 7,
    question: "Which cosmic element speaks directly to your soul's blueprint?",
    options: [
      {
        text: "The Cosmic Violet Flame (Purification & Spiritual Transformation).",
        auraPoints: { violet: 3, crystal: 1 },
      },
      {
        text: "The Deep Ocean Abyss (Subconscious Mystery & Third Eye).",
        auraPoints: { indigo: 3, emerald: 1 },
      },
      {
        text: "Solar Flare & Golden Ray (Creative Abundance & Joy).",
        auraPoints: { gold: 3, rose: 1 },
      },
      {
        text: "Diamond Light / Prismatic Ray (Purity, Truth & High Frequency).",
        auraPoints: { crystal: 3, rose: 1 },
      },
    ],
  },
];

export const AURA_RESULTS: Record<string, AuraResult> = {
  indigo: {
    id: "indigo",
    name: "Royal Indigo",
    hex: "#4f46e5",
    gradient: "from-indigo-600 via-blue-700 to-slate-900",
    tagline: "The Intuitive Seer & Truth-Seeker",
    description: "Your auric field radiates with profound intuition, deep intellectual perception, and clairvoyant discernment. You possess a natural third-eye radar that detects dishonesty from a mile away. You walk between the seen and unseen realms.",
    superpowers: ["Piercing intuition", "Seeing hidden patterns", "Psychic dream downloads", "Unflinching integrity"],
    shadowSide: "Tendency toward aloof detachment, chronic overthinking, or feeling misunderstood by mainstream society.",
    companionCrystal: "Lapis Lazuli & Sodalite",
    sacredChakra: "Third Eye Chakra (Ajna)",
  },
  violet: {
    id: "violet",
    name: "Mystic Violet",
    hex: "#9333ea",
    gradient: "from-purple-600 via-violet-800 to-indigo-950",
    tagline: "The Visionary Alchemist & Crown Guide",
    description: "Your aura carries the highest spiritual frequency of the color spectrum. As a Mystic Violet, your life purpose is connected to visionary innovation, spiritual transformation, and elevating the consciousness of humanity.",
    superpowers: ["Channeling higher wisdom", "Magnetic charisma", "Artistic visionary downloads", "Metaphysical mastery"],
    shadowSide: "Feeling ungrounded from earthly practicalities or burdened by saving the world.",
    companionCrystal: "Amethyst & Charoite",
    sacredChakra: "Crown Chakra (Sahasrara)",
  },
  gold: {
    id: "gold",
    name: "Radiant Gold",
    hex: "#f59e0b",
    gradient: "from-amber-400 via-yellow-600 to-orange-950",
    tagline: "The Solar Alchemist & Joyous Leader",
    description: "Your auric field glows with celestial abundance, warmth, and irresistible optimism. You possess the Midas touch: wherever you focus your enthusiastic energy, ideas flourish and people are inspired to take bold leaps.",
    superpowers: ["Manifestation power", "Infectious charisma", "Courage in adversity", "Natural leadership"],
    shadowSide: "Burning the candle at both ends, or relying on external validation to affirm your self-worth.",
    companionCrystal: "Pyrite, Citrine & Sunstone",
    sacredChakra: "Solar Plexus Chakra (Manipura)",
  },
  emerald: {
    id: "emerald",
    name: "Emerald Green",
    hex: "#10b981",
    gradient: "from-emerald-500 via-teal-700 to-emerald-950",
    tagline: "The Compassionate Healer & Earth Anchor",
    description: "Your aura reflects profound cellular renewal, somatic balance, and living empathy. Being in your presence feels like walking through a secluded pine sanctuary after a thunderstorm. You heal simply by being you.",
    superpowers: ["Empathic resonance", "Restorative presence", "Connecting with plant and animal wisdom", "Emotional groundedness"],
    shadowSide: "Absorbing others' toxic emotions as your own and forgetting to establish energetic shields.",
    companionCrystal: "Green Aventurine & Malachite",
    sacredChakra: "Heart Chakra (Anahata)",
  },
  rose: {
    id: "rose",
    name: "Rose Quartz Pink",
    hex: "#f43f5e",
    gradient: "from-rose-500 via-pink-600 to-rose-950",
    tagline: "The Sacred Lover & Divine Comforter",
    description: "Your auric field pulsates with tender warmth, unconditional compassion, and heart-centered magic. You see the divine spark inside broken souls and possess the rare gift of softening hard hearts with love.",
    superpowers: ["Unconditional empathy", "Relationship harmonization", "Artistic sensuality", "Gentle persuasion"],
    shadowSide: "People-pleasing, romanticizing red flags in partners, or neglecting your own emotional boundaries.",
    companionCrystal: "Rose Quartz & Rhodonite",
    sacredChakra: "Higher Heart Chakra",
  },
  crystal: {
    id: "crystal",
    name: "Crystal White",
    hex: "#e0e7ff",
    gradient: "from-slate-100 via-indigo-200 to-slate-900",
    tagline: "The Pure Prism & Cosmic Conduit",
    description: "Your aura is extraordinarily rare: a pure, translucent crystalline frequency capable of reflecting, purifying, and magnifying all other frequencies. You are a natural spiritual filter, bringing clarity wherever chaos reigns.",
    superpowers: ["Psychic purity", "Neutral objectivity", "Spiritual protection", "Energetic clarity"],
    shadowSide: "Extreme sensitivity to low-frequency environments, fluorescent lights, and emotional drama.",
    companionCrystal: "Clear Quartz & Selenite",
    sacredChakra: "Soul Star Chakra",
  },
};

