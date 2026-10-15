import React from 'react';
import { PageId } from '../types';
import { ABOUT_INTRO, ABOUT_SECTIONS } from '../data/aboutContent';
import { PageHero } from '../components/PageHero';
import { ArrowUpRight } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

const sectionIds: Record<string, string> = {
  "An Open Technical Community for Chennai's Builders": 'what-is-gsx',
  'Our Five Verticals': 'our-pillars',
  'Our Mission': 'our-mission',
  'Our Vision': 'our-vision',
  'Our Values': 'our-values',
  'Our Journey': 'our-journey',
};

function inline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|https?:\/\/[^\s]+)/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index} className="font-bold text-purple-100">{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    if (/^https?:\/\//.test(part)) return <a key={index} href={part} target="_blank" rel="noopener noreferrer" className="text-purple-300 underline underline-offset-4 hover:text-white break-words">{part}</a>;
    return part;
  });
}

function blocks(content: string[]) {
  return content.map((block, index) => {
    if (block.startsWith('- ')) return <ul key={index} className="list-disc pl-5 space-y-2 text-gray-300 text-base leading-relaxed">{block.split('\n').map((line, i) => <li key={i}>{inline(line.replace(/^- /, ''))}</li>)}</ul>;
    return <p key={index} className="text-base sm:text-lg text-gray-300 leading-relaxed whitespace-pre-line">{inline(block)}</p>;
  });
}

function splitGroups(content: string[]) {
  const introduction: string[] = [];
  const groups: { title: string; blocks: string[] }[] = [];
  for (const block of content) {
    if (block.startsWith('### ')) groups.push({ title: block.slice(4), blocks: [] });
    else if (groups.length) groups[groups.length - 1].blocks.push(block);
    else introduction.push(block);
  }
  return { introduction, groups };
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenJoinModal }) => (
  <div className="about-copy relative min-h-screen pb-24">
    <PageHero title={<>{ABOUT_INTRO[0].replace(/^# /, '')}</>} description={<>{inline(ABOUT_INTRO[1])}</>} />
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <header className="text-center max-w-3xl mx-auto mb-16 sm:mb-24">
        <div className="space-y-4">{blocks(ABOUT_INTRO.slice(2))}</div>
        <nav aria-label="About sections" className="flex flex-wrap justify-center gap-2 mt-8">
          {[['what-is-gsx', 'Our story'], ['our-pillars', 'Five verticals'], ['our-mission', 'Mission'], ['our-values', 'Values'], ['our-journey', 'Our journey']].map(([id, label]) => <a key={id} href={`#about#${id}`} className="px-4 py-2 rounded-full border border-purple-500/25 text-sm text-purple-200 hover:bg-purple-500/10 transition-colors">{label}</a>)}
        </nav>
      </header>

      {ABOUT_SECTIONS.map((section, index) => {
        const { introduction, groups } = splitGroups(section.blocks);
        const id = sectionIds[section.title] || section.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-$/, '');
        return (
          <section key={section.title} id={id} className="scroll-mt-28 mb-16 sm:mb-20 border-t border-purple-500/15 pt-10 sm:pt-12">
            <div className="flex items-start gap-4 mb-6">
              <span className="text-xs text-purple-400 mt-3 shrink-0">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{section.title}</h2>
            </div>
            <div className="space-y-5 max-w-3xl">{blocks(introduction)}</div>
            {groups.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
                {groups.map(group => (
                  <article key={group.title} className="spotlight-card rounded-2xl border border-purple-500/15 bg-white/[0.02] p-6 sm:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold text-purple-100 mb-5">{group.title}</h3>
                    <div className="space-y-4">{blocks(group.blocks)}</div>
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}
      <div className="text-center">
        <button type="button" onClick={onOpenJoinModal} className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors">Join GSX Chennai <ArrowUpRight className="w-4 h-4" /></button>
      </div>
    </div>
  </div>
);
