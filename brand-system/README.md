# MAHFOUZ Brand System

**Version 1.0.0 · Portable, self-contained design reference**

Start with [BRAND_SYSTEM.md](BRAND_SYSTEM.md) for human guidance, [AI_BRAND_GUARDRAILS.md](AI_BRAND_GUARDRAILS.md) for agent constraints, and [tokens/design-tokens.json](tokens/design-tokens.json) for the canonical machine-readable values. Open [brand-preview.html](brand-preview.html) directly in a browser; it has no build step or application dependency.

## Using in another project

Copy this entire folder. Load `css/tokens.css`, `css/dark-theme.css`, `css/light-theme.css`, then `css/brand.css` after the target project's reset. Dark is the default; add `data-brand-theme="light"` to the root element for light mode. Map application-specific aliases to the `--ma-*` variables instead of duplicating color values. Load the approved fonts separately where licensing and hosting allow. The preview bundles the approved open-license font files in `assets/fonts/` with their OFL notices so the specimen renders without a remote font service.

`tokens/design-tokens.json` is the single source of truth. CSS files are runtime mappings of those values. `brand-preview.html` is a demonstrative specimen, not a second token source. The supplied MAHFOUZ mark is in `assets/logos/`.

## Contents

- `BRAND_IDENTITY.md` — positioning, personality, audience and principles.
- `BRAND_SYSTEM.md` — complete system and usage rules.
- `AI_BRAND_GUARDRAILS.md` — hard constraints for future agents.
- `tokens/` — Design Tokens Community Group style source of primitives and semantic aliases.
- `css/` — ready-to-use themes and minimal component primitives.
- `docs/` — focused guidance for color, type, layout, accessibility and media.
- `ai/` — task prompts for image, transformation, video, website and review work.
- `examples/` — lightweight, portable examples linking into the preview specimens.
- `assets/logos/` — approved supplied MAHFOUZ mark.
- `assets/fonts/` — the preview’s bundled Barlow Condensed, Manrope, and Cairo fonts with OFL licenses.

Do not place private originals, client contact sheets, unredacted feedback or private screenshots here.
