// Dumps the content that ships in code to content/seed.json.
// This is the starting point for Firestore (npm run content:push) and a
// backup you can restore from. Run: npm run content:export
// It always uses the in-code defaults, never Firestore, so the seed is stable.
import { writeFileSync, mkdirSync } from "node:fs";
import { DATASETS } from "./lib/datasets.mjs";

// Make sure fromContent() falls back to the defaults in code.
writeFileSync(new URL("../src/generated/content.json", import.meta.url), "{}\n");

const seed = {};
for (const ds of DATASETS) {
  const mod = await import(new URL(`../src/lib/${ds.module}.ts`, import.meta.url).href);
  const value = mod[ds.export];
  if (value === undefined) throw new Error(`${ds.module}.${ds.export} is not exported`);
  seed[ds.key] = JSON.parse(JSON.stringify(value));
}

mkdirSync(new URL("../content/", import.meta.url), { recursive: true });
writeFileSync(new URL("../content/seed.json", import.meta.url), JSON.stringify(seed, null, 1) + "\n");
const counts = Object.entries(seed).map(([k, v]) => `${k}:${Array.isArray(v) ? v.length : Object.keys(v).length}`);
console.log(`Wrote content/seed.json (${DATASETS.length} datasets)\n${counts.join("  ")}`);
