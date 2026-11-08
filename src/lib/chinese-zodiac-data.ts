import { fromContent } from "./content";
export interface AnimalProfile {
  animal: string;
  slug: string;
  tagline: string;
  personality: string[];
  strengths: string[];
  weaknesses: string[];
  love: string;
  career: string;
  luckyNumbers: number[];
  luckyColors: string[];
  faq: { question: string; answer: string }[];
}

const ANIMAL_PROFILES_DEFAULT: AnimalProfile[] = [
  {
    animal: "Rat", slug: "rat",
    tagline: "Quick-witted, resourceful and charming.",
    personality: [
      "The Rat is the first animal of the Chinese zodiac. In the traditional story the Rat won the great river race by riding on the Ox and jumping ahead at the finish, which is a fair summary of its character: clever, adaptable and good at spotting opportunities.",
      "Rats are sociable and persuasive, with sharp instincts for people and money. They can also be anxious, thrifty to a fault and quick to worry. Growth comes from trusting others and being generous with their cleverness.",
    ],
    strengths: ["Intelligent and adaptable", "Resourceful problem-solver", "Charming and sociable", "Good with money", "Quick to see opportunity"],
    weaknesses: ["Anxious", "Overly cautious or calculating", "Can be manipulative when stressed", "Hoards time or money", "Gossip-prone"],
    love: "Rats are loyal and protective once committed. They like partners who are smart, funny and ambitious, and they show love through practical care and planning.",
    career: "Rats thrive in roles that reward quick thinking and networking: business, finance, writing, journalism, sales, research and entrepreneurship.",
    luckyNumbers: [2, 3], luckyColors: ["Blue", "Gold", "Green"],
    faq: [
      { question: "What are the Rat years?", answer: "Recent Rat years include 1960, 1972, 1984, 1996, 2008 and 2020, with the next in 2032. Check the Chinese New Year date if you were born in January or February." },
      { question: "Which animals are most compatible with the Rat?", answer: "Traditionally the Dragon and Monkey, which form a trine with the Rat. The Horse is the classic clash." },
      { question: "Is the Rat lucky?", answer: "In Chinese tradition the Rat symbolizes wealth, wit and new beginnings, and is generally seen as a fortunate animal." },
    ],
  },
  {
    animal: "Ox", slug: "ox",
    tagline: "Steady, hard-working and dependable.",
    personality: [
      "The Ox is the second animal of the zodiac and a symbol of agriculture, patience and honest labor. Oxen are reliable, methodical and grounded, the people who carry a project to the end without making a fuss.",
      "Their stubbornness is well known: once an Ox decides, little will change their mind. They prefer routine and tradition and can find emotional expression difficult. Their growth lies in flexibility and in allowing themselves rest.",
    ],
    strengths: ["Dependable and honest", "Hard-working and patient", "Strong sense of duty", "Calm under pressure", "Practical"],
    weaknesses: ["Stubborn", "Resistant to change", "Reserved", "Workaholic", "Slow to forgive"],
    love: "Oxen love slowly and seriously. They look for a stable, lifelong partner and show affection through actions, loyalty and providing.",
    career: "Oxen excel in steady, skill-based careers: engineering, farming, construction, medicine, banking, administration and craftsmanship.",
    luckyNumbers: [1, 4], luckyColors: ["Blue", "White", "Green"],
    faq: [
      { question: "What are the Ox years?", answer: "Recent Ox years include 1961, 1973, 1985, 1997, 2009 and 2021, with the next in 2033." },
      { question: "Which animals suit the Ox?", answer: "The Snake and Rooster form its trine. The Goat is the traditional clash." },
      { question: "Is the Ox lucky?", answer: "The Ox is associated with diligence and steady prosperity rather than sudden luck." },
    ],
  },
  {
    animal: "Tiger", slug: "tiger",
    tagline: "Brave, magnetic and competitive.",
    personality: [
      "The Tiger is the third animal of the zodiac, a symbol of courage and authority. Tigers are confident, adventurous and passionate, with a magnetic presence that draws others in.",
      "They dislike being controlled and can be impulsive and competitive. Their intensity is also their gift: Tigers protect the people they love and take risks others will not. Learning patience and humility is their main growth edge.",
    ],
    strengths: ["Courageous and confident", "Charismatic leader", "Generous and passionate", "Adventurous", "Protective of loved ones"],
    weaknesses: ["Impulsive", "Rebellious toward authority", "Competitive", "Restless", "Quick-tempered"],
    love: "Tigers are romantic, spontaneous and intense. They want an equal who respects their independence and keeps life exciting.",
    career: "Tigers do well as leaders, entrepreneurs, athletes, pilots, performers and in any field with challenge and independence.",
    luckyNumbers: [1, 3, 4], luckyColors: ["Blue", "Gray", "Orange"],
    faq: [
      { question: "What are the Tiger years?", answer: "Recent Tiger years include 1962, 1974, 1986, 1998, 2010 and 2022, with the next in 2034." },
      { question: "Which animals suit the Tiger?", answer: "The Horse and Dog form its trine. The Monkey is the traditional clash." },
      { question: "Is the Tiger lucky?", answer: "The Tiger symbolizes bravery and power. It is considered a protective animal in Chinese culture." },
    ],
  },
  {
    animal: "Rabbit", slug: "rabbit",
    tagline: "Gentle, elegant and diplomatic.",
    personality: [
      "The Rabbit, known as the Cat in Vietnamese tradition, is the fourth animal of the zodiac and stands for gentleness, grace and good fortune. Rabbits are kind, artistic and sensitive to atmosphere.",
      "They avoid conflict and prefer harmony, which can look like indecision. Their quiet resilience is underestimated: they adapt, observe and find calm paths through difficulty. Growth lies in speaking up for their own needs.",
    ],
    strengths: ["Kind and gentle", "Artistic and refined", "Diplomatic", "Good listener", "Resilient"],
    weaknesses: ["Avoids conflict", "Overly sensitive", "Indecisive", "Can be timid", "Dislikes change"],
    love: "Rabbits are devoted and affectionate partners who create a peaceful home. They value tenderness, loyalty and emotional safety.",
    career: "Rabbits suit creative, caring and diplomatic work: design, counseling, teaching, diplomacy, writing, medicine and the arts.",
    luckyNumbers: [3, 4, 6], luckyColors: ["Red", "Pink", "Purple", "Blue"],
    faq: [
      { question: "What are the Rabbit years?", answer: "Recent Rabbit years include 1963, 1975, 1987, 1999, 2011 and 2023, with the next in 2035." },
      { question: "Which animals suit the Rabbit?", answer: "The Goat and Pig form its trine. The Rooster is the traditional clash." },
      { question: "Is the Rabbit lucky?", answer: "Rabbits are traditionally considered lucky and a symbol of longevity and peace." },
    ],
  },
  {
    animal: "Dragon", slug: "dragon",
    tagline: "Ambitious, charismatic and larger than life.",
    personality: [
      "The Dragon is the fifth animal and the only mythical creature in the zodiac. It is the most prestigious sign in Chinese culture, associated with power, good fortune and ambition.",
      "Dragons are energetic, confident and generous, but can be domineering and impatient with those who cannot keep up. They thrive with big goals and a supportive audience. Their growth edge is listening and humility.",
    ],
    strengths: ["Confident and charismatic", "Ambitious and energetic", "Generous", "Natural leader", "Optimistic"],
    weaknesses: ["Domineering", "Impatient", "Perfectionist", "Proud", "Short-tempered"],
    love: "Dragons are passionate and attentive partners who like grand gestures. They need respect and admiration and do best with confident partners.",
    career: "Dragons excel in leadership, entrepreneurship, politics, entertainment, law and any field where they can build something big.",
    luckyNumbers: [1, 6, 7], luckyColors: ["Gold", "Silver", "Gray"],
    faq: [
      { question: "What are the Dragon years?", answer: "Recent Dragon years include 1964, 1976, 1988, 2000, 2012 and 2024, with the next in 2036." },
      { question: "Which animals suit the Dragon?", answer: "The Rat and Monkey form its trine. The Dog is the traditional clash." },
      { question: "Why is the Dragon considered the luckiest sign?", answer: "In Chinese culture the dragon is a symbol of imperial power and prosperity, which is why Dragon years are popular for births." },
    ],
  },
  {
    animal: "Snake", slug: "snake",
    tagline: "Wise, intuitive and composed.",
    personality: [
      "The Snake is the sixth animal of the zodiac and represents wisdom, intuition and transformation. Snakes are calm, observant and private, preferring to think deeply before acting.",
      "They are elegant and sharp-minded, but can be possessive, secretive and suspicious. Their depth is their strength: Snakes often see what others miss. Growth comes from trusting and sharing.",
    ],
    strengths: ["Intelligent and intuitive", "Calm and composed", "Elegant", "Determined", "Good strategist"],
    weaknesses: ["Secretive", "Possessive", "Suspicious", "Vain", "Slow to trust"],
    love: "Snakes are sensual, loyal and selective. They want deep emotional and intellectual connection and are devoted once they commit.",
    career: "Snakes do well in research, psychology, finance, law, medicine, writing and any field requiring analysis and discretion.",
    luckyNumbers: [2, 8, 9], luckyColors: ["Light yellow", "Red", "Black"],
    faq: [
      { question: "What are the Snake years?", answer: "Recent Snake years include 1965, 1977, 1989, 2001, 2013 and 2025, with the next in 2037." },
      { question: "Which animals suit the Snake?", answer: "The Ox and Rooster form its trine. The Pig is the traditional clash." },
      { question: "Is the Snake lucky?", answer: "In Chinese culture the snake is a little dragon and a symbol of wisdom and prosperity." },
    ],
  },
  {
    animal: "Horse", slug: "horse",
    tagline: "Free-spirited, energetic and sociable.",
    personality: [
      "The Horse is the seventh animal of the zodiac, a symbol of freedom, speed and perseverance. Horses are outgoing, energetic and cheerful, with a love of movement and independence.",
      "They are quick to start and quick to lose interest, and can be impatient or blunt. Their warmth draws friends easily. Growth comes from commitment and careful follow-through.",
    ],
    strengths: ["Energetic and cheerful", "Independent", "Sociable and warm", "Adaptable", "Honest"],
    weaknesses: ["Impatient", "Restless", "Blunt", "Commitment-shy", "Self-focused when stressed"],
    love: "Horses are passionate and playful but need freedom. They suit partners who share adventures and respect their independence.",
    career: "Horses excel in travel, sales, sports, media, performing and entrepreneurship, preferring variety and movement to routine.",
    luckyNumbers: [2, 3, 7], luckyColors: ["Yellow", "Green"],
    faq: [
      { question: "What are the Horse years?", answer: "Recent Horse years include 1966, 1978, 1990, 2002, 2014 and 2026, with the next in 2038." },
      { question: "Which animals suit the Horse?", answer: "The Tiger and Dog form its trine. The Rat is the traditional clash." },
      { question: "Is the Horse lucky?", answer: "The Horse is associated with success, speed and perseverance." },
    ],
  },
  {
    animal: "Goat", slug: "goat",
    tagline: "Gentle, creative and compassionate.",
    personality: [
      "The Goat, also called the Sheep or Ram, is the eighth animal of the zodiac and stands for gentleness, creativity and peace. Goats are kind, artistic and attuned to beauty and emotion.",
      "They can be shy, indecisive and prone to worry, and they prefer harmony over confrontation. Their compassion is real and deep. Growth comes from self-trust and a little practical structure.",
    ],
    strengths: ["Compassionate", "Creative and artistic", "Gentle", "Easy-going", "Loyal to loved ones"],
    weaknesses: ["Indecisive", "Pessimistic when stressed", "Shy", "Dependent on support", "Avoids conflict"],
    love: "Goats are tender, romantic and nurturing. They need emotional security and a partner who is patient and affectionate.",
    career: "Goats suit creative and caring careers: art, music, design, teaching, healthcare, counseling and gardening.",
    luckyNumbers: [3, 4, 9], luckyColors: ["Brown", "Red", "Purple"],
    faq: [
      { question: "What are the Goat years?", answer: "Recent Goat years include 1967, 1979, 1991, 2003, 2015 and 2027, with the next in 2039." },
      { question: "Which animals suit the Goat?", answer: "The Rabbit and Pig form its trine. The Ox is the traditional clash." },
      { question: "Is the Goat lucky?", answer: "In Chinese culture the goat symbolizes peace, harmony and good luck." },
    ],
  },
  {
    animal: "Monkey", slug: "monkey",
    tagline: "Clever, curious and playful.",
    personality: [
      "The Monkey is the ninth animal of the zodiac and a symbol of intelligence and mischief. Monkeys are witty, inventive and curious, with a talent for solving problems in unexpected ways.",
      "They are social and entertaining but may be restless, competitive or prone to cutting corners. Their brilliance grows when focused. Growth comes from depth, honesty and finishing what they start.",
    ],
    strengths: ["Clever and inventive", "Curious", "Funny and social", "Adaptable", "Quick learner"],
    weaknesses: ["Restless", "Mischievous", "Competitive", "Easily bored", "Can be superficial"],
    love: "Monkeys are playful, flirty and communicative. They want an intelligent partner who keeps them mentally stimulated.",
    career: "Monkeys excel in technology, marketing, media, entrepreneurship, teaching and any field with problem-solving and variety.",
    luckyNumbers: [1, 7, 8], luckyColors: ["White", "Blue", "Gold"],
    faq: [
      { question: "What are the Monkey years?", answer: "Recent Monkey years include 1968, 1980, 1992, 2004, 2016 and 2028, with the next in 2040." },
      { question: "Which animals suit the Monkey?", answer: "The Rat and Dragon form its trine. The Tiger is the traditional clash." },
      { question: "Is the Monkey lucky?", answer: "Monkeys are associated with cleverness and resourcefulness, often seen as lucky in business." },
    ],
  },
  {
    animal: "Rooster", slug: "rooster",
    tagline: "Observant, hard-working and confident.",
    personality: [
      "The Rooster is the tenth animal of the zodiac and stands for punctuality, pride and attention to detail. Roosters are organized, observant and proud, often the first to rise and the last to leave.",
      "They are honest and direct, sometimes to the point of being critical. They enjoy being noticed and dislike disorder. Growth comes from softening perfectionism and listening to others.",
    ],
    strengths: ["Hard-working and organized", "Honest", "Observant", "Confident", "Courageous"],
    weaknesses: ["Critical", "Perfectionist", "Boastful", "Rigid", "Can be nosy"],
    love: "Roosters are loyal and caring but can be critical. They need partners who are sincere and appreciate their effort.",
    career: "Roosters thrive in structured, visible work: management, accounting, journalism, hospitality, military, retail and the performing arts.",
    luckyNumbers: [5, 7, 8], luckyColors: ["Gold", "Brown", "Yellow"],
    faq: [
      { question: "What are the Rooster years?", answer: "Recent Rooster years include 1969, 1981, 1993, 2005, 2017 and 2029, with the next in 2041." },
      { question: "Which animals suit the Rooster?", answer: "The Ox and Snake form its trine. The Rabbit is the traditional clash." },
      { question: "Is the Rooster lucky?", answer: "The Rooster symbolizes dawn, vigilance and good fortune in Chinese tradition." },
    ],
  },
  {
    animal: "Dog", slug: "dog",
    tagline: "Loyal, honest and protective.",
    personality: [
      "The Dog is the eleventh animal of the zodiac and a symbol of loyalty, honesty and duty. Dogs are trustworthy, fair-minded and protective, and they value genuine friendship.",
      "They can be anxious, pessimistic and quick to judge when feeling unsafe. Their reliability is their gift: a Dog friend stays. Growth comes from trusting more and worrying less.",
    ],
    strengths: ["Loyal and trustworthy", "Honest", "Fair-minded", "Protective", "Dependable"],
    weaknesses: ["Anxious", "Pessimistic", "Stubborn", "Judgmental when insecure", "Reserved with strangers"],
    love: "Dogs are devoted, faithful partners who want honesty and security. They show love through loyalty and action.",
    career: "Dogs do well in service, justice and care: law, teaching, healthcare, social work, police, nonprofit and management roles.",
    luckyNumbers: [3, 4, 9], luckyColors: ["Red", "Green", "Purple"],
    faq: [
      { question: "What are the Dog years?", answer: "Recent Dog years include 1970, 1982, 1994, 2006, 2018 and 2030, with the next in 2042." },
      { question: "Which animals suit the Dog?", answer: "The Tiger and Horse form its trine. The Dragon is the traditional clash." },
      { question: "Is the Dog lucky?", answer: "Dogs are considered loyal protectors, and their presence is traditionally seen as a good omen for a household." },
    ],
  },
  {
    animal: "Pig", slug: "pig",
    tagline: "Generous, warm-hearted and easy-going.",
    personality: [
      "The Pig, or Boar, is the twelfth and last animal of the zodiac and stands for generosity, abundance and enjoyment of life. Pigs are warm, sincere and sociable, with a love of good food and company.",
      "They can be naive, indulgent and too trusting. Their kindness and optimism are real strengths. Growth comes from boundaries and discernment.",
    ],
    strengths: ["Generous and kind", "Sincere", "Optimistic", "Hard-working when motivated", "Good-humored"],
    weaknesses: ["Naive", "Overindulgent", "Too trusting", "Conflict-averse", "Can be materialistic"],
    love: "Pigs are affectionate, loyal and giving. They want a harmonious, comfortable home and a partner who is sincere.",
    career: "Pigs fit hospitality, healthcare, teaching, culinary work, sales and entertainment, where warmth and generosity matter.",
    luckyNumbers: [2, 5, 8], luckyColors: ["Yellow", "Gray", "Brown", "Gold"],
    faq: [
      { question: "What are the Pig years?", answer: "Recent Pig years include 1971, 1983, 1995, 2007, 2019 and 2031, with the next in 2043." },
      { question: "Which animals suit the Pig?", answer: "The Rabbit and Goat form its trine. The Snake is the traditional clash." },
      { question: "Is the Pig lucky?", answer: "Pigs symbolize wealth and abundance in Chinese culture." },
    ],
  },
];
export const ANIMAL_PROFILES: AnimalProfile[] = fromContent("chinese_animals", ANIMAL_PROFILES_DEFAULT);

