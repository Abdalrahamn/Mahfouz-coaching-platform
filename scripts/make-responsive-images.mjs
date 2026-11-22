// Generates smaller derivative webp files (-480w / -720w) for the carousel.
// Full-size originals stay untouched (used by the lightbox). Re-run: node scripts/make-responsive-images.mjs
import sharp from "sharp";
import { readdirSync, existsSync, readFileSync } from "node:fs";
import path from "node:path";

const dirs = ["public/assets/transformations", "public/assets/testimonials"];
const widths = [480, 720];
const used = readFileSync("src/config/assets.ts", "utf8");
for (const dir of dirs) {
  for (const f of readdirSync(dir)) {
    if (!f.endsWith(".webp") || /-\d+w\.webp$/.test(f)) continue;
    if (!used.includes(f) && !f.startsWith("feedback-")) continue;
    const src = path.join(dir, f);
    const meta = await sharp(src).metadata();
    for (const w of widths) {
      if (w >= meta.width) continue;
      const out = path.join(dir, f.replace(/\.webp$/, `-${w}w.webp`));
      if (existsSync(out)) continue;
      await sharp(src)
        .resize({ width: w })
        .webp({ quality: 80, effort: 5 })
        .toFile(out);
    }
  }
}
