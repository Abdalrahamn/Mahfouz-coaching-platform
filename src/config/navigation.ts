export const sectionIds = [
  "transformations",
  "coaching",
  "about",
  "pricing",
  "faq",
];

export const legalSlugs = ["terms", "privacy", "disclaimer"] as const;
export type LegalSlug = (typeof legalSlugs)[number];
export function isLegalSlug(slug: string): slug is LegalSlug {
  return legalSlugs.some((value) => value === slug);
}
