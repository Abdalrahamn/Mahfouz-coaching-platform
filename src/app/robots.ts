import type { MetadataRoute } from "next";
import { siteOrigin } from "@/lib/env";
export const dynamic = "force-static";
export default function robots(): MetadataRoute.Robots {
  const origin = siteOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/private/", "/verification/"],
    },
    ...(origin ? { sitemap: `${origin}/sitemap.xml` } : {}),
  };
}
