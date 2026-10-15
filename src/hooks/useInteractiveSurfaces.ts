import { useEffect } from 'react';

const FINE_POINTER_QUERY = '(hover: hover) and (pointer: fine)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';
const SPOTLIGHT_SELECTOR = '.glass-panel-hover, .glass-card-featured, .spotlight-card';
const TILT_SELECTOR = '.glass-panel-hover, .spotlight-card';
const MAX_TILT_DEG = 6;
const MAGNET_STRENGTH = 0.25;
const MAX_MAGNET_PX = 8;

/**
 * One delegated pointer listener that gives cards a cursor-following spotlight
 * and gentle 3D tilt, and makes `.pill` buttons lean toward the cursor.
 * Mouse/trackpad only; touch devices get the CSS :active press state instead.
 */
export function useInteractiveSurfaces() {
  useEffect(() => {
    if (!window.matchMedia(FINE_POINTER_QUERY).matches) return;
    const allowMotion = !window.matchMedia(REDUCED_MOTION_QUERY).matches;

    let activeCard: HTMLElement | null = null;
    let activePill: HTMLElement | null = null;
    let frame = 0;
    let lastEvent: PointerEvent | null = null;

    const releaseCard = () => {
      if (!activeCard) return;
      activeCard.classList.remove('is-pointer-active');
      activeCard.style.removeProperty('--rx');
      activeCard.style.removeProperty('--ry');
      activeCard = null;
    };

    const releasePill = () => {
      if (!activePill) return;
      activePill.style.removeProperty('--mag-x');
      activePill.style.removeProperty('--mag-y');
      activePill = null;
    };

    const update = () => {
      frame = 0;
      const e = lastEvent;
      if (!e) return;
      const target = e.target instanceof Element ? e.target : null;

      const card = target?.closest<HTMLElement>(SPOTLIGHT_SELECTOR) ?? null;
      if (card !== activeCard) releaseCard();
      if (card) {
        activeCard = card;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.classList.add('is-pointer-active');
        card.style.setProperty('--mx', `${x}px`);
        card.style.setProperty('--my', `${y}px`);
        if (allowMotion && card.matches(TILT_SELECTOR)) {
          const px = x / rect.width - 0.5;
          const py = y / rect.height - 0.5;
          card.style.setProperty('--rx', `${(-py * MAX_TILT_DEG).toFixed(2)}deg`);
          card.style.setProperty('--ry', `${(px * MAX_TILT_DEG).toFixed(2)}deg`);
        }
      }

      const pill = allowMotion ? target?.closest<HTMLElement>('.pill') ?? null : null;
      if (pill !== activePill) releasePill();
      if (pill) {
        activePill = pill;
        const rect = pill.getBoundingClientRect();
        const clamp = (v: number) => Math.max(-MAX_MAGNET_PX, Math.min(MAX_MAGNET_PX, v));
        const dx = clamp((e.clientX - (rect.left + rect.width / 2)) * MAGNET_STRENGTH);
        const dy = clamp((e.clientY - (rect.top + rect.height / 2)) * MAGNET_STRENGTH);
        pill.style.setProperty('--mag-x', `${dx.toFixed(1)}px`);
        pill.style.setProperty('--mag-y', `${dy.toFixed(1)}px`);
      }
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' && e.pointerType !== 'pen') return;
      lastEvent = e;
      if (!frame) frame = requestAnimationFrame(update);
    };

    const handleLeave = () => {
      releaseCard();
      releasePill();
    };

    document.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', handleLeave);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      document.removeEventListener('pointermove', handlePointerMove);
      document.documentElement.removeEventListener('pointerleave', handleLeave);
      handleLeave();
    };
  }, []);
}
