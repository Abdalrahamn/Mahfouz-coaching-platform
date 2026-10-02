import { legalSlugs } from "@/config/navigation";
import Link from "next/link";
import { Camera, MessageCircle } from "lucide-react";
import { business, whatsappLink, type Locale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { BrandMark } from "@/components/ui/BrandMark";
import { LanguageLink } from "@/components/layout/LanguageLink";
import { CoachingLink } from "@/components/layout/CoachingLink";
export function Footer({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <>
      <footer className="site-footer">
        <div className="container footer-main">
          <div>
            <Link href={`/${locale}`} className="wordmark" dir="ltr">
              <BrandMark />
              MAHFOUZ<span>.</span>
            </Link>
            <p>{t.footer.tag}</p>
          </div>
          <div className="footer-social">
            <p className="utility">{t.footer.contact}</p>
            <a
              href={whatsappLink(locale)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle size={18} />
              WhatsApp <bdi>+20 114 639 9576</bdi>
            </a>
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Camera size={18} />
              <bdi>{business.instagramHandle}</bdi>
            </a>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>
            © {new Date().getFullYear()} MAHFOUZ. {t.footer.copyright}
          </p>
          <div>
            {legalSlugs.map((slug, i) => (
              <Link key={slug} href={`/${locale}/${slug}`}>
                {t.footer.links[i]}
              </Link>
            ))}
            <LanguageLink locale={locale} />
          </div>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsappLink(locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
      >
        <MessageCircle size={26} />
      </a>
      <div className="mobile-sticky">
        <CoachingLink locale={locale}>{t.hero.results}</CoachingLink>
      </div>
    </>
  );
}
