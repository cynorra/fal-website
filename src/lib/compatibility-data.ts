export interface CompatibilityReport {
  signA: string;
  signB: string;
  slug: string;
  overallScore: number;
  loveScore: number;
  communicationScore: number;
  chemistryScore: number;
  verdict: string;
  summary: string;
  elementalDynamic: string;
  intimacyAndChemistry: string;
  communicationAndMental: string;
  longTermMarriagePotential: string;
  strengths: string[];
  challenges: string[];
  cosmicAdvice: string;
}

const ELEMENT_MAP: Record<string, "Fire" | "Earth" | "Air" | "Water"> = {
  aries: "Fire",
  leo: "Fire",
  sagittarius: "Fire",
  taurus: "Earth",
  virgo: "Earth",
  capricorn: "Earth",
  gemini: "Air",
  libra: "Air",
  aquarius: "Air",
  cancer: "Water",
  scorpio: "Water",
  pisces: "Water",
};

// Curated comprehensive synastry dossiers for high-traffic pairings
const CURATED_REPORTS: Record<string, Partial<CompatibilityReport>> = {
  "aries-and-scorpio": {
    overallScore: 84,
    loveScore: 82,
    communicationScore: 71,
    chemistryScore: 98,
    verdict: "Volcanic Chemistry & Karmic Crucible",
    summary:
      "Aries and Scorpio share a traditional planetary ruler in classical astrology: Mars, god of war, primal instinct, and relentless passion. While Aries expresses Martian fire outwardly through direct confrontation and pioneering impulse, Scorpio channels Martian energy inward into emotional depth, strategic perception, and psychological intensity. This union generates instant magnetic friction—neither can dominate the other, creating an intoxicating dance between raw vulnerability and defensive armor.",
    elementalDynamic:
      "Fire meets Fixed Water. When controlled, this alchemy creates steam that can power an industrial engine; when unmoderated, water extinguishes flame while fire boils water dry. Aries finds Scorpio's enigmatic silence fascinating yet frustrating, while Scorpio views Aries' unfiltered impulsiveness as charmingly naive yet occasionally reckless.",
    intimacyAndChemistry:
      "Bedroom chemistry between Aries and Scorpio is legendary and volcanic. Physical passion is rarely an issue; both signs approach intimacy with raw intensity. However, where Aries seeks energetic release and spontaneous conquest, Scorpio craves complete soul-merging and psychological surrender. Mutual trust is the prerequisite for intimacy to transcend power struggles.",
    communicationAndMental:
      "Communication represents the crucible test of this match. Aries speaks instantly without filtering for tact; Scorpio remembers every syllable and analyzes subterranean subtext. Scorpio's icy stonewalling drives Aries into explosive fury, while Aries' blunt shouting offends Scorpio's sensitive pride. Success requires Aries to learn patient empathy and Scorpio to voice grievances directly rather than nursing silent resentments.",
    longTermMarriagePotential:
      "High, provided both partners possess emotional maturity. As a unified team against external obstacles, Aries and Scorpio are virtually invincible. Scorpio provides the strategic long-term vision, emotional loyalty, and financial prudence; Aries provides the courage, optimism, and unyielding momentum.",
    strengths: [
      "Fierce, unshakeable mutual loyalty once trust is consecrated",
      "Electrifying physical attraction that defies boredom for decades",
      "Complimentary strengths: Aries initiates bold ventures; Scorpio protects and manages assets",
    ],
    challenges: [
      "Power struggles and refusing to concede defeat during arguments",
      "Aries' impatience clashing with Scorpio's slow emotional processing",
    ],
    cosmicAdvice:
      "Aries must never weaponize Scorpio's secrets during a fight. Scorpio must resist the urge to punish Aries with passive-aggressive silence. Fight the problem together, not each other.",
  },
  "aries-and-leo": {
    overallScore: 94,
    loveScore: 95,
    communicationScore: 89,
    chemistryScore: 96,
    verdict: "Royal Solar Flame & High-Octane Synergy",
    summary:
      "When two Fire signs unite, life becomes a grand cinematic adventure. Aries (cardinal fire) brings the initiating spark, while Leo (fixed fire) provides the steady, radiant hearth that sustains the blaze. This couple radiates warmth, magnetic optimism, and infectious enthusiasm wherever they appear.",
    elementalDynamic:
      "Double Fire produces extraordinary creative vitality. Both partners understand each other's instinctual need for recognition, drama, and independence. Unlike matches where fire suffocates under heavy emotional scrutiny, here both lovers encourage each other's boldest ambitions without neurotic inhibition.",
    intimacyAndChemistry:
      "Physical and emotional intimacy is passionate, playful, and affectionate. Aries admires Leo's regal presence and lavish generosity, while Leo basks in Aries' ardent, breathless adoration. Playful competition keeps the romantic spark burning year after year.",
    communicationAndMental:
      "Direct, enthusiastic, and fast-paced. Minor disputes flare up like summer thunderstorms—loud, dramatic, and over within twenty minutes. Neither sign holds long-term grudges, provided personal pride is not publicly humiliated.",
    longTermMarriagePotential:
      "Exceptional. Provided both partners agree to share the throne rather than compete for who receives the louder applause, this bond yields a lavish domestic life filled with travel, shared entrepreneurial triumphs, and loyal devotion.",
    strengths: [
      "Natural generosity and mutual championing of each other's dreams",
      "Zero passive-aggressive manipulation; arguments are clean and swift",
      "Shared zest for life, social vitality, and spontaneous fun",
    ],
    challenges: [
      "Ego clashes over who makes final executive household decisions",
      "Financial impulsiveness: both love luxury and dislike tedious budgeting",
    ],
    cosmicAdvice:
      "Praise each other in public; negotiate compromises in private. Allow Aries to pioneer new territories while honoring Leo's role as the benevolent monarch of the home.",
  },
  "taurus-and-virgo": {
    overallScore: 96,
    loveScore: 94,
    communicationScore: 95,
    chemistryScore: 88,
    verdict: "Golden Earth Trinity & Compound Longevity",
    summary:
      "Taurus and Virgo represent the gold standard of astrological stability. As fellow Earth signs, both prioritize tangible reality, emotional dependability, clean aesthetics, and domestic security. Where other matches waste energy in erratic emotional theatrics, Taurus and Virgo build an empire brick by deliberate brick.",
    elementalDynamic:
      "Fixed Earth (Taurus) anchors Mutable Earth (Virgo). Taurus provides serene emotional stability that calms Virgo's hyperactive nervous system and chronic anxiety. In return, Virgo provides intellectual organization, logistical efficiency, and refined attention to detail that elevates Taurus' lifestyle.",
    intimacyAndChemistry:
      "Sensual, unhurried, and deeply restorative. Taurus' Venusian sensuality teaches Virgo to step out of obsessive mental analysis and inhabit the physical body. Virgo's devotion and gentle service make Taurus feel unconditionally cherished.",
    communicationAndMental:
      "Effortless and practical. Both communicate with grounded common sense and dry, witty humor. Virgo analyzes problems; Taurus offers steadfast, soothing reassurance. Decisions regarding finances, family, and investments are made with unanimous prudence.",
    longTermMarriagePotential:
      "Near perfection. This is the couple most likely to celebrate their golden 50th wedding anniversary with a healthy investment portfolio, a lush garden, and a tranquil, orderly home.",
    strengths: [
      "Deep-seated mutual respect and emotional predictability",
      "Flawless financial management and domestic harmony",
      "Shared appreciation for gourmet food, nature, and peaceful routines",
    ],
    challenges: [
      "Falling into predictable ruts and resisting necessary spontaneous adventures",
      "Virgo's critical perfectionism occasionally irritating Taurus' stubborn pride",
    ],
    cosmicAdvice:
      "Schedule deliberate dates outside of household maintenance. Taurus should praise Virgo's tireless efforts; Virgo should honor Taurus' need for quiet downtime without critique.",
  },
  "gemini-and-libra": {
    overallScore: 92,
    loveScore: 91,
    communicationScore: 97,
    chemistryScore: 89,
    verdict: "Intellectual Symphony & Social Brilliance",
    summary:
      "Double Air synergy at its finest. Gemini and Libra connect primarily through the realm of ideas, wit, cultural curiosity, and effortless social charm. Their relationship is characterized by lively conversations that stretch past 3 AM, shared aesthetics, and mutual intellectual freedom.",
    elementalDynamic:
      "Mutable Air (Gemini) dances seamlessly with Cardinal Air (Libra). Libra provides aesthetic elegance, romantic diplomacy, and balance, while Gemini brings varied ideas, playful wit, and endless novelty. Neither sign smothers the other with possessive emotional demands.",
    intimacyAndChemistry:
      "Flirtatious, lighthearted, and intellectually stimulating. For both signs, mental seduction precedes physical touch: witty banter, exchange of articles, and artistic appreciation are the ultimate aphrodisiacs.",
    communicationAndMental:
      "Telepathic and harmonious. Libra's instinctive desire for harmony defuses Gemini's nervous restlessness, while Gemini's versatile perspective helps Libra overcome chronic decision paralysis.",
    longTermMarriagePotential:
      "High. While both can occasionally avoid heavy emotional confrontation, their shared value for fairness, freedom, and mental camaraderie creates an enduring partnership of best friends.",
    strengths: [
      "Unmatched conversational rapport; boredom is practically impossible",
      "Sophisticated social life and mutual respect for personal space",
      "Diplomatic conflict resolution without toxic drama",
    ],
    challenges: [
      "Hesitating to address unpleasant emotional truths directly",
      "Indecisiveness regarding major long-term commitments",
    ],
    cosmicAdvice:
      "Do not mistake intellectual analysis for emotional vulnerability. Set aside designated time to discuss raw, uncomfortable feelings without retreating into witty detachment.",
  },
  "cancer-and-scorpio": {
    overallScore: 97,
    loveScore: 98,
    communicationScore: 92,
    chemistryScore: 97,
    verdict: "Psychic Soul-Merging & Oceanic Devotion",
    summary:
      "When Cardinal Water (Cancer) meets Fixed Water (Scorpio), two intuitive souls find the emotional depth they have sought their entire lives. In a world that often dismisses sensitivity as weakness, these two recognize each other's emotional currents instantly without speaking a word.",
    elementalDynamic:
      "Water harmonizes with Water. Cancer provides unconditional nurturing warmth, domestic sanctuary, and gentle empathy. Scorpio provides ferocious protection, unshakeable loyalty, and psychological depth. Cancer's emotional shell softens in Scorpio's intense gaze; Scorpio's guarded armor melts in Cancer's maternal tenderness.",
    intimacyAndChemistry:
      "Intensely private and profound. Intimacy is treated as a sacred ritual of mutual transformation. Both partners crave absolute exclusivity and soul-level dedication; neither is interested in superficial encounters.",
    communicationAndMental:
      "Intuitive and empathetic. They register each other's emotional weather shifts across physical distance. Fights only occur if Scorpio's jealousy triggers Cancer's retreat into moody withdrawal.",
    longTermMarriagePotential:
      "Legendary. Cancer and Scorpio build private emotional fortresses where both feel safe to express their deepest vulnerabilities and ancestral roots.",
    strengths: [
      "Profound emotional safety and total reciprocal loyalty",
      "Intuitive telepathy that anticipates needs before they are voiced",
      "Shared devotion to family, privacy, and building generational wealth",
    ],
    challenges: [
      "Risk of emotional codependency or mutual brooding",
      "Holding on to past grievances instead of practicing clean forgiveness",
    ],
    cosmicAdvice:
      "Ventilate your emotional sanctuary with outside friendships and creative hobbies. Love should be an expansive harbor, not an isolated bunker.",
  },
  "leo-and-sagittarius": {
    overallScore: 95,
    loveScore: 96,
    communicationScore: 93,
    chemistryScore: 95,
    verdict: "Radiant Odyssey & Boundless Joy",
    summary:
      "Fixed Fire (Leo) meets Mutable Fire (Sagittarius) in one of the happiest, most generous pairings of the zodiac. Ruled by the Sun (vitality) and Jupiter (expansion), this union feels like an eternal summer vacation filled with laughter, intellectual exploration, and lavish celebrations.",
    elementalDynamic:
      "Both partners possess unshakeable optimism and high energy. Sagittarius broadens Leo's philosophical horizon with travel and wisdom; Leo provides Sagittarius with a luxurious, warm center to return to after far-flung expeditions.",
    intimacyAndChemistry:
      "Passionate, adventurous, and joyful. Physical intimacy is unburdened by shame or heavy angst; it is treated as a playful celebration of life and love.",
    communicationAndMental:
      "Humorous, expansive, and honest. Sagittarius speaks with blunt philosophical humor that makes Leo laugh out loud, while Leo's warmth softens Sagittarius' rough edges.",
    longTermMarriagePotential:
      "Brilliant. As long as Leo does not attempt to leash Sagittarius' independent wanderlust and Sagittarius remembers to praise Leo's noble heart, this marriage thrives for decades.",
    strengths: [
      "Infectious optimism that attracts abundant luck and opportunities",
      "Zero jealousy or petty territorialism",
      "Shared love for travel, higher philosophy, and grand gatherings",
    ],
    challenges: [
      "Careless bluntness from Sagittarius bruising Leo's royal feelings",
      "Extravagant overspending and lack of practical routine",
    ],
    cosmicAdvice:
      "Sagittarius must deliver honesty with diplomatic warmth. Leo must understand that Sagittarius' love of solitude is not personal rejection.",
  },
};

