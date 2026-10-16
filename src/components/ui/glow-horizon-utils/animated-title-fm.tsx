"use client";

import { motion, useReducedMotion } from "motion/react";

export function AnimatedTitleFM({ open }: { open: boolean }) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className="relative z-10 px-6 text-center text-white"
      initial={reducedMotion ? false : { opacity: 0, y: 24, filter: "blur(8px)" }}
      animate={{ opacity: open ? 1 : 0, y: open ? 0 : 24, filter: open ? "blur(0px)" : "blur(8px)" }}
      transition={{ duration: reducedMotion ? 0 : 1, delay: reducedMotion ? 0 : 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      <p className="mb-4 text-[10px] font-medium uppercase tracking-[0.35em] text-purple-200 sm:text-xs">A community. A spark. A new horizon.</p>
      <h1 className="font-space text-6xl font-bold tracking-[-0.06em] sm:text-8xl">GSX<span className="text-[#b77aff]">.</span></h1>
      <p className="mt-3 text-sm uppercase tracking-[0.3em] text-white/80 sm:text-lg">Chennai Chapter</p>
      <p className="mt-8 text-xs tracking-widest text-purple-200/70 sm:text-sm">Connect. Collaborate. Create.</p>
    </motion.div>
  );
}
