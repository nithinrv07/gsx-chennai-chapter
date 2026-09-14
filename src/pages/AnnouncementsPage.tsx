import React, { useState } from 'react';
import { PageId, AnnouncementItem, AnnouncementCategory } from '../types';
import { ANNOUNCEMENTS_DATA } from '../data/announcements';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { Calendar, Clock, ArrowRight, Sparkles, Tag, Flame } from 'lucide-react';
import { motion } from 'motion/react';

interface AnnouncementsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenDetail: (announcement: AnnouncementItem) => void;
}

const CATEGORIES: AnnouncementCategory[] = [
  'All',
  'Community Updates',
  'Event Updates',
  'Opportunities',
  'News',
  'Important Announcements'
];

export const AnnouncementsPage: React.FC<AnnouncementsPageProps> = ({
  onNavigate,
  onOpenDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<AnnouncementCategory>('All');

  const featured = ANNOUNCEMENTS_DATA.find((a) => a.isFeatured) || ANNOUNCEMENTS_DATA[0];

  const filteredAnnouncements = ANNOUNCEMENTS_DATA.filter((a) => {
    if (selectedCategory === 'All') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="relative min-h-screen pb-20">
      {/* Hero */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden text-center">
        <HeroGlow intensity="medium" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
          >
            What&apos;s Happening at{' '}
            <span className="text-gradient-purple">GSX?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            Stay synchronized with chapter initiatives, fellowship cohorts, hackathon timelines, and technology dispatches.
          </motion.p>
        </div>
      </section>

      {/* Featured Announcement Card */}
      {featured && selectedCategory === 'All' && (
        <ScrollReveal as="section" variant="fade-up" distance={25} className="max-w-6xl mx-auto px-4 sm:px-6 mb-16">
          <div className="text-left mb-4">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              Featured Bulletin
            </span>
          </div>

          <div
            className="glass-card-featured rounded-3xl overflow-hidden border border-purple-500/30 hover:shadow-[0_0_50px_rgba(168,85,247,0.35)] transition-all duration-300 group cursor-pointer"
            onClick={() => onOpenDetail(featured)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
              <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/20 text-purple-300 border border-purple-500/40">
                      {featured.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {featured.date}
                    </span>
                    <span className="text-xs text-gray-400">• {featured.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-white group-hover:text-purple-200 transition-colors leading-tight mb-4">
                    {featured.title}
                  </h2>

                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                    {featured.shortDescription}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-purple-300 group-hover:text-white transition-colors">
                  <span>Read Full Announcement</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              <div className="lg:col-span-5 relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#090710] via-transparent to-transparent hidden lg:block" />
              </div>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Filter Tabs */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
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

      {/* Announcement Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAnnouncements.map((item, idx) => {
            const isImportant = item.category === 'Important Announcements';
            return (
              <ScrollReveal
                key={item.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerInterval={70}
                distance={24}
                className="h-full"
              >
                <div
                  className={`rounded-2xl overflow-hidden flex flex-col group cursor-pointer transition-all duration-300 h-full ${
                    isImportant
                      ? 'glass-panel border-purple-500/40 shadow-[0_0_25px_rgba(168,85,247,0.2)]'
                      : 'glass-panel glass-panel-hover border-white/[0.08]'
                  }`}
                  onClick={() => onOpenDetail(item)}
                >
                  <div className="relative h-44 w-full overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-transparent to-transparent" />
                    <span
                      className={`absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold rounded-full backdrop-blur-md ${
                        isImportant
                          ? 'bg-purple-600/80 text-white border border-purple-400/60'
                          : 'bg-black/70 text-purple-300 border border-purple-500/30'
                      }`}
                    >
                      {item.category}
                    </span>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 text-[11px] text-gray-400 mb-2">
                        <Calendar className="w-3.5 h-3.5 text-purple-400" />
                        <span>{item.date}</span>
                        <span>•</span>
                        <span>{item.readTime}</span>
                      </div>

                      <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-2 mb-2">
                        {item.title}
                      </h3>

                      <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mb-4">
                        {item.shortDescription}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">{item.author}</span>
                      <span className="text-xs font-semibold text-purple-300 group-hover:text-white flex items-center gap-1">
                        <span>Read More</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </section>
    </div>
  );
};
