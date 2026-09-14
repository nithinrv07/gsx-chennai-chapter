import React, { useEffect, useState, useRef } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

export interface AnimatedCounterProps {
  /** The target value, e.g. "1,200+", "24+", "18+", "45+", or 1200 */
  value: string | number;
  /** Explicit numeric target to override parsing if needed */
  target?: number;
  /** Custom prefix to display before number */
  prefix?: string;
  /** Custom suffix to display after number (e.g. "+") */
  suffix?: string;
  /** Duration of the count-up animation in milliseconds */
  duration?: number;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Whether the animation should only run once when visible */
  once?: boolean;
  /** Optional parent inView state to synchronize with container reveal */
  inView?: boolean;
  /** Additional CSS class names */
  className?: string;
}

/**
 * Parses numeric strings like "1,200+", "24+", "$50k+" into structured parts.
 */
function parseValue(val: string | number) {
  if (typeof val === 'number') {
    return {
      num: val,
      prefix: '',
      suffix: '',
      hasCommas: false,
      decimals: 0,
    };
  }

  const str = String(val).trim();
  // Match prefix, number with optional commas/decimals, and suffix
  const match = str.match(/^([^\d]*)([\d,.]+)(.*)$/);
  if (!match) {
    return {
      num: 0,
      prefix: '',
      suffix: str,
      hasCommas: false,
      decimals: 0,
    };
  }

  const [, rawPrefix, rawNumber, rawSuffix] = match;
  const hasCommas = rawNumber.includes(',');
  const cleanNumber = rawNumber.replace(/,/g, '');
  const decimalMatch = cleanNumber.match(/\.(\d+)/);
  const decimals = decimalMatch ? decimalMatch[1].length : 0;
  const num = parseFloat(cleanNumber) || 0;

  return {
    num,
    prefix: rawPrefix,
    suffix: rawSuffix,
    hasCommas,
    decimals,
  };
}

/**
 * Ease-out Quartic function for a fast energetic start that gently slows down.
 */
function easeOutQuart(x: number): number {
  return 1 - Math.pow(1 - x, 4);
}

/**
 * AnimatedCounter: An ultra-smooth, performant number counter that counts up
 * from 0 to the target value when entering the viewport.
 */
export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  target: explicitTarget,
  prefix: explicitPrefix,
  suffix: explicitSuffix,
  duration = 2000,
  delay = 0,
  once = true,
  inView,
  className = '',
}) => {
  const { num: parsedNum, prefix: parsedPrefix, suffix: parsedSuffix, hasCommas, decimals } = parseValue(value);
  const targetNumber = explicitTarget !== undefined ? explicitTarget : parsedNum;
  const prefix = explicitPrefix !== undefined ? explicitPrefix : parsedPrefix;
  const suffix = explicitSuffix !== undefined ? explicitSuffix : parsedSuffix;

  const [containerRef, observerVisible] = useIntersectionObserver<HTMLSpanElement>({
    threshold: 0.05,
    rootMargin: '0px 0px 40px 0px',
    freezeOnceVisible: once,
  });

  const isVisible = inView !== undefined ? inView : observerVisible;

  const [displayValue, setDisplayValue] = useState<string>(() => {
    return `${prefix}0${suffix}`;
  });
  const [hasCompleted, setHasCompleted] = useState(false);
  const animationFrameRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Check for prefers-reduced-motion
    if (
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      const finalFormatted = hasCommas
        ? targetNumber.toLocaleString('en-US')
        : decimals > 0
        ? targetNumber.toFixed(decimals)
        : String(targetNumber);
      setDisplayValue(`${prefix}${finalFormatted}${suffix}`);
      setHasCompleted(true);
      return;
    }

    if (!isVisible) {
      if (!once) {
        setDisplayValue(`${prefix}0${suffix}`);
        setHasCompleted(false);
      }
      return;
    }

    // Begin count-up animation
    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const currentNumber = easedProgress * targetNumber;

      let formattedNumber: string;
      if (decimals > 0) {
        formattedNumber = currentNumber.toFixed(decimals);
      } else if (hasCommas) {
        formattedNumber = Math.round(currentNumber).toLocaleString('en-US');
      } else {
        formattedNumber = String(Math.round(currentNumber));
      }

      setDisplayValue(`${prefix}${formattedNumber}${suffix}`);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        // Explicitly set exact target on finish to avoid any rounding discrepancies
        const finalFormatted = hasCommas
          ? targetNumber.toLocaleString('en-US')
          : decimals > 0
          ? targetNumber.toFixed(decimals)
          : String(targetNumber);
        setDisplayValue(`${prefix}${finalFormatted}${suffix}`);
        setHasCompleted(true);
      }
    };

    if (delay > 0) {
      timeoutRef.current = window.setTimeout(() => {
        animationFrameRef.current = requestAnimationFrame(animate);
      }, delay);
    } else {
      animationFrameRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
    };
  }, [isVisible, targetNumber, prefix, suffix, duration, delay, once, hasCommas, decimals]);

  return (
    <span
      ref={containerRef}
      className={`inline-block tabular-nums transition-transform duration-300 ${
        hasCompleted ? 'scale-100' : 'scale-[0.99]'
      } ${className}`}
      aria-label={`${prefix}${targetNumber}${suffix}`}
    >
      {displayValue}
    </span>
  );
};
