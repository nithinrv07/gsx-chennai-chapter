"use client";

import { motion, useReducedMotion } from "motion/react";

const EASE = [0.16, 1, 0.3, 1] as const;
const DURATION = 2;

export type GlowHorizonVariant = "top" | "bottom" | "left" | "right";

const VARIANTS: Record<GlowHorizonVariant, {
  axis: "x" | "y";
  scaleAxis: "scaleX" | "scaleY";
  enterPct: string;
  restPct: string;
}> = {
  top: { axis: "y", scaleAxis: "scaleY", enterPct: "-100%", restPct: "-50%" },
  bottom: { axis: "y", scaleAxis: "scaleY", enterPct: "100%", restPct: "50%" },
  left: { axis: "x", scaleAxis: "scaleX", enterPct: "100%", restPct: "50%" },
  right: { axis: "x", scaleAxis: "scaleX", enterPct: "-100%", restPct: "-50%" },
};

export interface GlowHorizonProps {
  className?: string;
  variant?: GlowHorizonVariant;
}

export default function GlowHorizonFM({ className, variant = "top" }: GlowHorizonProps) {
  const { axis, scaleAxis, enterPct, restPct } = VARIANTS[variant];
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden="true"
      className={"pointer-events-none absolute w-full h-full " + (className ?? "")}
      // Only transform + opacity animate: animating filter here forced every blurred arc to repaint each frame.
      style={{ isolation: "isolate", willChange: "transform, opacity" }}
      initial={reducedMotion ? false : { [axis]: enterPct, [scaleAxis]: 1.5, opacity: 0 }}
      animate={{ [axis]: restPct, [scaleAxis]: 1, opacity: 1 }}
      transition={{ duration: reducedMotion ? 0 : DURATION, ease: EASE }}
    >
      <Arc variant={variant} color="#FFFFFF" size="132%" boxShadow="0px -4px 23px 0px #ffffffb5" delay={1.2} />
      <Arc variant={variant} color="#A558FB" size="120%" initialOffset="10%" blur={31} delay={0.6} />
      <Arc variant={variant} color="#4922E5" size="124%" initialOffset="10%" blur={21} delay={0} />
      <Arc variant={variant} color="#000" size="120%" initialOffset="10%" blur={51} delay={0} />
    </motion.div>
  );
}

function Arc({ variant, color, size, initialOffset, blur, boxShadow, delay }: {
  variant: GlowHorizonVariant;
  color: string;
  size: string;
  initialOffset?: string;
  blur?: number;
  boxShadow?: string;
  delay: number;
}) {
  const reducedMotion = useReducedMotion();
  const scale = parseFloat(size) / 100;
  const { axis, enterPct } = VARIANTS[variant];
  const sign = enterPct.startsWith("-") ? -1 : 1;
  const startPct = initialOffset ? `${sign * Math.abs(parseFloat(initialOffset) - 50)}%` : undefined;

  return (
    <motion.div
      aria-hidden="true"
      className="absolute inset-0 rounded-[100%]"
      // will-change keeps each statically blurred arc on its own cached layer while it slides.
      style={{ scale, background: color, willChange: "transform", ...(blur !== undefined && { filter: `blur(${blur}px)` }), ...(boxShadow && { boxShadow }) }}
      initial={!reducedMotion && startPct ? { [axis]: startPct } : false}
      animate={startPct ? { [axis]: 0 } : undefined}
      transition={{ duration: reducedMotion ? 0 : DURATION, ease: EASE, delay: reducedMotion ? 0 : delay }}
    />
  );
}
