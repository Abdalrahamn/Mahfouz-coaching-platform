import localFont from "next/font/local";

export const display = localFont({
  src: [
    {
      path: "../../brand-system/assets/fonts/barlow-condensed/600.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../brand-system/assets/fonts/barlow-condensed/700.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../brand-system/assets/fonts/barlow-condensed/800.woff2",
      weight: "800",
      style: "normal",
    },
  ],
  variable: "--font-display",
  display: "swap",
});
export const body = localFont({
  src: "../../brand-system/assets/fonts/manrope/variable.woff2",
  weight: "200 800",
  variable: "--font-body",
  display: "swap",
});
export const arabic = localFont({
  src: [
    {
      path: "../../brand-system/assets/fonts/cairo/arabic-variable.woff2",
      weight: "200 1000",
      style: "normal",
    },
    {
      path: "../../brand-system/assets/fonts/cairo/latin-variable.woff2",
      weight: "200 1000",
      style: "normal",
    },
  ],
  variable: "--font-arabic",
  display: "swap",
});
