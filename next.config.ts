import type { NextConfig } from "next";
const config: NextConfig = {
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: { formats: ["image/avif", "image/webp"], qualities: [75, 90] },
};
export default config;
