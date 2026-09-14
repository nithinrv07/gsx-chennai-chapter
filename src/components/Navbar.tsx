import React, { useState, useEffect } from 'react';
import { PageId } from '../types';
import { Menu, X, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenJoinModal: () => void;
}

interface NavItem {
  id: PageId;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'team', label: 'Team' },
  { id: 'events', label: 'Events' },
  { id: 'announcements', label: 'Announcements' },
  { id: 'projects', label: 'Projects' },
  { id: 'get-involved', label: 'Get Involved' },
];

const SquigglyUnderline: React.FC<{ isGlow?: boolean; strokeWidth?: number; className?: string }> = ({
  isGlow = true,
  strokeWidth = 2.5,
  className = '',
}) => (
  <svg
    className={`w-full h-full overflow-visible pointer-events-none ${className}`}
    viewBox="0 0 100 16"
    fill="none"
    preserveAspectRatio="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M 1 7 L 8 14 L 15 3 C 26 9, 38 11, 50 7 C 64 3, 78 9, 90 6 C 95 5, 98 7, 100 6"
      stroke="#8B5CF6"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={isGlow ? 'filter drop-shadow-[0_0_7px_rgba(139,92,246,0.85)]' : ''}
    />
  </svg>
);

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenJoinModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hoveredNav, setHoveredNav] = useState<PageId | null>(null);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? 'bg-[#050505]/40 backdrop-blur-md border-b border-white/[0.06] shadow-[0_4px_30px_rgba(0,0,0,0.2)] py-3.5'
            : 'bg-white/65 backdrop-blur-md border-b border-violet-200/50 shadow-[0_4px_25px_rgba(139,92,246,0.06)] py-3.5'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Wordmark */}
          <button
            id="nav-logo-btn"
            onClick={() => handleNavClick('home')}
            className="group flex items-center gap-2.5 text-left cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded-lg p-1 -ml-1 transition-transform"
          >
            <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(139,92,246,0.5)] group-hover:scale-105 transition-transform">
              <img src="/gsx-logo.png" alt="GSX Logo" className="w-full h-full object-contain" />
            </div>
            <span className={`font-space text-lg font-bold tracking-tight ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}>
              GSX <span className="text-violet-500">CHENNAI</span>
            </span>
          </button>

          {/* Desktop Nav Items with Interactive Squiggly Underline Pop-Up */}
          <nav
            className="hidden lg:flex items-center gap-6 xl:gap-8 py-1"
            onMouseLeave={() => setHoveredNav(null)}
          >
            {NAV_ITEMS.map((item) => {
              const isCurrent = currentPage === item.id;
              // When hovering any item, highlight that item; otherwise highlight the active page
              const isHighlighted = hoveredNav ? hoveredNav === item.id : isCurrent;
              const isHovered = hoveredNav === item.id;

              return (
                <motion.button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => setHoveredNav(item.id)}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 480, damping: 24 }}
                  className={`group relative py-1.5 px-1 text-[15px] font-medium tracking-normal transition-colors duration-150 cursor-pointer select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 rounded ${
                    isHighlighted
                      ? isDark
                        ? 'text-white font-semibold'
                        : 'text-slate-950 font-semibold'
                      : isDark
                        ? 'text-slate-400 hover:text-white'
                        : 'text-slate-600 hover:text-slate-950'
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>

                  {/* Squiggly Underline Pops Up on Hover / Active */}
                  {isHighlighted && (
                    <motion.div
                      layoutId="activeNavSquiggle"
                      initial={{ y: 8, scale: 0.8, opacity: 0 }}
                      animate={{ y: 0, scale: 1, opacity: 1 }}
                      exit={{ y: 6, scale: 0.8, opacity: 0 }}
                      className="absolute -bottom-1.5 left-0 right-0 h-3 pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 480,
                        damping: 26,
                        mass: 0.6,
                      }}
                    >
                      <SquigglyUnderline
                        strokeWidth={2.6}
                        isGlow={true}
                        className={isHovered ? 'scale-105 transition-transform' : ''}
                      />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </nav>

          {/* Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              id="nav-join-btn"
              onClick={onOpenJoinModal}
              className="glass text-white border-violet-500/30 hover:border-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.25)] hover:shadow-[0_0_25px_rgba(139,92,246,0.5)] px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400 shadow-[0_0_6px_#8B5CF6]" />
              <span>Join Chapter</span>
            </button>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              id="mobile-join-shortcut-btn"
              onClick={onOpenJoinModal}
              className="sm:hidden px-3 py-1.5 text-xs font-semibold rounded-full bg-violet-600/30 border border-violet-500/40 text-violet-200"
            >
              Join
            </button>
            <button
              id="nav-hamburger-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg border transition-colors focus:outline-none ${
                isDark 
                  ? 'bg-white/[0.04] border-white/[0.08] text-gray-300 hover:text-white' 
                  : 'bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
              }`}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className={`lg:hidden border-b backdrop-blur-2xl overflow-hidden px-4 pt-3 pb-6 shadow-2xl ${
              isDark 
                ? 'border-white/[0.08] bg-[#07050d]/95' 
                : 'border-violet-200 bg-white/95'
            }`}
          >
            <div className="flex flex-col space-y-1.5 pt-2">
              {NAV_ITEMS.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    id={`mobile-nav-${item.id}`}
                    onClick={() => handleNavClick(item.id)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-colors ${
                      isActive
                        ? isDark 
                          ? 'bg-white/[0.04] text-white border border-violet-500/30 font-semibold' 
                          : 'bg-violet-50 text-slate-950 border border-violet-300 font-semibold'
                        : isDark 
                          ? 'text-gray-300 hover:bg-white/[0.04] hover:text-white' 
                          : 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <div className="relative inline-block py-0.5">
                      <span className={isActive ? (isDark ? 'text-white font-semibold' : 'text-slate-950 font-semibold') : ''}>
                        {item.label}
                      </span>
                      {isActive && (
                        <div className="absolute -bottom-1 left-0 right-0 h-2.5 pointer-events-none">
                          <SquigglyUnderline strokeWidth={2.4} isGlow={true} />
                        </div>
                      )}
                    </div>
                    {isActive && <div className="w-2 h-2 rounded-full bg-violet-400 shadow-[0_0_8px_#8B5CF6]" />}
                  </button>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/[0.08] flex flex-col gap-3">
                <button
                  id="mobile-drawer-join-btn"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenJoinModal();
                  }}
                  className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-purple-600 to-violet-600 shadow-[0_0_25px_rgba(147,51,234,0.35)] cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Join GSX Chennai Community</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
