# Architecture review

## Outcome and audit

Refactored the existing Next.js 16.3.8 / React 19.3.0 / strict TypeScript / Tailwind application incrementally. npm is the package manager (`package-lock.json`). No routes, business facts, prices, payment destinations, public image URLs, image pixels or animation timings were changed. Responsive styling changes are limited to the confirmed enlarged-text overflow bug described below.

Problems addressed:

- The 346-line locale homepage mixed twelve independently maintained story sections with routing and metadata. It is now a 75-line server composition route.
- The flat components directory mixed feature ownership with shared layout and UI.
- `business.ts` bundled pricing, deployment environment parsing and asset configuration.
- Footer imported the static brand mark and interactive language control through the client Header module.
- Locale layout imported a theme startup constant from a client component. The constant now has a framework-independent owner.
- UI and accessibility strings were scattered across locale ternaries; those strings now live in `content.ts` without translation changes.
- Four package-price lookups repeated casts permitting unsupported durations. `Duration` restricts valid selections to 1, 3 or 6 months, with one shared price lookup.
- Carousel effect dependencies were suppressed, and timing/count values were inline. Stable callbacks remove the suppression; feature constants retain the same 3.8-second autoplay, 6-second interaction hold and 180ms settling.
- The gallery retained unused feedback controls and unreachable transformation caption branches. Repository call-site searches found only transformation and certificate gallery uses; feedback exclusively uses TestimonialCarousel. Removed those branches.
- Asset-processing script destructured an unused `reason` field. Removed the unused binding without changing processing or documentation data.

## Final source tree

```text
src/
├── app/
│   ├── (entry)/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── [locale]/
│   │   ├── [legal]/
│   │   │   └── page.tsx
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── apple-icon.png
│   ├── globals.css
│   ├── icon.png
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── layout/
│   │   ├── CoachingLink.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LanguageLink.tsx
│   │   └── ThemeToggle.tsx
│   ├── media/
│   │   └── MediaGallery.tsx
│   └── ui/
│       ├── BrandMark.tsx
│       ├── Eyebrow.tsx
│       └── ImageLightbox.tsx
├── config/
│   ├── assets.ts
│   └── navigation.ts
├── features/
│   ├── about/
│   │   └── components/
│   │       └── AboutSection.tsx
│   ├── coaching/
│   │   └── components/
│   │       ├── CoachingAppSection.tsx
│   │       ├── CoachingSection.tsx
│   │       ├── NutritionSection.tsx
│   │       └── ProcessSection.tsx
│   ├── contact/
│   │   └── components/
│   │       └── FinalCallToAction.tsx
│   ├── faq/
│   │   └── components/
│   │       └── FaqSection.tsx
│   ├── hero/
│   │   └── components/
│   │       ├── CredibilityStrip.tsx
│   │       ├── HeroReveal.tsx
│   │       └── HeroSection.tsx
│   ├── pricing/
│   │   └── components/
│   │       ├── PaymentNumber.tsx
│   │       ├── Pricing.tsx
│   │       └── PricingSection.tsx
│   ├── testimonials/
│   │   ├── components/
│   │   │   ├── TestimonialCarousel.tsx
│   │   │   └── TestimonialsSection.tsx
│   │   └── testimonials.constants.ts
│   └── transformations/
│       └── components/
│           └── TransformationsSection.tsx
└── lib/
    ├── business.ts
    ├── content.ts
    ├── env.ts
    ├── fonts.ts
    ├── metadata.ts
    └── theme.ts
```

`public/assets/{branding,hero,coach,transformations,testimonials,certificates}` stays in place. App metadata icons remain under `src/app`. Existing scripts, tests, documentation, `.env.example`, package lock and framework configs remain at their current roots. No `/about`, `/results`, `/coaching`, `/contact` or API routes were invented: those experiences are existing homepage sections, and changing URLs was outside the brief.

## Move and rename inventory

All old paths below are relative to `src/components/`.

| Previous file | Final owner | Reason |
| --- | --- | --- |
| `header.tsx` | `components/layout/Header.tsx` | Shared navigation shell; PascalCase component naming |
| `footer.tsx` | `components/layout/Footer.tsx` | Shared footer and persistent actions |
| Header exports | `components/ui/BrandMark.tsx`, `components/layout/LanguageLink.tsx` | Static branding separated from interactive navigation |
| `theme-toggle.tsx` | `components/layout/ThemeToggle.tsx` | Shared theme control |
| Theme startup export | `lib/theme.ts` | Safe server import for pre-paint script |
| `actions.tsx` | `components/layout/CoachingLink.tsx`, `components/ui/Eyebrow.tsx` | Separate business-aware CTA from generic presentation |
| `image-lightbox.tsx` | `components/ui/ImageLightbox.tsx` | Generic shared dialog |
| `gallery.tsx` | `components/media/MediaGallery.tsx` | Shared proof presentation for two domains |
| `pricing.tsx` | `features/pricing/components/Pricing.tsx` | Pricing domain ownership |
| `payment.tsx` | `features/pricing/components/PaymentNumber.tsx` | Payment clipboard interaction |
| `testimonial-carousel.tsx` | `features/testimonials/components/TestimonialCarousel.tsx` | Feedback domain ownership |
| `reveal.tsx` | `features/hero/components/HeroReveal.tsx` | Only the hero uses this animation |
| Asset export in `lib/business.ts` | `config/assets.ts` | Centralized typed media manifest |
| Origin helper in `lib/business.ts` | `lib/env.ts` | Deployment environment responsibility |
| Header section IDs and duplicate legal lists | `config/navigation.ts` | Navigation and legal routes share one slug source |

