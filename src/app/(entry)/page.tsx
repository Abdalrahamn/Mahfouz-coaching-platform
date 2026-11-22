import Link from "next/link";

// Visually empty: the head script redirects before paint. Links remain for crawlers/no-JS.
export default function Entry() {
  return (
    <nav className="sr-only" aria-label="Language">
      <Link href="/ar" lang="ar">
        العربية
      </Link>
      <Link href="/en" lang="en">
        English
      </Link>
    </nav>
  );
}
