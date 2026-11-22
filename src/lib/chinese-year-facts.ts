import { sunLongitude, SIGN_NAMES } from "./astro";
import { chineseNewYear } from "./chinese-calendar";

// Year-specific facts for the Chinese zodiac year pages. Everything here is computed from the calendar
// or follows the standard rules of the traditional system (sexagenary cycle, five phases); nothing is invented per year.

export const STEMS = [
  { name: "Jia", element: "Wood" },
  { name: "Yi", element: "Wood" },
  { name: "Bing", element: "Fire" },
  { name: "Ding", element: "Fire" },
  { name: "Wu", element: "Earth" },
  { name: "Ji", element: "Earth" },
  { name: "Geng", element: "Metal" },
  { name: "Xin", element: "Metal" },
  { name: "Ren", element: "Water" },
  { name: "Gui", element: "Water" },
] as const;

export const STEM_CHARS = ["甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸"] as const;
export const BRANCH_CHARS = ["子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥"] as const;
export const ELEMENT_CHARS: Record<string, string> = { Wood: "木", Fire: "火", Earth: "土", Metal: "金", Water: "水" };
/** The animal's character (simplified) and its pinyin, used for "Chinese symbol" lookups. */
export const ANIMAL_CHARS: Record<string, { char: string; pinyin: string }> = {
  Rat: { char: "鼠", pinyin: "shǔ" }, Ox: { char: "牛", pinyin: "niú" }, Tiger: { char: "虎", pinyin: "hǔ" },
  Rabbit: { char: "兔", pinyin: "tù" }, Dragon: { char: "龙", pinyin: "lóng" }, Snake: { char: "蛇", pinyin: "shé" },
  Horse: { char: "马", pinyin: "mǎ" }, Goat: { char: "羊", pinyin: "yáng" }, Monkey: { char: "猴", pinyin: "hóu" },
  Rooster: { char: "鸡", pinyin: "jī" }, Dog: { char: "狗", pinyin: "gǒu" }, Pig: { char: "猪", pinyin: "zhū" },
};

export const BRANCHES = ["Zi", "Chou", "Yin", "Mao", "Chen", "Si", "Wu", "Wei", "Shen", "You", "Xu", "Hai"] as const;

/** The element each animal carries as its own, fixed by its earthly branch (distinct from the year's element). */
export const ANIMAL_OWN_ELEMENT: Record<string, string> = {
  Rat: "Water", Ox: "Earth", Tiger: "Wood", Rabbit: "Wood", Dragon: "Earth", Snake: "Fire",
  Horse: "Fire", Goat: "Earth", Monkey: "Metal", Rooster: "Metal", Dog: "Earth", Pig: "Water",
};

const GENERATES: Record<string, string> = { Wood: "Fire", Fire: "Earth", Earth: "Metal", Metal: "Water", Water: "Wood" };
const CONTROLS: Record<string, string> = { Wood: "Earth", Earth: "Water", Water: "Fire", Fire: "Metal", Metal: "Wood" };

/** Sexagenary (60-year) cycle position for a zodiac year: stem-branch name, position 1-60 and the stem. */
export function cycleInfo(zodiacYear: number) {
  const i = (((zodiacYear - 4) % 60) + 60) % 60;
  const stem = STEMS[i % 10];
  const branch = BRANCHES[i % 12];
  return { position: i + 1, stem: stem.name, stemElement: stem.element, branch, name: `${stem.name}-${branch}`, chars: `${STEM_CHARS[i % 10]}${BRANCH_CHARS[i % 12]}` };
}

/** The other year of the two-year element pair (each element covers two consecutive years: Yang then Yin). */
export function pairedYear(y: number): number {
  return y % 2 === 0 ? y + 1 : y - 1;
}

export type Relation = "same" | "supports" | "feeds" | "tests" | "leads";

/** How the year's element relates to the animal's own element in five-phase theory. */
export function relation(yearElement: string, animalElement: string): Relation {
  if (yearElement === animalElement) return "same";
  if (GENERATES[yearElement] === animalElement) return "supports";
  if (GENERATES[animalElement] === yearElement) return "feeds";
  if (CONTROLS[yearElement] === animalElement) return "tests";
  return "leads"; // the animal's element controls the year's element
}

export function relationText(rel: Relation, y: number, yearEl: string, animal: string, ownEl: string): string {
  const pair = `${yearEl} ${animal}`;
  switch (rel) {
    case "same":
      return `The ${animal} carries ${ownEl} as its own element, and ${y} also brings ${yearEl}. Traditional readings call this a doubling: the ${pair} is described as a concentrated version of the animal, with its usual strengths and its usual blind spots both turned up.`;
    case "supports":
      return `${yearEl} nourishes ${ownEl} in the cycle of generation, so the ${animal}'s own ${ownEl} is supported by the year's ${yearEl}. Traditional texts describe the ${pair} as helped by its surroundings: the animal's natural tendencies are encouraged rather than checked.`;
    case "feeds":
      return `${ownEl} nourishes ${yearEl} in the cycle of generation, so the ${animal}'s own ${ownEl} feeds the year's ${yearEl}. The ${pair} is traditionally read as giving more than it gets: generous and productive, with a risk of spending its energy faster than it is replaced.`;
    case "tests":
      return `${yearEl} restrains ${ownEl} in the cycle of control, so the year's ${yearEl} presses on the ${animal}'s own ${ownEl}. Traditional readings treat the ${pair} as the animal under some pressure from its element, which is said to build discipline but to make the sign less comfortable than its neighbours.`;
    case "leads":
      return `${ownEl} restrains ${yearEl} in the cycle of control, so the ${animal}'s own ${ownEl} holds the year's ${yearEl} in check. The ${pair} is traditionally read as the animal keeping the upper hand over its element: self-directed and hard to push around, sometimes at the cost of flexibility.`;
  }
}

/** Date (China Standard Time) of Li Chun, the start of spring at solar longitude 315 degrees, used by BaZi astrology as the year boundary. */
export function liChun(year: number): { month: number; day: number; hour: number; minute: number } {
  let lo = Date.UTC(year, 1, 2); // Feb 2 UTC
  let hi = Date.UTC(year, 1, 7);
  for (let k = 0; k < 40; k++) {
    const mid = (lo + hi) / 2;
    const lon = sunLongitude(new Date(mid));
    if (lon >= 300 && lon < 315) lo = mid;
    else hi = mid;
  }
  const t = new Date((lo + hi) / 2 + 8 * 3600000); // CST
  return { month: t.getUTCMonth() + 1, day: t.getUTCDate(), hour: t.getUTCHours(), minute: t.getUTCMinutes() };
}

/** Western Sun sign on a Gregorian date (tropical), used to describe which signs a zodiac year spans. */
export function westernSignOn(year: number, month: number, day: number): string {
  const lon = sunLongitude(new Date(Date.UTC(year, month - 1, day, 4)));
  return SIGN_NAMES[Math.floor(lon / 30) % 12];
}

export function lanternFestival(year: number): { month: number; day: number } {
  const cny = chineseNewYear(year);
  const d = new Date(Date.UTC(year, cny.month - 1, cny.day) + 14 * 86400000);
  return { month: d.getUTCMonth() + 1, day: d.getUTCDate() };
}
