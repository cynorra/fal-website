# Article pipeline (Horoscopes and Charts)

Adapted from the aiandsoftwarehub and practice-test-daily pipelines. Articles live in the Firestore
collection `articles` (native fields) and are pulled into the static site at build time by
`scripts/sync-content.mjs`; the pages are `src/app/blog`.

```
npm run test:pipeline                                   # offline self-test of every gate (no keys)
npx tsx scripts/pipeline/generate.ts --dry-run          # one article, nothing written (.dry-run/*.html)
npx tsx scripts/pipeline/generate.ts --dry-run --topic 4  # force the 5th topic of topics.ts
npx tsx scripts/pipeline/generate.ts                    # writes a DRAFT to Firestore
npx tsx scripts/pipeline/audit-file.ts .dry-run/x.html zodiac   # all gates + AI audit on a local file
npx tsx scripts/pipeline/auto-publish.ts                # dry run: what would be published
npx tsx scripts/pipeline/auto-publish.ts --apply        # publish the passers
```

Needs `GEMINI_API_KEY` (comma-separate several keys) and, for anything that touches Firestore,
`FIREBASE_SERVICE_ACCOUNT` (`.env` locally). The generator sets `GEMINI_THINKING=high`: with `low`
the model could not hold ~25 constraints at once (8 issues per attempt, getting worse on every repair).

## The standard (what an article must pass)

1. **Topic gate** (`lib/topic-gate.ts`, `lib/policy.ts`): keyword-backed (Keyword Planner export), delivers something an
   AI answer cannot (`asset`), links only to pages that exist, no predictions / cures / spells / lottery / dated horoscopes.
2. **Evidence, not invention**: the facts block is built from the site's own tables (`src/lib/*`), and a worked example chart
   is computed by the site's own calculator (`lib/evidence.ts`). The article must use at least 3 of its placements.
3. **Facts gate** (`lib/facts.ts`): sign date ranges, elements and rulers must match the table (prose checked per sentence,
   tables per cell); no invented research, no predictions of real events, no "House of ..." names, no numbered labels.
4. **Padding and fabrication gates** (`lib/copy-check.ts`): no sentences pasted from the facts block (more than two),
   no repeated sentences, no unsourced quotations.
5. **Claims and hype** (`lib/claims-check.ts`, `lib/hype-check.ts`): no "guarantee", gold standard, percentages without a source...
6. **Originality of shape** (`lib/forms.ts`, `lib/structure.ts`): an editorial form per article, chosen against the corpus; no
   stock headings, no heading already used elsewhere, no identical openings, no dominant layout.
7. **Value** (`lib/value.ts`): concrete details per 1,000 words, calibrated on this site's own pages
   (charts/zodiac 14, numbers 6, dreams 4); no bridge filler; FAQ answers must carry a concrete detail.
8. **Search structure** (`lib/keywords.ts`): primary keyword in title, description, first 120 words, a heading and 3 times in the
   prose; at least 3 real search queries answered in headings / FAQ; no more than 3 queries pasted verbatim.
9. **Independent AI audit** (`lib/audit.ts`, in `auto-publish.ts`): six scores 1-5, average >= 4.2, no category < 3, no
   verified "blocking" problem. Every problem must quote the article or it is thrown away. **Fails closed**: an audit that
   cannot run means hold, never publish.
10. One article a day (`auto-publish.ts` picks the next free day). A draft that fails stays a draft with the reasons in `review`.

Mechanical repairs in code (`lib/repair.ts`) fix what the model keeps writing even when told not to (heading labels, the word
"guarantee"); a repair loop only oscillates on those.

## Playbook rules

- **Rule 10: the cron stays OFF** (`.github/workflows/auto-blog.yml`) until the first articles have been read by hand.
  Run the workflow from the Actions tab, read what it published, then uncomment the schedule.
- Read the first articles for what the gates cannot see: plausible but wrong traditions, awkward phrasing, anything that
  sounds like a prediction. The gates reduce this; they do not remove it.
- Never give `FIREBASE_SERVICE_ACCOUNT` to the deploy job or Cloudflare: it bypasses the security rules.
- Add topics to `topics.ts` from the Keyword Planner export; do not duplicate an existing page.
