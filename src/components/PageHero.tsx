import React from 'react';
import { HeroGlow } from './HeroGlow';

interface PageHeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, description }) => (
  <section className="relative pt-36 sm:pt-40 md:pt-44 pb-16 sm:pb-20 min-h-[400px] sm:min-h-[460px] md:min-h-[500px] flex flex-col justify-center overflow-hidden text-center">
    <HeroGlow intensity="medium" />
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 relative z-10">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8">{title}</h1>
      <p className="text-base sm:text-lg text-gray-300/90 max-w-2xl mx-auto leading-relaxed">{description}</p>
    </div>
  </section>
);
