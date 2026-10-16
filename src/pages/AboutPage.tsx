import React from 'react';
import { PageId } from '../types';
import { ABOUT_CONTACT, ABOUT_INTRO, ABOUT_SECTIONS, ABOUT_SOCIAL_LINKS, AboutLink } from '../data/aboutContent';
import { PageHero } from '../components/PageHero';
import { WhatsAppIcon } from '../components/WhatsAppIcon';
import { ArrowUpRight, Instagram, Linkedin, Mail } from 'lucide-react';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

function inline(text: string): React.ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((part, index) => {
    if (part.startsWith('**')) return <strong key={index} className="font-bold text-purple-100">{part.slice(2, -2)}</strong>;
    if (part.startsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return part;
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

const LINK_ICONS: Record<AboutLink['kind'], React.ReactNode> = {
  linkedin: <Linkedin className="w-4 h-4" />,
  instagram: <Instagram className="w-4 h-4" />,
  whatsapp: <WhatsAppIcon className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
};

const LinkButton: React.FC<{ link: AboutLink; primary?: boolean }> = ({ link, primary = false }) => {
  const external = !link.href.startsWith('mailto:');
  return (
    <a
      href={link.href}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-semibold transition-all ${
        primary
          ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-[0_0_20px_rgba(168,85,247,0.35)]'
          : 'border border-purple-400/30 bg-purple-500/10 hover:bg-purple-500/20 hover:border-purple-400/60 text-purple-100'
      }`}
    >
      {LINK_ICONS[link.kind]}
      <span>{link.label}</span>
      <ArrowUpRight className="w-3.5 h-3.5 opacity-70" />
    </a>
  );
};

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenJoinModal }) => (
  <div className="about-copy relative min-h-screen pb-24">
    <PageHero title={<>{ABOUT_INTRO[0].replace(/^# /, '')}</>} description={<>{inline(ABOUT_INTRO[1])}</>} />
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <header className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
        <div className="space-y-2 text-base sm:text-lg text-gray-300">
          {ABOUT_INTRO.slice(2).map((line) => <p key={line}>{inline(line)}</p>)}
        </div>
        <nav aria-label="About sections" className="flex flex-wrap justify-center gap-2 mt-8">
          {ABOUT_SECTIONS.map(({ id, title }) => (
            <a key={id} href={`#about#${id}`} className="px-4 py-2 rounded-full border border-purple-500/25 text-sm text-purple-200 hover:bg-purple-500/10 transition-colors">
              {title}
            </a>
          ))}
          <a href="#about#connect" className="px-4 py-2 rounded-full border border-purple-500/25 text-sm text-purple-200 hover:bg-purple-500/10 transition-colors">
            Connect
          </a>
        </nav>
      </header>

      {ABOUT_SECTIONS.map((section, index) => {
        const { introduction, groups } = splitGroups(section.blocks);
        return (
          <section key={section.id} id={section.id} className="scroll-mt-28 mb-14 sm:mb-16 border-t border-purple-500/15 pt-10">
            <div className="flex items-start gap-4 mb-5">
              <span className="text-xs text-purple-400 mt-3 shrink-0">{String(index + 1).padStart(2, '0')}</span>
              <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">{section.title}</h2>
            </div>
            {introduction.length > 0 && (
              <div className="space-y-4 max-w-3xl">
                {introduction.map((block) => (
                  <p key={block} className="text-base sm:text-lg text-gray-300 leading-relaxed">{inline(block)}</p>
                ))}
              </div>
            )}
            {groups.length > 0 && (
              <div className={`grid grid-cols-1 sm:grid-cols-2 ${groups.length > 2 ? 'lg:grid-cols-3' : ''} gap-4 ${introduction.length ? 'mt-7' : ''}`}>
                {groups.map((group) => (
                  <article key={group.title} className="spotlight-card rounded-2xl border border-purple-500/15 bg-white/[0.02] p-6">
                    <h3 className="text-lg sm:text-xl font-bold text-purple-100 mb-3">{group.title}</h3>
                    <div className="space-y-2 text-sm sm:text-base text-gray-300 leading-relaxed">
                      {group.blocks.map((block) => <p key={block}>{inline(block)}</p>)}
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        );
      })}

      {/* Connect: social channels and chapter contact as buttons */}
      <section id="connect" className="scroll-mt-28 mb-14 border-t border-purple-500/15 pt-10">
        <div className="flex items-start gap-4 mb-5">
          <span className="text-xs text-purple-400 mt-3 shrink-0">{String(ABOUT_SECTIONS.length + 1).padStart(2, '0')}</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">Connect With Us</h2>
        </div>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed max-w-3xl mb-6">
          Follow our journey and stay connected with the community.
        </p>
        <div className="flex flex-wrap gap-3 mb-8">
          {ABOUT_SOCIAL_LINKS.map((link) => <LinkButton key={link.label} link={link} />)}
        </div>

        <article className="spotlight-card rounded-2xl border border-purple-500/15 bg-white/[0.02] p-6 sm:p-8 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-purple-400 mb-2">Chapter contact</p>
          <h3 className="text-xl font-bold text-white">{ABOUT_CONTACT.name}</h3>
          <p className="text-sm text-purple-200 mt-1">{ABOUT_CONTACT.role}</p>
          <p className="text-sm text-gray-400 mt-1">{ABOUT_CONTACT.org}</p>
          <div className="flex flex-wrap gap-3 mt-5">
            {ABOUT_CONTACT.links.map((link, i) => <LinkButton key={link.label} link={link} primary={i === 0} />)}
          </div>
        </article>
      </section>

      <div className="text-center pt-4">
        <p className="text-lg font-semibold text-white mb-5">Different colleges. Different places. One community.</p>
        <button type="button" onClick={onOpenJoinModal} className="inline-flex items-center gap-3 px-7 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold transition-colors">
          Join GSX Chennai <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
);
