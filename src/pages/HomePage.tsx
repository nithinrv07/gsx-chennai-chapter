import React from 'react';
import { PageId, EventItem, ProjectItem } from '../types';
import { WHAT_WE_DO_CARDS } from '../data/stats';
import { EVENTS_DATA } from '../data/events';
import { PROJECTS_DATA } from '../data/projects';
import { HeroGlow } from '../components/HeroGlow';
import { ChennaiSkyline } from '../components/ChennaiSkyline';
import { CommunityStats } from '../components/CommunityStats';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Sparkles, 
  ArrowRight, 
  Calendar, 
  MapPin, 
  BookOpen, 
  Hammer, 
  Users, 
  Briefcase, 
  Compass
} from 'lucide-react';
import '../styles/home.css';

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

  const handleScrollToExplore = (e: React.MouseEvent) => {
    e.preventDefault();
    const section = document.getElementById('explore-community');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#080414] text-[#f6f2ff]">
      {/* ===================================================
          HERO SECTION — FROM GSX-REACT DESIGN
          Purple skyline, neon light ribbons, landmark pins,
          signature typography, glowing pills, and community stats
          =================================================== */}
      <div className="home" id="home">
        {/* Animated Neon Light Trails & Skyline Background with Motion Toggle */}
        <HeroGlow variant="skyline" />

        {/* Top spacer to accommodate fixed header height (94px) */}
        <div style={{ height: '94px' }} aria-hidden="true" />

        {/* Chennai Skyline Landmark Labels & Watermark Backdrop */}
        <ChennaiSkyline />

        {/* Main Hero Content */}
        <main id="main" className="hero">
          <p className="eyebrow">A brighter tomorrow, together • GSX Chennai Chapter</p>
          <h1>
            Learn. Build. Connect. <span>Grow.</span>
          </h1>
          <p className="intro">
            GSX Chennai is a vibrant student community under <strong>GirlScript Foundation</strong>,
            bringing curious minds together across Chennai to learn, build impactful projects, collaborate, and grow.
          </p>

          <div className="cta-row">
            <button
              type="button"
              id="hero-join-pill-btn"
              onClick={onOpenJoinModal}
              className="pill primary flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-purple-950 shrink-0" />
              <span>Join GSX Chennai</span>
              <span aria-hidden="true">→</span>
            </button>
            <button
              type="button"
              id="hero-explore-events-btn"
              onClick={() => onNavigate('events')}
              className="pill secondary flex items-center gap-2"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4 text-purple-300 shrink-0" />
            </button>
          </div>

          {/* 4 Community Stats with Animated Count-ups */}
          <CommunityStats />
        </main>

        {/* Vertical 4-dot Page Marker Indicator */}
        <div className="page-marker" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>

        {/* Floating Explore Community Anchor */}
        <a
          className="explore"
          href="#explore-community"
          onClick={handleScrollToExplore}
          aria-label="Scroll to explore community section"
        >
          <span className="circle" aria-hidden="true">↓</span>
          <span>Explore our community</span>
        </a>
      </div>

      {/* ===================================================
          BELOW-THE-FOLD SHOWCASE SECTIONS
          Ecosystem Preview, Core Pillars, Events, Projects, CTA
          =================================================== */}
      <div id="explore-community" className="relative z-10 pt-16 sm:pt-24 pb-20">
        
        {/* SECTION 1: ABOUT / ECOSYSTEM PREVIEW */}
        <ScrollReveal as="section" variant="fade-up" distance={28} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-28">
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#120826]/80 to-[#080414]/90 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                  The Ecosystem
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                  More Than a Community.
                </h2>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl">
                  GSX Chennai brings together students, developers, designers, innovators and changemakers to learn, build, collaborate, and create meaningful open-source technology.
                </p>
              </div>

              <div className="lg:col-span-4 flex lg:justify-end">
                <button
                  onClick={() => onNavigate('about')}
                  className="pill primary text-xs sm:text-sm !py-3.5 !px-7 cursor-pointer"
                >
                  <span>Discover GSX</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* SECTION 2: CORE PILLARS / WHAT WE DO */}
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
                  className={`p-6 rounded-2xl transition-all border border-white/[0.08] h-full flex flex-col justify-between bg-white/[0.02] hover:bg-white/[0.05] hover:border-purple-500/40 hover:-translate-y-1 shadow-[0_4px_20px_rgba(0,0,0,0.3)] ${
                    card.highlighted
                      ? 'bg-purple-900/15 border-purple-500/40 shadow-[0_0_30px_rgba(174,112,255,0.15)]'
                      : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className={`text-xs font-bold font-mono text-purple-400 ${card.highlighted ? '' : 'opacity-70'}`}>
                        {card.number}
                      </div>
                      <div className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.06]">
                        {getCardIcon(card.iconName)}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold mb-2 text-white">
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

        {/* SECTION 3: UPCOMING EVENTS */}
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>View All Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollReveal>

          {upcomingEvents.length > 0 ? (
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
                    className="rounded-2xl overflow-hidden flex flex-col group cursor-pointer h-full border border-white/[0.08] bg-[#100a20]/70 hover:border-purple-500/40 hover:bg-[#140c28] transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    onClick={() => onOpenEventDetail(evt)}
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100a20] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
                        {evt.category}
                      </span>
                    </div>

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
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.08] text-center max-w-xl mx-auto bg-[#100a20]/70">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Next Events In Preparation
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto mb-6">
                We&apos;re finalizing dates for upcoming developer meetups, hackathons, and hands-on workshops.
              </p>
              <button
                onClick={onOpenJoinModal}
                className="pill primary text-xs font-bold uppercase tracking-wider !py-3 !px-6 cursor-pointer inline-flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Join to Get Notified</span>
              </button>
            </div>
          )}
        </section>

        {/* SECTION 4: FEATURED PROJECTS */}
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
              className="inline-flex items-center gap-2 text-sm font-semibold text-purple-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </ScrollReveal>

          {featuredProjects.length > 0 ? (
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
                    className="rounded-2xl overflow-hidden flex flex-col group cursor-pointer h-full border border-white/[0.08] bg-[#100a20]/70 hover:border-purple-500/40 hover:bg-[#140c28] transition-all hover:-translate-y-1 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                    onClick={() => onOpenProjectDetail(proj)}
                  >
                    <div className="relative h-44 w-full overflow-hidden">
                      <img
                        src={proj.image}
                        alt={proj.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#100a20] via-transparent to-transparent" />
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-semibold rounded-full bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
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
          ) : (
            <div className="p-8 sm:p-12 rounded-3xl border border-white/[0.08] text-center max-w-xl mx-auto bg-[#100a20]/70">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Project Showcase Launching Soon
              </h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto mb-6">
                Chennai&apos;s student developers are building the next generation of open technology. Have a project? Submit your work to get featured!
              </p>
              <button
                onClick={() => onNavigate('projects')}
                className="pill primary text-xs font-bold uppercase tracking-wider !py-3 !px-6 cursor-pointer inline-flex items-center gap-2"
              >
                <span>Explore Projects Track →</span>
              </button>
            </div>
          )}
        </section>

        {/* SECTION 5: FINAL CTA */}
        <ScrollReveal as="section" variant="fade-up" distance={30} className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8 mb-16">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 via-violet-950/30 to-[#080414] pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest text-purple-300 bg-purple-500/20 border border-purple-500/30 mb-4">
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
              className="pill primary text-base font-bold !py-4 !px-10 cursor-pointer inline-flex items-center gap-2.5"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join GSX Chennai →</span>
            </button>
          </div>
        </ScrollReveal>

        {/* Subtle Divider */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500/20 to-transparent" />
      </div>
    </div>
  );
};

export default HomePage;
