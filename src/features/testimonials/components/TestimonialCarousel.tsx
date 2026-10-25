import type { Locale } from "@/lib/business";
import { ProofCarousel } from "@/components/media/ProofCarousel";
export function TestimonialCarousel({ locale }: { locale: Locale }) {
  return <ProofCarousel locale={locale} kind="feedback" />;
}
