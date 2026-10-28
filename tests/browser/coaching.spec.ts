import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const locale of ["en", "ar"] as const) {
  for (const width of [375, 768, 1280]) {
    test(`${locale}: page reflows at ${width}px with real media and no accessibility violations`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 900 });
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.goto(`/${locale}`);
      await page.evaluate(() => document.fonts.ready);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("html")).toHaveAttribute(
        "dir",
        locale === "ar" ? "rtl" : "ltr",
      );
      await expect(page.locator("h1")).toHaveCount(1);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBeTruthy();
      await expect(page.locator(".hero-photo img")).toBeVisible();
      await expect(
        page.locator(".gallery-transformations .media-card:not([aria-hidden])"),
      ).toHaveCount(6);
      await expect(
        page.locator(".testimonial-card:not([aria-hidden])"),
      ).toHaveCount(7);
      await expect(
        page.locator(".gallery-certificates .media-card"),
      ).toHaveCount(2);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .exclude("nextjs-portal")
        .analyze();
      expect(results.violations).toEqual([]);
      expect(errors).toEqual([]);
    });
  }
  test(`${locale}: region prices, contextual messages, FAQ and dialog keyboard behavior`, async ({
    page,
  }) => {
    await page.goto(`/${locale}`);
    await expect(
      page.locator(".offer-selector, .region-selector, [role='tab']"),
    ).toHaveCount(0);
    await expect(page.locator("#daily-coaching")).toBeVisible();
    await expect(page.locator("#no-follow-up")).toBeVisible();
    const cards = page.locator(".price-card");
    await expect(cards).toHaveCount(9);
    for (let i = 0; i < 9; i += 1) {
      const links = cards.nth(i).locator("a");
      await expect(links).toHaveCount(2);
      await expect(links.nth(0)).toHaveAttribute(
        "href",
        "https://ipn.eg/S/foza./instapay/9crWHF",
      );
      await expect(links.nth(1)).toHaveAttribute(
        "href",
        /wa\.me\/201146399576/,
      );
    }
    await expect(
      page.getByRole("link", {
        name: locale === "ar" ? "ادفع بإنستا باي" : "Pay with InstaPay",
      }),
    ).toHaveCount(9);
    await expect(
      page.getByRole("link", {
        name:
          locale === "ar"
            ? "ابعت السكرين شوت على واتساب"
            : "Send the screenshot on WhatsApp",
      }),
    ).toHaveCount(9);
    await expect(page.locator(".pay-id")).toHaveText("foza.@instapay");
    await expect(page.locator(".payment-followup")).toHaveCount(0);
    await expect(page.locator(".payment-section")).toContainText("72");
    expect(await page.locator(".price bdi").allTextContents()).toEqual(
      locale === "ar"
        ? [
            "١٬١٠٠",
            "٣٬٠٠٠",
            "٥٬٥٠٠",
            "١٬٥٠٠",
            "٤٬٠٠٠",
            "٧٬٥٠٠",
            "٥٠٠",
            "١٬٠٠٠",
            "٢٬٠٠٠",
          ]
        : [
            "1,100",
            "3,000",
            "5,500",
            "1,500",
            "4,000",
            "7,500",
            "500",
            "1,000",
            "2,000",
          ],
    );
    await expect(page.locator(".faq-list details")).toHaveCount(10);
    await page.locator(".faq-list summary").first().click();
    await expect(page.locator(".faq-list details p").first()).toBeVisible();
    await expect(
      page.locator(".gallery-transformations .expand-badge"),
    ).toHaveCount(0);
    await expect(
      page.locator(".gallery-transformations figcaption"),
    ).toHaveCount(0);
    const trigger = page
      .locator(".gallery-transformations .text-button")
      .first();
    await trigger.click();
    const dialog = page.locator(".gallery-transformations dialog");
    await expect(dialog).toBeVisible();
    await expect(dialog.locator("button").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(dialog).not.toBeVisible();
    await expect(trigger).toBeFocused();
    await page
      .locator(".gallery-feedback .carousel-footer .text-button")
      .click();
    await expect(page.locator(".feedback-lightbox")).toBeVisible();
    await page.keyboard.press("Escape");
  });
  test(`${locale}: payment copying has success and failure recovery`, async ({
    page,
    context,
  }) => {
    await context.grantPermissions(["clipboard-read", "clipboard-write"]);
    await page.goto(`/${locale}`);
    const button = page.getByRole("button", {
      name: locale === "ar" ? "انسخ الرقم" : "Copy number",
      exact: true,
    });
    await button.click();
    await expect(page.getByRole("status")).toHaveText(
      locale === "ar" ? "تم نسخ الرقم" : "Number copied",
    );
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
      "01146399576",
    );
    await page.reload();
    await page.evaluate(() =>
      Object.defineProperty(navigator, "clipboard", {
        value: { writeText: () => Promise.reject(new Error("Denied")) },
        configurable: true,
      }),
    );
    await button.click();
    await expect(page.getByRole("status")).toContainText(
      locale === "ar" ? "النسخ مش متاح" : "Copy unavailable",
    );
  });
  test(`${locale}: all legal pages use localized copy and safe navigation`, async ({
    page,
  }) => {
    for (const slug of ["terms", "privacy", "disclaimer"]) {
      const response = await page.goto(`/${locale}/${slug}`);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      expect(await page.title()).toContain("MAHFOUZ");
    }
  });
}
test("language switch and root redirect preserve Arabic preference", async ({
  page,
}) => {
  await page.goto("/en");
  await page.locator('header .language-switch a[lang="ar"]').click();
  await expect(page).toHaveURL(/\/ar$/);
  await page.goto("/");
  await expect(page).toHaveURL(/\/ar$/);
  await page.locator('header .language-switch a[lang="en"]').click();
  await expect(page).toHaveURL(/\/en$/);
  await page.goto("/");
  await expect(page).toHaveURL(/\/en$/);
});
test("public server never serves private originals or references", async ({
  request,
}) => {
  for (const path of [
    "/private/originals/source-14-testimonial.png",
    "/private/references/hero-direction.png",
    "/verification/source-contact-sheet.jpg",
  ])
    expect((await request.get(path)).status()).toBe(404);
});
for (const locale of ["en", "ar"] as const)
  test(`${locale}: mobile menu, reduced motion and enlarged text remain operable`, async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`/${locale}`);
    const menu = page.locator("#menu-toggle");
    await menu.click();
    await expect(menu).toHaveAttribute("aria-expanded", "true");
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("aria-expanded", "false");
    await expect(menu).toBeFocused();
    expect(
      await page.evaluate(
        () => getComputedStyle(document.documentElement).scrollBehavior,
      ),
    ).toBe("auto");
    await page.addStyleTag({ content: "html { font-size: 200%; }" });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBeTruthy();
  });

