import type { Metadata } from "next";
import type { Locale } from "@/lib/business";
import { siteOrigin } from "@/lib/env";
import { getContent } from "@/lib/content";
export function metadataFor(
  locale: Locale,
  path = "",
  title?: string,
  description?: string,
): Metadata {
  const t = getContent(locale);
  const origin = siteOrigin();
  const url = origin ? `${origin}/${locale}${path}` : undefined;
  return {
    title: title ? `${title} | MAHFOUZ` : t.seo.title,
    description: description ?? t.seo.description,
    metadataBase: origin ? new URL(origin) : undefined,
    alternates: origin
      ? {
          canonical: url,
          languages: {
            en: `${origin}/en${path}`,
            ar: `${origin}/ar${path}`,
            "x-default": `${origin}/en${path}`,
          },
        }
      : undefined,
    openGraph: {
      type: "website",
      title: title ?? t.seo.title,
      description: description ?? t.seo.description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      siteName: "MAHFOUZ",
      url,
      ...(origin
        ? {
            images: [
              {
                url: `${origin}/assets/hero/coach-training.webp`,
                width: 960,
                height: 1280,
                alt: t.hero.photo,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: title ?? t.seo.title,
      description: description ?? t.seo.description,
      ...(origin
        ? { images: [`${origin}/assets/hero/coach-training.webp`] }
        : {}),
    },
    icons: {
      icon: [
        {
          url: "/assets/branding/icon-32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          url: "/assets/branding/icon-16.png",
          sizes: "16x16",
          type: "image/png",
        },
        { url: "/assets/branding/mark.svg", type: "image/svg+xml" },
      ],
      apple: "/assets/branding/apple-touch-icon.png",
    },
    robots: { index: true, follow: true },
  };
}
