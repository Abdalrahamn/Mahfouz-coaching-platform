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
