"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { Locale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { BrandMark } from "@/components/ui/BrandMark";
import { LanguageLink } from "@/components/layout/LanguageLink";
import { sectionIds } from "@/config/navigation";

export function Header({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 32);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  useEffect(() => {
    try {
      localStorage.setItem("mahfouz-language", locale);
    } catch {}
    document.cookie = `mahfouz-language=${locale};path=/;max-age=31536000;SameSite=Lax`;
  }, [locale]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        document.getElementById("menu-toggle")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="header-inner container">
        <Link
          href={`/${locale}`}
          className="wordmark"
          aria-label={t.chrome.home}
          dir="ltr"
        >
          <BrandMark />
          MAHFOUZ<span>.</span>
        </Link>
        <nav className="desktop-nav" aria-label={t.chrome.navigation}>
          {t.nav.map((label, i) => (
            <Link key={label} href={`/${locale}#${sectionIds[i]}`}>
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <LanguageLink locale={locale} />
          <ThemeToggle locale={locale} />
          <CoachingLink locale={locale} className="header-cta" />
          <button
            id="menu-toggle"
            className="icon-button menu-toggle"
            aria-label={open ? t.close : t.menu}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-nav"
        className="mobile-nav"
        aria-label={t.chrome.mobileNavigation}
        hidden={!open}
      >
        {t.nav.map((label, i) => (
          <Link
            key={label}
            href={`/${locale}#${sectionIds[i]}`}
            onClick={() => setOpen(false)}
          >
            {label}
          </Link>
        ))}
        <CoachingLink locale={locale} />
      </nav>
    </header>
  );
}
