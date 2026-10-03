# Colors

The canonical primitives and theme aliases are in `../tokens/design-tokens.json`. Primary orange `#FF5A1F` has RGB `255, 90, 31`, HSL `15.8° 100% 56.1%`, and OKLCH `0.6824 0.2108 37.70°` (D65). The `orangeScale` uses the same hue with stepped OKLCH lightness/chroma, generated from that approved base in gamut. These tints/shades support semantic surface states; they are not extra decorative accents.

## Allowed freely

- Black `#05070A`, navy `#081526`, dark blue `#0D2138` for structure and surfaces.
- Off-white `#F5F5F2` and muted `#98A2B3` for dark-mode text hierarchy.
- Orange `#FF5A1F` for actions and small emphasis; bright orange `#FF6A24` for hover/highlight. The perceptually stepped `orangeScale` is available for tonal surfaces and state mapping.
- Cool light neutrals `#F3F5F8`, `#E7EDF3`, white, and dark blue-gray text for light mode.

## Conditional

- Green `#11DB5B` only for progress, results, included checks, success, or approved existing brand detail. In light mode use readable `#087B34` for text.
- Dark-mode bright orange for text is suitable on dark surfaces; light-mode orange text uses `#9F300B`.
- Warning, error, success and info colors only convey those interface meanings; pair color with label/icon. They are not decorative accents.

## Forbidden unless explicitly approved

New decorative hues, neon gradients, purple/cyan/pink accents, rainbow treatments, replacing orange with green, or recoloring brand assets. Do not choose colors for variety alone.

## Contrast

Use semantic pairings. Normal text ≥4.5:1; large text and essential non-text boundaries ≥3:1. Validate final combinations, especially orange text on pale surfaces and muted text on imagery. An image overlay is allowed only when necessary for legibility and must not alter protected transformation photos.
