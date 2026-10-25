import { TeamMember } from '../types';
import { mediaUrl } from '../lib/media';

/**
 * GSX Chennai Community Roles & Team Charter Data
 * Official roles and ownership areas aligned with the GSX community charter.
 */
export const FEATURED_LEAD: TeamMember = {
  id: 'lead-01',
  name: 'Dedeepya Yakkala',
  role: 'Chapter Lead',
  owns: 'Overall direction, central relationship, monthly report',
  shortBio: `Dedeepya Yakkala is the Chapter Lead of GSX Chennai Chapter under GirlScript Foundation. She leads the chapter’s overall vision, community development, inter-college expansion, and ecosystem partnerships, working towards building a student community that extends beyond individual campuses.

Passionate about technology, community building, and creating meaningful opportunities for students, she focuses on bringing people together through learning, real-world projects, collaborations, and career-oriented initiatives. Her vision is to build a space where students can explore their interests, develop practical skills, work on real-world challenges, and grow together as contributors and innovators.

Through GSX Chennai, she aims to connect students, institutions, organisations, and industry professionals to create opportunities that go beyond traditional classroom learning.

Her guiding philosophy: Learn. Build. Connect. Grow. — together, beyond campuses.`,
  image: mediaUrl('team/dedeepya-yakkala.jpg'),
  iconName: 'Compass',
  linkedin: 'https://www.linkedin.com/in/dedeepyayakkala',
  isLead: true,
};

// Order and roles follow "GSX Chennai Chapter - Operations & Team Responsibilities".
// A member without a photo can use image: '' to show their initials.
export const CORE_TEAM: TeamMember[] = [
  {
    id: 'core-buvanagirish',
    name: 'Buvanagirish S K',
    role: 'Co-Lead',
    owns: 'Chapter coordination and leadership',
    shortBio: 'Co-leading the chapter alongside the Chapter Lead and coordinating the core team.',
    image: mediaUrl('team/buvaneshwer.jpg'),
    iconName: 'Compass',
    linkedin: 'https://www.linkedin.com/in/buvanagirish-sk-3b7ba8329/',
  },
  {
    id: 'core-minhu',
    name: 'Minhu Parthasarathy',
    role: 'Co-Lead',
    owns: 'Chapter coordination and leadership',
    shortBio: 'Co-leading the chapter alongside the Chapter Lead and coordinating the core team.',
    image: mediaUrl('team/minhu.jpg'),
    iconName: 'Compass',
    linkedin: 'https://www.linkedin.com/in/minhu-parthasarathy07/',
  },
  {
    id: 'core-abinaya',
    name: 'Abinaya R',
    role: 'Projects Head',
    owns: 'Chapter projects',
    shortBio: 'Leading the chapter’s projects and guiding project teams.',
    image: mediaUrl('team/abinaya.jpg'),
    iconName: 'Hammer',
    linkedin: 'https://www.linkedin.com/in/abinaya0333',
  },
  {
    id: 'core-adhithyan',
    name: 'Adhithyan',
    role: 'Outreach',
    owns: 'Outreach and partnerships',
    shortBio: 'Connecting the chapter with colleges, organisations and new members.',
    image: mediaUrl('team/adhithyan.jpg'),
    iconName: 'HeartHandshake',
  },
  {
    id: 'core-balaji',
    name: 'Balaji',
    role: 'Tech Head',
    owns: 'Technical direction',
    shortBio: 'Leading the chapter’s technical initiatives and development.',
    image: mediaUrl('team/balaji-s.jpg'),
    iconName: 'Cpu',
  },
  {
    id: 'core-hariharan',
    name: 'Hariharan',
    role: 'Tech Ops',
    owns: 'Technical operations',
    shortBio: 'Running technical operations and supporting chapter sessions.',
    image: mediaUrl('team/hari-haran.jpg'),
    iconName: 'Cpu',
  },
  {
    id: 'core-sathappan',
    name: 'Sathappan',
    role: 'Tech Ops',
    owns: 'Technical operations',
    shortBio: 'Running technical operations and supporting chapter sessions.',
    image: mediaUrl('team/sathappan.jpg'),
    iconName: 'Cpu',
  },
  {
    id: 'core-jenita',
    name: 'Jenita Agnes D L',
    role: 'Outreach & Community Engagement',
    owns: 'Outreach and community engagement',
    shortBio: 'Growing the chapter’s reach and keeping the community engaged.',
    image: mediaUrl('team/jenita-agnes.jpg'),
    iconName: 'HeartHandshake',
    linkedin: 'https://www.linkedin.com/in/jenita-agnes-dl/',
  },
  {
    id: 'core-kaviya',
    name: 'Kaviya Sree N',
    role: 'Online Meetups',
    owns: 'Online meetups',
    shortBio: 'Organising the chapter’s online meetups and virtual sessions.',
    image: mediaUrl('team/kaviya.jpg'),
    iconName: 'Users',
    linkedin: 'https://www.linkedin.com/in/kaviya-sree-n-a6293b380/',
  },
  {
    id: 'core-nithin-r',
    name: 'Nithin R',
    role: 'Core / Tech Coordination',
    owns: 'Core team and tech coordination',
    shortBio: 'Coordinating between the core team and the tech team.',
    image: mediaUrl('team/nithin-r.jpg'),
    iconName: 'Cpu',
    linkedin: 'https://www.linkedin.com/in/nithinr-engineer',
  },
  {
    id: 'core-semmozhi',
    name: 'Semmozhi A',
    role: 'Design',
    owns: 'Design and visuals',
    shortBio: 'Creating the chapter’s designs, posters and visual identity.',
    image: mediaUrl('team/semmozhi.jpg'),
    iconName: 'Palette',
    linkedin: 'https://www.linkedin.com/in/semmozhi/',
  },
  {
    id: 'core-shameel',
    name: 'Mohamed Shameel M',
    role: 'Community Engagement',
    owns: 'Community engagement',
    shortBio: 'Engaging members and supporting community participation.',
    image: mediaUrl('team/shameel.jpg'),
    iconName: 'Users',
    linkedin: 'https://www.linkedin.com/in/mohamedshameel2006/',
  },
  {
    id: 'core-kameshwaran',
    name: 'Kameshwaran B',
    role: 'Community Engagement',
    owns: 'Community engagement',
    shortBio: 'Engaging members and supporting community participation.',
    image: mediaUrl('team/kameshwaran.jpg'),
    iconName: 'Users',
    linkedin: 'https://www.linkedin.com/in/kameshwaran-b-779363338/',
  },
  {
    id: 'core-mithra',
    name: 'Mithra B',
    role: 'Media Team',
    owns: 'Photos, videos and media content',
    shortBio: 'Capturing chapter moments and creating media content for the community.',
    image: mediaUrl('team/mithra.jpg'),
    iconName: 'Megaphone',
    linkedin: 'https://www.linkedin.com/in/mithra-b-404111313/',
  },
  {
    id: 'core-santhosh-m',
    name: 'Santhosh M',
    role: 'Media Team',
    owns: 'Photos, videos and media content',
    shortBio: 'Capturing chapter moments and creating media content for the community.',
    image: mediaUrl('team/santhosh-m.jpg'),
    iconName: 'Megaphone',
  },
];
