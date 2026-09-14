import React from 'react';
import { PageId } from '../types';
import { JOURNEY_TIMELINE } from '../data/journey';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { 
  Sparkles, 
  Target, 
  Eye, 
  Lightbulb, 
  Users2, 
  Flame, 
  Compass, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate, onOpenJoinModal }) => {
  const values = [
    {
      number: '01',
      title: 'Curiosity',
      description: 'We believe genuine curiosity is the catalyst for all breakthroughs. We encourage asking ambitious questions and exploring uncharted technologies without fear of failing.',
      icon: <Lightbulb className="w-5 h-5 text-purple-400" />
    },
    {
      number: '02',
      title: 'Collaboration',
      description: 'The best engineering doesn’t happen in silos. We foster radical peer support, cross-disciplinary pairing, and open knowledge sharing across university lines.',
      icon: <Users2 className="w-5 h-5 text-purple-400" />
    },
    {
      number: '03',
      title: 'Innovation',
      description: 'Beyond textbook theory, we champion hands-on creation. We construct prototypes, fine-tune models, deploy containers, and solder hardware to learn by shipping.',
      icon: <Flame className="w-5 h-5 text-purple-300" />
    },
    {
      number: '04',
      title: 'Impact',
      description: 'Technology is meaningful when it solves tangible human problems. We focus on civic infrastructure, accessibility, local developer tools, and community empowerment.',
      icon: <Compass className="w-5 h-5 text-purple-400" />
    }
  ];

  return (
    <div className="relative min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative pt-32 sm:pt-40 pb-16 sm:pb-24 overflow-hidden text-center">
        <HeroGlow intensity="medium" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
          >
            Building a Community of{' '}
            <span className="text-gradient-purple">Builders.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
          >
            GSX Chennai is a community where curiosity turns into knowledge, knowledge turns into ideas, and ideas turn into impact.
          </motion.p>
        </div>
      </section>

      {/* Editorial Section: Who We Are */}
      <ScrollReveal as="section" variant="fade-up" distance={28} className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <div className="glass-panel rounded-3xl p-8 sm:p-14 border border-white/[0.08] relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-6 text-gray-300 leading-relaxed text-sm sm:text-base relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block">
              GirlScript Foundation Student Extension
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              An Open Technical Sanctuary for Chennai&apos;s Builders
            </h2>
            <p className="text-white font-medium text-base sm:text-lg leading-relaxed">
              GSX Chennai is the official local student extension of the <span className="text-purple-300 font-semibold">GirlScript Foundation</span> — a global non-profit focused on empowering beginners in technology and building inclusive tech communities. GSX Chennai brings that mission to the city, creating a high-impact technical ecosystem where students don&apos;t just consume technology, but learn it, build with it, and contribute to it.
            </p>
            <p>
              It is a community-driven platform designed to bridge the gap between academic learning and real-world industry demands — because while college gives students a foundation, the technology industry constantly asks them to go beyond it.
            </p>
            <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20 text-purple-200 text-sm italic">
              &ldquo;A community doesn&apos;t exist because of a logo, a chapter, or a social media page. It exists because people show up.&rdquo;
              <span className="block mt-1 text-xs text-purple-400 not-italic font-semibold">— From the Chapter Lead&apos;s Inaugural Address</span>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* The Five Operating Verticals */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Five Verticals
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            The chapter&apos;s structural pillars — Learning is live from week one; Building and Community scale next; Impact and Career expand as our reach grows.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-purple-500/30">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-purple-950/60 border border-purple-500/30">01 • LIVE NOW</span>
              <span className="text-xs text-green-400 font-semibold">Active</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Learning</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              Weekly AI study circles, open-source workshops, teacher sessions, and beginner bootcamps.
            </p>
            <div className="text-[11px] text-purple-300 font-medium">
              Study circles • Bootcamps • Workshops
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">02 • CORE</span>
              <span className="text-xs text-purple-300 font-semibold">Active</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Building</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              Dataset contributions, open-model work, autonomous AI agents, monthly Build Days, and hackathons.
            </p>
            <div className="text-[11px] text-purple-300 font-medium">
              AI Agents • Open Source • Build Days
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">03 • ECOSYSTEM</span>
              <span className="text-xs text-purple-300 font-semibold">Active</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Community</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              Monthly meetups, founder talks, AI reading clubs, inter-college mixers, and local tech networking.
            </p>
            <div className="text-[11px] text-purple-300 font-medium">
              Meetups • Founder Talks • Networking
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">04 • OUTREACH</span>
              <span className="text-xs text-purple-300 font-semibold">Expanding</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Impact</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              AI-awareness sessions in schools, NGO digital-literacy drives, local-language AI projects, and cybersecurity awareness.
            </p>
            <div className="text-[11px] text-purple-300 font-medium">
              School Outreach • NGO Drives • Vernacular AI
            </div>
          </div>

          <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] md:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-purple-400 px-2.5 py-0.5 rounded-full bg-white/[0.04] border border-white/[0.08]">05 • PATHWAYS</span>
              <span className="text-xs text-purple-300 font-semibold">Expanding</span>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Career</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-3">
              Internship prep, certifications, resume-review clinics, research opportunities, and direct industry referrals.
            </p>
            <div className="text-[11px] text-purple-300 font-medium">
              Internships • Certifications • Resume Clinics • Referrals
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mission */}
          <ScrollReveal variant="fade-up" staggerIndex={0} distance={24} className="h-full">
            <div className="glass-panel p-8 rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Target className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 block">
                Our Compass
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Create an inclusive ecosystem where students and developers can learn, build, collaborate and grow together beyond classroom boundaries.
              </p>
            </div>
          </ScrollReveal>

          {/* Vision */}
          <ScrollReveal variant="fade-up" staggerIndex={1} distance={24} className="h-full">
            <div className="glass-panel p-8 rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-colors h-full">
              <div className="w-12 h-12 rounded-xl bg-purple-950/50 border border-purple-500/30 flex items-center justify-center text-purple-300 mb-6 shadow-[0_0_20px_rgba(168,85,247,0.2)]">
                <Eye className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-2 block">
                The Long Horizon
              </span>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <p className="text-gray-300 text-sm sm:text-base leading-relaxed">
                Build a city-wide connected community of creators and innovators who use technology to solve meaningful problems.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Our Values */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-28">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Guiding Philosophy
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Values
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            The core tenets that define our culture, events, and community interactions.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {values.map((v, idx) => (
            <ScrollReveal
              key={v.number}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={90}
              distance={24}
              className="h-full"
            >
              <div className="glass-panel glass-panel-hover p-6 sm:p-8 rounded-2xl border border-white/[0.08] h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08]">
                      {v.icon}
                    </div>
                    <span className="font-mono text-xs font-bold text-purple-400">{v.number}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{v.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">{v.description}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Our Journey Timeline */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Milestones & Roadmap
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Our Journey
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            From an informal study circle to an active multi-college technology collective.
          </p>
        </ScrollReveal>

        {/* Timeline representation */}
        <div className="relative border-l border-purple-500/20 ml-4 sm:ml-32 space-y-10">
          {JOURNEY_TIMELINE.map((item, idx) => (
            <ScrollReveal
              key={idx}
              variant="fade-left"
              staggerIndex={idx}
              staggerInterval={80}
              distance={24}
              className="relative pl-6 sm:pl-8 group"
            >
              {/* Timeline marker */}
              <div className="absolute -left-2.5 top-1.5 w-5 h-5 rounded-full bg-[#090710] border-2 border-purple-500 group-hover:border-purple-300 transition-colors shadow-[0_0_10px_rgba(168,85,247,0.5)] flex items-center justify-center">
                <div className="w-1.5 h-1.5 rounded-full bg-purple-400" />
              </div>

              {/* Step indicator on desktop */}
              <div className="hidden sm:block absolute -left-28 top-1 text-right w-20">
                <span className="font-mono text-xs font-bold text-purple-400">
                  STEP {item.step}
                </span>
              </div>

              <div className="glass-panel p-5 sm:p-6 rounded-xl border border-white/[0.06] group-hover:border-purple-500/30 transition-all">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-purple-200 transition-colors">
                    {item.title}
                  </h3>
                  <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded bg-white/[0.04] text-purple-300 border border-white/[0.08]">
                    {item.status}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* Contributor Journey Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 mb-24">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Long-Term Growth Pathway
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Contributor Journey
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            A defined progression pathway showing that GSX Chennai is not a one-off event, but a lifelong technical career trajectory.
          </p>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" distance={25}>
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/[0.08]">
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 py-2">
              {[
                'Student',
                'Learner',
                'Contributor',
                'Mentor',
                'Chapter Lead',
                'Fellow',
                'Researcher',
                'Builder',
                'Startup Founder',
                'Ecosystem Partner'
              ].map((role, idx, arr) => (
                <React.Fragment key={role}>
                  <span className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-purple-950/50 border border-purple-500/30 text-purple-200">
                    {role}
                  </span>
                  {idx < arr.length - 1 && (
                    <span className="text-purple-400 font-bold text-xs">→</span>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06] text-center">
              <p className="text-base sm:text-lg font-medium text-white italic">
                &ldquo;GSX Chennai isn&apos;t something that happens for students. It&apos;s something that happens with students.&rdquo;
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Final CTA */}
      <ScrollReveal as="section" variant="fade-up" distance={30} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0a0715] to-purple-950/40 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Be Part of the Journey
          </h2>
          <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
            Whether you want to write code, design user experiences, organize hackathons, or mentor builders.
          </p>
          <button
            onClick={onOpenJoinModal}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Be Part of the Journey →</span>
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};
