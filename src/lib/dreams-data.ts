export interface DreamVariation {
  scenario: string;
  meaning: string;
  psychologicalContext: string;
}

export interface DreamFAQ {
  question: string;
  answer: string;
}

export interface DreamEntry {
  slug: string;
  title: string;
  subtitle: string;
  category: "Animals" | "Nature & Elements" | "Physical States" | "Relationships" | "Symbols";
  readTime: string;
  quickAnswer: string;
  neurobiology: string;
  psychological: string;
  historicalMythology: string;
  spiritual: string;
  variations: DreamVariation[];
  journalPrompts: string[];
  actionAdvice: string;
  tarotCardEcho: string;
  faq: DreamFAQ[];
}

const BASE_DREAMS: DreamEntry[] = [
  {
    slug: "pregnancy-dream-meaning",
    title: "Pregnancy Dream Meaning: Gestating New Beginnings, Creativity & Life Birth",
    subtitle: "What it means to dream of being pregnant, giving birth, or carrying twins when you're not pregnant in waking life.",
    category: "Physical States",
    readTime: "9 min read",
    quickAnswer: "Dreaming of pregnancy rarely predicts literal physical conception. Instead, it symbolizes the inner gestation of a revolutionary creative project, a spiritual rebirth, or a subconscious transformation preparing to emerge into your physical reality.",
    neurobiology: "During REM sleep, hormonal fluctuations (such as luteal phase progesterone or cortisol shifts) interact with the brain's insular cortex—the region responsible for interoceptive somatic awareness. When the brain detects internal bodily changes or heightened emotional vulnerability, the default mode network (DMN) translates these sensations into visceral archetypal dreams of carrying life within one's belly.",
    psychological: "In Carl Jung's analytical psychology, pregnancy is the ultimate symbol of the creative unconscious incubating the 'Transcendent Function.' You are pregnant with unmanifest potential: a novel career path, an artistic breakthrough, or a profound shift in self-concept. If the pregnancy brings anxiety in the dream, it mirrors fear of unreadiness for upcoming responsibilities; if it brings joy, it signals psychological fertility and abundance.",
    historicalMythology: "In ancient Greek mythology, the goddess Metis (wisdom) was swallowed by Zeus while pregnant; Athena subsequently emerged fully armed from his head, symbolizing that true wisdom is gestated internally before bursting forth. In indigenous shamanic traditions, pregnancy dreams were interpreted by elders as a sign that the dreamer had been chosen as an earthly vessel for a new communal medicine, vision, or song.",
    spiritual: "Esoterically, pregnancy dreams represent the sacred sacral chakra (Svadhisthana) operating at maximum creative frequency. The universe has planted a divine seed of inspiration into your etheric field. You are being asked to protect this delicate creative vision during its vulnerable gestation phase: do not expose your unborn ideas to harsh, cynical critics before they are ready for delivery.",
    variations: [
      {
        scenario: "Dreaming You Are Pregnant with Twins or Triplets",
        meaning: "Handling multiple major life transformations simultaneously, balancing dual ambitions (e.g., career vs. creative vocation).",
        psychologicalContext: "Heightened cognitive and emotional capacity. The psyche recognizes that abundance is arriving in compounding pairs.",
      },
      {
        scenario: "Giving Birth Painlessly and Holding a Radiant Baby",
        meaning: "The successful, joyous culmination of long-deferred efforts; seeing your tangible goals manifest smoothly.",
        psychologicalContext: "Integration of the divine child archetype (Puer Aeternus). A renewal of pure enthusiasm and fresh innocence.",
      },
      {
        scenario: "Going into Labor in Public Unexpectedly",
        meaning: "Feeling exposed or rushed into presenting an unfinished project or vulnerable truth before feeling entirely prepared.",
        psychologicalContext: "Performance anxiety and imposter syndrome regarding public accountability.",
      },
      {
        scenario: "Dreaming Someone Else Is Pregnant (Friend, Sister, or Stranger)",
        meaning: "Recognizing blossoming potential in another, or projecting your own suppressed creative desires onto someone close.",
        psychologicalContext: "Mirroring effect. The qualities this person embodies represent the exact traits you are preparing to cultivate.",
      },
    ],
    journalPrompts: [
      "What new project, creative vision, or lifestyle habit is currently gestating within my heart?",
      "How can I better protect and nourish my delicate emerging ideas from outside doubt?",
      "What fears do I harbor about my ability to nurture my next chapter of growth?",
    ],
    actionAdvice: "Treat your current creative ideas with the tenderness of an expectant parent. Protect your physical schedule: carve out uninterrupted solitary creative hours. Drink raspberry leaf tea to nourish physical and energetic vitality.",
    tarotCardEcho: "The Empress (Fertile Creation) & The Ace of Wands (Divine Creative Spark)",
    faq: [
      {
        question: "Can pregnancy dreams predict an actual pregnancy?",
        answer: "Occasionally, subtle hormonal or biological shifts trigger intuitive dreams. However, in over 90% of cases, the pregnancy is strictly symbolic of psychological gestation, career launches, or spiritual transformation.",
      },
      {
        question: "Can men dream of being pregnant?",
        answer: "Yes, frequently. In men, pregnancy dreams strongly correlate with launching businesses, artistic compositions, or integrating the receptive Anima (creative feminine) into conscious leadership.",
      },
    ],
  },
  {
    slug: "dream-about-your-ex",
    title: "Dreaming About Your Ex: Psychological Closure, Unresolved Trauma & Soul Contracts",
    subtitle: "Why past lovers reappear in dreams years later, and what your subconscious is actually trying to resolve.",
    category: "Relationships",
    readTime: "9 min read",
    quickAnswer: "Dreaming of an ex-partner rarely means you should get back together. In depth psychology, your ex serves as an archetypal mirror reflecting unhealed wounds, lost parts of yourself, or relationship patterns you are currently repeating.",
    neurobiology: "Memory consolidation during REM sleep links current emotional stimuli with historical emotional reference points. If you are experiencing feelings of neglect, excitement, betrayal, or passion in your present life, the hippocampus and amygdala automatically retrieve the historical relationship where those feelings were most acutely felt—projecting your ex's face as the somatic stand-in.",
    psychological: "To Carl Jung, your ex in a dream is not the actual external person; they are an internalized projection of your Anima or Animus (the inner opposite-gender soul archetype). Re-encountering an ex highlights unfinished emotional business: either you gave away parts of your sovereign vitality during that relationship and your psyche is attempting to reclaim them, or you are on the verge of making the exact same relational mistake with someone new.",
    historicalMythology: "In ancient Hellenic and Roman folklore, recurring visions of past companions were believed to be etheric ties lingering in the collective psyche. In esoteric cord-cutting lore, when two souls merge in emotional or physical intimacy, an invisible energetic etheric cord connects their chakras until consciously severed through forgiveness and ritual closure.",
    spiritual: "Spiritually, your ex appears as a milestone check from your spirit guides: 'Have you genuinely learned the karmic lesson this soul arrived to teach you?' If the dream leaves you feeling grounded and detached, you have completed the contract. If it triggers agonizing longing or rage, emotional cords still demand energetic clearing.",
    variations: [
      {
        scenario: "Your Ex Begging for Forgiveness and Wanting to Reconcile",
        meaning: "Your psyche is providing the closure, apology, or validation that you never received in the waking world.",
        psychologicalContext: "Self-soothing mechanism. You are validating your own worthiness without relying on their real-world apology.",
      },
      {
        scenario: "Arguing Bitterly with Your Ex Over Past Betrayals",
        meaning: "Residual unprocessed rage or betrayal trauma poisoning your ability to trust current or future romantic partners.",
        psychologicalContext: "Acute need for boundary assertion. You are learning in the dreamscape to stand up for your dignity.",
      },
      {
        scenario: "Your Ex Intimate with Someone Else / Happily Married",
        meaning: "Complete final severance of the soul contract. You are being pushed to permanently release lingering possessive hopes.",
        psychologicalContext: "Acceptance of reality. The unconscious mind closes the door so you can invest fully in your present life.",
      },
    ],
    journalPrompts: [
      "What emotional quality or passion did I exhibit during that past relationship that I have since abandoned?",
      "What current relational pattern in my life mirrors the toxic red flags of my past?",
      "Am I ready to genuinely forgive myself for the compromises I made during that chapter?",
    ],
    actionAdvice: "Conduct a conscious cord-cutting ritual: write an uncensored letter detailing all your remaining grief and anger toward your ex, then safely burn it to ash. Declare aloud: 'I reclaim all energy I left in that past chapter, and I return all energy that does not belong to me.'",
    tarotCardEcho: "Five of Cups (Grief for Spilled Wine) & Eight of Cups (Walking Into the Mountains)",
    faq: [
      {
        question: "Does dreaming about an ex mean they are thinking about me?",
        answer: "While telepathic resonance can occasionally occur, depth psychology confirms that in the vast majority of cases, the dream is entirely about your own inner healing, relational boundaries, and unmet needs.",
      },
      {
        question: "Why do I dream of an ex when I am happily married?",
        answer: "Because the dream is rarely about the person themselves. It is typically triggered by a specific emotion (stress, routine, desire for adventure) that your brain associates with that previous period in your life.",
      },
    ],
  },
  {
    slug: "dream-about-dying",
    title: "Dreaming of Dying: Death in Dreams, Ego Transformation & Sacred Rebirth",
    subtitle: "Overcoming fear of mortality, understanding the death of an old persona, and shamanic dismemberment.",
    category: "Physical States",
    readTime: "9 min read",
    quickAnswer: "Dreaming of your own death or someone else dying is almost never literal. In oneirology, death is the supreme symbol of transition: the termination of an obsolete lifestyle, career, or belief system to clear sacred ground for rebirth.",
    neurobiology: "Death dreams often accompany phases of massive neuroplastic reorganization—such as quitting an addiction, recovering from major burnout, or shifting ideological worldviews. During deep slow-wave sleep and REM transitions, the brain dissolves obsolete neural pathways, translating this internal synaptic pruning into dramatic scenarios of physical cessation.",
    psychological: "To Carl Jung, physical death in a dream represents 'Psychological Death'—the dissolution of the rigid Ego so that the deeper Self can emerge. You cannot step into higher personal maturity while clinging to the habits, fears, and defenses of your past self. The death dream is nature's way of executing a controlled burn of dead psychological brushwood.",
    historicalMythology: "In shamanic initiation across global cultures (Siberia, Australia, Africa), the initiate must undergo ritual 'dismemberment'—experiencing visions of their own death, skeletonization, and reconstruction by spirits—before they can receive the gift of healing. In the Egyptian Book of the Dead, passing through the underworld (Duat) is required before the soul can emerge into radiant eternal light.",
    spiritual: "In the Tarot and Hermetic mystery schools, Card 13 (Death) is accompanied by the dawn of a rising sun between two pillars. Dreaming of death confirms that you have graduated from a major karmic cycle. The pain you feel is merely the resistance of your ego resisting necessary evolution. Surrender to the renewal.",
    variations: [
      {
        scenario: "Dying Peacefully and Floating Above Your Physical Body",
        meaning: "Transcending earthly anxieties; profound spiritual liberation and realizing that your consciousness is immortal.",
        psychologicalContext: "Elevation above neurotic worries. You observe your life problems with detached wisdom.",
      },
      {
        scenario: "Attending Your Own Funeral and Watching Loved Ones Grieve",
        meaning: "Auditing your life legacy: questioning how you are currently living and how you wish to be remembered.",
        psychologicalContext: "Existential re-evaluation. A prompt to align your daily actions with your core spiritual values.",
      },
      {
        scenario: "Dreaming That a Parent or Sibling Passes Away",
        meaning: "Severing psychological codependency; outgrowing family expectations and stepping into independent adulthood.",
        psychologicalContext: "Separation-individuation. You are retiring their voice as your internal critic.",
      },
    ],
    journalPrompts: [
      "What belief system, career path, or behavioral habit has already died and is simply awaiting a formal funeral?",
      "If I had only one year of vibrant health remaining on this planet, what would I cease tolerating today?",
      "What new, bold version of myself is trying to be born out of the ashes of my past?",
    ],
    actionAdvice: "Celebrate this transition rather than fearing it. Cleanse your bedroom with incense or sound resonance. Discard clothing or items that belong to the chapter you have outgrown. Declare your rebirth in writing.",
    tarotCardEcho: "Death (Major Arcana XIII) & Judgement (Spiritual Resurrection)",
    faq: [
      {
        question: "Does dreaming of death mean someone will die in real life?",
        answer: "No. Across millions of recorded dream cases in modern sleep research, death dreams correlate with career changes, divorces, graduations, and spiritual awakenings—not literal physical demise.",
      },
    ],
  },
  {
    slug: "dog-bite-dream-meaning",
    title: "Dogs in Dreams: Loyalty, Betrayal, Dog Bites & Instinctual Protection",
    subtitle: "Decoding canine companions, guard dogs, bites on the hand/leg, and domestic fidelity.",
    category: "Animals",
    readTime: "8 min read",
    quickAnswer: "Dogs represent fidelity, unconditional friendship, protective instincts, and gut intuition. A friendly dog indicates loyal allies, while an aggressive or biting dog warns of disloyalty, betrayal, or an internal conflict between duty and instinct.",
    neurobiology: "Dogs have co-evolved with humans for over 30,000 years, establishing deep, hardwired oxytocin pair-bonding neural circuits in our brains. In REM dream states, the canine archetype serves as an immediate visual index for friendship safety vs. pack threat: evaluating whether your social tribe is trustworthy.",
    psychological: "In Jungian dreamwork, dogs embody our instinctual drives tamed into loyal companionship. A playful dog represents healthy integration of instinct and affection. A snarling, vicious dog represents repressed aggression—rage that you have locked in the basement of your psyche that threatens to break free and bite back.",
    historicalMythology: "In Greek mythology, Cerberus guarded the threshold of Hades, ensuring souls could enter but not escape. In ancient Egypt, the jackal-headed god Anubis guided souls through the underworld and weighed the human heart against the feather of truth. Canines have eternally served as sacred psychopomps—guardians of the border between worlds.",
    spiritual: "A dog bite in a dream is an energetic warning: your loyal, trusting nature is being exploited by someone in your circle who operates with covert envy. It urges you to cease offering unconditional loyalty to people who offer only conditional tolerance.",
    variations: [
      {
        scenario: "A Dog Biting Your Right Hand or Wrist",
        meaning: "Betrayal in your professional authority, financial contracts, or masculine assertiveness.",
        psychologicalContext: "Feeling paralyzed in your ability to take decisive executive action or earn your living.",
      },
      {
        scenario: "A Dog Biting Your Left Hand or Leg",
        meaning: "A wound to your emotional vulnerability, receptive feminine intuition, or foundational life balance.",
        psychologicalContext: "Feeling hindered in your personal progress by an emotional dependency.",
      },
      {
        scenario: "A Loyal Golden Dog Protecting You from Shadows",
        meaning: "Powerful spiritual guardianship, ancestral protection, and faithful allies working on your behalf.",
        psychologicalContext: "Strong, healthy self-preservation instinct operating at peak efficiency.",
      },
    ],
    journalPrompts: [
      "Where in my life am I being loyal to someone who does not respect or protect my well-being?",
      "What instinctual anger or self-protective urge have I been suppressing out of fear of being disliked?",
      "Who in my circle has earned the right to be in my inner sanctuary?",
    ],
    actionAdvice: "Audit your social circle. Refuse to excuse repeated micro-betrayals or passive-aggressive behavior. Practice speaking up the very second a personal boundary is crossed.",
    tarotCardEcho: "The Fool (The Loyal Dog Companion) & Seven of Swords (Deception & Betrayal)",
    faq: [
      {
        question: "What does the breed or color of the dream dog mean?",
        answer: "A White dog symbolizes pure intentions and divine protection; a Black dog represents mysterious shadows, unexpressed depression, or psychic guardianship; a Golden dog portends joyous friendship and material prosperity.",
      },
    ],
  },
  {
    slug: "tornado-dream-meaning",
    title: "Tornadoes in Dreams: Emotional Turmoil, Sudden Upheaval & Destructive Storms",
    subtitle: "Vortex energy, sudden disruptions, whirlwind anxiety, and the serene eye of the storm.",
    category: "Nature & Elements",
    readTime: "8 min read",
    quickAnswer: "Dreaming of a tornado symbolizes sudden, turbulent emotional upheaval, overwhelming anxiety, rapid uncontrollable change, or feeling swept away by volatile arguments.",
    neurobiology: "Tornado dreams frequently trigger high sympathetic nervous system arousal during REM sleep. When stress hormones (cortisol and epinephrine) elevate due to daytime workplace panic or domestic conflicts, the sleeping brain translates internal emotional turbulence into colossal meteorological vortices tearing across the landscape.",
    psychological: "In analytical psychology, a tornado represents volcanic, spinning energy generated when two clashing emotional air masses collide: cold, suppressed logic meeting hot, unexpressed rage. The vortex pulls everything into its center, reflecting feelings that your life is spiraling beyond conscious control.",
    historicalMythology: "In Mesoamerican mythology, Huracán was the great Mayan storm god who breathed wind and fire across the primordial waters. Across world lore, the whirlwind represents divine intervention: stripping away superficial human hubris to reveal the bare, unshakeable bedrock beneath.",
    spiritual: "Spiritually, the lesson of the tornado is the mystery of the 'Eye of the Storm.' While the outer perimeter spins with ferocious destruction, the exact center remains in absolute stillness and peace. The dream challenges you: can you find your internal stillness while chaos swirls around you?",
    variations: [
      {
        scenario: "Watching a Giant Tornado Touch Down from Inside a Secure Basement",
        meaning: "Successfully weathering a major life crisis through foresight, grounded preparation, and emotional shelter.",
        psychologicalContext: "Healthy psychological resilience. You allow outer storms to pass without letting them breach your inner core.",
      },
      {
        scenario: "Being Swept Up into the Vortex of the Tornado",
        meaning: "Feeling entirely overpowered by emotional drama, addictions, or toxic family conflicts.",
        psychologicalContext: "Total loss of personal autonomy. Demands immediate physical detachment from chaotic environments.",
      },
      {
        scenario: "Multiple Tornadoes Spawning Across the Horizon",
        meaning: "Overwhelming multifaceted stress: financial pressures, relationship tensions, and career obligations colliding at once.",
        psychologicalContext: "Systemic cognitive overload. You must triage problems one by one rather than fighting all at once.",
      },
    ],
    journalPrompts: [
      "What chaotic conflict in my life is spiraling out of control because I refuse to step into the calm center?",
      "Whose emotional whirlwind am I foolishly trying to control or calm with my bare hands?",
      "What foundational truths in my life remain completely undamaged no matter how fierce the outer storm?",
    ],
    actionAdvice: "Step away from emotional arguments immediately. Cease trying to calm a screaming storm; retreat to your internal shelter. Engage in grounding exercises: drink warm tea, practice box breathing, and focus strictly on what is directly within your control.",
    tarotCardEcho: "The Tower (Sudden Upheaval) & Wheel of Fortune (Cosmic Rotations)",
    faq: [
      {
        question: "Do tornado dreams predict actual natural disasters?",
        answer: "No. Tornado dreams are psychological manifestations of internal stress, emotional turbulence, and sudden transitions.",
      },
    ],
  },
  {
    slug: "snakes-in-dreams",
    title: "Dreaming of Snakes: Complete Psychological, Spiritual & Mythological Guide",
    subtitle: "Kundalini awakening, Jungian shadow integration, and unacknowledged transformation in nocturnal analysis.",
    category: "Animals",
    readTime: "9 min read",
    quickAnswer: "Dreaming of a snake represents profound metamorphic change, the shedding of an obsolete ego identity, unacknowledged anxieties regarding deception, or a potent surge of creative and vital energy seeking conscious integration.",
    neurobiology: "From an evolutionary neurobiology perspective, serpents occupy a permanent hardwired circuit within the human limbic system. Known as the 'Snake Detection Theory' (Isbell, 2006), primates evolved specialized visual and amygdalic pathways dedicated to rapid ophidian recognition. During rapid eye movement (REM) sleep, when the prefrontal cortex reduces executive filtering and the amygdala fires with elevated intensity, the subconscious frequently projects snake imagery to simulate threat scenarios, calibrate instinctual alertness, and test psychological boundary defense mechanisms.",
    psychological: "In Carl Gustav Jung's analytical psychology, the serpent stands as one of the most primordial archetypes of the collective unconscious. Serpents crawl against the earth, emerging from underground burrows, making them the ultimate symbol of the subconscious depths erupting into conscious awareness. When a serpent confronts you in a dream, it rarely represents external evil; rather, it embodies the 'Shadow'—the unintegrated instincts, suppressed desires, or creative vitality that you have disowned. Jung observed that confronting the snake marks the threshold of the 'Individuation' process: by refusing to flee from the creature, the dreamer assimilates its primal wisdom, transitioning from defensive neurosis into self-sovereignty.",
    historicalMythology: "Across millennia, the serpent was revered long before it was demonized. In ancient Egyptian cosmology, the uraeus cobra reared upon the pharaoh's brow symbolized divine protection, sovereignty, and supreme insight, while Apophis represented the chaotic primordial dark. In Greco-Roman medicine, the Rod of Asclepius featured a shedding serpent wrapped around a staff, representing healing, pharmacological antidotes, and perpetual rejuvenation. In Vedic and yogic traditions, Kundalini Shakti is portrayed as a coiled serpent at the base of the spine (Muladhara chakra), whose awakening uncoils upward to ignite spiritual transcendence and cosmic consciousness.",
    spiritual: "In contemporary esoteric dreamwork, encountering a snake signifies an energetic shedding of skin. You are currently dwelling between two vibrational realities: your past circumstances have become suffocating, yet your emerging future is not yet fully formed. The serpent appears as a sacred initiator, compelling you to audit toxic dependencies, re-establish etheric boundaries, and step into spiritual autonomy. If the snake remains calm or communicative, it signals clairvoyant downloads and heightened psychic sensitivity.",
    variations: [
      {
        scenario: "Black Snake Biting You on the Hand or Ankle",
        meaning: "An urgent, somatic wake-up call highlighting a hidden emotional wound, boundary violation, or toxic dynamic in your waking life that you have stubbornly rationalized away.",
        psychologicalContext: "The bite delivers the 'poison' that forces the psyche to produce antibodies. It indicates an inescapable reality check regarding your professional or romantic circles.",
      },
      {
        scenario: "Golden or Iridescent Serpent Bearing Wisdom",
        meaning: "A supreme omen of divine protection, intellectual elevation, creative breakthroughs, and unexpected material prosperity.",
        psychologicalContext: "Reflects harmonious reconciliation between the conscious ego and the transcendent Self. Your creative intuition is operating at peak synchronicity.",
      },
      {
        scenario: "A Snake Shedding Its Skin in Front of You",
        meaning: "Direct affirmation that you are undergoing a major life transition, outgrowing past trauma, or abandoning obsolete dogmas.",
        psychologicalContext: "Symbolizes voluntary ego-death and regenerative renewal. You are releasing an outdated self-image without regret.",
      },
      {
        scenario: "Multiple Snakes Infesting Your Home or Bed",
        meaning: "Vulnerabilities within your intimate sanctuary, boundary permeability, or unaddressed domestic tensions draining your vitality.",
        psychologicalContext: "The bedroom represents the inner sanctum of vulnerability. Snakes here point to feelings of unsafety, fear of sexual/emotional intimacy, or perceived betrayal by family.",
      },
      {
        scenario: "Defeating or Taming a Threatening Serpent",
        meaning: "Overcoming long-standing neurotic dread, severing ties with a manipulative presence, and reclaiming personal authority.",
        psychologicalContext: "Marks the triumphant heroic conquest of the unconscious dragon/shadow. You have transformed anxiety into disciplined personal power.",
      },
    ],
    journalPrompts: [
      "Where in my current life am I tolerating subtle emotional poisoning or dishonest compromises?",
      "What old belief system or persona is suffocating me, waiting to be shed like dead skin?",
      "If the dream serpent could speak a single declarative sentence of advice, what would it demand of me?",
    ],
    actionAdvice: "Audit your emotional and interpersonal boundaries immediately. Discontinue energy-draining commitments where you feel unappreciated. Engage in physical grounding: walk barefoot on soil, practice somatic shaking to discharge nervous system stress, and journal unfiltered truths without self-censorship.",
    tarotCardEcho: "The Magician (Alchemical Mastery) & Death (Sacred Metamorphosis)",
    faq: [
      {
        question: "Does dreaming of a snake bite mean someone will betray me?",
        answer: "Not necessarily. In depth psychology, the bite reflects an internal realization rather than an external prophecy. It signals that your subconscious has already detected subtle red flags or boundary breaches that your conscious mind has tried to excuse.",
      },
      {
        question: "What does the color of the snake indicate?",
        answer: "Color profoundly alters the archetypal tone: Green indicates healing, fertile renewal, and heart chakra alignment; Black indicates the mysterious shadow and deep unconscious wounds; Red warns of repressed rage or sexual tension; White symbolizes spiritual purity and divine intervention; and Gold portends wealth, illumination, and creative mastery.",
      },
      {
        question: "Is dreaming of killing a snake considered bad luck?",
        answer: "Historically, some folk traditions viewed killing a snake as severing ties with wisdom. However, in modern psychological analysis, it represents victory over acute anxiety, cutting cords with a toxic manipulator, and reclaiming emotional sovereignty.",
      },
    ],
  },
  {
    slug: "teeth-falling-out",
    title: "Teeth Falling Out in Dreams: Meaning, Anxiety & Throat Chakra Awakening",
    subtitle: "Loss of authority, fear of aging, suppressed communication, and somatic nervous system alerts.",
    category: "Physical States",
    readTime: "8 min read",
    quickAnswer: "Dreams of teeth crumbling, falling out, or being pulled symbolize profound anxieties over losing control, feeling unmasked or unpersuasive in social situations, and repressing unexpressed truths in the throat chakra.",
    neurobiology: "Nocturnal dental dreams correlate closely with nocturnal bruxism (jaw clenching and tooth grinding). When sleep architecture experiences stress-induced micro-arousals, the trigeminal motor nucleus fires, causing intense masseter muscle contraction. Somatosensory feedback from the pressurized periodontal ligaments travels to the sensory cortex during REM sleep, directly translating somatic jaw tension into vivid dream scenarios where teeth crumble, shatter, or fall like gravel into your hands.",
    psychological: "Sigmund Freud famously linked dental dreams to castration anxiety and loss of primal potency. However, Carl Jung and modern cognitive psychologists recognize teeth as our evolutionary instruments of survival, nourishment, and physical assertion. We 'bite into life' and 'bare our teeth' to establish dominance. When your teeth crumble in a dream, your psyche is spotlighting an acute sense of powerlessness, imposter syndrome, dread of bodily deterioration, or acute social embarrassment in waking life.",
    historicalMythology: "In ancient Mesopotamian and Greek oneiromancy (such as Artemidorus' Oneirocritica, 2nd century CE), teeth symbolized members of the dreamer's household; upper teeth represented paternal elders while lower teeth represented siblings or children. Losing a tooth was historically interpreted as the passing of a relative. In Mayan dream divination, however, dental renewal was seen as a prerequisite for assuming shamanic responsibilities, symbolizing the transition from milk teeth of childhood to the enduring bone of spiritual adulthood.",
    spiritual: "In esoteric energy medicine, teeth are rooted directly into the throat chakra (Vishuddha)—the energy center governing authentic expression, integrity, and truth transmission. When teeth shatter in your mouth, it signals that you are 'swallowing your words' or living a compromise that violates your integrity. The dream demands that you cease editing your honest voice to appease authority figures or partner expectations.",
    variations: [
      {
        scenario: "Teeth Crumbling into Fine Sand or Dust",
        meaning: "Chronic nervous exhaustion, systemic burnout, and the perception that your life's foundational pillars are quietly disintegrating.",
        psychologicalContext: "Reflects prolonged coping without emotional replenishment. Your stamina has eroded; you are maintaining a facade while collapsing inwardly.",
      },
      {
        scenario: "Pulling Out a Rotten or Painful Tooth with Your Fingers",
        meaning: "A cathartic, deliberate severance. You are preparing to discard an agonizing relationship, toxic career path, or destructive habit.",
        psychologicalContext: "Active agency over pain. While the extraction requires temporary discomfort, the psyche recognizes it as necessary for long-term health.",
      },
      {
        scenario: "Spitting Out Mouthfuls of Broken Teeth in Public",
        meaning: "Paralyzing vulnerability, social phobia, fear of public humiliation, or remorse over words spoken in haste.",
        psychologicalContext: "Dread of judgment. You fear that your perceived flaws, lack of competence, or unspoken deceit will be publicly exposed.",
      },
      {
        scenario: "A Single Front Tooth Snapping Cleanly",
        meaning: "A sudden blow to personal pride, reputation, or charismatic self-image. A confrontation with an interpersonal adversary.",
        psychologicalContext: "Impact on the public Persona. You feel your attractiveness, credibility, or leadership stance has been compromised.",
      },
    ],
    journalPrompts: [
      "What conversation or boundary am I actively avoiding because I fear conflict or judgment?",
      "Where in my career or social circle am I pretending to be competent while secretly feeling like an imposter?",
      "If I spoke my absolute, raw truth without fear of consequences, what is the very first sentence I would say?",
    ],
    actionAdvice: "Schedule a physical somatic release: massage the masseter muscles of your jaw and temples before sleep. Practice speaking your boundaries directly in low-stakes situations. Drink warm herbal infusions (spearmint or licorice root) and drink structured water to support throat chakra calibration.",
    tarotCardEcho: "The Tower (Structural Collapse) & Five of Swords (Severed Words)",
    faq: [
      {
        question: "Does dreaming of losing teeth predict physical death?",
        answer: "No. This medieval folklore myth has been thoroughly debunked. Contemporary analytical oneirology confirms dental dreams mirror psychological stress, communicative frustration, and life transitions.",
      },
      {
        question: "Why do teeth dreams feel so intensely tactile and real?",
        answer: "Because they are frequently driven by real somatic bruxism. When your jaw muscles clench during sleep, your brain incorporates the actual physical pressure into the dream narrative.",
      },
    ],
  },
  {
    slug: "falling-from-heights",
    title: "Falling from Heights: The Hypnic Jerk, Letting Go & Overcoming Dread",
    subtitle: "The psychology of surrendering control, fear of failure, and spiritual descent into the mysterious void.",
    category: "Physical States",
    readTime: "7 min read",
    quickAnswer: "Dreams of falling signify an abrupt loss of security, fear of failing a major life milestone, or a spiritual invitation to abandon rigid ego control and surrender to cosmic flow.",
    neurobiology: "Falling dreams are intimately bound to the 'hypnic jerk' (myoclonus)—a sudden, involuntary muscle twitch during the transitional phase between wakefulness and Stage 1 sleep. As the motor cortex relaxes and blood pressure drops, the vestibular system occasionally misinterprets muscle flaccidity as literal freefall through physical space. The brain fires an emergency motor burst to 'catch' you, translating the physical reflex into falling off a skyscraper, mountain ledge, or airplane.",
    psychological: "Psychologically, falling reflects the terrifying sensation that the rug has been pulled from beneath your feet. It is the signature dream of high-achievers experiencing acute perfectionism and dread of catastrophe. You may be gripping a relationship, financial status, or corporate position so tightly that the fear of dropping it dominates your subconscious thoughts.",
    historicalMythology: "In classical Greek myth, Icarus plummeted into the sea after flying too close to the sun on wax wings—a cautionary archetypal tale of hubris and ignoring natural limits. Conversely, in Taoist philosophy, falling is not viewed with dread, but as the art of 'Wu Wei' (effortless action): yielding to the currents of nature rather than exhausting yourself fighting upstream against destiny.",
    spiritual: "In esoteric initiation rites, the descent into the abyss precedes resurrection. Falling represents the necessary dissolution of the false self. Before you can rise into higher spiritual discernment, the universe dismantles your rigid crutches. The spiritual secret of falling is discovering that what feels like an abyss is actually a cradle of divine providence.",
    variations: [
      {
        scenario: "Falling into an Inky, Endless Dark Abyss",
        meaning: "Confrontation with the Void; your old identity has dissolved before the new reality has materialized. A profound spiritual transition.",
        psychologicalContext: "Existential anxiety during liminal life passages. Demands radical trust in unseen outcomes.",
      },
      {
        scenario: "Falling and Landing Gently on Water",
        meaning: "Emotional immersion and baptism. You will navigate an intimidating crisis and emerge emotionally cleansed and renewed.",
        psychologicalContext: "Integration of unconscious emotional depth. Fear is replaced by soothing somatic acceptance.",
      },
      {
        scenario: "Falling and Suddenly Spreading Wings to Fly",
        meaning: "Supreme psychological alchemy: converting existential panic into empowerment, creative breakthrough, and liberation.",
        psychologicalContext: "Transcendence of learned helplessness. The ego discovers untapped reserves of resilience.",
      },
    ],
    journalPrompts: [
      "What outcome am I attempting to micromanage so aggressively that it is eroding my peace of mind?",
      "If the worst-case scenario occurred, what inner resilience would allow me to survive and thrive?",
      "How would my day feel if I chose surrender over constant hyper-vigilance?",
    ],
    actionAdvice: "Engage in nervous system down-regulation: lie flat on a yoga mat with legs elevated on a wall (Viparita Karani). Practice 4-7-8 breathing (inhale 4, hold 7, exhale 8) to reset vagal tone and remind your physiology that you are safely grounded.",
    tarotCardEcho: "The Hanged Man (Voluntary Surrender) & The Fool (Leap of Faith)",
    faq: [
      {
        question: "Will you die in real life if you hit the ground in a dream?",
        answer: "This is a persistent urban legend with zero scientific validity. Many lucid dreamers purposefully hit the ground, reporting either waking up, bouncing softly, or transitioning into another dream environment.",
      },
      {
        question: "Why do I wake up with my heart pounding after falling?",
        answer: "Because the brain's locus coeruleus releases a rapid surge of norepinephrine during hypnic jerks, kicking your cardiovascular system into a brief fight-or-flight response.",
      },
    ],
  },
  {
    slug: "flying-uncontrolled-or-free",
    title: "Flying in Dreams: Lucid Astral Liberation vs. Drifting Out of Control",
    subtitle: "Astral flight, bird's-eye perspective, crown chakra expansion, and transcending earthly limitations.",
    category: "Physical States",
    readTime: "8 min read",
    quickAnswer: "Flying dreams signify transcending mundane limitations, rising above emotional turmoil, asserting lucid autonomy, and experiencing spiritual soul expansion.",
    neurobiology: "During lucid dreaming and high-coherence REM stages, the brain shows synchronous gamma-band oscillations (40 Hz) across the dorsolateral prefrontal cortex. This state blends sensory detachment from the physical body with conscious self-reflection, generating an exhilarating sense of weightlessness and gravity defiance.",
    psychological: "To Carl Jung, flying dreams symbolize the desire to transcend mundane limitations, rise above toxic domestic battles, or gain a panoramic, dispassionate bird's-eye view of an overwhelming dilemma. However, if the flight is uncontrolled, Jung warned of the 'Icarus Complex'—inflated arrogance, detachment from practical realities, or retreating into spiritual bypassing rather than resolving everyday obligations.",
    historicalMythology: "In shamanic traditions spanning Siberia to South America, the shaman's soul-flight (astral projection) was the foundational vehicle for journeying into the Upper World to converse with angelic helpers, ancestral guides, and divine archetypes. The winged sandals of Hermes and the feathered cloak of the Norse goddess Freyja reflect this universal archetype of swift, unrestricted consciousness.",
    spiritual: "Spiritually, conscious flight marks the full activation of the crown chakra (Sahasrara) and third eye (Ajna). You have elevated your energetic vibration beyond dense, low-frequency worries. The universe is granting you visionary clarity: do not permit narrow-minded peers to clip your spiritual wings.",
    variations: [
      {
        scenario: "Soaring Smoothly Over Vast Oceans and Mountains",
        meaning: "Grand life vision, spiritual elevation, and profound alignment with your sacred soul destiny.",
        psychologicalContext: "Integration of higher perspective. Earthly anxieties appear trivial when seen from the heights of wisdom.",
      },
      {
        scenario: "Struggling to Gain Altitude / Tangling in Electrical Power Lines",
        meaning: "Energy vampires, self-doubt, or social conditioning draining your creative momentum and freedom.",
        psychologicalContext: "Subconscious friction between lofty aspirations and limiting domestic or corporate obligations.",
      },
      {
        scenario: "Swimming Through the Air Effortlessly",
        meaning: "Harmonizing emotional intelligence with mental clarity; navigating difficult interpersonal dynamics with graceful mastery.",
        psychologicalContext: "Emotional agility. You adapt fluidly to changing circumstances without losing your center.",
      },
    ],
    journalPrompts: [
      "What bold creative venture or life path would I pursue if social expectations were completely eradicated?",
      "In what areas of my life am I engaging in spiritual bypassing rather than grounding my vision into physical reality?",
      "What gives me an authentic, unshakeable sense of freedom?",
    ],
    actionAdvice: "Channel your visionary perspective into structured execution. Draft a comprehensive project blueprint. Protect your etheric field with obsidian or black tourmaline, and avoid sharing delicate dreams with cynical skeptics.",
    tarotCardEcho: "The Star (Inspiration & Hope) & The World (Complete Mastery)",
    faq: [
      {
        question: "Can I learn to control my flying dreams at will?",
        answer: "Yes. By cultivating lucid dreaming techniques—such as daytime reality checks (e.g., checking text twice) and prospective memory exercises—you can consciously initiate and navigate flight.",
      },
    ],
  },
  {
    slug: "drowning-in-deep-water",
    title: "Drowning in Deep Ocean or Floods: Emotional Overwhelm & Spiritual Cleansing",
    subtitle: "Subconscious deluge, repressed sorrow, baptismal dissolution, and emotional alchemy.",
    category: "Nature & Elements",
    readTime: "8 min read",
    quickAnswer: "Drowning in a dream indicates acute emotional overwhelm, repressed sorrow, burnout from absorbing others' turmoil, or a profound baptismal cleansing preceding renewal.",
    neurobiology: "Water immersion dreams frequently occur during REM phases characterized by shallow breathing or nocturnal respiratory pauses (such as mild sleep apnea or nasal congestion). When sensory feedback detects elevated carbon dioxide levels, the brain instantly manifests aquatic imagery—tidal waves, deep plunges, or murky undertows—to register the physiological urge to breathe deeply.",
    psychological: "Water is the universal mythological and psychological symbol of emotion and the collective unconscious. Submersion represents being swallowed by feelings you have denied voice: unexpressed grief, chronic anxiety, romantic heartbreak, or corporate obligations that have exceeded your psychological bandwidth. You are drowning in what you refuse to feel.",
    historicalMythology: "In ancient Mesopotamian lore, the primordial sea Tiamat embodied both chaotic annihilation and the mother womb of creation. In ancient Egyptian cosmology, the world was formed from Nun, the celestial waters of potential. Throughout cross-cultural flood myths (from Gilgamesh to Noah), cosmic deluge cleanses the corrupt old world to make fertile ground for moral and spiritual resurrection.",
    spiritual: "In mystery traditions, drowning represents sacred dissolution—the 'Solve et Coagula' of alchemical transmutation. The ego-construct must dissolve in the divine ocean before the perfected soul can emerge. If you allow yourself to surrender rather than panic, you discover that you can miraculously breathe underwater.",
    variations: [
      {
        scenario: "Drowning in a Raging, Muddy Torrent",
        meaning: "Severe emotional confusion, being entangled in gossip, or unresolved resentment clouding rational judgment.",
        psychologicalContext: "Total loss of emotional clarity. You feel defenseless against a barrage of external demands and negativity.",
      },
      {
        scenario: "Submerged in Calm, Luminous, Crystal-Clear Turquoise Waters",
        meaning: "Profound psychic awakening; you are learning to inhabit deep emotional and spiritual truths without fear.",
        psychologicalContext: "Peaceful integration of the subconscious. You trust your intuitive depths completely.",
      },
      {
        scenario: "A Colossal Tsunami Cresting on the Horizon",
        meaning: "Anticipation of an unavoidable, colossal life transformation (such as divorce, job loss, or relocation).",
        psychologicalContext: "Existential dread of impending upheaval. Demands psychological preparation and adaptive acceptance.",
      },
    ],
    journalPrompts: [
      "What sorrow, grief, or tears have I been repressing to appear strong or functional for others?",
      "Whose emotional chaos am I currently carrying that does not belong to me?",
      "What life change am I resisting that is destined to occur anyway?",
    ],
    actionAdvice: "Create an intentional container for cathartic release. Allow yourself to weep without judgment; tears contain actual cortisol and physical stress hormones. Soak in an Epsom salt bath infused with eucalyptus oil to cleanse your auric field.",
    tarotCardEcho: "The Moon (Subconscious Depths) & Eight of Cups (Walking Away)",
    faq: [
      {
        question: "What does it mean if someone saves you from drowning?",
        answer: "It indicates that unexpected emotional support, ancestral protection, or a compassionate mentor is ready to assist you. It is an invitation to put aside pride and ask for help.",
      },
    ],
  },
  {
    slug: "black-cats-and-felines",
    title: "Black Cats in Dreams: Psychic Radar, Feminine Power & Debunking Superstition",
    subtitle: "Reclaiming ancient Bastet guardianship, intuition, independent sovereignty, and mystery.",
    category: "Animals",
    readTime: "7 min read",
    quickAnswer: "Dreaming of a black cat is an auspicious omen of heightened psychic intuition, sacred feminine independence, fierce self-possession, and protection against negative energies.",
    neurobiology: "Felines possess extraordinary sensory perception, including tapetum lucidum night vision and ultra-high frequency acoustic sensitivity. In nocturnal dreamwork, seeing a cat reflects your brain's subliminal threat detection—your intuitive subconscious noticing micro-expressions and energetic shifts that your conscious analytical mind overlooked during the day.",
    psychological: "Cats walk with total autonomy; they refuse to be subjugated or controlled. In Jungian psychology, a feline dream connects to the Anima (the sacred feminine archetype in all humans). A healthy black cat reflects self-assured sexuality, boundary enforcement, and comfortable intimacy with mystery. A wounded or attacking cat indicates a fractured relationship with your own intuitive instincts.",
    historicalMythology: "While medieval European witch trials demonized black felines out of fear of independent women, ancient cultures venerated them. In Egypt, Bastet—the cat-headed goddess of protection, pleasure, and domestic bliss—was invoked to shield families from plagues and malicious spirits. In Norse tradition, the goddess Freyja rode a chariot pulled by giant blue-gray cats, symbolizing fertile abundance and seidr (shamanic magic). In Celtic and Japanese folklore, a black cat brings profound luck and romantic prosperity.",
    spiritual: "In esoteric occultism, meeting a black cat in the astral plane confirms that your psychic third eye is opening. It calls you to step into personal mystery without seeking social validation. Stop dimming your unconventional radiance to comfort mediocre environments.",
    variations: [
      {
        scenario: "A Purring Black Cat Resting on Your Heart or Chest",
        meaning: "Somatic, cellular healing of emotional trauma; recalibration of your heart chakra during deep sleep.",
        psychologicalContext: "Profound comfort and self-compassion. Your psyche is soothing long-standing attachment injuries.",
      },
      {
        scenario: "A Black Cat Hissing or Scratching You",
        meaning: "A clash with an intuitive, fierce individual in your waking circle, or inner conflict from ignoring your gut warnings.",
        psychologicalContext: "Repression of instinctual boundaries. Your unexpressed self-protective rage is biting back.",
      },
      {
        scenario: "A Black Cat With Glowing Golden or Emerald Eyes",
        meaning: "Clairvoyant perception; the ability to perceive covert agendas, hidden deceits, and occult truths clearly.",
        psychologicalContext: "Sharp discernment piercing through superficial deception. Trust your initial impressions unconditionally.",
      },
    ],
    journalPrompts: [
      "Where in my life am I trading away my independence to gain approval from people I do not respect?",
      "What gut feeling have I recently brushed aside because it lacked linear, logical proof?",
      "How can I better honor and protect my energetic boundaries this week?",
    ],
    actionAdvice: "Keep an amethyst or labradorite stone on your bedside table. Spend uninterrupted time in solitary contemplation. Refuse to explain or defend your intuitive choices to those committed to misunderstanding you.",
    tarotCardEcho: "The High Priestess (Esoteric Intuition) & Queen of Wands (Charismatic Fire)",
    faq: [
      {
        question: "Is seeing a black cat in a dream bad luck?",
        answer: "Historically, no. The 'bad luck' superstition was medieval European propaganda. Globally and spiritually, black cats are sacred omens of intuitive power, stealth, and auric shielding.",
      },
    ],
  },
  {
    slug: "deceased-loved-one-visiting",
    title: "Visitation Dreams: Meeting Deceased Loved Ones & Interpreting Spirit Signs",
    subtitle: "Distinguishing genuine astral visitations from psychological grief processing, closure, and ancestral blessings.",
    category: "Relationships",
    readTime: "9 min read",
    quickAnswer: "Dreams of deceased loved ones often serve as profound visitation experiences characterized by peaceful clarity, offering vital guidance, ancestral blessings, closure, or warnings.",
    neurobiology: "During grief, the brain's neural networks dedicated to attachment and pair-bonding remain active long after physical loss. During theta brainwave oscillations in stage 3 and REM sleep, the neuro-circuitry of facial recognition and memory consolidation produces extraordinarily vivid, hyper-realistic representations of the departed, facilitating deep psychological resolution.",
    psychological: "In grief therapy, visitation dreams are acknowledged as vital milestones of emotional integration. The dreamer incorporates the internalized love, wisdom, and moral compass of the departed into their permanent psyche, transforming raw, paralyzing grief into an enduring legacy of affection.",
    historicalMythology: "Every global spiritual tradition recognizes the reality of ancestral communion during sleep. From the Celtic festival of Samhain to Mexico's Día de los Muertos, indigenous cultures maintained that the veil between realms dissolves when the physical senses rest, allowing departed relatives to convey blessings and protection.",
    spiritual: "In esoteric mediumship, genuine visitation dreams are marked by specific criteria: the departed appears radiantly healthy, communicates telepathically through emotional resonance rather than audible words, radiates unconditional love, and leaves the dreamer feeling peaceful rather than frightened upon waking.",
    variations: [
      {
        scenario: "The Loved One Embraces You in Complete, Radiant Silence",
        meaning: "A transmission of soul peace and love. A reminder that energetic bonds of love transcend physical transition.",
        psychologicalContext: "Profound emotional healing and integration of unresolved separation grief.",
      },
      {
        scenario: "The Loved One Hands You a Specific Symbolic Gift",
        meaning: "An ancestral inheritance or encoded life instruction. Research the metaphysical meaning of the specific object.",
        psychologicalContext: "Activation of an unacknowledged personal talent or moral responsibility.",
      },
      {
        scenario: "The Loved One Sternly Warns You About a Choice",
        meaning: "Ancestral guidance shielding you from an interpersonal blind spot or precarious financial pitfall.",
        psychologicalContext: "Your deepest subconscious intuition projecting critical self-protective advice through a trusted authority archetype.",
      },
    ],
    journalPrompts: [
      "What wisdom or values did this person embody that I need to cultivate more fiercely within myself?",
      "What unresolved words or emotional baggage am I now ready to release into the light?",
      "If my ancestor were observing my daily choices right now, what courageous step would they urge me to take?",
    ],
    actionAdvice: "Create a brief honoring ritual: light a white beeswax candle, set out a glass of fresh water, and speak aloud words of gratitude to them. Plant a tree or donate to a cause they cherished.",
    tarotCardEcho: "Judgement (Soul Awakening) & Temperance (Bridge Between Worlds)",
    faq: [
      {
        question: "Why do deceased relatives usually appear younger and healthy?",
        answer: "In metaphysical theology, the astral body reflects the soul's energetic blueprint rather than the physical ailments of earthly decline. In psychology, it reflects your subconscious honoring their most vibrant essence.",
      },
      {
        question: "What if the dream was unsettling or chaotic?",
        answer: "Chaotic dreams typically reflect your own unresolved guilt, traumatic grief, or shock rather than a spiritual visitation. Be gentle with yourself and seek compassionate grief support if needed.",
      },
    ],
  },
  {
    slug: "spiders-weaving-or-crawling",
    title: "Spiders in Dreams: The Weaver of Destiny, Creative Patience & Entrapment",
    subtitle: "The Great Mother archetype, intricate life blueprints, manipulation webs, and venomous shadows.",
    category: "Animals",
    readTime: "8 min read",
    quickAnswer: "Spiders symbolize the patient weaving of personal destiny, creative genius, intricate manifestations, but also feeling entrapped in manipulative, codependent relationships.",
    neurobiology: "Like snakes, spiders trigger ancient evolutionary preparedness pathways in the brain (Öhman & Mineka, 2001). The visual appearance of segmented legs and rapid skittering movements triggers swift dorsal stream visual processing, which REM sleep utilizes to represent feelings of contamination, vulnerability, or invisible manipulation.",
    psychological: "To Carl Jung, the spider is a complex archetype representing the devouring or overprotective mother (the 'Terrible Mother'), who weaves an inescapable web of emotional guilt and control around her offspring. On an individual level, it represents compulsive over-planning, perfectionism, or feeling caught in someone else's deceptive web of intrigue.",
    historicalMythology: "In Native American mythology (notably Hopi and Navajo traditions), Spider Grandmother (Kokyangwuti) is the revered creator goddess who wove the cosmos, stars, and language into being, bringing fire and wisdom to humanity. In West African folklore, Anansi the Spider is the clever trickster spirit who outwitted tyrants to obtain the world's stories.",
    spiritual: "Spiritually, the spider is the ultimate master of manifestation. It does not chase prey frantically across the forest; it weaves a sacred geometric mandala from its own body and waits serenely for abundance to arrive. A spider dream calls for divine patience: your long-term creative efforts are crystallizing.",
    variations: [
      {
        scenario: "Entangled in a Sticky Spider Web That You Cannot Escape",
        meaning: "Feeling snared in a suffocating contract, manipulative workplace dynamic, or codependent relationship.",
        psychologicalContext: "Somatic realization of entrapment. You feel your autonomy and vitality being systematically drained.",
      },
      {
        scenario: "Watching a Spider Silently Weave a Geometric Web",
        meaning: "Divine encouragement: your meticulous, patient creative labor is about to yield a monumental reward.",
        psychologicalContext: "Integration of patience and craftsmanship. The psyche confirms you are building sturdy structures.",
      },
      {
        scenario: "A Golden Spider Descending Slowly from Above",
        meaning: "Unexpected financial windfalls, creative epiphany, or divine intervention descending into your material realm.",
        psychologicalContext: "Spontaneous inspiration from the superconscious realm materializing effortlessly.",
      },
    ],
    journalPrompts: [
      "Where in my daily life am I behaving like frantic prey instead of a patient, sovereign creator?",
      "Who in my circle is weaving subtle webs of guilt, obligation, or passive-aggressive manipulation around me?",
      "What creative project requires my steady, disciplined craftsmanship right now?",
    ],
    actionAdvice: "Audit your legal contracts, promises, and relational obligations. Untangle yourself from draining emotional battles. Focus strictly on your primary craft, trusting compounding effort to bring results.",
    tarotCardEcho: "Eight of Pentacles (Mastery & Craftsmanship) & The Empress (Fertile Manifestation)",
    faq: [
      {
        question: "Does killing a spider in a dream ruin your luck?",
        answer: "Folk superstition often warned against killing spiders. In psychological terms, it signifies violently suppressing an unpleasant truth or crushing your own creative instinct out of fear.",
      },
    ],
  },
  {
    slug: "house-on-fire",
    title: "House on Fire in Dreams: Passion, Catharsis & Burning Away the Ego",
    subtitle: "Psychic cleansing, destruction of obsolete identities, fierce emotional anger, and radical renewal.",
    category: "Nature & Elements",
    readTime: "8 min read",
    quickAnswer: "A burning house symbolizes deep psychological catharsis, the destruction of obsolete personas, burning anger, or radical spiritual purification clearing the way for your authentic self.",
    neurobiology: "Dreams of raging fire produce intense hyper-arousal during REM sleep. Core body temperature drops during normal REM sleep; acute temperature fluctuations or inflammatory responses (such as a brewing viral infection) can prompt the somatosensory cortex to manifest fiery dreamscapes as an internal sensory reflection.",
    psychological: "In dream analysis, a house represents the holistic psyche: the attic is the intellect and higher consciousness, the living room is the public Persona, the bedroom is intimacy, and the basement is the repressed Shadow. When your house burns down, your old psychological framework has become obsolete. You have outgrown your past life, and the psyche is staging an involuntary controlled burn to prevent complete stagnation.",
    historicalMythology: "In alchemical philosophy, the Phoenix must turn to ashes in sacred fire before it can resurrect with immortal radiance. In Hindu cosmology, Shiva's cosmic dance (Tandava) incinerates an exhausted universe with sacred flames, allowing fresh creation to emerge unburdened by past corruption.",
    spiritual: "Fire is the supreme sacred alchemical purifier (Agni). A fire dream signals rapid karmic burning. Circumstances in your waking life may feel destructive or turbulent, but the fire only consumes what is dead, false, and limiting. Step back from the flames and witness the birth of your sovereign truth.",
    variations: [
      {
        scenario: "Watching the House Burn to Ashes Safely from the Outside",
        meaning: "You have successfully outgrown your past; you are ready to construct a new reality without lingering nostalgia.",
        psychologicalContext: "Healthy detachment from obsolete trauma. You accept transition with mature serenity.",
      },
      {
        scenario: "Trapped Inside a Blazing Room with Heavy Smoke",
        meaning: "Intense emotional burnout, suffocating rage, or feeling that your environment is extinguishing your spirit.",
        psychologicalContext: "Extreme acute stress requiring immediate life restructuring before clinical breakdown occurs.",
      },
      {
        scenario: "Extinguishing the Blaze with Water Successfully",
        meaning: "Successfully defusing a volatile interpersonal explosion through emotional maturity and diplomatic tact.",
        psychologicalContext: "Emotional balance taming runaway impulsive anger and restoring rational order.",
      },
    ],
    journalPrompts: [
      "What old identity, relationship, or lifestyle habit has already died and is merely waiting to be cleared away?",
      "Where am I harboring unexpressed rage that threatens to erupt destructively?",
      "If I were to rebuild my life from scratch tomorrow, what would I refuse to recreate?",
    ],
    actionAdvice: "Conduct a physical de-cluttering ritual. Donate or discard items that tie you to painful past chapters. Channel fiery volcanic energy into intense physical workouts or cathartic creative expression.",
    tarotCardEcho: "The Tower (Collapse of False Structures) & The Sun (Solar Vitality)",
    faq: [
      {
        question: "Does dreaming of a fire predict a real physical disaster?",
        answer: "Almost never. Fire is one of the most purely metaphorical symbols in human psychology, denoting rapid transformation, passion, or intense stress.",
      },
    ],
  },
];

import { EXTRA_DREAMS } from "./dreams-extra";
import { fromContent } from "./content";

const DREAM_ENTRIES_DEFAULT: DreamEntry[] = [...BASE_DREAMS, ...EXTRA_DREAMS];
export const DREAM_ENTRIES: DreamEntry[] = fromContent("dreams", DREAM_ENTRIES_DEFAULT);
