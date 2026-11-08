import type { DeepDive } from "./symbols-deep";

const WAKE: Record<string, string[]> = {
  tornado: ["Storm dreams that return every night often track a real source of pressure: a deadline, a family argument or financial worry. If yours repeat, note what you were doing in the hours before bed and whether the dream eases when the stress does.", "Seek help if the nightmares start before a bad day, cause dread of sleeping, or follow a real storm or disaster you lived through."],
  flying: ["Flying dreams that become frequent can simply mean you are sleeping lightly and dreaming vividly, or that you are practicing lucid dreaming. They are not a concern on their own.", "Mention it to a doctor only if dreams come with sleep paralysis that frightens you, daytime sleepiness or dizziness."],
  spider: ["Repeated spider dreams commonly follow weeks of low-level stress or a real encounter. Look for something small but persistent in your life, like an email thread or a nagging chore, that matches the crawling feeling.", "A specific phobia that disturbs sleep or daily life responds well to short courses of therapy."],
  "dog bite": ["If you dream of being bitten again and again, check whether a particular person or situation makes you feel quietly attacked. Dreams often return to a theme until it is dealt with.", "If the dreams follow a real dog attack, talk to a professional, as post-incident nightmares are treatable."],
  "house fire": ["Fire dreams that repeat can mean anger or anxiety is being pushed down. Notice which room recurs and what it stands for in your life right now.", "If you wake up in a panic often, or the dreams follow a real fire, a therapist can help; a working smoke alarm is also a good practical step."],
  drowning: ["Drowning dreams that return weekly are worth tracking along with your breathing: snoring, waking with a dry mouth or gasping can point to sleep apnea.", "Seek medical advice for breathing symptoms and emotional support if the dream matches a feeling of sinking in daily life."],
  "black cat": ["A cat that keeps appearing may be pointing to something you sense but have not named, such as a relationship that feels slightly off. Jot down where the cat was and how it behaved.", "If the dream causes fear of sleeping or follows a real scare, a counselor can help."],
  grief: ["Grief dreams often return around birthdays, anniversaries and holidays. They are not a sign that you are stuck; they usually soften with time.", "Seek support if grief makes it hard to function for months, if you feel hopeless, or if you have thoughts of harming yourself. Local crisis lines are available in most countries."],
};

const wake = (topic: string): { heading: string; body: string[] } => ({
  heading: `When a recurring ${topic} dream deserves attention`,
  body: WAKE[topic] ?? [],
});

