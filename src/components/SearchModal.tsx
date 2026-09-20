import React, { useEffect, useRef, useState } from 'react';
import { PageId } from '../types';

interface SearchModalProps {
  open: boolean;
  onClose: () => void;
  onNavigate: (page: PageId) => void;
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
      id: 'team',
      label: 'Core Team & Leads',
      category: 'Community',
      action: () => {
        onNavigate('team');
        onClose();
      },
    },
    {
      id: 'events',
      label: 'Events & Workshops',
      category: 'Programs',
      action: () => {
        onNavigate('events');
        onClose();
      },
    },
    {
      id: 'announcements',
      label: 'Announcements & Updates',
      category: 'Community',
      action: () => {
        onNavigate('announcements');
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
      id: 'get-involved',
      label: 'Get Involved & Volunteer',
      category: 'Community',
      action: () => {
        onNavigate('get-involved');
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
