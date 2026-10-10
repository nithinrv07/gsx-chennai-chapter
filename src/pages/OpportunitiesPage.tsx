import React from 'react';
import { PageId } from '../types';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { Users, Hammer, Mic, GitPullRequest, ArrowUpRight, Sparkles } from 'lucide-react';

interface OpportunitiesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

const opportunities = [
  {
    id: 'join-tech-team',
    title: 'Join our tech team',
    description: 'Collaborate with student developers and designers to build tools, websites, and experiences for the GSX community. Bring your skills and learn alongside the team.',
    tags: ['Development', 'Design', 'Teamwork'],
    action: 'Join the team',
    icon: Users,
  },
  {
    id: 'build-with-guidance',
    title: 'Build projects with our guidance',
    description: 'Have an idea but need help getting started? Develop it step by step with community guidance, feedback, and support—from choosing your tools to building a working demo.',
    tags: ['Project building', 'Guidance', 'Feedback'],
    action: 'Start building',
    icon: Hammer,
  },
  {
    id: 'become-speaker',
    title: 'Become a speaker',
    description: 'Share a technology, project, or lesson you have learned. Express your interest in leading a tech talk, workshop, or community session and help others learn from your experience.',
    tags: ['Tech talks', 'Workshops', 'Knowledge sharing'],
    action: 'Express speaking interest',
    icon: Mic,
  },
  {
    id: 'contribute',
    title: 'Contribute',
    description: 'Help the community through code, documentation, design, content, or event support. Choose a contribution that matches your interests and make an impact with the team.',
    tags: ['Open source', 'Content', 'Community'],
    action: 'Get involved',
    icon: GitPullRequest,
  },
];

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ onOpenJoinModal }) => (
  <div className="relative min-h-screen pb-24">
    <section className="relative pt-40 sm:pt-48 pb-16 sm:pb-20 overflow-hidden text-center">
      <HeroGlow intensity="medium" />
      <div className="relative z-10 max-w-3xl mx-auto px-6">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Find your place at GSX
        </span>
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight mb-6">Opportunities</h1>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-xl mx-auto">
          Learn by doing, share what you know, and create something meaningful with the GSX Chennai Chapter.
        </p>
      </div>
    </section>

    <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {opportunities.map((opportunity, index) => {
        const Icon = opportunity.icon;
        return (
          <ScrollReveal key={opportunity.id} variant="fade-up" staggerIndex={index} staggerInterval={60} className="h-full">
            <section id={opportunity.id} className="scroll-mt-28 glass-panel glass-panel-hover rounded-3xl p-7 sm:p-9 border border-white/[0.08] hover:border-purple-500/40 transition-all h-full flex flex-col">
              <div className="flex items-center justify-between mb-7">
                <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/25 text-purple-300 flex items-center justify-center"><Icon className="w-6 h-6" /></div>
                <span className="text-xs font-mono text-purple-400/60">0{index + 1}</span>
              </div>
              <h2 className="text-2xl font-bold text-white leading-snug mb-4">{opportunity.title}</h2>
              <p className="text-sm text-gray-300 leading-relaxed mb-6">{opportunity.description}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {opportunity.tags.map(tag => <span key={tag} className="text-xs px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-purple-200">{tag}</span>)}
              </div>
              <button type="button" onClick={onOpenJoinModal} className="mt-auto w-full flex items-center justify-between gap-3 px-5 py-3.5 rounded-xl bg-purple-600/25 hover:bg-purple-600/40 border border-purple-500/30 text-purple-100 font-semibold text-sm transition-colors">
                {opportunity.action}<ArrowUpRight className="w-4 h-4 shrink-0" />
              </button>
            </section>
          </ScrollReveal>
        );
      })}
    </div>
    <p className="relative z-10 text-center text-xs text-gray-400 mt-8 px-6">Use the GSX community form to share your interest with the chapter team.</p>
  </div>
);
