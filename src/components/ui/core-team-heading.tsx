"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import GlowHorizonFM from "./glow-horizon";

export function CoreTeamHeading() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reducedMotion = useReducedMotion();

  return (
    <div ref={ref} className="relative isolate mb-14 overflow-hidden rounded-3xl bg-[#050507]">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {(inView || reducedMotion) && <GlowHorizonFM variant="top" />}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050507]" />
      </div>
      <motion.div
        className="relative z-10 mx-auto flex min-h-72 max-w-2xl flex-col items-center justify-end px-6 pb-10 pt-32 text-center sm:min-h-80 sm:pb-12"
        initial={false}
        animate={{ opacity: inView || reducedMotion ? 1 : 0, y: inView || reducedMotion ? 0 : 16 }}
        transition={{ duration: reducedMotion ? 0 : 0.8, delay: reducedMotion ? 0 : 0.2 }}
      >
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-purple-200 sm:text-xs">The people behind GSX Chennai</p>
        <h2 id="core-team-heading" className="font-space text-4xl font-extrabold tracking-tight text-white sm:text-6xl">Core Team</h2>
        <p className="mt-4 max-w-lg text-sm leading-relaxed text-purple-100/75 sm:text-base">Meet the people connecting our community and building its next chapter.</p>
      </motion.div>
    </div>
  );
}
