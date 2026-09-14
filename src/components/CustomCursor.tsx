import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../context/ThemeContext';

interface TrailPoint {
  x: number;
  y: number;
}

export const CustomCursor: React.FC = () => {
  const { isDark } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Position and physics references for high-framerate animation
  const mouseRef = useRef({ x: -100, y: -100 });
  const dotRef = useRef<HTMLDivElement | null>(null);

  // Snake / Comet Tail segments (22 points for smooth trailing ribbon)
  const TAIL_LENGTH = 22;
  const trailRef = useRef<TrailPoint[]>(
    Array.from({ length: TAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas ? canvas.getContext('2d', { alpha: true }) : null;

    let animId: number;

    const resizeCanvas = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX: x, clientY: y } = e;
      mouseRef.current.x = x;
      mouseRef.current.y = y;

      // If initial offscreen, set all trail points to current mouse pos
      if (trailRef.current[0].x < 0) {
        trailRef.current.forEach((pt) => {
          pt.x = x;
          pt.y = y;
        });
      }

      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-active');

      // Check if hovering interactive target
      const target = e.target as HTMLElement | null;
      if (target) {
        const interactive = Boolean(
          target.closest('button, a, input, textarea, select, [role="button"], label, .cursor-pointer, .nav-link')
        );
        setIsHovering(interactive);
      }
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
      document.documentElement.classList.add('custom-cursor-active');
    };

    const handleTouchStart = () => {
      setIsVisible(false);
      document.documentElement.classList.remove('custom-cursor-active');
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    // Render loop
    const render = () => {
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // 1. Update the trailing comet segments
      const trail = trailRef.current;
      trail[0].x = mx;
      trail[0].y = my;

      for (let i = 1; i < trail.length; i++) {
        // Higher lerp near the head, slightly looser near the tail
        const lerpFactor = 0.52 - (i / trail.length) * 0.15;
        trail[i].x += (trail[i - 1].x - trail[i].x) * lerpFactor;
        trail[i].y += (trail[i - 1].y - trail[i].y) * lerpFactor;
      }

      // 2. Position the glowing center point (zero-delay tracking)
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
      }

      // 3. Draw the fluid glowing comet tail on the canvas
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Calculate total distance between head and tail
        const dx = trail[0].x - trail[trail.length - 1].x;
        const dy = trail[0].y - trail[trail.length - 1].y;
        const speedDist = Math.sqrt(dx * dx + dy * dy);

        // Only draw tail if moving or catching up
        if (speedDist > 0.5) {
          // Draw outer neon violet glow layer
          ctx.save();
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';

          // Glow pass
          for (let i = 0; i < trail.length - 1; i++) {
            const p1 = trail[i];
            const p2 = trail[i + 1];
            const progress = i / (trail.length - 1);
            const alpha = Math.max(0, (1 - progress) * (isDark ? 0.45 : 0.35));
            const width = Math.max(1, (1 - progress) * 9);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
            ctx.lineWidth = width;
            ctx.shadowColor = '#8B5CF6';
            ctx.shadowBlur = 12 * (1 - progress);
            ctx.stroke();
          }

          // Core bright violet/white beam pass
          for (let i = 0; i < trail.length - 1; i++) {
            const p1 = trail[i];
            const p2 = trail[i + 1];
            const progress = i / (trail.length - 1);
            const alpha = Math.max(0, (1 - progress) * 0.95);
            const width = Math.max(0.8, (1 - progress) * 4);

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = isDark
              ? `rgba(233, 213, 255, ${alpha})`
              : `rgba(147, 51, 234, ${alpha})`;
            ctx.lineWidth = width;
            ctx.shadowColor = '#C084FC';
            ctx.shadowBlur = 6;
            ctx.stroke();
          }

          ctx.restore();
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      window.removeEventListener('touchstart', handleTouchStart);
      document.documentElement.classList.remove('custom-cursor-active');
    };
  }, [isDark]);

  return (
    <>
      {/* Canvas for the fluid glowing comet tail */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[99998] transition-opacity duration-300"
        style={{ opacity: isVisible ? 1 : 0 }}
      />

      {/* The Luminous Point (No outer circle) */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 pointer-events-none z-[100000] rounded-full transition-all duration-150 ease-out flex items-center justify-center ${
          isHovering
            ? 'w-4 h-4 bg-white shadow-[0_0_14px_#ffffff,0_0_24px_#A855F7,0_0_36px_#8B5CF6]'
            : isClicking
            ? 'w-2 h-2 bg-violet-200 shadow-[0_0_10px_#C084FC]'
            : 'w-2.5 h-2.5 bg-white shadow-[0_0_10px_#A855F7,0_0_18px_#8B5CF6]'
        }`}
        style={{
          opacity: isVisible ? 1 : 0,
          willChange: 'transform',
        }}
      >
        {/* Subtle inner core glow tint */}
        <div
          className={`w-full h-full rounded-full ${
            isHovering ? 'bg-violet-300/60' : 'bg-violet-400/40'
          }`}
        />
      </div>
    </>
  );
};
