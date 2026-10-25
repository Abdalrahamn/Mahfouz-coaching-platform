"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Entry() {
  useEffect(() => {
    const language = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("mahfouz-language="))
      ?.split("=")[1];
    window.location.replace(
      `${language === "en" ? "/en" : "/ar"}${window.location.search}${window.location.hash}`,
    );
  }, []);

  return (
    <main className="container legal-page">
      <h1>MAHFOUZ</h1>
      <p>
        <Link href="/ar" lang="ar">
          العربية
        </Link>{" "}
        ·{" "}
        <Link href="/en" lang="en">
          English
        </Link>
      </p>
    </main>
  );
}
