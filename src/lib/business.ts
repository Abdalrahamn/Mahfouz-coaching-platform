export type Locale = "en" | "ar";
export type Duration = 1 | 3 | 6;
export type Region = "egypt" | "international";
export type PlanSelection =
  | { plan: "daily"; region: Region; months: Duration }
  | { plan: "self"; months: Duration };
export const business = {
  name: "ABD ALRAHMAN MAHFOUZ",
  wordmark: "MAHFOUZ",
  whatsapp: "201146399576",
  payment: "01146399576",
  instagram: "https://www.instagram.com/abdalrahman_mahfouz/",
  instagramHandle: "@abdalrahman_mahfouz",
  instapay: "https://ipn.eg/S/foza./instapay/9crWHF",
  instapayId: "foza.@instapay",
  experience: "15+",
  transformations: "300+",
  currency: "EGP",
  durations: [1, 3, 6] as const,
  prices: {
    egypt: [1200, 3000, 5500],
    international: [1500, 4000, 7500],
  } as const,
  selfPrices: [500, 1000, 2000] as const,
};
export const isLocale = (value: string): value is Locale =>
  value === "en" || value === "ar";
function planPrice(selection: PlanSelection) {
  const index = business.durations.indexOf(selection.months);
  return selection.plan === "daily"
    ? business.prices[selection.region][index]
    : business.selfPrices[index];
}
function durationLabel(locale: Locale, months: Duration) {
  if (locale === "ar") return months === 1 ? "شهر" : `${months} شهور`;
  return `${months} ${months === 1 ? "Month" : "Months"}`;
}
function priceLabel(locale: Locale, price: number) {
  return locale === "ar"
    ? `${price} جنيه`
    : `${price.toLocaleString("en-US")} EGP`;
}
export function whatsappLink(locale: Locale, selection?: PlanSelection) {
  let message =
    locale === "ar"
      ? "مساء الخير يا كابتن عبدالرحمن،\nأنا مهتم بالاشتراك في الأونلاين كوتشينج.\n\nممكن أعرف الخطوات الجاية؟"
      : "Hi Abd Alrahman,\nI'm interested in Online Coaching.\n\nCan you send me the next steps?";
  if (selection?.plan === "daily") {
    const region =
      selection.region === "egypt"
        ? locale === "ar"
          ? "داخل مصر"
          : "Inside Egypt"
        : locale === "ar"
          ? "خارج مصر"
          : "Outside Egypt";
    const price = planPrice(selection);
    const duration = durationLabel(locale, selection.months);
    const amount = priceLabel(locale, price);
    message =
      locale === "ar"
        ? `مساء الخير يا كابتن عبدالرحمن،\nأنا مهتم بالاشتراك في الأونلاين كوتشينج.\n\nنوع الاشتراك: متابعة يومية على واتساب\nالمنطقة: ${region}\nالمدة: ${duration}\nالسعر: ${amount}\n\nممكن أعرف الخطوات الجاية؟`
        : `Hi Abd Alrahman,\nI'm interested in Online Coaching.\n\nPlan: Daily WhatsApp Coaching\nRegion: ${region}\nDuration: ${duration}\nPrice: ${amount}\n\nCan you send me the next steps?`;
  }
  if (selection?.plan === "self") {
    const price = planPrice(selection);
    const duration = durationLabel(locale, selection.months);
    const amount = priceLabel(locale, price);
    message =
      locale === "ar"
        ? `مساء الخير يا كابتن عبدالرحمن،\nأنا مهتم بالاشتراك بدون متابعة.\n\nالمدة: ${duration}\nالسعر: ${amount}\n\nممكن أعرف الخطوات الجاية؟`
        : `Hi Abd Alrahman,\nI'm interested in the No Follow-Up Plan.\n\nDuration: ${duration}\nPrice: ${amount}\n\nCan you send me the next steps?`;
  }
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
export function paymentConfirmationLink(
  locale: Locale,
  selection?: PlanSelection,
) {
  let detail = "";
  if (selection?.plan === "daily") {
    const region =
      selection.region === "egypt"
        ? locale === "ar"
          ? "داخل مصر"
          : "Inside Egypt"
        : locale === "ar"
          ? "خارج مصر"
          : "Outside Egypt";
    const price = planPrice(selection);
    detail =
      locale === "ar"
        ? `\n\nالباقة: متابعة يومية على واتساب\nالمنطقة: ${region}\nالمدة: ${durationLabel(locale, selection.months)}\nالسعر: ${priceLabel(locale, price)}`
        : `\n\nPackage: Daily WhatsApp Coaching\nRegion: ${region}\nDuration: ${durationLabel(locale, selection.months)}\nPrice: ${priceLabel(locale, price)}`;
  }
  if (selection?.plan === "self") {
    const price = planPrice(selection);
    detail =
      locale === "ar"
        ? `\n\nالباقة: بدون متابعة\nالمدة: ${durationLabel(locale, selection.months)}\nالسعر: ${priceLabel(locale, price)}`
        : `\n\nPackage: No Follow-Up Plan\nDuration: ${durationLabel(locale, selection.months)}\nPrice: ${priceLabel(locale, price)}`;
  }
  const message =
    locale === "ar"
      ? `مساء الخير يا كابتن عبدالرحمن،\nأنا دفعت الاشتراك عن طريق InstaPay وده تأكيد الدفع.${detail}`
      : `Hi Abd Alrahman,\nI have paid for my coaching package through InstaPay and I would like to send the payment confirmation.${detail}`;
  return `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(message)}`;
}
