import React from 'react';
import { PageId, GSX_JOIN_FORM_URL, GSX_WHATSAPP_URL, GSX_INSTAGRAM_URL, GSX_LINKEDIN_URL } from '../types';
import { FEATURED_LEAD, CORE_TEAM } from '../data/team';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import {
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  ArrowUpRight,
  ExternalLink,
  Cpu,
  Linkedin,
  Compass,
  BookOpen,
  Hammer,
  HeartHandshake,
  TrendingUp,
  Megaphone
} from 'lucide-react';
import { motion } from 'motion/react';

interface CommunityPageProps {
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

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, onOpenJoinModal }) => {
  return (
    <div className="relative min-h-screen pb-20">
      {/* ===================================================
          HERO SECTION
          =================================================== */}
      <section className="relative pt-44 sm:pt-52 md:pt-56 pb-24 sm:pb-32 min-h-[500px] sm:min-h-[580px] md:min-h-[620px] flex flex-col justify-center overflow-hidden text-center">
        <HeroGlow intensity="medium" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
            <Users className="w-3.5 h-3.5 text-purple-400" />
            <span>Chennai&apos;s Inter-College Tech Collective</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            One Community.{' '}
            <span className="text-gradient-purple">Many Colleges.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-10"
          >
            Connecting student builders, researchers, and developers across Chennai institutions to learn in public, ship projects, and build lifelong friendships.
          </motion.p>

          {/* Quick Metrics */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto"
          >
            <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">2,000+</div>
              <div className="text-xs text-gray-400 mt-1">Community Members</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">Chennai</div>
              <div className="text-xs text-gray-400 mt-1">Students across colleges</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
              <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">100+</div>
              <div className="text-xs text-gray-400 mt-1">Open Source Builders</div>
            </div>
            <div className="glass-panel p-4 rounded-2xl border border-white/[0.08]">
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">100%</div>
              <div className="text-xs text-gray-400 mt-1">Free & Open Access</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          SECTION 2 — CORE TEAM (#core-team)
          Executive Leadership & Domain Owners
          =================================================== */}
      <section id="core-team" className="max-w-6xl mx-auto px-4 sm:px-6 mb-28 scroll-mt-28">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Working Council
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Core Team & Domain Owners
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            The student leaders architecting tracks, organizing meetups, and curating experiences across the city.
          </p>
        </ScrollReveal>

        {/* Featured Lead */}
        <ScrollReveal variant="fade-up" distance={25} className="mb-14">
          <div className="glass-card-featured rounded-3xl p-6 sm:p-10 border border-purple-500/30 relative overflow-hidden transition-all duration-300 hover:shadow-[0_0_50px_rgba(168,85,247,0.35)]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div className="md:col-span-4 relative group overflow-hidden rounded-2xl border border-white/[0.1]">
                <img
                  src={FEATURED_LEAD.image}
                  alt={FEATURED_LEAD.name}
                  className="w-full h-72 sm:h-80 object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="md:col-span-8 space-y-4">
                <div>
                  <span className="text-xs font-mono text-purple-400 tracking-wider uppercase block">
                    Chapter Leadership
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                    {FEATURED_LEAD.name}
                  </h3>
                  <p className="text-sm font-semibold text-purple-300 mt-0.5 flex items-center gap-1.5">
                    {getRoleIcon(FEATURED_LEAD.iconName)}
                    <span>{FEATURED_LEAD.role}</span>
                  </p>
                </div>

                <div className="space-y-4">
                  {FEATURED_LEAD.shortBio.split('\n\n').map((paragraph, index) => (
                    <p key={index} className="text-sm text-gray-300 leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                <div className="text-xs text-purple-300 bg-purple-950/40 border border-purple-500/30 px-3.5 py-2 rounded-xl inline-block">
                  <span className="font-semibold text-white">Owns:</span> {FEATURED_LEAD.owns}
                </div>

                {FEATURED_LEAD.linkedin && (
                  <div className="pt-2">
                    <a
                      href={FEATURED_LEAD.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 hover:bg-purple-950/30 text-gray-300 hover:text-white transition-all inline-flex items-center gap-2 text-xs"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="w-4 h-4 text-purple-400" />
                      <span>Connect on LinkedIn</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Core Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {CORE_TEAM.map((member, idx) => (
            <ScrollReveal
              key={member.id}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={50}
              distance={24}
              className="h-full"
            >
              <div className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-white/[0.08] transition-all duration-300 h-full">
                <div className="relative h-60 w-full overflow-hidden bg-white/[0.02]">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-purple-200 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-semibold text-purple-400 mb-2 flex items-center gap-1">
                      {getRoleIcon(member.iconName)}
                      <span>{member.role}</span>
                    </p>
                    <p className="text-xs text-gray-400 leading-relaxed mb-3">
                      {member.shortBio}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-white/[0.06] flex items-center justify-between">
                    {member.linkedin ? (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-1.5 rounded-lg bg-white/[0.03] text-gray-400 hover:text-purple-300 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <span className="text-[10px] text-gray-400">GSX Chennai</span>
                    )}

                    <span className="text-[10px] font-mono text-purple-400">
                      Core Team
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Students across Chennai colleges */}
      <section id="colleges" className="max-w-5xl mx-auto px-4 sm:px-6 mb-24 scroll-mt-28">
        <ScrollReveal variant="fade-up" distance={20}>
          <div className="glass-panel rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#0d071d] to-purple-950/20 p-8 sm:p-12 text-center">
            <div className="w-14 h-14 rounded-2xl bg-purple-500/15 border border-purple-500/25 text-purple-300 flex items-center justify-center mx-auto mb-6">
              <Users className="w-7 h-7" />
            </div>
            <span className="text-xs font-semibold uppercase tracking-widest text-purple-400 block mb-3">Beyond individual campuses</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-5">Different Colleges. One Community.</h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Our community brings together students from different colleges across Chennai. Through GSX Chennai Chapter, they connect with peers beyond their own campuses, learn together, collaborate on projects, share ideas, and grow as a community.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* ===================================================
          SECTION 4 — JOIN GSX (#join-gsx)
          Community Call to Action
          =================================================== */}
      <section id="join-gsx" className="max-w-4xl mx-auto px-4 sm:px-6 scroll-mt-28">
        <ScrollReveal variant="fade-up" distance={30}>
          <div className="p-8 sm:p-14 rounded-3xl bg-gradient-to-r from-purple-950/50 via-[#100722] to-purple-950/50 border border-purple-500/30 shadow-[0_0_50px_rgba(168,85,247,0.3)] text-center">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-8 h-8 text-purple-300" />
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
              Join the GSX Chennai Community
            </h2>
            <p className="text-sm sm:text-base text-gray-300 max-w-xl mx-auto mb-8 leading-relaxed">
              Open to every curious student, self-taught programmer, and tech enthusiast in Chennai. Zero admission fees. Just show up and build with us.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href={GSX_JOIN_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Join Official GSX Community</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={GSX_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-4 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <WhatsAppIcon className="w-4 h-4 text-green-400" />
                <span>Join WhatsApp Announcements</span>
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};
