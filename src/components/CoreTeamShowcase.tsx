import React, { useEffect, useState } from 'react';
import { Linkedin } from 'lucide-react';
import { CORE_TEAM } from '../data/team';
import { TeamPortrait } from './TeamPortrait';
import { WorksWheel } from './ui/works-wheel';

const MEMBERS = CORE_TEAM.map(member => ({
  title: member.name,
  image: member.image,
  subtitle: member.role,
  imagePosition: decodeURIComponent(member.image).endsWith('/jenita agnes.jpeg') ? 'center 52%' : undefined,
}));

export function CoreTeamShowcase() {
  const [useWheel, setUseWheel] = useState(false);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 768px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setUseWheel(desktop.matches && !reducedMotion.matches);
    update();
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  const member = CORE_TEAM[active];

  return useWheel ? (
    <div className="overflow-hidden rounded-3xl border border-purple-400/20 bg-[#080414]">
      <p className="px-6 pt-6 text-center text-xs leading-relaxed text-purple-200/80">Scroll or drag the wheel to meet our team. Use the arrow keys, controls, or a name to select a member.</p>
      <WorksWheel
        items={MEMBERS}
        label="Core Team"
        action=""
        onActiveChange={setActive}
        className="h-[38rem] lg:h-[44rem]"
      />
      {member && (
        <div aria-live="polite" aria-atomic="true" className="relative border-t border-purple-400/15 bg-purple-950/15 px-6 py-7 sm:px-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-300">{member.role}</p>
          <h3 className="mt-2 text-2xl font-bold text-white">{member.name}</h3>
          <p className="mt-3 max-w-2xl text-sm leading-relaxed text-gray-300">{member.shortBio}</p>
          <p className="mt-3 text-xs text-purple-200"><span className="font-semibold">Owns:</span> {member.owns}</p>
          {member.linkedin && (
            <a href={member.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${member.name} on LinkedIn`} className="mt-5 inline-flex items-center gap-2 rounded-xl border border-purple-400/25 px-4 py-2.5 text-sm text-purple-200 transition-colors hover:bg-purple-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300">
              <Linkedin aria-hidden="true" size={16} /> Connect on LinkedIn
            </a>
          )}
        </div>
      )}
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {CORE_TEAM.map(person => (
        <article key={person.id} className="flex h-full flex-col overflow-hidden rounded-2xl border border-purple-400/15 bg-white/[0.02]">
          <div className="group h-64 overflow-hidden"><TeamPortrait name={person.name} image={person.image} /></div>
          <div className="flex flex-1 flex-col p-5">
            <h3 className="text-base font-bold text-white">{person.name}</h3>
            <p className="mt-1 text-xs font-semibold text-purple-300">{person.role}</p>
            <p className="mt-3 text-xs leading-relaxed text-gray-400">{person.shortBio}</p>
            {person.linkedin && (
              <a href={person.linkedin} target="_blank" rel="noopener noreferrer" aria-label={`Connect with ${person.name} on LinkedIn`} className="mt-4 inline-flex items-center gap-2 self-start rounded-lg p-2 text-xs text-purple-200 hover:bg-purple-500/15 focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple-300">
                <Linkedin aria-hidden="true" size={16} /> LinkedIn
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