test("hero and navigation lead to packages before contextual WhatsApp", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator(".price-card")).toHaveCount(9);
  for (const anchor of await page.locator(".hero-actions a").all())
    expect(await anchor.getAttribute("href")).toMatch(/#pricing$/);
  await page.locator(".hero-actions a").first().click();
  await expect(page).toHaveURL(/#pricing$/);
  await expect(page.locator("#pricing #daily-coaching")).toBeInViewport();
  await page.locator('header .language-switch a[lang="ar"]').click();
  await expect(page).toHaveURL(/\/ar\/?$/);
  // Locale typography changes the heading offset; preserve the visible section.
  await expect(page.locator("#pricing")).toBeInViewport();
  await expect(page.locator(".price-card")).toHaveCount(9);
  expect(await page.locator(".hero-photo img").getAttribute("src")).toContain(
    "coach-new-transparent",
  );
});
test("carousel autoplay, pause, arrows, infinite wrap and reduced motion", async ({
  page,
}) => {
  await page.goto("/en");
  await page
    .locator(".gallery-feedback .testimonial-track")
    .scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const indicator = page.locator(".gallery-feedback .carousel-pagination");
  await expect(indicator).toHaveAttribute("aria-label", "1 / 7");
  await expect(indicator).toHaveAttribute("aria-label", "2 / 7", {
    timeout: 6000,
  });
  await page
    .locator(".gallery-feedback")
    .getByRole("button", { name: "Pause carousel", exact: true })
    .click();
  const frozen = await indicator.getAttribute("aria-label");
  await page.waitForTimeout(4200);
  await expect(indicator).toHaveAttribute("aria-label", frozen!);
  await page
    .getByRole("button", { name: "Next feedback", exact: true })
    .click();
  await expect(indicator).toHaveAttribute("aria-label", "3 / 7");
  for (let i = 0; i < 6; i++) {
    await page
      .getByRole("button", { name: "Next feedback", exact: true })
      .click();
    await page.waitForTimeout(600);
  }
  await expect(indicator).toHaveAttribute("aria-label", "2 / 7");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.reload();
  await page
    .locator(".gallery-feedback .testimonial-track")
    .scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await page.waitForTimeout(4200);
  await expect(indicator).toHaveAttribute("aria-label", "1 / 7");
});
test("mobile native touch swipe preserves mixed feedback proportions", async ({
  browser,
}) => {
  const context = await browser.newContext({
    hasTouch: true,
    isMobile: true,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/ar");
  await page
    .locator(".gallery-feedback .testimonial-track")
    .scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      page
        .locator(".gallery-feedback .testimonial-track")
        .evaluate((track) => track.scrollLeft),
    )
    .toBeGreaterThan(0);
  const box = await page
    .locator(".gallery-feedback .testimonial-track")
    .boundingBox();
  const client = await context.newCDPSession(page);
  const y = box!.y + 150;
  await client.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: 330, y }],
  });
  for (let x = 310; x >= 60; x -= 25) {
    await client.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [{ x, y }],
    });
    await page.waitForTimeout(16);
  }
  await client.send("Input.dispatchTouchEvent", {
    type: "touchEnd",
    touchPoints: [],
  });
  await expect(
    page.locator(".gallery-feedback .carousel-pagination"),
  ).not.toHaveAttribute("aria-label", "1 / 7");
  expect(
    await page
      .locator(".testimonial-card:not([aria-hidden]) img")
      .evaluateAll((images) =>
        images.every(
          (img) =>
            Math.abs(
              (img as HTMLImageElement).getBoundingClientRect().width /
                (img as HTMLImageElement).getBoundingClientRect().height -
                Number(img.getAttribute("width")) /
                  Number(img.getAttribute("height")),
            ) < 0.01,
        ),
      ),
  ).toBeTruthy();
  await context.close();
});

test("Arabic and dark defaults; language switches preserve theme without React issues", async ({
  page,
}) => {
  const issues: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") issues.push(message.text());
  });
  page.on("pageerror", (error) => issues.push(error.message));
  await page.goto("/");
  await expect(page).toHaveURL(/\/ar$/);
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await expect(page.locator("h1")).toHaveText("ابني جسميسهلحياتك.");
  await page.locator(".theme-toggle").click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  for (const locale of ["en", "ar", "en", "ar"]) {
    await page.locator(`header .language-switch a[lang="${locale}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/${locale}$`));
    await expect(page.locator("html")).toHaveAttribute(
      "dir",
      locale === "ar" ? "rtl" : "ltr",
    );
    await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  }
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  expect(issues).toEqual([]);
});
