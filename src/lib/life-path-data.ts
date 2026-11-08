export interface LifePathFAQ {
  question: string;
  answer: string;
}

export interface LifePathEntry {
  number: number;
  slug: string;
  isMaster: boolean;
  archetype: string;
  tagline: string;
  overview: string[];
  strengths: string[];
  challenges: string[];
  love: string;
  career: string;
  money: string;
  compatibility: { best: number[]; challenging: number[]; note: string };
  lesson: string;
  growth: string[];
  faq: LifePathFAQ[];
}

export const LIFE_PATH_ENTRIES: LifePathEntry[] = [
  {
    number: 1,
    slug: "life-path-number-1",
    isMaster: false,
    archetype: "The Pioneer",
    tagline: "Independence, initiative and the courage to go first.",
    overview: [
      "In Pythagorean numerology, the number 1 is the beginning of every sequence: the single point from which everything else grows. People with a Life Path 1 are described as natural starters. They tend to be self-directed, competitive in a healthy way, and uncomfortable when asked to follow instructions they did not help shape.",
      "The core theme of this path is learning to lead from confidence rather than ego. Early in life a Life Path 1 often feels they must prove themselves alone. With maturity the lesson shifts toward collaboration: leadership that makes room for other people's ideas is stronger than leadership that only needs to win.",
    ],
    strengths: [
      "Decisive and willing to act before everyone else feels ready",
      "Strong sense of personal vision and self-reliance",
      "Resilient after setbacks; tends to restart rather than quit",
      "Inspires others through example",
    ],
    challenges: [
      "Impatience with slower or more cautious people",
      "Difficulty asking for help or admitting uncertainty",
      "A tendency to dominate conversations and decisions",
      "Loneliness that comes from carrying everything alone",
    ],
    love: "A Life Path 1 needs a partner who respects their independence but is not afraid to push back. Relationships go best when both people have their own goals. The growth edge in love is vulnerability: saying \"I need you\" without feeling it weakens them.",
    career: "Entrepreneurship, management, product leadership, freelancing, sports, and any role with ownership and clear results suit this path. Rigid hierarchies and micromanagement are common sources of burnout for a 1.",
    money: "Typically motivated by autonomy rather than luxury. Money is a tool for freedom. The risk is overconfident one-shot bets; steady reserves help a 1 take bold risks safely.",
    compatibility: {
      best: [3, 5, 6],
      challenging: [1, 4, 8],
      note: "Numerology compatibility is a reflection tool, not a rule. Two Life Path 1s can thrive together if they agree on who leads which area of life.",
    },
    lesson: "Lead without needing to be alone at the top.",
    growth: [
      "Ask one trusted person for feedback before each major decision this month.",
      "Practice finishing other people's sentences less and asking one more question instead.",
      "Celebrate a result that came from teamwork, not only solo effort.",
    ],
    faq: [
      { question: "Is Life Path 1 the strongest life path?", answer: "No. Numerology does not rank the numbers. Each path has its own strengths and its own lessons; the 1 simply carries the theme of initiative." },
      { question: "What careers fit a Life Path 1?", answer: "Roles with autonomy and ownership: founder, team lead, consultant, creative director, athlete or independent professional." },
      { question: "Which life path numbers are most compatible with a 1?", answer: "Traditional numerology often pairs 1 with 3, 5 and 6 for energy and balance, but healthy relationships depend on communication far more than on numbers." },
    ],
  },
  {
    number: 2,
    slug: "life-path-number-2",
    isMaster: false,
    archetype: "The Peacemaker",
    tagline: "Partnership, sensitivity and quiet strength.",
    overview: [
      "The number 2 represents duality and relationship: one plus one. A Life Path 2 is usually perceptive, diplomatic, and attuned to the emotional temperature of a room. Where a 1 acts, a 2 listens first and notices what everyone else is feeling.",
      "The central lesson is balancing care for others with care for oneself. Because a 2 is so good at reading people, they can slip into pleasing everyone and losing track of their own wants. Mature 2s learn that honest boundaries are what make deep cooperation possible.",
    ],
    strengths: [
      "Empathy and an instinct for fairness",
      "Excellent mediator and listener",
      "Patience with detail and long processes",
      "Loyal and dependable in relationships",
    ],
    challenges: [
      "Avoiding conflict until resentment builds",
      "Taking criticism very personally",
      "Indecision when every option affects someone else",
      "Over-giving to people who do not reciprocate",
    ],
    love: "Partnership is the natural home of the 2. They tend to be attentive, romantic and committed. The risk is losing themselves in the relationship, so clear communication about needs matters more for a 2 than for most paths.",
    career: "Counseling, teaching, healthcare, HR, design, mediation, administration and collaborative creative work. A 2 shines in supporting roles that quietly make a team function.",
    money: "Often prefers security and shared financial planning. They do well with budgets and long-term savings but may under-charge for their work; practicing a firm quote is a useful habit.",
    compatibility: {
      best: [4, 6, 8],
      challenging: [1, 5, 9],
      note: "A 2 often balances a more driven partner. Trouble appears when the partner never asks what the 2 actually wants.",
    },
    lesson: "Be kind to others without disappearing yourself.",
    growth: [
      "Say no to one small request this week without over-explaining.",
      "Write down three things you want, independent of anyone else.",
      "Raise one minor disagreement early instead of letting it grow.",
    ],
    faq: [
      { question: "Is a Life Path 2 weak because they are gentle?", answer: "No. Gentleness paired with persistence is a form of strength. Many 2s hold a team or family together behind the scenes." },
      { question: "Why do 2s struggle with decisions?", answer: "They weigh how each option affects others. Setting a deadline and a simple decision rule helps." },
      { question: "What is the difference between Life Path 2 and 11?", answer: "An 11 is a master number that reduces to 2 and carries the same relational theme at a more intense, intuitive pitch." },
    ],
  },
  {
    number: 3,
    slug: "life-path-number-3",
    isMaster: false,
    archetype: "The Communicator",
    tagline: "Creativity, expression and joy.",
    overview: [
      "The number 3 is associated with growth and expression: a combination of the beginning (1) and the relationship (2) produces something new. A Life Path 3 tends to be expressive, curious and socially magnetic, with a gift for words, humor or visual storytelling.",
      "The lesson of this path is discipline. Ideas arrive easily, but the work of finishing them is the real test. Threes who commit to craft rather than only inspiration tend to become the artists, writers and performers others remember.",
    ],
    strengths: [
      "Natural storyteller and communicator",
      "Optimistic; lifts the mood of groups",
      "Creative problem-solving and quick wit",
      "Adaptable and open to new experiences",
    ],
    challenges: [
      "Scattering energy across too many projects",
      "Using humor to avoid difficult emotions",
      "Sensitivity to criticism hidden behind charm",
      "Procrastination when work stops feeling fun",
    ],
    love: "Playful, affectionate and communicative partners. A 3 needs a relationship with laughter and conversation. The growth edge is staying present during serious discussions rather than deflecting with a joke.",
    career: "Writing, marketing, media, teaching, entertainment, design, social entrepreneurship, public speaking and sales. Anywhere creative expression is the product.",
    money: "Income can be irregular when creativity leads the way. Building a stable base (a retainer, a day job or recurring revenue) frees a 3 to take creative risks without anxiety.",
    compatibility: {
      best: [1, 5, 7],
      challenging: [4, 8],
      note: "A 3 pairs well with someone who enjoys their energy and also helps them finish what they start.",
    },
    lesson: "Turn inspiration into finished work.",
    growth: [
      "Choose one project and finish it before starting another.",
      "Schedule creative time like an appointment, not a mood.",
      "Share one honest feeling this week without softening it with humor.",
    ],
    faq: [
      { question: "Are Life Path 3s always extroverts?", answer: "Not necessarily. Many are introverted creators who express themselves through writing, art or music rather than in crowds." },
      { question: "What is the biggest weakness of a Life Path 3?", answer: "Scattered focus. The cure is a small number of committed projects and regular deadlines." },
      { question: "Is 3 a lucky number in numerology?", answer: "Traditions vary. In many numerology systems it is linked with creativity and growth rather than luck." },
    ],
  },
  {
    number: 4,
    slug: "life-path-number-4",
    isMaster: false,
    archetype: "The Builder",
    tagline: "Structure, reliability and long-term craft.",
    overview: [
      "The number 4 is the shape of foundations: four corners, four seasons, four directions. A Life Path 4 is practical, methodical and trusted to deliver. Where others talk about plans, a 4 quietly builds the thing.",
      "The lesson is flexibility. Because routine feels safe, a 4 can cling to systems that no longer serve them. The most fulfilled 4s keep their discipline while allowing room for spontaneity and change.",
    ],
    strengths: [
      "Dependable, honest and hard-working",
      "Excellent at planning, organization and follow-through",
      "Patient with long projects",
      "Strong sense of responsibility",
    ],
    challenges: [
      "Rigidity and resistance to change",
      "Workaholism and difficulty resting",
      "Stubbornness in disagreements",
      "Overlooking emotional needs in favor of tasks",
    ],
    love: "Loyal and steady, a 4 shows love through actions: fixing things, showing up, planning the future. They may need to practice saying affectionate words aloud and making time for play.",
    career: "Engineering, construction, accounting, project management, operations, law, software architecture, farming and any craft requiring precision and consistency.",
    money: "Usually careful with money and good at saving. A 4 builds wealth slowly and reliably; the risk is being so cautious that opportunities pass by.",
    compatibility: {
      best: [2, 6, 8],
      challenging: [1, 3, 5],
      note: "Fast-moving, unpredictable partners can unsettle a 4, but they also teach the 4 flexibility when both sides communicate.",
    },
    lesson: "Build a life that is stable and still alive.",
    growth: [
      "Plan one unscheduled afternoon per week.",
      "Try a different approach to one routine task.",
      "Tell someone you appreciate them in words, not only actions.",
    ],
    faq: [
      { question: "Is Life Path 4 boring?", answer: "Not at all. Fours are often deeply loyal and quietly funny. Their strength is depth and reliability rather than novelty." },
      { question: "What jobs suit a Life Path 4?", answer: "Structured, skill-based roles such as engineering, finance, operations, architecture and skilled trades." },
      { question: "How does 4 relate to master number 22?", answer: "22 reduces to 4 and is the master builder: the same practical gifts directed at large-scale projects." },
    ],
  },
  {
    number: 5,
    slug: "life-path-number-5",
    isMaster: false,
    archetype: "The Explorer",
    tagline: "Freedom, change and adventure.",
    overview: [
      "The number 5 sits at the center of the single digits and represents movement. A Life Path 5 craves variety, travel, new skills and new people. They tend to be adaptable, quick learners who get restless in repetitive environments.",
      "The lesson is commitment. Freedom is not the absence of responsibility but the ability to choose it deliberately. Fives who find a few things worth committing to discover that depth can feel as liberating as novelty.",
    ],
    strengths: [
      "Adaptability and curiosity",
      "Persuasive and charming communicators",
      "Comfortable with risk and change",
      "Quick to learn and to connect ideas",
    ],
    challenges: [
      "Restlessness and boredom",
      "Difficulty sustaining commitments",
      "Impulsive spending or decisions",
      "Overindulgence when seeking stimulation",
    ],
    love: "A 5 wants a partner who is also an adventure companion and who does not try to cage them. Trust and shared experiences matter more than rules. The growth edge is showing up consistently, not just in exciting moments.",
    career: "Travel, journalism, sales, consulting, technology, entrepreneurship, event work and roles with variety and autonomy. Fixed desk routines drain a 5.",
    money: "Income may fluctuate and spending can be impulsive. Automating savings and keeping a small \"freedom fund\" lets a 5 stay flexible without panic.",
    compatibility: {
      best: [1, 3, 7],
      challenging: [2, 4, 6],
      note: "Partners who need heavy routine can clash with a 5 unless both agree on a balance of stability and freedom.",
    },
    lesson: "Use freedom to choose commitment, not to avoid it.",
    growth: [
      "Pick one long-term goal and commit to a weekly action.",
      "Wait 24 hours before any non-essential purchase.",
      "Notice what you are seeking when you feel restless.",
    ],
    faq: [
      { question: "Why do Life Path 5s get bored so easily?", answer: "Their path is about experience and change. Building variety into work and life, within a stable base, helps." },
      { question: "Is a 5 bad at relationships?", answer: "No, but they need honesty about freedom early. Many 5s are loyal when the relationship feels like a choice." },
      { question: "What is the best career for a 5?", answer: "Varied, people-facing, autonomous work such as consulting, travel, media or entrepreneurship." },
    ],
  },
  {
    number: 6,
    slug: "life-path-number-6",
    isMaster: false,
    archetype: "The Nurturer",
    tagline: "Care, responsibility and harmony.",
    overview: [
      "The number 6 is tied to home, family and service. A Life Path 6 is often the person others turn to for support: warm, responsible and invested in making their environment beautiful and fair.",
      "The lesson is releasing the need to fix everyone. A 6 who carries too many burdens becomes resentful. Healthy sixes support people while trusting them to take responsibility for their own lives.",
    ],
    strengths: [
      "Caring, loyal and generous",
      "Strong sense of justice and responsibility",
      "Talent for creating comfortable, beautiful spaces",
      "Natural counselor and community builder",
    ],
    challenges: [
      "Perfectionism and over-responsibility",
      "Meddling or controlling out of love",
      "Difficulty receiving help",
      "Self-sacrifice that turns into resentment",
    ],
    love: "Devoted partner and parent. A 6 seeks a committed, stable relationship. Learning to ask for care in return keeps the relationship balanced.",
    career: "Teaching, nursing, therapy, social work, hospitality, interior design, nonprofit leadership, family business and community roles.",
    money: "Spends generously on family and home. A 6 benefits from a personal budget line that is explicitly for themselves.",
    compatibility: {
      best: [1, 2, 4, 9],
      challenging: [5, 7],
      note: "Sixes thrive with partners who appreciate their care and share the load at home.",
    },
    lesson: "Care for others without carrying everyone.",
    growth: [
      "Let someone else handle one task you usually manage.",
      "Schedule one hour per week that serves only you.",
      "Offer support by asking, \"What would help?\" instead of assuming.",
    ],
    faq: [
      { question: "Why is Life Path 6 called the nurturer?", answer: "The number 6 is associated with home, family and service, which shows up as a strong caretaking instinct." },
      { question: "What is a Life Path 6's biggest challenge?", answer: "Over-responsibility and perfectionism. Setting boundaries is the main practice." },
      { question: "What careers suit a 6?", answer: "Caring and service professions, education, design and community leadership." },
    ],
  },
  {
    number: 7,
    slug: "life-path-number-7",
    isMaster: false,
    archetype: "The Seeker",
    tagline: "Analysis, introspection and the search for truth.",
    overview: [
      "The number 7 is the thinker and the mystic. A Life Path 7 is analytical, private and driven to understand how things really work, whether that is science, philosophy, psychology or spirituality.",
      "The lesson is trust, both in other people and in intuition. A 7 can retreat into their head and keep others at a distance. Growth comes from sharing the inner world and letting knowledge become wisdom through lived relationships.",
    ],
    strengths: [
      "Deep analytical and research ability",
      "Intuitive and reflective",
      "Independent thinker with high standards",
      "Comfortable with solitude and focus",
    ],
    challenges: [
      "Isolation and emotional guardedness",
      "Skepticism that slides into cynicism",
      "Perfectionism and overthinking",
      "Difficulty explaining feelings",
    ],
    love: "A 7 needs a partner who respects alone time and enjoys deep conversation. Intimacy builds slowly. Telling a partner what is going on inside, even imperfectly, is the key practice.",
    career: "Research, science, programming, writing, analysis, psychology, philosophy, spiritual teaching and investigative work.",
    money: "Rarely motivated by status. A 7 earns well through expertise. They benefit from letting a trusted advisor handle the practical side so they can stay in their strengths.",
    compatibility: {
      best: [3, 5, 9],
      challenging: [6, 8],
      note: "Sevens do best with partners who give them space and do not take quiet as rejection.",
    },
    lesson: "Let wisdom become connection.",
    growth: [
      "Share one thought you normally keep to yourself.",
      "Spend time in nature or movement to rest the analytical mind.",
      "Ask yourself whether doubt is protecting you or just habit.",
    ],
    faq: [
      { question: "Is a Life Path 7 spiritual?", answer: "Many are drawn to philosophy or spirituality, but the 7 is equally the scientist. The shared trait is a hunger for truth." },
      { question: "Why do 7s seem distant?", answer: "They recharge alone and process internally. It is usually not a lack of care." },
      { question: "What is the best job for a 7?", answer: "Work that rewards deep focus and expertise, such as research, engineering, writing or analysis." },
    ],
  },
  {
    number: 8,
    slug: "life-path-number-8",
    isMaster: false,
    archetype: "The Powerhouse",
    tagline: "Ambition, authority and material mastery.",
    overview: [
      "The number 8 is linked with power, achievement and the flow of resources. A Life Path 8 is typically ambitious, organized and comfortable with responsibility and scale. They are drawn to results that can be measured.",
      "The lesson concerns the right use of power. An 8 learns that influence and money are tools; the question is whom they serve. Eights who combine drive with integrity build lasting success.",
    ],
    strengths: [
      "Strategic thinking and executive ability",
      "Resilience and capacity for hard work",
      "Natural authority and presence",
      "Skill with money, systems and people",
    ],
    challenges: [
      "Workaholism and status focus",
      "Controlling or domineering behavior",
      "Equating self-worth with achievement",
      "Difficulty with vulnerability",
    ],
    love: "An 8 shows love through providing and protecting. The growth edge is emotional presence: time and attention rather than only resources.",
    career: "Business leadership, finance, law, real estate, executive management, entrepreneurship and large-scale organizing.",
    money: "Often the number most associated with material success. Long-term thinking and diversification protect an 8 from the boom-and-bust swings their ambition can create.",
    compatibility: {
      best: [2, 4, 6],
      challenging: [1, 7, 8],
      note: "Two strong wills need clear agreements about decision-making.",
    },
    lesson: "Use power to build, not to control.",
    growth: [
      "Take one full day off without checking work.",
      "Give time or money to something with no return.",
      "Ask for input from someone who will tell you the truth.",
    ],
    faq: [
      { question: "Are Life Path 8s always rich?", answer: "No. The 8 carries the theme of power and resources, but outcomes depend on choices. Some 8s learn the lesson through losses." },
      { question: "Is Life Path 8 good for business?", answer: "Traditionally yes: the number is tied to organization, leadership and ambition." },
      { question: "What is the 8 lesson in relationships?", answer: "Trading control for trust and showing up emotionally." },
    ],
  },
  {
    number: 9,
    slug: "life-path-number-9",
    isMaster: false,
    archetype: "The Humanitarian",
    tagline: "Compassion, completion and a wide perspective.",
    overview: [
      "The number 9 completes the cycle of single digits, so it carries themes of endings, wisdom and service. A Life Path 9 is usually idealistic, compassionate and concerned with the larger picture.",
      "The lesson is letting go. Nines often hold on to old wounds or old versions of themselves. When they release what is finished, they become some of the most generous and inspiring people around.",
    ],
    strengths: [
      "Compassion and generosity",
      "Broad perspective and creativity",
      "Charismatic and inspiring to others",
      "Comfort with endings and change",
    ],
    challenges: [
      "Difficulty letting go of the past",
      "Resentment when giving is not appreciated",
      "Idealism that clashes with reality",
      "Scattered boundaries",
    ],
    love: "Romantic and giving, a 9 loves deeply. They benefit from clear boundaries and from not trying to rescue partners. Closure after breakups takes them longer than most.",
    career: "Humanitarian work, medicine, teaching, the arts, advocacy, nonprofit leadership and creative fields with a message.",
    money: "Money is secondary to meaning. A 9 does well when work aligns with values and when someone helps them price their work fairly.",
    compatibility: {
      best: [3, 6, 7],
      challenging: [1, 2, 8],
      note: "A 9 thrives with partners who share their sense of purpose.",
    },
    lesson: "Give fully and release gracefully.",
    growth: [
      "Write a letter you do not send to close something unfinished.",
      "Pick one cause and commit to it for a year.",
      "Receive a favor without repaying it immediately.",
    ],
    faq: [
      { question: "Why is 9 called the completion number?", answer: "It is the last single digit, so it symbolizes finishing a cycle and carrying forward its wisdom." },
      { question: "Are 9s selfless?", answer: "They tend to be giving, but healthy 9s also meet their own needs. Sustainable generosity needs boundaries." },
      { question: "What careers suit a 9?", answer: "Meaningful, service-oriented or creative work: health, education, art, advocacy." },
    ],
  },
  {
    number: 11,
    slug: "life-path-number-11",
    isMaster: true,
    archetype: "The Illuminator",
    tagline: "A master number of intuition, inspiration and sensitivity.",
    overview: [
      "In most numerology systems 11 is a master number: a doubled 1 that is not reduced to 2 when it appears as your Life Path. It is associated with heightened intuition, idealism and the ability to inspire others by example.",
      "An 11 often feels things intensely and may experience anxiety or self-doubt before learning to channel that sensitivity. The task is to ground big ideas in practical routines so inspiration becomes something real.",
    ],
    strengths: [
      "Strong intuition and empathy",
      "Visionary ideas and spiritual curiosity",
      "Ability to inspire and uplift",
      "Artistic or teaching talent",
    ],
    challenges: [
      "Nervous tension and overstimulation",
      "Unrealistic expectations of self and others",
      "Withdrawal when overwhelmed",
      "Difficulty with practical follow-through",
    ],
    love: "Looks for a soulful, deep connection. An 11 needs a calm partner who respects sensitivity. Grounding routines support the relationship.",
    career: "Teaching, counseling, writing, art, music, healing professions, spiritual guidance, innovation and design.",
    money: "Money often follows purpose. Practical help with budgeting and boundaries is valuable.",
    compatibility: {
      best: [2, 6, 22],
      challenging: [4, 8],
      note: "Gentle, steady partners balance the 11's intensity.",
    },
    lesson: "Ground inspiration into daily practice.",
    growth: [
      "Build a simple daily routine for sleep, movement and quiet.",
      "Turn one idea into a small concrete action this week.",
      "Notice when sensitivity is intuition and when it is anxiety.",
    ],
    faq: [
      { question: "Is 11 a master number?", answer: "Yes. In Pythagorean numerology 11, 22 and 33 are master numbers and are not reduced when they appear as your Life Path." },
      { question: "Is Life Path 11 the same as 2?", answer: "11 reduces to 2 and shares its relational themes, but carries a more intense, intuitive character." },
      { question: "Is being an 11 harder than other numbers?", answer: "It can feel more intense because of sensitivity. Support and grounding practices make a large difference." },
    ],
  },
  {
    number: 22,
    slug: "life-path-number-22",
    isMaster: true,
    archetype: "The Master Builder",
    tagline: "A master number that turns vision into large-scale reality.",
    overview: [
      "22 is called the master builder because it combines the intuition of 11 with the practicality of 4. In numerology it points to the capacity to build something that outlasts the individual, such as an organization, a system or a community.",
      "The challenge is the weight of potential. A 22 can feel pressure to achieve something enormous and either overwork or freeze. Growth comes from starting small, consistently, with a clear plan.",
    ],
    strengths: [
      "Rare mix of vision and practicality",
      "Leadership at scale",
      "Perseverance and organization",
      "Ability to unite people around a goal",
    ],
    challenges: [
      "Self-imposed pressure and perfectionism",
      "Procrastination from fear of falling short",
      "Burnout from carrying large responsibilities",
      "Difficulty delegating",
    ],
    love: "Committed and serious about building a shared life. A 22 benefits from protecting time for romance outside of projects.",
    career: "Architecture, engineering, large-scale business, public policy, nonprofit founding, infrastructure and system design.",
    money: "Has strong potential for lasting wealth when focused. Boundaries between ambition and rest protect health.",
    compatibility: {
      best: [4, 6, 11],
      challenging: [3, 5],
      note: "Supportive partners who value the long game help a 22 stay balanced.",
    },
    lesson: "Build something meaningful, one practical step at a time.",
    growth: [
      "Break your largest goal into a ninety-day plan.",
      "Delegate one task you would normally control.",
      "Block weekly rest as a non-negotiable.",
    ],
    faq: [
      { question: "What does Life Path 22 mean?", answer: "It is the master builder: a number linked with turning large visions into practical, lasting structures." },
      { question: "Is 22 rarer than other life paths?", answer: "A master-number total is less common than a reduced single digit, but the exact frequency depends on the calendar of birth dates." },
      { question: "Do I have to live as a 22 or can I live as a 4?", answer: "Many numerologists say you can express both: the 4 as the everyday foundation and the 22 as the larger aspiration." },
    ],
  },
  {
    number: 33,
    slug: "life-path-number-33",
    isMaster: true,
    archetype: "The Master Teacher",
    tagline: "A master number of compassion and service.",
    overview: [
      "33 is the rarest of the master numbers in most systems and is associated with selfless service, healing and teaching. It blends the creativity of 3 with the nurturing devotion of 6, doubled.",
      "People with this path often feel called to support others on a large scale. The risk is self-neglect: carrying everyone's pain while ignoring personal needs. Mature 33s learn to serve from a full cup.",
    ],
    strengths: [
      "Deep compassion and generosity",
      "Gift for teaching and healing",
      "Creativity directed toward service",
      "Ability to comfort and uplift others",
    ],
    challenges: [
      "Martyrdom and burnout",
      "Unrealistic standards of selflessness",
      "Absorbing other people's emotions",
      "Difficulty receiving support",
    ],
    love: "Loving, protective and idealistic. A 33 needs a partner who looks after them too.",
    career: "Counseling, teaching, ministry, healthcare, arts for social good, nonprofit leadership and community care.",
    money: "Often undervalues own work. Fair pricing and clear boundaries sustain the mission.",
    compatibility: {
      best: [6, 9, 11],
      challenging: [1, 8],
      note: "Reciprocal partners who nurture the nurturer are best.",
    },
    lesson: "Serve others without sacrificing yourself.",
    growth: [
      "Schedule recovery time after emotionally heavy days.",
      "Practice receiving help openly.",
      "Define the limits of what you can offer.",
    ],
    faq: [
      { question: "Is Life Path 33 real?", answer: "33 is recognized as a master number in many numerology systems, though some practitioners reduce it to 6." },
      { question: "How is 33 different from 6?", answer: "33 reduces to 6 and shares its caring nature, but is described as a more intense calling to serve." },
      { question: "Why is 33 considered rare?", answer: "It requires a specific digit sum in your birth date, which happens less often than the other totals." },
    ],
  },
];

export const LIFE_PATH_BY_NUMBER: Record<number, LifePathEntry> = Object.fromEntries(
  LIFE_PATH_ENTRIES.map((e) => [e.number, e])
);

/**
 * Pythagorean Life Path: reduce month, day and year separately, add them, then reduce again.
 * Master numbers 11, 22 and 33 are kept when they appear at any stage of the final reduction.
 */
export function reduceNumber(n: number): number {
  while (n > 9 && n !== 11 && n !== 22 && n !== 33) {
    n = String(n)
      .split("")
      .reduce((a, d) => a + Number(d), 0);
  }
  return n;
}

export function calculateLifePath(year: number, month: number, day: number): { number: number; steps: string[] } {
  const y = reduceNumber(year);
  const m = reduceNumber(month);
  const d = reduceNumber(day);
  const total = y + m + d;
  const result = reduceNumber(total);
  const steps = [
    `Month ${month} → ${m}`,
    `Day ${day} → ${d}`,
    `Year ${year} → ${y}`,
    `${m} + ${d} + ${y} = ${total}${total !== result ? ` → ${result}` : ""}`,
  ];
  return { number: result, steps };
}
