import type { MetadataRoute } from "next";
import { journeys } from "@/lib/journeys";

const BASE = "https://amarafrica.com";

// Static + per-journey routes. Regenerated at build, so new journeys added to
// lib/journeys.ts appear automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${BASE}/journeys`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/the-experience`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/enquire`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/guide`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/trip-design`, changeFrequency: "monthly", priority: 0.7 },
  ];

  const journeyRoutes: MetadataRoute.Sitemap = journeys.map((j) => ({
    url: `${BASE}/journeys/${j.slug}`,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // The Arabic mirror — every localised route under /ar.
  const arabicStatic: MetadataRoute.Sitemap = [
    { url: `${BASE}/ar`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/ar/journeys`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/ar/the-experience`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/ar/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/ar/enquire`, changeFrequency: "monthly", priority: 0.7 },
  ];
  const arabicJourneys: MetadataRoute.Sitemap = journeys.map((j) => ({
    url: `${BASE}/ar/journeys/${j.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...journeyRoutes, ...arabicStatic, ...arabicJourneys];
}
