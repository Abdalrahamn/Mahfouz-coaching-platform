import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { assets } from "@/config/assets";
import { coachingGuidePath } from "@/config/navigation";
import { business, isLocale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { siteOrigin } from "@/lib/env";
import { metadataFor } from "@/lib/metadata";

type GuideProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: GuideProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getContent(locale).coachingGuide;
  return metadataFor(locale, coachingGuidePath, guide.title, guide.intro);
}

export default async function CoachingGuide({ params }: GuideProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const guide = t.coachingGuide;
  const home = `/${locale}`;
  const origin = siteOrigin();
  const prices = [
    business.prices.egypt,
    business.prices.international,
    business.selfPrices,
  ];
  const number = new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en");
  const schema = origin && {
    "@context": "https://schema.org",
    "@type": "Article",
    mainEntityOfPage: `${origin}${home}${coachingGuidePath}`,
    headline: guide.title,
    description: guide.intro,
    inLanguage: locale,
    image: `${origin}${assets.coachShare.src}`,
    author: {
      "@type": "Person",
      "@id": `${origin}/#coach`,
      name: t.hero.name,
      url: `${origin}${home}#about`,
    },
  };
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Header locale={locale} />
      <main id="main" className="legal-page container">
        <Link href={home} className="back-link">
          {t.footer.back}
        </Link>
        <h1>{guide.title}</h1>
        <p className="legal-intro">{guide.intro}</p>
        <section id="prices">
          <h2 id="guide-prices-heading">{guide.priceHeading}</h2>
          <table
            className="coaching-guide-prices"
            aria-labelledby="guide-prices-heading"
          >
            <thead>
              <tr>
                <th scope="col">{guide.packageHeading}</th>
                {guide.durations.map((duration) => (
                  <th key={duration} scope="col">
                    {duration}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {prices.map((row, index) => (
                <tr key={guide.prices[index]}>
                  <th scope="row">{guide.prices[index]}</th>
                  {business.durations.map((duration, column) => (
                    <td key={duration}>{number.format(row[column])}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        {guide.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <CoachingLink locale={locale}>{t.hero.results}</CoachingLink>
        <figure className="coaching-guide-coach">
          <Image
            {...assets.coachShare}
            alt={t.hero.photo}
            sizes="(max-width: 700px) 92vw, 850px"
          />
          <figcaption>
            <Link href={`${home}#about`} className="coaching-guide-link">
              {guide.coachLink}
            </Link>
          </figcaption>
        </figure>
      </main>
      <Footer locale={locale} />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      )}
    </>
  );
}
