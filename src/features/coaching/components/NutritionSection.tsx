import { getContent } from "@/lib/content";
import Image from "next/image";
import { Check } from "lucide-react";
import { assets } from "@/config/assets";
import { type Locale } from "@/lib/business";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function NutritionSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="nutrition-section">
      <div className="container nutrition-grid">
        <div className="nutrition-image">
          <Image
            {...assets.nutrition}
            alt={t.nutrition.photo}
            quality={90}
            sizes="(max-width:700px) 90vw, 40vw"
          />
          <span className="image-caption utility">{t.nutrition.caption}</span>
        </div>
        <div className="editorial-copy">
          <Eyebrow>{t.nutrition.eyebrow}</Eyebrow>
          <h2>{t.nutrition.title}</h2>
          <p>{t.nutrition.text}</p>
          <ul className="check-list">
            {t.nutrition.points.map((item) => (
              <li key={item}>
                <Check size={18} />
                {item}
              </li>
            ))}
          </ul>
          <CoachingLink locale={locale} />
        </div>
      </div>
    </section>
  );
}
