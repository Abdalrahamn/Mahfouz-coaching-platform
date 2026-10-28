import { Check, ChevronDown, X } from "lucide-react";
import {
  business,
  paymentConfirmationLink,
  type Locale,
  type Region,
} from "@/lib/business";
import { getContent } from "@/lib/content";

type Offer = "daily" | "self";

function formatPrice(locale: Locale, amount: number) {
  return new Intl.NumberFormat(locale === "ar" ? "ar-EG" : "en-EG").format(
    amount,
  );
}

function PlanCards({
  locale,
  offer,
  prices,
  region,
}: {
  locale: Locale;
  offer: Offer;
  prices: readonly number[];
  region?: Region;
}) {
  const t = getContent(locale).pricing;
  const features = offer === "daily" ? t.includes : t.selfIncludes;
  return (
    <div className="pricing-grid">
      {business.durations.map((months, i) => {
        const recommended = offer === "daily" && i === 1;
        const selection =
          offer === "daily" && region
            ? ({ plan: "daily", region, months } as const)
            : ({ plan: "self", months } as const);
        return (
          <article
            key={`${offer}-${region ?? "same"}-${months}`}
            className={`price-card ${recommended ? "recommended" : ""} ${offer}`}
          >
            <div className="price-top">
              <span className="utility">{t.period[i]}</span>
              {recommended && (
                <span className="recommended-label">{t.recommended}</span>
              )}
            </div>
            <h3>{t.duration[i]}</h3>
            <p className="price">
              <bdi>{formatPrice(locale, prices[i])}</bdi>
              <span>{t.currency}</span>
            </p>
            {region && (
              <p className="price-region">
                {t.regions[region === "egypt" ? 0 : 1]}
              </p>
            )}
            <ul className="plan-features">
              {features.map((item, featureIndex) => {
                const excluded =
                  offer === "self" && featureIndex === features.length - 1;
                return (
                  <li key={item} className={excluded ? "is-excluded" : ""}>
                    {excluded ? (
                      <X size={16} aria-hidden="true" />
                    ) : (
                      <Check size={16} aria-hidden="true" />
                    )}
                    <span>
                      {excluded && (
                        <span className="sr-only">
                          {getContent(locale).chrome.excluded}
                        </span>
                      )}
                      {item}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="price-actions">
              <a
                className={`button ${recommended ? "" : "button-outline"}`}
                href={business.instapay}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="step-index" aria-hidden="true">
                  1
                </span>
                {t.choose}
              </a>
              <p className="price-next">{t.thenSend}</p>
              <a
                className="button button-outline"
                href={paymentConfirmationLink(locale, selection)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="step-index" aria-hidden="true">
                  2
                </span>
                {t.sendShot}
              </a>
            </div>
          </article>
        );
      })}
    </div>
  );
}

export function Pricing({ locale }: { locale: Locale }) {
  const t = getContent(locale).pricing;
  const regions = ["egypt", "international"] as const;
  return (
    <div className="plan-catalog">
      <section className="plan-group" aria-labelledby="daily-coaching">
        <header className="plan-group-heading">
          <h3 id="daily-coaching">{t.offerTitles[0]}</h3>
          <p>{t.offerText[0]}</p>
        </header>
        {regions.map((region) => (
          <details
            key={region}
            className="plan-region region-accordion"
            name="pricing-region"
            open={region === "egypt"}
          >
            <summary>
              <div className="accordion-label">
                <h4>{t.regions[region === "egypt" ? 0 : 1]}</h4>
                {region === "international" && (
                  <p className="accordion-hint">
                    {t.accordion.from}{" "}
                    <bdi>
                      {formatPrice(locale, business.prices.international[0])}
                    </bdi>{" "}
                    {t.currency} {t.accordion.monthly}
                    <span className="accordion-show">
                      {" "}
                      · {t.accordion.show}
                    </span>
                  </p>
                )}
              </div>
              <ChevronDown size={22} aria-hidden="true" />
            </summary>
            <div className="region-accordion-content">
              <PlanCards
                locale={locale}
                offer="daily"
                region={region}
                prices={business.prices[region]}
              />
            </div>
          </details>
        ))}
      </section>
      <details
        className="plan-group-self plan-region region-accordion self-accordion"
        name="pricing-region"
      >
        <summary>
          <div className="accordion-label">
            <h3 id="no-follow-up">{t.accordion.selfTitle}</h3>
            <p className="accordion-hint">
              {t.accordion.from}{" "}
              <bdi>{formatPrice(locale, business.selfPrices[0])}</bdi>{" "}
              {t.currency} {t.accordion.monthly}
              <span className="accordion-show"> · {t.accordion.show}</span>
            </p>
          </div>
          <ChevronDown size={22} aria-hidden="true" />
        </summary>
        <div className="region-accordion-content">
          <p>{t.offerText[1]}</p>
          <PlanCards
            locale={locale}
            offer="self"
            prices={business.selfPrices}
          />
        </div>
      </details>
      <p className="section-note">{t.note}</p>
    </div>
  );
}
