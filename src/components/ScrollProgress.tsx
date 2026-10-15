import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';

/** Thin gradient bar pinned to the top of the viewport that tracks page scroll. */
export const ScrollProgress: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.3 });

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[9999] pointer-events-none bg-gradient-to-r from-fuchsia-500 via-purple-500 to-violet-400 shadow-[0_0_12px_rgba(168,85,247,0.7)]"
      style={{ scaleX }}
    />
  );
};
