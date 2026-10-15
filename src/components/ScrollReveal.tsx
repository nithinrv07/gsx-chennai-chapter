import React, { ElementType, ReactNode, CSSProperties } from 'react';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';

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
  /** Starting blur radius in pixels (0 disables the focus-in blur) */
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
 * IntersectionObserver-driven "focus-in" entrance: content rises, scales up and
 * sharpens from a soft blur, using GPU-friendly transform/opacity/filter transitions.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = 'div',
  variant = 'fade-up',
  delay = 0,
  duration = 900,
  distance = 40,
  blur = 10,
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
  const getInitialTransform = (): string => {
    switch (variant) {
      case 'fade-up':
        return `translate3d(0, ${distance}px, 0) scale(0.97)`;
      case 'fade-down':
        return `translate3d(0, -${distance}px, 0) scale(0.97)`;
      case 'fade-left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'fade-right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'zoom-in':
        return 'scale(0.92)';
      case 'fade':
      default:
        return 'none';
    }
  };

  // Elements come into focus: they rise, scale up slightly and sharpen from a soft blur.
  const animationStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(),
    filter: isVisible ? 'none' : `blur(${blur}px)`,
    transitionProperty: 'opacity, transform, filter',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.22, 1, 0.36, 1)',
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
