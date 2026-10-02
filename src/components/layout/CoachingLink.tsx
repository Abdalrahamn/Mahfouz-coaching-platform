import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Locale, PlanSelection } from "@/lib/business";
import { whatsappLink } from "@/lib/business";
import { getContent } from "@/lib/content";
export function CoachingLink({
  locale,
  children,
  className = "",
  selection,
}: {
  locale: Locale;
  children?: React.ReactNode;
  className?: string;
  selection?: PlanSelection;
}) {
  const Icon = selection ? MessageCircle : ArrowUpRight;
  return (
    <a
      className={`button ${className}`}
      href={selection ? whatsappLink(locale, selection) : `/${locale}#pricing`}
      target={selection ? "_blank" : undefined}
      rel={selection ? "noopener noreferrer" : undefined}
    >
      <Icon size={19} aria-hidden="true" />
      {children ?? getContent(locale).start}
    </a>
  );
}
