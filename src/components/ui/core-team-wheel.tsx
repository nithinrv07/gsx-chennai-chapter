import React, { useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ArrowLeft, ArrowRight, Linkedin } from 'lucide-react';
import { TeamPortrait } from '../TeamPortrait';
import { TeamMember } from '../../types';
import '../../styles/core-team-wheel.css';

export function getWheelOffset(current: number, target: number, count: number) {
  let offset = ((target - current) % count + count) % count;
  if (offset > count / 2) offset -= count;
  return offset;
}

interface CoreTeamWheelProps { members: TeamMember[]; }

export const CoreTeamWheel: React.FC<CoreTeamWheelProps> = ({ members }) => {
  const [selected, setSelected] = useState(0);
  const [rotation, setRotation] = useState(0);
  const pointerStart = useRef<number | null>(null);
  const suppressPortraitClick = useRef(false);
  const reducedMotion = useReducedMotion();
  if (!members.length) return null;

  const activeMember = members[selected];
  const step = 360 / members.length;
  const choose = (index: number) => {
    const next = (index + members.length) % members.length;
    setRotation(value => value - getWheelOffset(selected, next, members.length) * step);
    setSelected(next);
  };
  const handleKey = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') { event.preventDefault(); choose(selected + 1); }
    else if (event.key === 'ArrowLeft') { event.preventDefault(); choose(selected - 1); }
    else if (event.key === 'Home') { event.preventDefault(); choose(0); }
    else if (event.key === 'End') { event.preventDefault(); choose(members.length - 1); }
  };

  return (
    <div className="team-wheel" onKeyDown={handleKey}>
      <div className="team-wheel-layout">
        <div className="team-wheel-arena" role="group" aria-label="Core team portrait wheel. Use Left and Right arrow keys to browse."
          tabIndex={0}
          onPointerDown={event => {
            suppressPortraitClick.current = false;
            if (event.pointerType !== 'mouse') pointerStart.current = event.clientX;
          }}
          onPointerCancel={() => { pointerStart.current = null; }}
          onPointerUp={event => {
            if (pointerStart.current === null) return;
            const delta = event.clientX - pointerStart.current;
            pointerStart.current = null;
            if (Math.abs(delta) > 45) {
              suppressPortraitClick.current = true;
              choose(selected + (delta < 0 ? 1 : -1));
            }
          }}>
          <div className="team-wheel-orbit-line" aria-hidden="true" />
          <motion.div className="team-wheel-orbit" animate={{ rotate: reducedMotion ? 0 : rotation }}
            transition={reducedMotion ? { duration: 0 } : { type: 'spring', stiffness: 65, damping: 22 }}>
            {members.map((member, index) => {
              const angle = index * step;
              const radians = angle * Math.PI / 180;
              return (
                <button type="button" key={member.id} className="team-wheel-portrait"
                  aria-label={`Select ${member.name}, ${member.role}`}
                  aria-pressed={selected === index}
                  onClick={() => {
                    if (suppressPortraitClick.current) { suppressPortraitClick.current = false; return; }
                    choose(index);
                  }}
                  style={{
                    left: `${50 + Math.sin(radians) * 37}%`,
                    top: `${50 - Math.cos(radians) * 37}%`,
                    transform: `translate(-50%, -50%) rotate(${angle}deg)`,
                  }}>
                  <TeamPortrait key={member.image} image={member.image} name={member.name} />
                </button>
              );
            })}
          </motion.div>
          <div className="team-wheel-center" aria-hidden="true">
            <span>GSX CHENNAI</span>
            <h3>Core Team</h3>
            <p>{activeMember.name}</p>
            <small>{String(selected + 1).padStart(2, '0')} / {String(members.length).padStart(2, '0')}</small>
          </div>
        </div>

        <div className="team-wheel-names" aria-label="Choose a core team member">
          <span className="team-wheel-list-label">The people behind GSX</span>
          {members.map((member, index) => (
            <button type="button" key={member.id} aria-pressed={selected === index}
              onClick={() => choose(index)}><span>{member.name}</span><ArrowRight size={13} aria-hidden="true" /></button>
          ))}
        </div>
      </div>

      <div className="team-wheel-controls">
        <p>Click a portrait, use the arrows, or swipe to meet the team.</p>
        <div>
          <button type="button" aria-label="Previous core team member" onClick={() => choose(selected - 1)}><ArrowLeft size={19} aria-hidden="true" /></button>
          <span>{selected + 1} / {members.length}</span>
          <button type="button" aria-label="Next core team member" onClick={() => choose(selected + 1)}><ArrowRight size={19} aria-hidden="true" /></button>
        </div>
      </div>

      <article className="team-wheel-profile" aria-label="Selected core team member">
        <div className="team-wheel-profile-photo">
          <TeamPortrait key={activeMember.image} name={activeMember.name} image={activeMember.image} />
        </div>
        <div className="team-wheel-profile-copy">
          <div aria-live="polite" aria-atomic="true">
            <span className="team-wheel-list-label">Core Team</span>
            <h3>{activeMember.name}</h3>
            <p className="team-wheel-role">{activeMember.role}</p>
            <p className="team-wheel-bio">{activeMember.shortBio}</p>
          </div>
          {activeMember.linkedin && (
            <a href={activeMember.linkedin} target="_blank" rel="noopener noreferrer"
              aria-label={`View ${activeMember.name}'s LinkedIn profile`}>
              <Linkedin size={16} aria-hidden="true" />Connect on LinkedIn<ArrowRight size={15} aria-hidden="true" />
            </a>
          )}
        </div>
      </article>
    </div>
  );
};
