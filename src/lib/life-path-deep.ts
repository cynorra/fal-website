import { fromContent } from "./content";
export interface LifePathDeep {
  example: [number, number, number]; // month, day, year
  friends: string;
  health: string;
  misread: string;
  dayToDay: string;
}

const LIFE_PATH_DEEP_DEFAULT: Record<number, LifePathDeep> = {
  1: {
    example: [1, 14, 1984],
    friends: "A Life Path 1 friend is the one who suggests the trip and books the table. They are loyal but expect directness, and they may need reminding to ask how you are before they explain their own plan. They keep a small circle of people who are honest with them.",
    health: "Drive can turn into overwork. Sleep, daily movement and scheduled rest matter more to a 1 than to most, because they will otherwise push until something breaks. Competitive sports or solo training suit them better than gentle group classes.",
    misread: "People assume a 1 is arrogant. Often they are simply self-reliant and uncomfortable asking for help. Asking them a direct question, instead of waiting for them to offer, usually opens them up.",
    dayToDay: "At their best, a 1 begins the day with one clear priority. Try writing the single most important task each morning and finishing it before opening messages.",
  },
  2: {
    example: [7, 26, 1985],
    friends: "A Life Path 2 friend notices who is left out of the conversation. They are patient listeners and peacemakers, and they remember small details about your life. They can struggle to say no, so friendships work best when you ask what they want too.",
    health: "Stress shows up in the body for a 2: stomach upset, tense shoulders, restless sleep. Steady routines, time in nature and a few close conversations a week protect them. Conflict avoidance builds tension that exercise alone does not release.",
    misread: "A 2 is not weak. Their cooperation is a skill, and they often hold a group together behind the scenes. Mistaking tact for passivity is the usual error.",
    dayToDay: "Practice stating one preference a day, however small, such as where to eat. It trains the 2 to treat their own opinion as information the group needs.",
  },
  3: {
    example: [1, 7, 1984],
    friends: "A Life Path 3 is the friend who makes the group chat funny and remembers everyone's birthday. They need an audience for their ideas and stories, and they can go quiet when they feel unheard. Honest, light-hearted feedback keeps them grounded.",
    health: "Emotional and physical energy rise and fall together. A 3 benefits from creative outlets such as writing, music or dance, and from sleep that does not depend on the social calendar. Throat and voice care matter if they speak or sing a lot.",
    misread: "Their humor can hide seriousness. A 3 who jokes about a problem may be quietly worried about it. A gentle direct question lets the real answer through.",
    dayToDay: "Finish one small creative thing each day, even ten minutes. It turns scattered inspiration into a habit that actually produces work.",
  },
  4: {
    example: [1, 26, 1984],
    friends: "A Life Path 4 friend shows up when they say they will. They prefer a few long friendships to many casual ones and show care through practical help like moving boxes, fixing something or driving you to the airport. They dislike last-minute changes.",
    health: "The risk is rigidity and long sitting hours. Regular movement, a consistent sleep time and scheduled breaks work best for a 4, who responds to systems rather than inspiration. Back and joint care deserve attention.",
    misread: "People call a 4 boring. They are often deeply humorous with people they trust, and their reliability is a form of generosity that is easy to overlook.",
    dayToDay: "Build one small system, such as a weekly review or a fixed place for keys and papers. For a 4, the order frees energy for people and play.",
  },
  5: {
    example: [2, 26, 1985],
    friends: "A Life Path 5 friend brings novelty: new places, new foods, new people. They are fun and generous with their time but can disappear when they feel tied down. Friends who give them space and invite them to plans keep the bond strong.",
    health: "A 5 does best with varied exercise and a flexible schedule. Overindulgence in food, drink or stimulation is the common trap, so build limits that feel like choices rather than rules. Travel and sleep disruption can drain them.",
    misread: "Restlessness is not shallowness. A 5 learns by experience, and many of them are quick studies who handle change better than almost anyone.",
    dayToDay: "Plan one new thing a week on purpose, such as a different route or a new recipe, so the need for variety is met without wrecking commitments.",
  },
  6: {
    example: [1, 19, 1984],
    friends: "A Life Path 6 friend is the caregiver of the group. They host dinners, check in after bad news and remember what you need. They can slip into fixing everyone's problems, so friends help by caring for them in return.",
    health: "A 6 often neglects themselves while caring for others. Scheduled rest, regular checkups and help with household tasks matter. Stress tends to build in the stomach and chest, so relaxation and honest conversations help.",
    misread: "A 6 is not a pushover. Their sense of fairness is strong, and they can be firm when they see harm or neglect. Their giving is a choice, not an obligation.",
    dayToDay: "Do one thing each day that is only for you, without making it useful to anyone else. It rebuilds the habit of receiving.",
  },
  7: {
    example: [2, 19, 1984],
    friends: "A Life Path 7 friend is private and thoughtful. They prefer deep conversations to chatter and may need alone time after socializing. Friends who respect their silence, and do not take it personally, earn their trust and their loyalty.",
    health: "Overthinking disturbs sleep for a 7. Quiet time, time outdoors, reading and gentle exercise such as walking or yoga help the mind settle. They do best when they limit screens late at night.",
    misread: "Withdrawal is not coldness. A 7 recharges by being alone. Giving them room and then following up warmly works better than pushing for closeness.",
    dayToDay: "Set aside thirty minutes of quiet, device-free time daily. It gives the analytical mind a place to rest and often produces the insight they were looking for.",
  },
  8: {
    example: [3, 19, 1984],
    friends: "A Life Path 8 friend is generous in practical ways and often the one people call for advice about work or money. They respect competence and honesty. They may have to learn that relationships are not transactions and that vulnerability builds trust.",
    health: "Long work hours and stress are the main risks. An 8 does well with a fixed training schedule and regular checkups, and they should guard against treating rest as wasted time. Heart health and blood pressure deserve attention.",
    misread: "An 8 is often seen as only interested in money or status. Many are motivated by building something meaningful and by supporting people through power used well.",
    dayToDay: "Block time each week with no goal other than enjoyment. For an 8, learning to value rest as part of performance is a lasting skill.",
  },
  9: {
    example: [4, 19, 1984],
    friends: "A Life Path 9 friend is warm, wise and a little idealistic. They are generous with time and attention, and they stay loyal through hard seasons. They can struggle to let go of friendships that have run their course.",
    health: "A 9 absorbs the emotions of others and can feel depleted. Boundaries, time in nature, creative expression and regular rest help. Habits that mark endings, like cleaning a room after a project, support their cycle.",
    misread: "A 9 is not always selfless. They need to be appreciated, and quiet resentment can build if their giving is taken for granted. Saying thank you matters.",
    dayToDay: "Close one small loop each day, such as answering an old message or returning a borrowed item. Completing things lightens the 9's emotional load.",
  },
  11: {
    example: [2, 14, 1984],
    friends: "A Life Path 11 friend is sensitive and perceptive, often sensing mood before anything is said. They are inspiring and can be intense, and they need friends who are open and not afraid of feeling. They can wear out quickly in crowded settings.",
    health: "Nervous system sensitivity is the theme. An 11 benefits from sleep, quiet, limited caffeine, and grounding practices such as walking, breathwork or time outside. Persistent anxiety deserves professional support, not just self-help.",
    misread: "The 'master number' label can add pressure. Many 11s feel they must live up to a destiny. Treating it as a theme to explore, not an obligation, lets them grow with less stress.",
    dayToDay: "Pair every intuitive idea with one practical step. An 11 who turns inspiration into small, visible actions feels less overwhelmed.",
  },
  22: {
    example: [9, 26, 1985],
    friends: "A Life Path 22 friend thinks big and builds steadily. They are loyal and capable, and often become the organizer of any group project. They may be so focused on goals that they forget to relax, so friends who suggest play are valuable.",
    health: "Pressure is the risk. A 22 can take on too much and carry it silently. Regular exercise, delegation and sleep protect them. They should treat breaks as part of the plan.",
    misread: "A 22 is not simply a super-4. They combine practicality with vision, and without a meaningful aim they can feel stuck. Connecting daily work to a larger purpose matters.",
    dayToDay: "Write the long-term aim at the top of the week's plan so everyday tasks stay connected to it. Then choose three tasks that move it forward.",
  },
  33: {
    example: [3, 26, 1984],
    friends: "A Life Path 33 friend is deeply caring, often a teacher or caregiver by nature. They give a lot and can be overwhelmed by others' needs. Friends who offer practical help and respect their limits help them stay in balance.",
    health: "Compassion fatigue is the main risk. A 33 should keep boundaries, rest regularly and seek support themselves. Creative practices and quiet time rebuild energy.",
    misread: "33 is the least used master number and some numerologists reduce it to 6. Treat the label lightly. The real question is whether you recognise the caring, teaching drive in yourself.",
    dayToDay: "Pick one act of service a day and one act of self-care. Pairing them keeps giving sustainable.",
  },
};
export const LIFE_PATH_DEEP: Record<number, LifePathDeep> = fromContent("life_path_deep", LIFE_PATH_DEEP_DEFAULT);