export function calculateCompatibility(signA: string, signB: string): CompatibilityReport {
  const normA = signA.toLowerCase().trim();
  const normB = signB.toLowerCase().trim();
  const forwardSlug = `${normA}-and-${normB}`;
  const reverseSlug = `${normB}-and-${normA}`;

  const curated = CURATED_REPORTS[forwardSlug] || CURATED_REPORTS[reverseSlug];

  const elemA = ELEMENT_MAP[normA] || "Fire";
  const elemB = ELEMENT_MAP[normB] || "Fire";
  const nameA = normA.charAt(0).toUpperCase() + normA.slice(1);
  const nameB = normB.charAt(0).toUpperCase() + normB.slice(1);

  if (curated) {
    return {
      signA: nameA,
      signB: nameB,
      slug: forwardSlug,
      overallScore: curated.overallScore || 88,
      loveScore: curated.loveScore || 85,
      communicationScore: curated.communicationScore || 85,
      chemistryScore: curated.chemistryScore || 88,
      verdict: curated.verdict || "Cosmic Affinity",
      summary: curated.summary || "",
      elementalDynamic: curated.elementalDynamic || "",
      intimacyAndChemistry: curated.intimacyAndChemistry || "",
      communicationAndMental: curated.communicationAndMental || "",
      longTermMarriagePotential: curated.longTermMarriagePotential || "",
      strengths: curated.strengths || [],
      challenges: curated.challenges || [],
      cosmicAdvice: curated.cosmicAdvice || "",
    };
  }

  // Nuanced, tailored generation based on element interactions
  let overall = 78;
  let love = 80;
  let comm = 75;
  let chem = 79;
  let verdict = "Fascinating Karmic Lesson";

  let elementalDynamic = "";
  let intimacyAndChemistry = "";
  let communicationAndMental = "";
  let longTermMarriagePotential = "";
  let summary = "";
  let strengths: string[] = [];
  let challenges: string[] = [];
  let cosmicAdvice = "";

  if (elemA === elemB) {
    overall = 89;
    love = 91;
    comm = 88;
    chem = 86;
    verdict = "Mirrored Elemental Resonance";
    summary = `${nameA} and ${nameB} share the exact same primordial element of ${elemA}. They experience an instinctive baseline understanding of each other's emotional language, pacing, and core motivations.`;
    elementalDynamic = `Double ${elemA} energy creates rapid rapport. However, when both partners share the same blind spots, small issues can compound if neither steps outside their element.`;
    intimacyAndChemistry = `Comfortable and validating. There is little friction in understanding what the other requires to feel secure and desired.`;
    communicationAndMental = `Natural and fluid. You share similar coping styles and intellectual cadence.`;
    longTermMarriagePotential = `Strong and predictable. The primary risk is stagnation; introducing outside hobbies and new circles keeps the connection fresh.`;
    strengths = [
      `Immediate intuitive rapport and shared lifestyle pacing`,
      `Zero translation barrier when expressing emotional needs`,
      `Mutual validation of elemental values`,
    ];
    challenges = [
      `Shared blind spots and stubbornness when resolving conflicts`,
      `Risk of falling into an insular emotional bubble`,
    ];
    cosmicAdvice = `Do not treat your partner merely as a clone of yourself. Honor subtle differences in your natal charts.`;
  } else if (
    (elemA === "Fire" && elemB === "Air") ||
    (elemA === "Air" && elemB === "Fire")
  ) {
    overall = 93;
    love = 94;
    comm = 95;
    chem = 92;
    verdict = "Electrifying Expansion & Vitality";
    summary = `Air feeds Fire, and Fire warms Air. ${nameA} and ${nameB} generate constant intellectual and creative momentum together, turning conversations into ambitious projects.`;
    elementalDynamic = `A vibrant masculine polarity interplay. The intellectual conceptualization of Air pairs seamlessly with the passionate execution of Fire.`;
    intimacyAndChemistry = `High-octane and playful. Flirtatious banter seamlessly translates into romantic heat and creative exploration.`;
    communicationAndMental = `Extraordinary. You stimulate each other's intellect and rarely experience conversational exhaustion.`;
    longTermMarriagePotential = `High and dynamic. Both partners prioritize personal freedom, social engagement, and continuous self-improvement.`;
    strengths = [
      `Unstoppable creative synergy and mutual inspiration`,
      `Lightness of spirit that avoids bitter brooding`,
      `Shared enthusiasm for social life, travel, and bold ideas`,
    ];
    challenges = [
      `Impatience when dealing with routine domestic budgeting and chores`,
      `Risk of talking over each other during excited exchanges`,
    ];
    cosmicAdvice = `Ground your dazzling ideas into practical daily habits so your shared flame does not exhaust your physical stamina.`;
  } else if (
    (elemA === "Earth" && elemB === "Water") ||
    (elemA === "Water" && elemB === "Earth")
  ) {
    overall = 94;
    love = 96;
    comm = 90;
    chem = 91;
    verdict = "Fertile Soil & Nourishing Harmony";
    summary = `Earth provides a secure vessel for Water to flow; Water softens Earth to cultivate fertile life. ${nameA} and ${nameB} offer each other deep psychological safety and physical abundance.`;
    elementalDynamic = `A classic feminine polarity pairing. Earth grounds Water's emotional fluctuations, while Water infuses Earth's pragmatic structures with empathy and art.`;
    intimacyAndChemistry = `Tender, sensual, and restorative. Both prioritize deep emotional security over shallow games.`;
    communicationAndMental = `Thoughtful and considerate. Disagreements are handled with care rather than cruel verbal attacks.`;
    longTermMarriagePotential = `Exceptional. This combination naturally excels at creating a peaceful home, raising family, and building lasting generational wealth.`;
    strengths = [
      `Complementary balance between practical security and emotional warmth`,
      `Deep loyalty and mutual domestic commitment`,
      `Unconditional patience during life crises`,
    ],
    challenges = [
      `Resistance to sudden changes or outside disruptions`,
      `Earth can occasionally seem too pragmatic; Water can occasionally seem overly sensitive`,
    ],
    cosmicAdvice = `Earth should verbalize emotional appreciation regularly; Water should respect Earth's need for logical structure.`;
  } else if (
    (elemA === "Fire" && elemB === "Water") ||
    (elemA === "Water" && elemB === "Fire")
  ) {
    overall = 74;
    love = 80;
    comm = 68;
    chem = 94;
    verdict = "Intense Steam & Alchemical Catalyst";
    summary = `Fire and Water create steam—an intense, transformative dynamic that can either generate incredible creative power or result in emotional exhaustion.`;
    elementalDynamic = `Fire expresses itself outward through direct action; Water feels inwardly through subtle tides. Mutual fascination is instant, but requires emotional maturity to sustain.`;
    intimacyAndChemistry = `Extremely high chemistry. The attraction of opposites creates electric romantic passion.`;
    communicationAndMental = `Requires conscious bridge-building. Fire's bluntness can wound Water; Water's retreat can baffle Fire.`;
    longTermMarriagePotential = `A transformative karmic bond. If both commit to learning from the other, they mature faster together than in any other match.`;
    strengths = [
      `Intense physical and emotional magnetism`,
      `Profound capacity to challenge each other's emotional blind spots`,
      `Unshakeable protection when united against external trials`,
    ],
    challenges = [
      `Radically different emotional pacing and dispute resolution styles`,
      `Fire burning too hot; Water simmering with unexpressed feelings`,
    ],
    cosmicAdvice = `Fire must temper its temper; Water must speak its truth directly without retreating into martyrdom.`;
  } else {
    // Earth and Air
    overall = 72;
    love = 70;
    comm = 78;
    chem = 68;
    verdict = "Grounded Vision & Practical Idealism";
    summary = `Earth builds tangible structures; Air generates abstract theories. Together, ${nameA} and ${nameB} can turn wild dreams into profitable, grounded realities when they honor each other's pace.`;
    elementalDynamic = `Air can find Earth too rigid; Earth can view Air as too detached. When aligned, Air provides the architectural blueprint and Earth lays the concrete.`;
    intimacyAndChemistry = `Evolving and refined. Requires deliberate effort to bridge mental conversation with physical affection.`;
    communicationAndMental = `Rich and stimulating when discussing shared goals, culture, or career strategies.`;
    longTermMarriagePotential = `Dependable and strategic. Operates exceptionally well as an intellectual and professional partnership.`;
    strengths = [
      `Balanced blend of intellectual vision and pragmatic execution`,
      `Mutual respect for intelligence, order, and fairness`,
      `Low emotional toxicity and calm decision-making`,
    ],
    challenges = [
      `Emotional coolness if neither prioritizes romantic warmth`,
      `Earth feeling exhausted by Air's constant theoretical pivots`,
    ],
    cosmicAdvice = `Make conscious room for playful emotional intimacy rather than treating the relationship strictly as an efficient logistics firm.`;
  }

  return {
    signA: nameA,
    signB: nameB,
    slug: forwardSlug,
    overallScore: overall,
    loveScore: love,
    communicationScore: comm,
    chemistryScore: chem,
    verdict,
    summary,
    elementalDynamic,
    intimacyAndChemistry,
    communicationAndMental,
    longTermMarriagePotential,
    strengths,
    challenges,
    cosmicAdvice,
  };
}
