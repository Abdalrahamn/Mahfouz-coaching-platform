"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight, Pause, Play, Expand } from "lucide-react";
import { assets } from "@/config/assets";
import type { Locale } from "@/lib/business";
import { getContent } from "@/lib/content";
import { ImageLightbox } from "@/components/ui/ImageLightbox";
import {
  COUNT,
  CLONES,
  AUTOPLAY_INTERVAL,
  INTERACTION_HOLD,
  SCROLL_SETTLE,
  slides,
} from "@/features/testimonials/testimonials.constants";
export function TestimonialCarousel({ locale }: { locale: Locale }) {
  const t = getContent(locale);
  const reduced = useReducedMotion();
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0),
    [paused, setPaused] = useState(false),
    [hovered, setHovered] = useState(false),
    [focused, setFocused] = useState(false),
    [visible, setVisible] = useState(false),
    [reading, setReading] = useState(false);
  const settle = useRef<ReturnType<typeof setTimeout> | null>(null);
  const holdUntil = useRef(0);
  const drag = useRef<{ x: number; left: number; moved: boolean } | null>(null);
  const activeRef = useRef(0);
  const step = useCallback(() => {
    const el = track.current;
    return el
      ? (el.children[1] as HTMLElement).offsetLeft -
          (el.children[0] as HTMLElement).offsetLeft
      : 0;
  }, []);
  const advance = useCallback(
    (direction: number) => {
      const el = track.current;
      if (el)
        el.scrollBy({
          left: direction * step(),
          behavior: reduced ? "instant" : "smooth",
        });
    },
    [reduced, step],
  );
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const position = () =>
      el.scrollTo({
        left: (CLONES + activeRef.current) * step(),
        behavior: "instant",
      });
    position();
    const resize = new ResizeObserver(position);
    resize.observe(el);
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    observer.observe(el);
    return () => {
      resize.disconnect();
      observer.disconnect();
      if (settle.current) clearTimeout(settle.current);
    };
  }, [step]);
  useEffect(() => {
    if (reduced || paused || hovered || focused || reading || !visible) return;
    const timer = setInterval(() => {
      if (!document.hidden && Date.now() > holdUntil.current) advance(1);
    }, AUTOPLAY_INTERVAL);
    return () => clearInterval(timer);
  }, [advance, reduced, paused, hovered, focused, reading, visible]);
  const onScroll = () => {
    const el = track.current;
    if (!el) return;
    const size = step();
    if (!size) return;
    const logical =
      (((Math.round(el.scrollLeft / size) - CLONES) % COUNT) + COUNT) % COUNT;
    activeRef.current = logical;
    setActive(logical);
    if (settle.current) clearTimeout(settle.current);
    settle.current = setTimeout(() => {
      const position = Math.round(el.scrollLeft / size);
      if (position < CLONES || position >= CLONES + COUNT)
        el.scrollTo({ left: (CLONES + logical) * size, behavior: "instant" });
    }, SCROLL_SETTLE);
  };
  const read = () => setReading(true);
  return (
    <div
      className="testimonial-carousel gallery-feedback"
      role="region"
      aria-roledescription="carousel"
      aria-label={t.feedback.title}
    >
      <div className="gallery-controls">
        <span className="utility">{t.feedback.message}</span>
        <div>
          <button
            className="icon-button"
            aria-label={t.feedback.previous}
            onClick={() => advance(-1)}
          >
            <ChevronLeft />
          </button>
          <button
            className="icon-button"
            aria-label={paused ? t.feedback.play : t.feedback.pause}
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? <Play /> : <Pause />}
          </button>
          <button
            className="icon-button"
            aria-label={t.feedback.next}
            onClick={() => advance(1)}
          >
            <ChevronRight />
          </button>
        </div>
      </div>
      <div
        ref={track}
        className="testimonial-track"
        role="group"
        dir="ltr"
        onScroll={onScroll}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocusCapture={() => setFocused(true)}
        onBlurCapture={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget))
            setFocused(false);
        }}
        onWheel={() => {
          holdUntil.current = Date.now() + INTERACTION_HOLD;
        }}
        onPointerDown={(event) => {
          holdUntil.current = Date.now() + INTERACTION_HOLD;
          if (event.pointerType !== "mouse") return;
          drag.current = {
            x: event.clientX,
            left: event.currentTarget.scrollLeft,
            moved: false,
          };
        }}
        onPointerMove={(event) => {
          if (!drag.current) return;
          const delta = event.clientX - drag.current.x;
          if (Math.abs(delta) > 6) {
            drag.current.moved = true;
            event.currentTarget.setPointerCapture(event.pointerId);
            event.currentTarget.scrollLeft = drag.current.left - delta;
          }
        }}
        onPointerUp={(event) => {
          holdUntil.current = Date.now() + INTERACTION_HOLD;
          if (drag.current?.moved) {
            event.currentTarget.scrollTo({
              left:
                Math.round(event.currentTarget.scrollLeft / step()) * step(),
              behavior: reduced ? "instant" : "smooth",
            });
          }
          drag.current = null;
        }}
        onPointerCancel={() => {
          drag.current = null;
        }}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
            event.preventDefault();
            advance(event.key === "ArrowRight" ? 1 : -1);
          }
        }}
        tabIndex={0}
        aria-label={t.feedback.message}
      >
        {slides.map((asset, index) => {
          const duplicate = index < CLONES || index >= CLONES + COUNT;
          return (
            <figure
              className={`testimonial-card ${(((index - CLONES) % COUNT) + COUNT) % COUNT === active ? "is-current" : ""}`}
              key={index}
              aria-hidden={duplicate || undefined}
              dir={locale === "ar" ? "rtl" : "ltr"}
            >
              <div className="testimonial-image">
                <Image
                  {...asset}
                  alt={
                    duplicate ? "" : `${t.feedback.alt} ${index - CLONES + 1}`
                  }
                  sizes="(max-width:700px) 86vw, (max-width:1000px) 45vw, 380px"
                  quality={90}
                  draggable={false}
                />
              </div>
              <figcaption>
                <span className="utility">{t.feedback.label}</span>
              </figcaption>
            </figure>
          );
        })}
      </div>
      <div className="carousel-footer">
        <div
          className="carousel-pagination"
          role="img"
          aria-label={`${active + 1} / ${COUNT}`}
          dir="ltr"
        >
          {assets.feedback.map((_, index) => (
            <span key={index} className={index === active ? "active" : ""} />
          ))}
        </div>
        <button className="text-button" onClick={read}>
          {t.feedback.open} <Expand size={16} />
        </button>
      </div>
      <ImageLightbox
        open={reading}
        slides={assets.feedback.map((item) => ({
          ...item,
          alt: t.feedback.alt,
        }))}
        index={active}
        title={`${t.feedback.label} ${active + 1}`}
        closeLabel={t.close}
        previousLabel={t.chrome.previousImage}
        nextLabel={t.chrome.nextImage}
        footnote={t.feedback.privacy}
        onClose={() => setReading(false)}
        onIndex={setActive}
        className="feedback-lightbox"
      />
    </div>
  );
}
