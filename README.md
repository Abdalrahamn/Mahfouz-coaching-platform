# MAHFOUZ online coaching

Bilingual English/Arabic personal coaching website built with Next.js App Router, TypeScript, Tailwind CSS, Motion, Lucide, next/font and next/image.

## Run

Use Node.js 22 (see `.node-version`). Run `npm ci`, then `npm run dev`. Open http://localhost:3000. Routes: `/en`, `/ar`, and each locale's `/terms`, `/privacy`, `/disclaimer`. Root defaults to Arabic and respects the saved language preference cookie.

## Verify

`npm run lint`, `npm run typecheck`, `npm run test`, `npm run build`. Browser checks: `npm run test:e2e` (install Chromium with `npx playwright install chromium` once). Static production preview: `npm run start` after building.

## Production origin

For development, copy `.env.example` to `.env.local`. For production builds, export `SITE_URL` in the shell or configure it in Cloudflare build settings. Set it to the owner-approved production origin. Canonical, hreflang, absolute social image URLs and sitemap are derived from that value. Without it, no invented canonical domain is emitted and the sitemap is empty. The site needs no database, account system or payment API. Paid package links open the official InstaPay URL; payment confirmation and onboarding happen on WhatsApp.

## Content and media

Read PROJECT_SPEC.md and AGENTS.md. Bilingual copy: `src/lib/content.ts`. Business facts, pricing and contextual WhatsApp URLs: `src/lib/business.ts`. Media mapping: `src/config/assets.ts`. Origin validation: `src/lib/env.ts`. Visual contract: DESIGN.md; runtime tokens: `src/app/globals.css`.

ASSET_INVENTORY.md maps all 22 attachments. Original images and the flattened hero reference are preserved under ignored `private/`; NEVER upload this folder or verification contact sheets to a public host. Only `public/assets/` contains site media. Seven feedback crops are permanent privacy derivatives, with no contact headers, profile pictures or client names. All three transformations retain original bodies; extra opaque face masks protect clients. No testimonial videos are used.

`npm run assets:organize` reproduces working copies from the original attachment paths; those paths are local to the source workstation. Private source originals are separately preserved for recovery. All normal changes use the existing public working copies.

Legal pages communicate the owner's supplied service, refund and health terms. Before public launch, verify the production origin and review the published business/legal wording for the intended market.

## Architecture

Routes compose server-rendered sections under `src/features`. Interactive leaves remain client components. Application chrome lives in `src/components/layout`, business-agnostic primitives in `src/components/ui`, and the shared proof gallery in `src/components/media`. Shared modules do not import features. Copy stays in `src/lib/content.ts`; business facts stay in `src/lib/business.ts`; `src/config` owns media and navigation maps. Import explicit modules through `@/`; avoid barrels and empty placeholder directories.

See `docs/ARCHITECTURE_REVIEW.md` for the final tree, move inventory, verification and remaining debt. Existing public asset URLs are deliberately preserved.

## Cloudflare Pages

Create a separate Git-connected Pages application for this repository; leave `kelimeler` unchanged. Use project name `mahfouz-coaching`, branch `main`, build command `npm run build`, output `out`, and `SITE_URL=https://mahfouz-coaching.pages.dev`. Confirm the actual allocated hostname at deployment. Push reviewed updates to `main` to trigger subsequent builds. The build uses local licensed fonts and exports only active delivery images. No database or Worker runtime is required.

The build script works around a Next.js loader bug for local directory names containing apostrophes by building an isolated source copy and returning the generated output. It does not copy private originals or local environment files. Use exported environment values for production builds. See `docs/CLOUDFLARE_DEPLOYMENT_PLAN.md` for verification and release details.
