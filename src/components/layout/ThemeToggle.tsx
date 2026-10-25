"use client";
import { Moon, Sun } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { getContent } from "@/lib/content";
import type { Locale } from "@/lib/business";

type Theme = "light" | "dark";

function storedTheme(): Theme {
  try {
    return localStorage.getItem("mahfouz-theme") === "light" ? "light" : "dark";
  } catch {
    return "dark";
  }
}

export function ThemeToggle({ locale }: { locale: Locale }) {
  const chosen = useRef<Theme | null>(null);
  const [theme, setTheme] = useState<Theme>("dark");
  const apply = (next: Theme) => {
    chosen.current = next;
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem("mahfouz-theme", next);
    } catch {}
    setTheme(next);
  };
  useLayoutEffect(() => {
    const next = chosen.current ?? storedTheme();
    document.documentElement.dataset.theme = next;
    setTheme(next);
    const node = document.documentElement;
    const observer = new MutationObserver(() => {
      const keep = chosen.current ?? storedTheme();
      if (node.dataset.theme !== keep) node.dataset.theme = keep;
    });
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, [locale]);
  const dark = theme === "dark";
  return (
    <button
      type="button"
      className="icon-button theme-toggle"
      aria-pressed={!dark}
      aria-label={
        dark
          ? getContent(locale).chrome.lightTheme
          : getContent(locale).chrome.darkTheme
      }
      onClick={() => apply(dark ? "light" : "dark")}
    >
      {dark ? <Moon size={18} /> : <Sun size={18} />}
    </button>
  );
}
