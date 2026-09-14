export type PageId = 
  | 'home'
  | 'about'
  | 'team'
  | 'events'
  | 'announcements'
  | 'projects'
  | 'get-involved';

export interface StatItem {
  id: string;
  label: string;
  value: string;
  subtext: string;
}

export interface PillarCard {
  number: string;
  title: string;
  description: string;
  iconName: string;
  highlighted?: boolean;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  owns: string;
  shortBio: string;
  image: string;
  iconName?: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  isLead?: boolean;
}

export type EventCategory = 'All' | 'Workshops' | 'Hackathons' | 'Meetups' | 'Tech Sessions' | 'Community';

export interface EventItem {
  id: string;
  title: string;
  category: 'Workshops' | 'Hackathons' | 'Meetups' | 'Tech Sessions' | 'Community';
  date: string;
  time: string;
  location: string;
  venueType: 'In-Person' | 'Hybrid' | 'Virtual';
  description: string;
  image: string;
  speakers?: {
    name: string;
    role: string;
    company: string;
    avatar: string;
  }[];
  agenda?: {
    time: string;
    topic: string;
  }[];
  status: 'upcoming' | 'past' | 'ongoing';
  registrationOpen: boolean;
  registrationUrl?: string;
  capacity?: string;
}

export type ProjectCategory = 'All' | 'AI / ML' | 'Web' | 'Mobile' | 'Open Source' | 'Hardware' | 'Other';

export interface ProjectItem {
  id: string;
  title: string;
  category: 'AI / ML' | 'Web' | 'Mobile' | 'Open Source' | 'Hardware' | 'Other';
  shortDescription: string;
  problem: string;
  solution: string;
  features: string[];
  techStack: string[];
  creators: {
    name: string;
    role: string;
    avatar?: string;
  }[];
  image: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export type AnnouncementCategory = 
  | 'All'
  | 'Community Updates'
  | 'Event Updates'
  | 'Opportunities'
  | 'News'
  | 'Important Announcements';

export interface AnnouncementItem {
  id: string;
  title: string;
  category: 'Community Updates' | 'Event Updates' | 'Opportunities' | 'News' | 'Important Announcements';
  shortDescription: string;
  content: string;
  date: string;
  readTime: string;
  image: string;
  isFeatured?: boolean;
  author: string;
  tags: string[];
}

export interface OpportunityItem {
  number: string;
  title: string;
  description: string;
  iconName: string;
  tag: string;
}

export interface JourneyMilestone {
  step: string;
  title: string;
  description: string;
  status: string;
}

export type CollaborationType = 
  | 'Partnership'
  | 'Workshop'
  | 'Event'
  | 'Mentorship'
  | 'Sponsorship'
  | 'Community Collaboration'
  | 'Other';

export interface CollaborationRequest {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  collaborationType: CollaborationType | string;
  message: string;
}

export interface InquiryFormData {
  name: string;
  email: string;
  phone: string;
  organization: string;
  collaborationType: CollaborationType;
  message: string;
}
