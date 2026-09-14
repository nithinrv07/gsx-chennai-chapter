import React, { useState } from 'react';
import { EventItem } from '../types';
import { X, CheckCircle2, Ticket, Sparkles, Calendar, MapPin, Download, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { sendEventRegistration, GSX_OFFICIAL_EMAIL } from '../lib/emailService';

interface EventRegisterModalProps {
  event: EventItem | null;
  onClose: () => void;
}

export const EventRegisterModal: React.FC<EventRegisterModalProps> = ({ event, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    experienceLevel: 'Intermediate',
    interests: 'Agentic AI & Full Stack',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [ticketId, setTicketId] = useState('');

  if (!event) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Full name is required';
    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address';
    }
    if (!formData.organization.trim()) {
      errs.organization = 'College or Company name is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const generatedPass = `GSX-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedPass);

    try {
      await sendEventRegistration({
        eventName: event.title,
        ...formData,
        ticketId: generatedPass,
      });
    } catch (err) {
      console.error('Event registration dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-lg bg-[#090710] border border-white/[0.1] rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden my-8"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSuccess ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
                Event Registration
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Secure Your Spot
              </h2>
              <p className="text-xs text-purple-300 font-medium mt-1">
                {event.title}
              </p>
              <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                <span>{event.date}</span>
                <span>•</span>
                <span>{event.venueType}</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="anand@college.edu or gmail.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                />
                {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    College / Organization *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Anna University"
                    value={formData.organization}
                    onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  />
                  {errors.organization && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.organization}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Experience Level
                  </label>
                  <select
                    value={formData.experienceLevel}
                    onChange={(e) => setFormData({ ...formData, experienceLevel: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120f20] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Beginner">Beginner / Exploring</option>
                    <option value="Intermediate">Intermediate Builder</option>
                    <option value="Advanced">Advanced Engineer</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Phone (Optional for SMS / WhatsApp Pass)
                </label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Confirming Pass...</span>
                  ) : (
                    <>
                      <Ticket className="w-4 h-4" />
                      <span>Confirm Free Registration</span>
                    </>
                  )}
                </button>
              </div>

              <p className="text-center text-[10px] text-gray-400">
                By registering you agree to the GSX Chennai Community Code of Conduct.
              </p>
            </form>
          </div>
        ) : (
          /* Confirmation Pass Screen */
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-extrabold text-white">
                You&apos;re Registered!
              </h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                Your community registration for <span className="text-purple-300 font-semibold">{event.title}</span> has been confirmed.
              </p>
            </div>

            {/* Futuristic Pass Badge */}
            <div className="p-4 rounded-xl bg-gradient-to-br from-purple-950/40 to-black border border-purple-500/30 text-left relative overflow-hidden shadow-lg">
              <div className="flex items-center justify-between border-b border-white/[0.08] pb-3 mb-3">
                <div>
                  <p className="font-mono text-[10px] text-purple-400 font-bold uppercase tracking-wider">
                    GSX Chennai Event Pass
                  </p>
                  <p className="font-mono text-sm font-bold text-white">{ticketId}</p>
                </div>
                <div className="w-8 h-8 rounded bg-purple-900/60 border border-purple-400/40 flex items-center justify-center font-mono text-[10px] font-bold text-purple-200">
                  GSX
                </div>
              </div>

              <div className="space-y-1.5 text-xs text-gray-300">
                <p className="font-medium text-white">{formData.name}</p>
                <p className="text-gray-400 text-[11px]">{formData.organization}</p>
                <div className="pt-2 flex items-center justify-between text-[11px] text-gray-400">
                  <span>{event.date}</span>
                  <span>{event.time}</span>
                </div>
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-gray-200 text-xs font-semibold transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  alert(`Pass ${ticketId} saved to memory. See you at the chapter event!`);
                  onClose();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold shadow-[0_0_20px_rgba(147,51,234,0.3)] transition-all flex items-center justify-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Save Pass</span>
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
