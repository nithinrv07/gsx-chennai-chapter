import React, { useId } from 'react';
import { ECOSYSTEM_DATA } from '../data/ecosystem';

/** Endless scrolling strip of partner/college badges; pauses on hover, still for reduced motion. */
export const EcosystemMarquee: React.FC = () => {
  // The list is rendered twice so the -50% translate loops seamlessly.
  const loop = [...ECOSYSTEM_DATA, ...ECOSYSTEM_DATA];
  return (
    <div className="marquee" aria-label="Organisations GSX Chennai works with">
      <ul className="marquee-track">
        {loop.map((org, i) => (
          <li key={`${org.name}-${i}`} className="marquee-item" aria-hidden={i >= ECOSYSTEM_DATA.length}>
            <span className="marquee-badge" aria-hidden="true">{org.initials}</span>
            <span className="flex flex-col">
              <span className="text-sm sm:text-base font-semibold text-white whitespace-nowrap">{org.name}</span>
              <span className="text-xs text-purple-300/80 whitespace-nowrap">{org.role}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

/** The marquee inside its glowing framed panel with the "Building together with" heading. */
export const EcosystemPanel: React.FC<{ className?: string }> = ({ className = '' }) => {
  const headingId = useId();
  return (
    <section aria-labelledby={headingId} className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
      <div className="ecosystem-panel">
        <p id={headingId} className="text-center text-xs font-semibold uppercase tracking-widest text-purple-300 mb-6">
          Building together with
        </p>
        <EcosystemMarquee />
      </div>
    </section>
  );
};

export default EcosystemMarquee;
