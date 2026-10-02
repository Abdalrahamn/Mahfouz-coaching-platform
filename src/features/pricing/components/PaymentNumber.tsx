"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { business, type Locale } from "@/lib/business";
import { getContent } from "@/lib/content";
export function PaymentNumber({ locale }: { locale: Locale }) {
  const t = getContent(locale).payment;
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(business.payment);
      setStatus("copied");
    } catch {
      setStatus("error");
    }
  };
  return (
    <div className="payment-number">
      <span className="utility">{t.number}</span>
      <div>
        <bdi>{business.payment}</bdi>
        <button className="icon-button" onClick={copy} aria-label={t.copy}>
          {status === "copied" ? <Check /> : <Copy />}
        </button>
      </div>
      <p className="copy-status" role="status">
        {status === "copied" ? t.copied : status === "error" ? t.failed : ""}
      </p>
    </div>
  );
}
