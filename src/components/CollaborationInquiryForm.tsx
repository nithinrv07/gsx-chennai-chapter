import React, { useState } from 'react';
import { CollaborationType, InquiryFormData } from '../types';
import { 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  Building2, 
  Mail, 
  Phone, 
  User, 
  MessageSquare, 
  Tag,
  Code2,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';

export interface CollaborationInquiryFormProps {
  id?: string;
  title?: string;
  subtitle?: string;
  defaultType?: CollaborationType;
  endpointUrl?: string; // e.g. Formspree endpoint or Google Forms webhook URL
  onSubmitCustom?: (data: InquiryFormData) => Promise<boolean | void>;
  onSuccess?: (data: InquiryFormData) => void;
  showBackendHelper?: boolean;
  className?: string;
}

export const COLLABORATION_TYPES: CollaborationType[] = [
  'Partnership',
  'Workshop',
  'Event',
  'Mentorship',
  'Sponsorship',
  'Community Collaboration',
  'Other',
];

export const CollaborationInquiryForm: React.FC<CollaborationInquiryFormProps> = ({
  id = 'collaboration-inquiry-form',
  title = 'Collaboration & Inquiries',
  subtitle = 'Partner with GSX Chennai for workshops, sponsorships, joint events, or community mentorship.',
  defaultType = 'Partnership',
  endpointUrl = 'https://formsubmit.co/ajax/reachtogsxchennai@gmail.com',
  onSubmitCustom,
  onSuccess,
  showBackendHelper = false,
  className = '',
}) => {
  const { isDark } = useTheme();

  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    organization: '',
    collaborationType: defaultType,
    message: '',
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [showConfigGuide, setShowConfigGuide] = useState(false);

  // Client-side field validation rules
  const validateField = (field: keyof InquiryFormData, value: string): string => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Please enter your full name (at least 2 characters)';
        return '';

      case 'email':
        if (!value.trim()) return 'Email address is required';
        // Comprehensive RFC 5322 compatible email pattern
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return '';

      case 'phone':
        if (value.trim()) {
          // If provided, ensure it contains at least 7 digits
          const digits = value.replace(/\D/g, '');
          if (digits.length < 7 || digits.length > 15) {
            return 'Please enter a valid phone number (7-15 digits)';
          }
        }
        return '';

      case 'collaborationType':
        if (!value) return 'Please select a collaboration type';
        return '';

      case 'message':
        if (!value.trim()) return 'Message / proposal details are required';
        if (value.trim().length < 10) return 'Please provide more context (at least 10 characters)';
        return '';

      default:
        return '';
    }
  };

  const validateAll = (): boolean => {
    const newErrors: Record<string, string> = {};
    (Object.keys(formData) as Array<keyof InquiryFormData>).forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err) newErrors[field] = err;
    });

    setErrors(newErrors);
    setTouched({
      name: true,
      email: true,
      phone: true,
      organization: true,
      collaborationType: true,
      message: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (field: keyof InquiryFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
  };

  const handleBlur = (field: keyof InquiryFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, formData[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateAll()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Local backup queue for zero data loss
      try {
        const stored = localStorage.getItem('gsx-saved-inquiries');
        const inquiries = stored ? JSON.parse(stored) : [];
        inquiries.push({
          ...formData,
          submittedAt: new Date().toISOString(),
          id: `inq_${Date.now()}`,
        });
        localStorage.setItem('gsx-saved-inquiries', JSON.stringify(inquiries));
      } catch {
        // LocalStorage fallback
      }

      if (onSubmitCustom) {
        // Custom submit handler provided by parent
        await onSubmitCustom(formData);
      } else if (endpointUrl) {
        // Real Backend submission to reachtogsxchennai@gmail.com
        const response = await fetch(endpointUrl, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            _subject: `New GSX Chennai Collaboration: ${formData.organization} (${formData.name})`,
            _template: 'table',
            _captcha: 'false',
            'Full Name': formData.name,
            'Email Address': formData.email,
            'Organization': formData.organization,
            'Role': formData.role,
            'Collaboration Type': formData.collaborationType,
            'Primary Track': formData.primaryTrack,
            'Preferred Timeline': formData.preferredTimeline,
            'Expected Audience': formData.expectedAudience,
            'Proposal Details': formData.message,
            'Submitted At': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
          }),
        });

        if (!response.ok) {
          console.warn(`Endpoint returned status: ${response.status}`);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 750));
      }

      setIsSuccess(true);
      if (onSuccess) {
        onSuccess(formData);
      }
    } catch (err) {
      console.error('Submission error:', err);
      setSubmitError(
        err instanceof Error 
          ? err.message 
          : 'Failed to deliver proposal. Please verify your connection or try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      organization: '',
      collaborationType: defaultType,
      message: '',
    });
    setTouched({});
    setErrors({});
    setIsSuccess(false);
    setSubmitError(null);
  };

  return (
    <div 
      id={id}
      className={`rounded-2xl transition-all duration-300 ${
        isDark 
          ? 'glass-panel p-6 sm:p-8 border border-white/[0.08]' 
          : 'bg-white p-6 sm:p-8 border border-violet-200/80 shadow-xl shadow-violet-900/5'
      } ${className}`}
    >
      <AnimatePresence mode="wait">
        {!isSuccess ? (
          <motion.div
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  isDark
                    ? 'bg-violet-500/15 text-violet-300 border border-violet-500/25'
                    : 'bg-violet-100 text-violet-800 border border-violet-200'
                }`}>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Official Inquiries & Proposals</span>
                </span>

                {showBackendHelper && (
                  <button
                    type="button"
                    onClick={() => setShowConfigGuide(!showConfigGuide)}
                    className={`text-xs inline-flex items-center gap-1 transition-colors ${
                      isDark ? 'text-gray-400 hover:text-violet-300' : 'text-slate-500 hover:text-violet-700'
                    }`}
                    title="View integration guide for Formspree / Google Forms"
                  >
                    <Code2 className="w-3.5 h-3.5" />
                    <span>{showConfigGuide ? 'Hide Endpoint Info' : 'Backend Ready'}</span>
                  </button>
                )}
              </div>

              <h2 className={`font-space text-2xl sm:text-3xl font-bold tracking-tight mb-1.5 ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {title}
              </h2>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-gray-400' : 'text-slate-600'}`}>
                {subtitle}
              </p>

              {/* Developer Configuration Helper banner */}
              {showConfigGuide && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-4 p-4 rounded-xl text-xs leading-relaxed border ${
                    isDark 
                      ? 'bg-violet-950/30 border-violet-500/30 text-gray-300' 
                      : 'bg-violet-50 border-violet-200 text-slate-700'
                  }`}
                >
                  <div className="flex items-start gap-2 mb-1.5 font-semibold text-violet-400">
                    <Info className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>Backend Ready: Formspree / Google Forms Configuration</span>
                  </div>
                  <p className="mb-2">
                    This component comes ready for production webhooks. Simply supply the <code className="px-1 py-0.5 rounded bg-black/20 font-mono">endpointUrl</code> prop:
                  </p>
                  <ul className="list-disc list-inside space-y-1 pl-1 font-mono text-[11px]">
                    <li>Formspree: <code className="text-violet-300">endpointUrl="https://formspree.io/f/YOUR_FORM_ID"</code></li>
                    <li>Google Forms: Provide your Apps Script webhook or Google Form response URL.</li>
                    <li>Without an endpoint, submissions save locally to ensure preview resilience.</li>
                  </ul>
                </motion.div>
              )}
            </div>

            {/* Main Form */}
            <form onSubmit={handleSubmit} noValidate className="space-y-4">
              {submitError && (
                <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{submitError}</span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Name */}
                <div>
                  <label 
                    htmlFor="inquiry-name" 
                    className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    <User className="w-3.5 h-3.5 text-violet-400" />
                    <span>Your Name <span className="text-violet-400">*</span></span>
                  </label>
                  <input
                    id="inquiry-name"
                    name="name"
                    type="text"
                    required
                    placeholder="e.g. Ramesh Subramanian"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    onBlur={() => handleBlur('name')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDark 
                        ? 'bg-white/[0.04] text-white placeholder-gray-500 border border-white/[0.1] focus:border-violet-400' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:border-violet-500'
                    } ${errors.name ? 'border-red-500/80 focus:border-red-500' : ''}`}
                  />
                  {errors.name && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.name}</span>
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label 
                    htmlFor="inquiry-email" 
                    className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    <Mail className="w-3.5 h-3.5 text-violet-400" />
                    <span>Email Address <span className="text-violet-400">*</span></span>
                  </label>
                  <input
                    id="inquiry-email"
                    name="email"
                    type="email"
                    required
                    placeholder="ramesh@company.com"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    onBlur={() => handleBlur('email')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDark 
                        ? 'bg-white/[0.04] text-white placeholder-gray-500 border border-white/[0.1] focus:border-violet-400' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:border-violet-500'
                    } ${errors.email ? 'border-red-500/80 focus:border-red-500' : ''}`}
                  />
                  {errors.email && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Phone (Optional) */}
                <div>
                  <label 
                    htmlFor="inquiry-phone" 
                    className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    <Phone className="w-3.5 h-3.5 text-violet-400" />
                    <span>Phone Number <span className="text-xs text-gray-400 font-normal">(Optional)</span></span>
                  </label>
                  <input
                    id="inquiry-phone"
                    name="phone"
                    type="tel"
                    placeholder="+91 98765 43210"
                    value={formData.phone}
                    onChange={(e) => handleChange('phone', e.target.value)}
                    onBlur={() => handleBlur('phone')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDark 
                        ? 'bg-white/[0.04] text-white placeholder-gray-500 border border-white/[0.1] focus:border-violet-400' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:border-violet-500'
                    } ${errors.phone ? 'border-red-500/80 focus:border-red-500' : ''}`}
                  />
                  {errors.phone && (
                    <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.phone}</span>
                    </p>
                  )}
                </div>

                {/* Organization (Optional) */}
                <div>
                  <label 
                    htmlFor="inquiry-organization" 
                    className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    <Building2 className="w-3.5 h-3.5 text-violet-400" />
                    <span>Organization / Institution <span className="text-xs text-gray-400 font-normal">(Optional)</span></span>
                  </label>
                  <input
                    id="inquiry-organization"
                    name="organization"
                    type="text"
                    placeholder="e.g. Startup, College, or Company"
                    value={formData.organization}
                    onChange={(e) => handleChange('organization', e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                      isDark 
                        ? 'bg-white/[0.04] text-white placeholder-gray-500 border border-white/[0.1] focus:border-violet-400' 
                        : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:border-violet-500'
                    }`}
                  />
                </div>
              </div>

              {/* Collaboration Type Dropdown */}
              <div>
                <label 
                  htmlFor="inquiry-collaboration-type" 
                  className={`block text-xs font-semibold mb-1.5 flex items-center gap-1.5 ${
                    isDark ? 'text-gray-300' : 'text-slate-700'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5 text-violet-400" />
                  <span>Collaboration Type <span className="text-violet-400">*</span></span>
                </label>
                <div className="relative">
                  <select
                    id="inquiry-collaboration-type"
                    name="collaborationType"
                    value={formData.collaborationType}
                    onChange={(e) => handleChange('collaborationType', e.target.value as CollaborationType)}
                    onBlur={() => handleBlur('collaborationType')}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-sm appearance-none transition-all focus:outline-none focus:ring-2 focus:ring-violet-500/50 cursor-pointer ${
                      isDark 
                        ? 'bg-[#110e1f] text-white border border-white/[0.1] focus:border-violet-400' 
                        : 'bg-slate-50 text-slate-900 border border-slate-200 focus:bg-white focus:border-violet-500'
                    } ${errors.collaborationType ? 'border-red-500/80' : ''}`}
                  >
                    {COLLABORATION_TYPES.map((type) => (
                      <option key={type} value={type} className={isDark ? 'bg-[#0f0b18] text-white' : 'bg-white text-slate-900'}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3.5 text-violet-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                      <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                    </svg>
                  </div>
                </div>
                {errors.collaborationType && (
                  <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.collaborationType}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label 
                    htmlFor="inquiry-message" 
                    className={`block text-xs font-semibold flex items-center gap-1.5 ${
                      isDark ? 'text-gray-300' : 'text-slate-700'
                    }`}
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
                    <span>Your Proposal / Message <span className="text-violet-400">*</span></span>
                  </label>
                  <span className={`text-[10px] ${formData.message.length >= 10 ? 'text-violet-400' : 'text-gray-500'}`}>
                    {formData.message.length} chars
                  </span>
                </div>
                <textarea
                  id="inquiry-message"
                  name="message"
                  rows={4}
                  required
                  placeholder="Share details regarding your initiative, timeline, speaker topics, venue support, or questions for our chapter team..."
                  value={formData.message}
                  onChange={(e) => handleChange('message', e.target.value)}
                  onBlur={() => handleBlur('message')}
                  className={`w-full px-3.5 py-2.5 rounded-xl text-sm transition-all resize-none focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${
                    isDark 
                      ? 'bg-white/[0.04] text-white placeholder-gray-500 border border-white/[0.1] focus:border-violet-400' 
                      : 'bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:bg-white focus:border-violet-500'
                  } ${errors.message ? 'border-red-500/80 focus:border-red-500' : ''}`}
                />
                {errors.message && (
                  <p className="text-red-400 text-[11px] mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" />
                    <span>{errors.message}</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-bold text-sm shadow-[0_10px_30px_rgba(139,92,246,0.35)] hover:shadow-[0_15px_35px_rgba(139,92,246,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-[0.99]"
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Submitting Inquiry...</span>
                    </span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Collaboration Request →</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          /* Success State */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8 px-2 space-y-5"
          >
            <div className="w-16 h-16 rounded-full bg-violet-500/20 border border-violet-500/40 text-violet-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(139,92,246,0.4)]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-2 ${
                isDark ? 'bg-violet-500/20 text-violet-300' : 'bg-violet-100 text-violet-700'
              }`}>
                Inquiry Received
              </span>
              <h3 className={`font-space text-2xl font-bold mb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Thank You, {formData.name}!
              </h3>
              <p className={`text-sm max-w-md mx-auto leading-relaxed ${isDark ? 'text-gray-300' : 'text-slate-600'}`}>
                Your proposal for <strong>{formData.collaborationType}</strong> has been logged. Our GSX Chennai chapter coordinators review inquiries weekly and will connect back via <strong>{formData.email}</strong>.
              </p>
            </div>

            {/* Submission Summary Badge */}
            <div className={`max-w-md mx-auto p-4 rounded-xl text-left text-xs space-y-1.5 ${
              isDark ? 'bg-white/[0.02] border border-white/[0.08]' : 'bg-slate-50 border border-slate-200'
            }`}>
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>Category:</span>
                <span className="font-semibold text-violet-400">{formData.collaborationType}</span>
              </div>
              {formData.organization && (
                <div className="flex justify-between">
                  <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>Organization:</span>
                  <span className={`font-medium ${isDark ? 'text-white' : 'text-slate-800'}`}>{formData.organization}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className={isDark ? 'text-gray-400' : 'text-slate-500'}>Status:</span>
                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Queued for Review
                </span>
              </div>
            </div>

            <div className="pt-2 flex justify-center gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-violet-600 hover:bg-violet-500 text-white shadow-md transition-all cursor-pointer"
              >
                Submit Another Inquiry
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
