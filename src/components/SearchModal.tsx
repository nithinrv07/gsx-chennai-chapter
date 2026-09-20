import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: PageId, sectionId?: string) => void;
  onOpenJoinModal: () => void;
}

interface SearchItem {
  id: string;
  label: string;
  category: string;
  action: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  open,
  onClose,
  onNavigate,
  onOpenJoinModal,
}) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (open) {
      setQuery('');
      dialog.current?.showModal();
      input.current?.focus();
    } else {
      dialog.current?.close();
    }
  }, [open]);

  const searchItems: SearchItem[] = [
    {
      id: 'home',
      label: 'Home',
      category: 'Page',
      action: () => {
        onNavigate('home');
        onClose();
      },
    },
    {
      id: 'about',
      label: 'About Chapter',
      category: 'Page',
      action: () => {
        onNavigate('about');
        onClose();
      },
    },
    {
      id: 'what-is-gsx',
      label: 'What is GSX?',
      category: 'About',
      action: () => {
        onNavigate('about', 'what-is-gsx');
        onClose();
      },
    },
    {
      id: 'our-mission',
      label: 'Our Mission & Vision',
      category: 'About',
      action: () => {
        onNavigate('about', 'our-mission');
        onClose();
      },
    },
    {
      id: 'our-pillars',
      label: 'Our Pillars (5 Verticals & Values)',
      category: 'About',
      action: () => {
        onNavigate('about', 'our-pillars');
        onClose();
      },
    },
    {
      id: 'our-journey',
      label: 'Our Journey & Milestones',
      category: 'About',
      action: () => {
        onNavigate('about', 'our-journey');
        onClose();
      },
    },
    {
      id: 'community',
      label: 'Community & Members',
      category: 'Community',
      action: () => {
        onNavigate('community');
        onClose();
      },
    },
    {
      id: 'core-team',
      label: 'Core Team & Domain Owners',
      category: 'Community',
      action: () => {
        onNavigate('community', 'core-team');
        onClose();
      },
    },
    {
      id: 'colleges',
      label: 'Colleges in Chennai (15+ Chapters)',
      category: 'Community',
      action: () => {
        onNavigate('community', 'colleges');
        onClose();
      },
    },
    {
      id: 'events',
      label: 'Events & Workshops',
      category: 'Events',
      action: () => {
        onNavigate('events');
        onClose();
      },
    },
    {
      id: 'upcoming-events',
      label: 'Upcoming Events & Hackathons',
      category: 'Events',
      action: () => {
        onNavigate('events', 'upcoming-events');
        onClose();
      },
    },
    {
      id: 'past-events',
      label: 'Past Events Archive',
      category: 'Events',
      action: () => {
        onNavigate('events', 'past-events');
        onClose();
      },
    },
    {
      id: 'projects',
      label: 'Projects Showcase',
      category: 'Engineering',
      action: () => {
        onNavigate('projects');
        onClose();
      },
    },
    {
      id: 'collaborate-with-us',
      label: 'Collaborate With Us on Projects',
      category: 'Engineering',
      action: () => {
        onNavigate('projects', 'collaborate-with-us');
        onClose();
      },
    },
    {
      id: 'opportunities',
      label: 'Opportunities Hub',
      category: 'Opportunities',
      action: () => {
        onNavigate('opportunities');
        onClose();
      },
    },
    {
      id: 'internships',
      label: 'Internships & Trainee Tracks',
      category: 'Opportunities',
      action: () => {
        onNavigate('opportunities', 'internships');
        onClose();
      },
    },
    {
      id: 'hackathons',
      label: 'Hackathons & Sprints',
      category: 'Opportunities',
      action: () => {
        onNavigate('opportunities', 'hackathons');
        onClose();
      },
    },
    {
      id: 'open-source',
      label: 'Open Source (GSSoC, GSoC)',
      category: 'Opportunities',
      action: () => {
        onNavigate('opportunities', 'open-source');
        onClose();
      },
    },
    {
      id: 'fellowships',
      label: 'Fellowships & Research Cohorts',
      category: 'Opportunities',
      action: () => {
        onNavigate('opportunities', 'fellowships');
        onClose();
      },
    },
    {
      id: 'resources',
      label: 'Resources & Knowledge Vault',
      category: 'Resources',
      action: () => {
        onNavigate('resources');
        onClose();
      },
    },
    {
      id: 'learning',
      label: 'Learning Roadmaps (AI, Full-Stack, DSA)',
      category: 'Resources',
      action: () => {
        onNavigate('resources', 'learning');
        onClose();
      },
    },
    {
      id: 'guides',
      label: 'Developer Guides & Handbooks',
      category: 'Resources',
      action: () => {
        onNavigate('resources', 'guides');
        onClose();
      },
    },
    {
      id: 'workshops',
      label: 'Recorded Workshops & Slide Decks',
      category: 'Resources',
      action: () => {
        onNavigate('resources', 'workshops');
        onClose();
      },
    },
    {
      id: 'student-resources',
      label: 'Student Resources & Free Cloud Packs',
      category: 'Resources',
      action: () => {
        onNavigate('resources', 'student-resources');
        onClose();
      },
    },
    {
      id: 'get-involved',
      label: 'Get Involved & Volunteer',
      category: 'Community',
      action: () => {
        onNavigate('get-involved');
        onClose();
      },
    },
    {
      id: 'start-gsx-college',
      label: 'Start GSX at Your College (Campus Lead)',
      category: 'Community',
      action: () => {
        onNavigate('get-involved', 'start-gsx-college');
        onClose();
      },
    },
    {
      id: 'join',
      label: 'Join GSX Chennai (Official Form)',
      category: 'Membership',
      action: () => {
        onOpenJoinModal();
        onClose();
      },
    },
  ];

  const filtered = searchItems.filter(
    (item) =>
      item.label.toLowerCase().includes(query.trim().toLowerCase()) ||
      item.category.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <dialog
      ref={dialog}
      className="search-modal"
      aria-labelledby="search-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          const r = e.currentTarget.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          ) {
            onClose();
          }
        }
      }}
    >
      <div className="search-heading">
        <h2 id="search-title">Explore GSX</h2>
        <button className="icon-button" aria-label="Close search" onClick={onClose}>
          ✕
        </button>
      </div>

      <label htmlFor="search-input">Find a page or topic</label>
      <input
        ref={input}
        id="search-input"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Events, projects, team, community…"
        autoComplete="off"
      />

      <ul className="search-results">
        {filtered.map((item) => (
          <li key={item.id}>
            <button
              type="button"
              onClick={item.action}
              className="group flex items-center justify-between"
            >
              <div className="flex items-center gap-2.5">
                <span className="text-white font-medium">{item.label}</span>
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-purple-950/60 border border-purple-800/40 text-purple-300">
                  {item.category}
                </span>
              </div>
              <span aria-hidden="true" className="text-purple-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </button>
          </li>
        ))}
        {filtered.length === 0 && (
          <li className="empty">No matching pages or topics found. Try “events” or “projects”.</li>
        )}
      </ul>
      <p className="sr-only" role="status">
        {filtered.length} results found
      </p>
    </dialog>
  );
};

export default SearchModal;
