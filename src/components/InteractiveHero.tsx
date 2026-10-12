import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'motion/react';
import { ArrowRight, BookOpen, Code2, Users, Sparkles, Pause, Play } from 'lucide-react';
import { PageId } from '../types';
import '../styles/interactive-hero.css';

interface InteractiveHeroProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onJoin: () => void;
}

export const HERO_PATHS: { id: string; label: string; icon: typeof BookOpen; title: string; description: string; action: string; page: PageId; section?: string; lines: string[] }[] = [
  { id: 'learn', label: 'Learn', icon: BookOpen, title: 'Curiosity is a great starting point.', description: 'Explore sessions, workshops, and meetups with students across Chennai.', action: 'Explore events', page: 'events', section: 'upcoming-events', lines: ['Ask a question', 'Explore a new skill', 'Learn together'] },
  { id: 'build', label: 'Build', icon: Code2, title: 'Small ideas. Real possibilities.', description: 'Bring your idea and find opportunities to build projects with community guidance.', action: 'Build with guidance', page: 'opportunities', section: 'build-with-guidance', lines: ['Start with an idea', 'Build a first version', 'Share what you make'] },
  { id: 'connect', label: 'Connect', icon: Users, title: 'Your people are here.', description: 'Meet curious students and collaborators beyond your own college campus.', action: 'Meet the community', page: 'community', section: 'core-team', lines: ['Meet fellow learners', 'Exchange ideas', 'Collaborate across colleges'] },
  { id: 'grow', label: 'Grow', icon: Sparkles, title: 'Make your next move.', description: 'Speak, contribute, join the tech team, or help bring a community initiative to life.', action: 'Find opportunities', page: 'opportunities', lines: ['Contribute your skills', 'Share your knowledge', 'Grow together'] },
];

