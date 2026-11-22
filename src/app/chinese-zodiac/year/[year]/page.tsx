import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ANIMAL_BY_NAME, ELEMENT_NOTES, TRINES, CLASHES } from "@/lib/chinese-zodiac-data";
import { chineseNewYear, chineseZodiac } from "@/lib/chinese-calendar";
import { AdBanner } from "@/components/ui/AdBanner";
import { ANIMAL_OWN_ELEMENT, cycleInfo, pairedYear, relation, relationText, liChun, westernSignOn, lanternFestival } from "@/lib/chinese-year-facts";

interface Props {
  params: { year: string };
}

const FIRST = 1948;
const LAST = 2031;
const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function generateStaticParams() {
  return Array.from({ length: LAST - FIRST + 1 }, (_, i) => ({ year: String(FIRST + i) }));
}

function info(y: number) {
  const z = chineseZodiac(y, 7, 1);
  const start = chineseNewYear(y);
  const nextStart = chineseNewYear(y + 1);
  const prev = chineseZodiac(y - 1, 7, 1);
  return { z, start, nextStart, prev };
}

export function generateMetadata({ params }: Props): Metadata {
  const y = Number(params.year);
  if (!(y >= FIRST && y <= LAST)) return { title: "Chinese Zodiac Not Found | Horoscopes and Charts", robots: { index: false } };
  const { z } = info(y);
  return {
    title: `${y} Chinese Zodiac: ${z.element} ${z.animal} | Horoscopes and Charts`,
    description: `${y} Chinese zodiac sign: ${z.polarity} ${z.element} ${z.animal}. Chinese New Year date, exact zodiac year range, personality, element meaning and compatibility.`,
  };
}

