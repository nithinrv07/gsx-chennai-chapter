import React from 'react';
import { AnimatedCounter } from './AnimatedCounter';

const stats = [
  { value: 1200, label: 'Members', suffix: '+' },
  { value: 5, label: 'Colleges', suffix: '+' },
  { value: 18, label: 'Projects', suffix: '+' },
  { value: 24, label: 'Events', suffix: '+' },
];

export const CommunityStats: React.FC = () => {
  return (
    <ul className="stats" aria-label="Our community in numbers">
      {stats.map((stat, idx) => (
        <li key={stat.label}>
          <strong>
            <AnimatedCounter
              value={stat.value}
              suffix={stat.suffix}
              duration={1600}
              delay={idx * 120}
            />
          </strong>
          <span>{stat.label}</span>
        </li>
      ))}
    </ul>
  );
};

export default CommunityStats;
