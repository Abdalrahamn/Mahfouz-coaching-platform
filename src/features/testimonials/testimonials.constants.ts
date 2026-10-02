import { assets } from "@/config/assets";
export const COUNT = assets.feedback.length;
export const CLONES = 3;
export const AUTOPLAY_INTERVAL = 3800;
export const INTERACTION_HOLD = 6000;
export const SCROLL_SETTLE = 180;
export const slides = [
  ...assets.feedback.slice(-CLONES),
  ...assets.feedback,
  ...assets.feedback.slice(0, CLONES),
];
