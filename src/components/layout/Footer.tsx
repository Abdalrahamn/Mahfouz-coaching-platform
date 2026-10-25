import { legalSlugs } from "@/config/navigation";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
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
          <div className="footer-social-wrap">
            <p className="utility">
              {locale === "ar" ? "تواصل معنا" : "Contact us"}
            </p>
            <div className="footer-social" aria-label={t.footer.contact}>
              <a
                href={whatsappLink(locale)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.37A9.9 9.9 0 1 0 12.04 2Zm0 18.1a8.2 8.2 0 0 1-4.18-1.14l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 1 1 6.97 3.85Zm4.5-6.13c-.25-.12-1.46-.72-1.69-.8-.23-.09-.39-.12-.56.12-.16.25-.64.8-.78.97-.14.16-.29.18-.54.06a6.7 6.7 0 0 1-1.98-1.22 7.4 7.4 0 0 1-1.37-1.7c-.14-.25-.02-.38.1-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.41-.56-.42h-.47c-.16 0-.43.06-.65.31-.23.25-.86.84-.86 2.05s.88 2.38 1 2.55c.12.16 1.73 2.65 4.2 3.72.59.25 1.05.4 1.4.52.59.19 1.13.16 1.55.1.47-.07 1.46-.6 1.66-1.18.2-.58.2-1.08.14-1.18-.06-.1-.23-.16-.48-.29Z" />
                </svg>
              </a>
              <a
                href={business.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href={business.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <svg
                  viewBox="0 0 24 24"
                  width="22"
                  height="22"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 22v-8.2h2.8l.5-3.3h-3.3V8.4c0-.95.45-1.7 1.8-1.7h1.6V3.8S15.6 3.5 14.3 3.5c-2.6 0-4.3 1.6-4.3 4.4v2.6H7.2v3.3H10V22h3.5Z" />
                </svg>
              </a>
            </div>
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
        <div className="container footer-credit">
          <span>
            {locale === "ar" ? "بواسطة محفوظ تك" : "Built by Mahfouz Tech"}
          </span>
          <a
            href={`https://wa.me/${business.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle size={16} />
            {locale === "ar"
              ? "تواصل معنا لتصميم موقعك"
              : "Contact us for your own website"}{" "}
            <bdi dir="ltr">+20 114 639 9576</bdi>
          </a>
        </div>
      </footer>
      <a
        className="floating-whatsapp"
        href={whatsappLink(locale)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsapp}
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            fill="#fff"
            d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"
          />
        </svg>
      </a>
      <div className="mobile-sticky">
        <CoachingLink locale={locale}>{t.hero.results}</CoachingLink>
      </div>
    </>
  );
}
