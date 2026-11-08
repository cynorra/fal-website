// Content comes from Firestore (see scripts/sync-content.mjs, which writes
// src/generated/content.json before every dev/build). A dataset missing from
// that file falls back to the default that ships in code, so the site never
// builds empty.
import generated from "../generated/content.json";

const G = generated as Record<string, unknown>;

export function fromContent<T>(key: string, fallback: T): T {
  const v = G[key];
  return v === undefined || v === null ? fallback : (v as T);
}
