import { fromContent } from "./content";
const PLANET_THEMES_DEFAULT: Record<string, { rules: string; domain: string }> = {
  Sun: { rules: "your core identity and life purpose", domain: "who you are becoming" },
  Moon: { rules: "your emotions, instincts and need for security", domain: "how you feel and what comforts you" },
  Mercury: { rules: "thinking, learning and communication", domain: "how you process and share ideas" },
  Venus: { rules: "love, attraction, values and pleasure", domain: "what you love and how you relate" },
  Mars: { rules: "drive, desire, courage and anger", domain: "how you act and pursue what you want" },
  Jupiter: { rules: "growth, luck, optimism and meaning", domain: "where you expand and find opportunity" },
  Saturn: { rules: "discipline, responsibility and long-term lessons", domain: "where you build mastery through effort" },
  Uranus: { rules: "change, freedom and originality", domain: "where you break patterns, shared by a whole generation" },
  Neptune: { rules: "imagination, spirituality and idealism", domain: "where you dream and sense more than you see, shared by a generation" },
  Pluto: { rules: "power, transformation and renewal", domain: "where deep change reshapes you, shared by a generation" },
};
export const PLANET_THEMES: Record<string, { rules: string; domain: string }> = fromContent("planet_themes", PLANET_THEMES_DEFAULT);

// A short style phrase for how each sign colors a planet.
const SIGN_STYLE_DEFAULT: Record<string, string> = {
  Aries: "directly, boldly and with a strong urge to act first",
  Taurus: "steadily, sensually and with a preference for security and comfort",
  Gemini: "curiously, quickly and through conversation and variety",
  Cancer: "protectively, emotionally and with a focus on home and belonging",
  Leo: "warmly, proudly and with a desire to create and be seen",
  Virgo: "carefully, practically and with an eye for detail and improvement",
  Libra: "gracefully, fairly and with a focus on balance and partnership",
  Scorpio: "intensely, privately and with a drive for depth and truth",
  Sagittarius: "optimistically, freely and with a hunger for adventure and meaning",
  Capricorn: "seriously, patiently and with a focus on goals and responsibility",
  Aquarius: "independently, originally and with an eye on the future and community",
  Pisces: "gently, intuitively and with imagination and compassion",
};
export const SIGN_STYLE: Record<string, string> = fromContent("sign_style", SIGN_STYLE_DEFAULT);

export function planetReading(planet: string, sign: string): string {
  const t = PLANET_THEMES[planet];
  const style = SIGN_STYLE[sign];
  if (!t || !style) return "";
  return `${planet} governs ${t.rules}. In ${sign}, you tend to approach ${t.domain} ${style}.`;
}

const HOUSE_MEANING_DEFAULT = [
  "Self and appearance", "Money and values", "Communication and learning", "Home and family",
  "Romance and creativity", "Work and health", "Partnerships", "Intimacy and shared resources",
  "Travel and beliefs", "Career and reputation", "Friends and hopes", "Rest and the subconscious",
];
export const HOUSE_MEANING = fromContent("house_meaning", HOUSE_MEANING_DEFAULT);
