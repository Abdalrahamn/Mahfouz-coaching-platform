import { getContent } from "@/lib/content";
import Image from "next/image";
import { assets } from "@/config/assets";
import { type Locale } from "@/lib/business";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { MediaGallery } from "@/components/media/MediaGallery";

export function AboutSection({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  return (
    <section className="section container about-section" id="about">
      <div className="about-image">
        <Image
          {...assets.about}
          alt={t.about.photo}
          quality={90}
          sizes="(max-width: 700px) 90vw, 45vw"
        />
        <div className="about-photo-label">
          <span className="utility">CFT · ONLINE COACH</span>
          <strong dir="ltr">MAHFOUZ</strong>
        </div>
      </div>
      <div className="about-copy">
        <Eyebrow>{t.about.eyebrow}</Eyebrow>
        <h2>{t.about.title}</h2>
        <p>{t.about.text}</p>
        <h3>{t.about.engineering}</h3>
        <p>{t.about.body}</p>
        <ol className="engineering-method">
          {t.about.method.map((label, i) => (
            <li key={label}>
              <span className="utility">0{i + 1}</span>
              <strong>{label}</strong>
            </li>
          ))}
        </ol>
        <MediaGallery locale={locale} kind="certificates" />
      </div>
    </section>
  );
}
