import { getContent } from "@/lib/content";
import {
  Dumbbell,
  Utensils,
  MessageCircle,
  Smartphone,
  Check,
} from "lucide-react";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function CoachingAppSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="section container app-section">
      <div className="app-copy">
        <Eyebrow>{t.app.eyebrow}</Eyebrow>
        <h2>{t.app.title}</h2>
        <p>{t.app.text}</p>
        <p className="app-note">
          <MessageCircle size={23} />
          {t.app.note}
        </p>
      </div>
      <div className="app-panel">
        <Smartphone size={42} strokeWidth={1.2} />
        <p className="utility">{t.app.appLabel}</p>
        {t.app.items.map((item, i) => (
          <div className="app-delivery" key={item}>
            {i === 0 ? <Dumbbell /> : i === 1 ? <Utensils /> : <Check />}
            <strong>{item}</strong>
            <span aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          </div>
        ))}
        <p>{t.app.appDisclaimer}</p>
      </div>
    </section>
  );
}
