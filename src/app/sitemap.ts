import { MetadataRoute } from "next";
import { DREAM_ENTRIES } from "@/lib/dreams-data";
import { SYMBOL_ENTRIES } from "@/lib/symbols-data";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";
import { SITE_URL } from "@/lib/site";
import { LIFE_PATH_ENTRIES } from "@/lib/life-path-data";
import { ANIMAL_PROFILES } from "@/lib/chinese-zodiac-data";
import { MONTHS, ELEMENTS } from "@/lib/zodiac-calendar";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_URL;

  // Static core routes
  const staticRoutes = [
    "",
    "/dreams",
    "/symbols",
    "/horoscopes",
    "/compatibility",
    "/tools",
    "/tools/moon-phase",
    "/tools/tarot",
    "/tools/aura-quiz",
    "/tools/rising-moon",
    "/tools/life-path-number",
    "/tools/birth-chart",
    "/zodiac-signs",
    "/chinese-zodiac",
    "/daily",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/editorial-standards",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: (route === "" || route === "/daily" ? "daily" : "monthly") as "daily" | "monthly",
    priority: route === "" ? 1.0 : 0.8,
  }));

  // Dynamic dreams
  const dreamRoutes = DREAM_ENTRIES.map((d) => ({
    url: `${baseUrl}/dreams/${d.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic symbols & angel numbers
  const symbolRoutes = SYMBOL_ENTRIES.map((s) => ({
    url: `${baseUrl}/symbols/${s.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  // Dynamic horoscopes
  const horoscopeRoutes = ZODIAC_SIGNS.map((z) => ({
    url: `${baseUrl}/horoscopes/${z.id}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
    priority: 0.8,
  }));

  const lifePathRoutes = LIFE_PATH_ENTRIES.map((e) => ({
    url: `${baseUrl}/life-path/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const animalRoutes = ANIMAL_PROFILES.map((a) => ({
    url: `${baseUrl}/chinese-zodiac/${a.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const yearRoutes = Array.from({ length: 2031 - 1948 + 1 }, (_, i) => ({
    url: `${baseUrl}/chinese-zodiac/year/${1948 + i}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  // Unique zodiac pairings (78); reversed slugs canonicalize to these
  const compatibilityRoutes = ZODIAC_SIGNS.flatMap((a, i) =>
    ZODIAC_SIGNS.slice(i).map((b) => ({
      url: `${baseUrl}/compatibility/${a.id}-and-${b.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    }))
  );

  const monthRoutes = MONTHS.map((m) => ({
    url: `${baseUrl}/zodiac-signs/month/${m.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));
  const elementRoutes = ELEMENTS.map((e) => ({
    url: `${baseUrl}/zodiac-signs/element/${e.slug}`,
    lastModified: new Date(),
    changeFrequency: "yearly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...monthRoutes, ...elementRoutes, ...dreamRoutes, ...symbolRoutes, ...horoscopeRoutes, ...lifePathRoutes, ...animalRoutes, ...yearRoutes, ...compatibilityRoutes];
}

