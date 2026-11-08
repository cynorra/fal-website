export interface DeepSection {
  heading: string;
  body: string[];
}

export interface DeepDive {
  sections: DeepSection[];
  faq: { question: string; answer: string }[];
}

export const skeptic =(code: string): DeepSection => ({
  heading: `Why do I keep seeing ${code}? The psychological explanation`,
  body: [
    `Psychologists call it the frequency illusion (also the Baader-Meinhof phenomenon): once you notice a pattern, your brain flags it every time it appears, and you forget the many times it did not. Clocks, receipts, license plates and phone numbers are full of digits, so any number you are primed to notice will seem to follow you.`,
    `That does not make ${code} meaningless. Many people use a repeating number as a deliberate pause button: a cue to check in with how they feel, what they are avoiding and what they actually want. Treat it as a reflection prompt rather than a prediction, and you get the benefit either way.`,
  ],
});

export const DEEP_DIVES: Record<string, DeepDive> = {
  "angel-number-333": {
    sections: [
      {
        heading: "333 on the clock: what 3:33 means",
        body: [
          "Seeing 3:33 on a clock is the most reported version of this number. In angel number traditions the middle of the night is a quiet hour when you are not distracted, so a waking moment at 3:33 is read as an invitation to notice what your mind returns to. Common questions people ask themselves are: what creative idea keeps resurfacing, what conversation have I been avoiding, and what do I want to say out loud?",
          "A practical reading is to keep a notebook by the bed. If 333 keeps showing up around the same worry or idea, write it down and look at it in daylight. The pattern in what you write is usually more useful than the number itself.",
        ],
      },
      {
        heading: "333 meaning if you are single or in a relationship",
        body: [
          "If you are single, 333 is usually read as a call to be more expressive and social: say yes to invitations, share your interests and let people see your real personality. The theme of the number three is communication and growth, so the advice is to speak up rather than wait to be chosen.",
          "If you are in a relationship, 333 points to honest conversation. It is often interpreted as a nudge to share something you have been holding back, or to add play and shared creativity such as cooking, music or a project you build together. Neither reading predicts an outcome. They suggest where attention might help.",
        ],
      },
      {
        heading: "333 for money, work and creative projects",
        body: [
          "For work, 333 is associated with visibility: pitching an idea, publishing something, teaching or leading a group. Creative professionals often take it as encouragement to finish and share work that is sitting in a drawer.",
          "A grounded way to act on it is to pick one project and set a small public deadline, such as sending a draft to a friend by Friday. Confidence grows from small shared steps rather than waiting for a perfect moment.",
        ],
      },
      {
        heading: "333 and the number three in numerology",
        body: [
          "In numerology three is the number of expression, optimism and social connection. It sits between the ambition of one and the stability of four, which is why it is linked with growth and communication. Repeating it three times amplifies those themes in the reading, though no system has been scientifically validated.",
          "If you want to explore the surrounding numbers, 222 is linked with balance and trust, and 444 with foundations and protection. Together they form a progression from partnership to expression to structure.",
        ],
      },
      skeptic("333"),
    ],
    faq: [
      { question: "What does 333 mean in a twin flame or soulmate context?", answer: "Traditions that use the twin flame idea read 333 as a sign to grow individually and communicate openly rather than as proof of a particular person. It does not predict that anyone is coming or leaving." },
      { question: "Is 333 a good or bad number?", answer: "It is considered positive in angel number traditions, associated with creativity, encouragement and support. Whether it matters at all is a matter of personal belief." },
      { question: "What should I do when I see 333 repeatedly?", answer: "Pause, take a breath and notice what you were thinking about. Then take one small expressive action: write, call someone, create something or share an idea." },
    ],
  },
  "angel-number-555": {
    sections: [
      {
        heading: "What 5:55 on the clock is said to mean",
        body: [
          "People often report noticing 5:55 in the early morning or late afternoon, and it is usually interpreted as a cue that a change is already underway. Five is the number of movement and variety in numerology, so a triple five is read as a signal to stay flexible.",
          "A sensible response is to ask which change you are resisting. Often there is already a decision pending, such as a job offer, a move or a relationship conversation, and the number acts as a reminder that waiting rarely makes it easier.",
        ],
      },
      {
        heading: "555 meaning in love and after a breakup",
        body: [
          "In love, 555 is most commonly linked with transition. For someone who just went through a breakup it is read as reassurance that the ending is part of a larger shift, not a verdict on your worth. For couples it can mean a relationship is entering a new phase, such as moving in together, changing cities or renegotiating roles.",
          "Nothing about the number says whether a particular person will return. It is better used as a prompt to ask what you want your next chapter to look like and what you are no longer willing to tolerate.",
        ],
      },
      {
        heading: "555 and career change or relocation",
        body: [
          "Many people notice 555 during job searches, layoffs or when considering a move. The traditional message is to prepare for change rather than fear it. A practical version is to update your resume, save a financial cushion and make a list of what you would regret not trying.",
          "Because five is also linked with risk, the number is not an instruction to quit or leap. It is a reminder to make a decision consciously instead of drifting.",
        ],
      },
      {
        heading: "How to handle big change when you see 555",
        body: [
          "Change feels easier in small pieces. Choose one thing to do this week that moves you toward the new direction, one habit to drop that belongs to the old situation, and one person to tell about your plans. Building a bit of structure around a change is what keeps freedom from feeling like chaos.",
          "If the change is not your choice, such as a loss or an unexpected setback, focus on what is still in your control: sleep, routine, support from people you trust and professional help if the stress feels heavy.",
        ],
      },
      skeptic("555"),
    ],
    faq: [
      { question: "Does 555 always mean something big is going to happen?", answer: "No. It is read as a theme of change and flexibility, not a guarantee of an event. Many people see it during ordinary life transitions." },
      { question: "What does 555 mean spiritually?", answer: "Spiritually it is associated with freedom, adventure and letting go of what no longer fits. It is a symbolic idea rather than a verified prediction." },
      { question: "Is 555 a warning?", answer: "It is more of a heads-up than a warning. The traditional reading is to expect shifts and to adapt, not to be afraid." },
    ],
  },
  "angel-number-1111": {
    sections: [
      {
        heading: "What 11:11 means when you see it on the clock",
        body: [
          "11:11 is the most famous repeating time. Many people make a wish when they see it, a habit that has spread widely online. In angel number traditions it is read as a moment of alignment: your attention is briefly pulled to the present, which is a good time to notice your thoughts and intentions.",
          "A simple ritual is to take one slow breath, name what you want to focus on and then carry on with your day. The value is in the pause, not in the clock.",
        ],
      },
      {
        heading: "1111 as a number of new beginnings",
        body: [
          "In numerology one is the number of starting points, independence and leadership. Four ones side by side intensify that theme and add the master number 11 twice. Master numbers are associated with intuition and heightened sensitivity, which is why 1111 is often called a spiritual awakening number.",
          "In practical terms people tend to see it when they are at the edge of a decision: a new job, a creative project, a move or a change in belief. It reads as encouragement to take the first step.",
        ],
      },
      {
        heading: "1111 meaning in love and twin flame beliefs",
        body: [
          "Online communities often link 1111 with soulmates or twin flames. As a belief this is widespread, but there is no way to verify it. A more grounded reading is that 1111 invites you to be clear about what you want from a partner and to work on being the kind of partner you hope to meet.",
          "If you are already in a relationship, the number can be taken as a prompt to talk about shared goals and to start something new together, even small, such as a weekly ritual or a trip.",
        ],
      },
      {
        heading: "How to use 1111 for manifestation and intentions",
        body: [
          "If you like intention setting, 1111 is a popular trigger. Write one clear sentence about what you want, make it specific and positive, and then add one action you can take within a week. Research on goal setting supports the second part: concrete plans are far more effective than wishes alone.",
          "Avoid reading the number as a promise. It is a cue to reflect and begin, not a guarantee that what you wish for will arrive.",
        ],
      },
      skeptic("1111"),
    ],
    faq: [
      { question: "What should I do when I see 11:11?", answer: "Pause for a breath, notice what you are thinking about and, if you like, make a wish or set a one-line intention. Then take one practical step toward it." },
      { question: "Is 1111 a sign of a spiritual awakening?", answer: "In many angel number traditions it is. It is a symbolic reading tied to the master number 11 and to new beginnings, not a diagnosable event." },
      { question: "Why do I see 1111 everywhere?", answer: "It could be the frequency illusion, where you notice a number more once you are looking for it. Many people also find it meaningful as a reminder to reflect." },
    ],
  },
  "angel-number-222": {
    sections: [
      {
        heading: "222 on the clock: what 2:22 means",
        body: [
          "2:22 is read as a moment to check in on balance. Two is the number of pairs, so the time is linked with partnerships, cooperation and keeping two sides of something in harmony, such as work and rest, or giving and receiving.",
          "A useful response is to ask where your life feels lopsided. If you are giving more than you receive, or working far more than you rest, the number serves as a cue to rebalance.",
        ],
      },
      {
        heading: "222 meaning in relationships and friendships",
        body: [
          "In relationships, 222 is associated with trust, patience and teamwork. It is often interpreted as a sign to be steady in a connection that is still growing, rather than force progress or give up too early.",
          "For friendships and family, it can be a reminder to repair something small: reply to the message, apologize or ask how someone is. The theme is cooperation, not winning.",
        ],
      },
      {
        heading: "222 and patience: waiting for results",
        body: [
          "A common reading is that 222 appears when you have planted seeds but cannot see results yet. The lesson is to keep showing up and to trust the process without checking every day.",
          "To make this practical, define a review date a month away. Until then, focus on consistent effort. Knowing when you will evaluate progress makes waiting easier.",
        ],
      },
      {
        heading: "222 in numerology",
        body: [
          "In numerology two stands for duality, diplomacy and sensitivity. It is the number of listening and compromise. Three twos together reinforce those traits, and 2+2+2=6 links the number to home, care and responsibility.",
          "Compare it with 111, which is about starting, and 333, which is about expression. 222 sits between them as the stage of nurturing something before it grows.",
        ],
      },
      skeptic("222"),
    ],
    faq: [
      { question: "What does 222 mean for love?", answer: "It is read as a sign of trust and balance in partnerships. It encourages patience and honest communication, not a specific outcome." },
      { question: "Is 222 a good sign?", answer: "In angel number traditions yes. It is linked with harmony, cooperation and things coming together at the right pace." },
      { question: "What should I do when I see 222?", answer: "Pause, breathe and ask where you need more balance. Then take one small action, such as a conversation, a rest day or a boundary." },
    ],
  },
};
