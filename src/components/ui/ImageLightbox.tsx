"use client";
import Image from "next/image";
import { useEffect, useId, useRef } from "react";
import { X } from "lucide-react";
type Slide = { src: string; width: number; height: number; alt: string };
export function ImageLightbox({
  open,
  slides,
  index,
  title,
  closeLabel,
  previousLabel = "Previous image",
  nextLabel = "Next image",
  footnote,
  onClose,
  onIndex,
  className = "",
}: {
  open: boolean;
  slides: Slide[];
  index: number;
  title: string;
  closeLabel: string;
  previousLabel?: string;
  nextLabel?: string;
  footnote?: string;
  onClose: () => void;
  onIndex?: (index: number) => void;
  className?: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  const slide = slides[index];
  useEffect(() => {
    const node = dialog.current;
    if (!node) return;
    if (open && !node.open) node.showModal();
    if (!open && node.open) node.close();
  }, [open]);
  return (
    <dialog
      ref={dialog}
      className={`lightbox ${className}`}
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      onKeyDown={(event) => {
        if (!onIndex || slides.length < 2) return;
        if (event.key === "ArrowRight") onIndex((index + 1) % slides.length);
        if (event.key === "ArrowLeft")
          onIndex((index - 1 + slides.length) % slides.length);
      }}
    >
      <div
        className="lightbox-stage"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="lightbox-header">
          <h2 id={titleId}>{title}</h2>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label={closeLabel}
          >
            <X />
          </button>
        </div>
        {slide && (
          <div className="lightbox-image">
            <Image
              src={slide.src}
              alt={slide.alt}
              width={slide.width}
              height={slide.height}
              sizes="94vw"
              quality={90}
              style={{ objectFit: "contain" }}
            />
          </div>
        )}
        {(footnote || (onIndex && slides.length > 1)) && (
          <div className="lightbox-footer">
            <p>{footnote}</p>
            {onIndex && slides.length > 1 && (
              <div>
                <button
                  className="icon-button"
                  onClick={() =>
                    onIndex((index - 1 + slides.length) % slides.length)
                  }
                  aria-label={previousLabel}
                >
                  ‹
                </button>
                <span>
                  {index + 1} / {slides.length}
                </span>
                <button
                  className="icon-button"
                  onClick={() => onIndex((index + 1) % slides.length)}
                  aria-label={nextLabel}
                >
                  ›
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </dialog>
  );
}
