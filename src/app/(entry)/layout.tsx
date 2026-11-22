import { metadataFor } from "@/lib/metadata";
import "../globals.css";

export const metadata = metadataFor("ar");

// Runs before first paint: Arabic is the default; a saved English preference goes to /en.
const redirectScript = `(function(){try{var m=document.cookie.match(/(?:^|;\\s*)mahfouz-language=([^;]+)/);var l=m&&m[1]==="en"?"/en":"/ar";location.replace(l+location.search+location.hash)}catch(e){location.replace("/ar")}})()`;

export default function EntryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" data-theme="dark">
      <head>
        <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
        <noscript>
          <meta httpEquiv="refresh" content="0;url=/ar" />
        </noscript>
      </head>
      <body>{children}</body>
    </html>
  );
}
