# MAHFOUZ online coaching

Bilingual English/Arabic personal coaching website built with Next.js App Router, TypeScript, Tailwind CSS, Motion, Lucide, next/font and next/image.

## Run

Requires Node.js 20.9+. Run `npm ci`, then `npm run dev`. Open http://localhost:3000. Routes: `/en`, `/ar`, and each locale's `/terms`, `/privacy`, `/disclaimer`. Root defaults to English and respects the saved language preference cookie.

## Verify

`npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Browser checks: `npm run test:e2e` (install Chromium with `npx playwright install chromium` once). Production: `npm run start`.

## Production origin

Copy `.env.example` to `.env.local` and set `SITE_URL` to the real owned production origin. Canonical, hreflang, absolute social image URLs and sitemap are derived from that value. Without it, no invented canonical domain is emitted and the sitemap is empty. The site needs no database, account system or payment API. Paid package links open the official InstaPay URL; payment confirmation and onboarding happen on WhatsApp.

## Content and media

Read PROJECT_SPEC.md and AGENTS.md. Bilingual copy: `src/lib/content.ts`. Business facts, pricing and contextual WhatsApp URLs: `src/lib/business.ts`. Media mapping: `src/config/assets.ts`. Origin validation: `src/lib/env.ts`. Visual contract: DESIGN.md; runtime tokens: `src/app/globals.css`.

ASSET_INVENTORY.md maps all 22 attachments. Original images and the flattened hero reference are preserved under ignored `private/`; NEVER upload this folder or verification contact sheets to a public host. Only `public/assets/` contains site media. Seven feedback crops are permanent privacy derivatives, with no contact headers, profile pictures or client names. All three transformations retain original bodies; extra opaque face masks protect clients. No testimonial videos are used.

`npm run assets:organize` reproduces working copies from the original attachment paths; those paths are local to the source workstation. Private source originals are separately preserved for recovery. All normal changes use the existing public working copies.

Legal pages communicate the owner's supplied service, refund and health terms. Before public launch, verify the production origin and review the published business/legal wording for the intended market.

## Architecture

Routes compose server-rendered sections under `src/features`. Interactive leaves remain client components. Application chrome lives in `src/components/layout`, business-agnostic primitives in `src/components/ui`, and the shared proof gallery in `src/components/media`. Shared modules do not import features. Copy stays in `src/lib/content.ts`; business facts stay in `src/lib/business.ts`; `src/config` owns media and navigation maps. Import explicit modules through `@/`; avoid barrels and empty placeholder directories.

See `docs/ARCHITECTURE_REVIEW.md` for the final tree, move inventory, verification and remaining debt. Existing public asset URLs are deliberately preserved.
