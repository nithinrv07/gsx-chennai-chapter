import React from 'react';
import { AnnouncementItem } from '../types';
import { X, Calendar, Clock, ArrowLeft, Tag, User, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface AnnouncementDetailModalProps {
  announcement: AnnouncementItem | null;
  allAnnouncements: AnnouncementItem[];
  onClose: () => void;
  onSelectRelated: (announcement: AnnouncementItem) => void;
}

export const AnnouncementDetailModal: React.FC<AnnouncementDetailModalProps> = ({
  announcement,
  allAnnouncements,
  onClose,
  onSelectRelated,
}) => {
  if (!announcement) return null;

  const related = allAnnouncements
    .filter((a) => a.id !== announcement.id)
    .slice(0, 2);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        className="relative w-full max-w-3xl bg-[#090710] border border-white/[0.1] rounded-2xl shadow-[0_0_50px_rgba(168,85,247,0.25)] overflow-hidden my-8"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/60 border border-white/10 text-gray-300 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Cover Image */}
        <div className="relative h-56 sm:h-72 w-full overflow-hidden">
          <img
            src={announcement.image}
            alt={announcement.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#090710] via-[#090710]/50 to-transparent" />

          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-purple-500/25 text-purple-300 border border-purple-500/40 backdrop-blur-md">
              {announcement.category}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6">
            <h2 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {announcement.title}
            </h2>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400 pb-4 border-b border-white/[0.08]">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" />
              <span>{announcement.date}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-400" />
              <span>{announcement.readTime}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-purple-400" />
              <span className="text-gray-300 font-medium">{announcement.author}</span>
            </div>
          </div>

          {/* Full content with Markdown-like paragraphs */}
          <div className="prose prose-invert max-w-none text-gray-300 text-sm sm:text-base leading-relaxed space-y-4">
            {announcement.content.split('\n\n').map((paragraph, idx) => {
              if (paragraph.startsWith('###')) {
                return (
                  <h4 key={idx} className="text-base font-bold text-white mt-4 mb-2">
                    {paragraph.replace('###', '').trim()}
                  </h4>
                );
              }
              if (paragraph.startsWith('-')) {
                return (
                  <ul key={idx} className="space-y-1.5 list-disc list-inside text-gray-300 text-xs sm:text-sm pl-2">
                    {paragraph.split('\n').map((item, itemIdx) => (
                      <li key={itemIdx}>{item.replace('-', '').trim()}</li>
                    ))}
                  </ul>
                );
              }
              return (
                <p key={idx} className="text-gray-300 text-xs sm:text-sm leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {announcement.tags && (
            <div className="flex flex-wrap gap-2 pt-2">
              {announcement.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-white/[0.03] text-purple-300 border border-white/[0.06] flex items-center gap-1"
                >
                  <Tag className="w-2.5 h-2.5" />
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Related Announcements */}
          {related.length > 0 && (
            <div className="pt-6 border-t border-white/[0.08]">
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
                Related Updates
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {related.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => onSelectRelated(item)}
                    className="p-3 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:border-purple-500/30 text-left transition-all group cursor-pointer"
                  >
                    <span className="text-[10px] text-purple-400 font-semibold uppercase block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-white group-hover:text-purple-200 line-clamp-1">
                      {item.title}
                    </h4>
                    <p className="text-[11px] text-gray-400 line-clamp-2 mt-1">
                      {item.shortDescription}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between">
            <button
              onClick={onClose}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/[0.04] text-xs font-semibold text-gray-300 hover:text-white hover:bg-white/[0.08] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Announcements</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
