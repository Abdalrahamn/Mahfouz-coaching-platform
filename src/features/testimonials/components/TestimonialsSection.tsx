import { getContent } from "@/lib/content";
import { ShieldCheck } from "lucide-react";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ProofCarousel } from "@/components/media/ProofCarousel";

export function TestimonialsSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="section container" id="feedback">
      <div className="section-intro">
        <Eyebrow>{t.feedback.eyebrow}</Eyebrow>
        <h2>{t.feedback.title}</h2>
        <p>{t.feedback.text}</p>
      </div>
      <ProofCarousel locale={locale} kind="feedback" />
      <p className="privacy-note">
        <ShieldCheck size={16} />
        {t.feedback.privacy}
      </p>
    </section>
  );
}
