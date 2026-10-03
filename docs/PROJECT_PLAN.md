# Project plan

Premium bilingual site for Abd Alrahman Mahfouz online coaching. English at `/en`, Arabic at `/ar`, with RTL and a persisted language preference.

## Architecture

- [x] Next.js App Router, TypeScript, Tailwind CSS
- [x] Copy in `src/lib/content.ts`, business facts in `src/lib/business.ts`
- [x] Shared header, footer, pricing, galleries, and one image lightbox
- [x] `next/image` and `next/font`
- [x] Light and dark theme
- [ ] Owner-supplied `SITE_URL` for production canonical URLs

## Language and responsive behavior

- [x] Full English and Arabic routes
- [x] Compact EN / ع control keeps the current section
- [x] Layouts checked for desktop and mobile widths
- [x] Reduced-motion behavior for reveals, carousel, and lightbox

## Sections

- [x] Hero with the real coach cutout and structural background
- [x] Coaching offer, app explanation, and process steps
- [x] Three untouched transformations
- [x] Seven sanitized testimonials in a looping carousel
- [x] About, two certificates, FAQ answers always visible
- [x] Pricing for daily coaching and no follow-up
- [x] Instagram and WhatsApp contact
- [x] Legal pages

## Pricing and payment

- [x] Egypt daily prices 1100 / 3000 / 5500 EGP
- [x] Outside Egypt daily prices 1500 / 4000 / 7500 EGP
- [x] No follow-up prices 500 / 1000 / 2000 EGP
- [x] Region chosen by the visitor before daily prices appear
- [x] Package CTAs open the official InstaPay link
- [x] Payment note, 72-hour delivery, and secondary WhatsApp confirmation
- [ ] Owner visual review of the payment block in both themes

## Media rules

- [x] Transformations have no overlays, badges, or captions
- [x] Testimonial crops stay mixed and privacy-safe
- [x] Public WebP delivery; unused PNG siblings preserved privately
- [x] Originals kept private
- [x] Centered lightbox for enlargeable images

## Brand

- [x] MAHFOUZ wordmark kept
- [x] Geometric M mark for favicon, apple icon, and navigation
- [x] Performance green `#11DB5B` in the token system
- [ ] Owner review of the monogram at real browser-tab size

## SEO and performance

- [x] Locale metadata, sitemap, and robots
- [x] Responsive image sizes
- [x] WebP used for page delivery
- [ ] Production domain still comes from `SITE_URL`

## Portable brand system — October 3, 2026

- [x] Owner-interviewed brand personality and audience priorities
- [x] Portable `brand-system/` with token source, CSS theme mappings, docs, prompts and browser preview
- [x] Website theme variables mapped to the portable token layer without changing business behavior
- [x] Brand preview is independent of Next.js and includes a theme toggle