export default function YearPage({ params }: Props) {
  const y = Number(params.year);
  if (!(y >= FIRST && y <= LAST)) notFound();
  const { z, start, nextStart, prev } = info(y);
  const a = ANIMAL_BY_NAME[z.animal];
  const prevA = ANIMAL_BY_NAME[prev.animal];
  const fmt = (d: { month: number; day: number }, yr: number) => `${MONTHS[d.month - 1]} ${d.day}, ${yr}`;
  const end = new Date(Date.UTC(y + 1, nextStart.month - 1, nextStart.day) - 86400000);
  const endStr = `${MONTHS[end.getUTCMonth()]} ${end.getUTCDate()}, ${end.getUTCFullYear()}`;
  const slugOf = (n: string) => ANIMAL_BY_NAME[n].slug;

  // Year-specific facts, all computed
  const startDate = new Date(Date.UTC(y, start.month - 1, start.day));
  const weekday = new Intl.DateTimeFormat("en-US", { timeZone: "UTC", weekday: "long" }).format(startDate);
  const yearDays = Math.round((Date.UTC(y + 1, nextStart.month - 1, nextStart.day) - startDate.getTime()) / 86400000);
  const earlyDays = Math.round((startDate.getTime() - Date.UTC(y, 0, 1)) / 86400000);
  const ageNow = new Date().getUTCFullYear() - y;
  const neighbors = [-4, -3, -2, -1, 0, 1, 2, 3, 4]
    .map((d) => y + d)
    .filter((yy) => yy >= FIRST && yy <= LAST)
    .map((yy) => ({ yy, z: chineseZodiac(yy, 7, 1) }));
  const sameAnimal = [-24, -12, 12, 24].map((d) => y + d).filter((yy) => yy >= FIRST && yy <= LAST);
  const sameCycle = [y - 60, y + 60];
  const trineYears = TRINES[z.animal].map((name) => {
    const nearest = [-6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6]
      .map((d) => y + d)
      .filter((yy) => yy >= FIRST && yy <= LAST && chineseZodiac(yy, 7, 1).animal === name);
    return { name, years: nearest };
  });

  // Extra year-specific facts (all computed or rule-derived)
  const cyc = cycleInfo(z.zodiacYear);
  const pairYear = pairedYear(y);
  const ownEl = ANIMAL_OWN_ELEMENT[z.animal];
  const rel = relation(z.element, ownEl);
  const relText = relationText(rel, y, z.element, z.animal, ownEl);
  const lc = liChun(y);
  const lcDate = `${MONTHS[lc.month - 1]} ${lc.day}`;
  const nearMidnight = lc.hour < 2 || lc.hour >= 22;
  const lcLabel = !nearMidnight ? lcDate : lc.hour < 2 ? `${MONTHS[lc.month - 1]} ${lc.day - 1} or ${lc.day}` : `${MONTHS[lc.month - 1]} ${lc.day} or ${lc.day + 1}`;
  const cnyIsAfterLiChun = start.month > lc.month || (start.month === lc.month && start.day > lc.day);
  const gapDays = Math.abs(Math.round((Date.UTC(y, start.month - 1, start.day) - Date.UTC(y, lc.month - 1, lc.day)) / 86400000));
  const lastDay = new Date(Date.UTC(y + 1, nextStart.month - 1, nextStart.day) - 86400000);
  const signStart = westernSignOn(y, start.month, start.day);
  const signEnd = westernSignOn(lastDay.getUTCFullYear(), lastDay.getUTCMonth() + 1, lastDay.getUTCDate());
  const lantern = lanternFestival(y);
  const V = y % 4; // deterministic variant so pages do not share one fixed outline
  const quickHeading = ["Quick answer", "Which sign are you?", `Your ${y} sign at a glance`, "The short version"][V];
  const earlyHeading = [`Born early in ${y}?`, `January and February ${y} birthdays`, `Born before Chinese New Year ${y}?`, `The ${y} cut-off date`][V];
  const factsHeading = [`${y} zodiac year facts`, `${y} by the numbers`, `The ${y} calendar in detail`, `What to know about the ${y} year`][V];
  const cycleHeading = [`${y} in the 60-year cycle: ${cyc.name}`, `The ${cyc.name} year`, `Where ${y} sits in the sexagenary cycle`, `${cyc.name}: the stem and branch of ${y}`][V];
  const elementHeading = [`${z.element} year, ${ownEl} animal`, "Two elements in one sign", `The ${z.element} ${z.animal} and its own ${ownEl}`, "Year element and animal element"][V];
  const boundaryHeading = [`Two ways to draw the line in ${y}`, "Chinese New Year or Li Chun?", `Which date starts the ${y} year?`, `Zodiac calendar and BaZi calendar in ${y}`][V];
  const compatHeading = [`${z.animal} compatibility`, `Who suits the ${z.animal}?`, `${z.animal} matches and clashes`, `${z.animal} in love and friendship`][V];

  const secCycle = (
  <section className="space-y-3">
    <h2 className="text-2xl font-serif font-bold text-white">{cycleHeading}</h2>
    <p>
      Traditional Chinese calendars pair ten heavenly stems with twelve earthly branches, which gives a cycle of 60 years.
      {" "}{y} is the <strong className="text-white">{cyc.name}</strong> year ({cyc.stem} is a {cyc.stemElement} stem, {cyc.branch} is the {z.animal} branch),
      number {cyc.position} of 60. Each element covers two consecutive years, one Yang and one Yin, so the {z.element} {z.polarity === "Yang" ? "pair continues into" : "pair began in"}{" "}
      <Link href={`/chinese-zodiac/year/${pairYear}`} className="text-amber-300 underline">{pairYear}</Link>
      {pairYear >= FIRST && pairYear <= LAST ? ` (${chineseZodiac(pairYear, 7, 1).polarity} ${chineseZodiac(pairYear, 7, 1).element} ${chineseZodiac(pairYear, 7, 1).animal})` : ""}.
    </p>
  </section>
  );
  const secElement = (
  <section className="space-y-3">
    <h2 className="text-2xl font-serif font-bold text-white">{elementHeading}</h2>
    <p>
      Besides the element of the year, every animal has an element of its own. The {z.animal}&apos;s is {ownEl}, so the {z.element} {z.animal} brings
      together two layers: the element of the year and the element of the animal.
    </p>
    <p>{relText}</p>
    <p className="text-xs text-white/50">These are readings from traditional five-phase theory, shown as part of the cultural system, not as predictions.</p>
  </section>
  );
  const secBoundary = (
  <section className="space-y-3">
    <h2 className="text-2xl font-serif font-bold text-white">{boundaryHeading}</h2>
    <p>
      Most people use Chinese New Year ({fmt(start, y)}) as the start of the zodiac year. BaZi, or Four Pillars astrology, instead starts the year at
      Li Chun, the beginning of spring, which fell on about <strong className="text-white">{lcLabel}</strong> in {y}.
    </p>
    <p>
      {gapDays === 0
        ? `In ${y} the two dates coincided, so both systems agree for every birthday.`
        : cnyIsAfterLiChun
          ? `In ${y} Li Chun came ${gapDays} day${gapDays === 1 ? "" : "s"} before Chinese New Year. Someone born in between would be a ${prev.element} ${prev.animal} by the zodiac calendar but already in the ${z.element} ${z.animal} year by the BaZi rule.`
          : `In ${y} Chinese New Year came ${gapDays} day${gapDays === 1 ? "" : "s"} before Li Chun. Someone born in between would be a ${z.element} ${z.animal} by the zodiac calendar but still in the previous year, ${prev.element} ${prev.animal}, by the BaZi rule.`}
      {" "}If your birthday is within a few days of either date, check both before you decide which reading to follow.
    </p>
  </section>
  );

  return (
    <article className="max-w-3xl mx-auto py-8 space-y-10 text-sm sm:text-base text-white/80 font-light leading-relaxed">
      <Link href="/chinese-zodiac" className="inline-flex items-center space-x-1.5 text-xs text-purple-300 hover:text-white">
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Chinese Zodiac Calculator</span>
      </Link>

      <header className="space-y-3">
        <h1 className="text-3xl sm:text-5xl font-serif font-black text-white">
          {y} Chinese Zodiac: {z.element} {z.animal}
        </h1>
        <p className="text-base sm:text-lg text-white/70">
          People born in {y} are {z.polarity} {z.element} {z.animal}s, with one important exception: the first weeks of
          the year.
        </p>
      </header>

      <section className="glass-panel rounded-2xl p-5 border border-white/10 space-y-2">
        <h2 className="font-serif font-bold text-white">{quickHeading}</h2>
        <p>
          The {y} zodiac year ran from <strong className="text-white">{fmt(start, y)}</strong> to{" "}
          <strong className="text-white">{endStr}</strong>. If you were born on or after {fmt(start, y)}, your sign is the{" "}
          {z.element} {z.animal}. If you were born earlier in {y}, you belong to the {prev.element} {prev.animal} of{" "}
          {prev.zodiacYear}.
        </p>
      </section>

      <AdBanner format="in-article" />

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">
          {z.element} {z.animal} personality
        </h2>
        <p>{a.tagline}</p>
        <p>{a.personality[0]}</p>
        <p>{ELEMENT_NOTES[z.element]}</p>
        <p>
          <strong className="text-white">Strengths:</strong> {a.strengths.join(", ")}.{" "}
          <strong className="text-white">Watch for:</strong> {a.weaknesses.join(", ")}.
        </p>
        <p>
          Read the full{" "}
          <Link href={`/chinese-zodiac/${a.slug}`} className="text-amber-300 underline">
            {z.animal} guide
          </Link>{" "}
          for love, career and compatibility.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{earlyHeading}</h2>
        <p>
          The Chinese zodiac follows the lunisolar calendar, so a January or February birth often belongs to the previous
          animal. In {y}, Chinese New Year fell on {fmt(start, y)}. Anyone born before that date is a {prev.element}{" "}
          {prev.animal} instead.{" "}
          <Link href={`/chinese-zodiac/${prevA.slug}`} className="text-amber-300 underline">
            See the {prev.animal} guide
          </Link>
          .
        </p>
      </section>

      {[[secCycle, secElement, secBoundary], [secBoundary, secCycle, secElement], [secElement, secBoundary, secCycle], [secCycle, secBoundary, secElement]][V].map((s, i) => (
        <React.Fragment key={i}>{s}</React.Fragment>
      ))}

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{factsHeading}</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            Chinese New Year {y} fell on a <strong className="text-white">{weekday}</strong>, {fmt(start, y)}.
          </li>
          <li>
            The {z.animal} year lasted <strong className="text-white">{yearDays} days</strong>
            {yearDays > 365 ? ", longer than a calendar year because the lunisolar calendar added a leap month" : yearDays < 365 ? ", slightly shorter than a calendar year" : ""}.
          </li>
          <li>
            Anyone born in the first <strong className="text-white">{earlyDays} days</strong> of {y} (January 1 to {fmt(start, y)}) belongs to the previous sign.
          </li>
          <li>
            The Lantern Festival, the 15th day of the first lunar month, fell on <strong className="text-white">{MONTHS[lantern.month - 1]} {lantern.day}</strong>, which closes the New Year celebrations.
          </li>
          <li>
            Western Sun signs: the {y} zodiac year opened with the Sun in {signStart} and closed with the Sun in {signEnd}, so people born in the same Chinese year can carry any of the twelve Sun signs.
          </li>
          <li>
            {ageNow >= 0
              ? `People born in ${y} turn ${ageNow} or ${ageNow - 1} during ${new Date().getUTCFullYear()}, depending on their birthday.`
              : `${y} is in the future.`}
          </li>
          {sameCycle.map((yy) => (yy >= FIRST && yy <= LAST ? (
            <li key={yy}>
              The same {z.element} {z.animal} combination appears every 60 years: {yy < y ? "previously" : "next"} in{" "}
              <Link href={`/chinese-zodiac/year/${yy}`} className="text-amber-300 underline">{yy}</Link>.
            </li>
          ) : null))}
        </ul>
        <p>
          Other {z.animal} years:{" "}
          {sameAnimal.map((yy, i) => (
            <React.Fragment key={yy}>
              {i > 0 && ", "}
              <Link href={`/chinese-zodiac/year/${yy}`} className="text-amber-300 underline">{yy}</Link>
            </React.Fragment>
          ))}
          . Each has a different element, which colors the animal&apos;s traits.
        </p>
        <div className="glass-panel rounded-2xl border border-white/10 overflow-x-auto">
          <table className="w-full text-xs sm:text-sm">
            <thead className="text-left text-white/60 border-b border-white/10">
              <tr><th className="p-3">Year</th><th className="p-3">Sign</th></tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {neighbors.map(({ yy, z: zz }) => (
                <tr key={yy} className={yy === y ? "text-amber-300" : ""}>
                  <td className="p-3">
                    <Link href={`/chinese-zodiac/year/${yy}`} className="hover:text-white">{yy}</Link>
                  </td>
                  <td className="p-3">{zz.polarity} {zz.element} {zz.animal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-2xl font-serif font-bold text-white">{compatHeading}</h2>
        <p>
          The {z.animal} is traditionally most harmonious with{" "}
          {TRINES[z.animal].map((f, i) => (
            <React.Fragment key={f}>
              {i > 0 && " and "}
              <Link href={`/chinese-zodiac/${slugOf(f)}`} className="text-amber-300 underline">
                {f}
              </Link>
            </React.Fragment>
          ))}
          , and tends to clash with the{" "}
          <Link href={`/chinese-zodiac/${slugOf(CLASHES[z.animal])}`} className="text-amber-300 underline">
            {CLASHES[z.animal]}
          </Link>
          .
        </p>
        <p>
          Near {y}, the {z.animal}&apos;s harmonious partners were born in:{" "}
          {trineYears.map((t, i) => (
            <React.Fragment key={t.name}>
              {i > 0 && "; "}
              {t.name}:{" "}
              {t.years.map((yy, j) => (
                <React.Fragment key={yy}>
                  {j > 0 && ", "}
                  <Link href={`/chinese-zodiac/year/${yy}`} className="text-amber-300 underline">{yy}</Link>
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
          .
        </p>
      </section>

      <nav className="flex items-center justify-between border-t border-white/10 pt-6 text-sm">
        {y > FIRST ? (
          <Link href={`/chinese-zodiac/year/${y - 1}`} className="inline-flex items-center space-x-2 text-purple-300 hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>{y - 1}</span>
          </Link>
        ) : (
          <span />
        )}
        {y < LAST ? (
          <Link href={`/chinese-zodiac/year/${y + 1}`} className="inline-flex items-center space-x-2 text-purple-300 hover:text-white">
            <span>{y + 1}</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        ) : (
          <span />
        )}
      </nav>

      <p className="text-xs text-white/40">
        The Chinese zodiac is a cultural tradition offered for reflection and entertainment.
      </p>
    </article>
  );
}
