import React, { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const DESKTOP_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

/**
 * Inertial smooth scrolling for mouse/trackpad users. Touch devices keep native
 * scrolling, and it is skipped entirely when the user prefers reduced motion.
 */
export const SmoothScroll: React.FC = () => {
  useEffect(() => {
    if (!window.matchMedia(DESKTOP_QUERY).matches || window.matchMedia(REDUCED_MOTION_QUERY).matches) {
      return;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.09,
      wheelMultiplier: 0.95,
      allowNestedScroll: true,
      // Let full-screen overlays (modals, search) scroll natively.
      prevent: (node) => node.classList?.contains('fixed') && node.classList.contains('inset-0'),
    });

    return () => lenis.destroy();
  }, []);

  return null;
};
