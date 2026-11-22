import { metadataFor } from "@/lib/metadata";
import "../globals.css";

export const metadata = metadataFor("ar");

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark">
      <head>
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/ar" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