Twelve sections were extracted from `app/[locale]/page.tsx`: HeroSection, CredibilityStrip, CoachingSection, NutritionSection, CoachingAppSection, TransformationsSection, TestimonialsSection, ProcessSection, AboutSection, PricingSection, FaqSection and FinalCallToAction. Each retains the original DOM structure and classes. No component was merged beyond consolidating duplicate legal-slug lists and package-price lookup logic. Old component files were moved or split; no unrelated source files or assets were deleted.

## Boundaries and preserved contracts

Pages and extracted feature sections remain Server Components. Header, language/theme controls, hero reveal, carousel, gallery/lightbox and payment clipboard remain interactive Client Components. The static brand mark can render directly on the server in Footer. The existing locale not-found route still uses client params. Shared components, configuration and libraries have no feature imports; no cross-feature imports or barrels were introduced.

TypeScript remains strict, with no `any`, suppression shortcuts or build-error bypasses introduced. Shared media metadata has one `MediaAsset` shape; business selections use a discriminated union and supported `Duration`. The lightbox slide additionally owns alt text.

Design tokens and styles retain their existing runtime owner (`src/app/globals.css`). CSS changes are formatting plus confirmed enlarged-text fixes: mobile header controls wrap instead of overflowing, the footer wordmark is bounded to available viewport width, app/about grid tracks can shrink, and long mobile headings wrap. Normal text-size composition is preserved, with a 2px mobile header-control gap adjustment so the controls fit on one row. No new Button/Container wrappers, hooks, types directories or speculative abstractions were added. Existing native anchors/buttons/dialog, heading hierarchy, keyboard focus, clipboard live region and reduced motion behavior are preserved.

RTL/LTR, persisted language and section context, themes, privacy-safe proof counts, source-pixel coach photography and clean transformations retain their previous behavior. Localized chrome and aria labels now use `content.ts`; they are textually unchanged. The generic lightbox retains English fallback labels, with explicit localized labels supplied by both consumers.

Canonical URLs, hreflang, Open Graph/Twitter, robots, sitemap, JSON-LD, icons and localized legal metadata retain their behavior. `SITE_URL` remains owner-supplied; no origin is invented.

## Assets and deletion evidence

Asset mapping moved into `config/assets.ts`; filenames and public paths were retained to preserve URLs and reproduction scripts. All 15 active image references were verified on disk with Sharp against their configured intrinsic dimensions. Three transformations, seven sanitized feedback screenshots and two certificates remain. Social-preview photography and favicon references were checked separately through metadata. Additional coach derivatives, PNG siblings and branding variants are intentionally retained because the project asset manifest documents their archival/reference role. Private originals were neither altered nor published. No sanitation scripts were executed.

## Remaining debt and constraints

- `SITE_URL` still requires the production owner's real origin.
- Existing documentation contains historical differences (e.g. old cropped-feedback names in ASSET_INVENTORY versus the active full-redacted derivatives). `config/assets.ts` describes active delivery; historical asset-processing documents were not rewritten as new business evidence.
- Existing prices are shown in two explicit region groups and one no-follow-up group; the architecture refactor preserves that tested behavior. AGENTS/older product text also describes a separate region-selection flow. Resolving that product discrepancy requires a distinct owner-directed workflow change.
- `business.ts` still owns contextual message templates as well as approved facts; visible interface/accessibility copy is centralized in `content.ts`.
- Dependency ranges using `latest` remain as found, with the installed versions fixed by the existing lockfile.
- The global stylesheet remains sizable but is an intentional visual contract; splitting it or redesigning tokens is unnecessary for this ownership refactor.
- This workspace has no Git repository. No commits, branch or PR were created. A source baseline was saved privately under `/tmp/mahfouz-architecture-baseline/src` before editing.

## Verification

Final command results and browser coverage are recorded below after execution. Static evidence: `premium-audit.json`; browser report: `verification/browser-results.json`; screenshots and comparison: `verification/architecture/`.

- `npm run lint`: passed, zero warnings after removing the unused script binding.
- `npm run typecheck`: passed.
- `npm run test`: passed, 5 tests.
- `npm run build`: passed; existing locale/legal routes and metadata endpoints generated successfully.
- `npm run format:check`: passed.
- Premium strict static audit: passed, zero findings.
- `npm run test:e2e`: passed, 19 tests against the final production server (1.1 minutes). Both enlarged-text locales and native touch swipe passed.
- Architecture-only baseline full-page comparison before enlarged-text CSS repairs at 375, 768, 1280 and 1920 pixels in both locales: identical dimensions in all eight captures, exact pixels in five; only 60 color-channel differences in each of three English captures, restricted to an 8x8 area. No claim of universal pixel identity is made. Additional final fully loaded media screenshots cover both locales at 390 and 1280 pixels in both themes; all image loads were awaited. The final header is 72px at 375/390px and 86px at desktop width.

An initial browser run had one mobile-menu assertion fail while source edits and hot reload were in progress. A clean rerun then confirmed separate 200% enlarged-text overflow bugs in the header/footer and English headings/grid content. The existing enlarged-text test was extended to both locales and passes after targeted responsive CSS repairs; the final full rerun runs against the completed source. Browser runtime coverage includes localized reflow, axe WCAG checks, approved package prices and payment links, clipboard success/failure, legal routes, private-file 404 responses, language preference and section retention, lightbox focus/Escape, mobile navigation, enlarged text, autoplay/pause/infinite wrap/reduced motion, and real touch swipe.

The final browser suite is run once against `npm run start` after the final production build. Two intermediate test-run artifact errors were caused by overlapping Playwright invocations deleting each other’s trace files; those errors were investigated and the final verification is sequential.

The existing native touch-swipe test now waits for carousel clone positioning and sends movement events at 16ms intervals, giving the browser a realistic gesture cadence rather than racing initialization/compositing. Its assertions remain intact.
