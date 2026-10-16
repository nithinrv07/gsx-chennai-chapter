import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

// Inspired by Jhey Tompkins' "you can scroll" demo, rebuilt so it only touches its own section.
const WORDS = [
  'learn.', 'build.', 'code.', 'design.', 'prototype.', 'debug.', 'collaborate.',
  'mentor.', 'speak.', 'lead.', 'create.', 'innovate.', 'ship.', 'grow.', 'do it.',
];

const HUE_START = 265; // violet
const HUE_END = 330;   // pink
const DIM = 0.18;

interface YouCanScrollProps {
  onJoin?: () => void;
}

/**
 * Sticky "you can" beside a column of words; whichever word crosses the middle of the
 * screen lights up while the accent hue drifts from violet to pink across the list.
 */
export default function YouCanScroll({ onJoin }: YouCanScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const list = listRef.current;
    if (!section || !list) return;
    const items = Array.from(list.children) as HTMLElement[];

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => (item.style.opacity = '1'));
      section.style.setProperty('--hue', String(HUE_START));
      return;
    }

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      const first = items[0].getBoundingClientRect();
      const last = items[items.length - 1].getBoundingClientRect();
      const span = last.top - first.top || 1;
      const progress = Math.min(1, Math.max(0, (mid - (first.top + first.height / 2)) / span));
      section.style.setProperty('--hue', (HUE_START + (HUE_END - HUE_START) * progress).toFixed(1));

      for (const item of items) {
        const r = item.getBoundingClientRect();
        // 1 at the centre line, fading to DIM one line-height away.
        const closeness = Math.max(0, 1 - Math.abs(r.top + r.height / 2 - mid) / (r.height * 1.1));
        item.style.opacity = (DIM + (1 - DIM) * closeness).toFixed(3);
        item.style.setProperty('--lit', closeness.toFixed(3));
      }
    };

    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };

    // Only do per-frame work while the section is on screen.
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
      if (active) onScroll();
    });
    observer.observe(section);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <section ref={sectionRef} className="you-can-scroll" aria-labelledby="you-can-heading">
      <div className="you-can-inner">
        <h2 id="you-can-heading" className="you-can-lead">
          <span aria-hidden="true">you can</span>
          <span className="sr-only">At GSX Chennai you can learn, build, collaborate, lead and grow.</span>
        </h2>
        <ul ref={listRef} className="you-can-list" aria-hidden="true">
          {WORDS.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>
      {onJoin && (
        <div className="flex justify-center px-4">
          <button type="button" onClick={onJoin} className="pill primary !py-4 !px-8 inline-flex items-center gap-2 cursor-pointer">
            <span>Start with GSX Chennai</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
