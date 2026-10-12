import React, { useState, useEffect } from 'react';
import { PageId, EventItem, AnnouncementItem, GSX_JOIN_FORM_URL } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { CommunityPage } from './pages/CommunityPage';
import { TeamPage } from './pages/TeamPage';
import { EventsPage } from './pages/EventsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { OpportunitiesPage } from './pages/OpportunitiesPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';

// Modals
import { JoinCommunityModal } from './components/JoinCommunityModal';
import { EventDetailModal } from './components/EventDetailModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { AnnouncementDetailModal } from './components/AnnouncementDetailModal';
import { ANNOUNCEMENTS_DATA } from './data/announcements';

import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'community',
  'team',
  'events',
  'announcements',
  'opportunities',
  'get-involved',
];

const scrollToTargetSection = (sectionId: string) => {
  const attemptScroll = (attemptsLeft: number) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else if (attemptsLeft > 0) {
      setTimeout(() => attemptScroll(attemptsLeft - 1), 60);
    }
  };
  setTimeout(() => attemptScroll(8), 50);
};

const parsePageFromLocation = (): { page: PageId | null; sectionId: string | null } => {
  if (typeof window === 'undefined') return { page: null, sectionId: null };

  // Send old links for removed pages to an available destination.
  const retiredPages: Record<string, PageId> = { projects: 'opportunities', resources: 'home' };
  const locationPage = window.location.hash.replace(/^#\/?/, '').split('#')[0].toLowerCase()
    || window.location.pathname.split('/').filter(Boolean).pop()?.toLowerCase();
  if (locationPage && retiredPages[locationPage]) {
    return { page: retiredPages[locationPage], sectionId: null };
  }

  // 1. Check URL hash (e.g. #about#what-is-gsx or #community or #/events)
  const rawHash = window.location.hash.replace(/^#/, '');
  if (rawHash) {
    const parts = rawHash.split('#').map(p => p.replace(/^[/]/, '').trim().toLowerCase());
    let page: PageId | null = null;
    let sectionId: string | null = null;

    for (const part of parts) {
      if (VALID_PAGES.includes(part as PageId)) {
        page = part as PageId;
      } else if (part) {
        sectionId = part;
      }
    }
    if (page) return { page, sectionId };
  }

  // 2. Check URL pathname (e.g. /team or /gsx-chennai-chapter/team)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1]?.trim().toLowerCase();
  if (lastPart && VALID_PAGES.includes(lastPart as PageId)) {
    return { page: lastPart as PageId, sectionId: null };
  }

  return { page: null, sectionId: null };
};

const getInitialPage = (): PageId => {
  const { page, sectionId } = parsePageFromLocation();
  if (page) {
    if (sectionId) {
      scrollToTargetSection(sectionId);
    }
    return page;
  }

  // Opening the main website address always starts on Home.
  return 'home';
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const { isDark } = useTheme();

  // Handle browser Back / Forward buttons and manual hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const { page, sectionId } = parsePageFromLocation();
      if (page) {
        setCurrentPage(page);
        if (sectionId) {
          scrollToTargetSection(sectionId);
        }
      } else if (!window.location.hash && (window.location.pathname === '/' || window.location.pathname === '')) {
        setCurrentPage('home');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  // Modal states
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);
  const [selectedEventForDetail, setSelectedEventForDetail] = useState<EventItem | null>(null);
  const [selectedEventForRegister, setSelectedEventForRegister] = useState<EventItem | null>(null);
  const [selectedAnnouncementForDetail, setSelectedAnnouncementForDetail] = useState<AnnouncementItem | null>(null);

  // Direct user to official GSX Google Form
  const handleOpenJoinModal = () => {
    window.open(GSX_JOIN_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  // Scroll to section or top upon page navigation and push history state
  const handleNavigate = (page: PageId, sectionId?: string) => {
    setCurrentPage(page);
    const targetHash = page === 'home'
      ? (sectionId ? `#${sectionId}` : '')
      : (sectionId ? `#${page}#${sectionId}` : `#${page}`);

    if (page === 'home' && !sectionId) {
      history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      history.pushState(null, '', targetHash);
    }

    if (sectionId) {
      scrollToTargetSection(sectionId);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-600 selection:text-white relative overflow-x-clip flex flex-col bg-[#080414] text-[#ededed]">
      {/* Creative GSX Cosmic Stardust Custom Cursor */}
      <CustomCursor />

      {/* Background ambient gradient highlights */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(147,51,234,0.12),transparent_70%)]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(126,34,206,0.06),transparent_60%)]" />
      </div>

      {/* Sticky Global Navigation */}
      <Navbar
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenJoinModal={handleOpenJoinModal}
      />

      {/* Main Content with Route Transitions */}
      <main className="flex-1 relative z-10">
        <AnimatePresence mode="wait">
          {currentPage === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <HomePage
                onNavigate={handleNavigate}
                onOpenJoinModal={handleOpenJoinModal}
                onOpenEventDetail={(evt) => setSelectedEventForDetail(evt)}
                onRegisterEvent={(evt) => setSelectedEventForRegister(evt)}
              />
            </motion.div>
          )}

          {currentPage === 'about' && (
            <motion.div
              key="about"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <AboutPage
                onNavigate={handleNavigate}
                onOpenJoinModal={handleOpenJoinModal}
              />
            </motion.div>
          )}

          {(currentPage === 'community' || currentPage === 'team') && (
            <motion.div
              key="community"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <CommunityPage
                onNavigate={handleNavigate}
                onOpenJoinModal={handleOpenJoinModal}
              />
            </motion.div>
          )}

          {currentPage === 'opportunities' && (
            <motion.div
              key="opportunities"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <OpportunitiesPage
                onNavigate={handleNavigate}
                onOpenJoinModal={handleOpenJoinModal}
              />
            </motion.div>
          )}


          {currentPage === 'events' && (
            <motion.div
              key="events"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <EventsPage
                onNavigate={handleNavigate}
                onOpenEventDetail={(evt) => setSelectedEventForDetail(evt)}
                onRegisterEvent={(evt) => setSelectedEventForRegister(evt)}
              />
            </motion.div>
          )}

          {currentPage === 'announcements' && (
            <motion.div
              key="announcements"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <AnnouncementsPage
                onNavigate={handleNavigate}
                onOpenDetail={(ann) => setSelectedAnnouncementForDetail(ann)}
              />
            </motion.div>
          )}


          {currentPage === 'get-involved' && (
            <motion.div
              key="get-involved"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <GetInvolvedPage
                onNavigate={handleNavigate}
                onOpenJoinModal={handleOpenJoinModal}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Global Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenJoinModal={handleOpenJoinModal}
      />

      {/* ===================================================
          GLOBAL MODALS
          =================================================== */}

      {/* Join Community Modal */}
      <JoinCommunityModal
        isOpen={isJoinModalOpen}
        onClose={() => setIsJoinModalOpen(false)}
      />

      {/* Event Details Modal */}
      <EventDetailModal
        event={selectedEventForDetail}
        onClose={() => setSelectedEventForDetail(null)}
        onRegister={(evt) => {
          setSelectedEventForDetail(null);
          setSelectedEventForRegister(evt);
        }}
      />

      {/* Event Registration Modal */}
      <EventRegisterModal
        event={selectedEventForRegister}
        onClose={() => setSelectedEventForRegister(null)}
      />

      {/* Announcement Detail Modal */}
      <AnnouncementDetailModal
        announcement={selectedAnnouncementForDetail}
        allAnnouncements={ANNOUNCEMENTS_DATA}
        onClose={() => setSelectedAnnouncementForDetail(null)}
        onSelectRelated={(item) => setSelectedAnnouncementForDetail(item)}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
