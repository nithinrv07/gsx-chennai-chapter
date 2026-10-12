"use client";

import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Pause, Play } from 'lucide-react';
import type { Pane } from 'tweakpane';

export const DEFAULT_SCROLL_WORDS = [
  'design.', 'prototype.', 'solve.', 'build.', 'develop.', 'debug.', 'learn.',
  'cook.', 'ship.', 'prompt.', 'collaborate.', 'create.', 'inspire.', 'follow.',
  'innovate.', 'test.', 'optimize.', 'teach.', 'visualize.', 'transform.', 'scale.', 'do it.',
];

interface ScrollAnimationProps {
  words?: string[];
  showControls?: boolean;
  onJoin?: () => void;
}

export default function ScrollAnimation({ words = DEFAULT_SCROLL_WORDS, showControls = false, onJoin }: ScrollAnimationProps) {
  const rootRef = useRef<HTMLElement>(null);
  const controlsRef = useRef<HTMLDivElement>(null);
  const [motionEnabled, setMotionEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const itemsToRender = useMemo(() => words.filter(word => word.trim()), [words]);
  const configRef = useRef({
    theme: 'dark', animate: true, snap: false, start: 270, end: 320, scroll: false, debug: false,
  });

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || !itemsToRender.length) return;
    gsap.registerPlugin(ScrollTrigger);
    const items = Array.from((root as HTMLElement).querySelectorAll<HTMLElement>('[data-scroll-word]'));
    const config = configRef.current;
    config.animate = motionEnabled;
    let context: gsap.Context | undefined;
    let pane: Pane | undefined;
    let disposed = false;
    let frame = 0;

    const update = () => {
      context?.revert();
      root.dataset.theme = config.theme;
      root.dataset.animate = String(config.animate && !reducedMotion);
      root.dataset.snap = String(config.snap);
      root.dataset.debug = String(config.debug);
      root.dataset.syncScrollbar = String(config.scroll);
      root.style.setProperty('--start', String(config.start));
      root.style.setProperty('--end', String(config.end));
      root.style.setProperty('--hue', String(config.start));
      root.style.setProperty('--chroma', '0.12');
      if (!config.animate || reducedMotion || items.length < 2) return;

      context = gsap.context(() => {
        gsap.set(items, { opacity: (index: number) => index === 0 ? 1 : .22 });
        const dimmer = gsap.timeline()
          .to(items.slice(1), { opacity: 1, stagger: .5, duration: .5, ease: 'none' })
          .to(items.slice(0, -1), { opacity: .22, stagger: .5, duration: .5, ease: 'none' }, 0);
        const dimmerTrigger = ScrollTrigger.create({
          trigger: items[0], endTrigger: items[items.length - 1],
          start: 'center center', end: 'center center',
          animation: dimmer, scrub: .2,
          ...(config.snap ? { snap: { snapTo: 1 / (items.length - 1), delay: .25, duration: { min: .1, max: .3 } } } : {}),
          markers: config.debug,
        });
        gsap.fromTo(root, { '--hue': config.start }, {
          '--hue': config.end, ease: 'none',
          scrollTrigger: { trigger: items[0], endTrigger: items[items.length - 1], start: 'center center', end: 'center center', scrub: .2 },
        });
        gsap.fromTo(root, { '--chroma': .12 }, {
          '--chroma': .25, ease: 'none',
          scrollTrigger: { trigger: items[0], start: 'center center+=40', end: 'center center', scrub: .2 },
        });
        gsap.fromTo(root, { '--chroma': .25 }, {
          '--chroma': .12, ease: 'none',
          scrollTrigger: { trigger: items[items.length - 2], start: 'center center', end: 'center center-=40', scrub: .2 },
        });
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => { if (!disposed) dimmerTrigger.refresh(); });
      }, root);
    };

    update();
    // The configuration pane is opt-in; it is never shown to normal site visitors.
    if (showControls && controlsRef.current) {
      const container = controlsRef.current;
      void import('tweakpane').then(({ Pane }) => {
        if (disposed) return;
        pane = new Pane({ title: 'Scroll animation settings', expanded: false, container });
        pane.addBinding(config, 'animate', { label: 'Animate' }).on('change', event => setMotionEnabled(event.value));
        pane.addBinding(config, 'snap', { label: 'Snap' });
        pane.addBinding(config, 'start', { label: 'Hue Start', min: 0, max: 1000, step: 1 });
        pane.addBinding(config, 'end', { label: 'Hue End', min: 0, max: 1000, step: 1 });
        pane.addBinding(config, 'scroll', { label: 'Scrollbar cue' });
        pane.addBinding(config, 'debug', { label: 'Debug' });
        pane.addBinding(config, 'theme', { label: 'Theme', options: { Dark: 'dark', Light: 'light' } });
        pane.on('change', update);
      });
    }
    const refresh = () => { if (!disposed) ScrollTrigger.refresh(); };
    void document.fonts?.ready.then(refresh);

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      context?.revert();
      pane?.dispose();
    };
  }, [itemsToRender, motionEnabled, reducedMotion, showControls]);

  if (!itemsToRender.length) return null;

  return (
    <section ref={rootRef} id="you-can-scroll" className="gsx-scroll" aria-labelledby="scroll-animation-heading"
      data-animate={motionEnabled && !reducedMotion} data-theme="dark"
      style={{ '--count': itemsToRender.length } as React.CSSProperties}>
      <div className="gsx-scroll-intro">
        <div>
          <span className="gsx-scroll-eyebrow">Beyond campuses. Beyond limits.</span>
          <h2 id="scroll-animation-heading">A community of possibilities.</h2>
          <p>Bring your curiosity. Discover what you can do together.</p>
        </div>
        <button type="button" className="gsx-scroll-motion" disabled={reducedMotion}
          aria-pressed={!motionEnabled} aria-label={motionEnabled ? 'Pause scroll animation' : 'Resume scroll animation'}
          onClick={() => setMotionEnabled(enabled => !enabled)}>
          {motionEnabled && !reducedMotion ? <Pause size={14} aria-hidden="true" /> : <Play size={14} aria-hidden="true" />}
          {reducedMotion ? 'Reduced motion' : motionEnabled ? 'Pause motion' : 'Resume motion'}
        </button>
      </div>
      <p className="sr-only">Together, you can {itemsToRender.join(' ')}</p>
      <div className="gsx-scroll-content" aria-hidden="true">
        <span className="gsx-scroll-prefix">you can</span>
        <ul className="gsx-scroll-words">
          {itemsToRender.map((word, index) => (
            <li key={index} data-scroll-word style={{ '--i': index } as React.CSSProperties}>{word}</li>
          ))}
        </ul>
      </div>
      <div className="gsx-scroll-outro">
        <span>Learn. Build. Connect. Grow. — together.</span>
        {onJoin && <button type="button" onClick={onJoin}>Find your place in GSX <ArrowRight size={16} aria-hidden="true" /></button>}
      </div>
      {showControls && <div ref={controlsRef} className="gsx-scroll-settings" />}
    </section>
  );
}
