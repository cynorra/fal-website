// Writes content/seed.json to Firestore (insert or overwrite by document id).
//
//   npm run content:push                 # every dataset
//   npm run content:push -- dreams       # one or more datasets
//   npm run content:push -- --dry-run    # show what would be written
//   npm run content:push -- --prune      # also delete documents that are not in the seed
//
// Needs FIREBASE_SERVICE_ACCOUNT (service account JSON on one line) in .env.
// Never put it in GitHub Actions, Cloudflare or any client code: it bypasses
// the security rules. The site build reads with FIREBASE_PROJECT_ID only.
//
// Document layout (one collection per dataset, collection name = dataset key):
//   doc_id, order, status ("published" | "draft"), json (the item as a JSON string),
//   title (when the item has one, for browsing in the console), updated_at
import { readFileSync, existsSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { DATASETS, toDocs } from "./lib/datasets.mjs";

const envFile = new URL("../.env", import.meta.url);
if (existsSync(envFile)) {
  for (const l of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    if (!l || l.startsWith("#") || !l.includes("=")) continue;
    const i = l.indexOf("=");
    const k = l.slice(0, i).trim();
    if (!(k in process.env)) process.env[k] = l.slice(i + 1).trim().replace(/^'|'$/g, "");
  }
}

const args = process.argv.slice(2);
const dry = args.includes("--dry-run");
const prune = args.includes("--prune");
const only = args.filter((a) => !a.startsWith("--"));
const seed = JSON.parse(readFileSync(new URL("../content/seed.json", import.meta.url), "utf8"));
const list = DATASETS.filter((d) => !only.length || only.includes(d.key));
if (only.length && list.length !== only.length) {
  console.error("Unknown dataset. Known:", DATASETS.map((d) => d.key).join(", "));
  process.exit(1);
}

let db;
if (!dry) {
  const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
  if (!raw) {
    console.error("Set FIREBASE_SERVICE_ACCOUNT (service account JSON) in .env first.");
    process.exit(1);
  }
  let sa;
  try {
    sa = JSON.parse(raw);
  } catch {
    console.error("FIREBASE_SERVICE_ACCOUNT is not valid JSON (it must be on one line).");
    process.exit(1);
  }
  if (!getApps().length) initializeApp({ credential: cert(sa), projectId: sa.project_id });
  db = getFirestore();
  console.log(`Firestore project: ${sa.project_id}`);
}

let total = 0;
for (const ds of list) {
  const docs = toDocs(ds, seed[ds.key]);
  const now = new Date().toISOString();
  console.log(`${ds.key.padEnd(24)} ${String(docs.length).padStart(3)} documents`);
  total += docs.length;
  if (dry) continue;
  const col = db.collection(ds.key);
  for (let i = 0; i < docs.length; i += 400) {
    const batch = db.batch();
    for (const d of docs.slice(i, i + 400)) {
      const json = JSON.stringify(d.value);
      if (json.length > 900_000) throw new Error(`${ds.key}/${d.id} is too large for a Firestore document`);
      const fields = { doc_id: d.id, order: d.order, status: "published", json, updated_at: now };
      const title = d.value && typeof d.value === "object" ? d.value.title ?? d.value.name ?? null : null;
      if (typeof title === "string") fields.title = title.slice(0, 200);
      batch.set(col.doc(d.id), fields);
    }
    await batch.commit();
  }
  if (prune) {
    const keep = new Set(docs.map((d) => d.id));
    const snap = await col.get();
    const stale = snap.docs.filter((x) => !keep.has(x.id));
    for (const x of stale) await x.ref.delete();
    if (stale.length) console.log(`  pruned ${stale.length} stale document(s) from ${ds.key}`);
  }
}
console.log(dry ? `Dry run: ${total} documents would be written.` : `Pushed ${total} documents. Re-run the deploy to publish.`);
process.exit(0);
