import React, { ElementType, ReactNode, CSSProperties } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

const SMALL_SCREEN_QUERY = '(max-width: 767px)';

/** Phones get a shorter rise so content never feels like it is lagging behind. */
const isSmallScreen = () =>
  typeof window !== 'undefined' && window.matchMedia(SMALL_SCREEN_QUERY).matches;

export type RevealVariant = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'fade' | 'zoom-in';

export interface ScrollRevealProps {
  children: ReactNode;
  /** HTML element to render (div, section, article, etc.) */
  as?: ElementType;
  /** Animation direction / style */
  variant?: RevealVariant;
  /** Delay before animation starts in milliseconds */
  delay?: number;
  /** Animation duration in milliseconds */
  duration?: number;
  /** Pixel distance for slide animations */
  distance?: number;
  /** Optional starting blur radius in pixels (0 = no blur) */
  blur?: number;
  /** IntersectionObserver threshold ratio (0.0 to 1.0) */
  threshold?: number;
  /** IntersectionObserver rootMargin */
  rootMargin?: string;
  /** Whether the element animates only once (true) or every time it enters view (false) */
  once?: boolean;
  /** Helper index for cascading/staggered grid lists */
  staggerIndex?: number;
  /** Time offset per stagger index in milliseconds (default 90ms) */
  staggerInterval?: number;
  /** Custom CSS classes */
  className?: string;
  /** DOM id attribute */
  id?: string;
  /** Inline CSS styles */
  style?: CSSProperties;
}

/**
 * ScrollReveal: Wraps any page section, container, or card with a subtle,
 * IntersectionObserver-driven entrance: content fades in while gliding up from
 * well below its resting place, using GPU-friendly transform/opacity transitions.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = 'div',
  variant = 'fade-up',
  delay = 0,
  duration = 1000,
  distance = 150,
  blur = 0,
  threshold = 0.1,
  rootMargin = '0px 0px -10% 0px',
  once = true,
  staggerIndex,
  staggerInterval = 90,
  className = '',
  id,
  style = {},
}) => {
  const [ref, isVisible] = useIntersectionObserver<HTMLElement>({
    threshold,
    rootMargin,
    freezeOnceVisible: once,
  });

  const computedDelay = staggerIndex !== undefined ? delay + staggerIndex * staggerInterval : delay;

  // Build the initial transform based on variant
  const rise = isSmallScreen() ? Math.min(distance, 80) : distance;
  const getInitialTransform = (): string => {
    switch (variant) {
      case 'fade-up':
        return `translate3d(0, ${rise}px, 0)`;
      case 'fade-down':
        return `translate3d(0, -${rise}px, 0)`;
      case 'fade-left':
        return `translate3d(-${Math.min(rise, 40)}px, 0, 0)`;
      case 'fade-right':
        return `translate3d(${Math.min(rise, 40)}px, 0, 0)`;
      case 'zoom-in':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'none';
    }
  };

  // Elements fade in while gliding up from well below, settling like a soft spring.
  const animationStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(),
    filter: isVisible || !blur ? 'none' : `blur(${blur}px)`,
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms, ${duration}ms, ${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${computedDelay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform, filter',
    ...style,
  };

  return (
    <Component
      ref={ref}
      id={id}
      className={`scroll-reveal-box ${isVisible ? 'scroll-reveal-visible' : 'scroll-reveal-hidden'} ${className}`}
      style={animationStyle}
    >
      {children}
    </Component>
  );
};
