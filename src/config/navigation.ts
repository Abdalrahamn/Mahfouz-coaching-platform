/**
 * sectionIds — ordered ids of the home page's anchorable sections.
 *
 * Two consumers depend on this list staying correct:
 * - Header nav links build `/{locale}#{id}` from it, so each label
 *   must line up with the section rendered at that position.
 * - LanguageLink re-detects the visitor's current section by reading
 *   `main section[id]` from the DOM, so every id listed here must
 *   exist as a real `<section id="...">` on the home page.
 *
 * Order = vertical order of sections on the page.
 */
export const sectionIds = [
  "transformations",
  "coaching",
  "about",
  "pricing",
  "faq",
];

export const legalSlugs = ["terms", "privacy", "disclaimer"] as const;
export const coachingGuidePath = "/online-coaching-prices";
export const aboutPath = "/about";
/** ISO date of the last substantive content update (sitemap lastModified, Article dateModified). */
export const contentUpdated = "2026-11-22";
export const guidePublished = "2026-11-16";
export type LegalSlug = (typeof legalSlugs)[number];
export function isLegalSlug(slug: string): slug is LegalSlug {
  return legalSlugs.some((value) => value === slug);
}
