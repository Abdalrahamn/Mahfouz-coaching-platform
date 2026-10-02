"use client";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/business";
function subscribe(onStoreChange: () => void) {
  const observer = new MutationObserver(onStoreChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}
function currentTheme() {
  return document.documentElement.dataset.theme === "light" ? "light" : "dark";
}
export function ThemeToggle({ locale }: { locale: Locale }) {
  const theme = useSyncExternalStore(subscribe, currentTheme, () => "dark");
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-label={
        dark
          ? getContent(locale).chrome.lightTheme
          : getContent(locale).chrome.darkTheme
      }
      onClick={() => {
        const next = dark ? "light" : "dark";
        document.documentElement.dataset.theme = next;
        try {
          localStorage.setItem("mahfouz-theme", next);
        } catch {}
      }}
    >
      {dark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
