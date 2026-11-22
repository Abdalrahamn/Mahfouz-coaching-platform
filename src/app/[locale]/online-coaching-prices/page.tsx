import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { assets } from "@/config/assets";
import {
  aboutPath,
  coachingGuidePath,
  contentUpdated,
  guidePublished,
} from "@/config/navigation";
import { business, isLocale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { siteOrigin } from "@/lib/env";
import { metadataFor, priceSnippet } from "@/lib/metadata";
import {
  breadcrumbNode,
  coachId,
  faqNode,
  personNode,
  priceSentence,
  profileImageNode,
  serializeSchema,
  webPageNode,
  websiteNode,
} from "@/lib/schema";

type GuideProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: GuideProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const guide = getContent(locale).coachingGuide;
  return metadataFor(
    locale,
    coachingGuidePath,
    guide.title,
    priceSnippet(locale),
  );
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
  const priceText = guide.priceSentences.map((sentence, index) =>
    priceSentence(locale, sentence, prices[index]),
  );
  const qa: [string, string][] = [
    [guide.includesQuestion, guide.includesAnswer],
    [guide.priceQuestion, `${priceText.join(" ")} ${guide.priceNote}`],
    [guide.compareQuestion, guide.compareAnswer],
    [guide.paymentQuestion, guide.paymentAnswer],
    ...guide.sections.map(([q, a]): [string, string] => [q, a]),
    [guide.gymHeading, guide.gymText],
  ];
  const guideUrl = `${origin}/${locale}${coachingGuidePath}`;
  const schema = origin && {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(origin),
      webPageNode(origin, locale, coachingGuidePath, guide.title, guide.intro),
      {
        "@type": "Article",
        "@id": `${guideUrl}#article`,
        mainEntityOfPage: { "@id": guideUrl },
        headline: guide.title,
        description: guide.intro,
        inLanguage: locale,
        datePublished: guidePublished,
        dateModified: contentUpdated,
        image: profileImageNode(origin, locale),
        author: { "@id": coachId(origin) },
        publisher: { "@id": coachId(origin) },
      },
      personNode(origin, locale),
      breadcrumbNode(origin, locale, [[guide.breadcrumb, coachingGuidePath]]),
      faqNode(origin, locale, coachingGuidePath, qa),
    ],
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
        <section id="includes">
          <h2>{guide.includesQuestion}</h2>
          <p>{guide.includesAnswer}</p>
        </section>
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
          <h3>{guide.priceQuestion}</h3>
          {priceText.map((sentence) => (
            <p key={sentence}>{sentence}</p>
          ))}
          <p>{guide.priceNote}</p>
        </section>
        <section id="compare">
          <h2>{guide.compareQuestion}</h2>
          <p>{guide.compareAnswer}</p>
        </section>
        <section id="payment">
          <h2>{guide.paymentQuestion}</h2>
          <p>{guide.paymentAnswer}</p>
        </section>
        {guide.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <section id="online-gym-coach">
          <h2>{guide.gymHeading}</h2>
          <p>{guide.gymText}</p>
        </section>
        <CoachingLink locale={locale}>{t.hero.results}</CoachingLink>
        <figure className="coaching-guide-coach">
          <Image
            {...assets.coachShare}
            alt={t.hero.photo}
            sizes="(max-width: 700px) 92vw, 850px"
          />
          <figcaption>
            <Link href={`${home}${aboutPath}`} className="coaching-guide-link">
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
            __html: serializeSchema(schema),
          }}
        />
      )}
    </>
  );
}
