import Link from "next/link";
import { notFound } from "next/navigation";
import { isLocale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { metadataFor } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { legalSlugs, isLegalSlug } from "@/config/navigation";
export function generateStaticParams() {
  return legalSlugs.map((legal) => ({ legal }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; legal: string }>;
}) {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !isLegalSlug(legal)) notFound();
  const doc = getContent(locale).legal[legal];
  return metadataFor(locale, `/${legal}`, doc.title, doc.intro);
}
export default async function LegalPage({
  params,
}: {
  params: Promise<{ locale: string; legal: string }>;
}) {
  const { locale, legal } = await params;
  if (!isLocale(locale) || !isLegalSlug(legal)) notFound();
  const t = getContent(locale);
  const doc = t.legal[legal];
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Header locale={locale} />
      <main id="main" className="legal-page container">
        <Link href={`/${locale}`} className="back-link">
          {t.footer.back}
        </Link>
        <Eyebrow>MAHFOUZ / {t.chrome.onlineCoaching}</Eyebrow>
        <h1>{doc.title}</h1>
        <p className="legal-intro">{doc.intro}</p>
        {doc.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <CoachingLink locale={locale}>{t.whatsapp}</CoachingLink>
      </main>
      <Footer locale={locale} />
    </>
  );
}
