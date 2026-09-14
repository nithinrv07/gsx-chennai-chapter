import React from 'react';
import { PageId, EventItem, ProjectItem } from '../types';
import { STATS_DATA, WHAT_WE_DO_CARDS } from '../data/stats';
import { EVENTS_DATA } from '../data/events';
import { PROJECTS_DATA } from '../data/projects';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Hammer, 
  Users, 
  Briefcase, 
  Layers, 
  ExternalLink,
  Compass
} from 'lucide-react';
import { motion } from 'motion/react';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
  onOpenEventDetail: (event: EventItem) => void;
  onRegisterEvent: (event: EventItem) => void;
  onOpenProjectDetail: (project: ProjectItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenJoinModal,
  onOpenEventDetail,
  onRegisterEvent,
  onOpenProjectDetail,
}) => {
  const upcomingEvents = EVENTS_DATA.filter((e) => e.status === 'upcoming').slice(0, 3);
  const featuredProjects = PROJECTS_DATA.slice(0, 3);

  const getCardIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen':
        return <BookOpen className="w-5 h-5 text-purple-400" />;
      case 'Hammer':
        return <Hammer className="w-5 h-5 text-purple-300" />;
      case 'Users':
        return <Users className="w-5 h-5 text-purple-400" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-purple-400" />;
      default:
        return <Compass className="w-5 h-5 text-purple-400" />;
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* ===================================================
          HERO SECTION
          Futuristic glow arc inspired by the reference design
          =================================================== */}
      <section className="relative min-h-screen flex flex-col justify-center items-center pt-28 pb-16 overflow-hidden">
        <HeroGlow intensity="high" showParticles={true} />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 my-auto">

          {/* Main Headline with Immersive UI typography & gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-space text-5xl sm:text-7xl md:text-8xl lg:text-[90px] xl:text-[96px] font-extrabold leading-[0.95] gradient-text tracking-tight mb-6 uppercase"
          >
            GSX Chennai<br />Chapter
          </motion.h1>

          {/* Alternative Supporting Line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-300 text-base sm:text-lg md:text-xl leading-relaxed mb-10"
          >
            Building a community of learners, creators, innovators and changemakers across Chennai. Transforming curiosity into real-world impact.
          </motion.p>

          {/* Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              id="hero-join-btn"
              onClick={onOpenJoinModal}
              className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 rounded-xl font-bold text-base transition-all shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:shadow-[0_15px_35px_rgba(139,92,246,0.55)] transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Join GSX Chennai</span>
            </button>

            <button
              id="hero-explore-events-btn"
              onClick={() => onNavigate('events')}
              className="w-full sm:w-auto glass px-10 py-4 rounded-xl font-bold text-base hover:bg-white/10 transition-all text-white border border-white/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4 text-violet-400" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          STATISTICS / TRUST SECTION
          Editable data structure with subtle glassmorphism
          =================================================== */}
      <ScrollReveal as="section" variant="fade-up" delay={50} distance={20} className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 mb-24">
        <div className="glass-panel rounded-2xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06] border border-white/[0.08] shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
          {STATS_DATA.map((item, idx) => (
            <div key={item.id} className="pt-4 sm:pt-0 sm:px-4 first:pt-0 first:px-0 text-center sm:text-left group transition-all duration-300">
              <p className="text-2xl sm:text-4xl font-extrabold text-white font-mono tracking-tight text-gradient-purple flex items-baseline justify-center sm:justify-start">
                <AnimatedCounter
                  value={item.value}
                  duration={1800}
                  delay={idx * 140}
                  className="font-mono tracking-tight"
                />
              </p>
              <p className="text-xs sm:text-sm font-semibold text-gray-200 mt-1 transition-colors duration-200 group-hover:text-purple-300">
                {item.label}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {item.subtext}
              </p>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* ===================================================
          HOME — ABOUT PREVIEW
          =================================================== */}
      <ScrollReveal as="section" variant="fade-up" distance={28} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#0e091a]/80 to-[#050505]/90 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                The Ecosystem
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                More Than a Community.
              </h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                GSX Chennai brings together students, developers, designers, innovators and changemakers to learn, build and create meaningful impact together.
              </p>
            </div>

            <div className="lg:col-span-4 flex lg:justify-end">
              <button
                onClick={() => onNavigate('about')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 hover:text-white border border-purple-500/40 font-semibold text-sm transition-all shadow-[0_0_20px_rgba(168,85,247,0.2)] cursor-pointer"
              >
                <span>Discover GSX</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ===================================================
          HOME — WHAT WE DO
          5 premium cards with hover glow and accent card
          =================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-2">
            Core Pillars
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Learn. Build. Create Impact.
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Five interconnected pillars shaping Chennai&apos;s next generation of builders.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHAT_WE_DO_CARDS.map((card, idx) => (
            <ScrollReveal
              key={card.number}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={80}
              distance={24}
              className="h-full"
            >
              <div
                className={`glass p-6 rounded-2xl card-hover transition-all border border-white/[0.08] h-full flex flex-col justify-between ${
                  card.highlighted
                    ? 'bg-violet-600/10 border-violet-500/30 shadow-[0_0_30px_rgba(139,92,246,0.15)]'
                    : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`text-xs font-bold font-mono text-violet-400 ${card.highlighted ? '' : 'opacity-70'}`}>
                      {card.number}
                    </div>
                    <div className="p-1.5 rounded-lg bg-white/[0.03] border border-white/[0.06]">
                      {getCardIcon(card.iconName)}
                    </div>
                  </div>

                  <h3 className="font-space text-lg font-bold mb-2 text-white">
                    {card.title}
                  </h3>

                  <p className={`text-xs leading-relaxed ${card.highlighted ? 'text-gray-300' : 'text-gray-400'}`}>
                    {card.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===================================================
          HOME — UPCOMING EVENTS
          3 upcoming event cards + "View All Events →"
          =================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <ScrollReveal variant="fade-up" distance={20} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-1">
              Events & Gatherings
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              What&apos;s Happening at GSX?
            </h2>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
          >
            <span>View All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {upcomingEvents.map((evt, idx) => (
            <ScrollReveal
              key={evt.id}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={90}
              distance={24}
              className="h-full"
            >
              <div
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group cursor-pointer h-full"
                onClick={() => onOpenEventDetail(evt)}
              >
                {/* Event Cover Image */}
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={evt.image}
                    alt={evt.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/60 backdrop-blur-md text-purple-300 border border-purple-500/30">
                    {evt.category}
                  </span>
                </div>

                {/* Event Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-[11px] text-purple-400 font-medium mb-1.5">
                      <Calendar className="w-3.5 h-3.5 shrink-0" />
                      <span>{evt.date}</span>
                    </div>

                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1 mb-2">
                      {evt.title}
                    </h3>

                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {evt.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[11px] text-gray-400 truncate max-w-[150px]">
                      <MapPin className="w-3 h-3 text-purple-400 shrink-0" />
                      <span className="truncate">{evt.location}</span>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRegisterEvent(evt);
                      }}
                      className="text-xs font-semibold text-purple-300 hover:text-white flex items-center gap-1 cursor-pointer"
                    >
                      <span>Register</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===================================================
          HOME — FEATURED PROJECTS
          3 project cards + "Explore Projects →"
          =================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
        <ScrollReveal variant="fade-up" distance={20} className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-1">
              Community Prototypes
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Built by the Community.
            </h2>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-purple-200 transition-colors cursor-pointer"
          >
            <span>Explore Projects</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredProjects.map((proj, idx) => (
            <ScrollReveal
              key={proj.id}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={90}
              distance={24}
              className="h-full"
            >
              <div
                className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group cursor-pointer h-full"
                onClick={() => onOpenProjectDetail(proj)}
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <img
                    src={proj.image}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/60 backdrop-blur-md text-purple-300 border border-purple-500/30">
                    {proj.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1 mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                      {proj.shortDescription}
                    </p>
                  </div>

                  <div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.techStack.slice(0, 3).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.04] text-purple-300 border border-white/[0.06]"
                        >
                          {t}
                        </span>
                      ))}
                      {proj.techStack.length > 3 && (
                        <span className="px-1.5 py-0.5 text-[10px] text-gray-400">
                          +{proj.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs">
                      <span className="text-gray-400 text-[11px]">
                        {proj.creators[0]?.name || 'Community Pod'}
                      </span>
                      <span className="text-purple-300 font-semibold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        View Project →
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===================================================
          HOME — FINAL CTA
          Full-width purple gradient/glow section
          =================================================== */}
      <ScrollReveal as="section" variant="fade-up" distance={30} className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 mb-16">
        {/* Giant Purple Ambient Radial glow */}
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-violet-950/30 to-[#050505] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-purple-600/25 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-300 bg-purple-500/20 border border-purple-500/30 mb-4">
            Join the Movement
          </span>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
            Your Next Idea Could Start Here.
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
            Learn something new. Build something meaningful. Meet people who inspire you.
          </p>

          <button
            id="home-final-join-btn"
            onClick={onOpenJoinModal}
            className="bg-violet-600 hover:bg-violet-500 text-white px-10 py-4 rounded-xl font-bold text-sm sm:text-base shadow-[0_10px_30px_rgba(139,92,246,0.4)] hover:shadow-[0_15px_40px_rgba(139,92,246,0.6)] transition-all transform hover:scale-105 active:scale-100 inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-violet-200" />
            <span>Join GSX Chennai →</span>
          </button>
        </div>
      </ScrollReveal>

      {/* Immersive UI Subtle Divider */}
      <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-violet-900/50 to-transparent" />
    </div>
  );
};
