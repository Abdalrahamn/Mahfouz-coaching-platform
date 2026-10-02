import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FaqSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="section container faq-section" id="faq">
      <div>
        <Eyebrow>{t.faq.eyebrow}</Eyebrow>
        <h2>{t.faq.title}</h2>
      </div>
      <div className="faq-list">
        {t.faq.items.map(([q, a]) => (
          <article key={q}>
            <h3>{q}</h3>
            <p>{a}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
