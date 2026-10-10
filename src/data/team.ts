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
  shortBio: `Dedeepya Yakkala is the Chapter Lead of GSX Chennai Chapter under GirlScript Foundation. She leads the chapter’s overall vision, community development, inter-college expansion, and ecosystem partnerships, working towards building a student community that extends beyond individual campuses.

Passionate about technology, community building, and creating meaningful opportunities for students, she focuses on bringing people together through learning, real-world projects, collaborations, and career-oriented initiatives. Her vision is to build a space where students can explore their interests, develop practical skills, work on real-world challenges, and grow together as contributors and innovators.

Through GSX Chennai, she aims to connect students, institutions, organisations, and industry professionals to create opportunities that go beyond traditional classroom learning.

Her guiding philosophy: Learn. Build. Connect. Grow. — together, beyond campuses.`,
  image: '/team/DEDEEPYA%20YAKKALA.jpeg',
  iconName: 'Compass',
  linkedin: 'https://www.linkedin.com/in/dedeepyayakkala',
  isLead: true,
};

export const CORE_TEAM: TeamMember[] = [
  {
    "id": "core-01",
    "name": "Minhu Parthasarathy",
    "role": "Co-Lead",
    "owns": "Chapter coordination and support",
    "shortBio": "Supporting the Chapter Lead and coordinating the core team.",
    "image": "/team/MINHU.jpeg",
    "iconName": "Compass",
    "linkedin": "https://www.linkedin.com/in/minhu-parthasarathy07/"
  },
  {
    "id": "core-02",
    "name": "Abinaya R",
    "role": "Operations Lead",
    "owns": "Chapter operations and event coordination",
    "shortBio": "Coordinating chapter operations and supporting event delivery.",
    "image": "/team/ABINAYA.jpeg",
    "iconName": "Cpu",
    "linkedin": "https://www.linkedin.com/in/abinaya0333"
  },
  {
    "id": "core-03",
    "name": "Jenita",
    "role": "Operations Lead",
    "owns": "Chapter operations and event coordination",
    "shortBio": "Coordinating chapter operations and supporting event delivery.",
    "image": "/team/jenita%20agnes.jpeg",
    "iconName": "Cpu",
    "linkedin": "https://www.linkedin.com/in/jenita-agnes-dl/"
  },
  {
    "id": "core-04",
    "name": "Semmozhi A",
    "role": "Learning",
    "owns": "Community learning initiatives",
    "shortBio": "Supporting learning sessions and knowledge sharing within the community.",
    "image": "/team/semmozhi.jpeg",
    "iconName": "BookOpen",
    "linkedin": "https://www.linkedin.com/in/semmozhi/"
  },
  {
    "id": "core-05",
    "name": "Buvanagirish S K",
    "role": "Building",
    "owns": "Community project building",
    "shortBio": "Supporting collaborative project building within the community.",
    "image": "/team/buvaneshwer.jpeg",
    "iconName": "Hammer",
    "linkedin": "https://www.linkedin.com/in/buvanagirish-sk-3b7ba8329/"
  },
  {
    "id": "core-06",
    "name": "Sreekanth G",
    "role": "Technical Team",
    "owns": "Technical support and development",
    "shortBio": "Supporting the chapter’s technical initiatives and development.",
    "image": "/team/Sreekanth%20G.jpeg",
    "iconName": "Cpu"
  },
  {
    "id": "core-07",
    "name": "Hariharan",
    "role": "Technical Team",
    "owns": "Technical support and development",
    "shortBio": "Supporting the chapter’s technical initiatives and development.",
    "image": "/team/Hari%20Haran.jpeg",
    "iconName": "Cpu"
  },
  {
    "id": "core-08",
    "name": "Balaji",
    "role": "Technical Team",
    "owns": "Technical support and development",
    "shortBio": "Supporting the chapter’s technical initiatives and development.",
    "image": "/team/Balaji%20S.jpeg",
    "iconName": "Cpu"
  },
  {
    "id": "core-nithin-r",
    "name": "Nithin R",
    "role": "Technical Team",
    "owns": "Technical support and development",
    "shortBio": "Supporting the chapter’s technical initiatives and development.",
    "image": "/team/nithin-r.jpeg",
    "iconName": "Cpu"
  },
  {
    "id": "core-09",
    "name": "Kameshwaran B",
    "role": "Community",
    "owns": "Community engagement",
    "shortBio": "Connecting students across colleges and supporting community participation.",
    "image": "/team/KAMESHWARN.jpeg",
    "iconName": "Users",
    "linkedin": "https://www.linkedin.com/in/kameshwaran-b-779363338/"
  },
  {
    "id": "core-10",
    "name": "Mohamed Shameel M",
    "role": "Impact",
    "owns": "Community impact initiatives",
    "shortBio": "Supporting initiatives that bring technology and community impact together.",
    "image": "/team/SHAMEL.jpeg",
    "iconName": "HeartHandshake",
    "linkedin": "https://www.linkedin.com/in/mohamedshameel2006/"
  },
  {
    "id": "core-11",
    "name": "Kaviya Sree N",
    "role": "Career",
    "owns": "Career development initiatives",
    "shortBio": "Supporting career learning and development within the community.",
    "image": "/team/KAVIYA.jpeg",
    "iconName": "TrendingUp",
    "linkedin": "https://www.linkedin.com/in/kaviya-sree-n-a6293b380/"
  },
  {
    "id": "core-12",
    "name": "Mithra B",
    "role": "Communications",
    "owns": "Chapter communications",
    "shortBio": "Supporting chapter announcements and community communications.",
    "image": "/team/MITHRA.jpeg",
    "iconName": "Megaphone",
    "linkedin": "https://www.linkedin.com/in/mithra-b-404111313/"
  }
];

