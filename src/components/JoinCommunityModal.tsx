import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Instagram, ArrowRight, Compass, Code, Rocket, ExternalLink } from 'lucide-react';
import { motion } from 'motion/react';
import { sendJoinRegistration, GSX_OFFICIAL_EMAIL } from '../lib/emailService';
import { GSX_JOIN_FORM_URL } from '../types';

interface JoinCommunityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinCommunityModal: React.FC<JoinCommunityModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    collegeOrOrg: '',
    primaryInterest: 'Full-Stack & Web Systems',
    socialHandle: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [joined, setJoined] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Your name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) {
      errs.email = 'Valid email is required';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Contact number is required';
    } else if (!/^[+0-9\s-]{7,15}$/.test(formData.phone.trim())) {
      errs.phone = 'Please enter a valid contact number';
    }
    if (!formData.collegeOrOrg.trim()) {
      errs.collegeOrOrg = 'College, university or company is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    try {
      await sendJoinRegistration(formData);
    } catch (err) {
      console.error('Registration dispatch error:', err);
    } finally {
      setSubmitting(false);
      setJoined(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-xl bg-[#090710] border border-white/[0.1] rounded-2xl shadow-[0_0_60px_rgba(168,85,247,0.3)] overflow-hidden my-8"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!joined ? (
          <div className="p-6 sm:p-8">
            <div className="mb-5 text-center sm:text-left">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded-full bg-violet-500/10 text-violet-300 border border-violet-500/20 mb-2">
                Join GSX Chennai Chapter
              </span>
              <h2 className="font-space text-2xl font-bold text-white tracking-tight">
                Your Journey Starts Here
              </h2>
              <p className="text-xs sm:text-sm text-gray-400 mt-1 leading-relaxed">
                Join through our official Google Form or register right here.
              </p>
            </div>

            {/* Google Form Direct Link Banner */}
            <a
              href={GSX_JOIN_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mb-5 p-3 sm:p-3.5 rounded-xl bg-gradient-to-r from-violet-600/30 via-purple-600/20 to-fuchsia-600/30 border border-violet-500/40 hover:border-violet-400 text-white flex items-center justify-between gap-3 shadow-[0_0_20px_rgba(139,92,246,0.2)] hover:shadow-[0_0_25px_rgba(139,92,246,0.4)] transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-violet-500/30 border border-violet-400/30 flex items-center justify-center text-violet-200">
                  <ExternalLink className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <span className="text-xs font-bold block text-white group-hover:text-violet-200 transition-colors">
                    Official GSX Google Form
                  </span>
                  <span className="text-[11px] text-gray-400">
                    Open Google Form to join directly
                  </span>
                </div>
              </div>
              <span className="text-xs font-bold text-violet-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform bg-violet-500/20 px-2.5 py-1 rounded-lg border border-violet-500/30">
                Open Form →
              </span>
            </a>

            {/* 3-Step Journey Micro-cards */}
            <div className="grid grid-cols-3 gap-2.5 mb-6">
              <div className="glass p-2.5 rounded-xl border border-white/[0.06] text-center">
                <span className="font-mono text-[10px] text-violet-400 font-bold block">01</span>
                <span className="font-space text-xs font-bold text-white block">JOIN</span>
                <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">
                  Become part
                </span>
              </div>
              <div className="glass p-2.5 rounded-xl bg-violet-600/15 border border-violet-500/30 text-center shadow-[0_0_15px_rgba(139,92,246,0.15)]">
                <span className="font-mono text-[10px] text-violet-300 font-bold block">02</span>
                <span className="font-space text-xs font-bold text-white block">CONTRIBUTE</span>
                <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">
                  Build & attend
                </span>
              </div>
              <div className="glass p-2.5 rounded-xl border border-white/[0.06] text-center">
                <span className="font-mono text-[10px] text-violet-400 font-bold block">03</span>
                <span className="font-space text-xs font-bold text-white block">GROW</span>
                <span className="text-[10px] text-gray-400 leading-tight block mt-0.5">
                  Create impact
                </span>
              </div>
            </div>

            <form onSubmit={handleJoin} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Vigneshwaran K"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                {errors.name && <p className="text-red-400 text-[11px] mt-1">{errors.name}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="vignesh@..."
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  {errors.email && <p className="text-red-400 text-[11px] mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Contact Number (WhatsApp) *
                  </label>
                  <input
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  {errors.phone && <p className="text-red-400 text-[11px] mt-1">{errors.phone}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    College / Company *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SRM / IIT Madras"
                    value={formData.collegeOrOrg}
                    onChange={(e) => setFormData({ ...formData, collegeOrOrg: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  {errors.collegeOrOrg && (
                    <p className="text-red-400 text-[11px] mt-1">{errors.collegeOrOrg}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Primary Interest
                  </label>
                  <select
                    value={formData.primaryInterest}
                    onChange={(e) => setFormData({ ...formData, primaryInterest: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#120f20] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500"
                  >
                    <option value="Agentic AI & Machine Learning">Agentic AI & Machine Learning</option>
                    <option value="Full-Stack & Web Systems">Full-Stack & Web Systems</option>
                    <option value="Open Source & Developer Tooling">Open Source & Tooling</option>
                    <option value="UI/UX & Product Design">UI/UX & Product Design</option>
                    <option value="Hardware & Embedded IoT">Hardware & Embedded IoT</option>
                    <option value="Community & Event Operations">Community & Operations</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  GitHub or Instagram Handle (Optional)
                </label>
                <input
                  type="text"
                  placeholder="@handle"
                  value={formData.socialHandle}
                  onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3.5 px-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-[0_10px_30px_rgba(139,92,246,0.35)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? (
                    <span>Onboarding You to GSX...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-purple-200" />
                      <span>Join GSX Chennai →</span>
                    </>
                  )}
                </button>
              </div>

              <div className="pt-2 flex items-center justify-center gap-2 text-xs text-gray-400">
                <span>Follow our official Instagram:</span>
                <a
                  href="https://www.instagram.com/gsx_chennai_chapter/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-300 hover:text-purple-200 font-semibold flex items-center gap-1"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>@gsx_chennai_chapter</span>
                </a>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(168,85,247,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-2xl font-extrabold text-white">
                Welcome to GSX Chennai!
              </h3>
              <p className="text-xs sm:text-sm text-gray-300 mt-2 max-w-sm mx-auto leading-relaxed">
                Your details have been delivered to our core team at{' '}
                <span className="text-purple-300 font-semibold">{GSX_OFFICIAL_EMAIL}</span>.
                Check your inbox for upcoming meetups, hackathons, and community access passes!
              </p>
            </div>

            <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600/30 border border-purple-500/30 flex items-center justify-center font-bold text-sm text-purple-200">
                  {formData.name.charAt(0) || 'G'}
                </div>
                <div>
                  <p className="text-sm font-bold text-white">{formData.name}</p>
                  <p className="text-xs text-purple-300">{formData.primaryInterest}</p>
                  <p className="text-[11px] text-gray-400">{formData.collegeOrOrg} • {formData.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="https://www.instagram.com/gsx_chennai_chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs font-semibold shadow-lg flex items-center justify-center gap-2"
              >
                <Instagram className="w-4 h-4" />
                <span>Follow on Instagram</span>
              </a>
              <button
                onClick={onClose}
                className="w-full py-2.5 px-4 rounded-xl bg-white/[0.06] hover:bg-white/[0.1] text-gray-300 text-xs font-semibold transition-colors"
              >
                Explore Website
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
};
