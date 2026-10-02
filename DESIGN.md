---
version: alpha
colors:
  background: "#05070A"
  navy: "#081526"
  surface: "#0D2138"
  primary: "#FF5A1F"
  accent: "#FF6A24"
  performance: "#11DB5B"
  foreground: "#F5F5F2"
  muted: "#98A2B3"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
  body:
    fontFamily: "Manrope, sans-serif"
    fontSize: "1rem"
    lineHeight: "1.7"
  arabic:
    fontFamily: "Cairo, sans-serif"
    lineHeight: "1.8"
rounded:
  control: "0.25rem"
spacing:
  section: "7rem"
  gutter: "1.5rem"
components:
  action:
    backgroundColor: "#FF5A1F"
    textColor: "#05070A"
---
# MAHFOUZ design direction

## Overview
A personal coaching brand for people who want structured training that fits real life. Athletic editorial photography anchors the site; live typography and practical actions sit alongside it. The signature is an oversized condensed headline meeting a full-height, real training photograph, with an orange LIFE line. No pasted hero poster, stock physique, fake dashboard or made-up app interface.

## Colors
The runtime token owner is src/app/globals.css: CSS variables under @theme inline map the palette above directly into Tailwind and shared components. Foreground/muted communicate hierarchy. Orange identifies actions, accents and the selected coaching period. Performance green (#11DB5B) identifies results, progress and included checks. Primary buttons use black text for contrast. Light-mode accent text uses --accent-text (#9F300B) and --performance-text (#087B34) to meet contrast requirements while retaining the orange/green hierarchy; dark text accents retain their original palette. Dark blue divides story chapters without loud gradients.

## Typography
Barlow Condensed is the display and wordmark face. Manrope handles English copy and controls. Cairo replaces both in Arabic, with positive natural line height, no condensed transforms and no Latin tracking. next/font self-hosts all faces. Avoid clipping headings at mobile widths.

## Layout
Max content width 1240px; 24px desktop/mobile minimum gutters. Hero composition pairs text and real portrait with a subtle edge fade. Mobile gets a dedicated upper photographic view followed by readable copy. Below the hero, alternate quiet grids with broad editorial features. Transformations preserve original proportions. Feedback has seven privacy-safe proof excerpts, served through a horizontal native snap track with keyboard/arrow alternatives. About integrates small certificate previews. Legal pages share the same typography, header and footer.

## Elevation & Depth
Depth comes from real photography and restrained navy surfaces. Hairline white borders separate content. No gradient blobs, glowing bodybuilding graphics, game interface, or repeated glass cards.

## Shapes
Controls have a 4px radius. Photography and content blocks use squared edges. Pill shapes are limited to compact utility labels and language/region selection.

## Components
Shared CoachingLink owns promotional actions leading to pricing; business.ts owns approved prices and contextual links. Header/Footer live in components/layout; MediaGallery in components/media serves transformations and certificates, and ImageLightbox in components/ui owns the native dialog with focus trapping, Escape and focus return. FAQ articles keep every answer visible. Motion is restricted to one hero entrance and optional section reveals with prefers-reduced-motion. Logical CSS properties own RTL spacing. Mobile sticky actions reserve bottom space, and focus scroll margins account for the header. At enlarged text sizes, mobile header controls wrap, long headings can break, and app/about grid tracks shrink to preserve content access.

## Do's and Don'ts
Use the actual coach photos and supplied facts. Never serve private originals or client identifiers. No fake ratings, fabricated results, countdowns, invented app brand or public health questionnaire. Do not crop transformation bodies to change their apparent proportions. Arabic must be fully localized, including pricing links and legal pages.
