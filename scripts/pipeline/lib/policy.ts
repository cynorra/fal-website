/**
 * Content policy for the Horoscopes and Charts generator: what an astrology / dream /
 * numerology article may promise.
 * Refused: predictions of real events, guarantees, medical / legal / financial advice,
 * death / illness forecasts, lottery or gambling numbers, "fix your life" claims.
 * (AdSense misleading-claims risk, YMYL risk, harm to readers.)
 */
const PROMISE_TITLE_RE =
  /\b(guarantee[sd]?|guaranteed|will (?:you|i) (?:find|meet|marry|get|win|die|lose)|predict(?:s|ion|ions|ing)? (?:your|the) (?:future|death|marriage|pregnancy|lottery)|lottery|winning numbers?|lucky numbers? (?:to|for) (?:win|gambl|bet)|cure[sd]?|heal(?:s|ing)? (?:your )?(?:illness|disease|cancer|depress|anxiety)|remove (?:a |the )?(?:curse|spell)|curse removal|black magic|love spell|spell that works|make (?:him|her|them) (?:love|come back)|fix your (?:life|marriage|finances)|get rich|win the lottery|100% accurate|proven (?:to|by science))\b/i;

export function isMonetaryPromiseTitle(title: string): boolean {
  // Name kept for compatibility with claims-check.ts; here it means "promise the page cannot keep".
  return PROMISE_TITLE_RE.test(title);
}

export const REFUSED_TITLE_RE = PROMISE_TITLE_RE;

/** Why a proposed topic is refused, or null. */
export function whyTopicRefused(title: string): string | null {
  if (PROMISE_TITLE_RE.test(title)) return 'promises an outcome, a prediction of a real event, a cure or a spell';
  if (/\b(20[0-2]\d)\b/.test(title) && !/\b2026|2027\b/.test(title)) return 'names an old year';
  if (/\b(horoscope|forecast)\b.*\b(today|tomorrow|this week|this month|this year)\b/i.test(title)) return 'a dated horoscope is already produced, from real positions, by the horoscope pages';
  return null;
}
