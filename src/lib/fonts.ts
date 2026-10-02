import { Barlow_Condensed, Manrope, Cairo } from "next/font/google";
export const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});
export const body = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
export const arabic = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-arabic",
  display: "swap",
});
