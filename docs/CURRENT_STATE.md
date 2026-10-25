# Current state

The site is a Next.js App Router project with English and Arabic routes, light and dark themes, and the existing coaching page. This pass added a centered lightbox, PNG siblings, a geometric mark, InstaPay package checkout, performance green, and these docs.

## Fully implemented

- Locale routes, RTL, and persisted language
- Hero, coaching, transformations, testimonials, certificates, FAQ, footer
- Daily coaching lists Inside Egypt and Outside Egypt as visible sections; no-follow-up plans stay one set because those prices are the same in both regions
- Package buttons link to `https://ipn.eg/S/foza./instapay/9crWHF`
- InstaPay identifier `foza.@instapay` shown beside the payment note
- Screenshot instruction and 72-hour delivery note under the package grid
- Secondary WhatsApp confirmation link to `https://wa.me/201146399576`
- Shared `ImageLightbox` for transformations, certificates, and testimonials
- Referenced public WebP files; unused PNG siblings and derivatives archived privately; original pixels untouched
- Brand mark SVG and PNG favicon sizes 16, 32, 48, 180, and 512
- Performance green token and limited use on result titles and feature checks

## Partially implemented

- The lower payment section still shows the existing payment number and mentions supported cash wallets. Package cards themselves go to InstaPay first.
- Open Graph still uses the coach training photo. The monogram is the browser icon, not the social preview image.

## Needs owner review

- Monogram at 16px in a real browser tab
- Green result headline against both themes
- Arabic payment sentences, especially the screenshot instruction
- Whether the shared confirmation button should name the exact duration the visitor selected

## Missing assets

- No owner-supplied production domain in `SITE_URL`
- No QR code asset, and none is required

## Known limitations

- PNG siblings are lossless conversions of the current public WebP files. They do not replace the private originals.
- `next/image` may still negotiate a smaller derivative in the browser. The page `src` values point at WebP.
- Native dialog focus return depends on the control that was focused when the dialog opened.

## Checks

Run `npm run lint`, `npm run typecheck`, `npm run test`, and `npm run build` after this pass and record the result in the session report. Update this file if a check fails.

## Architecture refactor — October 2, 2026

The locale homepage now composes server feature sections. Shared layout/UI/media owners are explicit; media and navigation maps live in `src/config`. Business facts remain in `src/lib/business.ts`, UI/chrome copy in `src/lib/content.ts`, origin validation in `src/lib/env.ts`, and the theme startup script in `src/lib/theme.ts`. Existing routes, styles, approved business behavior and public image paths are preserved. See `docs/ARCHITECTURE_REVIEW.md` for the move inventory and final verification evidence.

Final verification: lint (zero warnings), typecheck, 5 unit tests, production build, formatter and strict UI audit passed. All 19 browser checks passed against the final production server, including both locales at 200% text size. Screenshots cover both languages and themes; active asset dimensions are verified.

## Portable brand system — October 3, 2026

`brand-system/` is the portable identity package at v1.0.0. It records owner-approved direction and consolidates token values for use outside this application. `src/app/globals.css` imports `brand-system/css/brand.css` and maps application theme roles onto `--ma-*` variables. Open `brand-system/brand-preview.html` directly for the standalone light/dark specimen. The package contains only the approved logo mark and a public coach training photo as examples; it contains no private client originals.


## Owner hero image update — October 3, 2026

The owner selected the newly supplied coach image, then requested background removal. The active hero uses `/assets/hero/coach-new-transparent.webp` (597 × 1468, alpha transparency), derived with the image editing tool and trimmed for responsive placement over the separate hero atmosphere. Both locales share it; headlines and actions remain live HTML. The supplied fiery composite is preserved privately. This supersedes the earlier full-composite trial.

## Nutrition image update — October 4, 2026

