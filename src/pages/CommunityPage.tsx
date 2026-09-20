import React, { useState } from 'react';
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
  CheckCircle2,
  MapPin,
  ExternalLink,
  Code2,
  Cpu,
  Globe2,
  Search,
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

const CHENNAI_COLLEGES = [
  {
    name: 'Chennai Institute of Technology (CIT)',
    zone: 'Kundrathur / West Chennai',
    type: 'Autonomous Institution',
    status: 'Active Chapter',
    highlights: 'Active AI Study Circle & Robotics Labs'
  },
  {
    name: 'College of Engineering, Guindy (Anna University)',
    zone: 'Guindy / Central Chennai',
    type: 'State University Campus',
    status: 'Active Chapter',
    highlights: 'Open-Source Hackers & Research Cohorts'
  },
  {
    name: 'Madras Institute of Technology (Anna University)',
    zone: 'Chromepet / South Chennai',
    type: 'State University Campus',
    status: 'Active Chapter',
    highlights: 'Avionics & Embedded Systems Innovators'
  },
  {
    name: 'SRM Institute of Science and Technology',
    zone: 'Kattankulathur / Chengalpattu',
    type: 'Deemed University',
    status: 'Active Chapter',
    highlights: 'High Contributor Turnout & Web3 Guild'
  },
  {
    name: 'SSN College of Engineering',
    zone: 'Kalavakkam / OMR IT Corridor',
    type: 'Autonomous Institution',
    status: 'Active Chapter',
    highlights: 'Machine Learning & Competitive Programming'
  },
  {
    name: 'B.S. Abdur Rahman Crescent Institute (BSACIST)',
    zone: 'Vandalur / South Chennai',
    type: 'Deemed University',
    status: 'Active Chapter',
    highlights: 'Startup Incubation & Cloud Circles'
  },
  {
    name: 'Sathyabama Institute of Science and Technology',
    zone: 'Sholinganallur / OMR',
    type: 'Deemed University',
    status: 'Active Chapter',
    highlights: 'Space Tech & Deep Learning Teams'
  },
  {
    name: 'Loyola-ICAM College of Engineering (LICET)',
    zone: 'Nungambakkam / Central Chennai',
    type: 'Affiliated Institution',
    status: 'Active Chapter',
    highlights: 'Design Thinking & Mobile App Guild'
  },
  {
    name: 'Rajalakshmi Engineering College (REC)',
    zone: 'Thandalam / West Chennai',
    type: 'Autonomous Institution',
    status: 'Partner College',
    highlights: 'Hackathon Finalists & Core Engineering'
  },
  {
    name: 'Sri Venkateswara College of Engineering (SVCE)',
    zone: 'Pennalur / Sriperumbudur',
    type: 'Autonomous Institution',
    status: 'Partner College',
    highlights: 'Automotive AI & Systems Engineering'
  }
];

const COMMUNITY_CIRCLES = [
  {
    title: 'AI & LLM Study Circle',
    tag: 'Weekly Syncs',
    description: 'Deep dives into open-weights models, prompt architecture, autonomous agents, and PyTorch implementations.',
    leadCount: '450+ Learners'
  },
  {
    title: 'Open Source Guild',
    tag: 'Git & Linux',
    description: 'Hands-on PR reviews, GSoC & GSSoC mentorship, repository maintenance, and issue triage.',
    leadCount: '380+ Builders'
  },
  {
    title: 'Full-Stack & Cloud Guild',
    tag: 'Production Tech',
    description: 'React, Next.js, FastAPI, Docker, Kubernetes, and serverless architectures powering modern products.',
    leadCount: '520+ Devs'
  },
  {
    title: 'Competitive Coding & DSA',
    tag: 'Interview Prep',
    description: 'Algorithmic problem solving, LeetCode patterns, system design fundamentals, and mock interviews.',
    leadCount: '340+ Solvers'
  }
];

export const CommunityPage: React.FC<CommunityPageProps> = ({ onNavigate, onOpenJoinModal }) => {
  const [collegeFilter, setCollegeFilter] = useState('');

  const filteredColleges = CHENNAI_COLLEGES.filter((c) =>
    c.name.toLowerCase().includes(collegeFilter.toLowerCase()) ||
    c.zone.toLowerCase().includes(collegeFilter.toLowerCase())
  );

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
              <div className="text-2xl sm:text-3xl font-extrabold text-purple-400 font-mono">15+</div>
              <div className="text-xs text-gray-400 mt-1">Colleges Represented</div>
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
          SECTION 1 — MEMBERS (#members)
          Community Learning Circles & Member Highlights
          =================================================== */}
      <section id="members" className="max-w-6xl mx-auto px-4 sm:px-6 mb-28 scroll-mt-28">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Peer Ecosystem
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Community Members & Guilds
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Every member finds their home in focused study circles and engineering tracks tailored to real-world skilling.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-14">
          {COMMUNITY_CIRCLES.map((circle, idx) => (
            <ScrollReveal
              key={circle.title}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={60}
              distance={24}
              className="h-full"
            >
              <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] h-full flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300">
                      {circle.tag}
                    </span>
                    <span className="text-[11px] text-gray-400">{circle.leadCount}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-2">
                    {circle.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    {circle.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-purple-400 font-medium">
                  <span>Active Circle</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Member Culture Showcase */}
        <ScrollReveal variant="fade-up" distance={25}>
          <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-purple-500/20 bg-gradient-to-r from-purple-950/30 via-[#0d071d] to-purple-950/20">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center sm:text-left">
              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto sm:mx-0">
                  <Code2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Learn in Public</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Share your daily builds, debug hurdles, and project code without judgment.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto sm:mx-0">
                  <Globe2 className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Cross-College Synergy</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Pair with coders and designers outside your own campus to win hackathons.</p>
              </div>

              <div className="space-y-2">
                <div className="w-10 h-10 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-purple-300 mx-auto sm:mx-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-white">Career Acceleration</h4>
                <p className="text-xs text-gray-400 leading-relaxed">Direct mentorship and referrals from senior alumni placed at top tech teams.</p>
              </div>
            </div>
          </div>
        </ScrollReveal>
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

                <p className="text-sm text-gray-300 leading-relaxed">
                  {FEATURED_LEAD.shortBio}
                </p>

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

      {/* ===================================================
          SECTION 3 — COLLEGES (#colleges)
          Partner Colleges Across Chennai
          =================================================== */}
      <section id="colleges" className="max-w-6xl mx-auto px-4 sm:px-6 mb-28 scroll-mt-28">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Campus Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Colleges Across Chennai
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Our members hail from leading engineering colleges and universities across the city.
          </p>
        </ScrollReveal>

        {/* Filter Input */}
        <div className="max-w-md mx-auto mb-8 relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search colleges or zones (e.g. CIT, Guindy, OMR)..."
            value={collegeFilter}
            onChange={(e) => setCollegeFilter(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredColleges.map((col, idx) => (
            <ScrollReveal
              key={col.name}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={40}
              distance={20}
            >
              <div className="glass-panel p-5 rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-all flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-purple-400 px-2 py-0.5 rounded bg-purple-950/50 border border-purple-500/30">
                      {col.type}
                    </span>
                    <span className="text-[10px] font-semibold text-green-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      {col.status}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white mb-1.5">{col.name}</h4>

                  <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{col.zone}</span>
                  </div>

                  <p className="text-xs text-purple-200/80 bg-white/[0.02] p-2 rounded-lg border border-white/[0.04]">
                    {col.highlights}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
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
