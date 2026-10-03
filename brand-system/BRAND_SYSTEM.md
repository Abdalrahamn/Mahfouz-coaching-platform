# MAHFOUZ Brand System v1.0.0

This is the human-readable source of truth for the portable brand identity. Machine-readable values live in `tokens/design-tokens.json`; CSS consumes those roles through `css/brand.css`.

## 1. Identity and audience

MAHFOUZ is a premium online fitness coaching brand for committed coaching clients and serious prospects. It serves Arabic and English audiences in Egypt and internationally. Personality priority: **Premium → Performance → Discipline → Clarity → Energy**. Be confident and credible, strong without aggression, motivating without clichés, and approachable without losing professionalism.

## 2. Core design principles

- Use real evidence and supplied facts. Never manufacture claims or proof.
- Let coaching and the person remain central; design clarifies rather than competes.
- Prefer editorial simplicity, precise hierarchy and controlled contrast.
- Use consistent components and tokens over one-off novelty.
- Treat Arabic and English as first-class, with correct RTL/LTR structure.

## 3. Color

Canonical values and aliases are in `tokens/design-tokens.json`; do not fork them. The foundation is near-black `#05070A`, deep navy `#081526`, and dark blue `#0D2138`. Primary action orange is `#FF5A1F` (RGB 255, 90, 31; HSL 15.8° 100% 56.1%; OKLCH 0.6824 0.2108 37.70°); bright orange `#FF6A24` is a hover/highlight value. Its perceptually stepped tonal scale is generated from this approved base and remains a tonal state range, not a source of extra accent hues. Performance green `#11DB5B` is restricted to progress, result emphasis, included/positive states and similarly functional cues. Off-white `#F5F5F2` and muted blue-gray `#98A2B3` establish dark-mode text hierarchy.

Light mode uses cool pale blue-gray surfaces (`#F3F5F8`, `#E7EDF3`) and dark readable text. Accent text uses accessible darker orange `#9F300B` and green `#087B34`; interactive orange surfaces retain the approved orange. Both themes are first-class; dark is the website default.

Never introduce a decorative accent hue. Functional status colors belong only to their meaning. See `docs/COLORS.md` and `docs/LIGHT_DARK_MODE.md`.

## 4. Typography

- Display and wordmark: Barlow Condensed, 600–800.
- English body and UI: Manrope, 400–800.
- Arabic: Cairo, 400–800, generous line height and natural letterforms.
- Use role-based scale tokens, adapting sizes to each medium. Do not stretch or artificially condense Arabic. Avoid Latin tracking on Arabic text.
- Numerals should follow surrounding language and locale conventions while staying legible; isolate mixed-direction values when needed.

See `docs/TYPOGRAPHY.md`.

## 5. Layout and spacing

Use the token spacing scale (2–96px), a 24px minimum content gutter, and approximately 112px section rhythm on wide web pages. The established website content width is 1240px. Choose responsive measures by medium while retaining the same hierarchy. Use CSS logical properties so layouts mirror naturally in RTL.

## 6. Radius and component style

The visual philosophy is restrained and mostly square: controls use 4px corners; photography and major content blocks stay square-edged. 8–16px radii are limited to contexts where content benefits. Pills are for compact utility controls. Orange primary buttons use dark text; outlines remain quiet. Hairline borders define surfaces. Cards should not become a repeated rounded SaaS grid. See `docs/COMPONENT_STYLE.md`.

## 7. Elevation, shadow and gradients

Depth primarily comes from photography, value contrast and navy surfaces. Use small, soft shadows; use orange glow sparingly for selected actions only. Gradients may support image legibility, subtle hero atmosphere or brand light. Do not add rainbow gradients, glowing blobs, fake dashboards or gaming HUDs.

## 8. Motion

Motion is selective, short and purposeful: subtle reveal, image mask, state transition or micro-interaction. Use 160ms fast, 280ms normal and 480ms slow tokens with standard ease-out. Avoid bouncing, spin, parallax overload, scroll hijacking, or animating every item. Honor `prefers-reduced-motion`; essential content must never depend on animation. See `docs/MOTION.md`.

## 9. Iconography

Use simple outline icons with consistent 1.75–2px strokes and gently rounded or square terminals. Typical sizes: 16px inline, 20–24px controls, up to 32px feature illustration. Custom marks are reserved for MAHFOUZ identity or repeated branded symbols. Avoid mixing packs, filled emoji-like icons and 3D illustrations.

## 10. Photography and generated images

Favor realistic editorial gym imagery: directional natural-looking light, controlled deep contrast, natural skin tone and neutral/cool surroundings. Orange light is acceptable only when plausible in-scene and restrained. Prefer confident, grounded framing and useful negative space. No artificial body reshaping, invented anatomy, fake text, generic neon, plastic skin or detail hallucination. The real coach is the recognizable subject. Follow original asset and privacy rules. See `docs/IMAGE_STYLE.md`.

## 11. Before/after transformation media

Keep source photos untouched: do not crop to misrepresent proportions, reshape, recolor, retouch, filter, cover with overlays, or add fabricated data. A separate composition may place restrained labels, a divider and simple border outside the image pixels, when the medium requires it. No invented identity, quote, timeline, measurement, result or watermark. The website specifically displays the supplied comparisons without captions or overlays. See `docs/BEFORE_AFTER.md`.

## 12. Video and social

Use concise openings, restrained logo use, readable bilingual captions, safe areas, direct cuts or subtle fades, truthful b-roll, and a clear end-card hierarchy. Keep social layouts editorial and legible at a glance. Do not add noisy transitions, fake urgency, fabricated results or unrelated palette colors. See `docs/VIDEO_STYLE.md` and `docs/SOCIAL_MEDIA.md`.

## 13. Light and dark modes

Both modes are supported through semantic variables. Keep brand roles stable while tuning surface and text values. Never mechanically invert a screenshot. Check contrast, focus, images, controls and section bands in both. See `docs/LIGHT_DARK_MODE.md`.

## 14. Accessibility

Normal text targets WCAG 2.2 AA contrast (4.5:1); large text and meaningful graphical boundaries target 3:1. Preserve visible focus, keyboard operation, semantic HTML, touch targets of at least 44×44px where practical, reduced motion and readable zoom/reflow. Semantic status color must be paired with text/icon meaning. See `docs/ACCESSIBILITY.md`.

## 15. AI usage

Read `AI_BRAND_GUARDRAILS.md` and the relevant prompt before generating. Tokens are hard visual constraints unless the owner explicitly changes them. Prefer consistency over novelty; if a decision is uncertain, use the simplest approved option. Do not hallucinate facts, names, client media or branding.

## 16. Do / don't

**Do:** use the approved palette, type roles, photographic evidence, quiet geometry, native RTL/LTR and semantic themes.

**Don't:** invent accents, numbers, testimonials, client details, gym locations, fake product interfaces, body edits, medical claims, discount/scarcity cues, excessive glow or trend-led visual effects.

## 17. Examples

Open `brand-preview.html`; examples are grouped in the page and linked from `examples/`. The preview illustrates tokens and patterns. Values in the JSON remain canonical.

## 18. Version history

- **1.0.0 — 2026-10-03:** Portable system consolidated from the existing website and owner-approved interview decisions. Established personality and audience priority, green usage, cross-medium shape language, transformation image rule, type roles, equal theme status, icon style and new-image direction.
