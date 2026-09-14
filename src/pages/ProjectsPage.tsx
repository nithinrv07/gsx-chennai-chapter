import React, { useState } from 'react';
import { PageId, ProjectCategory, ProjectItem } from '../types';
import { PROJECTS_DATA } from '../data/projects';
import { HeroGlow } from '../components/HeroGlow';
import { ScrollReveal } from '../components/ScrollReveal';
import { ExternalLink, Sparkles, Layers, ArrowRight, Plus } from 'lucide-react';
import { motion } from 'motion/react';

interface ProjectsPageProps {
  onNavigate: (page: PageId) => void;
  onOpenProjectDetail: (project: ProjectItem) => void;
  onOpenSubmitModal: () => void;
}

const CATEGORIES: ProjectCategory[] = [
  'All',
  'AI / ML',
  'Web',
  'Mobile',
  'Open Source',
  'Hardware',
  'Other'
];

export const ProjectsPage: React.FC<ProjectsPageProps> = ({
  onNavigate,
  onOpenProjectDetail,
  onOpenSubmitModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');

  const filteredProjects = PROJECTS_DATA.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
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
            Ideas Into <span className="text-gradient-purple">Impact.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Explore projects built by members of the GSX Chennai community.
          </motion.p>

          <button
            onClick={onOpenSubmitModal}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-purple-200 hover:text-white border border-purple-500/40 text-xs font-semibold shadow-lg transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit / Share Your Project</span>
          </button>
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

      {/* Projects Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 mb-24">
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, idx) => (
              <ScrollReveal
                key={project.id}
                variant="fade-up"
                staggerIndex={idx}
                staggerInterval={70}
                distance={24}
                className="h-full"
              >
                <div
                  className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group border border-white/[0.08] cursor-pointer h-full"
                  onClick={() => onOpenProjectDetail(project)}
                >
                  {/* Cover Image */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-transparent to-transparent" />
                    <span className="absolute top-3 left-3 px-2.5 py-1 text-[10px] font-semibold rounded-full bg-black/70 backdrop-blur-md text-purple-300 border border-purple-500/30">
                      {project.category}
                    </span>
                  </div>

                  {/* Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-1 mb-2">
                        {project.title}
                      </h3>

                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed mb-4">
                        {project.shortDescription}
                      </p>

                      {/* Tech stack badges */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.techStack.map((tech, i) => (
                          <span
                            key={i}
                            className="px-2 py-0.5 rounded text-[10px] font-mono bg-white/[0.03] text-purple-300 border border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                      <span className="text-[11px] text-gray-400">
                        by {project.creators[0]?.name || 'GSX Community'}
                      </span>

                      <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        {project.liveDemoUrl && (
                          <a
                            href={project.liveDemoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 hover:text-white transition-colors"
                            title="Live Demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        ) : (
          <div className="glass-panel p-10 sm:p-16 rounded-3xl border border-white/[0.08] text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-purple-600/20 border border-purple-500/30 text-purple-300 flex items-center justify-center mx-auto mb-5 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">
              No Projects Showcased Yet
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto mb-8">
              We&apos;re curating submissions from student builders across Chennai. Have you built an open-source tool, AI model, or prototype? Be the first to get featured!
            </p>
            <button
              onClick={onOpenSubmitModal}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Submit Your Project</span>
            </button>
          </div>
        )}
      </section>

      {/* Final Submission CTA */}
      <ScrollReveal as="section" variant="fade-up" distance={25} className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-950/40 via-[#0a0715] to-purple-950/40 border border-purple-500/30 shadow-[0_0_40px_rgba(168,85,247,0.2)]">
          <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block mb-2">
            Open Submissions
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            Have something to build?
          </h2>
          <p className="text-sm text-gray-300 max-w-md mx-auto mb-6 leading-relaxed">
            Get peer code reviews, deployment credits, design mentorship, and feature your work on the community showcase.
          </p>
          <button
            onClick={onOpenSubmitModal}
            className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Sparkles className="w-4 h-4 text-purple-200" />
            <span>Submit / Share Your Project →</span>
          </button>
        </div>
      </ScrollReveal>
    </div>
  );
};
