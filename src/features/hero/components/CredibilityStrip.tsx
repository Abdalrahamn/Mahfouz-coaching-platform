import { getContent } from "@/lib/content";
import { business, type Locale } from "@/lib/business";

export function CredibilityStrip({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="credibility" aria-label={t.chrome.experience}>
      <div className="container stats-grid">
        {[business.experience, business.transformations, t.daily].map(
          (value, i) => (
            <div key={value}>
              <strong dir={i < 2 ? "ltr" : undefined}>{value}</strong>
              <span className="utility">{t.stats[i]}</span>
            </div>
          ),
        )}
        <p>{t.chrome.coachingPromise}</p>
      </div>
    </section>
  );
}
