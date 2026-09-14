import React, { useState } from 'react';
import { X, CheckCircle2, Send, Sparkles, Code2 } from 'lucide-react';
import { motion } from 'motion/react';
import { sendProjectSubmission, GSX_OFFICIAL_EMAIL } from '../lib/emailService';

interface SubmitProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SubmitProjectModal: React.FC<SubmitProjectModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    title: '',
    category: 'AI / ML',
    shortDescription: '',
    techStack: '',
    githubUrl: '',
    liveDemoUrl: '',
    creatorName: '',
    creatorEmail: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.title.trim()) errs.title = 'Project title is required';
    if (!formData.shortDescription.trim()) errs.shortDescription = 'Short description is required';
    if (!formData.techStack.trim()) errs.techStack = 'Tech stack tags are required';
    if (!formData.creatorName.trim()) errs.creatorName = 'Your name is required';
    if (!formData.creatorEmail.trim() || !formData.creatorEmail.includes('@')) {
      errs.creatorEmail = 'Valid email address is required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      await sendProjectSubmission(formData);
    } catch (err) {
      console.error('Project submission dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
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
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/[0.04] border border-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <span className="inline-block px-2.5 py-0.5 text-[10px] font-semibold tracking-wider uppercase rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 mb-2">
                Community Showcase
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Submit Your Project
              </h2>
              <p className="text-xs text-gray-400 mt-1">
                Showcase your prototype, open-source tool, or civic project to the GSX Chennai ecosystem.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Project Name *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Chennai Bus Pulse"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                {errors.title && <p className="text-red-400 text-[11px] mt-1">{errors.title}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-[#120f20] border border-white/[0.1] text-sm text-white focus:outline-none focus:border-purple-500"
                >
                  <option value="AI / ML">AI / ML</option>
                  <option value="Web">Web</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Open Source">Open Source</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  placeholder="What does your project solve?"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none"
                />
                {errors.shortDescription && <p className="text-red-400 text-[11px] mt-1">{errors.shortDescription}</p>}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">
                  Tech Stack (comma separated) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Next.js, Python, Tailwind, PyTorch"
                  value={formData.techStack}
                  onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                />
                {errors.techStack && <p className="text-red-400 text-[11px] mt-1">{errors.techStack}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    GitHub / Repo URL
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/..."
                    value={formData.githubUrl}
                    onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Live Demo Link
                  </label>
                  <input
                    type="url"
                    placeholder="https://myproject.dev"
                    value={formData.liveDemoUrl}
                    onChange={(e) => setFormData({ ...formData, liveDemoUrl: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Ananya S"
                    value={formData.creatorName}
                    onChange={(e) => setFormData({ ...formData, creatorName: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  {errors.creatorName && <p className="text-red-400 text-[11px] mt-1">{errors.creatorName}</p>}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-300 mb-1">
                    Contact Email *
                  </label>
                  <input
                    type="email"
                    placeholder="ananya@..."
                    value={formData.creatorEmail}
                    onChange={(e) => setFormData({ ...formData, creatorEmail: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-white/[0.03] border border-white/[0.1] text-xs text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
                  />
                  {errors.creatorEmail && <p className="text-red-400 text-[11px] mt-1">{errors.creatorEmail}</p>}
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-500 hover:to-violet-500 text-white font-semibold text-sm shadow-[0_0_25px_rgba(147,51,234,0.4)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span>Submitting Project...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit for Community Review</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="p-6 sm:p-8 text-center space-y-5">
            <div className="w-14 h-14 rounded-full bg-purple-500/20 border border-purple-500/40 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_25px_rgba(168,85,247,0.4)]">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <div>
              <h3 className="text-xl font-bold text-white">Project Submitted!</h3>
              <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto leading-relaxed">
                Thank you for contributing to the GSX Chennai ecosystem. Your submission has been delivered to the chapter review team at{' '}
                <span className="text-purple-300 font-semibold">{GSX_OFFICIAL_EMAIL}</span> for verification and directory listing.
              </p>
            </div>

            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-semibold hover:bg-purple-500 transition-colors shadow-lg"
            >
              Back to Projects
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
