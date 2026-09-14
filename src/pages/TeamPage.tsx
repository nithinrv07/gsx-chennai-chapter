import React from 'react';
import { PageId, GSX_WHATSAPP_URL, GSX_INSTAGRAM_URL, GSX_LINKEDIN_URL } from '../types';
import { FEATURED_LEAD, CORE_TEAM } from '../data/team';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  Instagram,
  Linkedin,
  Sparkles,
  ArrowUpRight,
  Compass,
  Cpu,
  BookOpen,
  Hammer,
  Users,
  HeartHandshake,
  TrendingUp,
  Megaphone,
} from 'lucide-react';
import { motion } from 'motion/react';

interface TeamPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

const getRoleIcon = (iconName?: string) => {
  switch (iconName) {
    case 'Compass':
      return <Compass className="w-4 h-4 text-purple-400" />;
    case 'Cpu':
      return <Cpu className="w-4 h-4 text-purple-400" />;
    case 'BookOpen':
      return <BookOpen className="w-4 h-4 text-purple-400" />;
    case 'Hammer':
      return <Hammer className="w-4 h-4 text-purple-400" />;
    case 'Users':
      return <Users className="w-4 h-4 text-purple-400" />;
    case 'HeartHandshake':
      return <HeartHandshake className="w-4 h-4 text-purple-400" />;
    case 'TrendingUp':
      return <TrendingUp className="w-4 h-4 text-purple-400" />;
    case 'Megaphone':
      return <Megaphone className="w-4 h-4 text-purple-400" />;
    default:
      return <Sparkles className="w-4 h-4 text-purple-400" />;
  }
};

export const TeamPage: React.FC<TeamPageProps> = ({ onNavigate, onOpenJoinModal }) => {
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
            Meet the People Behind{' '}
            <span className="text-gradient-purple">GSX Chennai.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            A dedicated collective of domain owners, community architects, and technical builders empowering Chennai&apos;s tech ecosystem.
          </motion.p>
        </div>
      </section>

      {/* Featured Lead Profile Card */}
      <ScrollReveal as="section" variant="fade-up" distance={25} className="max-w-5xl mx-auto px-4 sm:px-6 mb-20">
        <div className="text-center sm:text-left mb-6">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
            Executive Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Chapter Direction
          </h2>
        </div>

        <div className="glass-card-featured rounded-3xl p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.35)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Lead Image */}
            <div className="md:col-span-5 relative group overflow-hidden rounded-2xl border border-white/[0.1]">
              <img
                src={FEATURED_LEAD.image}
                alt={FEATURED_LEAD.name}
                className="w-full h-80 sm:h-96 object-cover object-top group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Lead Content */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <span className="text-xs font-mono text-purple-400 tracking-wider uppercase block">
                  Lead Organizer
                </span>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                  {FEATURED_LEAD.name}
                </h3>
                <p className="text-sm font-semibold text-purple-300 mt-0.5 flex items-center gap-1.5">
                  {getRoleIcon(FEATURED_LEAD.iconName)}
                  <span>{FEATURED_LEAD.role}</span>
                </p>
              </div>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                {FEATURED_LEAD.shortBio}
              </p>

              <div className="pt-3 border-t border-white/[0.08] flex items-center gap-3">
                {FEATURED_LEAD.instagram && (
                  <a
                    href={FEATURED_LEAD.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 hover:bg-purple-950/30 text-gray-300 hover:text-white transition-all"
                    title="Instagram Chapter Feed"
                  >
                    <Instagram className="w-4 h-4 text-purple-400" />
                  </a>
                )}
                {FEATURED_LEAD.linkedin && (
                  <a
                    href={FEATURED_LEAD.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 hover:bg-purple-950/30 text-gray-300 hover:text-white transition-all"
                    title="LinkedIn Profile"
                  >
                    <Linkedin className="w-4 h-4 text-purple-400" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* Core Team Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Working Council
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Team & Domain Owners
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Leaders driving learning tracks, open-source building, community outreach, and career programs.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CORE_TEAM.map((member, idx) => (
            <ScrollReveal
              key={member.id}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={60}
              distance={24}
              className="h-full"
            >
              <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-white/[0.08] transition-all duration-300 h-full">
                {/* Member Photo */}
                <div className="relative h-64 w-full overflow-hidden bg-white/[0.02]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                {/* Member Bio & Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1">
                      {getRoleIcon(member.iconName)}
                      <span>{member.role}</span>
                    </p>

                    <p className="text-xs text-gray-400 leading-relaxed">
                      {member.shortBio}
                    </p>
                  </div>

                  {/* Social Links on Hover */}
                  <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {member.instagram && (
                        <a
                          href={member.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 hover:text-purple-300 transition-colors"
                          title="Instagram"
                        >
                          <Instagram className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 hover:text-purple-300 transition-colors"
                          title="LinkedIn"
                        >
                          <Linkedin className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>

                    <span className="text-[10px] font-mono text-gray-400 group-hover:text-purple-300">
                      GSX Chennai
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Official Community Channels Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 mb-24">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Connect With GSX Chennai
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Follow our official feeds for updates, join discussions, contribute to projects, and expand your network.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" distance={25}>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
            <a
              id="team-instagram-link"
              href={GSX_INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-300 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:border-purple-400/40 transition-colors">
                  <Instagram className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">Instagram</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-purple-300 transition-colors" />
            </a>

            <a
              id="team-linkedin-link"
              href={GSX_LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-300 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:border-purple-400/40 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-sm font-medium">LinkedIn</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-purple-300 transition-colors" />
            </a>

            <a
              id="team-whatsapp-link"
              href={GSX_WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-300 hover:text-white transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 group-hover:border-purple-400/40 transition-colors">
                  <WhatsAppIcon className="w-5 h-5 text-purple-400" />
                </div>
                <span className="text-sm font-medium">WhatsApp</span>
              </div>
              <ArrowUpRight className="w-4 h-4 text-gray-500 group-hover:text-purple-300 transition-colors" />
            </a>
          </div>
        </ScrollReveal>
      </section>

      {/* Volunteer Callout */}
      <ScrollReveal as="section" variant="fade-up" distance={20} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/[0.08] relative overflow-hidden">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">
            Want to Join the Core Team?
          </h3>
          <p className="text-xs sm:text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
            We are always looking for passionate track leads, domain coordinators, and community evangelists to co-lead the future.
          </p>
          <button
            onClick={() => onNavigate('get-involved')}
            className="px-6 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold transition-all inline-flex items-center gap-1.5"
          >
            <span>Apply to Volunteer →</span>
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};

