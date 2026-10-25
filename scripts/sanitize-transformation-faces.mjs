import sharp from "sharp";

// Owner rule: mark only visible, uncovered client faces. Preserve existing
// emoji/bands/objects; skip faces that are absent, cropped or obscured.
// These supplied posters already cover or omit every client face.
const jobs = [
  ["01", "private/originals/source-11-transformation.png"],
  ["03", "private/originals/source-13-transformation.png"],
  ["04", "private/originals/owner-updates/transformation-04.png"],
];
for (const [id, source] of jobs) {
  await sharp(source)
    .removeAlpha()
    .webp({ quality: 95 })
    .toFile(`public/assets/transformations/transformation-${id}-existing-mask.webp`);
}
