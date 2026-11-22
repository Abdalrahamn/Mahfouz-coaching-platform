import type { MetadataRoute } from "next";
import { assets } from "@/config/assets";
import {
  aboutPath,
  coachingGuidePath,
  contentUpdated,
  legalSlugs,
} from "@/config/navigation";
import { siteOrigin } from "@/lib/env";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  const origin = siteOrigin();
  if (!origin) return [];
  const profile = `${origin}${assets.coachProfile.src}`;
  const portrait = `${origin}${assets.coachPortrait.src}`;
  const share = `${origin}${assets.coachShare.src}`;
  const imagesFor = (path: string) => {
    if (!path) return [share, `${origin}${assets.hero.src}`, profile, portrait];
    if (path === aboutPath) return [profile, portrait];
    if (path === coachingGuidePath) return [share];
    return undefined;
  };
  return ["en", "ar"].flatMap((locale) =>
    [
      "",
      aboutPath,
      coachingGuidePath,
      ...legalSlugs.map((slug) => `/${slug}`),
    ].map((path) => {
      const images = imagesFor(path);
      return {
        url: `${origin}/${locale}${path}`,
        lastModified: contentUpdated,
        changeFrequency: "monthly" as const,
        priority: !path ? 1 : path === aboutPath ? 0.8 : path === coachingGuidePath ? 0.7 : 0.3,
        ...(images ? { images } : {}),
        alternates: {
          languages: { en: `${origin}/en${path}`, ar: `${origin}/ar${path}` },
        },
      };
    }),
  );
}
