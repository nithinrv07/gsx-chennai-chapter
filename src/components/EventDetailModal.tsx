import React, { useState } from 'react';
import { EventItem } from '../types';
import { X, Calendar, Clock, MapPin, Users, Share2, Check, ArrowRight, Sparkles, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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

  if (!event) return null;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-[#090710] border border-white/[0.1] rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.2)] overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-gray-300 hover:text-white hover:bg-black/90 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Banner Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-[#090710]/60 to-transparent" />
          
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/40 backdrop-blur-md">
              {event.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {event.title}
            </h2>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Key Event Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
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
            <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-2">
              About The Experience
            </h3>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              {event.description}
            </p>
          </div>

          {/* Speakers Section if available */}
          {event.speakers && event.speakers.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Featured Speakers & Mentors
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {event.speakers.map((speaker, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
                  >
                    <img
                      src={speaker.avatar}
                      alt={speaker.name}
                      className="w-11 h-11 rounded-full object-cover border border-purple-500/30"
                    />
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
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Session Agenda
              </h3>
              <div className="space-y-2.5">
                {event.agenda.map((slot, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.04] text-xs"
                  >
                    <span className="font-mono text-purple-400 font-semibold mb-1 sm:mb-0">
                      {slot.time}
                    </span>
                    <span className="text-gray-200 font-medium sm:text-right">
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

            <div className="flex items-center gap-3 w-full sm:w-auto">
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
                <div className="px-4 py-2 rounded-xl bg-white/[0.03] border border-white/[0.08] text-gray-400 text-xs font-medium">
                  Past Event / Recap Mode
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
