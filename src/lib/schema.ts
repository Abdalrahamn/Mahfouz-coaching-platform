import { assets } from "@/config/assets";
import { aboutPath, coachingGuidePath } from "@/config/navigation";
import { business, type Locale } from "@/lib/business";
import { getContent } from "@/lib/content";

/** Stable, locale-independent entity ids shared by every page graph. */
export const websiteId = (origin: string) => `${origin}/#website`;
export const coachId = (origin: string) => `${origin}/#coach`;

export const personName = "Abd Alrahman Mahfouz";
const alternateNames = [
  "كابتن عبدالرحمن محفوظ",
  "عبدالرحمن محفوظ",
  "عبد الرحمن محفوظ",
  "Abdalrahman Mahfouz",
  "Abdelrahman Mahfouz",
  "Abdulrahman Mahfouz",
  "MAHFOUZ",
];

export function serializeSchema(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c");
}

export function profileImageNode(origin: string, locale: Locale) {
  const t = getContent(locale);
  return {
    "@type": "ImageObject",
    "@id": `${origin}${assets.coachProfile.src}`,
    url: `${origin}${assets.coachProfile.src}`,
    contentUrl: `${origin}${assets.coachProfile.src}`,
    width: assets.coachProfile.width,
    height: assets.coachProfile.height,
    caption: t.about.profileAlt,
    representativeOfPage: false,
  };
}

export function websiteNode(origin: string) {
  return {
    "@type": "WebSite",
    "@id": websiteId(origin),
    name: personName,
    alternateName: [
      "كابتن عبدالرحمن محفوظ",
      "عبدالرحمن محفوظ",
      "MAHFOUZ",
      "Mahfouz Coaching",
    ],
    url: `${origin}/`,
    inLanguage: ["ar", "en"],
    publisher: { "@id": coachId(origin) },
  };
}

export function personNode(origin: string, locale: Locale) {
  const t = getContent(locale);
  const en = getContent("en");
  const [iasst, fitxpert] = en.about.credentials;
  return {
    "@type": "Person",
    "@id": coachId(origin),
    name: personName,
    alternateName: alternateNames,
    description: t.about.entityLead,
    jobTitle: t.chrome.jobTitle,
    url: `${origin}/${locale}${aboutPath}`,
    image: profileImageNode(origin, locale),
    sameAs: [business.instagram, business.facebook],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      telephone: `+${business.whatsapp}`,
      url: `https://wa.me/${business.whatsapp}`,
      availableLanguage: ["Arabic", "English"],
    },
    knowsAbout: [
      "Online coaching",
      "Personal training",
      "Workout programming",
      "Nutrition planning",
      "Fitness",
    ],
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: iasst[0],
        credentialCategory: "certificate",
        dateCreated: "2026-07",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: fitxpert[0],
        credentialCategory: "certificate",
        description: fitxpert[1],
        dateCreated: "2025-04-15",
      },
    ],
  };
}

export function serviceNode(origin: string, locale: Locale) {
  const t = getContent(locale);
  const guide = t.coachingGuide;
  const pageUrl = `${origin}/${locale}`;
  // Search order: without follow-up first, then daily follow-up.
  const rows = [
    [guide.prices[2], business.selfPrices],
    [guide.prices[0], business.prices.egypt],
    [guide.prices[1], business.prices.international],
  ] as const;
  const offers = rows.flatMap(([label, row]) =>
    business.durations.map((months, c) => ({
      "@type": "Offer",
      name: `${label} - ${guide.durations[c]}`,
      price: row[c],
      priceCurrency: business.currency,
      url: `${origin}/${locale}${coachingGuidePath}`,
      availability: "https://schema.org/InStock",
      eligibleDuration: {
        "@type": "QuantitativeValue",
        value: months,
        unitCode: "MON",
      },
    })),
  );
  return {
    "@type": "Service",
    "@id": `${pageUrl}#coaching`,
    name: t.coaching.title.replace(/\n/g, " "),
    serviceType: "Online fitness coaching",
    description: t.coaching.description,
    url: `${pageUrl}#coaching`,
    provider: { "@id": coachId(origin) },
    areaServed: [
      { "@type": "Country", name: "Egypt", identifier: "EG" },
      { "@type": "Place", name: "Worldwide" },
    ],
    image: { "@id": `${origin}${assets.coachProfile.src}` },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: guide.title,
      itemListElement: offers,
    },
  };
}

export function breadcrumbNode(
  origin: string,
  locale: Locale,
  trail: [name: string, path: string][],
) {
  const t = getContent(locale);
  const items: [string, string][] = [[t.chrome.breadcrumbHome, ""], ...trail];
  return {
    "@type": "BreadcrumbList",
    "@id": `${origin}/${locale}${trail[trail.length - 1]?.[1] ?? ""}#breadcrumb`,
    itemListElement: items.map(([name, path], index) => ({
      "@type": "ListItem",
      position: index + 1,
      name,
      item: `${origin}/${locale}${path}`,
    })),
  };
}

export function faqNode(
  origin: string,
  locale: Locale,
  path: string,
  qa: readonly (readonly [string, string])[],
) {
  return {
    "@type": "FAQPage",
    "@id": `${origin}/${locale}${path}#faq`,
    inLanguage: locale,
    mainEntity: qa.map(([name, text]) => ({
      "@type": "Question",
      name,
      acceptedAnswer: { "@type": "Answer", text },
    })),
  };
}

export function webPageNode(
  origin: string,
  locale: Locale,
  path: string,
  name: string,
  description: string,
  type: "WebPage" | "AboutPage" = "WebPage",
  extra: Record<string, unknown> = {},
) {
  const url = `${origin}/${locale}${path}`;
  return {
    "@type": type,
    "@id": url,
    url,
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": websiteId(origin) },
    primaryImageOfPage: { "@id": `${origin}${assets.coachProfile.src}` },
    image: { "@id": `${origin}${assets.coachProfile.src}` },
    ...extra,
  };
}

/** Fills {m1}/{m3}/{m6} in a guide price sentence. */
export function priceSentence(
  locale: Locale,
  template: string,
  row: readonly number[],
) {
  const fmt = (n: number) =>
    locale === "ar" ? `${n} جنيه` : `${n.toLocaleString("en-US")} EGP`;
  return template
    .replace("{m1}", fmt(row[0]))
    .replace("{m3}", fmt(row[1]))
    .replace("{m6}", fmt(row[2]));
}