export const DREAM_DEEP_DIVES: Record<string, DeepDive> = {
  "tornado-dream-meaning": {
    sections: [
      {
        heading: "Tornado dream: what each detail tends to symbolize",
        body: [
          "The size and distance of the tornado matter. A distant tornado that you watch from safety often reflects a looming stress that has not reached you yet, such as a pending deadline or a family conflict. A tornado that is chasing you suggests you feel pursued by something you have not dealt with, while one that hits your home points to worries about security and relationships.",
          "How you respond is also telling. Hiding in a shelter can mean you are coping through avoidance or preparation; running suggests a feeling of overwhelm; watching calmly can reflect acceptance of change.",
        ],
      },
      {
        heading: "Why stress and change trigger tornado dreams",
        body: [
          "Dream researchers note that weather dreams often appear during periods of rapid change: a move, job change, breakup or health scare. The swirling, chaotic image fits how it feels when many demands arrive at once. Disasters in dreams are common and do not predict real events.",
        ],
      },
      {
        heading: "What to do after a tornado dream",
        body: [
          "Write down the three biggest stresses in your life right now and mark which ones you can control. For the ones you can't, practice a calming routine before bed such as slow breathing or light stretching. If the same dream returns, try rehearsing a different ending while awake: imagine the storm passing or you finding shelter. This technique, called imagery rehearsal, is used in therapy for recurring nightmares.",
        ],
      },
      wake("tornado"),
    ],
    faq: [
      { question: "Does a tornado dream mean disaster is coming?", answer: "No. There is no evidence that dreams predict events. A tornado usually reflects stress, change or feeling out of control." },
      { question: "What does surviving a tornado in a dream mean?", answer: "Survival is often read as resilience: you feel you can handle the pressures you are facing." },
    ],
  },
  "flying-uncontrolled-or-free": {
    sections: [
      {
        heading: "Why flying dreams feel so real",
        body: [
          "Flying dreams are among the most commonly reported dream themes. They often happen during REM sleep, when the brain's balance system (vestibular system) is active while the body is paralyzed. That mix of motion signals and stillness may help explain the sensation of floating or soaring.",
          "Many people find them joyful, and some have lucid flying dreams, where they realize they are dreaming and can steer.",
        ],
      },
      {
        heading: "Flying high, low or struggling to stay up",
        body: [
          "Soaring easily at height is commonly read as freedom, confidence or perspective on a problem. Flying close to the ground or barely staying airborne is linked to uncertainty about your goals or energy. Crashing or losing control can reflect fear of failing or of overreaching.",
          "Details such as what you see below, whether you are alone and how you feel afterward all help you interpret what the dream means for you.",
        ],
      },
      {
        heading: "How to have more flying dreams",
        body: [
          "Lucid dreaming techniques include reality checks during the day (asking yourself 'am I dreaming?'), keeping a dream journal and going to bed with the intention to notice you are dreaming. Results vary and not everyone gets them. Keep a regular sleep schedule, because irregular sleep makes dreaming less vivid and more fragmented.",
        ],
      },
      wake("flying"),
    ],
    faq: [
      { question: "Is dreaming of flying a good sign?", answer: "Usually yes. It is associated with freedom, confidence and a wider perspective, especially when the dream feels pleasant." },
      { question: "Why can't I control my flight in dreams?", answer: "Lack of control often mirrors waking uncertainty. Lucid dreaming practice can help you steer." },
    ],
  },
  "spiders-weaving-or-crawling": {
    sections: [
      {
        heading: "Spider dreams and fear: why spiders show up",
        body: [
          "Arachnophobia is among the most common specific fears, so spiders are a frequent dream symbol of anxiety. A spider crawling on you often reflects something small that is bothering you and that you want to remove, such as a persistent worry or a draining person.",
          "A spider building a web can instead symbolize patience, creativity and weaving together projects or relationships. Many cultures treat spiders as symbols of fate and creation, such as the Greek story of Arachne.",
        ],
      },
      {
        heading: "Types of spider dreams",
        body: [
          "Large spiders are typically read as bigger worries. Many small spiders suggest numerous minor stresses. A spider bite is associated with feeling hurt by someone or something small that got through your defenses. Killing a spider can represent facing and overcoming a fear.",
          "The color and species are less important than how you felt: terror suggests anxiety, curiosity suggests interest in transformation.",
        ],
      },
      {
        heading: "How to reduce spider-related nightmares",
        body: [
          "If spider dreams disturb your sleep, gradual exposure to the fear while awake, such as looking at pictures, can reduce its power. Relaxation before bed and avoiding scary media at night also help. Persistent phobias respond well to therapy.",
        ],
      },
      wake("spider"),
    ],
    faq: [
      { question: "Is a spider dream good or bad?", answer: "It depends on the feelings in the dream. Fear points to anxiety; a web being built can reflect creativity and patience." },
      { question: "What does it mean to dream of a black spider?", answer: "Often it is read as a heavier worry or a hidden issue, but this is symbolic and personal." },
    ],
  },
  "dog-bite-dream-meaning": {
    sections: [
      {
        heading: "Which body part was bitten?",
        body: [
          "Interpretations often depend on where the bite occurred. A bite on the hand is traditionally linked to work or help you give; on the leg or foot to progress and stability; on the face to reputation and how others see you. These are symbolic readings drawn from folklore and dream books, not scientific findings.",
          "Think about what that part of the body does in your daily life and which situation feels threatened.",
        ],
      },
      {
        heading: "Familiar dog vs. stranger dog",
        body: [
          "If your own dog bites you in a dream, it may reflect a feeling of betrayal by someone loyal, or a conflict in a trusted relationship. A stray or aggressive dog can represent an outside threat or an unfamiliar situation.",
          "Dogs are symbols of loyalty, so a bite from one is often about trust. Consider whether you feel let down or you have let someone down.",
        ],
      },
      {
        heading: "What to do with this dream",
        body: [
          "Ask yourself where you feel attacked or criticized right now. If a real conflict comes to mind, consider an honest conversation. If the dream relates to a real dog bite or fear of dogs, gradual, supervised exposure and professional support can help.",
        ],
      },
      wake("dog bite"),
    ],
    faq: [
      { question: "Does being bitten by a dog in a dream mean betrayal?", answer: "Often it is read that way, especially if the dog is familiar, but it can also reflect general stress or conflict." },
      { question: "What if I fight back against the dog?", answer: "Fighting back can symbolize standing up for yourself in a waking conflict." },
    ],
  },
  "house-on-fire": {
    sections: [
      {
        heading: "House fire dream: which room is burning?",
        body: [
          "A house often represents the self, and each room a different part of life. A burning kitchen may point to nourishment and family; the bedroom to intimacy and rest; the basement to buried memories; the attic to thoughts and ideas. The room can hint at where you feel pressure.",
          "Fire in dreams symbolizes strong emotion: anger, passion or transformation. Whether it destroys or purifies depends on how you feel about it.",
        ],
      },
      {
        heading: "Escaping, watching or fighting the fire",
        body: [
          "Escaping can reflect a desire to leave a stressful situation. Watching from outside might mean you feel helpless to prevent a change. Fighting the fire suggests you are working hard to keep a situation under control.",
          "A house fire dream does not predict a real fire, though it can be a good reminder to check your smoke detectors.",
        ],
      },
      {
        heading: "Turning fear into action",
        body: [
          "Identify the emotion that felt strongest. If it was anger, look for where it needs an outlet. If it was fear of loss, list what you are afraid to lose and what you can do to protect it. Journaling or talking with a trusted person helps release the intensity.",
        ],
      },
      wake("house fire"),
    ],
    faq: [
      { question: "Is a house fire dream a warning?", answer: "It is not a prediction. It usually reflects strong emotions or fear of loss and change." },
      { question: "What does a fire that does not burn mean?", answer: "A fire that glows without destroying is often interpreted as transformation, passion or purification." },
    ],
  },
  "drowning-in-deep-water": {
    sections: [
      {
        heading: "Why we dream of drowning",
        body: [
          "Drowning dreams commonly appear when people feel overwhelmed by emotion, responsibility or change. Water is a classic symbol of feeling, so being submerged suggests that emotions are too strong to keep afloat. The sensation of breathlessness may also be influenced by real breathing changes during sleep, such as congestion or sleep apnea.",
          "If you wake gasping regularly, mention it to a doctor, as sleep disorders can cause breathing-related dreams.",
        ],
      },
      {
        heading: "Calm water, rough water and rescue",
        body: [
          "Calm deep water can reflect the unconscious and a quiet longing for depth, while rough water suggests turmoil. Being rescued often reflects a need for support or a feeling that help is available. Learning to swim or breathe underwater in a dream is commonly read as adapting to a challenging situation.",
        ],
      },
      {
        heading: "What helps when you feel overwhelmed",
        body: [
          "List what is weighing on you and pick the one smallest step you can take this week. Reach out to a friend or professional if you feel you are sinking emotionally. Breathing exercises before sleep can reduce nighttime anxiety.",
        ],
      },
      wake("drowning"),
    ],
    faq: [
      { question: "What does drowning in a dream mean?", answer: "Most often it reflects feeling overwhelmed by emotions or responsibilities." },
      { question: "Can sleep problems cause drowning dreams?", answer: "Yes. Congestion, sleep apnea or breathing changes may contribute to dreams of suffocation or drowning." },
    ],
  },
  "black-cats-and-felines": {
    sections: [
      {
        heading: "Black cat symbolism: luck or bad luck?",
        body: [
          "Black cats are lucky in some cultures and unlucky in others. In the UK and Japan they are often considered good luck, while in parts of Europe and the US they were linked to witchcraft and misfortune. Ancient Egypt revered cats, associating them with the goddess Bastet.",
          "In dreams, a black cat can represent intuition, independence, mystery or a hidden part of yourself, depending on how you feel about it.",
        ],
      },
      {
        heading: "Friendly, hostile or silent cats",
        body: [
          "A friendly cat often signals comfort with your own independence. A hissing or scratching cat may mean a boundary has been crossed, or that you sense hidden hostility. A cat watching silently is often read as intuition that something is unclear.",
          "Cats are associated with independence and sensuality, so your relationship with these qualities may show up in the dream.",
        ],
      },
      {
        heading: "Using the dream for self-reflection",
        body: [
          "Ask what feels mysterious or unresolved in your life, and which relationships ask you to give up your independence. Notice whether you feel fear or fascination when you think of the cat. Your emotional reaction is the best clue to its meaning.",
        ],
      },
      wake("black cat"),
    ],
    faq: [
      { question: "Is dreaming of a black cat bad luck?", answer: "Not necessarily. It depends on the culture and on how you feel in the dream." },
      { question: "What does a cat scratching me in a dream mean?", answer: "Often it is read as a warning about a hidden conflict or a boundary being crossed." },
    ],
  },
  "deceased-loved-one-visiting": {
    sections: [
      {
        heading: "Visitation dreams: why they feel so real",
        body: [
          "Many grieving people report vivid dreams of those they've lost, in which the person seems present, healthy and often reassuring. Researchers describe these as part of normal grief processing. They tend to be clear and emotionally intense, and people remember them for years.",
          "Whether you view them as memory, wish or spiritual contact, they commonly bring comfort and a sense of closure.",
        ],
      },
      {
        heading: "What different visits can mean",
        body: [
          "A calm, smiling visitor is often read as reassurance. A dream in which the person is silent or distant may reflect unfinished feelings. A distressing dream may reflect guilt or unresolved conflict. None of these needs to be a message; they show how you are processing the loss.",
        ],
      },
      {
        heading: "Coping with grief after these dreams",
        body: [
          "Writing a letter to the person, visiting a meaningful place or sharing memories can help you hold on to the comfort without leaning on the dream to answer big questions. If grief is overwhelming or lasts so long that it disrupts daily life, a counselor or grief support group can help.",
        ],
      },
      wake("grief"),
    ],
    faq: [
      { question: "Is it really them visiting me?", answer: "Beliefs vary. Psychology views these dreams as part of processing grief, while many people also find spiritual meaning in them." },
      { question: "Why do I dream of my loved one so often?", answer: "Frequent dreams are common during grief, particularly around anniversaries and difficult moments." },
    ],
  },
};
