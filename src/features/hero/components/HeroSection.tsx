import { getContent } from "@/lib/content";
import Image from "next/image";
import { ShieldCheck } from "lucide-react";
import { assets } from "@/config/assets";
import { type Locale } from "@/lib/business";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { HeroReveal } from "@/features/hero/components/HeroReveal";

export function HeroSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-atmosphere" aria-hidden="true">
        <span className="glow-blue" />
        <span className="glow-orange" />
        <span className="hero-grid" />
        <span className="energy-line" />
      </div>
      <div className="hero-photo">
        <Image
          {...assets.hero}
          alt={t.hero.photo}
          preload
          quality={90}
          sizes="(max-width: 700px) 100vw, 60vw"
        />
        <div className="hero-floor" aria-hidden="true" />
      </div>
      <div className="container hero-content">
        <HeroReveal>
          <Eyebrow>{t.hero.eyebrow}</Eyebrow>
          <p className="coach-name">{t.hero.name}</p>
          <p className="coach-role">{t.hero.role}</p>
          <h1 id="hero-title">
            {t.hero.headline.map((line, i) => (
              <span key={line} className={i === 2 ? "text-orange" : ""}>
                {line}
              </span>
            ))}
          </h1>
          <p className="hero-description">{t.hero.description}</p>
          <div className="hero-actions">
            <CoachingLink locale={locale} />
            <a className="button button-quiet" href="#pricing">
              {t.hero.results}
            </a>
          </div>
          <div className="hero-cert">
            <ShieldCheck size={17} />
            <span>IASST {t.chrome.certifiedTrainer}</span>
          </div>
        </HeroReveal>
      </div>
      <div className="hero-photo-caption utility">{t.hero.note}</div>
      <span className="hero-side-label" aria-hidden="true">
        MAHFOUZ / ONLINE COACHING
      </span>
    </section>
  );
}
