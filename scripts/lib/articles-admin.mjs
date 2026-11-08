// Firestore write access for the article pipeline (never the site build).
// Collection "articles", one document per article, document id = slug.
//
// Env: FIREBASE_SERVICE_ACCOUNT — the service account JSON on one line (.env locally,
// a secret in the auto-blog workflow ONLY). It bypasses the security rules: never give
// it to the site build, Cloudflare or any client code.
import { readFileSync, existsSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

export const COLLECTION = "articles";
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;
export const CLUSTERS = ["zodiac", "charts", "dreams", "numbers"];

const envFile = new URL("../../.env", import.meta.url);
if (existsSync(envFile)) {
  for (const l of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    if (!l || l.startsWith("#") || !l.includes("=")) continue;
    const i = l.indexOf("=");
    const k = l.slice(0, i).trim();
    if (!(k in process.env)) process.env[k] = l.slice(i + 1).trim().replace(/^'|'$/g, "");
  }
}

function db() {
  if (!getApps().length) {
    const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!raw) throw new Error("Missing FIREBASE_SERVICE_ACCOUNT (service account JSON)");
    let sa;
    try {
      sa = JSON.parse(raw);
    } catch {
      throw new Error("FIREBASE_SERVICE_ACCOUNT is not valid JSON");
    }
    initializeApp({ credential: cert(sa), projectId: sa.project_id });
  }
  return getFirestore();
}

/** Every article (drafts included). */
export async function fetchAllArticles() {
  const snap = await db().collection(COLLECTION).get();
  return snap.docs.map((d) => ({ slug: d.id, ...d.data() }));
}

/** Rejects a document that breaks the contract, so a bad row fails loudly instead of landing in the database. */
export function checkArticle(r) {
  const bad = [];
  if (!SLUG.test(r.slug) || r.slug.length > 80) bad.push(`slug "${r.slug}"`);
  if (!r.title || r.title.length < 15 || r.title.length > 90) bad.push(`title length ${r.title?.length}`);
  if (!r.description || r.description.length < 70 || r.description.length > 165) bad.push(`description length ${r.description?.length}`);
  if (!r.body_html || r.body_html.length < 1500) bad.push(`body_html length ${r.body_html?.length}`);
  if (!CLUSTERS.includes(r.cluster)) bad.push(`cluster "${r.cluster}"`);
  if (!["draft", "published"].includes(r.status)) bad.push(`status "${r.status}"`);
  if (r.status === "published" && !r.published_at) bad.push("published without published_at");
  if (/<script|<h1[\s>]|style=/i.test(r.body_html ?? "")) bad.push("forbidden markup in body_html");
  if (bad.length) throw new Error(`Article ${r.slug} rejected: ${bad.join(", ")}`);
}

/**
 * Insert or merge one article by slug. Sets modified_at, and content_updated_at
 * when the words of an already-live article change.
 */
export async function upsertArticle(row) {
  const ref = db().collection(COLLECTION).doc(row.slug);
  await db().runTransaction(async (tx) => {
    const cur = await tx.get(ref);
    const old = cur.exists ? cur.data() : null;
    const now = new Date().toISOString();
    const { slug, ...fields } = row;
    const next = { status: "draft", published_at: null, ...(old ?? {}), ...fields, slug, modified_at: now };
    if (!old) next.created_at = now;
    const wasLive = old && old.status === "published" && old.published_at && old.published_at <= now;
    if (wasLive && ["title", "description", "body_html", "cluster"].some((k) => k in fields && JSON.stringify(fields[k]) !== JSON.stringify(old[k]))) next.content_updated_at = now;
    checkArticle(next);
    tx.set(ref, next);
  });
}
