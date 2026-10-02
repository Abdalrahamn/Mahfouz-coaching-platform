# Design system

Runtime tokens live in `src/app/globals.css` under `@theme inline`. Light theme overrides the same variables on `html[data-theme="light"]`.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| Black | `#05070A` | Premium foundation, dark background |
| Deep navy | `#081526` | Structure, chapter bands |
| Dark blue | `#0D2138` | Surfaces |
| Primary orange | `#FF5A1F` | Action, conversion, primary CTAs, energy |
| Bright orange | `#FF6A24` | Active payment and action accents |
| Performance green | `#11DB5B` | Results, progress, included checks, result emphasis |
| Off white | `#F5F5F2` | Dark-theme foreground |
| Muted text | `#98A2B3` | Secondary copy |

CSS custom properties: `--color-background`, `--color-navy`, `--color-surface`, `--color-primary`, `--color-accent`, `--color-performance`, `--color-foreground`, `--color-muted`.

Orange stays the conversion color. Green is limited to result headlines, feature checks, and the InstaPay identifier. Navy and black carry the brand foundation.

## Themes

- Dark is the default for first visits. A saved `light` or `dark` choice is reused. The system color scheme does not override that default.
- English is the default locale; a saved Arabic or English preference is reused.
- Light mode accent text uses `--accent-text: #9F300B` and `--performance-text: #087B34` for readable orange/green text on pale surfaces. Primary buttons and decorative accents retain the approved palette.
- Light mode uses the semantic tokens in `globals.css` (`--background`, `--surface`, `--foreground`, `--muted-foreground`, `--primary`, and related roles). Orange stays `#FF5A1F`. Nutrition, process, and the closing band stay navy with light text.
- Preference is applied before paint by the theme boot script and toggled in the header.

## Typography

- Display and wordmark: Barlow Condensed
- English body: Manrope
- Arabic: Cairo, with natural line height and no Latin tracking
- Faces are self-hosted with `next/font`

## Spacing and shape

- Section rhythm about 7rem
- Content max width 1240px
- Minimum gutter 24px
- Controls use a 4px radius
- Photography stays square-edged
- Logical properties handle RTL spacing

## Components

- Primary buttons are orange with dark text. Outline buttons are the quieter alternative.
- Package cards use hairline borders. The recommended daily duration gets a restrained orange glow.
- Included feature checks use performance green. Excluded items stay muted.
- The language control is compact `EN / ع`, persists locale, and keeps the current section.
- The wordmark remains MAHFOUZ. A geometric M mark sits beside it. The mark uses navy, off-white, an orange slash, and a green base bar. It is also the favicon and apple touch icon.

## Motion

- Selective Motion for the hero and section reveals
- Lightbox opens with a short opacity and scale from the center
- `prefers-reduced-motion` disables those transitions
- Testimonial carousel loops about every 3.8 seconds, pauses on hover, focus, and interaction, and supports swipe

## Lightbox

One dialog, `ImageLightbox`, covers transformations, certificates, and testimonials. It is a fixed full-viewport layer, flex-centered, with `object-fit: contain`, a dark blurred backdrop, Escape and backdrop close, and focus return from the native dialog.
