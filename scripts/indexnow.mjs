// Tell IndexNow engines (Bing, Yandex, Seznam, Naver, Yep...) which URLs are new or changed.
// Google does not use IndexNow; it reads the sitemap (submitted in Search Console).
//
//   node scripts/indexnow.mjs             # the pages that change daily + articles published/updated in the last 48 h
//   node scripts/indexnow.mjs --all       # every URL in the built sitemap (first submission, big redesigns)
//   node scripts/indexnow.mjs --dry-run   # print, don't send
//
// Run it AFTER the new version is live (the deploy workflow does), so the engines fetch the new content.
// The sitemap's lastmod is the build time for every page, so "changed" is decided here, not from lastmod:
//   - pages generated from today's sky (home, horoscope pages, weekly and monthly) change every rebuild,
//   - /blog and every article whose published_at / content_updated_at is within the last 48 hours.
// The key is public by design: it only proves the host owns the key file at /indexnow-key.txt.
import { readFileSync, existsSync } from "node:fs";

const args = process.argv.slice(2);
const all = args.includes("--all");
const dry = args.includes("--dry-run");
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || "https://horoscopesandcharts.com").replace(/\/$/, "");
const key = readFileSync(new URL("../public/indexnow-key.txt", import.meta.url), "utf8").trim();

const SIGNS = ["aries", "taurus", "gemini", "cancer", "leo", "virgo", "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces"];
const urls = new Set();

if (all) {
  const sitemap = new URL("../out/sitemap.xml", import.meta.url);
  if (!existsSync(sitemap)) throw new Error("No out/sitemap.xml. Run the build first.");
  for (const m of readFileSync(sitemap, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)) urls.add(m[1]);
} else {
  for (const p of ["", "/horoscopes", "/horoscopes/weekly", "/horoscopes/monthly", "/blog", ...SIGNS.map((s) => `/horoscopes/${s}`)]) urls.add(SITE + p);
  const generated = new URL("../src/generated/content.json", import.meta.url);
  if (existsSync(generated)) {
    const cutoff = Date.now() - 48 * 3600 * 1000;
    const articles = JSON.parse(readFileSync(generated, "utf8")).articles ?? [];
    for (const a of articles) {
      const t = Date.parse(a.content_updated_at ?? a.published_at);
      if (t >= cutoff) urls.add(`${SITE}/blog/${a.slug}`);
    }
  }
}

const body = { host: new URL(SITE).host, key, keyLocation: `${SITE}/indexnow-key.txt`, urlList: [...urls].slice(0, 10000) };
console.log(`Submitting ${body.urlList.length} URL(s) to IndexNow${dry ? " (dry run)" : ""}:`);
for (const u of body.urlList) console.log("  " + u);
if (dry) process.exit(0);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify(body),
});
// 200 = received, 202 = received and the key check is pending. 403 = key file not reachable yet. 422 = URLs do not match the host.
console.log(`IndexNow responded ${res.status} ${res.statusText}`);
if (res.status >= 400) process.exit(1);
