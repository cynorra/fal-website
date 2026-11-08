// Writes src/generated/content.json before dev and build.
//  - FIREBASE_PROJECT_ID set: read every dataset from Firestore (REST, no key:
//    firestore.rules let anyone read published documents and nothing else).
//    Any failure fails the build instead of deploying a site with content missing.
//  - Not set: write an empty file, so the defaults that ship in code are used.
import { mkdirSync, writeFileSync, existsSync, readFileSync } from "node:fs";
import { DATASETS, fromDocs } from "./lib/datasets.mjs";

const out = new URL("../src/generated/content.json", import.meta.url);
mkdirSync(new URL("../src/generated/", import.meta.url), { recursive: true });

function loadDotEnv() {
  const f = new URL("../.env", import.meta.url);
  if (!existsSync(f)) return {};
  return Object.fromEntries(
    readFileSync(f, "utf8")
      .split(/\r?\n/)
      .filter((l) => l && !l.startsWith("#") && l.includes("="))
      .map((l) => [l.slice(0, l.indexOf("=")).trim(), l.slice(l.indexOf("=") + 1).trim().replace(/^"|"$/g, "")])
  );
}
const env = { ...loadDotEnv(), ...process.env };
const PROJECT = env.FIREBASE_PROJECT_ID || "";

function plain(v) {
  if (!v || "nullValue" in v) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("arrayValue" in v) return (v.arrayValue.values ?? []).map(plain);
  if ("mapValue" in v) return Object.fromEntries(Object.entries(v.mapValue.fields ?? {}).map(([k, x]) => [k, plain(x)]));
  return null;
}

async function fetchCollection(key) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents:runQuery`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: key }],
        where: { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "published" } } },
      },
    }),
  });
  if (!res.ok) throw new Error(`Firestore ${key}: ${res.status} ${res.statusText} ${await res.text()}`);
  const rows = (await res.json()).filter((x) => x.document);
  return rows.map((x) => {
    const f = Object.fromEntries(Object.entries(x.document.fields ?? {}).map(([k, v]) => [k, plain(v)]));
    return { id: f.doc_id, order: Number(f.order ?? 0), value: JSON.parse(f.json) };
  });
}

if (!PROJECT) {
  writeFileSync(out, "{}\n");
  console.log("sync-content: FIREBASE_PROJECT_ID not set, using the content that ships in code.");
} else {
  const data = {};
  let docs = 0;
  for (const ds of DATASETS) {
    const rows = await fetchCollection(ds.key);
    if (!rows.length) {
      console.warn(`sync-content: "${ds.key}" has no published documents in Firestore, using the default in code.`);
      continue;
    }
    data[ds.key] = fromDocs(ds, rows);
    docs += rows.length;
  }
  writeFileSync(out, JSON.stringify(data));
  console.log(`sync-content: read ${docs} documents from Firestore project "${PROJECT}" (${Object.keys(data).length}/${DATASETS.length} datasets).`);
}
