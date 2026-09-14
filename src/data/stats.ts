import { StatItem, PillarCard } from '../types';

/**
 * GSX Chennai Statistics
 * Note: These are structured placeholder metrics designed to be updated with real figures.
 */
export const STATS_DATA: StatItem[] = [
  {
    id: 'members',
    value: '1,200+',
    label: 'Community Members',
    subtext: 'Developers, designers, & creators'
  },
  {
    id: 'events',
    value: '24+',
    label: 'Events Hosted',
    subtext: 'Hackathons, meetups, & keynotes'
  },
  {
    id: 'projects',
    value: '18+',
    label: 'Community Projects',
    subtext: 'Open-source solutions & tools'
  },
  {
    id: 'volunteers',
    value: '45+',
    label: 'Active Volunteers',
    subtext: 'Leading initiatives across Chennai'
  }
];

export const WHAT_WE_DO_CARDS: PillarCard[] = [
  {
    number: '01',
    title: 'Learning',
    description: 'Workshops, masterclasses, and hands-on learning experiences designed to sharpen real-world technical skills.',
    iconName: 'BookOpen',
    highlighted: false
  },
  {
    number: '02',
    title: 'Building',
    description: 'Turn ideas into real-world projects and products with supportive peers, guidance, and community hackathons.',
    iconName: 'Hammer',
    highlighted: true // Featured purple accent state
  },
  {
    number: '03',
    title: 'Community',
    description: 'Connect with people who share your curiosity, ambition, and drive across college campuses and tech hubs.',
    iconName: 'Users',
    highlighted: false
  },
  {
    number: '04',
    title: 'Innovation',
    description: 'Explore emerging technologies like AI/ML, cloud, systems, and open-source to solve meaningful problems.',
    iconName: 'Sparkles',
    highlighted: false
  },
  {
    number: '05',
    title: 'Opportunities',
    description: 'Discover projects, collaborations, technical mentorship, fellowships, and startup career connections.',
    iconName: 'Briefcase',
    highlighted: false
  }
];
