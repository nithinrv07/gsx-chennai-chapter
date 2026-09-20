import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';
import { SearchModal } from './SearchModal';

export interface NavbarProps {
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

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenJoinModal,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const headerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const searchBtnRef = useRef<HTMLButtonElement>(null);

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
    const click = (e: MouseEvent) => {
      if (!headerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
        menuBtnRef.current?.focus();
      }
      // Quick search shortcut: press '/' or 'Ctrl+K' / 'Cmd+K' when not inside an input
      if (
        (e.key === '/' || ((e.ctrlKey || e.metaKey) && e.key === 'k')) &&
        !['INPUT', 'TEXTAREA'].includes((document.activeElement as HTMLElement)?.tagName)
      ) {
        e.preventDefault();
        setOpen(false);
        setSearch(true);
      }
    };
    const media = matchMedia('(min-width: 1001px)');
    const resize = () => setOpen(false);

    document.addEventListener('click', click);
    document.addEventListener('keydown', key);
    media.addEventListener('change', resize);

    return () => {
      document.removeEventListener('click', click);
      document.removeEventListener('keydown', key);
      media.removeEventListener('change', resize);
    };
  }, [open]);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header
        ref={headerRef}
        className="gsx-header fixed top-0 left-0 right-0 w-full z-50 transition-all duration-300"
        style={{
          backgroundColor: isHome
            ? scrolled
              ? 'rgba(8, 4, 20, 0.88)'
              : 'transparent'
            : scrolled
            ? 'rgba(8, 4, 20, 0.92)'
            : 'rgba(8, 4, 20, 0.75)',
          backdropFilter: isHome && !scrolled ? 'none' : 'blur(20px)',
          WebkitBackdropFilter: isHome && !scrolled ? 'none' : 'blur(20px)',
          borderBottom: isHome && !scrolled ? 'none' : '1px solid rgba(174, 112, 255, 0.12)',
          boxShadow: scrolled || !isHome ? '0 4px 30px rgba(0, 0, 0, 0.4)' : 'none',
        }}
      >
        <button
          className="brand group"
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

        <nav
          className={`navigation${open ? ' open' : ''}`}
          id="navigation"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map((item) => {
            const isCurrent = currentPage === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isCurrent ? 'page' : undefined}
                onClick={() => handleNavClick(item.id)}
              >
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="header-actions">
          <button
            type="button"
            className="pill"
            onClick={onOpenJoinModal}
          >
            <span>Join GSX</span>
            <span aria-hidden="true">→</span>
          </button>

          <button
            ref={searchBtnRef}
            type="button"
            className="icon-button"
            aria-label="Search pages"
            title="Search pages (Press / or Ctrl+K)"
            onClick={() => {
              setOpen(false);
              setSearch(true);
            }}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <circle cx="10.8" cy="10.8" r="6.8" />
              <path d="m16 16 5 5" />
            </svg>
          </button>

          <button
            ref={menuBtnRef}
            type="button"
            className="icon-button menu-toggle"
            aria-controls="navigation"
            aria-expanded={open}
            aria-label={open ? 'Close navigation' : 'Open navigation'}
            onClick={() => setOpen(!open)}
          >
            <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
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
