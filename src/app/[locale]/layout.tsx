import { notFound } from "next/navigation";
import { isLocale } from "@/lib/business";
import { display, body, arabic } from "@/lib/fonts";
import { themeBootScript } from "@/lib/theme";
import "../globals.css";
export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "ar" }];
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${display.variable} ${body.variable} ${arabic.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
