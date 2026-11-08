import { fromContent } from "./content";

export interface Article {
  slug: string;
  title: string;
  description: string;
  /** Sanitised HTML produced by the article pipeline (no h1, no scripts, no inline styles). */
  body_html: string;
  faqs: { question: string; answer: string }[];
  cluster: "zodiac" | "charts" | "dreams" | "numbers";
  published_at: string;
  content_updated_at: string | null;
}

/** Published blog articles, newest first. Empty until the first article is published in Firestore. */
export const ARTICLES: Article[] = fromContent<Article[]>("articles", []);

export const CLUSTER_LABELS: Record<Article["cluster"], string> = {
  zodiac: "Zodiac",
  charts: "Birth charts",
  dreams: "Dreams",
  numbers: "Numbers",
};
