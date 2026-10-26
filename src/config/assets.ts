export type MediaAsset = { src: string; width: number; height: number };

export const assets = {
  hero: {
    src: "/assets/hero/coach-new-transparent.webp",
    width: 597,
    height: 1468,
  },
  about: {
    src: "/assets/coach/coach-about-new-transparent.webp",
    width: 728,
    height: 1461,
  },
  nutrition: {
    src: "/assets/coach/coach-nutrition-new-transparent.webp",
    width: 705,
    height: 1510,
  },
  transformations: [
    {
      src: "/assets/transformations/transformation-01-existing-mask.webp",
      width: 720,
      height: 1280,
    },
    {
      src: "/assets/transformations/transformation-02.webp",
      width: 719,
      height: 1280,
    },
    {
      src: "/assets/transformations/transformation-03-existing-mask.webp",
      width: 720,
      height: 1280,
    },
    {
      src: "/assets/transformations/transformation-04-existing-mask.webp",
      width: 941,
      height: 1672,
    },
    {
      src: "/assets/transformations/transformation-05-brush-60.webp",
      width: 941,
      height: 1672,
    },
    {
      src: "/assets/transformations/transformation-06-brush-60.webp",
      width: 941,
      height: 1672,
    },
    {
      src: "/assets/transformations/transformation-07-brush-60.webp",
      width: 941,
      height: 1672,
    },
    {
      src: "/assets/transformations/transformation-08-brush-60f.webp",
      width: 941,
      height: 1672,
    },
    {
      src: "/assets/transformations/transformation-09-brush-60d.webp",
      width: 941,
      height: 1672,
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
