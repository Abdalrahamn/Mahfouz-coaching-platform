import { notFound } from "next/navigation";
import { business, isLocale } from "@/lib/business";
import { siteOrigin } from "@/lib/env";
import { getContent } from "@/lib/content";
import { metadataFor } from "@/lib/metadata";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/features/hero/components/HeroSection";
import { CredibilityStrip } from "@/features/hero/components/CredibilityStrip";
import { CoachingSection } from "@/features/coaching/components/CoachingSection";
import { NutritionSection } from "@/features/coaching/components/NutritionSection";
import { CoachingAppSection } from "@/features/coaching/components/CoachingAppSection";
import { TransformationsSection } from "@/features/transformations/components/TransformationsSection";
import { TestimonialsSection } from "@/features/testimonials/components/TestimonialsSection";
import { ProcessSection } from "@/features/coaching/components/ProcessSection";
import { AboutSection } from "@/features/about/components/AboutSection";
import { PricingSection } from "@/features/pricing/components/PricingSection";
import { FaqSection } from "@/features/faq/components/FaqSection";
import { FinalCallToAction } from "@/features/contact/components/FinalCallToAction";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return metadataFor(locale);
}
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getContent(locale);
  const origin = siteOrigin();
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: business.name,
    jobTitle: t.chrome.jobTitle,
    sameAs: [business.instagram],
    ...(origin ? { url: `${origin}/${locale}` } : {}),
  };
  return (
    <>
      <a href="#main" className="skip-link">
        {t.skip}
      </a>
      <Header locale={locale} />
      <main id="main">
        <HeroSection locale={locale} />
        <CredibilityStrip locale={locale} />
        <CoachingSection locale={locale} />
        <NutritionSection locale={locale} />
        <CoachingAppSection locale={locale} />
        <TransformationsSection locale={locale} />
        <TestimonialsSection locale={locale} />
        <ProcessSection locale={locale} />
        <AboutSection locale={locale} />
        <PricingSection locale={locale} />
        <FaqSection locale={locale} />
        <FinalCallToAction locale={locale} />
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
