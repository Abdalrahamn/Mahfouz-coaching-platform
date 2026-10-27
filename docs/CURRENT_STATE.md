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

## Package payment steps — October 25, 2026

Each package card now shows the two payment steps in order: pay with InstaPay, then send the screenshot on WhatsApp. The WhatsApp link opens a prefilled message for that card’s plan, region when it applies, duration, and price. The shared confirmation link under the grid remains.

## Seventh transformation — October 26, 2026

Added pair-003 on the original gold template as `transformation-07-brush-60.webp` (941 × 1672), the same height as the other gold posters. Untouched originals are in `private/transformations/pairs/pair-003/`. The before face is outside the frame, so it has no marker. The after face keeps the gold dry-brush eye slash. The lower block is a short owner-supplied line, from 85 kg to 60 kg, instead of the large prompt. Earlier posters are unchanged.

## Front and side 35 kg posters — October 26, 2026

Added pair-004 (front) as `transformation-08-brush-60f.webp` and pair-005 (side) as `transformation-09-brush-60d.webp`, both 941 × 1672 on the original gold template. Untouched originals are in `private/transformations/pairs/pair-004/` and `pair-005/`. Every visible uncovered eye has a gold dry-brush slash. Each visible client boxer front also has a larger opaque gold dry-brush slash over the crotch. Phones in the after photos stay as they are. Both lower blocks say نزلنا 35 كيلو. The front before frame includes both arms and both hands inside the tilted frame. Both after frames are pulled back so the smaller size is visible, and the side before profile is centered. Earlier posters are unchanged.

## Genital circle marker — October 26, 2026

