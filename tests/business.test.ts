import { assets } from "../src/config/assets";
import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import {
  business,
  paymentConfirmationLink,
  whatsappLink,
} from "../src/lib/business";
import { content } from "../src/lib/content";
test("all twelve locale/region/duration WhatsApp messages preserve the chosen package", () => {
  for (const locale of ["en", "ar"] as const)
    for (const region of ["egypt", "international"] as const)
      for (const months of business.durations) {
        const url = new URL(
          whatsappLink(locale, { plan: "daily", region, months }),
        );
        const text = url.searchParams.get("text")!;
        assert.equal(url.origin, "https://wa.me");
        assert.equal(url.pathname, `/${business.whatsapp}`);
        assert.ok(text.includes(String(months)));
        assert.ok(
          text
            .replaceAll(",", "")
            .includes(
              String(
                business.prices[region][business.durations.indexOf(months)],
              ),
            ),
        );
        assert.ok(
          text.includes(
            locale === "ar"
              ? "متابعة يومية على واتساب"
              : "Daily WhatsApp Coaching",
          ),
        );
        assert.ok(
          text.includes(
            region === "egypt"
              ? locale === "en"
                ? "Inside Egypt"
                : "داخل مصر"
              : locale === "en"
                ? "Outside Egypt"
                : "خارج مصر",
          ),
        );
      }
});
test("package payment uses the official InstaPay link and confirmation WhatsApp", () => {
  assert.equal(business.instapay, "https://ipn.eg/S/foza./instapay/9crWHF");
  assert.equal(business.instapayId, "foza.@instapay");
  const url = new URL(paymentConfirmationLink("en"));
  assert.equal(url.pathname, `/${business.whatsapp}`);
  assert.match(url.searchParams.get("text")!, /InstaPay/);
  assert.match(
    decodeURIComponent(paymentConfirmationLink("ar")),
    /تأكيد الدفع/,
  );
});
test("business pricing matches the supplied figures", () => {
  assert.deepEqual(business.prices, {
    egypt: [1100, 3000, 5500],
    international: [1500, 4000, 7500],
  });
});
test("only the expected privacy-safe proof assets are public", () => {
  assert.equal(assets.transformations.length, 3);
  assert.equal(assets.feedback.length, 7);
  assert.equal(assets.certificates.length, 2);
  for (const asset of [
    ...assets.transformations,
    ...assets.feedback,
    ...assets.certificates,
  ])
    assert.ok(fs.existsSync(`public${asset.src}`));
  assert.ok(
    fs
      .readdirSync("public/assets/testimonials")
      .every((name) => /^feedback-\d{2}-full-redacted\.(webp|png)$/.test(name)),
  );
  assert.ok(!fs.existsSync("public/private"));
});
test("all FAQ, navigation, prices and legal copy exist in both locales", () => {
  for (const locale of ["en", "ar"] as const) {
    const copy = content[locale];
    assert.equal(copy.faq.items.length, 10);
    assert.equal(copy.nav.length, 5);
    assert.equal(copy.pricing.duration.length, 3);
    assert.equal(Object.keys(copy.legal).length, 3);
  }
});
