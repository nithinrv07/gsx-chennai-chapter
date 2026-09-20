import React, { useState } from 'react';
import { PageId } from '../types';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  BookOpen,
  Compass,
  Video,
  Gift,
  ExternalLink,
  Sparkles,
  Search,
  Code,
  Layers,
  Terminal,
  FileText,
  Download,
  CheckCircle,
  PlayCircle,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';

interface ResourcesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

interface ResourceItem {
  id: string;
  title: string;
  category: 'learning' | 'guides' | 'workshops' | 'student-resources';
  format: string;
  description: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  tags: string[];
  link: string;
  badge?: string;
}

const RESOURCES_DATA: ResourceItem[] = [
  // Learning Roadmaps
  {
    id: 'res-learn-1',
    title: 'Generative AI & Autonomous Agent Architecture',
    category: 'learning',
    format: 'Curated Roadmap + Notebooks',
    level: 'Intermediate',
    description: 'Master transformers, embeddings, vector databases, RAG systems, function calling, and multi-agent frameworks using Python.',
    tags: ['GenAI', 'Python', 'LangChain', 'LlamaIndex'],
    link: 'https://github.com/nithinrv07',
    badge: 'Popular'
  },
  {
    id: 'res-learn-2',
    title: 'Modern Full-Stack Engineering Roadmap',
    category: 'learning',
    format: 'Curriculum & Projects',
    level: 'Beginner',
    description: 'Step-by-step roadmap from TypeScript, React 19, and TailwindCSS to PostgreSQL, Prisma, Redis, and Next.js full-stack deployments.',
    tags: ['React', 'TypeScript', 'Next.js', 'PostgreSQL'],
    link: 'https://github.com/nithinrv07'
  },
  {
    id: 'res-learn-3',
    title: 'System Design & Scalable Cloud Backend',
    category: 'learning',
    format: 'Interactive Guide',
    level: 'Advanced',
    description: 'Learn load balancing, caching strategies, CAP theorem, database sharding, microservices communication, and message queues (Kafka/RabbitMQ).',
    tags: ['System Design', 'Docker', 'Kubernetes', 'Cloud'],
    link: 'https://github.com/nithinrv07'
  },
  {
    id: 'res-learn-4',
    title: 'Data Structures & Algorithms in Practice',
    category: 'learning',
    format: 'Problem Set & Solutions',
    level: 'Intermediate',
    description: '75 essential coding interview patterns, dynamic programming breakdowns, graph algorithms, and spatial complexity analysis.',
    tags: ['DSA', 'LeetCode', 'Interview Prep'],
    link: 'https://github.com/nithinrv07'
  },

  // Guides
  {
    id: 'res-guide-1',
    title: 'The Open Source Contributor Handbook',
    category: 'guides',
    format: 'Handbook (Markdown/PDF)',
    level: 'Beginner',
    description: 'A complete handbook on finding good first issues, git branching, rebasing, writing descriptive pull requests, and communicating with maintainers.',
    tags: ['Git', 'GitHub', 'Open Source', 'Guide'],
    link: 'https://github.com/nithinrv07',
    badge: 'Essential'
  },
  {
    id: 'res-guide-2',
    title: 'Cracking Chennai Tech Campus & Off-Campus Drives',
    category: 'guides',
    format: 'Career Playbook',
    level: 'Beginner',
    description: 'ATS resume formatting, cold emailing templates that work, portfolio building tips, technical mock questions, and behavioral rounds preparation.',
    tags: ['Resume', 'Interviews', 'Placements'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },
  {
    id: 'res-guide-3',
    title: 'Deploying Production Apps on Cloud for Free',
    category: 'guides',
    format: 'Tutorial & Boilerplate',
    level: 'Intermediate',
    description: 'How to utilize free tier tiers on Vercel, Supabase, Neon, Render, and Cloudflare Workers to launch production-grade full-stack apps.',
    tags: ['Deployment', 'Vercel', 'Supabase', 'Cloudflare'],
    link: 'https://github.com/nithinrv07'
  },

  // Workshops
  {
    id: 'res-ws-1',
    title: 'AI Build Day: Building Your First Agent with Ollama & LangChain',
    category: 'workshops',
    format: 'Video Recording & GitHub Repo',
    level: 'Intermediate',
    description: 'Full 2-hour recorded workshop walking through setting up local LLMs with Ollama and building an interactive code assistant agent.',
    tags: ['Ollama', 'LangChain', 'Local AI', 'Workshop'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9',
    badge: 'Recorded'
  },
  {
    id: 'res-ws-2',
    title: 'Mastering Git & GitHub Collaboration Workshop',
    category: 'workshops',
    format: 'Slides + Practice Repos',
    level: 'Beginner',
    description: 'Interactive session covering merge conflict resolution, git stash, cherry-picking, interactive rebase, and GitHub Actions CI pipelines.',
    tags: ['Git', 'CI/CD', 'GitHub Actions'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },
  {
    id: 'res-ws-3',
    title: 'Full-Stack Rapid Prototyping Masterclass',
    category: 'workshops',
    format: 'Slide Deck & Code Template',
    level: 'Intermediate',
    description: 'How to build and ship an MVP in a 24-hour hackathon timeframe using Vite, TailwindCSS, Supabase Auth, and REST APIs.',
    tags: ['Hackathons', 'MVP', 'Full-Stack'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },

  // Student Resources
  {
    id: 'res-stu-1',
    title: 'GitHub Student Developer Pack Guide',
    category: 'student-resources',
    format: 'Free Developer Perks',
    description: 'Get free domain names, GitHub Copilot access, $100 DigitalOcean credits, JetBrains IDE licenses, and 50+ premium developer tools for free.',
    tags: ['GitHub Pack', 'Free Domains', 'Copilot'],
    link: 'https://education.github.com/pack',
    badge: 'Valued at $200k+'
  },
  {
    id: 'res-stu-2',
    title: 'Cloud Credits for Student Builders',
    category: 'student-resources',
    format: 'Cloud Free Tiers',
    description: 'AWS Educate, Microsoft Azure for Students ($100 no-credit-card credit), and Google Cloud for Startups student vouchers directory.',
    tags: ['AWS', 'Azure', 'GCP', 'Cloud Credits'],
    link: 'https://azure.microsoft.com/en-us/free/students/'
  },
  {
    id: 'res-stu-3',
    title: 'Free API Keys & Developer Sandbox Directory',
    category: 'student-resources',
    format: 'Curated Directory',
    description: 'Comprehensive list of free API endpoints for hackathons: weather, maps, financial data, speech-to-text, and public AI model endpoints.',
    tags: ['APIs', 'Free Tier', 'Hackathons'],
    link: 'https://github.com/public-apis/public-apis'
  }
];

export const ResourcesPage: React.FC<ResourcesPageProps> = ({ onNavigate, onOpenJoinModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterResources = (cat: 'learning' | 'guides' | 'workshops' | 'student-resources') => {
    return RESOURCES_DATA.filter((item) => {
      const matchesCategory = item.category === cat;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && (activeCategory === 'all' || activeCategory === cat) && matchesSearch;
    });
  };

  const renderSection = (
    id: string,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    categoryKey: 'learning' | 'guides' | 'workshops' | 'student-resources'
  ) => {
    const items = filterResources(categoryKey);
    if (activeCategory !== 'all' && activeCategory !== categoryKey) return null;

    return (
      <section id={id} className="max-w-6xl mx-auto px-4 sm:px-6 mb-24 scroll-mt-28">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-purple-950/50 border border-purple-500/30 text-purple-400">
              {icon}
            </div>
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-purple-400">
            {items.length} Resources
          </span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((res, idx) => (
              <ScrollReveal
                key={res.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerInterval={60}
                distance={20}
                className="h-full"
              >
                <div className="glass-panel glass-panel-hover p-6 rounded-2xl border border-white/[0.08] hover:border-purple-500/40 transition-all flex flex-col justify-between h-full group">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-purple-950/70 border border-purple-500/30 text-purple-300">
                        {res.format}
                      </span>
                      {res.badge && (
                        <span className="text-[10px] font-semibold text-yellow-300 flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> {res.badge}
                        </span>
                      )}
                      {res.level && (
                        <span className="text-[10px] text-gray-400 bg-white/[0.04] px-2 py-0.5 rounded">
                          {res.level}
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-2">
                      {res.title}
                    </h3>

                    <p className="text-xs text-gray-300/90 leading-relaxed mb-4">
                      {res.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {res.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-purple-300 border border-white/[0.06]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                    <a
                      href={res.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Access Resource</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-gray-400 glass-panel rounded-2xl">
            No resources found matching your search.
          </div>
        )}
      </section>
    );
  };

  return (
    <div className="relative min-h-screen pb-20">
      {/* Hero */}
      <section className="relative pt-44 sm:pt-52 md:pt-56 pb-24 sm:pb-32 min-h-[500px] sm:min-h-[580px] md:min-h-[620px] flex flex-col justify-center overflow-hidden text-center">
        <HeroGlow intensity="medium" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-950/60 border border-purple-500/30 text-purple-300 text-xs font-semibold mb-6">
            <BookOpen className="w-3.5 h-3.5 text-purple-400" />
            <span>Open Knowledge Vault for Developers</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            Resources to <span className="text-gradient-purple">Level Up.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Carefully curated roadmaps, open-source handbooks, recorded workshops, and student perks curated by the GSX Chennai community.
          </motion.p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search guides, roadmaps, workshop topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Resources' },
              { id: 'learning', label: 'Learning' },
              { id: 'guides', label: 'Guides' },
              { id: 'workshops', label: 'Workshops' },
              { id: 'student-resources', label: 'Student Resources' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === tab.id
                    ? 'bg-purple-600 text-white shadow-[0_0_20px_rgba(168,85,247,0.4)] border border-purple-400/50'
                    : 'bg-white/[0.03] text-gray-400 hover:text-white hover:bg-white/[0.06] border border-white/[0.06]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Sections matching user sitemap */}
      {renderSection(
        'learning',
        'Learning',
        'Structured roadmaps, study tracks, and engineering curriculum',
        <BookOpen className="w-5 h-5" />,
        'learning'
      )}

      {renderSection(
        'guides',
        'Guides',
        'Practical handbooks for open-source, career, and system building',
        <Compass className="w-5 h-5" />,
        'guides'
      )}

      {renderSection(
        'workshops',
        'Workshops',
        'Slide decks, live recordings, and accompanying code repositories',
        <Video className="w-5 h-5" />,
        'workshops'
      )}

      {renderSection(
        'student-resources',
        'Student Resources',
        'GitHub Student Pack, cloud credits, and free developer tool perks',
        <Gift className="w-5 h-5" />,
        'student-resources'
      )}

      {/* Submit Resource CTA */}
      <ScrollReveal as="section" variant="fade-up" distance={25} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0a0715] to-purple-950/40 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Have a Guide or Resource to Share?
          </h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
            Contribute your technical notes, cheatsheets, or tutorial repositories to benefit thousands of students across Chennai.
          </p>
          <button
            onClick={onOpenJoinModal}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Contribute a Resource →</span>
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};
