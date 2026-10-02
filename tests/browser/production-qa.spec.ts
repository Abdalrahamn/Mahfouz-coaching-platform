import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("English is the default; valid saved languages are respected", async ({
  page,
  context,
}) => {
  for (const preference of [undefined, "invalid", "en", "ar"]) {
    await context.clearCookies();
    if (preference)
      await context.addCookies([
        {
          name: "mahfouz-language",
          value: preference,
          url: new URL(test.info().project.use.baseURL as string).origin,
        },
      ]);
    await page.goto("/");
    await expect(page).toHaveURL(
      new RegExp(`/${preference === "ar" ? "ar" : "en"}$`),
    );
  }
});

for (const locale of ["en", "ar"] as const) {
  for (const theme of ["dark", "light"] as const) {
    for (const width of [375, 430, 768, 1024, 1280, 1440, 1920]) {
      test(`${locale} ${theme}: every section and asset at ${width}px`, async ({
        page,
      }) => {
        test.setTimeout(90000);
        const problems: string[] = [];
        page.on("pageerror", (error) => problems.push(error.message));
        page.on("console", (message) => {
          if (["warning", "error"].includes(message.type()))
            problems.push(message.text());
        });
        page.on("response", (response) => {
          if (response.status() >= 400)
            problems.push(`${response.status()} ${response.url()}`);
        });
        page.on("requestfailed", (request) => {
          if (request.failure()?.errorText !== "net::ERR_ABORTED")
            problems.push(`${request.url()}: ${request.failure()?.errorText}`);
        });
        await page.setViewportSize({ width, height: 900 });
        await page.goto(`/${locale}`);
        if (theme === "light") await page.locator(".theme-toggle").click();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await page.reload();
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        await page.evaluate(() => document.fonts.ready);
        const sections = page.locator("main > section");
        await expect(sections).toHaveCount(12);
        for (const section of await sections.all()) {
          await section.scrollIntoViewIfNeeded();
          for (const image of await section.locator("img:visible").all()) {
            if (
              !(await image.evaluate(
                (img) =>
                  (img as HTMLImageElement).complete &&
                  (img as HTMLImageElement).naturalWidth > 0,
              ))
            )
              await image.scrollIntoViewIfNeeded();
            await expect
              .poll(() =>
                image.evaluate(
                  (img) =>
                    (img as HTMLImageElement).complete &&
                    (img as HTMLImageElement).naturalWidth > 0,
                ),
              )
              .toBeTruthy();
          }
          expect(
            await page.evaluate(
              () => document.documentElement.scrollWidth <= innerWidth,
            ),
          ).toBeTruthy();
        }
        await page.locator("footer").scrollIntoViewIfNeeded();
        expect(
          await page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth,
          ),
        ).toBeTruthy();
        if ([375, 1440].includes(width)) {
          const results = await new AxeBuilder({ page })
            .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
            .analyze();
          expect(
            results.violations.map((v) => ({
              id: v.id,
              nodes: v.nodes.map((n) => ({
                target: n.target,
                summary: n.failureSummary,
              })),
            })),
          ).toEqual([]);
        }
        await page.screenshot({
          path: `verification/cleanup/${locale}-${theme}-${width}.png`,
          fullPage: true,
        });
        expect(problems).toEqual([]);
      });
    }
  }
}

test("theme switches both ways and persists without navigation", async ({
  page,
}) => {
  await page.goto("/en");
  for (const theme of ["light", "dark"]) {
    await page.locator(".theme-toggle").click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
    await expect(page.locator(".theme-toggle")).toHaveAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark theme" : "Switch to light theme",
    );
    await page.reload();
    await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
  }
});

for (const locale of ["en", "ar"] as const) {
  for (const theme of ["dark", "light"] as const) {
    test(`${locale} ${theme}: section contrast and legal page themes`, async ({
      page,
    }) => {
      test.setTimeout(120000);
      await page.setViewportSize({ width: 1440, height: 1000 });
      await page.goto(`/${locale}`);
      if (theme === "light") await page.locator(".theme-toggle").click();
      for (const section of await page.locator("main > section").all()) {
        await section.scrollIntoViewIfNeeded();
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(
          results.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        ).toEqual([]);
      }
      for (const slug of ["terms", "privacy", "disclaimer"]) {
        await page.goto(`/${locale}/${slug}`);
        await expect(page.locator("html")).toHaveAttribute("data-theme", theme);
        const results = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        expect(
          results.violations.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              summary: n.failureSummary,
            })),
          })),
        ).toEqual([]);
        await page.screenshot({
          path: `verification/cleanup/${locale}-${theme}-${slug}.png`,
          fullPage: true,
        });
      }
    });
  }
}
