// Publishes firestore.rules to the project (same as `firebase deploy --only firestore:rules`,
// without needing the Firebase CLI). Needs FIREBASE_SERVICE_ACCOUNT in .env. Run once:
//   npm run content:rules
import { readFileSync, existsSync } from "node:fs";
import { initializeApp, cert, getApps } from "firebase-admin/app";
import { getSecurityRules } from "firebase-admin/security-rules";

const envFile = new URL("../.env", import.meta.url);
if (existsSync(envFile)) {
  for (const l of readFileSync(envFile, "utf8").split(/\r?\n/)) {
    if (!l || l.startsWith("#") || !l.includes("=")) continue;
    const i = l.indexOf("=");
    const k = l.slice(0, i).trim();
    if (!(k in process.env)) process.env[k] = l.slice(i + 1).trim().replace(/^'|'$/g, "");
  }
}
const raw = process.env.FIREBASE_SERVICE_ACCOUNT;
if (!raw) {
  console.error("Set FIREBASE_SERVICE_ACCOUNT in .env first.");
  process.exit(1);
}
const sa = JSON.parse(raw);
if (!getApps().length) initializeApp({ credential: cert(sa), projectId: sa.project_id });
const source = readFileSync(new URL("../firestore.rules", import.meta.url), "utf8");
const rules = getSecurityRules();
const ruleset = await rules.releaseFirestoreRulesetFromSource(source);
console.log(`Released Firestore rules to project ${sa.project_id} (ruleset ${ruleset.name.split("/").pop()}).`);
process.exit(0);
