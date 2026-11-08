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

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function fetchCollection(key) {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents:runQuery`;
  const body = JSON.stringify({
    structuredQuery: {
      from: [{ collectionId: key }],
      where: { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "published" } } },
    },
  });
  // Retry transient failures (5xx, 429, and the brief 403s right after rules are published).
  let res;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      if (res.ok || ![403, 429, 500, 502, 503, 504].includes(res.status)) break;
    } catch (e) {
      if (attempt === 6) throw e;
    }
    await sleep(2000 * attempt);
  }
  if (!res.ok) throw new Error(`Firestore ${key}: ${res.status} ${res.statusText} ${await res.text()}`);
  const rows = (await res.json()).filter((x) => x.document);
  return rows.map((x) => {
    const f = Object.fromEntries(Object.entries(x.document.fields ?? {}).map(([k, v]) => [k, plain(v)]));
    return { id: f.doc_id, order: Number(f.order ?? 0), value: JSON.parse(f.json) };
  });
}

/** Published articles (collection "articles", native fields) whose publish time has passed, newest first. */
async function fetchArticles() {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents:runQuery`;
  const body = JSON.stringify({
    structuredQuery: {
      from: [{ collectionId: "articles" }],
      where: { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "published" } } },
    },
  });
  let res;
  for (let attempt = 1; attempt <= 6; attempt++) {
    try {
      res = await fetch(url, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      if (res.ok || ![403, 429, 500, 502, 503, 504].includes(res.status)) break;
    } catch (e) {
      if (attempt === 6) throw e;
    }
    await sleep(2000 * attempt);
  }
  if (!res.ok) throw new Error(`Firestore articles: ${res.status} ${res.statusText} ${await res.text()}`);
  const now = new Date().toISOString();
  return (await res.json())
    .filter((x) => x.document)
    .map((x) => Object.fromEntries(Object.entries(x.document.fields ?? {}).map(([k, v]) => [k, plain(v)])))
    .filter((r) => r.status === "published" && r.published_at && r.published_at <= now)
    // Only what the page needs: the audit/review data and drafts' internals never reach the site.
    .map(({ slug, title, description, body_html, faqs, cluster, published_at, content_updated_at }) => ({
      slug, title, description, body_html, faqs: faqs ?? [], cluster, published_at, content_updated_at: content_updated_at ?? null,
    }))
    .sort((a, b) => b.published_at.localeCompare(a.published_at));
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
  data.articles = await fetchArticles();
  writeFileSync(out, JSON.stringify(data));
  console.log(`sync-content: ${data.articles.length} published article(s).`);
  console.log(`sync-content: read ${docs} documents from Firestore project "${PROJECT}" (${Object.keys(data).filter((k) => k !== "articles").length}/${DATASETS.length} datasets).`);
}
