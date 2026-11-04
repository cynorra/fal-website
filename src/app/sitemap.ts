import { MetadataRoute } from "next";
import { DREAM_ENTRIES } from "@/lib/dreams-data";
import { SYMBOL_ENTRIES } from "@/lib/symbols-data";
import { ZODIAC_SIGNS } from "@/lib/horoscopes-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aurapulse.com";

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
    "/daily",
    "/about",
    "/contact",
    "/privacy-policy",
    "/terms",
    "/editorial-standards",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "daily" as const,
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

  return [...staticRoutes, ...dreamRoutes, ...symbolRoutes, ...horoscopeRoutes];
}

