import {
  cpSync,
  existsSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  readFileSync,
  readdirSync,
  mkdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";

// Next's metadata loader does not escape apostrophes in absolute source paths.
// Build from a disposable source-only directory when the checkout has one.
const root = process.cwd();
const isolated = root.includes("'");
const buildRoot = isolated
  ? mkdtempSync(path.join(tmpdir(), "mahfouz-static-"))
  : root;

try {
  if (isolated) {
    for (const name of [
      "src",
      "public",
      "brand-system",
      "next.config.ts",
      "next-env.d.ts",
      "tsconfig.json",
      "postcss.config.mjs",
      "package.json",
      "package-lock.json",
    ]) {
      if (existsSync(path.join(root, name)))
        cpSync(path.join(root, name), path.join(buildRoot, name), {
          recursive: true,
        });
    }
    symlinkSync(
      path.join(root, "node_modules"),
      path.join(buildRoot, "node_modules"),
      "dir",
    );
  }
  const result = spawnSync(
    process.execPath,
    [path.join(root, "node_modules/next/dist/bin/next"), "build", "--webpack"],
    { cwd: buildRoot, stdio: "inherit", env: process.env },
  );
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else if (isolated) {
    for (const name of ["out", ".next"]) {
      rmSync(path.join(root, name), { recursive: true, force: true });
      cpSync(path.join(buildRoot, name), path.join(root, name), {
        recursive: true,
      });
    }
  }
  if (result.status === 0) {
    // Only ship active media; unused public experiments must not be served.
    const config = readFileSync(
      path.join(root, "src/config/assets.ts"),
      "utf8",
    );
    const allowed = new Set(
      [...config.matchAll(/src: "(\/assets\/[^"$]+)"/g)].map(
        (match) => match[1],
      ),
    );
    allowed.add("/assets/hero/coach-training.webp");
    for (let index = 1; index <= 7; index++)
      allowed.add(
        `/assets/testimonials/feedback-${String(index).padStart(2, "0")}-full-redacted.webp`,
      );
    const assetsRoot = path.join(root, "out/assets");
    for (const entry of readdirSync(assetsRoot, {
      recursive: true,
      withFileTypes: true,
    })) {
      if (!entry.isFile()) continue;
      const file = path.join(entry.parentPath, entry.name);
      const url =
        "/assets/" + path.relative(assetsRoot, file).split(path.sep).join("/");
      if (!allowed.has(url) && !url.startsWith("/assets/branding/"))
        rmSync(file);
    }
    for (const family of ["barlow-condensed", "manrope", "cairo"]) {
      const licenses = path.join(root, "out/font-licenses");
      mkdirSync(licenses, { recursive: true });
      cpSync(
        path.join(root, "brand-system/assets/fonts", family, "OFL.txt"),
        path.join(licenses, `${family}.txt`),
      );
    }
  }
} finally {
  if (isolated) rmSync(buildRoot, { recursive: true, force: true });
}