Owner-selected new nutrition image: `/assets/coach/coach-nutrition-new-transparent.webp` (705 × 1510, alpha transparency). Background removed with the image editing tool; optimized transparent delivery copy fitted to the existing navy section with a separate caption area. Original supplied composite remains in ignored `private/originals/owner-updates/`. Both locales share the asset.

Validation for the nutrition image update: lint, typecheck, unit test command, changed-file formatting and strict UI audit passed; English/Arabic desktop and mobile inspected with no horizontal overflow. Production build remains unverified: Google Fonts fetch failed, Turbopack encountered an internal port permission error, and the Webpack fallback encountered font-network failures plus the Next.js metadata-loader apostrophe-path parse error. Full formatter check also reports a pre-existing formatting issue in `src/components/layout/LanguageLink.tsx`.

## Language and theme defaults — October 4, 2026

Fresh visits to `/` default to Arabic (`/ar`) and dark mode. Explicit saved language/theme preferences remain respected. Arabic hero headline: «ابني جسم يسهل حياتك.» Theme startup uses `next/script` after hydration; the theme control restores the saved theme before paint after locale changes. Repeated locale switches no longer render raw script elements through React.

Verified defaults and locale switching at 1102px and 390px: fresh `/` loads `/ar` in dark, both switch directions keep saved light preference and correct RTL/LTR, no browser console/page errors, preferences survive reload and return to `/`. Added Playwright regression passed. Lint, typecheck, unit test command and full formatter passed. Production build still blocked by Turbopack internal port permission error, including the escalated retry.

## About image update — October 4, 2026

Owner-selected rear-facing coach image replaces the About portrait in both locales. Background/effects removed with the image editing tool; active asset `/assets/coach/coach-about-new-transparent.webp` (728 × 1461, alpha transparency). Full figure is contained over the separate section background with space below for the existing brand label. Supplied original remains privately preserved in `private/originals/owner-updates/`.

About image validation: lint, typecheck, unit test command, formatter and strict UI audit passed. English/Arabic desktop (1280px) and mobile (390px) inspected without horizontal overflow. Production build remains blocked by the previously recorded Turbopack internal port permission error.

## Transformation carousel — October 4, 2026

Owner added a fourth transformation. Active public derivative `transformation-04.webp` (941 × 1672) has a permanent opaque face mask on the before portrait; supplied composition and body proportions otherwise retained. Original preserved privately. Four transformations now use the same carousel component and 3800ms interval as feedback: three visible above 1000px, two through 601–1000px, one at 600px and below. Pause/resume, arrows, swipe/drag, looping, reduced-motion and enlargement remain available; controls stay outside images. This owner instruction supersedes the previous three-image count.

