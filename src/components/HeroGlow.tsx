import React from 'react';
import { HeroParticles } from './HeroParticles';

interface HeroGlowProps {
  intensity?: 'high' | 'medium' | 'subtle';
  showParticles?: boolean;
  showWatermarkLogo?: boolean;
}

export const HeroGlow: React.FC<HeroGlowProps> = ({ 
  intensity = 'high', 
  showParticles = true,
  showWatermarkLogo = true,
}) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
      {/* Background grid overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-25" />

      {/* Primary giant radial arc from Immersive UI design theme */}
      <div className="glow-arc" />

      {/* Secondary concentric neon-violet ring glow */}
      <div 
        className={`hero-glow-arc ${
          intensity === 'high' ? 'opacity-90' : intensity === 'medium' ? 'opacity-70' : 'opacity-40'
        }`} 
      />
      <div className="hero-glow-ring" />

      {/* Top ambient overhead light flare */}
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-purple-500/20 blur-[90px] rounded-full" />

      {/* Central Ambient GSX Chapter Logo Watermark in Hero Background */}
      {showWatermarkLogo && (
        <div className="absolute top-[38%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[320px] h-[320px] sm:w-[460px] sm:h-[460px] md:w-[540px] md:h-[540px] lg:w-[600px] lg:h-[600px] max-h-[62vh] max-w-[88vw] pointer-events-none select-none flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Luminous vibrant violet halo behind the logo watermark */}
            <div className="absolute inset-0 bg-violet-600/30 blur-[90px] rounded-full" />
            <img
              src="/gsx-logo.png"
              alt=""
              aria-hidden="true"
              className={`w-full h-full object-contain filter drop-shadow-[0_0_75px_rgba(139,92,246,0.7)] transition-opacity duration-700 ${
                intensity === 'high' 
                  ? 'opacity-[0.20] sm:opacity-[0.25]' 
                  : 'opacity-[0.10] sm:opacity-[0.14]'
              }`}
            />
          </div>
        </div>
      )}

      {/* Subtle animated floating particles with faint purple glow */}
      {showParticles && (
        <HeroParticles 
          particleCount={intensity === 'high' ? 38 : intensity === 'medium' ? 24 : 16} 
        />
      )}

      {/* Horizon vignette for depth */}
      <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[var(--app-bg,#050505)] to-transparent" />
    </div>
  );
};
