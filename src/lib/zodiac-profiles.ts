import { fromContent } from "./content";
export interface ZodiacProfile {
  id: string;
  rulerPlanet: string; // classical + modern ruler, short
  tagline: string;
  symbolMeaning: string;
  personality: string[];
  strengths: string[];
  weaknesses: string[];
  keywords: string[];
  loveStyle: string;
  man: string;
  woman: string;
  career: string;
  bestCareers: string[];
  friendship: string;
  compat: { best: string[]; good: string[]; challenging: string[]; note: string };
  rising: string;
  moon: string;
  faq: { question: string; answer: string }[];
}

const ZODIAC_PROFILES_DEFAULT: ZodiacProfile[] = [
  {
    id: "aries",
    rulerPlanet: "Mars",
    tagline: "Bold, direct and always first through the door.",
    symbolMeaning:
      "Aries is symbolized by the Ram, drawn as ♈ with two horns curving from a single stem. In Greek myth the golden ram carried Phrixus to safety, and its fleece became the prize of Jason and the Argonauts. The image says it all: Aries energy charges ahead, protects what it loves and does not wait for permission.",
    personality: [
      "Aries opens the zodiac wheel at the spring equinox, so it carries the theme of new beginnings. People with a strong Aries Sun are usually energetic, competitive and honest to the point of bluntness. They like clear goals, quick results and people who say what they mean.",
      "Ruled by Mars, Aries has a fast temper that tends to cool just as fast. The same fire that makes them impatient also makes them brave, loyal defenders and natural starters. Their growth edge is finishing what they begin and listening before reacting.",
    ],
    strengths: ["Courageous and decisive", "Honest and straightforward", "Energetic and motivating", "Resilient after setbacks", "Generous with loyalty"],
    weaknesses: ["Impatient", "Quick to anger", "Impulsive with money and decisions", "Competitive to a fault", "Loses interest once the challenge is gone"],
    keywords: ["courage", "initiative", "independence", "passion", "directness"],
    loveStyle:
      "Aries loves the chase and the spark. They flirt openly, commit with intensity and want a partner who can match their energy without trying to control it. Boredom is the real relationship risk, so shared adventures and honest talk keep an Aries engaged.",
    man: "An Aries man is often direct about what he wants, takes the lead in dating and values loyalty and independence. He tends to respond best to partners who are confident and straightforward rather than playing games.",
    woman: "An Aries woman is usually bold, self-assured and quick to act on her feelings. She values a partner who respects her independence and keeps pace with her ambition and sense of humor.",
    career:
      "Aries does best where speed, initiative and visible results matter. They like to own outcomes and dislike heavy bureaucracy. Leading a launch, closing a deal or building something from scratch fits them far better than maintenance work.",
    bestCareers: ["Entrepreneur", "Sales leader", "Athlete or coach", "Emergency services", "Product launch manager"],
    friendship:
      "As a friend, Aries is the one who organizes the trip, defends you in an argument and says the thing others avoid. They forgive quickly but need friends who can handle blunt honesty.",
    compat: {
      best: ["Leo", "Sagittarius", "Gemini", "Aquarius"],
      good: ["Aries", "Libra"],
      challenging: ["Cancer", "Capricorn", "Taurus"],
      note: "Fire signs fuel each other and Air signs feed the fire with ideas. Cardinal Water and Earth signs may feel overrun by Aries pace, though a relationship can work with patience on both sides.",
    },
    rising:
      "An Aries rising makes a direct, energetic first impression. Others see someone confident, athletic in manner and quick to speak. Life tends to teach self-assertion early. The Ascendant colors your approach to new situations more than your inner feelings.",
    moon:
      "With the Moon in Aries your emotions are fast, fiery and honest. You feel first and think later, need independence to feel safe and recover from upset quickly. Learning to pause before reacting is the main emotional lesson.",
    faq: [
      { question: "What are the main Aries personality traits?", answer: "Courage, directness, energy and independence, balanced against impatience and a quick temper." },
      { question: "Which signs are most compatible with Aries?", answer: "Leo and Sagittarius share its fire, while Gemini and Aquarius match its curiosity and pace." },
      { question: "What planet rules Aries?", answer: "Mars, the planet of drive, action and assertion." },
      { question: "What are the Aries dates?", answer: "Roughly March 21 to April 19 in the tropical zodiac. The exact moment shifts by a few hours each year." },
    ],
  },
  {
    id: "taurus",
    rulerPlanet: "Venus",
    tagline: "Steady, sensual and built to last.",
    symbolMeaning:
      "Taurus is the Bull, written ♉ as a circle with horns. In myth Zeus took the form of a white bull to carry Europa across the sea. The bull stands for strength, fertility and patience: it moves slowly, but nothing moves it once it decides.",
    personality: [
      "Taurus arrives mid-spring when the earth is fully alive, and the sign is about enjoyment, security and craft. Taureans are patient, practical and loyal, with a strong appreciation for good food, comfort, music and beauty.",
      "Ruled by Venus, Taurus values quality over quantity and stability over novelty. Their stubbornness is famous, but it is the flip side of reliability: when a Taurus commits, they stay. The growth edge is welcoming change before it is forced.",
    ],
    strengths: ["Reliable and patient", "Loyal and affectionate", "Practical with money", "Strong work ethic", "Appreciates beauty and craftsmanship"],
    weaknesses: ["Stubborn", "Resistant to change", "Possessive", "Slow to forgive", "Can overindulge in comfort"],
    keywords: ["stability", "sensuality", "loyalty", "patience", "comfort"],
    loveStyle:
      "Taurus loves slowly and deeply. Touch, shared meals and consistency matter more than grand gestures. They need to feel safe before opening up, and once they do, they are devoted partners who build a home together.",
    man: "A Taurus man tends to be dependable, romantic in a practical way and drawn to partners who are calm and sincere. He shows love through steady actions and a comfortable shared life.",
    woman: "A Taurus woman is often warm, grounded and sensual, with a strong sense of her own worth. She values loyalty, honesty and a partner who does not rush her.",
    career:
      "Taurus thrives in roles that reward patience and quality: finance, real estate, design, culinary work, agriculture and skilled crafts. They build wealth gradually and prefer steady paths to constant reinvention.",
    bestCareers: ["Financial planner", "Chef or baker", "Architect or interior designer", "Real estate", "Musician or craftsperson"],
    friendship:
      "Taurus friends are the ones who show up with food and stay for the whole evening. They are not flashy but are among the most loyal people in a circle.",
    compat: {
      best: ["Virgo", "Capricorn", "Cancer", "Pisces"],
      good: ["Taurus", "Scorpio"],
      challenging: ["Leo", "Aquarius", "Gemini"],
      note: "Earth signs share Taurus values and Water signs nurture its warmth. Fixed Fire and Air signs can clash over who gives way first.",
    },
    rising:
      "A Taurus rising comes across as calm, grounded and pleasant to be around. People notice a measured voice and a steady, sensual presence. Life often teaches you to build security step by step.",
    moon:
      "The Moon is exalted in Taurus, so this is a comfortable placement. Emotions are steady and rooted in the body: good food, rest and routine soothe you. You dislike sudden change and need time to process.",
    faq: [
      { question: "What are Taurus' main traits?", answer: "Patience, loyalty, practicality and a love of comfort, with stubbornness as the main weakness." },
      { question: "Who is Taurus most compatible with?", answer: "Virgo and Capricorn share its practical outlook, while Cancer and Pisces provide emotional warmth." },
      { question: "What planet rules Taurus?", answer: "Venus, the planet of love, beauty, pleasure and value." },
      { question: "What are the Taurus dates?", answer: "Approximately April 20 to May 20." },
    ],
  },
  {
    id: "gemini",
    rulerPlanet: "Mercury",
    tagline: "Curious, quick and endlessly conversational.",
    symbolMeaning:
      "Gemini is the Twins, ♊, two pillars joined at top and bottom. They represent Castor and Pollux, twin brothers of Greek myth, one mortal and one immortal. The symbol captures Gemini duality: two sides of every question and an urge to connect ideas and people.",
    personality: [
      "Gemini falls at the end of spring, a season of movement and pollination, and the sign loves information, conversation and variety. Geminis are witty, adaptable and curious about almost everything, often juggling several interests at once.",
      "Ruled by Mercury, planet of communication, Gemini thinks and speaks fast. The challenge is depth and follow-through: with so many interests, a Gemini can skim the surface or change course before finishing. When they commit to a craft, their range becomes a real gift.",
    ],
    strengths: ["Quick-witted and adaptable", "Excellent communicator", "Curious and a fast learner", "Sociable and fun", "Good at connecting ideas"],
    weaknesses: ["Restless", "Inconsistent", "Superficial when bored", "Indecisive", "Can gossip or overtalk"],
    keywords: ["curiosity", "communication", "versatility", "wit", "connection"],
    loveStyle:
      "Gemini falls for minds first. Banter, texting and shared curiosity are their love language. They need variety and mental stimulation, and they feel most secure with a partner who is also a best friend.",
    man: "A Gemini man is often playful, talkative and curious. He is attracted to quick minds and tends to lose interest if conversation dries up.",
    woman: "A Gemini woman is usually witty, social and expressive. She wants a partner who enjoys ideas, humor and spontaneity as much as she does.",
    career:
      "Gemini excels in communication-heavy fields: writing, media, teaching, marketing, sales, technology and anything with variety. Repetitive solo work drains them.",
    bestCareers: ["Writer or journalist", "Marketer", "Teacher", "Software developer", "Public relations"],
    friendship:
      "Gemini keeps a wide circle and a funny group chat. They are great at introducing people and making plans, and need friends who accept that they sometimes change their mind.",
    compat: {
      best: ["Libra", "Aquarius", "Aries", "Leo"],
      good: ["Gemini", "Sagittarius"],
      challenging: ["Virgo", "Pisces", "Taurus"],
      note: "Air signs share Gemini love of ideas and Fire signs bring energy. Mutable Earth and Water signs can feel either too serious or too emotional for Gemini.",
    },
    rising:
      "A Gemini rising seems chatty, curious and youthful. Others may see someone who is quick with a joke and always has a question. Your approach to life is exploratory.",
    moon:
      "Moon in Gemini processes emotion through talking and thinking. You may need to put feelings into words before you understand them, and variety helps your mood. Journaling is especially useful.",
    faq: [
      { question: "What are Gemini's main traits?", answer: "Curiosity, wit, adaptability and strong communication skills, with restlessness as the challenge." },
      { question: "Which signs suit Gemini best?", answer: "Libra and Aquarius share its love of ideas; Aries and Leo bring energy." },
      { question: "What planet rules Gemini?", answer: "Mercury, the planet of mind, speech and travel." },
      { question: "What are the Gemini dates?", answer: "Approximately May 21 to June 20." },
    ],
  },
  {
    id: "cancer",
    rulerPlanet: "Moon",
    tagline: "Protective, intuitive and deeply emotional.",
    symbolMeaning:
      "Cancer is the Crab, ♋, two spirals like claws. In myth a crab pinched Heracles during his fight with the Hydra and was placed in the sky by Hera. The crab image fits Cancer well: a hard shell around a soft interior, sideways caution and fierce protection of home.",
    personality: [
      "Cancer begins at the summer solstice and is the sign of home, family and emotional memory. Cancers are caring, intuitive and tuned to the moods of everyone around them, often becoming the emotional anchor of a family or friend group.",
      "Ruled by the Moon, Cancer moods rise and fall with their feelings. The shell is protective: they retreat when hurt and can hold onto the past. The growth edge is expressing needs directly instead of expecting others to guess.",
    ],
    strengths: ["Nurturing and empathetic", "Highly intuitive", "Loyal and protective", "Good memory for people and events", "Resourceful with home and money"],
    weaknesses: ["Moody", "Overly sensitive", "Clingy or guarded", "Holds grudges", "Avoids direct conflict"],
    keywords: ["nurturing", "intuition", "home", "loyalty", "emotion"],
    loveStyle:
      "Cancer loves with devotion and wants emotional security. They remember anniversaries, cook for people they love and bond through shared home life. Trust takes time but is long-lasting.",
    man: "A Cancer man tends to be caring, protective and family-oriented. He may be reserved at first and opens up once he feels safe.",
    woman: "A Cancer woman is often warm, intuitive and emotionally perceptive. She values loyalty and a partner who makes her feel secure.",
    career:
      "Cancer fits caring and home-oriented work: healthcare, teaching, counseling, hospitality, real estate, food and childcare. They also make loyal, intuitive managers when they feel valued.",
    bestCareers: ["Nurse or therapist", "Teacher", "Chef or caterer", "Real estate agent", "HR or people operations"],
    friendship:
      "Cancer friends remember your birthday, check in when you are quiet and make a space feel like home. They need friends who are gentle about their sensitivity.",
    compat: {
      best: ["Scorpio", "Pisces", "Taurus", "Virgo"],
      good: ["Cancer", "Capricorn"],
      challenging: ["Aries", "Libra", "Aquarius"],
      note: "Water signs understand Cancer depth and Earth signs give it stability. Cardinal Fire and Air signs can feel too fast or too detached for Cancer.",
    },
    rising:
      "A Cancer rising appears gentle, careful and approachable. People may feel immediately comfortable around you, though you take time to let them in. Home and belonging are central life themes.",
    moon:
      "The Moon is at home in Cancer, so feelings run deep and are easily stirred. You need a safe base, familiar routines and people you trust. Naming emotions early helps prevent withdrawal.",
    faq: [
      { question: "What are Cancer's main traits?", answer: "Nurturing, intuitive, loyal and protective, with moodiness and sensitivity as challenges." },
      { question: "Who is Cancer compatible with?", answer: "Scorpio and Pisces share emotional depth; Taurus and Virgo offer stability." },
      { question: "What planet rules Cancer?", answer: "The Moon, which governs emotion, memory and instinct." },
      { question: "What are the Cancer dates?", answer: "Approximately June 21 to July 22." },
    ],
  },
  {
    id: "leo",
    rulerPlanet: "Sun",
    tagline: "Warm, generous and made to shine.",
    symbolMeaning:
      "Leo is the Lion, ♌, a mane and tail sweeping into a curl. In myth Heracles defeated the Nemean Lion in the first of his twelve labors, and Zeus set it among the stars. Like the lion, Leo stands for pride, courage and generous leadership.",
    personality: [
      "Leo comes at the height of summer and is ruled by the Sun, the center of the chart. Leos are warm, expressive and loyal, with a natural flair for the dramatic. They love to create, to celebrate and to be appreciated for their effort.",
      "The shadow side of Leo is pride: they may need recognition and can bruise when overlooked. Mature Leos use their warmth to lift others up, leading with generosity rather than needing the spotlight.",
    ],
    strengths: ["Confident and charismatic", "Generous and warm-hearted", "Creative and playful", "Loyal to loved ones", "Natural leader"],
    weaknesses: ["Needs recognition", "Prideful", "Stubborn", "Dramatic", "Dislikes being ignored or criticized"],
    keywords: ["confidence", "creativity", "generosity", "leadership", "warmth"],
    loveStyle:
      "Leo loves with theatre and heart. They plan thoughtful gestures, give lavish compliments and want to be adored in return. A Leo needs a partner who admires them sincerely and is secure enough to share the spotlight.",
    man: "A Leo man is often confident, loyal and generous. He enjoys taking care of a partner and responds well to genuine admiration.",
    woman: "A Leo woman is typically warm, magnetic and expressive. She wants a partner who celebrates her and brings out her playfulness.",
    career:
      "Leo shines in visible, creative or leadership roles: management, entertainment, design, teaching, politics, marketing and entrepreneurship. They do best when their contribution is acknowledged.",
    bestCareers: ["Director or manager", "Performer or presenter", "Creative director", "Teacher", "Entrepreneur"],
    friendship:
      "Leo friends are generous hosts, loyal supporters and the first to celebrate your wins. They appreciate friends who give honest praise.",
    compat: {
      best: ["Aries", "Sagittarius", "Gemini", "Libra"],
      good: ["Leo", "Aquarius"],
      challenging: ["Taurus", "Scorpio", "Capricorn"],
      note: "Fire signs match Leo energy and Air signs fan its flame. Fixed Earth and Water signs may compete with Leo on who is in charge.",
    },
    rising:
      "A Leo rising has a warm, noticeable presence and often a confident posture or distinctive style. Others see charisma and generosity. Life may call you to express yourself openly.",
    moon:
      "Moon in Leo feels proudly and warmly. You need appreciation and a sense of creative play to feel secure, and you recover well when someone acknowledges your effort.",
    faq: [
      { question: "What are Leo's main traits?", answer: "Confidence, warmth, creativity and leadership, balanced against pride and a need for recognition." },
      { question: "Who is Leo most compatible with?", answer: "Aries and Sagittarius share its fire; Gemini and Libra bring social energy." },
      { question: "What planet rules Leo?", answer: "The Sun, symbol of identity and vitality." },
      { question: "What are the Leo dates?", answer: "Approximately July 23 to August 22." },
    ],
  },
  {
    id: "virgo",
    rulerPlanet: "Mercury",
    tagline: "Analytical, helpful and quietly devoted.",
    symbolMeaning:
      "Virgo is the Maiden, ♍, often shown holding a sheaf of wheat, linked with Demeter and the harvest. The symbol points to service, discernment and careful work that nourishes others.",
    personality: [
      "Virgo is a late-summer sign of harvest and refinement. Virgos are observant, practical and detail-oriented. They notice what needs improving and often quietly do the work that keeps things running.",
      "Ruled by Mercury like Gemini, Virgo applies the mind to practical problems. The shadow side is worry and self-criticism: a Virgo is often their own harshest judge. Growth means accepting good enough and recognizing their own worth.",
    ],
    strengths: ["Analytical and precise", "Reliable and hard-working", "Helpful and humble", "Strong problem-solving skills", "Health-conscious and organized"],
    weaknesses: ["Overly critical", "Worries a lot", "Perfectionist", "Hard on themselves", "Struggles to relax"],
    keywords: ["service", "analysis", "precision", "health", "practicality"],
    loveStyle:
      "Virgo shows love through care: remembering details, solving problems and showing up. They can be shy and slow to commit but are deeply loyal. They appreciate partners who are honest, tidy-minded and kind.",
    man: "A Virgo man is often thoughtful, reserved and dependable. He tends to express affection through practical help and attention to detail.",
    woman: "A Virgo woman is usually observant, caring and intelligent. She values a partner who is sincere and respects her need for order and quiet.",
    career:
      "Virgo excels where accuracy and service meet: healthcare, research, editing, analysis, engineering, accounting, nutrition and quality control.",
    bestCareers: ["Doctor, nurse or nutritionist", "Editor or analyst", "Engineer", "Accountant", "Researcher"],
    friendship:
      "Virgo friends are practical and honest, the ones who help you move house and send you the article you needed. They need friends who appreciate quiet loyalty.",
    compat: {
      best: ["Taurus", "Capricorn", "Cancer", "Scorpio"],
      good: ["Virgo", "Pisces"],
      challenging: ["Gemini", "Sagittarius", "Aries"],
      note: "Earth signs share Virgo practicality and Water signs soften its self-criticism. Mutable Air and Fire signs can feel too scattered for Virgo.",
    },
    rising:
      "A Virgo rising looks neat, thoughtful and observant. Others see competence and reserve. Life often asks you to refine skills and be useful in the details.",
    moon:
      "Moon in Virgo processes emotion by analyzing and doing. You feel better when your space is orderly and tasks are done. Practicing self-compassion is the key lesson.",
    faq: [
      { question: "What are Virgo's main traits?", answer: "Analytical, practical, helpful and reliable, with perfectionism and worry as challenges." },
      { question: "Which signs are most compatible with Virgo?", answer: "Taurus and Capricorn share its practical outlook; Cancer and Scorpio offer emotional depth." },
      { question: "What planet rules Virgo?", answer: "Mercury, the planet of analysis and communication." },
      { question: "What are the Virgo dates?", answer: "Approximately August 23 to September 22." },
    ],
  },
  {
    id: "libra",
    rulerPlanet: "Venus",
    tagline: "Graceful, fair-minded and relationship-oriented.",
    symbolMeaning:
      "Libra is the Scales, ♎, and the only zodiac sign represented by an object rather than a creature. The scales stand for justice, balance and weighing both sides before acting.",
    personality: [
      "Libra begins at the autumn equinox, when day and night are equal. Libras value harmony, fairness and beauty, and they tend to be charming, diplomatic and socially skilled. They often notice what is out of balance in a room or a relationship.",
      "Ruled by Venus, Libra loves partnership and aesthetics. The challenge is indecision and conflict avoidance: weighing every option can delay choices, and keeping the peace can mean suppressing honest needs.",
    ],
    strengths: ["Diplomatic and fair", "Charming and sociable", "Strong sense of aesthetics", "Cooperative", "Good at seeing both sides"],
    weaknesses: ["Indecisive", "Avoids conflict", "People-pleasing", "Can be vain or superficial when insecure", "Depends on others' approval"],
    keywords: ["balance", "harmony", "partnership", "beauty", "justice"],
    loveStyle:
      "Libra is the sign of partnership and is often happiest in a committed relationship. They are romantic and attentive and want a partner who values fairness and communication. The lesson is voicing needs rather than keeping the peace.",
    man: "A Libra man is often charming, polite and romantic. He values harmony and tends to be most comfortable with a partner who communicates openly.",
    woman: "A Libra woman is typically graceful, social and thoughtful. She wants a relationship that feels balanced and appreciative.",
    career:
      "Libra suits collaborative, aesthetic or justice-oriented work: law, design, diplomacy, HR, art, fashion, mediation and customer relations.",
    bestCareers: ["Lawyer or mediator", "Designer or stylist", "Diplomat", "HR professional", "Event planner"],
    friendship:
      "Libra friends are great company and good listeners, the ones who bring people together. They need friends who help them make decisions.",
    compat: {
      best: ["Gemini", "Aquarius", "Leo", "Sagittarius"],
      good: ["Libra", "Aries"],
      challenging: ["Cancer", "Capricorn", "Scorpio"],
      note: "Air signs share Libra social, idea-driven nature and Fire signs add excitement. Cardinal Water and Earth signs can feel heavy for Libra.",
    },
    rising:
      "A Libra rising comes across as polished, friendly and diplomatic. Others notice a pleasant manner and good taste. Relationships are a major arena for growth.",
    moon:
      "Moon in Libra feels best in peaceful, balanced surroundings and close relationships. Conflict is stressful, and you often process emotion through talking with a trusted person.",
    faq: [
      { question: "What are Libra's main traits?", answer: "Diplomacy, charm, fairness and a love of beauty, with indecision as a challenge." },
      { question: "Who is Libra most compatible with?", answer: "Gemini and Aquarius share its love of ideas; Leo and Sagittarius add warmth and energy." },
      { question: "What planet rules Libra?", answer: "Venus, the planet of love and harmony." },
      { question: "What are the Libra dates?", answer: "Approximately September 23 to October 22." },
    ],
  },
  {
    id: "scorpio",
    rulerPlanet: "Mars and Pluto",
    tagline: "Intense, private and transformative.",
    symbolMeaning:
      "Scorpio is the Scorpion, ♏, with a barbed tail. In myth Orion was stung by a scorpion sent by Gaia or Artemis, and both were placed in opposite parts of the sky. Scorpio is also associated with the eagle and the phoenix, symbols of transformation and rebirth.",
    personality: [
      "Scorpio falls in deep autumn, when leaves fall and nature turns inward. Scorpios are intense, perceptive and private, with a talent for seeing what lies beneath the surface. They feel deeply but guard their inner world.",
      "Traditionally ruled by Mars and in modern astrology by Pluto, Scorpio is about power, trust and transformation. They are loyal and determined but can become jealous or secretive when afraid of being hurt. The growth edge is vulnerability.",
    ],
    strengths: ["Passionate and determined", "Perceptive and insightful", "Loyal and protective", "Resourceful", "Emotionally deep"],
    weaknesses: ["Secretive", "Jealous or possessive", "Holds grudges", "All-or-nothing thinking", "Slow to trust"],
    keywords: ["intensity", "transformation", "loyalty", "depth", "privacy"],
    loveStyle:
      "Scorpio loves with depth and wants total honesty and loyalty. Trust is earned slowly, but once given it is fierce. They are drawn to emotional intimacy and dislike superficial connections.",
    man: "A Scorpio man is often intense, magnetic and private. He tends to value loyalty and depth and may take time to reveal vulnerability.",
    woman: "A Scorpio woman is usually perceptive, passionate and self-possessed. She wants a partner who is honest and emotionally brave.",
    career:
      "Scorpio is drawn to investigative, psychological or high-stakes work: research, psychology, medicine, finance, law enforcement, strategy and crisis management.",
    bestCareers: ["Psychologist or therapist", "Researcher or investigator", "Surgeon", "Financial analyst", "Strategist"],
    friendship:
      "Scorpio friends are few but fiercely loyal. They are the ones you call in a crisis and need friends who respect their privacy.",
    compat: {
      best: ["Cancer", "Pisces", "Virgo", "Capricorn"],
      good: ["Scorpio", "Taurus"],
      challenging: ["Leo", "Aquarius", "Libra"],
      note: "Water signs share Scorpio emotional depth and Earth signs give it grounding. Fixed Fire and Air signs may clash over control and openness.",
    },
    rising:
      "A Scorpio rising has a magnetic, intense presence. Others may sense depth and mystery and find you hard to read. Life often brings transformation and tests of trust.",
    moon:
      "Moon in Scorpio feels strongly and privately. You need deep trust to open up, and emotional honesty is non-negotiable. Learning to release grudges brings real freedom.",
    faq: [
      { question: "What are Scorpio's main traits?", answer: "Intensity, loyalty, perceptiveness and determination, with secrecy and jealousy as challenges." },
      { question: "Who is Scorpio compatible with?", answer: "Cancer and Pisces share emotional depth; Virgo and Capricorn add stability." },
      { question: "What planet rules Scorpio?", answer: "Traditionally Mars, and in modern astrology Pluto." },
      { question: "What are the Scorpio dates?", answer: "Approximately October 23 to November 21." },
    ],
  },
  {
    id: "sagittarius",
    rulerPlanet: "Jupiter",
    tagline: "Adventurous, optimistic and truth-seeking.",
    symbolMeaning:
      "Sagittarius is the Archer, ♐, an arrow pointing up and to the right, usually pictured as a centaur aiming at the stars. The centaur Chiron, teacher of heroes, is often linked with the sign. It stands for the search for meaning, truth and wide horizons.",
    personality: [
      "Sagittarius arrives in late autumn and looks beyond the horizon. Sagittarians are optimistic, enthusiastic and independent, drawn to travel, philosophy and learning. They are known for humor and honesty, sometimes more blunt than they intend.",
      "Ruled by Jupiter, planet of expansion, Sagittarius tends toward generosity and big ideas. The shadow side is restlessness and overpromising: freedom matters more than details. Growth comes from pairing vision with follow-through.",
    ],
    strengths: ["Optimistic and enthusiastic", "Honest and open-minded", "Adventurous", "Funny and generous", "Great at seeing the big picture"],
    weaknesses: ["Tactless", "Restless", "Overcommits", "Dislikes limits", "Careless with details"],
    keywords: ["adventure", "optimism", "freedom", "truth", "philosophy"],
    loveStyle:
      "Sagittarius wants a partner who is also a travel buddy and best friend. They need freedom and honesty and can feel stifled by possessiveness. They love with enthusiasm and humor.",
    man: "A Sagittarius man is often adventurous, friendly and direct. He tends to value freedom and a partner who shares his curiosity.",
    woman: "A Sagittarius woman is usually independent, upbeat and witty. She wants a relationship that leaves room for adventure and growth.",
    career:
      "Sagittarius thrives in work with freedom, travel and meaning: teaching, publishing, travel, law, philosophy, outdoor industries, international business and entrepreneurship.",
    bestCareers: ["Teacher or professor", "Travel professional", "Writer or publisher", "International business", "Guide or coach"],
    friendship:
      "Sagittarius friends bring laughter, spontaneous plans and honest opinions. They need friends who give them space and enjoy adventure.",
    compat: {
      best: ["Aries", "Leo", "Libra", "Aquarius"],
      good: ["Sagittarius", "Gemini"],
      challenging: ["Virgo", "Pisces", "Taurus"],
      note: "Fire signs share the Sagittarius zest and Air signs match its curiosity. Mutable Earth and Water signs may want more structure or emotional closeness.",
    },
    rising:
      "A Sagittarius rising seems friendly, open and enthusiastic. Others see an adventurous, optimistic person who is easy to talk to. Life invites expansion through travel and learning.",
    moon:
      "Moon in Sagittarius feels best with freedom, movement and optimism. You may rebound from disappointment quickly and need room to explore. Honest conversation helps you stay emotionally connected.",
    faq: [
      { question: "What are Sagittarius' main traits?", answer: "Optimism, honesty, adventurousness and a love of freedom, with tactlessness and restlessness as challenges." },
      { question: "Who is Sagittarius compatible with?", answer: "Aries and Leo share its fire; Libra and Aquarius match its curiosity." },
      { question: "What planet rules Sagittarius?", answer: "Jupiter, planet of growth and wisdom." },
      { question: "What are the Sagittarius dates?", answer: "Approximately November 22 to December 21." },
    ],
  },
  {
    id: "capricorn",
    rulerPlanet: "Saturn",
    tagline: "Disciplined, ambitious and patient.",
    symbolMeaning:
      "Capricorn is the Sea-Goat, ♑, a goat with a fish tail. It echoes the Babylonian goat-fish and the Greek tale of Pan, who leapt into the Nile and transformed. The image shows Capricorn climbing mountains while remaining connected to deep emotional waters.",
    personality: [
      "Capricorn begins at the winter solstice and rules discipline, structure and long-term achievement. Capricorns are responsible, patient and ambitious, often serious in youth and funnier with age. They believe in earning results.",
      "Ruled by Saturn, planet of time and limits, Capricorn is a master of long games. The shadow side is workaholism and emotional reserve. Growth comes from allowing rest, play and vulnerability alongside achievement.",
    ],
    strengths: ["Disciplined and responsible", "Ambitious and patient", "Practical and organized", "Dry sense of humor", "Strong leadership"],
    weaknesses: ["Workaholic", "Pessimistic at times", "Reserved", "Controlling", "Overly focused on status"],
    keywords: ["discipline", "ambition", "responsibility", "patience", "structure"],
    loveStyle:
      "Capricorn takes love seriously and builds relationships carefully. They are loyal, supportive and committed once trust is established. They show love through reliability and shared goals.",
    man: "A Capricorn man is often reserved, ambitious and steady. He tends to show affection through providing, planning and commitment.",
    woman: "A Capricorn woman is usually composed, determined and loyal. She values a partner who respects her goals and is dependable.",
    career:
      "Capricorn does well in structured, high-responsibility careers: management, finance, engineering, law, government, construction and entrepreneurship.",
    bestCareers: ["Executive or manager", "Engineer", "Financial advisor", "Lawyer", "Architect"],
    friendship:
      "Capricorn friends are dependable and quietly caring. They are the ones who help you plan your future and need friends who help them relax.",
    compat: {
      best: ["Taurus", "Virgo", "Scorpio", "Pisces"],
      good: ["Capricorn", "Cancer"],
      challenging: ["Aries", "Libra", "Gemini"],
      note: "Earth signs share Capricorn practical drive and Water signs soften its reserve. Cardinal Fire and Air signs may feel too impulsive or inconsistent.",
    },
    rising:
      "A Capricorn rising comes across as composed, mature and capable. Others may see you as serious and reliable. Life often calls you to take on responsibility early.",
    moon:
      "Moon in Capricorn feels cautiously and privately. You may suppress feelings to keep functioning and feel safest with structure. Learning to rest and ask for support is key.",
    faq: [
      { question: "What are Capricorn's main traits?", answer: "Discipline, ambition, responsibility and patience, with workaholism and reserve as challenges." },
      { question: "Who is Capricorn compatible with?", answer: "Taurus and Virgo share its practical outlook; Scorpio and Pisces add emotional depth." },
      { question: "What planet rules Capricorn?", answer: "Saturn, the planet of structure, time and discipline." },
      { question: "What are the Capricorn dates?", answer: "Approximately December 22 to January 19." },
    ],
  },
  {
    id: "aquarius",
    rulerPlanet: "Saturn and Uranus",
    tagline: "Independent, inventive and humanitarian.",
    symbolMeaning:
      "Aquarius is the Water Bearer, ♒, two wavy lines. Despite its name, Aquarius is an Air sign: the water carried is knowledge poured out for humanity. In myth the figure is often linked to Ganymede, cupbearer to the gods.",
    personality: [
      "Aquarius arrives in mid-winter and looks to the future. Aquarians are original, independent and idealistic, often drawn to science, technology and social causes. They like to question convention and value freedom of thought.",
      "Traditionally ruled by Saturn and in modern astrology by Uranus, Aquarius mixes structure with rebellion. The shadow side is emotional detachment and stubbornness about their views. Growth means bringing warmth to ideals.",
    ],
    strengths: ["Original and inventive", "Independent", "Humanitarian", "Intellectual", "Open-minded about differences"],
    weaknesses: ["Emotionally detached", "Stubborn about opinions", "Unpredictable", "Rebels for its own sake", "Can seem aloof"],
    keywords: ["innovation", "independence", "humanitarianism", "intellect", "originality"],
    loveStyle:
      "Aquarius loves friendship first and needs intellectual connection and freedom. They are loyal but may keep emotional distance. A partner who is also a best friend and respects space suits them well.",
    man: "An Aquarius man is often independent, curious and unconventional. He values mental connection and room to be himself.",
    woman: "An Aquarius woman is usually original, social and thoughtful. She wants a partner who respects her independence and shares her ideals.",
    career:
      "Aquarius shines in innovative, technical or cause-driven work: technology, science, social impact, research, design, engineering and entrepreneurship.",
    bestCareers: ["Software or data professional", "Scientist", "Activist or nonprofit leader", "Inventor", "UX researcher"],
    friendship:
      "Aquarius friends are loyal, unusual and interesting, the people with the strangest facts and the best ideas. They need friends who accept their independence.",
    compat: {
      best: ["Gemini", "Libra", "Aries", "Sagittarius"],
      good: ["Aquarius", "Leo"],
      challenging: ["Taurus", "Scorpio", "Cancer"],
      note: "Air signs match Aquarius mind and Fire signs share its drive for freedom. Fixed Earth and Water signs may want more emotional closeness than Aquarius offers easily.",
    },
    rising:
      "An Aquarius rising comes across as distinctive, friendly and slightly detached. Others see an original thinker. Life asks you to find your own path.",
    moon:
      "Moon in Aquarius processes emotion through thought and space. You may feel more comfortable discussing ideas than feelings and recharge through time alone or with friends.",
    faq: [
      { question: "What are Aquarius' main traits?", answer: "Originality, independence, intellect and humanitarian ideals, with emotional detachment as a challenge." },
      { question: "Who is Aquarius compatible with?", answer: "Gemini and Libra share its love of ideas; Aries and Sagittarius bring energy." },
      { question: "What planet rules Aquarius?", answer: "Traditionally Saturn, in modern astrology Uranus." },
      { question: "What are the Aquarius dates?", answer: "Approximately January 20 to February 18." },
    ],
  },
  {
    id: "pisces",
    rulerPlanet: "Jupiter and Neptune",
    tagline: "Imaginative, compassionate and deeply intuitive.",
    symbolMeaning:
      "Pisces is the Fish, ♓, two fish swimming in opposite directions tied by a cord. In myth Aphrodite and Eros turned into fish to escape the monster Typhon. The image reflects Pisces duality: the pull between everyday reality and the imagination.",
    personality: [
      "Pisces closes the zodiac at the end of winter and holds a little of every sign. Pisceans are empathetic, creative and dreamy, often absorbing the moods of those around them. They have a rich inner life and a strong need for beauty and meaning.",
      "Traditionally ruled by Jupiter and in modern astrology by Neptune, Pisces is the sign of compassion and imagination. The shadow side is escapism and weak boundaries. Growth comes from grounding dreams in routine and protecting energy.",
    ],
    strengths: ["Compassionate and empathetic", "Creative and imaginative", "Intuitive", "Gentle and accepting", "Adaptable"],
    weaknesses: ["Escapist", "Overly trusting", "Avoids hard truths", "Absorbs others' moods", "Indecisive"],
    keywords: ["compassion", "imagination", "intuition", "empathy", "dreams"],
    loveStyle:
      "Pisces loves romantically and selflessly. They want a soul-level connection and can idealize partners. Clear boundaries and honest communication protect their generous hearts.",
    man: "A Pisces man is often gentle, artistic and emotionally attuned. He tends to value a deep, sincere connection.",
    woman: "A Pisces woman is usually intuitive, kind and imaginative. She wants a partner who is tender, honest and supportive of her creativity.",
    career:
      "Pisces thrives in creative and caring work: art, music, writing, healing, counseling, film, spirituality and nonprofit roles.",
    bestCareers: ["Artist or musician", "Therapist or counselor", "Nurse or caregiver", "Writer", "Photographer or filmmaker"],
    friendship:
      "Pisces friends are empathetic listeners and imaginative companions. They need friends who are patient and gentle when they are overwhelmed.",
    compat: {
      best: ["Cancer", "Scorpio", "Taurus", "Capricorn"],
      good: ["Pisces", "Virgo"],
      challenging: ["Gemini", "Sagittarius", "Aquarius"],
      note: "Water signs share Pisces emotional depth and Earth signs ground its dreams. Mutable Air and Fire signs can feel too restless or blunt for Pisces.",
    },
    rising:
      "A Pisces rising looks soft, dreamy and approachable. Others sense empathy and imagination. Life often teaches you to balance sensitivity with boundaries.",
    moon:
      "Moon in Pisces is a deeply sensitive placement. You absorb the moods around you and need quiet, art or water to recharge. Protecting your energy is a lifelong practice.",
    faq: [
      { question: "What are Pisces' main traits?", answer: "Compassion, imagination and intuition, with escapism and weak boundaries as challenges." },
      { question: "Who is Pisces compatible with?", answer: "Cancer and Scorpio share emotional depth; Taurus and Capricorn add grounding." },
      { question: "What planet rules Pisces?", answer: "Traditionally Jupiter, in modern astrology Neptune." },
      { question: "What are the Pisces dates?", answer: "Approximately February 19 to March 20." },
    ],
  },
];
export const ZODIAC_PROFILES: ZodiacProfile[] = fromContent("zodiac_profiles", ZODIAC_PROFILES_DEFAULT);

export const ZODIAC_PROFILE_BY_ID: Record<string, ZodiacProfile> = Object.fromEntries(
  ZODIAC_PROFILES.map((p) => [p.id, p])
);
