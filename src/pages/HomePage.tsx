import React, { useState } from 'react';
import { PageId, EventItem } from '../types';
import { WHAT_WE_DO_CARDS } from '../data/stats';
import { EVENTS_DATA } from '../data/events';
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
  Compass,
  Images
} from 'lucide-react';
import '../styles/home.css';

interface HomePageProps {
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenJoinModal: () => void;
  onOpenEventDetail: (event: EventItem) => void;
  onRegisterEvent: (event: EventItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onOpenJoinModal,
  onOpenEventDetail,
  onRegisterEvent,
}) => {
  const [activePillar, setActivePillar] = useState('01');
  const pillarActions: Record<string, { title: string; description: string; label: string; page: PageId; section?: string }> = {
    '01': { title: 'Start with curiosity.', description: 'Explore our workshops, knowledge sessions, and meetups. Find a topic that interests you and learn alongside students from across Chennai.', label: 'Explore learning events', page: 'events', section: 'upcoming-events' },
    '02': { title: 'Give your idea a place to grow.', description: 'Discover how to build a project with community guidance, collaborate with other students, and contribute your skills.', label: 'Build with our guidance', page: 'opportunities', section: 'build-with-guidance' },
    '03': { title: 'Meet your people, beyond your campus.', description: 'Get to know the chapter and its core team. Connect with students who want to learn, build, and share ideas together.', label: 'Meet the community', page: 'community', section: 'core-team' },
    '04': { title: 'Explore. Experiment. Contribute.', description: 'Bring your curiosity about AI, cloud, open source, or another area of technology. Explore ways to contribute to the chapter.', label: 'Explore ways to contribute', page: 'opportunities', section: 'contribute' },
    '05': { title: 'Find your next step.', description: 'Join the tech team, build a project with guidance, become a speaker, or contribute to our community initiatives.', label: 'Find an opportunity', page: 'opportunities' },
  };
  const selectedPillar = WHAT_WE_DO_CARDS.find(card => card.number === activePillar)!;
  const selectedAction = pillarActions[activePillar];
  const upcomingEvents = EVENTS_DATA.filter((e) => e.status === 'upcoming').slice(0, 3);

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
    <div className="relative min-h-screen bg-[#080414] text-[#f6f2ff]">
      {/* ===================================================
          HERO SECTION
          Purple skyline, neon light ribbons, chapter watermark,
          signature typography, glowing pills, and community stats
          =================================================== */}
      <div className="home" id="home">
        {/* Animated Neon Light Trails & Skyline Background with Motion Toggle */}
        <HeroGlow variant="skyline" />

        {/* Top spacer to accommodate the responsive fixed header */}
        <div className="header-spacer" aria-hidden="true" />

        {/* Chennai Skyline & Chapter Watermark Backdrop */}
        <ChennaiSkyline />

        {/* Main Hero Content */}
        <div id="main" className="hero">
          <p className="eyebrow">A brighter tomorrow, together</p>
          <h1>
            Learn. Build. Connect. <span>Grow.</span>
          </h1>
          <p className="intro">
            A student community under <strong>GirlScript Foundation</strong>, connecting students across Chennai to learn, build, and grow together.
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
        </div>

        {/* Vertical 4-dot Page Marker Indicator */}
        <div className="page-marker" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </div>
      </div>

      {/* ===================================================
          BELOW-THE-FOLD SHOWCASE SECTIONS
          Ecosystem Preview, Core Pillars, Events, CTA
          =================================================== */}
      <div id="explore-community" className="relative z-10 pt-12 sm:pt-20 pb-12">
        
        {/* SECTION 1: ABOUT / ECOSYSTEM PREVIEW */}
        <ScrollReveal as="section" variant="fade-up" distance={28} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 home-section">
          <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden border border-white/[0.08] bg-gradient-to-br from-[#120826]/80 to-[#080414]/90 backdrop-blur-xl shadow-[0_16px_40px_-20px_rgba(0,0,0,0.5)]">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-600/15 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
              <div className="lg:col-span-8 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">
                  About GSX Chennai
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

        <section id="photo-gallery" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 home-section scroll-mt-28">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400">Our community in moments</span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">Photo Gallery</h2>
          </div>
          <div className="rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-950/30 to-[#0d071d] p-10 sm:p-14 text-center">
            <Images className="w-10 h-10 text-purple-300 mx-auto mb-5" />
            <h3 className="text-xl text-white font-semibold mb-3">Community moments coming soon</h3>
            <p className="text-sm text-gray-400 max-w-md mx-auto leading-relaxed">Photos from our chapter activities, meetups, and collaborations will appear here.</p>
          </div>
        </section>

        {/* SECTION 2: CORE PILLARS / WHAT WE DO */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 home-section">
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


          <p className="text-center text-sm text-purple-200/80 mb-6">Choose a pillar to find your next step.</p>
          <div className="grid grid-cols-1 sm:grid-cols-4 lg:grid-cols-6 gap-4">
            {WHAT_WE_DO_CARDS.map((card, idx) => (
              <button key={card.number} type="button"
                aria-pressed={activePillar === card.number}
                aria-controls="pillar-detail"
                onClick={() => setActivePillar(card.number)}
                className={`pillar-card text-left p-6 rounded-2xl border h-full sm:col-span-2 ${idx === 4 ? 'sm:col-start-2 lg:col-start-4' : idx === 3 ? 'lg:col-start-2' : ''} ${activePillar === card.number ? 'border-purple-400/60 ring-1 ring-purple-400/20' : 'border-white/[0.08]'}`}>
                <span className="flex items-center justify-between mb-5">
                  <span className="text-xs font-mono text-purple-300">{card.number}</span>
                  <span className="p-2 rounded-xl bg-purple-500/10">{getCardIcon(card.iconName)}</span>
                </span>
                <span className="block text-xl font-bold text-white mb-2">{card.title}</span>
                <span className="block text-sm text-gray-300/80 leading-relaxed">{card.description}</span>
                <span className="mt-5 inline-flex items-center gap-2 text-xs font-semibold text-purple-300">
                  {activePillar === card.number ? 'Selected' : 'Explore this pillar'}
                  <ArrowRight aria-hidden="true" className="w-3.5 h-3.5" />
                </span>
              </button>
            ))}
          </div>
          <div id="pillar-detail" className="pillar-detail glass-panel rounded-3xl p-6 sm:p-9 mt-6 border-purple-400/20">
            <div aria-live="polite" aria-atomic="true" className="max-w-2xl">
              <span className="text-xs uppercase tracking-widest text-purple-300">{selectedPillar.title}</span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-3 mb-3">{selectedAction.title}</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">{selectedAction.description}</p>
            </div>
            <button type="button" className="pill primary mt-6"
              onClick={() => onNavigate(selectedAction.page, selectedAction.section)}>
              {selectedAction.label}<ArrowRight aria-hidden="true" className="w-4 h-4" />
            </button>
          </div>
        </section>

        {/* SECTION 3: UPCOMING EVENTS */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 home-section">
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


        <section id="community-faq" aria-labelledby="faq-heading" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 home-section scroll-mt-28">
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-14">
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold uppercase tracking-widest text-purple-300">Before you join</span>
              <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-4">Curious? Start here.</h2>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">A few things to know about finding your place in GSX Chennai.</p>
              <button type="button" onClick={onOpenJoinModal} className="inline-flex items-center gap-2 text-purple-300 font-semibold min-h-12 mt-5">
                Join the community<ArrowRight aria-hidden="true" className="w-4 h-4" />
              </button>
            </div>
            <div className="lg:col-span-7 space-y-3">
              {[
                ['Who can join GSX Chennai?', 'Students from different colleges across Chennai, self-taught learners, and technology enthusiasts are welcome. You can take part beyond your own campus.'],
                ['Do I need prior experience?', 'You can start as a beginner. Bring your curiosity, explore learning sessions, and connect with others as you develop your skills.'],
                ['How do I become a member?', 'Use the Join GSX Chennai button to open our official registration form. Complete the form with your details to take the first step.'],
                ['How can I contribute?', 'Explore Opportunities to join the tech team, build projects with guidance, become a speaker, or contribute to chapter activities.'],
              ].map(([question, answer]) => (
                <details key={question} className="community-faq glass-panel rounded-2xl">
                  <summary className="flex items-center justify-between gap-4 p-5 sm:p-6 cursor-pointer text-sm sm:text-base font-semibold text-white">
                    {question}<span aria-hidden="true" className="faq-plus text-purple-300 text-2xl leading-none">+</span>
                  </summary>
                  <p className="px-5 sm:px-6 pb-6 text-sm text-gray-300 leading-relaxed">{answer}</p>
                </details>
              ))}
            </div>
          </div>
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
