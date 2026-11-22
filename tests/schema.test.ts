import test from "node:test";
import assert from "node:assert/strict";
import { business } from "../src/lib/business";
import { getContent } from "../src/lib/content";
import { faqNode, personNode, serviceNode } from "../src/lib/schema";

const origin = "https://mahfouz-coaching.pages.dev";

test("JSON-LD offers use the exact prices from business.ts", () => {
  for (const locale of ["ar", "en"] as const) {
    const service = serviceNode(origin, locale);
    const prices = service.hasOfferCatalog.itemListElement.map(
      (offer) => offer.price,
    );
    assert.deepEqual(prices, [
      ...business.selfPrices,
      ...business.prices.egypt,
      ...business.prices.international,
    ]);
    for (const offer of service.hasOfferCatalog.itemListElement) {
      assert.equal(offer.priceCurrency, "EGP");
    }
  }
});

test("FAQPage mirrors every visible FAQ item", () => {
  for (const locale of ["ar", "en"] as const) {
    const items = getContent(locale).faq.items;
    const node = faqNode(origin, locale, "", items);
    assert.equal(node.mainEntity.length, items.length);
    assert.equal(node.mainEntity[0].name, items[0][0]);
  }
});

test("Person lists Arabic and Latin name spellings and the coach image", () => {
  const person = personNode(origin, "ar");
  assert.equal(person["@id"], `${origin}/#coach`);
  for (const name of [
    "عبدالرحمن محفوظ",
    "عبد الرحمن محفوظ",
    "كابتن عبدالرحمن محفوظ",
    "Abdalrahman Mahfouz",
    "Abdelrahman Mahfouz",
    "Abdulrahman Mahfouz",
  ]) {
    assert.ok(person.alternateName.includes(name), name);
  }
  assert.equal(person.image["@type"], "ImageObject");
  assert.equal(person.hasCredential.length, 2);
});

test("entity paragraph is 80-120 words in each locale", () => {
  for (const locale of ["ar", "en"] as const) {
    const about = getContent(locale).about;
    const words = `${about.entityLead} ${about.entityRest}`
      .split(/\s+/)
      .filter(Boolean).length;
    assert.ok(words >= 80 && words <= 120, `${locale}: ${words}`);
  }
});
