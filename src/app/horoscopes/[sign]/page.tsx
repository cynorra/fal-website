import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { ZODIAC_PROFILE_BY_ID } from "@/lib/zodiac-profiles";
import { dailyTransit, decans, houseFor, HOUSE_THEMES, PHASE_ADVICE } from "@/lib/astro";
import { Heart, Briefcase, Activity, ArrowLeft, ArrowRight, Compass, Moon, Sparkles } from "lucide-react";
import { AdBanner } from "@/components/ui/AdBanner";
import { SITE_URL } from "@/lib/site";
import { formatDate } from "@/lib/utils";

interface Props {
  params: { sign: string };
}

export const revalidate = 3600; // today's Moon transit is recalculated hourly

export function generateStaticParams() {
  return ZODIAC_SIGNS.map((s) => ({ sign: s.id }));
}

export function generateMetadata({ params }: Props): Metadata {
  const sign = ZODIAC_SIGNS.find((s) => s.id === params.sign);
  if (!sign) return { title: "Zodiac Sign Not Found | Horoscopes and Charts", robots: { index: false } };
  const desc = `${sign.name} horoscope and zodiac sign guide (${sign.dates}): personality traits, strengths, love, career, compatibility, rising and moon sign meaning, plus today's Moon transit for ${sign.name}.`;
  return {
    title: `${sign.name} Horoscope: Personality, Dates & Compatibility | Horoscopes and Charts`,
    description: desc,
    openGraph: { title: `${sign.name} Horoscope, Personality & Compatibility`, description: desc, type: "article" },
  };
}

const idx = (id: string) => ZODIAC_SIGNS.findIndex((s) => s.id === id);

function pairSlug(a: string, b: string) {
  return idx(a) <= idx(b) ? `${a}-and-${b}` : `${b}-and-${a}`;
}

function H2({ children }: { children: React.ReactNode }) {
  return <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white">{children}</h2>;
}

