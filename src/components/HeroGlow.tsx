import React, { useState } from 'react';
import { HeroParticles } from './HeroParticles';

// Curves follow the bright ribbons in the supplied 1672 × 941 background.
const ribbons = [
  'M-30 511 C95 494 130 467 265 444 C361 428 267 415 352 400 C462 383 620 379 756 362',
  'M920 391 C1070 416 1423 421 1510 481 C1638 568 1364 577 1414 645 C1455 704 1577 745 1688 766',
  'M-40 734 C111 676 135 638 281 621 C367 601 430 628 523 638',
];

export interface HeroGlowProps {
  variant?: 'skyline' | 'ambient';
  intensity?: 'high' | 'medium' | 'subtle';
  showParticles?: boolean;
  showWatermarkLogo?: boolean;
}

export const HeroGlow: React.FC<HeroGlowProps> = ({
  variant,
  intensity,
  showParticles = true,
  showWatermarkLogo = true,
}) => {
  const [paused, setPaused] = useState(false);

  // If intensity is explicitly passed without variant, treat as ambient subpage glow
  const isAmbient = variant === 'ambient' || (intensity !== undefined && variant !== 'skyline');

  if (isAmbient) {
    const actualIntensity = intensity || 'medium';
    return (
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0" aria-hidden="true">
        {/* Background grid overlay softly dissolved at bottom */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20 [mask-image:linear-gradient(to_bottom,black_30%,transparent_95%)]" />

        {/* Primary giant radial arc from Immersive UI design theme */}
        <div className="glow-arc" />

        {/* Secondary concentric neon-violet ring glow */}
        <div
          className={`hero-glow-arc ${
            actualIntensity === 'high' ? 'opacity-90' : actualIntensity === 'medium' ? 'opacity-70' : 'opacity-40'
          }`}
        />
        <div className="hero-glow-ring" />

        {/* Top ambient overhead light flare softly illuminating the header space */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 w-[700px] h-[240px] bg-purple-500/15 blur-[90px] rounded-full pointer-events-none" />

        {/* Central Radial Atmospheric Glow centered behind title & watermark */}
        <div className="absolute top-[52%] sm:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[640px] sm:w-[850px] h-[360px] sm:h-[460px] bg-purple-600/20 sm:bg-purple-600/25 blur-[100px] rounded-full pointer-events-none" />

        {/* Central Ambient GSX Chapter Logo Watermark in Subpage Background - moved down and extended */}
        {showWatermarkLogo && (
          <div className="absolute top-[52%] sm:top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] h-[340px] sm:w-[480px] sm:h-[480px] md:w-[560px] md:h-[560px] lg:w-[620px] lg:h-[620px] max-h-[65vh] max-w-[88vw] pointer-events-none select-none flex items-center justify-center">
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="absolute inset-0 bg-violet-600/30 blur-[90px] rounded-full" />
              <img
                src="/gsx-logo.png"
                alt=""
                aria-hidden="true"
                className={`w-full h-full object-contain filter drop-shadow-[0_0_75px_rgba(139,92,246,0.7)] transition-opacity duration-700 ${
                  actualIntensity === 'high'
                    ? 'opacity-[0.20] sm:opacity-[0.25]'
                    : 'opacity-[0.10] sm:opacity-[0.14]'
                }`}
              />
            </div>
          </div>
        )}

        {showParticles && (
          <HeroParticles
            particleCount={actualIntensity === 'high' ? 38 : actualIntensity === 'medium' ? 24 : 16}
          />
        )}

        {/* Deep, ultra-smooth bottom fade seamlessly dissolving into page background */}
        <div className="absolute bottom-0 inset-x-0 h-40 sm:h-52 bg-gradient-to-t from-[#080414] via-[#080414]/85 to-transparent pointer-events-none" />
      </div>
    );
  }

  // Skyline Animated Neon Ribbon Background (from gsx-react)
  return (
    <>
      <div className={`animated-background${paused ? ' is-paused' : ''}`} aria-hidden="true">
        <div className="art" />
        {/* Luminous cosmic ambient glow at the top directly behind the navbar */}
        <div
          className="absolute top-0 inset-x-0 h-64 pointer-events-none z-0"
          style={{
            background:
              'radial-gradient(ellipse 95% 180px at 50% -20px, rgba(168, 85, 247, 0.5) 0%, rgba(126, 34, 206, 0.25) 45%, rgba(88, 28, 135, 0.1) 70%, transparent 100%)',
          }}
        />
        <svg className="neon-ribbons" viewBox="0 0 1672 941" preserveAspectRatio="none">
          {ribbons.map((d, i) => (
            <g key={d}>
              <path className="ribbon-halo" d={d} />
              <path className="ribbon-base" d={d} />
              <path className={`ribbon-travel ribbon-travel-${i}`} d={d} pathLength="100" />
            </g>
          ))}
        </svg>
      </div>
      <div className="shade" aria-hidden="true" />
      <button
        className="motion-toggle"
        onClick={() => setPaused(!paused)}
        aria-pressed={paused}
        aria-label={paused ? 'Play background animation' : 'Pause background animation'}
      >
        {paused ? '▶ Play motion' : 'Ⅱ Pause motion'}
      </button>
    </>
  );
};

export default HeroGlow;
