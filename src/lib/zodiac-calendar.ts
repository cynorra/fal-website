import { ZODIAC_SIGNS } from "./horoscopes-data";

export interface MonthEntry {
  slug: string;
  name: string;
  days: number;
  /** [signId, firstDay, lastDay] segments in order */
  segments: [string, number, number][];
}

export const MONTHS: MonthEntry[] = [
  { slug: "january", name: "January", days: 31, segments: [["capricorn", 1, 19], ["aquarius", 20, 31]] },
  { slug: "february", name: "February", days: 29, segments: [["aquarius", 1, 18], ["pisces", 19, 29]] },
  { slug: "march", name: "March", days: 31, segments: [["pisces", 1, 20], ["aries", 21, 31]] },
  { slug: "april", name: "April", days: 30, segments: [["aries", 1, 19], ["taurus", 20, 30]] },
  { slug: "may", name: "May", days: 31, segments: [["taurus", 1, 20], ["gemini", 21, 31]] },
  { slug: "june", name: "June", days: 30, segments: [["gemini", 1, 20], ["cancer", 21, 30]] },
  { slug: "july", name: "July", days: 31, segments: [["cancer", 1, 22], ["leo", 23, 31]] },
  { slug: "august", name: "August", days: 31, segments: [["leo", 1, 22], ["virgo", 23, 31]] },
  { slug: "september", name: "September", days: 30, segments: [["virgo", 1, 22], ["libra", 23, 30]] },
  { slug: "october", name: "October", days: 31, segments: [["libra", 1, 22], ["scorpio", 23, 31]] },
  { slug: "november", name: "November", days: 30, segments: [["scorpio", 1, 21], ["sagittarius", 22, 30]] },
  { slug: "december", name: "December", days: 31, segments: [["sagittarius", 1, 21], ["capricorn", 22, 31]] },
];

export const MONTH_BY_SLUG: Record<string, MonthEntry> = Object.fromEntries(MONTHS.map((m) => [m.slug, m]));

export function signOnDay(month: MonthEntry, day: number): string {
  const seg = month.segments.find(([, a, b]) => day >= a && day <= b);
  return seg ? seg[0] : month.segments[0][0];
}

export const ELEMENT_SLUGS = ["fire", "earth", "air", "water"] as const;
export type ElementSlug = (typeof ELEMENT_SLUGS)[number];

export interface ElementEntry {
  slug: ElementSlug;
  name: "Fire" | "Earth" | "Air" | "Water";
  tagline: string;
  overview: string;
  traits: string[];
  gifts: string;
  challenges: string;
  love: string;
  work: string;
  withOthers: Record<ElementSlug, string>;
  faq: { question: string; answer: string }[];
}

