export interface AspectInfo {
  name: string;
  distance: number;
  degrees: number;
  text: string;
  adjust: { overall: number; love: number; comm: number; chem: number };
}

const ASPECTS: AspectInfo[] = [
  {
    name: "Conjunction (same sign)",
    distance: 0,
    degrees: 0,
    text: "Two people of the same sign see themselves in each other. Understanding is instant, and so are the shared blind spots: whatever one finds hard, the other probably does too. The relationship works best when each person brings in interests and friends from outside the pairing.",
    adjust: { overall: -1, love: 0, comm: 2, chem: -3 },
  },
  {
    name: "Semi-sextile (neighboring signs)",
    distance: 1,
    degrees: 30,
    text: "Neighboring signs share neither an element nor a modality, so they often feel like they speak slightly different languages. Curiosity usually brings them together, but misreading each other's priorities is common. This pairing rewards patience and explicit communication about what each person needs.",
    adjust: { overall: -9, love: -8, comm: -8, chem: -6 },
  },
  {
    name: "Sextile (two signs apart)",
    distance: 2,
    degrees: 60,
    text: "A sextile links signs of compatible elements (Fire with Air, Earth with Water). It is a friendly, easy aspect: ideas and opportunities flow, and each sign naturally supports the other's strengths. The connection is warm but may need some intentional effort to deepen into passion.",
    adjust: { overall: 2, love: 1, comm: 3, chem: 0 },
  },
  {
    name: "Square (three signs apart)",
    distance: 3,
    degrees: 90,
    text: "A square joins signs of the same modality but clashing elements. It is the classic friction aspect: strong attraction and strong disagreement often arrive together. The friction can drive growth when both people treat conflict as information rather than a contest.",
    adjust: { overall: -10, love: -8, comm: -6, chem: 4 },
  },
  {
    name: "Trine (four signs apart)",
    distance: 4,
    degrees: 120,
    text: "A trine joins two signs of the same element, the most harmonious aspect in astrology. Values, pace and instincts match naturally. The main risk is complacency: because things come easily, the relationship benefits from shared challenges and new experiences.",
    adjust: { overall: 3, love: 3, comm: 2, chem: 1 },
  },
  {
    name: "Quincunx (five signs apart)",
    distance: 5,
    degrees: 150,
    text: "Signs five apart share nothing in element, modality or polarity, which makes the quincunx the most awkward aspect to describe. Each partner must keep adjusting to the other. Couples who thrive here usually do so through humor, flexibility and a willingness to learn a very different way of living.",
    adjust: { overall: -9, love: -8, comm: -7, chem: -4 },
  },
  {
    name: "Opposition (opposite signs)",
    distance: 6,
    degrees: 180,
    text: "Opposite signs mirror each other: each holds the quality the other lacks. This creates magnetic attraction and a pull to balance each other out, along with a tendency to polarize in arguments. When both sides learn from the other, an opposition can be among the most complete partnerships in the zodiac.",
    adjust: { overall: -4, love: -2, comm: -8, chem: 7 },
  },
];

export function aspectBetween(indexA: number, indexB: number): AspectInfo {
  const raw = Math.abs(indexA - indexB);
  const distance = Math.min(raw, 12 - raw);
  return ASPECTS[distance];
}

const MODALITIES = ["Cardinal", "Fixed", "Mutable"];

const MODALITY_TEXT: Record<string, string> = {
  "Cardinal-Cardinal": "Two Cardinal signs are both initiators. Plans and projects start quickly, but both partners want to lead, so agreeing on who decides what avoids power struggles.",
  "Fixed-Fixed": "Two Fixed signs are both loyal and persistent, which builds deep stability. The same stubbornness can create standoffs, so learning to compromise early matters.",
  "Mutable-Mutable": "Two Mutable signs are adaptable and flexible, and they handle change well together. The risk is drift: without a clear plan, decisions can stall or keep changing.",
  "Cardinal-Fixed": "A Cardinal sign starts things and a Fixed sign sustains them, a useful division of labor. Friction appears if the Cardinal partner feels held back or the Fixed partner feels pushed.",
  "Cardinal-Mutable": "A Cardinal sign sets direction while a Mutable sign adapts, which can work smoothly. The Mutable partner should be careful not to give up their own wishes to keep the peace.",
  "Fixed-Mutable": "A Fixed sign provides steadiness while a Mutable sign brings flexibility. This balances well when the Fixed partner stays open to change and the Mutable partner follows through.",
};

export function modalityText(indexA: number, indexB: number): string {
  const a = MODALITIES[indexA % 3];
  const b = MODALITIES[indexB % 3];
  const key = [a, b].sort((x, y) => MODALITIES.indexOf(x) - MODALITIES.indexOf(y)).join("-");
  return MODALITY_TEXT[key];
}
