import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import { ARTICLES, CLUSTER_LABELS } from "@/lib/articles";
import { AdBanner } from "@/components/ui/AdBanner";

export const metadata: Metadata = {
  title: "Astrology Guides and Explainers: Birth Charts, Zodiac, Numbers and Dreams | Horoscopes and Charts",
  description:
    "In-depth explainers on birth charts, zodiac signs, the Chinese zodiac, numerology and dream symbolism, each with worked examples and an honest look at what the tradition does and does not claim.",
  // An empty index is a thin page: keep it out of search results until there is something on it.
  robots: ARTICLES.length === 0 ? { index: false, follow: true } : undefined,
};

const fmt = (iso: string) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));

export default function BlogIndexPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 space-y-10 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">Astrology Guides and Explainers</h1>
        <p className="text-base sm:text-lg text-white/70">
          Longer explainers on birth charts, zodiac signs, numerology and dreams. Each one shows its working and says plainly where a
          tradition is only a tradition.
        </p>
      </header>

      {ARTICLES.length === 0 ? (
        <p className="glass-panel rounded-2xl p-6 border border-white/10">
          New guides are published here as they are finished. In the meantime, start with the{" "}
          <Link href="/zodiac-signs" className="text-amber-300 underline">zodiac signs and dates</Link>, the{" "}
          <Link href="/tools/birth-chart" className="text-amber-300 underline">free birth chart calculator</Link> or the{" "}
          <Link href="/dreams" className="text-amber-300 underline">dream dictionary</Link>.
        </p>
      ) : (
        <ul className="space-y-4">
          {ARTICLES.map((a) => (
            <li key={a.slug}>
              <Link href={`/blog/${a.slug}`} className="glass-panel glass-panel-hover rounded-2xl p-5 border border-white/10 block">
                <p className="text-xs text-purple-300 font-mono">
                  {CLUSTER_LABELS[a.cluster]} · {fmt(a.published_at)}
                </p>
                <h2 className="text-xl font-serif font-bold text-white mt-1">{a.title}</h2>
                <p className="text-sm text-white/70 mt-2">{a.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {ARTICLES.length > 0 && <AdBanner format="in-article" />}

      <p className="text-xs text-white/40">
        Astrology and the related traditions are symbolic and offered for reflection and entertainment. They are not a substitute for
        professional medical, legal or financial advice.
      </p>
    </div>
  );
}
