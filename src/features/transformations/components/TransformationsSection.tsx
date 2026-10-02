import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaGallery } from "@/components/media/MediaGallery";

export function TransformationsSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section
      className="section results-section background-grid"
      id="transformations"
    >
      <div className="container">
        <div className="section-intro split-intro">
          <div>
            <Eyebrow>{t.results.eyebrow}</Eyebrow>
            <h2>
              {t.results.title.split("\n").map((line, index) => (
                <span
                  key={line}
                  className={
                    index === 1 ? "result-line result-accent" : "result-line"
                  }
                >
                  {line}
                </span>
              ))}
            </h2>
          </div>
          <p>{t.results.text}</p>
        </div>
        <MediaGallery locale={locale} kind="transformations" />
        <p className="section-note">{t.results.note}</p>
      </div>
    </section>
  );
}
