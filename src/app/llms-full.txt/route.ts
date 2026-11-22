import { aboutPath, coachingGuidePath } from "@/config/navigation";
import { business } from "@/lib/business";
import { getContent } from "@/lib/content";
import { siteOrigin } from "@/lib/env";

export const dynamic = "force-static";

export function GET() {
  const origin = siteOrigin() ?? "";
  const en = getContent("en");
  const ar = getContent("ar");
  const row = (values: readonly number[]) =>
    business.durations
      .map(
        (months, i) => `${months} month${months > 1 ? "s" : ""} ${values[i]}`,
      )
      .join(", ");
  const faq = (copy: typeof en) =>
    copy.faq.items.map(([q, a]) => `### ${q}\n${a}`).join("\n\n");
  const body = `# Abd Alrahman Mahfouz (كابتن عبدالرحمن محفوظ) — full reference

> ${en.about.entityLead} ${en.about.entityRest}

> ${ar.about.entityLead} ${ar.about.entityRest}

## Pages

- Arabic home: ${origin}/ar
- English home: ${origin}/en
- About the coach: ${origin}/ar${aboutPath} · ${origin}/en${aboutPath}
- Online coaching prices guide: ${origin}/ar${coachingGuidePath} · ${origin}/en${coachingGuidePath}
- Short summary: ${origin}/llms.txt

## Packages (prices in Egyptian pounds, ${business.currency})

- Without daily follow-up (same inside and outside Egypt): ${row(business.selfPrices)}
- Daily WhatsApp follow-up with follow-up videos, inside Egypt: ${row(business.prices.egypt)}
- Daily WhatsApp follow-up with follow-up videos, outside Egypt: ${row(business.prices.international)}
- Payment through InstaPay, then the payment confirmation screenshot is sent on WhatsApp.

## Contact

- Instagram: ${business.instagram} (${business.instagramHandle})
- WhatsApp: https://wa.me/${business.whatsapp}

## Frequently asked questions (English)

${faq(en)}

## الأسئلة الشائعة (العربية)

${faq(ar)}

## Notes

- Coaching supports training and nutrition; it is not medical care. Results vary from person to person.
`;
  return new Response(body, {
    headers: { "content-type": "text/plain; charset=utf-8" },
  });
}
