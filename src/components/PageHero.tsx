import React from 'react';
import { HeroGlow } from './HeroGlow';

interface PageHeroProps {
  title: React.ReactNode;
  description: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, description }) => (
  <section className="relative pt-44 sm:pt-52 md:pt-56 pb-24 sm:pb-32 min-h-[500px] sm:min-h-[580px] md:min-h-[620px] flex flex-col justify-center overflow-hidden text-center">
    <HeroGlow intensity="medium" />
    <div className="max-w-4xl w-full mx-auto px-4 sm:px-6 relative z-10">
      <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8">{title}</h1>
      <p className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed">{description}</p>
    </div>
  </section>
);
