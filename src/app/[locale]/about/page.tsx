import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MediaGallery } from "@/components/media/MediaGallery";
import { assets } from "@/config/assets";
import { aboutPath, coachingGuidePath } from "@/config/navigation";
import { business, isLocale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { siteOrigin } from "@/lib/env";
import { metadataFor } from "@/lib/metadata";
import {
  breadcrumbNode,
  personNode,
  serializeSchema,
  webPageNode,
  websiteNode,
} from "@/lib/schema";

type AboutProps = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: AboutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const page = getContent(locale).aboutPage;
  return metadataFor(locale, aboutPath, page.title, page.description, {
    rawTitle: true,
  });
}

export default async function AboutPage({ params }: AboutProps) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const page = t.aboutPage;
  const home = `/${locale}`;
  const origin = siteOrigin();
  const schema = origin && {
    "@context": "https://schema.org",
    "@graph": [
      websiteNode(origin),
      webPageNode(
        origin,
        locale,
        aboutPath,
        page.title,
        page.description,
        "AboutPage",
        { mainEntity: { "@id": `${origin}/#coach` } },
      ),
      personNode(origin, locale),
      breadcrumbNode(origin, locale, [[page.breadcrumb, aboutPath]]),
    ],
  };
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Header locale={locale} />
      <main id="main" className="legal-page container about-page">
        <Link href={home} className="back-link">
          {t.footer.back}
        </Link>
        <div className="about-page-intro">
          <figure className="about-page-photo">
            <Image
              {...assets.coachProfile}
              alt={t.about.profileAlt}
              sizes="(max-width: 700px) 92vw, 380px"
              priority
            />
          </figure>
          <div>
            <h1>{page.h1}</h1>
            <p className="legal-intro">
              {t.about.entityLead} {t.about.entityRest}
            </p>
          </div>
        </div>
        <section id="credentials">
          <h2>{page.credentials}</h2>
          <MediaGallery locale={locale} kind="certificates" />
        </section>
        <section id="method">
          <h2>{page.method}</h2>
          <p>{t.about.body}</p>
          <ol className="engineering-method">
            {t.about.method.map((label, i) => (
              <li key={label}>
                <span className="utility">0{i + 1}</span>
                <strong>{label}</strong>
              </li>
            ))}
          </ol>
        </section>
        <section id="audience">
          <h2>{page.audience}</h2>
          <p>{page.audienceText}</p>
        </section>
        <section id="online-gym-coach">
          <h2>{page.gymHeading}</h2>
          <p>{page.gymText}</p>
        </section>
        <section id="packages">
          <h2>{page.packages}</h2>
          <p>{page.packagesText}</p>
          <p>
            <Link href={`${home}#pricing`} className="coaching-guide-link">
              {page.pricingLink}
            </Link>
          </p>
          <p>
            <Link
              href={`${home}${coachingGuidePath}`}
              className="coaching-guide-link"
            >
              {t.coachingGuide.link}
            </Link>
          </p>
        </section>
        <section id="instagram">
          <h2>{page.instagram}</h2>
          <p>
            {page.instagramText}{" "}
            <a
              href={business.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="coaching-guide-link"
              dir="ltr"
            >
              {business.instagramHandle}
            </a>
          </p>
        </section>
        <CoachingLink locale={locale}>{t.hero.results}</CoachingLink>
      </main>
      <Footer locale={locale} />
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeSchema(schema) }}
        />
      )}
    </>
  );
}
