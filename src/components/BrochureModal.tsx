import React from 'react';
import { 
  X, 
  Printer, 
  Sparkles, 
  Target, 
  GraduationCap, 
  Hammer, 
  Users, 
  HeartHandshake, 
  TrendingUp, 
  Building2, 
  School, 
  Cpu, 
  Compass, 
  Mail, 
  Instagram, 
  Linkedin, 
  Award, 
  CheckCircle2,
  Calendar,
  MapPin,
  Flame
} from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto bg-black/85 backdrop-blur-md">
      {/* Container */}
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-[#0c0a14] border border-purple-500/30 rounded-3xl shadow-[0_0_60px_rgba(147,51,234,0.3)] overflow-hidden flex flex-col my-auto">
        {/* Modal Toolbar (hidden on print) */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08] bg-[#120f1f] shrink-0 print:hidden">
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300">
              <Sparkles className="w-4 h-4" />
            </span>
            <span className="text-sm font-bold text-white tracking-wide">
              Official GSX Chennai Partnership Brochure
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(168,85,247,0.4)] cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save as PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/[0.05] hover:bg-white/[0.1] text-gray-400 hover:text-white transition-colors cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Brochure Printable Content */}
        <div id="printable-brochure" className="overflow-y-auto p-6 sm:p-10 space-y-12 text-gray-200">
          {/* ===================================================
              1. COVER SECTION
              =================================================== */}
          <div className="relative p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-[#1a1230] via-[#0f0c1c] to-[#160d2b] border border-purple-500/30 text-center overflow-hidden">
            <div className="absolute -top-24 -right-24 w-72 h-72 bg-purple-600/20 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-violet-600/20 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400 block">
                GirlScript Foundation
              </span>

              <div className="flex items-center justify-center gap-3 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-purple-600 flex items-center justify-center p-2 shadow-lg shadow-purple-500/30">
                  <img src="/gsx-logo.png" alt="GSX Logo" className="w-full h-full object-contain" />
                </div>
                <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
                  GSX Chennai Chapter
                </h1>
              </div>

              <p className="text-xl sm:text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-purple-400 tracking-wider">
                Learn. Build. Connect. Grow.
              </p>

              <p className="text-sm sm:text-base font-semibold text-purple-300 max-w-xl mx-auto">
                One community. Many colleges. Limitless opportunities.
              </p>

              <div className="pt-2 text-xs sm:text-sm text-gray-300 max-w-lg mx-auto leading-relaxed border-t border-white/[0.08]">
                A city-wide student tech community bringing together ambitious builders and learners from colleges across Greater Chennai.
              </div>
            </div>
          </div>

          {/* ===================================================
              2. ABOUT GSX CHENNAI & FIVE VERTICALS
              =================================================== */}
          <div className="space-y-6">
            <div className="border-b border-purple-500/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                02 • Community Blueprint
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                About GSX Chennai
              </h2>
            </div>

            <div className="space-y-4 text-sm sm:text-base text-gray-300 leading-relaxed">
              <p>
                GSX Chennai is the official local student extension of the <strong className="text-white">GirlScript Foundation</strong> — a global non-profit focused on empowering beginners in technology and building inclusive tech communities. GSX Chennai brings that mission to the city, creating a high-impact technical ecosystem where students don&apos;t just consume technology, but learn it, build with it, and contribute to it.
              </p>
              <p>
                It is a community-driven platform designed to bridge the gap between academic learning and real-world industry demands — because while college gives students a foundation, the technology industry constantly asks them to go beyond it.
              </p>
            </div>

            {/* Five Verticals */}
            <div className="pt-2">
              <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                <Target className="w-4 h-4 text-purple-400" />
                <span>Our Five Verticals</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-1">
                    <GraduationCap className="w-4 h-4" />
                    <span>Learning (Live Week 1)</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Weekly AI study circles, open-source workshops, teacher sessions, and beginner bootcamps.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-1">
                    <Hammer className="w-4 h-4" />
                    <span>Building</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Dataset contributions, open-model work, AI agents, monthly Build Days, and hackathons.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-1">
                    <Users className="w-4 h-4" />
                    <span>Community</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Monthly meetups, founder talks, AI reading clubs, inter-college mixers, and local networking.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08]">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-1">
                    <HeartHandshake className="w-4 h-4" />
                    <span>Impact</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    AI-awareness sessions in schools, NGO digital-literacy drives, local-language AI projects, and cybersecurity awareness.
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/[0.08] sm:col-span-2">
                  <div className="flex items-center gap-2 text-purple-300 font-bold text-sm mb-1">
                    <TrendingUp className="w-4 h-4" />
                    <span>Career</span>
                  </div>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Internship prep, certifications, resume-review clinics, research opportunities, and direct job referrals.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              3. OUR STORY SO FAR
              =================================================== */}
          <div className="space-y-6">
            <div className="border-b border-purple-500/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                03 • Proven Traction
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Our Story So Far
              </h2>
            </div>

            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">Event 1 — Chapter Establishment</h4>
                  <span className="text-xs font-mono text-purple-400">Foundation</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  GSX Chennai&apos;s establishment began with conversations with senior officials, including Gokul sir, which led to Chennai Institute of Technology (CIT) coming on board as the chapter&apos;s host college. This marked the institutional foundation set in place before the public launch.
                </p>
              </div>

              <div className="p-5 rounded-2xl bg-purple-950/20 border border-purple-500/20 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-base font-bold text-white">Event 2 — Inaugural Event</h4>
                  <span className="text-xs font-mono text-purple-400">20th August 2026</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                  Held at Chennai Institute of Technology under the theme <strong className="text-white">&ldquo;Learn. Build. Connect. Grow.&rdquo;</strong>
                </p>
                <ul className="text-xs text-gray-300 space-y-1.5 pl-4 list-disc marker:text-purple-400">
                  <li>Opening address by Chapter Lead Dedeepya introducing the chapter&apos;s vision and working council.</li>
                  <li>Technical session on open source, real-world projects, and navigating a career in technology.</li>
                  <li>Live, hands-on masterclass on building autonomous AI agents from scratch.</li>
                  <li>Interactive Q&A and an open invitation for attendees to formally join the community.</li>
                </ul>
                <div className="pt-2 text-xs italic text-purple-300 border-t border-white/[0.06]">
                  &ldquo;A community doesn&apos;t exist because of a logo, a chapter, or a social media page. It exists because people show up.&rdquo;
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              4. WHY PARTNER WITH GSX CHENNAI
              =================================================== */}
          <div className="space-y-6">
            <div className="border-b border-purple-500/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                04 • Strategic Synergies
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Why Partner With GSX Chennai
              </h2>
            </div>

            <p className="text-xs sm:text-sm text-gray-300">
              GSX Chennai already brings together an active, motivated student community across the city. Partnering gives your organisation a direct, credible way to reach that community while giving members real-world exposure.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {/* Companies */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Cpu className="w-4 h-4 text-purple-400" />
                  <span>For Companies</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4 marker:text-purple-400">
                  <li>Steady pipeline of trained, motivated student talent for internships and hiring.</li>
                  <li>Host workshops, hackathons, or AI Build Days to showcase tech hands-on.</li>
                  <li>Employer branding and visibility across multiple Chennai colleges.</li>
                  <li>CSR & skilling partnerships: sponsor certifications and resume clinics.</li>
                </ul>
              </div>

              {/* NGOs */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <Building2 className="w-4 h-4 text-purple-400" />
                  <span>For NGOs</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4 marker:text-purple-400">
                  <li>Ready volunteer base for AI awareness and digital literacy drives.</li>
                  <li>Co-run local-language AI and cybersecurity awareness projects.</li>
                  <li>Access students trained in AI basics who can mentor and teach.</li>
                  <li>Shared visibility through joint events and social broadcast channels.</li>
                </ul>
              </div>

              {/* Colleges */}
              <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.08] space-y-3">
                <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                  <School className="w-4 h-4 text-purple-400" />
                  <span>For Colleges & Groups</span>
                </div>
                <ul className="text-xs text-gray-300 space-y-2 list-disc pl-4 marker:text-purple-400">
                  <li>Cross-college collaboration connecting students across institutions.</li>
                  <li>Speaker and mentor opportunities at study circles and bootcamps.</li>
                  <li>Venue and co-hosting partnerships for meetups and hackathons.</li>
                  <li>Hands-on supplement to classroom computer science curriculum.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* ===================================================
              5. WHAT MEMBERS GET & CONTRIBUTOR JOURNEY
              =================================================== */}
          <div className="space-y-6">
            <div className="border-b border-purple-500/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                05 • Member Growth & Trajectory
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                What Members Get
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Award className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-200">Certificates & Recognition</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Users className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-200">Experienced Mentorship</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <TrendingUp className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-200">Internships & Career Access</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3">
                <Sparkles className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-200">Ecosystem Visibility</span>
              </div>
              <div className="p-3.5 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-3 sm:col-span-2">
                <Flame className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="text-xs font-semibold text-gray-200">Hackathons, Build Days & Experiences</span>
              </div>
            </div>

            {/* Contributor Journey */}
            <div className="pt-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-purple-400 mb-3">
                The Contributor Journey
              </h4>
              <div className="p-4 rounded-2xl bg-purple-950/30 border border-purple-500/20">
                <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 text-[11px] font-semibold text-purple-200">
                  <span>Student</span>
                  <span className="text-purple-400">→</span>
                  <span>Learner</span>
                  <span className="text-purple-400">→</span>
                  <span>Contributor</span>
                  <span className="text-purple-400">→</span>
                  <span>Mentor</span>
                  <span className="text-purple-400">→</span>
                  <span>Chapter Lead</span>
                  <span className="text-purple-400">→</span>
                  <span>Fellow</span>
                  <span className="text-purple-400">→</span>
                  <span>Researcher</span>
                  <span className="text-purple-400">→</span>
                  <span>Builder</span>
                  <span className="text-purple-400">→</span>
                  <span>Startup Founder</span>
                  <span className="text-purple-400">→</span>
                  <span>Ecosystem Partner</span>
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              6. HOW TO GET INVOLVED
              =================================================== */}
          <div className="space-y-4">
            <div className="border-b border-purple-500/20 pb-3">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                06 • Action Steps
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                How to Get Involved
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-gray-300">
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Join our Community:</strong>
                  Stay updated on study circles, workshops, and opportunities.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Attend Events:</strong>
                  Participate in monthly Build Days, talks, hackathons, and meetups.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Contribute:</strong>
                  Work on open-source repositories and mentor upcoming peers.
                </div>
              </div>
              <div className="flex items-start gap-2.5 p-3 rounded-xl bg-white/[0.02]">
                <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Partner With Us:</strong>
                  Sponsor hackathons, host workshops, or co-run skilling programs.
                </div>
              </div>
            </div>
          </div>

          {/* ===================================================
              7. CONTACT & OFFICIAL CHANNELS
              =================================================== */}
          <div className="p-6 sm:p-8 rounded-3xl bg-purple-950/40 border border-purple-500/30 space-y-6">
            <div className="text-center space-y-1">
              <span className="text-xs font-bold uppercase tracking-widest text-purple-400">
                Official Directory
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                Contact & Community Channels
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-300">
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1">
                <span className="text-purple-400 font-bold block">Dedeepya Yakkala</span>
                <span className="text-gray-400">Chapter Lead, GSX Chennai</span>
              </div>
              <div className="p-4 rounded-2xl bg-black/40 border border-white/[0.08] space-y-1">
                <span className="text-purple-400 font-bold block">H Sujey</span>
                <span className="text-gray-400">Co-Lead & Operations, GSX Chennai</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
              <a
                href="mailto:reachtogsxchennai@gmail.com"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 text-gray-300 hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">reachtogsxchennai@gmail.com</span>
              </a>

              <a
                href="https://chat.whatsapp.com/HfxItPkZAgeDtdKut2qgfr?s=cl&p=a&ilr=0"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 text-gray-300 hover:text-white transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">WhatsApp Community</span>
              </a>

              <a
                href="https://www.instagram.com/gsx_chennai_chapter/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">Instagram</span>
              </a>

              <a
                href="https://www.linkedin.com/company/gsx-chennai-chapter"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-3 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:border-purple-500/40 text-gray-300 hover:text-white transition-colors"
              >
                <Linkedin className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">LinkedIn</span>
              </a>
            </div>

            <div className="text-center pt-2">
              <p className="text-sm font-semibold text-white italic">
                &ldquo;GSX Chennai isn&apos;t something that happens for students. It&apos;s something that happens with students.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
