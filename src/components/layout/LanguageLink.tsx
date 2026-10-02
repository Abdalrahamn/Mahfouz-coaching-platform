"use client";
import { getContent } from "@/lib/content";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { Locale } from "@/lib/business";

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
            event.preventDefault();
            if (next === locale) return;
            try {
              localStorage.setItem("mahfouz-language", next);
            } catch {}
            document.cookie = `mahfouz-language=${next};path=/;max-age=31536000;SameSite=Lax`;
            const sections = Array.from(
              document.querySelectorAll<HTMLElement>("main section[id]"),
            );
            const current = sections
              .filter(
                (section) =>
                  section.getBoundingClientRect().top < innerHeight / 2,
              )
              .at(-1);
            const hash =
              window.location.hash || (current ? `#${current.id}` : "");
            router.push(
              pathname.replace(/^\/(en|ar)(?=\/|$)/, `/${next}`) + hash,
            );
          }}
        >
          {next === "en" ? "EN" : "ع"}
        </Link>
      ))}
    </div>
  );
}