export default function SignDetailPage({ params }: Props) {
  const sign = ZODIAC_SIGNS.find((s) => s.id === params.sign);
  const profile = ZODIAC_PROFILE_BY_ID[params.sign];
  if (!sign || !profile) notFound();

  const i = idx(sign.id);
  const prev = ZODIAC_SIGNS[(i + 11) % 12];
  const next = ZODIAC_SIGNS[(i + 1) % 12];
  const todayFormatted = formatDate();
  const transit = dailyTransit(new Date());
  const house = houseFor(i, transit.moonSignIndex);
  const houseInfo = HOUSE_THEMES[house - 1];
  const decanList = decans(i);
  const faq = [...profile.faq, ...(sign.faq || [])];

  const signLink = (name: string) => {
    const id = name.toLowerCase();
    return (
      <Link
        key={name}
        href={`/compatibility/${pairSlug(sign.id, id)}`}
        className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs hover:border-purple-400/40 text-white/90"
      >
        {sign.name} &amp; {name}
      </Link>
    );
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: `${sign.name} Horoscope: Personality, Dates & Compatibility`,
        description: profile.tagline,
        author: { "@type": "Organization", name: "Horoscopes and Charts Editorial Team" },
        publisher: { "@type": "Organization", name: "Horoscopes and Charts" },
        mainEntityOfPage: `${SITE_URL}/horoscopes/${sign.id}`,
      },
      {
        "@type": "FAQPage",
        mainEntity: faq.map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: { "@type": "Answer", text: item.answer },
        })),
      },
    ],
  };

  return (
    <article className="max-w-4xl mx-auto py-8 space-y-12 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <Link
        href="/horoscopes"
        className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>All 12 Zodiac Signs</span>
      </Link>

      <header className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="px-3 py-1 rounded-full font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/30">
            {sign.element} • {sign.modality}
          </span>
          <span className="text-white/50 font-mono">Ruled by {profile.rulerPlanet}</span>
        </div>
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-500/20 to-indigo-500/20 border border-purple-500/30 flex items-center justify-center text-4xl text-amber-300 flex-shrink-0">
            {sign.symbol}
          </div>
          <div>
            <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">{sign.name} Horoscope</h1>
            <span className="text-xs text-amber-300 font-mono block mt-1">
              {sign.dates} • {sign.soulArchetype}
            </span>
          </div>
        </div>
        <p className="text-base sm:text-lg text-white/70">
          {sign.name}: {profile.tagline} Personality, traits, dates, love, career, compatibility, rising and moon sign
          meaning, plus today&apos;s Moon transit.
        </p>
      </header>

      <section className="glass-panel rounded-2xl p-5 border border-white/10 overflow-x-auto">
        <h2 className="text-sm font-serif font-bold text-white mb-3">{sign.name} at a glance</h2>
        <table className="w-full text-xs sm:text-sm">
          <tbody className="divide-y divide-white/5">
            {[
              ["Dates", sign.dates],
              ["Symbol", `${sign.symbol} (glyph of ${sign.name})`],
              ["Element / Modality", `${sign.element} / ${sign.modality}`],
              ["Ruling planet", sign.ruler],
              ["Natural house", sign.naturalHouse],
              ["Lucky day, number", `${sign.luckyDay}, ${sign.luckyNumber}`],
              ["Colors, crystal", `${sign.luckyColor}; ${sign.powerCrystal}`],
              ["Most compatible", profile.compat.best.join(", ")],
            ].map(([k, v]) => (
              <tr key={k}>
                <th className="text-left font-medium text-white/60 py-2 pr-4 w-40 align-top">{k}</th>
                <td className="py-2 text-white/90">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <AdBanner format="horizontal" />

      {/* Today */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 space-y-3">
        <div className="flex items-center space-x-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
          <Moon className="w-4 h-4" />
          <span>
            {sign.name} horoscope today • {todayFormatted}
          </span>
        </div>
        <H2>Today&apos;s Moon transit for {sign.name}</H2>
        <p>
          The Moon is in <strong className="text-white">{transit.moonSign}</strong> today, a{" "}
          <strong className="text-white">{transit.phase.name}</strong> ({transit.phase.illumination}% illuminated). For{" "}
          {sign.name} that places the Moon in your <strong className="text-white">{houseInfo.name}</strong>, the area of{" "}
          {houseInfo.theme}.
        </p>
        <p>{houseInfo.advice}</p>
        <p>{PHASE_ADVICE[transit.phase.name]}</p>
        <p className="text-xs text-white/40">
          Calculated from the Moon&apos;s actual position using whole-sign houses from your Sun sign. The Moon changes sign
          about every two and a half days, so this section updates through the day. Houses are a simple approximation; a
          full reading would use your exact Rising sign.
        </p>
      </section>

      {/* Personality */}
      <section className="space-y-4">
        <H2>{sign.name} personality and traits</H2>
        {profile.personality.map((p, n) => (
          <p key={n}>{p}</p>
        ))}
        <div className="flex flex-wrap gap-2">
          {profile.keywords.map((k) => (
            <span key={k} className="px-3 py-1 rounded-full text-xs bg-purple-500/15 border border-purple-500/30 text-purple-200">
              {k}
            </span>
          ))}
        </div>
        <div className="grid sm:grid-cols-2 gap-6 pt-2">
          <div>
            <h3 className="font-serif font-bold text-white mb-2">{sign.name} strengths</h3>
            <ul className="list-disc pl-5 space-y-1">
              {profile.strengths.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif font-bold text-white mb-2">{sign.name} weaknesses</h3>
            <ul className="list-disc pl-5 space-y-1">
              {profile.weaknesses.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </div>
        </div>
        <p>
          <strong className="text-white">Shadow pattern:</strong> {sign.shadowTrap}
        </p>
      </section>

      <section className="space-y-3">
        <H2>{sign.name} current guidance</H2>
        <p>{sign.overview}</p>
      </section>

      {/* Love */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-rose-500/20 space-y-3 bg-gradient-to-b from-rose-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-rose-300 text-xs font-semibold uppercase tracking-wider">
          <Heart className="w-4 h-4" />
          <span>{sign.name} love horoscope</span>
        </div>
        <H2>{sign.name} in love and relationships</H2>
        <p>{profile.loveStyle}</p>
        <p>{sign.love}</p>
        <h3 className="font-serif font-bold text-white pt-2">{sign.name} man</h3>
        <p>{profile.man}</p>
        <h3 className="font-serif font-bold text-white pt-2">{sign.name} woman</h3>
        <p>{profile.woman}</p>
      </section>

      <AdBanner format="in-article" />

      {/* Career */}
      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-emerald-500/20 space-y-3 bg-gradient-to-b from-emerald-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
          <Briefcase className="w-4 h-4" />
          <span>Career and money</span>
        </div>
        <H2>{sign.name} career and best jobs</H2>
        <p>{profile.career}</p>
        <p>{sign.career}</p>
        <p>
          <strong className="text-white">Careers that tend to suit {sign.name}:</strong> {profile.bestCareers.join(", ")}.
        </p>
      </section>

      <section className="space-y-3">
        <H2>{sign.name} as a friend</H2>
        <p>{profile.friendship}</p>
      </section>

      <section className="glass-panel rounded-3xl p-6 sm:p-8 border border-blue-500/20 space-y-3 bg-gradient-to-b from-blue-950/10 to-transparent">
        <div className="flex items-center space-x-2 text-blue-300 text-xs font-semibold uppercase tracking-wider">
          <Activity className="w-4 h-4" />
          <span>Wellness</span>
        </div>
        <H2>{sign.name} health and wellbeing</H2>
        <p>{sign.wellness}</p>
        <p className="text-xs text-white/40">General lifestyle ideas only; not medical advice.</p>
      </section>

      {/* Compatibility */}
      <section className="space-y-4">
        <H2>{sign.name} compatibility</H2>
        <p>{profile.compat.note}</p>
        <div className="space-y-3">
          <div>
            <h3 className="font-serif font-bold text-white mb-2">Most compatible</h3>
            <div className="flex flex-wrap gap-2">{profile.compat.best.map(signLink)}</div>
          </div>
          <div>
            <h3 className="font-serif font-bold text-white mb-2">Good matches</h3>
            <div className="flex flex-wrap gap-2">{profile.compat.good.map(signLink)}</div>
          </div>
          <div>
            <h3 className="font-serif font-bold text-white mb-2">Need more effort</h3>
            <div className="flex flex-wrap gap-2">{profile.compat.challenging.map(signLink)}</div>
          </div>
        </div>
        <p className="text-xs text-white/50">
          Compatibility in astrology is a conversation starter, not a verdict. Any pairing can work with honest
          communication. See the full{" "}
          <Link href="/compatibility" className="text-amber-300 underline">
            zodiac compatibility matrix
          </Link>
          .
        </p>
      </section>

      {/* Symbol & decans */}
      <section className="space-y-4">
        <H2>{sign.name} symbol and mythology</H2>
        <p>{profile.symbolMeaning}</p>
        <h3 className="font-serif font-bold text-white">{sign.name} decans</h3>
        <p>
          Each sign is divided into three ten-degree decans, each flavored by a secondary planet. Dates shift by a day
          depending on the year.
        </p>
        <ul className="grid sm:grid-cols-3 gap-3">
          {decanList.map((d, n) => (
            <li key={n} className="glass-panel rounded-2xl p-4 border border-white/10 text-sm">
              <p className="text-xs text-white/50 font-mono">Decan {n + 1}</p>
              <p className="text-white font-medium">{d.range}</p>
              <p className="text-amber-300 text-xs mt-1">Sub-ruler: {d.ruler}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Rising & Moon */}
      <section className="space-y-4">
        <H2>{sign.name} rising sign and moon sign</H2>
        <h3 className="font-serif font-bold text-white">{sign.name} rising (Ascendant)</h3>
        <p>{profile.rising}</p>
        <h3 className="font-serif font-bold text-white">Moon in {sign.name}</h3>
        <p>{profile.moon}</p>
        <Link
          href="/tools/rising-moon"
          className="inline-flex items-center space-x-2 text-sm text-amber-300 hover:text-white"
        >
          <Compass className="w-4 h-4" />
          <span>Find your rising and moon sign</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* FAQ */}
      <section className="space-y-4">
        <H2>{sign.name} FAQ</H2>
        <div className="space-y-3">
          {faq.map((q, n) => (
            <div key={n} className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
              <h3 className="font-serif font-semibold text-amber-300">{q.question}</h3>
              <p className="text-sm">{q.answer}</p>
            </div>
          ))}
        </div>
      </section>

      <nav className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-6 text-sm">
        <Link href={`/horoscopes/${prev.id}`} className="inline-flex items-center space-x-2 text-purple-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span>{prev.name}</span>
        </Link>
        <Link href="/zodiac-signs" className="text-amber-300 hover:text-white inline-flex items-center space-x-1.5">
          <Sparkles className="w-4 h-4" />
          <span>Zodiac signs and dates</span>
        </Link>
        <Link href={`/horoscopes/${next.id}`} className="inline-flex items-center space-x-2 text-purple-300 hover:text-white">
          <span>{next.name}</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </nav>

      <p className="text-xs text-white/40">
        Astrology is a symbolic tradition for self-reflection and entertainment. It is not a substitute for professional
        medical, legal or financial advice.
      </p>

      <AdBanner format="horizontal" />
    </article>
  );
}
