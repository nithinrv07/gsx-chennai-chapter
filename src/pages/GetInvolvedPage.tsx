import React, { useState } from 'react';
import { PageId } from '../types';
import { OPPORTUNITIES_DATA, COLLABORATION_TYPES } from '../data/opportunities';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { CollaborationInquiryForm } from '../components/CollaborationInquiryForm';
import { BrochureModal } from '../components/BrochureModal';
import { 
  Sparkles, 
  GraduationCap, 
  Code, 
  Award, 
  HeartHandshake, 
  TrendingUp, 
  Globe, 
  Building2, 
  School, 
  Cpu, 
  Compass, 
  ArrowRight,
  Printer,
  FileText
} from 'lucide-react';
import { motion } from 'motion/react';

interface GetInvolvedPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

export const GetInvolvedPage: React.FC<GetInvolvedPageProps> = ({
  onNavigate,
  onOpenJoinModal,
}) => {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);

  const getOpportunityIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap className="w-5 h-5 text-purple-400" />;
      case 'Code':
        return <Code className="w-5 h-5 text-purple-400" />;
      case 'Award':
        return <Award className="w-5 h-5 text-purple-400" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-purple-300" />;
      case 'TrendingUp':
        return <TrendingUp className="w-5 h-5 text-purple-400" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const getCollabIcon = (iconName: string) => {
    switch (iconName) {
      case 'Building2':
        return <Building2 className="w-5 h-5 text-purple-400" />;
      case 'School':
        return <School className="w-5 h-5 text-purple-400" />;
      case 'Cpu':
        return <Cpu className="w-5 h-5 text-purple-400" />;
      case 'Compass':
        return <Compass className="w-5 h-5 text-purple-400" />;
      default:
        return <Sparkles className="w-5 h-5 text-purple-400" />;
    }
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Modal for viewing & printing the official brochure */}
      <BrochureModal isOpen={isBrochureOpen} onClose={() => setIsBrochureOpen(false)} />

      {/* ===================================================
          HERO
          =================================================== */}
      <section className="relative pt-44 sm:pt-52 md:pt-56 pb-24 sm:pb-32 min-h-[500px] sm:min-h-[580px] md:min-h-[620px] flex flex-col justify-center overflow-hidden text-center">
        <HeroGlow intensity="medium" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            There&apos;s a Place for You at{' '}
            <span className="text-gradient-purple">GSX.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Whether you want to learn, build, contribute or collaborate — get involved with the community.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              onClick={onOpenJoinModal}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_30px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Join Community</span>
            </button>

            <button
              onClick={() => scrollToSection('collaborate-section')}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.1] text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Partner With Us</span>
              <ArrowRight className="w-4 h-4 text-purple-400" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* ===================================================
          SECTION 1 — HOW YOU CAN GET INVOLVED
          6 Opportunity Cards
          =================================================== */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-28">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Engagement Pathways
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How You Can Get Involved
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            Find the path that fits your skills, interests and availability.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OPPORTUNITIES_DATA.map((opp, idx) => (
            <ScrollReveal
              key={opp.number}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={60}
              distance={24}
              className="h-full"
            >
              <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] flex flex-col justify-between h-full group">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center">
                      {getOpportunityIcon(opp.iconName)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white/[0.04] text-purple-300 border border-white/[0.06]">
                      {opp.tag}
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="font-mono text-xs text-purple-400 font-bold">
                      {opp.number}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-200 transition-colors">
                      {opp.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-gray-400 group-hover:text-gray-300 leading-relaxed mb-4">
                    {opp.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between">
                  <button
                    onClick={onOpenJoinModal}
                    className="text-xs font-semibold text-purple-400 hover:text-purple-300 flex items-center gap-1 cursor-pointer"
                  >
                    <span>Explore Opportunities</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ===================================================
          SECTION 2 — JOIN GSX
          Large visually impressive section with 3-step journey
          =================================================== */}
      <ScrollReveal as="section" variant="fade-up" distance={30} className="max-w-6xl mx-auto px-4 sm:px-6 mb-28">
        <div className="relative rounded-3xl p-8 sm:p-14 overflow-hidden border border-purple-500/30 bg-gradient-to-br from-[#120a24]/90 via-[#0a0714] to-[#050505] shadow-[0_0_60px_rgba(168,85,247,0.25)]">
          {/* Radial light behind content */}
          <div className="absolute top-0 right-1/4 w-[500px] h-[350px] bg-purple-600/20 blur-[100px] pointer-events-none rounded-full" />

          <div className="max-w-3xl mb-12 relative z-10">
            <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
              Community Membership
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-4">
              Your Journey Starts Here.
            </h2>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              You don&apos;t need to be an expert to join GSX. Bring your curiosity, your ideas and your willingness to contribute.
            </p>
          </div>

          {/* 3-Step Journey Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 relative z-10">
            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-all">
              <span className="font-mono text-xs font-bold text-purple-400 block mb-2">
                01
              </span>
              <h3 className="text-xl font-bold text-white mb-1">JOIN</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Become part of the community. Gain access to study groups, Discord stages, and chapter calendars.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-purple-500/30 bg-purple-950/25 transition-all">
              <span className="font-mono text-xs font-bold text-purple-300 block mb-2">
                02
              </span>
              <h3 className="text-xl font-bold text-white mb-1">CONTRIBUTE</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Attend, build, volunteer and collaborate. Ship code, mentor newcomers, and lead track sessions.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-all">
              <span className="font-mono text-xs font-bold text-purple-400 block mb-2">
                03
              </span>
              <h3 className="text-xl font-bold text-white mb-1">GROW</h3>
              <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                Learn, connect and create impact. Accelerate your career and build technology Chennai can celebrate.
              </p>
            </div>
          </div>

          {/* CTA */}
          <div className="relative z-10">
            <button
              onClick={onOpenJoinModal}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-bold text-sm sm:text-base shadow-[0_0_30px_rgba(168,85,247,0.5)] transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-purple-200" />
              <span>Join GSX Chennai →</span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      {/* ===================================================
          SECTION 3 — COLLABORATE WITH US
          4 collaboration cards + Printable Brochure Card + Collaboration Form
          =================================================== */}
      <section id="collaborate-section" className="max-w-6xl mx-auto px-4 sm:px-6 mb-16 scroll-mt-24">
        <ScrollReveal variant="fade-up" distance={20} className="text-center max-w-xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Institutional Alliances
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Why Partner With GSX Chennai
          </h2>
          <p className="text-sm text-gray-400 mt-2">
            GSX Chennai brings together an active, motivated student community across the city. Partnering gives your organisation direct access to top builders.
          </p>
        </ScrollReveal>

        {/* 4 Collaboration Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
          {COLLABORATION_TYPES.map((type, idx) => (
            <ScrollReveal
              key={type.id}
              variant="fade-up"
              staggerIndex={idx}
              staggerInterval={80}
              distance={24}
              className="h-full"
            >
              <div className="glass-panel p-6 rounded-2xl border border-white/[0.08] hover:border-purple-500/30 transition-all group h-full flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center mb-4">
                    {getCollabIcon(type.iconName)}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-purple-200 transition-colors">
                    {type.title}
                  </h3>
                  <p className="text-xs text-gray-400 leading-relaxed mb-3">
                    {type.description}
                  </p>
                </div>

                {type.bullets && (
                  <ul className="space-y-1.5 pt-3 border-t border-white/[0.04]">
                    {type.bullets.map((bullet, bIdx) => (
                      <li key={bIdx} className="text-[11px] text-gray-300 flex items-start gap-1.5">
                        <span className="text-purple-400 font-bold">•</span>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* ===================================================
            PRINTABLE PARTNERSHIP BROCHURE CARD
            Directly below collaborators section
            =================================================== */}
        <ScrollReveal variant="fade-up" distance={25} className="mb-16">
          <div className="relative p-6 sm:p-10 rounded-3xl overflow-hidden border border-purple-500/30 bg-gradient-to-r from-purple-950/50 via-[#100b20] to-purple-950/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center md:text-left max-w-xl">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-1">
                Official Chapter Brochure
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Print or Share Our Community Brochure
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                Prepared specifically for community groups, colleges, NGOs, and corporate partners. Contains our founding mission, 5 operating verticals, track records, partner benefits, and official contact directory.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => setIsBrochureOpen(true)}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs sm:text-sm shadow-[0_0_20px_rgba(147,51,234,0.4)] transition-all flex items-center gap-2 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>View & Print Brochure</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* ===================================================
            REUSABLE COLLABORATION & INQUIRY FORM
            Clean, validated form with instant success feedback & backend readiness
            =================================================== */}
        <ScrollReveal variant="fade-up" distance={24} className="max-w-2xl mx-auto">
          <CollaborationInquiryForm 
            id="collaboration-form"
            title="Send Collaboration Proposal"
            subtitle="Our chapter relations team will review your proposal and connect back promptly."
            defaultType="Partnership"
          />
        </ScrollReveal>
      </section>
    </div>
  );
};
