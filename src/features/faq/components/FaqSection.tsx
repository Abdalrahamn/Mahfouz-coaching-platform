import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { ChevronDown } from "lucide-react";

export function FaqSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <div className="faq-band">
      <section className="section container faq-section" id="faq">
        <div>
          <Eyebrow>{t.faq.eyebrow}</Eyebrow>
          <h2>{t.faq.title}</h2>
        </div>
        <div className="faq-list">
          {t.faq.items.map(([q, a]) => (
            <details key={q} name="coaching-faq">
              <summary>
                <h3>{q}</h3>
                <ChevronDown size={20} aria-hidden="true" />
              </summary>
              <p>{a}</p>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}
