import test from "node:test";
import assert from "node:assert/strict";
import { metadataFor } from "../src/lib/metadata";
import sitemap from "../src/app/sitemap";
import robots from "../src/app/robots";

const origin = "https://mahfouz-coaching.pages.dev";
const paths = [
  "",
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