Owner marker-shape rule — October 26, 2026: the face marker is always the gold dry-brush slash over the eyes. The genital marker is an opaque gold (#EFC52B) round circle, placed only over the genital area, never a slash or block. If the genital area is not visible in the frame (cropped, hidden by a banner or out of frame), add nothing. Inspect each Before/After independently. Original photographs remain untouched privately.

Applied to posters 08 (`transformation-08-brush-60f.webp`, circles on both before and after) and 09 (`transformation-09-brush-60d.webp`, circle on after only; the before crotch is not visible).

## Tenth transformation — October 26, 2026

Added `transformation-10.webp` (941 × 1672), using pair-006 on the original gold template. First attachment is Before, second is After. Original bytes and SHA-256 metadata remain private in `private/transformations/pairs/pair-006/`. Both eye regions are out of frame; no face markers. Visible clothed genital regions have permanent opaque gold circles. Original body proportions, coach, copy, arrow and footer preserved. Added to the shared locale carousel without replacing earlier posters.

Validation for poster 10: lint, typecheck, all five unit tests and the production static build passed. English/Arabic carousel reviewed at 1280px and 390px with no horizontal overflow; poster 10 is included. Private source files are Git-ignored.

## Eleventh transformation — October 26, 2026

Split the supplied flattened comparison into lossless Before/After crops and composed `transformation-11.webp` (941 × 1672) on the approved gold template. Combined original bytes, separate crops, hashes and crop metadata are retained privately in pair-007. Existing face clouds preserved; old labels, logo, watermark and identifiers excluded from final photo crops. Source body pixels retained with no reshaping. Added as an independent poster to both locales.

Poster 11 verification: lint, typecheck, five unit tests, production build and diff whitespace checks passed. Both locales at 390px/1280px load the new poster, without horizontal overflow. Private originals are Git-ignored.

## Posters 12 and 13 — October 26, 2026

Split each of two supplied comparisons into a separate Before/After pair and composed independent gold posters `transformation-12.webp` and `transformation-13.webp`, both 941 × 1672. Untouched combined originals and lossless separate crops with hashes and crop coordinates remain private in pair-008 and pair-009. Existing privacy clouds and phones preserved. Final photo crops exclude old labels, logo, duration banners and weight badges. Source pixels and body proportions preserved. Added both posters to the shared carousel, retaining previous entries.

## Header wordmark returns to top — October 26, 2026

The MAHFOUZ header wordmark links to the locale homepage top. On the homepage, activation explicitly scrolls to zero (smooth unless reduced motion is enabled), including repeated activation after scrolling down. It closes the mobile navigation. Other routes retain normal navigation to the locale homepage. Shared layout supplies the native top anchor.

Final verification: lint, typecheck, all five unit tests, static production build and whitespace checks passed. Browser verification passed in both locales at 390px and 1280px: new posters included, repeated header activation returns to scrollY zero, mobile menu closes, no horizontal overflow. Private combined originals byte-match the received files and remain ignored by Git.

## Posters 14 and 15 — October 26, 2026

Added two independent gold-template posters, `transformation-14.webp` and `transformation-15.webp` (941 × 1672). Combined original bytes and lossless separate Before/After crops retained in private pair-010 and pair-011 with hashes and crop metadata. First pair preserves existing privacy clouds. Second before uses an opaque gold dry-brush eye marker; after preserves phone coverage with no added marker. Old logo, captions and labels excluded from photo crops. Body proportions and source pixels retained. Both included in the shared carousel.

Posters 14/15 verification: lint, typecheck, all five unit tests and production build passed. Both locales reviewed at 390px/1280px; carousel controls now wrap to accommodate fifteen posters without horizontal overflow. Existing header return-to-top and mobile menu checks passed. Source byte equality and Git ignore status verified for both received originals.

## Calm transformation footers — October 27, 2026

All 15 active posters use new `-calm-v2.webp` assets. Removed the large promotional lower block and replaced it with the TRANSFORMATION title and a small DM. Old rendered versions archived privately. Last two posters recomposed from unchanged combined originals with more distant framing; red-shirt before uses a smaller permanent dry-brush eye marker, phone-covered after unchanged. Updated media dimensions in config. Owner rule persisted in AGENTS.md, template docs and the active personal template instructions.

Calm-footer verification: all 15 configured dimensions match delivered files; lint, typecheck, all five tests, production build and whitespace checks passed. English/Arabic desktop 1280px and mobile 390px inspected with current posters, no horizontal overflow and working carousel/top navigation. Existing originals and archived posters remain private. The previous dense reference footer is explicitly superseded by the owner rule.

## Posters 16 and 17 — October 27, 2026

Added two independent calm-template posters (941 × 1400). Pair-012 uses the far-left Before and far-right After panels of the three-panel original; middle panel is excluded by explicit owner instruction. Both uncovered profile eyes have small gold dry-brush marks. Pair-013 preserves the existing meme face coverings; no added eye markers. Visible After genital region has an opaque gold circle. Original combined bytes and lossless selected panel crops remain private with hashes and crop metadata. Old captions, logo, watermark and lower meme excluded. TRANSFORMATION and small DM footer retained.

Posters 16/17 verified: lint, typecheck, five unit tests, production build and whitespace checks passed. English/Arabic at 390px and 1280px show the new posters without horizontal overflow; repeated top navigation still passes. Both combined originals byte-match received files and are Git-ignored. Production preview is running on port 3000; Codex browser opening requested.

## Browser comment corrections — October 27, 2026

Side-view poster 16 moved to fourth in the shared carousel. Posters 16/17 now use `-calm-v2.webp` files with proportional cover crops filling both tilted photo polygons. Poster 17 before is moved upward and its green-tinted after is slightly closer. Owner-requested gold circles cover faces, including the supplied meme faces in poster 17. Circle preference and full-frame rules persisted in AGENTS, template docs and the active personal template. Private originals preserved; previous deliveries archived.

## Protected numeric-result posters restored — October 27, 2026

Owner clarified that numeric-result posters are exempt from calm-footer changes. Restored 01 (86 to 70 kg), 07 (85 to 60 kg / 25 kg), 08 and 09 (35 kg) byte-for-byte from private pre-calm deliveries. New public filenames end in `-results-restored.webp`; original dimensions, source-photo pixels, masks, result captions and footer artwork are retained. Posters 07/08/09 again display their original gold-brush «ابعتلي DM». Other posters keep their current presentation, including poster 16 in fourth position and revised full-frame posters 16/17. Updated pair metadata and persisted the exception in project/template instructions.

Numeric restoration verified: lint, typecheck, five unit tests, production build and whitespace checks passed. The four delivered preview files byte-match the pre-calm archive. English/Arabic at 390px and 1280px verified with numeric posters present, no horizontal overflow, and side-view poster 16 still fourth. Preview running on port 3000.

## Numeric opt-in and approved brush DM clarification — October 27, 2026

Owner clarified that numbers are opt-in for the particular posters he selects. Existing approved numeric deliveries remain protected. DM on the yellow-gold brush is approved and retained; the calm-footer rule must not remove that treatment. This clarification changes persistent instructions only; delivered poster pixels and carousel order remain unchanged.

## Completed DM brush footers — October 27, 2026

Replaced tiny plain DM footers on the 13 ordinary posters with larger black DM on a broad gold dry-brush stroke. New `-dm-brush-v3.webp` deliveries complete the full portrait height and align with the taller numeric posters. Source photo/coach areas are retained; archived prior deliveries remain private. Four protected numeric posters remain byte-identical to their approved restoration. Poster 16 remains fourth. The fuller brush-footer rule is now persistent.

Completed-footer validation: lint, typecheck, all five tests, production build, asset dimension checks and whitespace checks passed. Both locales at 390px/1280px visually reviewed on ordinary posters, fourth-position poster 16 and poster 17; no horizontal overflow/page errors. Numeric posters remain byte-identical to their archives. Preview continues on port 3000.

## Owner result-copy additions and eighteenth poster — October 27, 2026

Added pair-014 as independent poster 18 with owner-supplied 97 → 79 kg / 18 kg copy. Untouched received images, hashes and dimensions are retained privately; no visible faces or genital regions need markers. Source photos use proportional full-frame crops. Browser comment amendments: poster 16 Before circle radius 35 → 38 native pixels; poster 13 gets 90 → 65 kg / 25 kg and better body shape; poster 14 gets +5 kg and better muscle shape; front-view poster 08 gets the owner-supplied no-sagging line beneath the retained 35 kg result. Changed existing image areas are lossless; earlier deliveries archived privately. Explicit approvals persisted in pair metadata and template/project instructions. 18 posters total; poster 16 remains fourth.

Owner-edit validation: lint, typecheck, all five unit tests, production build and whitespace checks passed. The upper photo/title areas of posters 13/14 and the existing photo/results area of 08 match their previous decoded pixels exactly. Poster 16's changes are confined to the enlarged selected face circle. New original bytes match received attachments and are Git-ignored. Both locales at 390px/1280px inspected for all five affected posters with no overflow/page errors; 18 images loaded and poster 16 remains fourth. Preview running on port 3000.

## Final gallery order for commit — October 27, 2026

Owner selected the woman transformation with 90 → 65 kg / 25 kg result as fourth. Posters 04, 06 and 08 remain first, second and third. Poster 13 moves from its former position to fourth; all other entries retain relative order. This supersedes the earlier fourth-position selection for poster 16, which is now fifth. Shared config applies to English and Arabic. The owner requested committing and pushing the completed project changes.

Final commit validation: lint, typecheck, all five tests, production build and whitespace checks passed. English/Arabic at 390px/1280px verified first three posters unchanged and poster 13 fourth, with poster 16 following it. Active public files only are included; unused working derivatives archived privately and all private originals remain Git-ignored.
