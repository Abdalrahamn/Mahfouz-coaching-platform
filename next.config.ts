import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  poweredByHeader: false,
  turbopack: { root: process.cwd() },
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};
export default config;
