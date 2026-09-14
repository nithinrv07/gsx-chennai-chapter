import React, { useEffect, useRef } from 'react';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSpeed: number;
  pulseOffset: number;
  r: number;
  g: number;
  b: number;
}

interface HeroParticlesProps {
  className?: string;
  particleCount?: number;
}

export const HeroParticles: React.FC<HeroParticlesProps> = ({ 
  className = '',
  particleCount = 38 
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = container.offsetWidth);
    let height = (canvas.height = container.offsetHeight);

    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    // Palette of delicate purple/violet glow tones
    const colorPalette = isDark ? [
      { r: 168, g: 85, b: 247 }, // violet-500
      { r: 192, g: 132, b: 252 }, // purple-400
      { r: 139, g: 92, b: 246 }, // violet-400
      { r: 216, g: 180, b: 254 }, // purple-300
    ] : [
      { r: 147, g: 51, b: 234 }, // violet-600
      { r: 126, g: 34, b: 206 }, // purple-700
      { r: 109, g: 40, b: 217 }, // violet-700
      { r: 168, g: 85, b: 247 }, // violet-500
    ];

    // Initialize particles
    const particles: Particle[] = [];
    const count = Math.max(15, Math.min(particleCount, Math.floor((width * height) / 22000)));

    for (let i = 0; i < count; i++) {
      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        // Very gentle floating drift with a slight natural buoyancy upwards
        vx: (Math.random() - 0.5) * 0.35,
        vy: -0.1 - Math.random() * 0.25,
        radius: 1.2 + Math.random() * 1.8,
        baseAlpha: isDark ? (0.2 + Math.random() * 0.3) : (0.25 + Math.random() * 0.25),
        alpha: 0.2,
        pulseSpeed: 0.008 + Math.random() * 0.015,
        pulseOffset: Math.random() * Math.PI * 2,
        r: color.r,
        g: color.g,
        b: color.b,
      });
    }

    let isVisible = true;
    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Resize observer for crisp dimensions
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === container) {
          const newWidth = Math.floor(entry.contentRect.width);
          const newHeight = Math.floor(entry.contentRect.height);
          if (newWidth > 0 && newHeight > 0 && (newWidth !== width || newHeight !== height)) {
            width = canvas.width = newWidth;
            height = canvas.height = newHeight;
          }
        }
      }
    });
    resizeObserver.observe(container);

    let time = 0;

    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      time += 0.016; // ~60fps step
      ctx.clearRect(0, 0, width, height);

      // Render connecting filaments between nearby particles for ambient depth
      const maxDistance = 90;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const filamentAlpha = (1 - dist / maxDistance) * (isDark ? 0.06 : 0.08);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${filamentAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      // Render and update individual particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Animate gentle shimmer/pulsing opacity
        const pulse = Math.sin(time * p.pulseSpeed * 60 + p.pulseOffset);
        p.alpha = Math.max(0.08, p.baseAlpha + pulse * 0.15);

        // Draw particle with faint purple glowing radial aura
        const glowRadius = p.radius * 3.5;
        const gradient = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          glowRadius
        );
        gradient.addColorStop(0, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha})`);
        gradient.addColorStop(0.4, `rgba(${p.r}, ${p.g}, ${p.b}, ${p.alpha * 0.5})`);
        gradient.addColorStop(1, `rgba(${p.r}, ${p.g}, ${p.b}, 0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // Core bright center
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha * 0.8})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // If reduced motion is not preferred, move particle gently
        if (!prefersReducedMotion) {
          p.x += p.vx;
          p.y += p.vy;

          // Boundary wrap-around
          if (p.x < -10) p.x = width + 10;
          if (p.x > width + 10) p.x = -10;
          if (p.y < -10) {
            p.y = height + 10;
            p.x = Math.random() * width;
          }
          if (p.y > height + 10) p.y = -10;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      resizeObserver.disconnect();
    };
  }, [particleCount, isDark]);

  return (
    <div 
      ref={containerRef} 
      className={`absolute inset-0 pointer-events-none overflow-hidden z-[1] ${className}`}
      aria-hidden="true"
    >
      <canvas 
        ref={canvasRef} 
        className="w-full h-full block" 
      />
    </div>
  );
};
