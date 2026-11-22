import { aboutPath, coachingGuidePath } from "@/config/navigation";
import { business } from "@/lib/business";
import { getContent } from "@/lib/content";
import { siteOrigin } from "@/lib/env";

export const dynamic = "force-static";

export function GET() {
  const origin = siteOrigin() ?? "";
  const en = getContent("en");
  const ar = getContent("ar");
  const [iasst, fitxpert] = en.about.credentials;
  const row = (values: readonly number[]) =>
    business.durations
      .map((months, i) => `${months} month${months > 1 ? "s" : ""} ${values[i]}`)
      .join(", ");
  const link = (label: string, locale: string, path: string, note: string) =>
    `- [${label}](${origin}/${locale}${path}): ${note}`;
  const body = `# Abd Alrahman Mahfouz (كابتن عبدالرحمن محفوظ)

> ${en.about.entityLead} ${en.about.entityRest}

> ${ar.about.entityLead} ${ar.about.entityRest}

## Key pages

${link("Home (Arabic)", "ar", "", "packages, results, FAQ")}
${link("Home (English)", "en", "", "packages, results, FAQ")}
${link("About the coach (Arabic)", "ar", aboutPath, "profile, certificates, method")}
${link("About the coach (English)", "en", aboutPath, "profile, certificates, method")}
${link("Online coaching prices (Arabic)", "ar", coachingGuidePath, "package guide")}
${link("Online coaching prices (English)", "en", coachingGuidePath, "package guide")}

## Packages (prices in Egyptian pounds, ${business.currency})

- Without daily follow-up (same inside and outside Egypt): ${row(business.selfPrices)}
- Daily WhatsApp follow-up with follow-up videos, inside Egypt: ${row(business.prices.egypt)}
- Daily WhatsApp follow-up with follow-up videos, outside Egypt: ${row(business.prices.international)}
- Payment through InstaPay, then the payment confirmation screenshot is sent on WhatsApp.

## Credentials

- ${iasst[0]} (${iasst[1]})
- ${fitxpert[0]}, ${fitxpert[1]}

## Contact

- Instagram: ${business.instagram} (${business.instagramHandle})
- WhatsApp: https://wa.me/${business.whatsapp}

## Notes

- Coaching supports training and nutrition; it is not medical care. Results vary from person to person.
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
