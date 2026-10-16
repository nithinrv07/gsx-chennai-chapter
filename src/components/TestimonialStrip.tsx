import React from 'react';
import { Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

const initialsOf = (name: string) =>
  name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase();

/** Slow-scrolling strip of member quotes. Renders nothing until testimonials are added. */
export const TestimonialStrip: React.FC = () => {
  if (TESTIMONIALS.length === 0) return null;
  const loop = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section aria-labelledby="testimonials-heading" className="mb-16 sm:mb-28">
      <div className="text-center max-w-2xl mx-auto mb-10 px-4">
        <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-2">In their words</span>
        <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          What Our Members Say
        </h2>
      </div>
      <div className="marquee marquee-reverse" style={{ '--marquee-duration': `${Math.max(40, TESTIMONIALS.length * 12)}s` } as React.CSSProperties}>
        <ul className="marquee-track items-stretch">
          {loop.map((t, i) => (
            <li
              key={`${t.name}-${i}`}
              aria-hidden={i >= TESTIMONIALS.length}
              className="w-[300px] sm:w-[380px] shrink-0 rounded-3xl border border-white/[0.08] bg-white/[0.03] p-6 flex flex-col justify-between hover:border-purple-400/40 transition-colors"
            >
              <div>
                <Quote className="w-6 h-6 text-purple-400 mb-3" aria-hidden="true" />
                <p className="text-sm sm:text-base text-gray-200 leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="flex items-center gap-3 mt-5">
                {t.image ? (
                  <img src={t.image} alt="" className="w-10 h-10 rounded-full object-cover object-top" loading="lazy" />
                ) : (
                  <span className="w-10 h-10 rounded-full grid place-items-center text-xs font-bold text-white bg-gradient-to-br from-purple-500 to-violet-700" aria-hidden="true">
                    {initialsOf(t.name)}
                  </span>
                )}
                <span>
                  <span className="block text-sm font-semibold text-white">{t.name}</span>
                  <span className="block text-xs text-purple-300/80">{t.role}</span>
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default TestimonialStrip;
