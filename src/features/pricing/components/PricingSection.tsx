import { getContent } from "@/lib/content";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Pricing } from "@/features/pricing/components/Pricing";
import { PaymentNumber } from "@/features/pricing/components/PaymentNumber";

export function PricingSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="section pricing-section background-ember" id="pricing">
      <div className="container">
        <div className="section-intro center-intro">
          <Eyebrow>{t.pricing.eyebrow}</Eyebrow>
          <h2>{t.pricing.title}</h2>
          <p>{t.pricing.text}</p>
        </div>
        <Pricing locale={locale} />
        <div className="payment-section">
          <div>
            <h3>{t.payment.title}</h3>
            <p>{t.payment.text}</p>
            <div className="payment-methods">
              <span>InstaPay</span>
              <span>Vodafone Cash</span>
              <span>{t.chrome.cashWallets}</span>
            </div>
          </div>
          <PaymentNumber locale={locale} />
          <p className="payment-policy">{t.payment.note}</p>
        </div>
      </div>
    </section>
  );
}
