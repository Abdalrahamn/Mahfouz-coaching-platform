import type { MetadataRoute } from "next";
import { assets } from "@/config/assets";
import { coachingGuidePath, legalSlugs } from "@/config/navigation";
import { siteOrigin } from "@/lib/env";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  return ["en", "ar"].flatMap((locale) =>
    ["", coachingGuidePath, ...legalSlugs.map((slug) => `/${slug}`)].map(
      (path) => ({
        url: `${origin}/${locale}${path}`,
        changeFrequency: "monthly" as const,
        priority: path ? 0.3 : 1,
        ...(!path || path === coachingGuidePath
          ? {
              images: [
                `${origin}${assets.coachShare.src}`,
                ...(!path ? [`${origin}${assets.hero.src}`] : []),
              ],
            }
          : {}),
        alternates: {
          languages: { en: `${origin}/en${path}`, ar: `${origin}/ar${path}` },
        },
      }),
    ),
  );
}
