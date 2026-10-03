export type MediaAsset = { src: string; width: number; height: number };

export const assets = {
  hero: {
    src: "/assets/hero/coach-new-transparent.webp",
    width: 597,
    height: 1468,
  },
  about: {
    src: "/assets/coach/coach-about-transparent.webp",
    width: 610,
    height: 884,
  },
  nutrition: {
    src: "/assets/coach/coach-nutrition-transparent.webp",
    width: 647,
    height: 1196,
  },
  transformations: [
    {
      src: "/assets/transformations/transformation-01.webp",
      width: 720,
      height: 1280,
    },
    {
      src: "/assets/transformations/transformation-02.webp",
      width: 719,
      height: 1280,
    },
    {
      src: "/assets/transformations/transformation-03.webp",
      width: 720,
      height: 1280,
    },
  ],
  feedback: [
    [710, 1236],
    [710, 1244],
    [1242, 1972],
    [1242, 2066],
    [1242, 2022],
    [710, 1242],
    [1242, 2154],
  ].map(([width, height], i) => ({
    src: `/assets/testimonials/feedback-${String(i + 1).padStart(2, "0")}-full-redacted.webp`,
    width,
    height,
  })),
  certificates: [
    {
      src: "/assets/certificates/certificate-iasst.webp",
      width: 621,
      height: 898,
    },
    {
      src: "/assets/certificates/certificate-fitxpert.webp",
      width: 1242,
      height: 847,
    },
  ],
};
