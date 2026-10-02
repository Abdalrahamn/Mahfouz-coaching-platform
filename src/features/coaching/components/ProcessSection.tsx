import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function ProcessSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="section process-section background-grid">
      <div className="container">
        <div className="section-intro">
          <Eyebrow>{t.steps.eyebrow}</Eyebrow>
          <h2>{t.steps.title}</h2>
        </div>
        <ol className="process-grid">
          {t.steps.items.map(([title, text], i) => (
            <li key={title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
