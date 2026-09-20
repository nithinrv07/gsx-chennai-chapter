import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';
import { SearchModal } from './SearchModal';
import { ChevronDown, ChevronRight, Sparkles } from 'lucide-react';

export interface NavbarProps {
  currentPage: PageId;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenJoinModal: () => void;
}

export interface NavDropdownChild {
  id: string;
  label: string;
  sectionId?: string;
  description?: string;
}

export interface NavStructureItem {
  id: PageId;
  label: string;
  children?: NavDropdownChild[];
}

export const NAV_STRUCTURE: NavStructureItem[] = [
  {
    id: 'home',
    label: 'Home',
  },
  {
    id: 'about',
    label: 'About',
    children: [
      { id: 'what-is-gsx', label: 'What is GSX?', sectionId: 'what-is-gsx', description: 'Our identity & foundation' },
      { id: 'our-mission', label: 'Our Mission', sectionId: 'our-mission', description: 'Guiding purpose & vision' },
      { id: 'our-pillars', label: 'Our Pillars', sectionId: 'our-pillars', description: '5 verticals & core values' },
      { id: 'our-journey', label: 'Our Journey', sectionId: 'our-journey', description: 'Milestones & contributor path' },
    ],
  },
  {
    id: 'community',
    label: 'Community',
    children: [
      { id: 'members', label: 'Members', sectionId: 'members', description: 'Student network & study circles' },
      { id: 'core-team', label: 'Core Team', sectionId: 'core-team', description: 'Leadership & domain owners' },
      { id: 'colleges', label: 'Colleges', sectionId: 'colleges', description: '15+ Chennai college chapters' },
      { id: 'join-gsx', label: 'Join GSX', sectionId: 'join-gsx', description: 'Become an active member' },
    ],
  },
  {
    id: 'events',
    label: 'Events',
    children: [
      { id: 'upcoming-events', label: 'Upcoming Events', sectionId: 'upcoming-events', description: 'Hackathons, meetups & summits' },
      { id: 'past-events', label: 'Past Events', sectionId: 'past-events', description: 'Recaps & highlights' },
      { id: 'event-details', label: 'Event Details', sectionId: 'event-details', description: 'Schedules & speaker info' },
    ],
  },
  {
    id: 'projects',
    label: 'Projects',
    children: [
      { id: 'ongoing-projects', label: 'Ongoing Projects', sectionId: 'ongoing-projects', description: 'Active builds in development' },
      { id: 'completed-projects', label: 'Completed Projects', sectionId: 'completed-projects', description: 'Showcased tools & AI apps' },
      { id: 'collaborate-with-us', label: 'Collaborate With Us', sectionId: 'collaborate-with-us', description: 'Submit & build with us' },
    ],
  },
  {
    id: 'opportunities',
    label: 'Opportunities',
    children: [
      { id: 'internships', label: 'Internships', sectionId: 'internships', description: 'Tech internships & referral tracks' },
      { id: 'hackathons', label: 'Hackathons', sectionId: 'hackathons', description: 'National & regional challenges' },
      { id: 'open-source', label: 'Open Source', sectionId: 'open-source', description: 'GSSoC, GSoC & chapter sprints' },
      { id: 'fellowships', label: 'Fellowships', sectionId: 'fellowships', description: 'Elite builder cohorts & grants' },
      { id: 'other-opportunities', label: 'Other Opportunities', sectionId: 'other-opportunities', description: 'CFPs, grants & ambassadorships' },
    ],
  },
  {
    id: 'resources',
    label: 'Resources',
    children: [
      { id: 'learning', label: 'Learning', sectionId: 'learning', description: 'Curated roadmaps & tracks' },
      { id: 'guides', label: 'Guides', sectionId: 'guides', description: 'Git, career & system playbooks' },
      { id: 'workshops', label: 'Workshops', sectionId: 'workshops', description: 'Recorded sessions & slide decks' },
      { id: 'student-resources', label: 'Student Resources', sectionId: 'student-resources', description: 'Free packs, cloud & dev tools' },
    ],
  },
  {
    id: 'get-involved',
    label: 'Get Involved',
    children: [
      { id: 'join-gsx', label: 'Join GSX', sectionId: 'join-gsx', description: '3-step membership onboarding' },
      { id: 'volunteer', label: 'Volunteer', sectionId: 'volunteer', description: 'Lead tracks & organize events' },
      { id: 'partner-with-us', label: 'Partner With Us', sectionId: 'partner-with-us', description: 'Companies, NGOs & sponsors' },
      { id: 'start-gsx-college', label: 'Start GSX at Your College', sectionId: 'start-gsx-college', description: 'Launch a campus extension' },
    ],
  },
];

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenJoinModal,
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHome = currentPage === 'home';

  // Scroll detection for sticky header frosted glass effect
  useEffect(() => {
    const handleScroll = () => {
      const threshold = isHome ? 250 : 20;
      setScrolled(window.scrollY > threshold);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHome]);

  // Global click-outside and keyboard escape listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setActiveDropdown(null);
        setMobileOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveDropdown(null);
        if (mobileOpen) {
          setMobileOpen(false);
          menuBtnRef.current?.focus();
        }
      }
      // Quick search shortcut: press '/' or 'Ctrl+K' / 'Cmd+K' when not inside an input
      if (
        (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key === 'k')) &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setActiveDropdown(null);
        setMobileOpen(false);
        setSearch(true);
      }
    };
    const media = matchMedia('(min-width: 1001px)');
    const handleResize = () => {
      setMobileOpen(false);
      setActiveDropdown(null);
    };

    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    media.addEventListener('change', handleResize);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      media.removeEventListener('change', handleResize);
      if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    };
  }, [mobileOpen]);

  const handleDropdownEnter = (id: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setActiveDropdown(id);
  };

  const handleDropdownLeave = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (page: PageId, sectionId?: string) => {
    onNavigate(page, sectionId);
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const toggleMobileAccordion = (id: string) => {
    setMobileExpanded(mobileExpanded === id ? null : id);
  };

  return (
    <>
      <header
        ref={headerRef}
        className="gsx-header fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: isHome
            ? scrolled
              ? 'rgba(8, 4, 20, 0.92)'
              : 'transparent'
            : scrolled
            ? 'rgba(8, 4, 20, 0.96)'
            : 'rgba(8, 4, 20, 0.85)',
          backdropFilter: isHome && !scrolled ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: isHome && !scrolled ? 'none' : 'blur(20px)',
          borderBottom: isHome && !scrolled ? 'none' : '1px solid rgba(174, 112, 255, 0.15)',
          boxShadow: scrolled || !isHome ? '0 4px 30px rgba(0, 0, 0, 0.5)' : 'none',
        }}
      >
        {/* Brand Logo & Wordmark */}
        <button
          className="brand group shrink-0"
          onClick={() => handleNavClick('home')}
          aria-label="GSX Chennai home"
        >
          <div className="w-9 h-9 bg-purple-600/30 border border-purple-500/40 rounded-xl flex items-center justify-center p-1.5 shadow-[0_0_15px_rgba(168,85,247,0.35)] group-hover:scale-105 transition-transform">
            <img src="/gsx-logo.png" alt="GSX Logo" className="w-full h-full object-contain" />
          </div>
          <div className="flex items-center gap-2">
            <span className="wordmark">GSX</span>
            <span className="chapter">CHENNAI</span>
          </div>
        </button>

        {/* Desktop Dropdown Navigation Menu */}
        <nav
          className="hidden lg:flex items-center gap-1 xl:gap-2 mx-auto"
          aria-label="Main navigation"
        >
          {NAV_STRUCTURE.map((item) => {
            const isCurrent = currentPage === item.id || (item.id === 'community' && currentPage === 'team');
            const hasChildren = Boolean(item.children && item.children.length > 0);
            const isOpen = activeDropdown === item.id;

            return (
              <div
                key={item.id}
                className="relative py-2"
                onMouseEnter={() => hasChildren && handleDropdownEnter(item.id)}
                onMouseLeave={hasChildren ? handleDropdownLeave : undefined}
              >
                <button
                  type="button"
                  aria-current={isCurrent ? 'page' : undefined}
                  aria-haspopup={hasChildren ? 'true' : undefined}
                  aria-expanded={hasChildren ? isOpen : undefined}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-medium transition-all flex items-center gap-1 cursor-pointer select-none ${
                    isCurrent
                      ? 'text-white bg-purple-600/20 border border-purple-500/40 shadow-[0_0_12px_rgba(168,85,247,0.3)]'
                      : 'text-gray-300 hover:text-white hover:bg-white/[0.05] border border-transparent'
                  }`}
                >
                  <span>{item.label}</span>
                  {hasChildren && (
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-purple-400' : 'text-gray-400'
                      }`}
                    />
                  )}
                </button>

                {/* Desktop Floating Dropdown Menu */}
                {hasChildren && isOpen && (
                  <div
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 min-w-[260px] animate-in fade-in zoom-in-95 duration-150"
                    onMouseEnter={() => handleDropdownEnter(item.id)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <div className="rounded-2xl p-2 bg-[#0e0722]/95 backdrop-blur-2xl border border-purple-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_25px_rgba(168,85,247,0.2)] flex flex-col gap-1">
                      {/* Dropdown Header Pill */}
                      <div className="px-3 py-1.5 border-b border-white/[0.06] mb-1 flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-400">
                          {item.label} Hub
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {item.children?.length} sections
                        </span>
                      </div>

                      {item.children?.map((child) => (
                        <button
                          key={child.id}
                          type="button"
                          className="w-full text-left px-3 py-2 rounded-xl hover:bg-purple-600/25 text-gray-300 hover:text-white transition-all flex items-center justify-between group cursor-pointer border border-transparent hover:border-purple-500/30"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleNavClick(item.id, child.sectionId);
                          }}
                        >
                          <div className="flex flex-col">
                            <span className="text-xs font-semibold text-white group-hover:text-purple-200 transition-colors">
                              {child.label}
                            </span>
                            {child.description && (
                              <span className="text-[11px] text-gray-400 group-hover:text-purple-300/80 transition-colors">
                                {child.description}
                              </span>
                            )}
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-purple-400 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all shrink-0 ml-2" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions shrink-0">
          <button
            type="button"
            className="pill"
            onClick={onOpenJoinModal}
          >
            <span>Join GSX</span>
            <span aria-hidden="true">→</span>
          </button>

          {/* Quick Search Shortcut */}
          <button
            ref={searchBtnRef}
            type="button"
            className="icon-button"
            aria-label="Search pages"
            title="Search pages (Press / or Ctrl+K)"
            onClick={() => {
              setActiveDropdown(null);
              setMobileOpen(false);
              setSearch(true);
            }}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            ref={menuBtnRef}
            type="button"
            className="icon-button lg:hidden"
            aria-controls="mobile-navigation"
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              {mobileOpen ? (
                <path d="M18 6L6 18M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Drawer / Accordion */}
        {mobileOpen && (
          <div
            id="mobile-navigation"
            className="lg:hidden absolute top-full left-0 right-0 w-full bg-[#0d071f]/98 backdrop-blur-3xl border-b border-purple-500/30 p-4 sm:p-6 shadow-[0_25px_60px_rgba(0,0,0,0.8)] max-h-[80vh] overflow-y-auto z-50 animate-in fade-in slide-in-from-top-4 duration-200"
          >
            <div className="flex flex-col gap-1.5">
              {NAV_STRUCTURE.map((item) => {
                const isCurrent = currentPage === item.id || (item.id === 'community' && currentPage === 'team');
                const hasChildren = Boolean(item.children && item.children.length > 0);
                const isExpanded = mobileExpanded === item.id;

                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] overflow-hidden"
                  >
                    <div className="flex items-center justify-between p-2.5">
                      <button
                        type="button"
                        onClick={() => handleNavClick(item.id)}
                        className={`flex-1 text-left text-sm font-semibold transition-colors ${
                          isCurrent ? 'text-purple-300' : 'text-white'
                        }`}
                      >
                        {item.label}
                      </button>

                      {hasChildren && (
                        <button
                          type="button"
                          onClick={() => toggleMobileAccordion(item.id)}
                          aria-label={`Toggle ${item.label} sub-items`}
                          className="p-1.5 rounded-lg bg-white/[0.04] text-gray-400 hover:text-white"
                        >
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180 text-purple-400' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Mobile Submenu Accordion Items */}
                    {hasChildren && isExpanded && (
                      <div className="px-3 pb-3 pt-1 border-t border-white/[0.06] bg-purple-950/20 flex flex-col gap-1">
                        {item.children?.map((child) => (
                          <button
                            key={child.id}
                            type="button"
                            onClick={() => handleNavClick(item.id, child.sectionId)}
                            className="w-full text-left py-2 px-2.5 rounded-lg text-xs text-gray-300 hover:text-white hover:bg-purple-600/30 transition-all flex items-center justify-between"
                          >
                            <span>{child.label}</span>
                            <span className="text-purple-400 text-xs">→</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}

              <div className="pt-4 mt-2 border-t border-white/[0.08] flex items-center gap-3">
                <button
                  type="button"
                  onClick={onOpenJoinModal}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Join GSX Chennai Community</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Quick Filter Search Modal */}
      <SearchModal
        open={search}
        onClose={() => {
          setSearch(false);
          searchBtnRef.current?.focus();
        }}
        onNavigate={handleNavClick}
        onOpenJoinModal={onOpenJoinModal}
      />
    </>
  );
};

export default Navbar;
