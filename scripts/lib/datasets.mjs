// Every piece of site content that lives in Firestore.
// One Firestore collection per dataset (collection name = key).
//  - `id`: array datasets use this field of each item as the document id
//    (no `id` means the array index is used, zero padded).
//  - `record: true`: the dataset is an object; each key becomes a document.
// `module` / `export` say where the in-code default (the seed) lives, so
// `npm run content:export` can dump it to content/seed.json.
export const DATASETS = [
  { key: "zodiac_signs", module: "horoscopes-data", export: "ZODIAC_SIGNS", id: "id" },
  { key: "zodiac_profiles", module: "zodiac-profiles", export: "ZODIAC_PROFILES", id: "id" },
  { key: "dreams", module: "dreams-data", export: "DREAM_ENTRIES", id: "slug" },
  { key: "dream_deep", module: "dreams-deep", export: "DREAM_DEEP_DIVES", record: true },
  { key: "symbols", module: "symbols-data", export: "SYMBOL_ENTRIES", id: "slug" },
  { key: "symbol_deep", module: "symbol-deep", export: "SYMBOL_DEEP", record: true },
  { key: "life_paths", module: "life-path-data", export: "LIFE_PATH_ENTRIES", id: "slug" },
  { key: "life_path_deep", module: "life-path-deep", export: "LIFE_PATH_DEEP", record: true },
  { key: "chinese_animals", module: "chinese-zodiac-data", export: "ANIMAL_PROFILES", id: "slug" },
  { key: "chinese_trines", module: "chinese-zodiac-data", export: "TRINES", record: true },
  { key: "chinese_clashes", module: "chinese-zodiac-data", export: "CLASHES", record: true },
  { key: "chinese_element_notes", module: "chinese-zodiac-data", export: "ELEMENT_NOTES", record: true },
  { key: "tarot", module: "tarot-data", export: "TAROT_DECK", id: "id" },
  { key: "quiz_questions", module: "quiz-data", export: "AURA_QUESTIONS", id: "id" },
  { key: "quiz_results", module: "quiz-data", export: "AURA_RESULTS", record: true },
  { key: "moods", module: "moods-data", export: "MOOD_STATES", id: "id" },
  { key: "compat_curated", module: "compatibility-data", export: "CURATED_REPORTS", record: true },
  { key: "compat_pair_text", module: "compat-pair-text", export: "PAIR_TEXT", record: true },
  { key: "aspects", module: "aspects", export: "ASPECTS", id: "distance" },
  { key: "months", module: "zodiac-calendar", export: "MONTHS", id: "slug" },
  { key: "elements", module: "zodiac-calendar", export: "ELEMENTS", id: "slug" },
  { key: "seo_dreams", module: "seo-titles", export: "DREAM_SEO_TITLES", record: true },
  { key: "seo_symbols", module: "seo-titles", export: "SYMBOL_SEO_TITLES", record: true },
  { key: "house_themes", module: "astro", export: "HOUSE_THEMES" },
  { key: "phase_advice", module: "astro", export: "PHASE_ADVICE", record: true },
  { key: "planet_themes", module: "planet-text", export: "PLANET_THEMES", record: true },
  { key: "sign_style", module: "planet-text", export: "SIGN_STYLE", record: true },
  { key: "house_meaning", module: "planet-text", export: "HOUSE_MEANING" },
];

/** Dataset value -> [{ id, order, value }] documents. */
export function toDocs(ds, value) {
  if (ds.record) {
    return Object.entries(value).map(([k, v], order) => ({ id: String(k), order, value: v }));
  }
  return value.map((item, order) => ({
    id: ds.id ? String(item[ds.id]) : String(order).padStart(4, "0"),
    order,
    value: item,
  }));
}

/** [{ id, order, value }] documents -> dataset value. */
export function fromDocs(ds, docs) {
  const sorted = [...docs].sort((a, b) => a.order - b.order);
  if (ds.record) return Object.fromEntries(sorted.map((d) => [d.id, d.value]));
  return sorted.map((d) => d.value);
}
