import React, { useState } from 'react';
import { PageId, EventCategory, EventItem } from '../types';
import { EVENTS_DATA } from '../data/events';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Sparkles, 
  Filter,
  CheckCircle2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenEventDetail: (event: EventItem) => void;
  onRegisterEvent: (event: EventItem) => void;
}

const CATEGORIES: EventCategory[] = [
  'All',
  'Workshops',
  'Hackathons',
  'Meetups',
  'Tech Sessions',
  'Community'
];

export const EventsPage: React.FC<EventsPageProps> = ({
  onNavigate,
  onOpenEventDetail,
  onRegisterEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<EventCategory>('All');

  const upcomingEvents = EVENTS_DATA.filter(
    (e) => e.status === 'upcoming' && (selectedCategory === 'All' || e.category === selectedCategory)
  );

  const pastEvents = EVENTS_DATA.filter((e) => e.status === 'past');

  return (
    <div className="relative min-h-screen pb-20">
      {/* Hero */}
      <section className="relative pt-44 sm:pt-52 md:pt-56 pb-24 sm:pb-32 min-h-[500px] sm:min-h-[580px] md:min-h-[620px] flex flex-col justify-center overflow-hidden text-center">
        <HeroGlow intensity="medium" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            Learn. Connect.{' '}
            <span className="text-gradient-purple">Experience.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed"
          >
            Discover upcoming experiences and explore what we&apos;ve built together.
          </motion.p>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-12">
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 gap-2 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50'
                    : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </section>

      {/* Upcoming Events Grid */}
      <section id="upcoming-events" className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 scroll-mt-28">
        <div id="event-details" className="flex items-center justify-between mb-8 scroll-mt-28">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-1">
              Active Schedule
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Upcoming Experiences
            </h2>
          </div>
          <span className="text-xs text-gray-400 font-mono">
            Showing {upcomingEvents.length} events
          </span>
        </div>

        {upcomingEvents.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((evt, idx) => (
              <ScrollReveal
                key={evt.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerInterval={80}
                distance={24}
                className="h-full"
              >
                <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-white/[0.08] h-full">
                  {/* Event Image */}
                  <div
                    className="relative h-48 w-full overflow-hidden cursor-pointer"
                    onClick={() => onOpenEventDetail(evt)}
                  >
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 text-[10px] font-semibold rounded-full bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
                        {evt.category}
                      </span>
                      <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-purple-950/80 text-purple-200 border border-purple-400/30">
                        {evt.venueType}
                      </span>
                    </div>
                  </div>

                  {/* Event Details */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-3 text-xs text-purple-400 font-medium mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          <span>{evt.date}</span>
                        </div>
                        <span>•</span>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{evt.time.split('–')[0]}</span>
                        </div>
                      </div>

                      <h3
                        className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1 mb-2 cursor-pointer"
                        onClick={() => onOpenEventDetail(evt)}
                      >
                        {evt.title}
                      </h3>

                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {evt.description}
                      </p>

                      <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-6">
                        <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                        <span className="truncate">{evt.location}</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="pt-4 border-t border-white/[0.06] flex items-center gap-2">
                      <button
                        onClick={() => onRegisterEvent(evt)}
                        className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-xs shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <span>Register</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => onOpenEventDetail(evt)}
                        className="py-2.5 px-3.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] text-gray-300 hover:text-white text-xs font-semibold transition-colors border border-white/[0.08] cursor-pointer"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-10 sm:p-14 rounded-3xl border border-white/[0.08] text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center mx-auto mb-4 shadow-[0_0_25px_rgba(168,85,247,0.3)]">
              <Calendar className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Next Events Lineup In Preparation
            </h3>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed max-w-md mx-auto mb-6">
              We&apos;re finalizing dates for upcoming developer workshops, AI build jams, and hackathons. Join the community to get access first!
            </p>
            <a
              href="https://forms.gle/AFdmVVLug64CURiq9"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-xl bg-violet-600 hover:bg-violet-500 text-white text-xs font-bold uppercase tracking-wider shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-violet-200" />
              <span>Join GSX Chennai Community</span>
            </a>
          </div>
        )}
      </section>

      {/* Past Events Recap Section */}
      {pastEvents.length > 0 && (
        <section id="past-events" className="max-w-6xl mx-auto px-4 sm:px-6 scroll-mt-28">
          <ScrollReveal variant="fade-up" distance={20} className="border-t border-white/[0.08] pt-16 mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-1">
              Archive & Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Past Events
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Recap of previous summits, code sprints, and workshops hosted by the chapter.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pastEvents.map((evt, idx) => (
              <ScrollReveal
                key={evt.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerInterval={70}
                distance={20}
                className="h-full"
              >
                <div className="glass-panel rounded-2xl overflow-hidden flex flex-col border border-white/[0.06] opacity-85 hover:opacity-100 transition-opacity h-full">
                  <div className="relative h-40 w-full overflow-hidden">
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-full h-full object-cover grayscale-[30%]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-black/70 text-gray-300">
                      {evt.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="text-[11px] text-gray-400 mb-1">
                        {evt.date} • {evt.venueType}
                      </div>
                      <h3 className="text-sm font-bold text-white mb-2 line-clamp-1">
                        {evt.title}
                      </h3>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {evt.description}
                      </p>
                    </div>

                    <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[10px] text-purple-400 font-medium">
                        Successfully Completed
                      </span>
                      <button
                        onClick={() => onOpenEventDetail(evt)}
                        className="text-xs text-gray-300 hover:text-white font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>View Recap</span>
                        <ArrowRight className="w-3 h-3 text-purple-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
