import React, { useEffect, useState } from 'react';
import { EventItem } from '../types';
import { X, Calendar, CalendarPlus, Clock, MapPin, Users, Share2, Check, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { googleCalendarUrl } from '../lib/calendar';

interface EventDetailModalProps {
  event: EventItem | null;
  onClose: () => void;
  onRegister: (event: EventItem) => void;
}

export const EventDetailModal: React.FC<EventDetailModalProps> = ({
  event,
  onClose,
  onRegister,
}) => {
  const [copied, setCopied] = useState(false);

  // Escape closes the popup.
  useEffect(() => {
    if (!event) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [event, onClose]);

  if (!event) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-xl"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label={event.title}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-xl max-h-[90dvh] flex flex-col bg-[#090710] border border-white/[0.1] rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden"
      >
        {/* Pinned top bar: always-visible Exit */}
        <div className="flex items-center justify-between gap-3 px-4 py-3 border-b border-white/[0.08] bg-[#0d0a18] shrink-0">
          <span className="px-2.5 py-1 text-[11px] font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40">
            {event.category}
          </span>
          <button
            type="button"
            onClick={onClose}
            autoFocus
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/20 bg-white/[0.08] hover:bg-red-500/20 hover:border-red-400/50 text-white text-xs font-semibold transition-colors cursor-pointer"
            aria-label="Exit event details"
          >
            <X className="w-4 h-4" />
            <span>Exit</span>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto">
          {/* Poster: whole image, black and white until hovered */}
          <div className="group h-56 sm:h-64 w-full bg-[#0b0716]">
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-full object-contain grayscale group-hover:grayscale-0 group-active:grayscale-0 transition-[filter] duration-500"
            />
          </div>

        {/* Modal Body */}
        <div className="p-5 space-y-5">
          <h2 className="text-lg sm:text-xl font-extrabold text-white tracking-tight leading-snug">
            {event.title}
          </h2>
          {/* Key Event Metadata Row */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-white/[0.02] border border-white/[0.06]">
            <div className="flex items-center gap-3 text-gray-300">
              <Calendar className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Date</p>
                <p className="text-xs font-semibold text-white">{event.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <Clock className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Time</p>
                <p className="text-xs font-semibold text-white">{event.time}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-4 h-4 text-purple-400 shrink-0" />
              <div>
                <p className="text-[10px] uppercase text-gray-400">Venue</p>
                <p className="text-xs font-semibold text-white truncate max-w-[170px]" title={event.location}>
                  {event.location}
                </p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              About The Experience
            </h3>
            <p className="text-sm text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Speakers Section if available */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                Featured Speakers & Mentors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.speakers.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-2.5 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    {speaker.avatar ? (
                      <img
                        src={speaker.avatar}
                        alt={speaker.name}
                        className="w-11 h-11 rounded-full object-cover object-top border border-purple-500/30 shrink-0"
                      />
                    ) : (
                      <span
                        aria-hidden="true"
                        className="w-11 h-11 rounded-full grid place-items-center shrink-0 text-sm font-bold text-white bg-gradient-to-br from-purple-500 to-violet-700 border border-purple-500/30"
                      >
                        {speaker.name.split(' ').map((part) => part[0]).slice(0, 2).join('').toUpperCase()}
                      </span>
                    )}
                    <div>
                      <p className="text-sm font-bold text-white">{speaker.name}</p>
                      <p className="text-xs text-purple-300">{speaker.role}</p>
                      <p className="text-[11px] text-gray-400">{speaker.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Agenda Section if available */}
          {event.agenda && event.agenda.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2.5">
                Session Agenda
              </h3>
              <div className="space-y-2.5">
                {event.agenda.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 px-3 py-2.5 rounded-xl bg-white/[0.02] border border-white/[0.04] text-sm"
                  >
                    <span className="font-mono text-purple-400 font-semibold shrink-0">
                      {slot.time}
                    </span>
                    <span className="text-gray-200 font-medium">
                      {slot.topic}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Footer Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-white text-xs font-medium transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Link Copied!</span>
                </>
              ) : (
                <>
                  <Share2 className="w-3.5 h-3.5 text-purple-400" />
                  <span>Share Experience</span>
                </>
              )}
            </button>

            <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
              {event.status !== 'past' && googleCalendarUrl(event) && (
                <a
                  href={googleCalendarUrl(event) ?? undefined}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-purple-400/40 bg-purple-500/10 hover:bg-purple-500/20 text-purple-100 font-semibold text-sm transition-colors"
                >
                  <CalendarPlus className="w-4 h-4" />
                  <span>Add to Google Calendar</span>
                </a>
              )}
              {event.status === 'upcoming' && event.registrationOpen ? (
                <button
                  onClick={() => {
                    onClose();
                    onRegister(event);
                  }}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 text-white font-semibold text-sm shadow-[0_0_25px_rgba(168,85,247,0.4)] hover:shadow-[0_0_35px_rgba(168,85,247,0.6)] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-purple-200" />
                  <span>Register for Event</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-white/15 bg-white/[0.05] hover:bg-white/[0.1] text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                  <span>Exit</span>
                </button>
              )}
            </div>
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
};
