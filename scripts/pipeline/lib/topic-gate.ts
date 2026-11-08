/**
 * Topic gate: a topic must be keyword-backed, deliver something an AI Overview cannot, pass the
 * content policy, and link only to pages that exist. Used by the generator and by the selftest.
 */
import { existsSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { whyTopicRefused } from './policy';
import type { Topic } from '../topics';

const APP = join(import.meta.dirname, '..', '..', '..', 'src', 'app');

/** Static route exists in src/app (dynamic segments are matched loosely). */
export function pageExists(path: string): boolean {
  const parts = path.split('?')[0].split('/').filter(Boolean);
  let dir = APP;
  for (const part of parts) {
    if (existsSync(join(dir, part))) { dir = join(dir, part); continue; }
    const dyn = existsSync(dir) ? readdirSync(dir).find((d) => /^\[.+\]$/.test(d)) : undefined;
    if (!dyn) return false;
    dir = join(dir, dyn);
  }
  return existsSync(dir);
}

export function findTopicIssues(t: Topic): string[] {
  const issues: string[] = [];
  const refused = whyTopicRefused(t.title);
  if (refused) issues.push(`refused: ${refused}`);
  if (t.title.length < 25 || t.title.length > 110) issues.push(`title length ${t.title.length} (25-110)`);
  if (!t.keyword) issues.push('missing keyword');
  if (!t.asset || t.asset.split(/\s+/).length < 12) issues.push('asset must say in 12+ words what the page delivers that an AI answer cannot');
  if (!['zodiac', 'charts', 'dreams', 'numbers'].includes(t.cluster)) issues.push(`unknown cluster ${t.cluster}`);
  for (const l of t.links) if (!pageExists(l)) issues.push(`links to a page that does not exist: ${l}`);
  return issues;
}
