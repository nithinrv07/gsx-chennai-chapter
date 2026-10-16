import React, { useEffect, useRef } from 'react';
import { ArrowRight } from 'lucide-react';

// Inspired by Jhey Tompkins' "you can scroll" demo, rebuilt as a pinned one-word slot.
const WORDS = [
  'learn.', 'build.', 'code.', 'design.', 'collaborate.',
  'mentor.', 'lead.', 'innovate.', 'ship.', 'grow.',
];

const HUE_START = 265; // violet
const HUE_END = 330;   // pink
/** Scroll distance (in viewport heights) spent on each word. */
const VH_PER_WORD = 0.22;

interface YouCanScrollProps {
  onJoin?: () => void;
}

/**
 * The section pins to the screen while "you can ___" rolls through one word at a time.
 * Scrolling down advances the word, scrolling up rolls it back; then the page continues.
 */
export default function YouCanScroll({ onJoin }: YouCanScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const stripRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const strip = stripRef.current;
    if (!section || !strip) return;
    const items = Array.from(strip.children) as HTMLElement[];

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = section.getBoundingClientRect();
      const travel = rect.height - window.innerHeight || 1;
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const position = progress * (WORDS.length - 1);

      strip.style.transform = `translate3d(0, calc(${(-position).toFixed(4)} * var(--line)), 0)`;
      section.style.setProperty('--hue', (HUE_START + (HUE_END - HUE_START) * progress).toFixed(1));
      items.forEach((item, i) => {
        const lit = Math.max(0, 1 - Math.abs(i - position));
        item.style.setProperty('--lit', lit.toFixed(3));
      });
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
    <section
      ref={sectionRef}
      className="you-can-scroll"
      aria-labelledby="you-can-heading"
      style={{ height: `calc(100vh + ${(WORDS.length - 1) * VH_PER_WORD * 100}vh)` }}
    >
      <div className="you-can-stage">
        <h2 id="you-can-heading" className="you-can-line">
          <span aria-hidden="true">you can</span>
          <span className="you-can-window" aria-hidden="true">
            <ul ref={stripRef} className="you-can-strip">
              {WORDS.map((word) => (
                <li key={word}>{word}</li>
              ))}
            </ul>
          </span>
          <span className="sr-only">At GSX Chennai you can learn, build, collaborate, lead and grow.</span>
        </h2>
        {onJoin && (
          <button type="button" onClick={onJoin} className="pill primary !py-4 !px-8 inline-flex items-center gap-2 cursor-pointer mt-10 sm:mt-14">
            <span>Start with GSX Chennai</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </section>
  );
}
