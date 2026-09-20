import React, { useState, useEffect } from 'react';
import { PageId, EventItem, ProjectItem, AnnouncementItem, GSX_JOIN_FORM_URL } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';

// Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { TeamPage } from './pages/TeamPage';
import { EventsPage } from './pages/EventsPage';
import { AnnouncementsPage } from './pages/AnnouncementsPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { GetInvolvedPage } from './pages/GetInvolvedPage';

// Modals
import { JoinCommunityModal } from './components/JoinCommunityModal';
import { EventDetailModal } from './components/EventDetailModal';
import { EventRegisterModal } from './components/EventRegisterModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { SubmitProjectModal } from './components/SubmitProjectModal';
import { AnnouncementDetailModal } from './components/AnnouncementDetailModal';
import { ANNOUNCEMENTS_DATA } from './data/announcements';

import { AnimatePresence, motion } from 'motion/react';
import { ThemeProvider, useTheme } from './context/ThemeContext';

const VALID_PAGES: PageId[] = [
  'home',
  'about',
  'team',
  'events',
  'announcements',
  'projects',
  'get-involved',
];

const parsePageFromLocation = (): PageId | null => {
  if (typeof window === 'undefined') return null;

  // 1. Check URL hash (e.g. #team, #/team)
  const hash = window.location.hash.replace(/^#[/]?/, '').trim().toLowerCase();
  if (hash && VALID_PAGES.includes(hash as PageId)) {
    return hash as PageId;
  }

  // 2. Check URL pathname (e.g. /team or /gsx-chennai-chapter/team)
  const pathParts = window.location.pathname.split('/').filter(Boolean);
  const lastPart = pathParts[pathParts.length - 1]?.trim().toLowerCase();
  if (lastPart && VALID_PAGES.includes(lastPart as PageId)) {
    return lastPart as PageId;
  }

  return null;
};

const getInitialPage = (): PageId => {
  const fromLocation = parsePageFromLocation();
  if (fromLocation) return fromLocation;

  // 3. Fallback to localStorage (survives hard refresh)
  try {
    const saved = localStorage.getItem('gsx_current_page');
    if (saved && VALID_PAGES.includes(saved as PageId)) {
      return saved as PageId;
    }
  } catch {
    // ignore storage exceptions
  }

  return 'home';
};

function AppContent() {
  const [currentPage, setCurrentPage] = useState<PageId>(getInitialPage);
  const { isDark } = useTheme();

  // Synchronize URL hash and localStorage whenever currentPage changes
  useEffect(() => {
    try {
      localStorage.setItem('gsx_current_page', currentPage);
    } catch {
      // ignore
    }

    const currentHash = window.location.hash.replace(/^#[/]?/, '').trim().toLowerCase();
    const targetHash = currentPage === 'home' ? '' : `#${currentPage}`;

    if (currentPage === 'home') {
      if (window.location.hash) {
        history.replaceState(null, '', window.location.pathname + window.location.search);
      }
    } else if (currentHash !== currentPage) {
      history.replaceState(null, '', targetHash);
    }
  }, [currentPage]);

  // Handle browser Back / Forward buttons and manual hash changes
  useEffect(() => {
    const handleLocationChange = () => {
      const page = parsePageFromLocation();
      if (page) {
        setCurrentPage(page);
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
  const [selectedProjectForDetail, setSelectedProjectForDetail] = useState<ProjectItem | null>(null);
  const [isSubmitProjectModalOpen, setIsSubmitProjectModalOpen] = useState(false);
  const [selectedAnnouncementForDetail, setSelectedAnnouncementForDetail] = useState<AnnouncementItem | null>(null);

  // Direct user to official GSX Google Form
  const handleOpenJoinModal = () => {
    window.open(GSX_JOIN_FORM_URL, '_blank', 'noopener,noreferrer');
  };

  // Scroll to top upon page navigation and push history state
  const handleNavigate = (page: PageId) => {
    setCurrentPage(page);
    try {
      localStorage.setItem('gsx_current_page', page);
    } catch {
      // ignore
    }
    const targetHash = page === 'home' ? '' : `#${page}`;
    if (page === 'home') {
      history.pushState(null, '', window.location.pathname + window.location.search);
    } else {
      history.pushState(null, '', targetHash);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans selection:bg-purple-600 selection:text-white relative overflow-x-hidden flex flex-col bg-[#080414] text-[#ededed]">
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
                onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
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

          {currentPage === 'team' && (
            <motion.div
              key="team"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <TeamPage
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

          {currentPage === 'projects' && (
            <motion.div
              key="projects"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <ProjectsPage
                onNavigate={handleNavigate}
                onOpenProjectDetail={(proj) => setSelectedProjectForDetail(proj)}
                onOpenSubmitModal={() => setIsSubmitProjectModalOpen(true)}
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

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={selectedProjectForDetail}
        onClose={() => setSelectedProjectForDetail(null)}
      />

      {/* Submit Project Modal */}
      <SubmitProjectModal
        isOpen={isSubmitProjectModalOpen}
        onClose={() => setIsSubmitProjectModalOpen(false)}
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
