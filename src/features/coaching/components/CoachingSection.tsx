import { Dumbbell, Utensils, MessageCircle, Smartphone } from "lucide-react";
import { coachingGuidePath } from "@/config/navigation";
import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CoachingSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const icons = [Dumbbell, Utensils, MessageCircle, Smartphone];
  return (
    <section className="section container" id="coaching">
      <div className="section-intro split-intro">
        <div>
          <Eyebrow>{t.coaching.eyebrow}</Eyebrow>
          <h2>{t.coaching.title}</h2>
        </div>
        <div className="coaching-intro-copy">
          <p>{t.coaching.description}</p>
          <a
            href={`/${locale}${coachingGuidePath}`}
            className="coaching-guide-link"
          >
            {t.coachingGuide.link}
          </a>
        </div>
      </div>
      <div className="benefit-grid">
        {t.coaching.features.map(([title, description], i) => {
          const Icon = icons[i];
          return (
            <article key={title}>
              <Icon size={29} strokeWidth={1.4} />
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