export const ELEMENTS: ElementEntry[] = [
  {
    slug: "fire",
    name: "Fire",
    tagline: "Energetic, enthusiastic and action-oriented.",
    overview:
      "The fire signs are Aries, Leo and Sagittarius. In traditional astrology fire stands for spirit, will and inspiration: the drive to start something, be seen and move toward a goal. Fire signs are usually quick to react, warm toward people they like and restless when nothing is happening.",
    traits: ["Spontaneous and expressive", "Optimistic and confident", "Competitive and motivated by challenge", "Generous and loyal with their circle", "Impatient with delays and over-analysis"],
    gifts:
      "Fire signs make things happen. They volunteer first, restart a stalled project and lift a room's mood. Their enthusiasm is contagious, and they tend to bounce back from setbacks faster than most.",
    challenges:
      "The same speed can burn out relationships and plans. Fire signs may speak before thinking, drop projects once the novelty fades and underestimate how long things take. Learning to pause and finish what was started is the common growth edge.",
    love:
      "In love, fire signs are passionate, playful and direct. They need excitement, honest feedback and a partner who does not try to dim them. Long routines without shared adventure are where a fire-sign relationship tends to struggle.",
    work:
      "Fire signs thrive in roles with visible results, autonomy and variety: founding, sales, performance, coaching, leadership and anything involving public energy. Heavy paperwork and slow approval chains drain them.",
    withOthers: {
      fire: "Two fire signs share energy and an appetite for adventure. The risk is competition and temper, since neither backs down easily.",
      earth: "Earth gives fire structure and a plan, while fire gives earth momentum. Friction appears when fire finds earth too cautious or earth finds fire reckless.",
      air: "Air feeds fire with ideas and conversation, so this is a classic lively pairing. Too little grounding can leave both with plenty of plans and few results.",
      water: "Water can deepen fire's feelings, but too much of it dampens the spark. Fire may feel held back; water may feel run over. Patience helps both.",
    },
    faq: [
      { question: "Which signs are fire signs?", answer: "Aries, Leo and Sagittarius are the three fire signs. They are spaced four signs apart on the zodiac wheel, which is why astrologers call them a trine." },
      { question: "What are fire signs known for?", answer: "Courage, enthusiasm, leadership and a strong need for action. They tend to be direct, expressive and quick to forgive, and can be impatient or impulsive." },
      { question: "Which fire sign is the most intense?", answer: "It depends how you define intensity. Aries is the fastest and most impulsive (cardinal), Leo is the steadiest and most dramatic (fixed), and Sagittarius is the most restless and freedom-seeking (mutable)." },
    ],
  },
  {
    slug: "earth",
    name: "Earth",
    tagline: "Practical, grounded and dependable.",
    overview:
      "The earth signs are Taurus, Virgo and Capricorn. Earth represents the material world: the body, money, work and anything you can touch or build. Earth signs are usually patient, observant and driven to create something stable and lasting.",
    traits: ["Reliable and consistent", "Practical and detail-aware", "Patient and persistent", "Cautious with change and risk", "Loyal once trust is earned"],
    gifts:
      "Earth signs finish what they start. They notice what is broken, plan realistically and keep promises. Friends and colleagues often lean on them when something needs to be built properly.",
    challenges:
      "Earth signs can be stubborn, overly cautious or too focused on material measures of success. They may hold on to routines past their usefulness and find it hard to relax. Allowing play and spontaneity is the usual lesson.",
    love:
      "Earth signs show love through actions: showing up, fixing things, planning ahead and being physically affectionate. They take time to commit but tend to stay. They value loyalty, honesty and shared long-term goals.",
    work:
      "Earth signs do well in finance, craft, engineering, medicine, project management, farming, design and operations. They prefer clear expectations and tangible progress over abstract promises.",
    withOthers: {
      fire: "Fire pushes earth to take chances and earth helps fire turn sparks into results. Earth may find fire exhausting; fire may find earth slow.",
      earth: "Two earth signs build steadily and understand each other's need for security. The risk is a routine so rigid that nothing changes.",
      air: "Air offers fresh ideas and earth offers follow-through. They can misread each other, since air can seem flighty and earth can seem heavy.",
      water: "Water and earth are a natural pair: water nourishes, earth gives it shape. This is one of the easiest combinations for emotional security.",
    },
    faq: [
      { question: "Which signs are earth signs?", answer: "Taurus, Virgo and Capricorn are the three earth signs." },
      { question: "Are earth signs boring?", answer: "No. Earth signs prefer stability, which can look quiet from outside, but they are often sensual, funny and creative once comfortable. Their pace is steady rather than flashy." },
      { question: "Which signs are most compatible with earth signs?", answer: "Water signs are traditionally the smoothest match because they complement each other, and other earth signs share the same values. Fire and air matches can work well with effort and respect for different paces." },
    ],
  },
  {
    slug: "air",
    name: "Air",
    tagline: "Curious, social and idea-driven.",
    overview:
      "The air signs are Gemini, Libra and Aquarius. Air stands for the mind: thought, communication, social connection and perspective. Air signs tend to be curious, talkative and at ease with abstract ideas and different points of view.",
    traits: ["Curious and quick to learn", "Sociable and communicative", "Objective and open to new ideas", "Adaptable and independent", "Can overthink or avoid heavy emotion"],
    gifts:
      "Air signs connect people and concepts. They explain things clearly, see several sides of an issue and keep conversations moving. They are often good at networking, teaching and spotting patterns others miss.",
    challenges:
      "Air signs may stay in their heads and keep feelings at arm's length. Indecision, restlessness and follow-through can be difficult. Naming emotions plainly and choosing one path are the common growth areas.",
    love:
      "Air signs want a friend and a mind to match. Conversation, humor and freedom matter more to them than grand gestures. They can seem emotionally distant when stressed, so clear communication keeps them close.",
    work:
      "Air signs excel in writing, teaching, media, technology, law, diplomacy, design and any work built on communication and ideas. They tend to dislike repetitive isolation and enjoy collaboration.",
    withOthers: {
      fire: "Air fuels fire. Ideas and enthusiasm feed each other and conversation rarely stalls.",
      earth: "Air brings concepts and earth makes them real. They may disagree on pace and practicality, but they balance each other well when respectful.",
      air: "Two air signs enjoy endless conversation and mutual space. The challenge is emotional depth and decisions that need follow-through.",
      water: "Air thinks and water feels, so they can misunderstand each other. When they listen, air helps water put feelings into words and water helps air feel them.",
    },
    faq: [
      { question: "Which signs are air signs?", answer: "Gemini, Libra and Aquarius are the three air signs." },
      { question: "Are air signs emotionally cold?", answer: "Not exactly. Air signs process feelings by thinking and talking about them, which can look detached. They often care deeply but need to be asked directly and given space to explain." },
      { question: "What is the best match for an air sign?", answer: "Fire signs and other air signs are the traditional matches. Any pairing can work when both people communicate openly." },
    ],
  },
  {
    slug: "water",
    name: "Water",
    tagline: "Emotional, intuitive and empathetic.",
    overview:
      "The water signs are Cancer, Scorpio and Pisces. Water represents feeling, memory, intuition and connection. Water signs usually pick up on moods quickly, value emotional honesty and have a rich inner life that they share only with people they trust.",
    traits: ["Intuitive and empathetic", "Emotionally deep", "Protective of loved ones", "Imaginative and sensitive", "Prone to absorbing other people's moods"],
    gifts:
      "Water signs sense what others leave unsaid. They offer comfort, creativity and loyalty, and they tend to remember what matters to the people around them. Many are drawn to caregiving, art and healing work.",
    challenges:
      "Water signs can take things personally, hold grudges or retreat into moods. Boundaries are a recurring theme: learning where your own feelings end and someone else's begin. Practical routines and honest talk help keep them steady.",
    love:
      "Water signs love deeply and want emotional safety. They bond slowly, remember small gestures and need a partner who handles feelings with care. Secrecy or dismissiveness hurts them more than open conflict does.",
    work:
      "Water signs do well in counseling, nursing, teaching, creative arts, research, hospitality and any role that involves understanding people. They want meaning in their work and a kind team.",
    withOthers: {
      fire: "Fire can warm water or steam it away. Passion is high; the work is balancing fire's bluntness with water's sensitivity.",
      earth: "Earth holds water and water feeds earth, a naturally supportive pairing built on loyalty and care.",
      air: "Water feels what air thinks. They can frustrate each other until they learn each other's language.",
      water: "Two water signs share an intuitive bond and a rich emotional world. The risk is getting lost in shared moods without anyone steering.",
    },
    faq: [
      { question: "Which signs are water signs?", answer: "Cancer, Scorpio and Pisces are the three water signs." },
      { question: "Are water signs too emotional?", answer: "Water signs feel strongly, which is a strength as much as a challenge. Emotional awareness helps with empathy and intuition; boundaries and routines help them stay balanced." },
      { question: "Which water sign is the most sensitive?", answer: "Pisces is usually described as the most porous and imaginative, Cancer as the most nurturing and protective, and Scorpio as the most intense and private. Sensitivity looks different in each." },
    ],
  },
];

export const ELEMENT_BY_SLUG: Record<string, ElementEntry> = Object.fromEntries(ELEMENTS.map((e) => [e.slug, e]));

export const SIGN_IDS_BY_ELEMENT: Record<string, string[]> = Object.fromEntries(
  ELEMENTS.map((e) => [e.slug, ZODIAC_SIGNS.filter((s) => s.element === e.name).map((s) => s.id)])
);
