import { TeamMember } from '../types';

/**
 * GSX Chennai Community Roles & Team Charter Data
 * Official roles and ownership areas aligned with the GSX community charter.
 */
export const FEATURED_LEAD: TeamMember = {
  id: 'lead-01',
  name: 'Dedeepya Yakkala',
  role: 'Chapter Lead',
  owns: 'Overall direction, central relationship, monthly report',
  shortBio: 'Leading overall chapter direction, high-level community architecture, ecosystem partnerships, and monthly chapter reporting for GSX Chennai.',
  image: '/team/DEDEEPYA%20YAKKALA.jpeg',
  iconName: 'Compass',
  linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
  instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  twitter: 'https://twitter.com',
  isLead: true,
};

export const CORE_TEAM: TeamMember[] = [
  {
    id: 'core-01',
    name: 'H Sujey',
    role: 'Co-Lead',
    owns: 'Logistics, venues, member data, event execution',
    shortBio: 'Spearheading venue coordination, operational logistics, member records, and seamless on-ground execution for chapter experiences.',
    image: '/team/SUJEY%20H.jpeg',
    iconName: 'Cpu',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-02',
    name: 'Abinaya R',
    role: 'Build Owner',
    owns: 'Open-source contributions, datasets, hackathons, agents',
    shortBio: 'Driving open-source engineering tracks, dataset curation, autonomous AI agent experimentation, and flagship GSX hackathons.',
    image: '/team/ABINAYA.jpeg',
    iconName: 'Hammer',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-03',
    name: 'Buvanagirish SK',
    role: 'Build Owner',
    owns: 'Open-source contributions, datasets, hackathons, agents',
    shortBio: 'Guiding repository architecture, dataset engineering, open tooling releases, and agentic AI project builds.',
    image: '/team/buvaneshwer.jpeg',
    iconName: 'Hammer',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-04',
    name: 'Kameshwaran',
    role: 'Community Owner',
    owns: 'Meetups, talks, reading clubs, networking',
    shortBio: 'Curating vibrant in-person meetups, technical lightning talks, paper reading circles, and inter-college networking forums.',
    image: '/team/KAMESHWARN.jpeg',
    iconName: 'Users',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-05',
    name: 'Kaviya Sree N',
    role: 'Career Owner',
    owns: 'Prep, certifications, resume reviews, referrals',
    shortBio: 'Empowering students and developers with tech interview prep clinics, certification pathways, resume feedback, and industry referrals.',
    image: '/team/KAVIYA.jpeg',
    iconName: 'TrendingUp',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-06',
    name: 'Minhu',
    role: 'Operation Lead',
    owns: 'Logistics, operations, venue coordination, registrations',
    shortBio: 'Coordinating operational workflows, venue logistics, registration pipelines, and smooth on-ground experience for chapter initiatives.',
    image: '/team/MINHU.jpeg',
    iconName: 'Cpu',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-07',
    name: 'Mithra',
    role: 'Comms Owner',
    owns: 'Social, announcements, event promos',
    shortBio: 'Managing digital media presence, visual broadcasts, chapter announcements, and promotional campaigns across tech channels.',
    image: '/team/MITHRA.jpeg',
    iconName: 'Megaphone',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-08',
    name: 'Mohamed Shameel',
    role: 'Impact Owner',
    owns: 'Schools, NGO literacy, local-language projects',
    shortBio: 'Leading grassroots technology outreach to schools, NGO digital literacy missions, and local-language / vernacular open tools.',
    image: '/team/SHAMEL.jpeg',
    iconName: 'HeartHandshake',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-09',
    name: 'Raghunath Balaji',
    role: 'Learning Owner',
    owns: 'Study circles, bootcamps, teacher sessions',
    shortBio: 'Designing structured peer study circles, hands-on developer bootcamps, and specialized technical enablement tracks.',
    image: '/team/raghunath%20balaji.jpeg',
    iconName: 'BookOpen',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
  {
    id: 'core-10',
    name: 'Semmozhi A',
    role: 'Learning Owner',
    owns: 'Study circles, bootcamps, teacher sessions',
    shortBio: 'Facilitating technical learning sprints, educator workshops, peer knowledge exchange, and student mentorship circles.',
    image: '/team/semmozhi.jpeg',
    iconName: 'BookOpen',
    linkedin: 'https://www.linkedin.com/company/gsx-chennai-chapter',
    instagram: 'https://www.instagram.com/gsx_chennai_chapter/',
  },
];

export interface CommunityRoleCharter {
  role: string;
  owns: string;
  details: string;
  iconName: string;
}

export const COMMUNITY_CHARTER: CommunityRoleCharter[] = [
  {
    role: 'Chapter Lead',
    owns: 'Overall direction, central relationship, monthly report',
    details: 'Steers chapter roadmap, aligns with global GSX initiatives, fosters institutional alliances, and oversees executive reporting.',
    iconName: 'Compass',
  },
  {
    role: 'Co-Lead / Ops',
    owns: 'Logistics, venues, member data, event execution',
    details: 'Manages physical and virtual venue setups, operations checklists, attendee registration data, and day-of event delivery.',
    iconName: 'Cpu',
  },
  {
    role: 'Learning Owner (2 Leads)',
    owns: 'Study circles, bootcamps, teacher sessions',
    details: 'Orchestrated by two co-owners to drive structured cohorts for emerging tech, peer study circles, and educator upskilling programs.',
    iconName: 'BookOpen',
  },
  {
    role: 'Build Owner (2 Leads)',
    owns: 'Open-source contributions, datasets, hackathons, agents',
    details: 'Co-led by two technical builders championing open-source repos, dataset engineering, AI agent architectures, and hackathons.',
    iconName: 'Hammer',
  },
  {
    role: 'Community Owner',
    owns: 'Meetups, talks, reading clubs, networking',
    details: 'Nurtures an inclusive, high-trust developer culture through recurring meetups, paper reading pods, and social mixers.',
    iconName: 'Users',
  },
  {
    role: 'Impact Owner',
    owns: 'Schools, NGO literacy, local-language projects',
    details: 'Brings tech education to underserved schools, partners with NGOs, and builds vernacular AI/software solutions.',
    iconName: 'HeartHandshake',
  },
  {
    role: 'Career Owner',
    owns: 'Prep, certifications, resume reviews, referrals',
    details: 'Accelerates members career readiness with mock interviews, certification sprints, resume audits, and job referral networks.',
    iconName: 'TrendingUp',
  },
  {
    role: 'Comms Owner',
    owns: 'Social, announcements, event promos',
    details: 'Amplifies chapter impact, publishes announcements, produces creative visual promos, and manages cross-platform socials.',
    iconName: 'Megaphone',
  },
];
