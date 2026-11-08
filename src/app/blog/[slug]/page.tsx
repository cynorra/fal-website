import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ARTICLES, CLUSTER_LABELS } from "@/lib/articles";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_NAME, SITE_URL } from "@/lib/site";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  // Next 14 with `output: "export"` rejects an empty list, so until the first article exists build one
  // placeholder that renders the 404 view and is marked noindex (see generateMetadata).
  return ARTICLES.length ? ARTICLES.map((a) => ({ slug: a.slug })) : [{ slug: "_none" }];
}

export const dynamicParams = false;

export function generateMetadata({ params }: Props): Metadata {
  const a = ARTICLES.find((x) => x.slug === params.slug);
  if (!a) return { title: `Article not found | ${SITE_NAME}`, robots: { index: false } };
  return {
    title: `${a.title} | ${SITE_NAME}`,
    description: a.description,
    alternates: { canonical: `/blog/${a.slug}` },
    openGraph: { title: a.title, description: a.description, type: "article", publishedTime: a.published_at },
  };
}

const fmt = (iso: string) => new Intl.DateTimeFormat("en-US", { timeZone: "UTC", year: "numeric", month: "long", day: "numeric" }).format(new Date(iso));

export default function BlogArticlePage({ params }: Props) {
  const a = ARTICLES.find((x) => x.slug === params.slug);
  if (!a) notFound();

  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: a.title,
        description: a.description,
        datePublished: a.published_at,
        dateModified: a.content_updated_at ?? a.published_at,
        author: { "@type": "Organization", name: `${SITE_NAME} Editorial Team` },
        publisher: { "@type": "Organization", name: SITE_NAME },
        mainEntityOfPage: `${SITE_URL}/blog/${a.slug}`,
      },
      ...(a.faqs.length
        ? [
            {
              "@type": "FAQPage",
              mainEntity: a.faqs.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
            },
          ]
        : []),
    ],
  };

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-8 text-sm sm:text-base">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link href="/blog" className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All guides</span>
      </Link>

      <header className="space-y-3">
        <p className="text-xs text-purple-300 font-mono">
          {CLUSTER_LABELS[a.cluster]} · {fmt(a.published_at)}
          {a.content_updated_at ? ` · Updated ${fmt(a.content_updated_at)}` : ""}
        </p>
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white leading-tight">{a.title}</h1>
        <p className="text-base sm:text-lg text-white/70">{a.description}</p>
        <p className="text-xs text-white/50">By the {SITE_NAME} Editorial Team</p>
      </header>

      <div className="blog-body" dangerouslySetInnerHTML={{ __html: a.body_html }} />

      <AdBanner format="in-article" />

      {a.faqs.length > 0 && (
        <section className="space-y-4">
          <h2 className="text-2xl font-serif font-bold text-white">Frequently asked questions</h2>
          <div className="space-y-3">
            {a.faqs.map((f) => (
              <div key={f.question} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
                <h3 className="font-serif font-semibold text-amber-300">{f.question}</h3>
                <p className="text-sm text-white/80 font-light">{f.answer}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {related.length > 0 && (
        <section className="space-y-3 pt-6 border-t border-white/10">
          <h2 className="text-lg font-serif font-bold text-white">More guides</h2>
          <ul className="space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <Link href={`/blog/${r.slug}`} className="text-amber-300 hover:text-white underline underline-offset-4">
                  {r.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <p className="text-xs text-white/40">
        Astrology, numerology and dream interpretation are symbolic traditions offered for self-reflection and entertainment, not
        predictions or professional advice.
      </p>
    </article>
  );
}
