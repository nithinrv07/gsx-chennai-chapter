import React, { useState } from 'react';
import { PageId } from '../types';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import {
  Briefcase,
  Trophy,
  GitPullRequest,
  Award,
  Sparkles,
  ExternalLink,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Bookmark,
  Share2
} from 'lucide-react';
import { motion } from 'motion/react';

interface OpportunitiesPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

interface OpportunityItem {
  id: string;
  title: string;
  organization: string;
  category: 'internships' | 'hackathons' | 'open-source' | 'fellowships' | 'other';
  type: string;
  location: string;
  deadline: string;
  stipend?: string;
  description: string;
  tags: string[];
  link: string;
  isFeatured?: boolean;
}

const OPPORTUNITIES_LIST: OpportunityItem[] = [
  // Internships
  {
    id: 'opp-int-1',
    title: 'AI Engineering & Agent Development Intern',
    organization: 'Chennai AI Tech Labs / Partner Cohort',
    category: 'internships',
    type: 'Internship / Hybrid',
    location: 'Chennai (OMR) / Remote',
    deadline: 'Rolling Intake',
    stipend: '₹20,000 – ₹35,000 / mo',
    description: 'Work on production LangChain/LlamaIndex agents, fine-tuning open-source LLMs, and deploying vector search pipelines with FastAPI.',
    tags: ['Python', 'LLMs', 'FastAPI', 'PyTorch'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9',
    isFeatured: true
  },
  {
    id: 'opp-int-2',
    title: 'Full-Stack Web Engineering Intern',
    organization: 'SaaS Builder Partner Incubator',
    category: 'internships',
    type: 'Internship / Hybrid',
    location: 'Chennai (Guindy)',
    deadline: 'Applications Open',
    stipend: '₹15,000 – ₹25,000 / mo',
    description: 'Build responsive web apps with Next.js, TypeScript, TailwindCSS, and PostgreSQL. Pair with senior architects on scalable backend microservices.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Tailwind'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },
  {
    id: 'opp-int-3',
    title: 'DevOps & Cloud Systems Intern',
    organization: 'Enterprise Infrastructure Guild',
    category: 'internships',
    type: 'Internship / Remote',
    location: 'Remote / Chennai',
    deadline: 'Open Until Filled',
    stipend: '₹18,000 – ₹30,000 / mo',
    description: 'Deploy Kubernetes clusters, implement automated CI/CD GitHub Actions, manage Terraform infrastructure, and monitor containerized apps.',
    tags: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },

  // Hackathons
  {
    id: 'opp-hack-1',
    title: 'GSX Chennai AI Build Sprint 2026',
    organization: 'GSX Chennai Chapter Flagship',
    category: 'hackathons',
    type: '36-Hour Hackathon',
    location: 'Chennai (In-Person)',
    deadline: 'Registration Open',
    stipend: '₹1,50,000 Prize Pool',
    description: 'Build high-impact civic, educational, or developer productivity software using generative AI models. Mentorship and food provided.',
    tags: ['GenAI', 'Civic Tech', 'Prizes', 'Mentorship'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9',
    isFeatured: true
  },
  {
    id: 'opp-hack-2',
    title: 'Smart India Hackathon (SIH)',
    organization: 'Ministry of Education / AICTE',
    category: 'hackathons',
    type: 'National Hackathon',
    location: 'Pan-India Nodal Centers',
    deadline: 'Annual Cohort',
    stipend: '₹1,00,000 per Problem Statement',
    description: 'Nation-wide initiative providing students a platform to solve real pressing problems faced by ministries, government departments, and industries.',
    tags: ['National', 'Hardware & Software', 'GovTech'],
    link: 'https://sih.gov.in/'
  },
  {
    id: 'opp-hack-3',
    title: 'Tamil Nadu Hackathon & Civic Tech Sprint',
    organization: 'TNeGA & StartupTN',
    category: 'hackathons',
    type: 'Regional Hackathon',
    location: 'Chennai',
    deadline: 'Quarterly',
    stipend: 'Grants & Incubation',
    description: 'Build technology solutions for vernacular digital literacy, public transit optimization, and healthcare delivery across Tamil Nadu.',
    tags: ['State Govt', 'StartupTN', 'Civic Tech'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },

  // Open Source
  {
    id: 'opp-os-1',
    title: 'GirlScript Summer of Code (GSSoC)',
    organization: 'GirlScript Foundation',
    category: 'open-source',
    type: '3-Month Open Source Program',
    location: 'Virtual / Global',
    deadline: 'Annual Summer / Winter Editions',
    stipend: 'Badges, Swag & Top Performer Rewards',
    description: '3-month open source program designed to help beginners start contributing to real-world code repositories with dedicated mentor support.',
    tags: ['GSSoC', 'Beginner Friendly', 'Mentorship', 'Swag'],
    link: 'https://gssoc.girlscript.tech/',
    isFeatured: true
  },
  {
    id: 'opp-os-2',
    title: 'Google Summer of Code (GSoC)',
    organization: 'Google Open Source',
    category: 'open-source',
    type: 'Global Mentorship Program',
    location: 'Remote',
    deadline: 'Annual Global Program',
    stipend: '$1,500 – $3,000 Stipend',
    description: 'Global, online program focused on bringing new contributors into open source software development under veteran organization mentors.',
    tags: ['Global', 'Google', 'High Stipend', 'Prestigious'],
    link: 'https://summerofcode.withgoogle.com/'
  },
  {
    id: 'opp-os-3',
    title: 'Hacktoberfest by DigitalOcean',
    organization: 'DigitalOcean, Cloudflare, GitHub',
    category: 'open-source',
    type: 'Annual Celebration',
    location: 'Worldwide',
    deadline: 'Every October',
    stipend: 'Digital Badges & Tree Planting',
    description: 'Month-long celebration of open-source software, encouraging developers across skill levels to contribute meaningful pull requests.',
    tags: ['GitHub', 'Hacktoberfest', 'Open Source'],
    link: 'https://hacktoberfest.com/'
  },

  // Fellowships
  {
    id: 'opp-fel-1',
    title: 'GSX Builder Fellowship & Research Cohort',
    organization: 'GSX Chennai Chapter',
    category: 'fellowships',
    type: '8-Week Intensive Fellowship',
    location: 'Chennai / Hybrid',
    deadline: 'Quarterly Application Cycle',
    stipend: 'Cloud Credits + Mentorship Grant',
    description: 'An elite cohort for student engineers building production open-source software, datasets, and systems. Direct 1-on-1 industry mentorship.',
    tags: ['Fellowship', 'Mentorship', 'Cloud Grants'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9',
    isFeatured: true
  },
  {
    id: 'opp-fel-2',
    title: 'Major League Hacking (MLH) Fellowship',
    organization: 'Major League Hacking & Tech Sponsors',
    category: 'fellowships',
    type: '12-Week Remote Fellowship',
    location: 'Remote',
    deadline: 'Spring / Summer / Fall Batches',
    stipend: 'Need-based Educational Stipend',
    description: 'Internship alternative where participants collaborate on production open-source repositories utilized by millions of developers worldwide.',
    tags: ['MLH', 'Global Cohort', 'Production Code'],
    link: 'https://fellowship.mlh.io/'
  },

  // Other Opportunities
  {
    id: 'opp-oth-1',
    title: 'Student Speaker & Tech Talk CFP',
    organization: 'GSX Chennai Community Stages',
    category: 'other',
    type: 'Conference / Meetup Speaking',
    location: 'Chennai Meetups & Virtual',
    deadline: 'Always Open',
    stipend: 'Speaker Gift Hamper & Video Recording',
    description: 'Have you built a cool side project or learned a fascinating technology? Deliver a 20-minute lightning talk at upcoming GSX monthly meetups.',
    tags: ['Public Speaking', 'Community', 'Recognition'],
    link: 'https://forms.gle/AFdmVVLug64CURiq9'
  },
  {
    id: 'opp-oth-2',
    title: 'GitHub Campus Experts Program',
    organization: 'GitHub Education',
    category: 'other',
    type: 'Student Leadership Program',
    location: 'Campus Based',
    deadline: 'Biannual Applications',
    stipend: 'Training, Event Grants & Swag',
    description: 'Become the technical community leader on your college campus. Get specialized leadership training, resources, and event funding from GitHub.',
    tags: ['GitHub', 'Leadership', 'Event Grants'],
    link: 'https://github.com/education/students'
  }
];

export const OpportunitiesPage: React.FC<OpportunitiesPageProps> = ({ onNavigate, onOpenJoinModal }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filterOpportunities = (cat: 'internships' | 'hackathons' | 'open-source' | 'fellowships' | 'other') => {
    return OPPORTUNITIES_LIST.filter((item) => {
      const matchesCategory = item.category === cat;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.organization.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesCategory && (activeCategory === 'all' || activeCategory === cat) && matchesSearch;
    });
  };

  const renderSection = (
    id: string,
    title: string,
    subtitle: string,
    icon: React.ReactNode,
    categoryKey: 'internships' | 'hackathons' | 'open-source' | 'fellowships' | 'other'
  ) => {
    const items = filterOpportunities(categoryKey);
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
            {items.length} Available
          </span>
        </div>

        {items.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((opp, idx) => (
              <ScrollReveal
                key={opp.id}
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
                        {opp.type}
                      </span>
                      {opp.isFeatured && (
                        <span className="text-[10px] font-semibold text-yellow-300 flex items-center gap-1 bg-yellow-500/10 border border-yellow-500/20 px-2 py-0.5 rounded-full">
                          <Sparkles className="w-2.5 h-2.5" /> Featured
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors mb-1">
                      {opp.title}
                    </h3>

                    <div className="text-xs font-medium text-purple-400 mb-3">
                      {opp.organization}
                    </div>

                    <p className="text-xs text-gray-300/90 leading-relaxed mb-4">
                      {opp.description}
                    </p>

                    <div className="space-y-1.5 mb-4 text-[11px] text-gray-400">
                      <div className="flex items-center gap-1.5">
                        <MapPin className="w-3 h-3 text-purple-400" />
                        <span>{opp.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3 h-3 text-purple-400" />
                        <span>Deadline: {opp.deadline}</span>
                      </div>
                      {opp.stipend && (
                        <div className="flex items-center gap-1.5 text-green-400 font-semibold">
                          <Award className="w-3 h-3" />
                          <span>{opp.stipend}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {opp.tags.map((tag) => (
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
                      href={opp.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold transition-all inline-flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>Apply / Learn More</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-gray-400 glass-panel rounded-2xl">
            No opportunities found matching your query in this section.
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
            <Sparkles className="w-3.5 h-3.5 text-purple-400" />
            <span>Curated Career & Builder Opportunities</span>
          </div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6 sm:mb-8"
          >
            Launch Your <span className="text-gradient-purple">Tech Career.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-300/90 max-w-2xl sm:max-w-3xl mx-auto leading-relaxed mb-8"
          >
            Discover verified internships, flagship hackathons, open-source programs, and student fellowships vetted for Chennai developers.
          </motion.p>

          {/* Search bar */}
          <div className="max-w-md mx-auto relative mb-6">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by role, stack, or organization..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/[0.04] border border-white/[0.08] text-white text-xs placeholder:text-gray-500 focus:outline-none focus:border-purple-500/50"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { id: 'all', label: 'All Categories' },
              { id: 'internships', label: 'Internships' },
              { id: 'hackathons', label: 'Hackathons' },
              { id: 'open-source', label: 'Open Source' },
              { id: 'fellowships', label: 'Fellowships' },
              { id: 'other', label: 'Other' }
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
        'internships',
        'Internships',
        'Industry internships, startup pairings, and engineering trainee roles',
        <Briefcase className="w-5 h-5" />,
        'internships'
      )}

      {renderSection(
        'hackathons',
        'Hackathons',
        'Competitions, build sprints, and national engineering challenges',
        <Trophy className="w-5 h-5" />,
        'hackathons'
      )}

      {renderSection(
        'open-source',
        'Open Source',
        'Global contributor programs, code bounties, and repository sprints',
        <GitPullRequest className="w-5 h-5" />,
        'open-source'
      )}

      {renderSection(
        'fellowships',
        'Fellowships',
        'Intensive technical fellowships, research grants, and mentor cohorts',
        <Award className="w-5 h-5" />,
        'fellowships'
      )}

      {renderSection(
        'other-opportunities',
        'Other Opportunities',
        'Public speaking CFPs, grants, and student ambassador programs',
        <Sparkles className="w-5 h-5" />,
        'other'
      )}

      {/* Submit an Opportunity CTA */}
      <ScrollReveal as="section" variant="fade-up" distance={25} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0a0715] to-purple-950/40 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Are You Hiring or Hosting an Opportunity?
          </h3>
          <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
            Feature your company&apos;s internship, hackathon, or grant directly to 2,000+ enthusiastic builders across Chennai.
          </p>
          <button
            onClick={onOpenJoinModal}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Submit an Opportunity →</span>
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};
