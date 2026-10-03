# Design system integration

The portable source of truth is [`../brand-system/`](../brand-system/):

- `tokens/design-tokens.json` owns primitive, semantic and foundational component values.
- `css/tokens.css` maps canonical values into portable CSS custom properties.
- `css/dark-theme.css` and `css/light-theme.css` define intentional semantic modes.
- `css/brand.css` is the portable stylesheet entry point.
- `BRAND_SYSTEM.md` documents the complete identity and usage rules.
- `brand-preview.html` is a standalone browser specimen.

The Next.js app imports `brand-system/css/brand.css` in `src/app/globals.css` and maps app-local names and Tailwind theme roles to `--ma-*` variables. Feature layout, component states and app-specific exceptions remain in their existing owners. Do not copy primitive values back into app CSS; change canonical tokens and their CSS mapping together.

Dark is the site default; light and dark are first-class. Application locale routes remain `/en` LTR and `/ar` RTL. Business facts remain in `src/lib/business.ts`, not the brand package. See [`BRAND_SYSTEM.md`](../brand-system/BRAND_SYSTEM.md) for image privacy and all remaining rules.
