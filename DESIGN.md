# MAHFOUZ design direction

The portable brand source of truth is [`brand-system/BRAND_SYSTEM.md`](brand-system/BRAND_SYSTEM.md), with canonical machine-readable values in [`brand-system/tokens/design-tokens.json`](brand-system/tokens/design-tokens.json). The current application consumes its CSS theme mappings from [`brand-system/css/brand.css`](brand-system/css/brand.css); application-specific layouts and section behavior remain in `src/app/globals.css` and feature components.

The site remains a premium bilingual online-coaching experience: disciplined performance identity, editorial real-coach photography, black/navy structure, orange actions, green only for functional progress cues, Barlow Condensed display, Manrope English body, Cairo Arabic, restrained square geometry, purposeful motion, first-class light/dark themes, and native RTL/LTR behavior. See the portable system for full rules and owner-approved decisions.

The three supplied transformation images remain unchanged and are displayed without overlays or captions on the website. Seven feedback images stay irreversibly sanitized; private originals and references must never be published.

## Owner hero image update — October 3, 2026

The owner selected the newly supplied coach image, then requested background removal. The active hero uses `/assets/hero/coach-new-transparent.webp` (597 × 1468, alpha transparency), derived with the image editing tool and trimmed for responsive placement over the separate hero atmosphere. Both locales share it; headlines and actions remain live HTML. The supplied fiery composite is preserved privately. This supersedes the earlier full-composite trial.

## Nutrition image update — October 4, 2026

Owner-selected new nutrition image: `/assets/coach/coach-nutrition-new-transparent.webp` (705 × 1510, alpha transparency). Background removed with the image editing tool; optimized transparent delivery copy fitted to the existing navy section with a separate caption area. Original supplied composite remains in ignored `private/originals/owner-updates/`. Both locales share the asset.

## Language and theme defaults — October 4, 2026

Fresh visits to `/` default to Arabic (`/ar`) and dark mode. Explicit saved language/theme preferences remain respected. Arabic hero headline: «ابني جسم يسهل حياتك.» Theme startup uses `next/script` after hydration; the theme control restores the saved theme before paint after locale changes. Repeated locale switches no longer render raw script elements through React.

## About image update — October 4, 2026

Owner-selected rear-facing coach image replaces the About portrait in both locales. Background/effects removed with the image editing tool; active asset `/assets/coach/coach-about-new-transparent.webp` (728 × 1461, alpha transparency). Full figure is contained over the separate section background with space below for the existing brand label. Supplied original remains privately preserved in `private/originals/owner-updates/`.

## Transformation carousel — October 4, 2026

Owner added a fourth transformation. Active public derivative `transformation-04.webp` (941 × 1672) has a permanent opaque face mask on the before portrait; supplied composition and body proportions otherwise retained. Original preserved privately. Four transformations now use the same carousel component and 3800ms interval as feedback: three visible above 1000px, two through 601–1000px, one at 600px and below. Pause/resume, arrows, swipe/drag, looping, reduced-motion and enlargement remain available; controls stay outside images. This owner instruction supersedes the previous three-image count.

## Independent transformation posters — October 4, 2026

Owner clarified: keep all existing transformation posters unchanged in the full-poster carousel. New before/after pairs are composed offline into separate saved posters using a reusable reference-backed template, then added as independent transformations. No photo swapping inside a fixed website frame. `transformation-05.webp` is the first new composed example from the supplied pair; five posters total, three/two/one visible by viewport. Gold permanent eye bands remain. The transient fixed-frame prototype was removed.
