"use client";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getContent } from "@/lib/content";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Eyebrow } from "@/components/ui/Eyebrow";
export default function NotFound() {
  const params = useParams();
  const locale = params.locale === "ar" ? "ar" : "en";
  const t = getContent(locale);
  return (
    <>
      <Header locale={locale} />
      <main className="container legal-page">
        <Eyebrow>404 / MAHFOUZ</Eyebrow>
        <h1>{t.notFound.title}</h1>
        <p className="legal-intro">{t.notFound.text}</p>
        <Link href={`/${locale}`} className="button">
          {t.footer.back}
        </Link>
      </main>
      <Footer locale={locale} />
    </>
  );
}
