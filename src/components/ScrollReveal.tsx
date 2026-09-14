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
 * high-performance IntersectionObserver-driven entrance animation.
 * Uses GPU-accelerated transforms (translate3d/opacity) and smooth cubic-bezier easing.
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  as: Component = 'div',
  variant = 'fade-up',
  delay = 0,
  duration = 650,
  distance = 24,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
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
        return `translate3d(0, ${distance}px, 0)`;
      case 'fade-down':
        return `translate3d(0, -${distance}px, 0)`;
      case 'fade-left':
        return `translate3d(-${distance}px, 0, 0)`;
      case 'fade-right':
        return `translate3d(${distance}px, 0, 0)`;
      case 'zoom-in':
        return 'scale3d(0.96, 0.96, 1)';
      case 'fade':
      default:
        return 'none';
    }
  };

  const animationStyle: CSSProperties = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translate3d(0, 0, 0) scale3d(1, 1, 1)' : getInitialTransform(),
    transitionProperty: 'opacity, transform',
    transitionDuration: `${duration}ms`,
    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
    transitionDelay: `${computedDelay}ms`,
    willChange: isVisible ? 'auto' : 'opacity, transform',
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
