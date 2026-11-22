import test from "node:test";
import assert from "node:assert/strict";
import { metadataFor, priceSnippet } from "../src/lib/metadata";
import { business } from "../src/lib/business";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";

const origin = "https://mahfouz-coaching.pages.dev";
const paths = [
  "",
  "/about",
  "/online-coaching-prices",
  "/terms",
  "/privacy",
  "/disclaimer",
];

function withOrigin(value: string | undefined, check: () => void) {
  const previous = process.env.SITE_URL;
  if (value === undefined) delete process.env.SITE_URL;
  else process.env.SITE_URL = value;
  try {
    check();
  } finally {
    if (previous === undefined) delete process.env.SITE_URL;
    else process.env.SITE_URL = previous;
  }
}

test("all public locale routes keep their own canonical and reciprocal language links", () => {
  withOrigin(origin, () => {
    for (const locale of ["ar", "en"] as const) {
      for (const path of paths) {
        const metadata = metadataFor(locale, path);
        assert.equal(
          metadata.alternates?.canonical,
          `${origin}/${locale}${path}`,
        );
        assert.equal(metadata.alternates?.languages?.ar, `${origin}/ar${path}`);
        assert.equal(metadata.alternates?.languages?.en, `${origin}/en${path}`);
        assert.equal(metadata.openGraph?.url, `${origin}/${locale}${path}`);
        assert.equal(typeof metadata.robots, "object");
        assert.equal((metadata.robots as { index: boolean }).index, true);
        assert.equal((metadata.robots as { follow: boolean }).follow, true);
      }
    }
  });
});

test("sitemap covers every public route exactly once using the production origin", () => {
  withOrigin(origin, () => {
    const entries = sitemap();
    const expected = ["ar", "en"].flatMap((locale) =>
      paths.map((path) => `${origin}/${locale}${path}`),
    );
    assert.deepEqual(entries.map((entry) => entry.url).sort(), expected.sort());
    assert.equal(
      new Set(entries.map((entry) => entry.url)).size,
      entries.length,
    );
    for (const entry of entries) {
      const path = new URL(entry.url).pathname.slice(3);
      assert.deepEqual(entry.alternates?.languages, {
        en: `${origin}/en${path}`,
        ar: `${origin}/ar${path}`,
      });
      for (const image of entry.images ?? []) {
        assert.equal(new URL(image).origin, origin);
        assert.ok(new URL(image).pathname.startsWith("/assets/"));
      }
    }
  });
});

test("robots advertises the production sitemap and permits search crawlers", () => {
  withOrigin(origin, () => {
    const config = robots();
    assert.equal(config.sitemap, `${origin}/sitemap.xml`);
    const rules = Array.isArray(config.rules) ? config.rules : [config.rules];
    const publicRule = rules.find((rule) => rule.userAgent === "*");
    assert.ok(publicRule, "a default rule must permit search crawlers");
    assert.equal(publicRule.allow, "/");
    const blocked = [publicRule.disallow ?? []].flat();
    for (const locale of ["ar", "en"]) {
      for (const path of paths) {
        assert.ok(
          !blocked.some((prefix) => `/${locale}${path}`.startsWith(prefix)),
          "a public locale route must not match a robots exclusion",
        );
      }
    }
  });
});

test("missing SITE_URL cannot publish a fabricated canonical or sitemap origin", () => {
  withOrigin(undefined, () => {
    assert.deepEqual(sitemap(), []);
    assert.equal(robots().sitemap, undefined);
    for (const locale of ["ar", "en"] as const) {
      const metadata = metadataFor(locale);
      assert.equal(metadata.alternates, undefined);
      assert.equal(metadata.openGraph?.url, undefined);
      assert.equal(metadata.metadataBase, undefined);
    }
  });
});

test("about route is in the sitemap with hreflang and both coach images", () => {
  withOrigin(origin, () => {
    const about = sitemap().filter((entry) => entry.url.endsWith("/about"));
    assert.equal(about.length, 2);
    for (const entry of about) {
      assert.deepEqual(entry.alternates?.languages, {
        en: `${origin}/en/about`,
        ar: `${origin}/ar/about`,
      });
      assert.ok(entry.lastModified);
      assert.equal(entry.images?.length, 2);
    }
  });
});

test("home and about metadata share the square coach image after the share image", () => {
  withOrigin(origin, () => {
    for (const path of ["", "/about"]) {
      const images = metadataFor("ar", path).openGraph?.images as {
        url: string;
        width: number;
        height: number;
      }[];
      assert.equal(images.length, 2);
      assert.ok(images[0].url.endsWith("/og-share.jpg"));
      assert.equal(
        images[1].url,
        `${origin}/assets/coach/abdalrahman-mahfouz-online-coach-egypt.jpg`,
      );
      assert.equal(images[1].width, 1200);
      assert.equal(images[1].height, 1200);
    }
  });
});

test("square coach image is 1200 by 1200", async () => {
  const { default: sharp } = await import("sharp");
  const meta = await sharp(
    "public/assets/coach/abdalrahman-mahfouz-online-coach-egypt.jpg",
  ).metadata();
  assert.equal(meta.width, 1200);
  assert.equal(meta.height, 1200);
});

test("search snippet lists every no-follow-up price before daily follow-up prices", () => {
  for (const locale of ["ar", "en"] as const) {
    const text = priceSnippet(locale);
    const positions = [...business.selfPrices, ...business.prices.egypt].map(
      (price) => text.indexOf(String(price)),
    );
    for (const pos of positions) assert.ok(pos >= 0, text);
    assert.deepEqual([...positions].sort((a, b) => a - b), positions);
    assert.equal(metadataFor(locale).description, text);
    assert.ok(text.length <= 200, `${locale} snippet is ${text.length} chars`);
  }
});
