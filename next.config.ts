import type { NextConfig } from "next";
const config: NextConfig = {
  output: "export",
  poweredByHeader: false,
  // Dev only: lets the page hydrate when opened via 127.0.0.1 or a LAN IP (e.g. a phone).
  allowedDevOrigins: ["127.0.0.1", "192.168.*.*", "10.*.*.*"],
  turbopack: { root: process.cwd() },
  distDir: process.env.NODE_ENV === "development" ? ".next-dev" : ".next",
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90],
  },
};
export default config;