export interface CommunityRoleCharter {
  role: string;
  owns: string;
  details: string;
  iconName: string;
}

export const COMMUNITY_CHARTER: CommunityRoleCharter[] = [
  {
    "role": "Chapter Lead",
    "owns": "Chapter vision and leadership",
    "details": "Leading the chapter’s vision, community development and partnerships.",
    "iconName": "Compass"
  },
  {
    "role": "Co-Lead",
    "owns": "Chapter coordination and support",
    "details": "Supporting the Chapter Lead and coordinating the core team.",
    "iconName": "Compass"
  },
  {
    "role": "Operations Lead",
    "owns": "Chapter operations and event coordination",
    "details": "Coordinating chapter operations and supporting event delivery.",
    "iconName": "Cpu"
  },
  {
    "role": "Learning",
    "owns": "Community learning initiatives",
    "details": "Supporting learning sessions and knowledge sharing within the community.",
    "iconName": "BookOpen"
  },
  {
    "role": "Building",
    "owns": "Community project building",
    "details": "Supporting collaborative project building within the community.",
    "iconName": "Hammer"
  },
  {
    "role": "Technical Team",
    "owns": "Technical support and development",
    "details": "Supporting the chapter’s technical initiatives and development.",
    "iconName": "Cpu"
  },
  {
    "role": "Community",
    "owns": "Community engagement",
    "details": "Connecting students across colleges and supporting community participation.",
    "iconName": "Users"
  },
  {
    "role": "Impact",
    "owns": "Community impact initiatives",
    "details": "Supporting initiatives that bring technology and community impact together.",
    "iconName": "HeartHandshake"
  },
  {
    "role": "Career",
    "owns": "Career development initiatives",
    "details": "Supporting career learning and development within the community.",
    "iconName": "TrendingUp"
  },
  {
    "role": "Communications",
    "owns": "Chapter communications",
    "details": "Supporting chapter announcements and community communications.",
    "iconName": "Megaphone"
  }
];
