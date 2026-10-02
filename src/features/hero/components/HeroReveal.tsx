"use client";
import { motion, useReducedMotion } from "motion/react";
export function HeroReveal({ children }: { children: React.ReactNode }) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={false}
      animate={{ opacity: reduced ? 1 : [0.85, 1], y: reduced ? 0 : [10, 0] }}
      transition={{ duration: reduced ? 0 : 0.65 }}
      className="hero-copy"
    >
      {children}
    </motion.div>
  );
}
