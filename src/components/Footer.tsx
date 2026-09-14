import React from 'react';
import { PageId } from '../types';
import { Instagram, Linkedin, Github, ArrowUpRight, Sparkles, MapPin, Mail } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenJoinModal }) => {
  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="relative bg-[#030206] border-t border-white/[0.08] overflow-hidden pt-16 pb-12">
      {/* Background ambient bottom glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] bg-purple-900/10 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-white/[0.06]">
          {/* Brand Column with Immersive UI theme */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(139,92,246,0.5)]">
                <img src="/gsx-logo.png" alt="GSX Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-space text-lg font-bold tracking-tight text-white">
                GSX <span className="text-violet-400">CHENNAI</span>
              </span>
            </div>

            <p className="font-space text-xl font-bold gradient-text tracking-tight">
              LEARN. BUILD. CONNECT. GROW.
            </p>

            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              One community. Many colleges. Limitless opportunities. A city-wide student tech community bringing together students from colleges across Chennai.
            </p>

            <div className="flex flex-col gap-2 text-xs text-gray-400 pt-1">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] w-fit">
                <MapPin className="w-3.5 h-3.5 text-purple-400" />
                <span>Chennai, Tamil Nadu, India</span>
              </div>
              <a
                href="mailto:reachtogsxchennai@gmail.com"
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/[0.06] w-fit hover:border-purple-500/40 hover:text-white transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-purple-400" />
                <span>reachtogsxchennai@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  About GSX
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('team')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Meet the Team
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('events')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Events & Hackathons
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('announcements')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Announcements
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('projects')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Community Projects
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('get-involved')}
                  className="text-gray-300 hover:text-purple-300 transition-colors"
                >
                  Get Involved
                </button>
              </li>
            </ul>
          </div>

          {/* Community & Socials */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Community Channels
            </h3>
            <p className="text-xs text-gray-400">
              Follow our official feeds for announcements, event photos, and community highlights.
            </p>
            <div className="space-y-2 pt-1">
              <a
                id="footer-whatsapp-link"
                href="https://chat.whatsapp.com/HfxItPkZAgeDtdKut2qgfr?s=cl&p=a&ilr=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-green-500/40 hover:bg-green-950/20 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-green-400" />
                  <span className="text-xs font-medium">WhatsApp Community</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-green-300 transition-colors" />
              </a>

              <a
                id="footer-instagram-link"
                href="https://www.instagram.com/gsx_chennai_chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Instagram className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium">Instagram</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-purple-300 transition-colors" />
              </a>

              <a
                id="footer-linkedin-link"
                href="https://www.linkedin.com/company/gsx-chennai-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Linkedin className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium">LinkedIn</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-purple-300 transition-colors" />
              </a>

              <a
                id="footer-github-link"
                href="https://github.com/gsx-chennai"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/40 hover:bg-purple-950/20 text-gray-300 hover:text-white transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <Github className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-medium">GitHub</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-500 group-hover:text-purple-300 transition-colors" />
              </a>
            </div>
          </div>

          {/* Quick Action Column */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
              Ready to Build?
            </h3>
            <p className="text-xs text-gray-400 leading-relaxed">
              Step into Chennai&apos;s fastest growing community of tech creators.
            </p>
            <button
              onClick={onOpenJoinModal}
              className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] transition-all flex items-center justify-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Join GSX Today</span>
            </button>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© 2026 GSX Chennai Chapter. All rights reserved.</p>
          <p className="text-gray-400 font-medium tracking-wide flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-500 inline-block" />
            Built by the community, for the community.
          </p>
        </div>
      </div>
    </footer>
  );
};
