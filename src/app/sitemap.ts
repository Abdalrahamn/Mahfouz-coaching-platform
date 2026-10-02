import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/env";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return ["en", "ar"].flatMap((locale) =>
    ["", "/terms", "/privacy", "/disclaimer"].map((path) => ({
      url: `${origin}/${locale}${path}`,
      changeFrequency: "monthly" as const,
      priority: path ? 0.3 : 1,
      alternates: {
        languages: { en: `${origin}/en${path}`, ar: `${origin}/ar${path}` },
      },
    })),
  );
}
