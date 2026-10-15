import { useEffect, useRef, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import GlowHorizonDemo from "./ui/glow-horizon-demo";

// Keep the site mounted underneath so its content loads during the intro.
export function IntroScreen({ children }: { children: ReactNode }) {
  const [visible, setVisible] = useState(() => !window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [blocking, setBlocking] = useState(visible);
  const skipRef = useRef<HTMLButtonElement>(null);
  const restoreFocus = useRef(false);

  useEffect(() => {
    if (!visible) return;
    const dismiss = () => {
      restoreFocus.current = document.activeElement === skipRef.current;
      setVisible(false);
    };
    const timer = window.setTimeout(dismiss, 3300);
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreferenceChange = () => { if (preference.matches) dismiss(); };
    preference.addEventListener("change", onPreferenceChange);
    return () => {
      window.clearTimeout(timer);
      preference.removeEventListener("change", onPreferenceChange);
    };
  }, [visible]);

  useEffect(() => {
    if (!blocking) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [blocking]);

  return (
    <>
      <div inert={blocking ? true : undefined} aria-hidden={blocking ? true : undefined}>{children}</div>
      <AnimatePresence onExitComplete={() => {
        setBlocking(false);
        if (restoreFocus.current) {
          requestAnimationFrame(() => document.querySelector<HTMLElement>("main")?.focus({ preventScroll: true }));
        }
      }}>
        {visible && (
          <motion.div
            key="gsx-intro"
            className="gsx-intro fixed inset-0 z-[99999] bg-[#050507]"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            aria-label="Welcome to GSX Chennai Chapter"
          >
            <GlowHorizonDemo />
            <button
              ref={skipRef}
              type="button"
              onClick={() => { restoreFocus.current = document.activeElement === skipRef.current; setVisible(false); }}
              className="absolute bottom-8 right-6 flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-5 py-3 text-sm text-white/80 transition-colors hover:border-purple-300 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-purple-300 sm:bottom-10 sm:right-10"
            >
              Skip intro <ArrowRight size={16} aria-hidden="true" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