export const InteractiveHero: React.FC<InteractiveHeroProps> = ({ onNavigate, onJoin }) => {
  const [active, setActive] = useState('learn');
  const [paused, setPaused] = useState(false);
  const reducedMotion = useReducedMotion();
  const moving = !paused && !reducedMotion;
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const x = useSpring(pointerX, { stiffness: 100, damping: 24 });
  const y = useSpring(pointerY, { stiffness: 100, damping: 24 });
  const selected = HERO_PATHS.find(path => path.id === active)!;

  const resetPointer = () => { pointerX.set(0); pointerY.set(0); };
  const followPointer = (event: React.PointerEvent<HTMLElement>) => {
    if (!moving || event.pointerType !== 'mouse') return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width - .5) * 18);
    pointerY.set(((event.clientY - bounds.top) / bounds.height - .5) * 14);
  };

  return (
    <section className={`playful-hero ${moving ? '' : 'motion-paused'}`} aria-labelledby="gsx-hero-title"
      onPointerMove={followPointer} onPointerLeave={resetPointer}>
      <div className="playful-hero-inner">
        <div className="hero-kicker"><span aria-hidden="true" /> A brighter tomorrow, together</div>
        <div className="playful-title-row">
          <div>
            <h1 id="gsx-hero-title">GSX</h1>
            <p className="playful-chapter">Chennai Chapter</p>
          </div>
          <div className="hero-story">
            <span className="foundation-tag">Under GirlScript Foundation</span>
            <h2>Learn. Build.<br />Connect. Grow.</h2>
            <p>A student community connecting students across Chennai to learn, build, and grow together.</p>
            <button type="button" className="playful-join" onClick={onJoin}>Join GSX Chennai <ArrowRight aria-hidden="true" size={18} /></button>
          </div>
        </div>

        <div className="playground" data-scene={active}>
          <div className="playground-grid" aria-hidden="true" />
          <span className="playground-note">A little curiosity goes a long way ↗</span>
          <motion.div className="hero-character" style={{ x: moving ? x : 0, y: moving ? y : 0 }}>
            <svg viewBox="0 0 300 320" aria-hidden="true">
              <path d="M82 260 Q32 260 38 207 Q42 181 70 194" fill="none" stroke="#221633" strokeWidth="18" strokeLinecap="round" />
              <path d="M223 253 Q264 230 246 190" fill="none" stroke="#221633" strokeWidth="18" strokeLinecap="round" />
              <path d="M249 188 L247 164 M249 185 L268 170" stroke="#221633" strokeWidth="12" strokeLinecap="round" />
              <path d="M113 261 L105 293 M185 262 L198 293" stroke="#221633" strokeWidth="19" strokeLinecap="round" />
              <path d="M104 297 L79 297 M196 297 L221 297" stroke="#221633" strokeWidth="15" strokeLinecap="round" />
              <rect x="67" y="177" width="168" height="106" rx="43" fill="#ff9778" stroke="#221633" strokeWidth="4" />
              <path d="M145 48 L145 29" stroke="#221633" strokeWidth="7" strokeLinecap="round" />
              <circle cx="145" cy="24" r="12" fill="#a889ef" stroke="#221633" strokeWidth="4" />
              <rect x="52" y="55" width="194" height="144" rx="54" fill="#bd9eef" stroke="#221633" strokeWidth="4" />
              <rect x="77" y="86" width="144" height="75" rx="31" fill="#221633" />
              <motion.g style={{ x: moving ? x : 0, y: moving ? y : 0 }}>
                <ellipse cx="118" cy="119" rx="10" ry={active === 'grow' ? 4 : 14} fill="#f7efdf" />
                <ellipse cx="179" cy="119" rx="10" ry={active === 'grow' ? 4 : 14} fill="#f7efdf" />
              </motion.g>
              <path d={active === 'connect' ? 'M129 141 Q148 160 168 141' : 'M136 142 Q149 151 163 142'} stroke="#f7efdf" strokeWidth="5" fill="none" strokeLinecap="round" />
              <path d="M125 220 L112 231 L125 242 M178 220 L191 231 L178 242 M158 216 L146 247" stroke="#221633" strokeWidth="6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>

          <div className="scene-window">
            <div className="scene-window-bar"><span aria-hidden="true"><i /><i /><i /></span><span>your-next-step.gsx</span><Code2 aria-hidden="true" size={16} /></div>
            <div className="scene-window-content">
              <span className="scene-label">{selected.label.toUpperCase()} / GSX CHENNAI</span>
              <div aria-live="polite" aria-atomic="true">
                <h3>{selected.title}</h3>
                <p>{selected.description}</p>
              </div>
              <ul className="scene-checklist">
                {selected.lines.map((line, index) => <li key={line}><span aria-hidden="true">0{index + 1}</span>{line}</li>)}
              </ul>
              <button type="button" onClick={() => onNavigate(selected.page, selected.section)} className="scene-action">
                {selected.action}<ArrowRight aria-hidden="true" size={17} />
              </button>
            </div>
          </div>
          <div className="scene-spark scene-spark-one" aria-hidden="true">✳</div>
          <div className="scene-spark scene-spark-two" aria-hidden="true">✦</div>
          <div className="scene-sticker" aria-hidden="true"><span>Beyond<br />campuses.</span><svg viewBox="0 0 60 60"><path d="M15 43 44 14 M17 14h27v27" /></svg></div>
          <div className="playground-footer">
            <span>Choose a path. Watch the scene change.</span>
            <button type="button" aria-pressed={paused} aria-label={paused ? 'Resume decorative motion' : 'Pause decorative motion'}
              onClick={() => { setPaused(!paused); resetPointer(); }}>
              {paused || reducedMotion ? <Play size={14} aria-hidden="true" /> : <Pause size={14} aria-hidden="true" />}
              {reducedMotion ? 'Reduced motion' : paused ? 'Play motion' : 'Pause motion'}
            </button>
          </div>
        </div>

        <div className="hero-path-controls" aria-label="Explore GSX pathways">
          {HERO_PATHS.map(path => {
            const Icon = path.icon;
            return <button key={path.id} type="button" aria-pressed={active === path.id} onClick={() => setActive(path.id)}>
              <Icon size={20} aria-hidden="true" /><span>{path.label}</span><ArrowRight size={17} aria-hidden="true" />
            </button>;
          })}
        </div>
      </div>
    </section>
  );
};
