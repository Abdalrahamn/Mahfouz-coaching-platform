"use client";
import { getContent } from "@/lib/content";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/business";

/**
 * LanguageLink — the compact "EN / ع" control.
 *
 * Rendered twice (header + footer) on every page.
 *
 * What SHOULD happen when it is clicked:
 * 1. The visitor stays exactly where they are on the page (same section).
 * 2. Only the locale segment of the URL changes: /ar/... <-> /en/...
 * 3. The chosen locale is persisted (localStorage + cookie) so the
 *    entry route and the server can restore it on the next visit.
 *
 * WHY THIS HAD A BUG (and how it is fixed):
 * Nav links and CTAs leave hashes like `#pricing` in the URL, and such
 * a stale hash survives in the browser history. The App Router re-applies
 * a hash it finds in the current/history URL when the route changes, so
 * switching language teleported the visitor to that old hash — typically
 * the pricing section near the bottom of the page — regardless of where
 * they were actually reading.
 *
 * The fix, two parts:
 * 1. Strip the stale hash from the address bar (history.replaceState)
 *    BEFORE navigating, so the router has no old hash to re-apply.
 * 2. Navigate with `{ scroll: false }` so the router leaves the scroll
 *    position untouched. Both locales render the same section layout,
 *    so the visitor simply keeps reading the same section in the new
 *    language — no jump to the top, no jump to an old hash.
 */
export function LanguageLink({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <div
      className="language-switch"
      role="group"
      dir="ltr"
      aria-label={getContent(locale).chrome.language}
    >
      {(["en", "ar"] as const).map((next) => (
        <Link
          key={next}
          href={pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${next}`)}
          lang={next}
          hrefLang={next}
          aria-current={next === locale ? "page" : undefined}
          aria-label={next === "en" ? "English" : "العربية"}
          onClick={(event) => {
            // Native navigation would reset the scroll position,
            // so we take over and navigate manually below.
            event.preventDefault();
            if (next === locale) return;

            // 1. Persist the visitor's language choice.
            try {
              localStorage.setItem("mahfouz-language", next);
            } catch {}
            document.cookie = `mahfouz-language=${next};path=/;max-age=31536000;SameSite=Lax`;

            // 2. Remove any stale hash (e.g. #pricing left behind by a
            //    CTA click) from the address bar without adding a
            //    history entry. Otherwise the router re-applies it to
            //    the new locale and yanks the visitor down the page.
            if (window.location.hash) {
              history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
              );
            }

            // 3. Swap the locale in place. `scroll: false` keeps the
            //    exact scroll position; the identical section layout
            //    means the visitor is still in the same section.
            router.push(
              pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${next}`),
              { scroll: false },
            );
          }}
        >
          {next === "en" ? "EN" : "ع"}
        </Link>
      ))}
    </div>
  );
}
