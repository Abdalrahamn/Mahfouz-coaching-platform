import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { CoachingLink } from "@/components/layout/CoachingLink";
import { Eyebrow } from "@/components/ui/Eyebrow";

export function FinalCallToAction({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="final-section background-ember">
      <div className="container">
        <Eyebrow>{t.final.eyebrow}</Eyebrow>
        <h2>{t.final.title}</h2>
        <p>{t.final.text}</p>
        <CoachingLink locale={locale}>{t.hero.results}</CoachingLink>
      </div>
    </section>
  );
}
