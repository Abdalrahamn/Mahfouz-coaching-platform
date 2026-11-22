import type { Metadata } from "next";
import { assets } from "@/config/assets";
import { business, type Locale } from "@/lib/business";
import { siteOrigin } from "@/lib/env";
import { getContent } from "@/lib/content";
/** Search snippet: prices without follow-up first, then daily follow-up in Egypt. */
export function priceSnippet(locale: Locale): string {
  const fmt = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-US", {
    numberingSystem: "latn",
    useGrouping: false,
  });
  const values: Record<string, number> = {};
  business.durations.forEach((months, i) => {
    values[`s${months}`] = business.selfPrices[i];
    values[`d${months}`] = business.prices.egypt[i];
  });
  return getContent(locale).seo.priceDescription.replace(
    /\{([sd]\d)\}/g,
    (_, key: string) => fmt.format(values[key]),
  );
}

export function metadataFor(
  locale: Locale,
  path = "",
  title?: string,
  description?: string,
  options: { rawTitle?: boolean } = {},
): Metadata {
  const t = getContent(locale);
  const origin = siteOrigin();
  const url = origin ? `${origin}/${locale}${path}` : undefined;
  const coachImage = origin ? `${origin}${assets.coachShare.src}` : undefined;
  const squareImage = origin
    ? `${origin}${assets.coachProfile.src}`
    : undefined;
  description ??= priceSnippet(locale);
  const fullTitle = title
    ? options.rawTitle
      ? title
      : `${title} | ${t.seo.titleSuffix}`
    : t.seo.title;
  return {
    title: fullTitle,
    description: description,
    metadataBase: origin ? new URL(origin) : undefined,
    alternates: origin
      ? {
          canonical: url,
          languages: {
            en: `${origin}/en${path}`,
            ar: `${origin}/ar${path}`,
            "x-default": `${origin}/ar${path}`,
          },
        }
      : undefined,
    openGraph: {
      type: "website",
      title: fullTitle,
      description: description,
      locale: locale === "ar" ? "ar_EG" : "en_US",
      alternateLocale: locale === "ar" ? "en_US" : "ar_EG",
      siteName: "MAHFOUZ",
      url,
      ...(coachImage
        ? {
            images: [
              {
                url: coachImage,
                width: assets.coachShare.width,
                height: assets.coachShare.height,
                alt: t.hero.photo,
              },
              {
                url: squareImage!,
                width: assets.coachProfile.width,
                height: assets.coachProfile.height,
                alt: t.about.profileAlt,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: description,
      ...(coachImage
        ? { images: [{ url: coachImage, alt: t.hero.photo }] }
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
    robots: {
      index: true,
      follow: true,
      "max-image-preview": "large",
    },
  };
}