Owner face-marker correction: replaced the fourth image’s dark oval with a small opaque gold eye band (#EFC52B). The same gold is applied to visible client eye regions in 01, 03 and 04, retaining supplied artwork elsewhere. Updated public filenames end in `-gold.webp` to avoid serving cached earlier masks. Private originals remain unchanged; `scripts/sanitize-transformation-faces.mjs` reproduces the derivatives.

Carousel verification: English/Arabic at 1280px, 800px and 390px display 3, 2 and 1 slides respectively; autoplay, pause and resume passed in all six cases with no page errors. Lint, typecheck, unit command, formatter and strict UI audit passed. Build attempted and still blocked by the recorded Turbopack internal port permission error. Gold derivative correction passes lint/typecheck/unit command/formatter; derivatives visually inspected.

## Independent transformation posters — October 4, 2026

Owner clarified: keep all existing transformation posters unchanged in the full-poster carousel. New before/after pairs are composed offline into separate saved posters using a reusable reference-backed template, then added as independent transformations. No photo swapping inside a fixed website frame. `transformation-05.webp` is the first new composed example from the supplied pair; five posters total, three/two/one visible by viewport. Gold permanent eye bands remain. The transient fixed-frame prototype was removed.

Verified restored full-poster carousel in both locales at 1280px and 390px: five independent posters, no fixed-frame swapping component. Saved four personal artifact-template packages and verified all required files. Lint, typecheck, unit command, formatter and strict UI audit passed; production build remains blocked by the existing Turbopack internal port permission error.

## Owner face-marker rule — October 4, 2026

Only add a small permanent opaque gold eye band (#EFC52B) to a visible, uncovered client face. If a face already has an emoji, stripe or any covering (including a phone), preserve it without adding another marker. If the face is missing, cropped out, hidden or not visible, add nothing. Do not mark the coach. Inspect each supplied Before/After independently; never apply bands blindly. This supersedes earlier instructions to mark every face with the same color.

Removed added gold bands from posters 01/03/04, which already cover, crop or obscure client faces. New delivery filenames use `-existing-mask.webp` to avoid cached overmarked versions. Poster 05 keeps bands on its two uncovered faces. Saved the conditional rule in AGENTS.md, business/media docs and all four personal template instructions. Lint/typecheck/unit command passed; build still fails on the existing Turbopack port-permission error.

## Before/After poster alignment — October 4, 2026

Owner requested corrected photo placement in poster 05. Both source-pixel photos now fill the whole framed regions; old client remnants are removed. The arrow is a foreground layer above the photos, with clear Before/After labels at their bottom. Coach and remaining composition use original pixels. Delivery uses `transformation-05-refined.webp`; the gold personal template reference and preview were updated. Existing other posters and carousel behavior remain unchanged.

## Persistent transformation-template instructions — October 4, 2026

`docs/TRANSFORMATION_TEMPLATE.md` now consolidates owner-approved input ordering, full-frame source-photo composition, foreground arrow, bottom labels, conditional gold face markers, independent poster saving and preservation of existing results. AGENTS.md explicitly routes future Before/After tasks to it. Documentation-only update; no app behavior changed.

## Straight transformation template — October 5, 2026

Created a separate reusable empty poster with source-pixel coach photography from transformation 01, the second poster's brand/benefits, two upright photo slots, and only TRANSFORMATION plus centered DM ME / FOR ONLINE COACHING below. Private reference and personal template retained; rules in docs/TRANSFORMATION_TEMPLATE_STRAIGHT.md. No app media or behavior changed.

Straight template v2: owner-requested photographic face refinement using transformation 01 as identity reference, modest gold shoulder backlight, and larger comparison slots. Updated personal template reference/preview and docs/TRANSFORMATION_TEMPLATE_STRAIGHT.md; no website code/assets changed.

## Owner reverted template experiments — October 5, 2026

Owner cancelled recent straight-template experiments and selected the existing poster 05 as the active template again. The original personal Mahfouz Transformation reference already matches this website asset. Archived the straight personal skill and its MD rules privately; docs/TRANSFORMATION_TEMPLATE.md now explicitly routes future pairs to the original design. Website assets and existing posters already match the requested design. No pending new pair was applied.

## Independent Before/After source library — October 5, 2026

Saved both received pairs separately in ignored private/transformations/pairs/pair-001 and pair-002, with unchanged original PNG bytes, per-pair metadata and an index. SHA-256 equality verified against all four supplied files. Pair 001 maps to poster 05; pair 002 remains unapplied. Persistent rules in AGENTS.md and docs/TRANSFORMATION_TEMPLATE.md require template-independent originals for every future pair.

## New poster and brush eye markers — October 5, 2026

Applied the restored original template to pair-002 and added transformation-06.webp as the sixth independent poster. Replaced only poster 05's rectangular markers with permanent opaque gold dry-brush slashes, delivered as transformation-05-brush.webp. Other supplied masks/emoji preserved. Both pairs remain separately archived as unchanged originals; repeated attachments verified by SHA-256.

Checks for new poster: lint, typecheck and unit command passed. Both locales at 1280px and 390px show six independent posters and include poster 06. Production build failed fetching Barlow Condensed, Cairo and Manrope from Google Fonts due network connectivity.
