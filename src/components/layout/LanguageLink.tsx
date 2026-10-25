"use client";
import { getContent } from "@/lib/content";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/business";

/** Restore the visible section across locale layouts with different heights. */
export function LanguageLink({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem("mahfouz-locale-position");
      if (!saved) return;
      const position = JSON.parse(saved);
      if (position.pathname !== pathname) return;
      sessionStorage.removeItem("mahfouz-locale-position");
      const frame = requestAnimationFrame(() => {
        const section = document.getElementById(position.id);
        if (section)
          window.scrollTo({
            top:
              window.scrollY +
              section.getBoundingClientRect().top -
              position.top,
            behavior: "instant",
          });
      });
      return () => cancelAnimationFrame(frame);
    } catch {}
  }, [pathname]);
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

            const destination = pathname.replace(
              /^\/(en|ar)(?=\/|$)/,
              `/${next}`,
            );
            const visibleSection = Array.from(
              document.querySelectorAll<HTMLElement>("main section[id]"),
            )
              .map((node) => {
                const rect = node.getBoundingClientRect();
                return {
                  node,
                  visible: Math.max(
                    0,
                    Math.min(rect.bottom, innerHeight) -
                      Math.max(rect.top, 100),
                  ),
                };
              })
              .sort((a, b) => b.visible - a.visible)
              .find((entry) => entry.visible > 0)?.node;
            const hashTarget = document.getElementById(
              window.location.hash.slice(1),
            );
            const targetRect = hashTarget?.getBoundingClientRect();
            const section =
              hashTarget &&
              targetRect &&
              targetRect.top < innerHeight &&
              targetRect.bottom > 100
                ? hashTarget
                : visibleSection;
            if (section) {
              try {
                sessionStorage.setItem(
                  "mahfouz-locale-position",
                  JSON.stringify({
                    pathname: destination,
                    id: section.id,
                    top: section.getBoundingClientRect().top,
                  }),
                );
              } catch {}
            }

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

            // Preserve scroll until the destination restores the visible section.
            router.push(pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${next}`), {
              scroll: false,
            });
          }}
        >
          {next === "en" ? "EN" : "ع"}
        </Link>
      ))}
    </div>
  );
}
