"use client";
import Image from "next/image";
import { useState } from "react";
import { Expand } from "lucide-react";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import type { Locale } from "@/lib/business";
import { assets, type MediaAsset } from "@/config/assets";
import { getContent } from "@/lib/content";
export function MediaGallery({
  locale,
  kind,
}: {
  locale: Locale;
  kind: "transformations" | "certificates";
}) {
  const t = getContent(locale);
  const [active, setActive] = useState(0);
  const [openLightbox, setOpenLightbox] = useState(false);
  const items: MediaAsset[] = assets[kind];
  const alt = kind === "transformations" ? t.results.alt : "";
  const label = kind === "transformations" ? t.results.enlarge : t.about.view;
  const open = (i: number) => {
    setActive(i);
    setOpenLightbox(true);
  };
  const title =
    kind === "certificates"
      ? t.about.credentials[active][0]
      : `${t.results.title} ${active + 1}`;
  return (
    <div className={`gallery gallery-${kind}`}>
      <div className="gallery-track">
        {items.map((item, i) => (
          <figure key={item.src} className="media-card">
            <button
              className="media-trigger"
              onClick={() => open(i)}
              aria-label={`${label} ${i + 1}`}
            >
              <Image
                src={item.src}
                alt={
                  kind === "certificates"
                    ? t.about.credentials[i][0]
                    : `${alt} ${i + 1}`
                }
                width={item.width}
                height={item.height}
                sizes={
                  kind === "certificates"
                    ? "90px"
                    : "(max-width: 600px) 86vw, (max-width: 900px) 45vw, 33vw"
                }
              />
              {kind !== "transformations" && (
                <span className="expand-badge">
                  <Expand size={17} />
                </span>
              )}
            </button>
            {kind !== "transformations" && (
              <figcaption>
                <strong>{t.about.credentials[i][0]}</strong>
                <span>{t.about.credentials[i][1]}</span>
              </figcaption>
            )}
          </figure>
        ))}
      </div>
      <ImageLightbox
        open={openLightbox}
        slides={items.map((item, i) => ({
          ...item,
          alt:
            kind === "certificates"
              ? t.about.credentials[i][0]
              : `${alt} ${i + 1}`,
        }))}
        index={active}
        title={title}
        closeLabel={t.close}
        previousLabel={t.chrome.previousImage}
        nextLabel={t.chrome.nextImage}
        onClose={() => setOpenLightbox(false)}
        onIndex={kind === "certificates" ? undefined : setActive}
      />
    </div>
  );
}
