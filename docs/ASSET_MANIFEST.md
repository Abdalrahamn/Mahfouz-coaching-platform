# Asset manifest

Public delivery keeps only referenced WebP images and metadata icons. Original files remain in ignored `private/originals/`; unused lossless PNG siblings and superseded public derivatives were moved to ignored `private/cleanup-archive/public/`. Never deploy either private directory.

## Active public assets

- Hero: `assets/hero/coach-transparent.webp`
- Social preview: `assets/hero/coach-training.webp`
- About: `assets/coach/coach-about-transparent.webp`
- Nutrition: `assets/coach/coach-nutrition-transparent.webp`
- Transformations: `assets/transformations/transformation-01.webp` through `transformation-03.webp`
- Feedback: `assets/testimonials/feedback-01-full-redacted.webp` through `feedback-07-full-redacted.webp`
- Credentials: `assets/certificates/certificate-iasst.webp`, `certificate-fitxpert.webp`
- Metadata icons: `assets/branding/mark.svg`, `icon-16.png`, `icon-32.png`, `apple-touch-icon.png`
- Next.js convention icons: `src/app/icon.png`, `src/app/apple-icon.png`

`src/config/assets.ts` owns page media paths, including dynamic feedback filenames. `src/lib/metadata.ts` owns social images and explicit metadata icons. Keep Next.js convention icons even without imports.

All three transformations retain their supplied compositions. All seven feedback images remain irreversibly sanitized. No media pixels were altered during cleanup. No MP4 or public QR code is used.

## Removed from public delivery

The complete list of 41 unused files is recorded in `verification/cleanup/removed-assets.json`. Public PNG archive copies, unused numbered coach photos, superseded isolated portraits, and unused alternate brand exports have no runtime, CSS, metadata, manifest or dynamic URL consumers. Offline source-processing tools are retained as media provenance; they are not runtime asset consumers.