export const ANIMAL_BY_NAME: Record<string, AnimalProfile> = Object.fromEntries(ANIMAL_PROFILES.map((a) => [a.animal, a]));

const TRINES_DEFAULT: Record<string, string[]> = {
  Rat: ["Dragon", "Monkey"], Dragon: ["Rat", "Monkey"], Monkey: ["Rat", "Dragon"],
  Ox: ["Snake", "Rooster"], Snake: ["Ox", "Rooster"], Rooster: ["Ox", "Snake"],
  Tiger: ["Horse", "Dog"], Horse: ["Tiger", "Dog"], Dog: ["Tiger", "Horse"],
  Rabbit: ["Goat", "Pig"], Goat: ["Rabbit", "Pig"], Pig: ["Rabbit", "Goat"],
};
export const TRINES: Record<string, string[]> = fromContent("chinese_trines", TRINES_DEFAULT);

const CLASHES_DEFAULT: Record<string, string> = {
  Rat: "Horse", Horse: "Rat", Ox: "Goat", Goat: "Ox", Tiger: "Monkey", Monkey: "Tiger",
  Rabbit: "Rooster", Rooster: "Rabbit", Dragon: "Dog", Dog: "Dragon", Snake: "Pig", Pig: "Snake",
};
export const CLASHES: Record<string, string> = fromContent("chinese_clashes", CLASHES_DEFAULT);

const ELEMENT_NOTES_DEFAULT: Record<string, string> = {
  Wood: "Wood years add growth, creativity and flexibility. Wood people tend to be idealistic, cooperative and always learning.",
  Fire: "Fire years add passion, enthusiasm and boldness. Fire people tend to be dynamic, expressive and quick to act.",
  Earth: "Earth years add stability, practicality and loyalty. Earth people tend to be dependable, patient and grounded.",
  Metal: "Metal years add determination, discipline and focus. Metal people tend to be organized, ambitious and self-reliant.",
  Water: "Water years add intuition, adaptability and empathy. Water people tend to be thoughtful, diplomatic and perceptive.",
};
export const ELEMENT_NOTES: Record<string, string> = fromContent("chinese_element_notes", ELEMENT_NOTES_DEFAULT);
