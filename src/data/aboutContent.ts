import { GSX_INSTAGRAM_URL, GSX_LINKEDIN_URL, GSX_WHATSAPP_URL } from '../types';

export const ABOUT_INTRO = [
  "# Building a Community of Builders.",
  "GSX Chennai is a community where curiosity turns into knowledge, knowledge turns into ideas, and ideas turn into impact.",
  "**GirlScript Foundation | Chennai Chapter**",
  "**Learn. Build. Connect. Grow.**"
];

/** Sections render as: intro paragraphs, then a card grid built from "### " headings. */
export const ABOUT_SECTIONS: { id: string; title: string; blocks: string[] }[] = [
  {
    id: 'what-is-gsx',
    title: 'Who We Are',
    blocks: [
      "GSX Chennai is a student technology community under GirlScript Foundation, hosted at Chennai Institute of Technology (CIT). We bring together students from different colleges and backgrounds to learn, build projects and take on real-world challenges.",
      "Officially inaugurated on **20 August 2026** with around 50 students, we aim to be more than a college club: a connected community where learning goes beyond classrooms and collaboration goes beyond campuses.",
    ]
  },
  {
    id: 'our-pillars',
    title: 'Our Five Verticals',
    blocks: [
      "Five ways to participate, contribute and grow.",
      "### 01. Learning",
      "**Explore. Understand. Experiment.**",
      "Workshops, bootcamps and peer-learning circles for every stage, from first language to advanced skills.",
      "### 02. Building",
      "**Turn knowledge into something real.**",
      "Student-led projects in web, apps, AI/ML and open source, plus hackathons and build sessions.",
      "### 03. Community",
      "**Find your people. Build together.**",
      "Meetups, inter-college collaboration and conversations with mentors and fellow builders.",
      "### 04. Impact",
      "**Build solutions that matter.**",
      "Technology projects with NGOs and community organisations that address real needs.",
      "### 05. Career",
      "**Prepare for opportunities. Create your own.**",
      "Internship sharing, portfolio and GitHub guidance, mentorship and interview preparation.",
    ]
  },
  {
    id: 'our-mission',
    title: 'Mission & Vision',
    blocks: [
      "### Our Mission",
      "An inclusive, collaborative technology community where students learn new skills, build meaningful projects and grow together beyond classroom boundaries.",
      "### Our Vision",
      "A connected, city-wide student community that empowers the next generation of developers, researchers and innovators to solve meaningful problems.",
    ]
  },
  {
    id: 'our-values',
    title: 'Our Values',
    blocks: [
      "### Curiosity",
      "Ask questions, explore and learn without fear of mistakes.",
      "### Collaboration",
      "Share knowledge and work together across colleges and disciplines.",
      "### Innovation",
      "Move beyond ideas into working solutions.",
      "### Impact",
      "Use technical skills to meet real-world needs.",
      "### Inclusivity",
      "Room for everyone, whatever their college, experience or starting point.",
      "### Ownership",
      "Take initiative, stay accountable and contribute consistently.",
    ]
  },
  {
    id: 'our-journey',
    title: 'Our Journey',
    blocks: [
      "### Chapter established",
      "**Completed | August 2026**",
      "Founded under GirlScript Foundation with Chennai Institute of Technology as host.",
      "### Inaugural launch",
      "**Completed | 20 August 2026**",
      "Around 50 students attended; Hemalatha M (final-year B.E. CSE, CIT) spoke at the launch.",
      "### Core team and onboarding",
      "**Ongoing**",
      "A cross-functional core team formed, and recruitment of new members began.",
      "### Real-world collaborations",
      "**Ongoing**",
      "Working with Tamil Nadu Volunteers and Kalpavriksha Seva Trust on student-led solutions.",
      "### Expanding across colleges",
      "**Expanding**",
      "Outreach to other institutions, including Saveetha Engineering College.",
      "### City-wide ecosystem",
      "**Long-term vision**",
      "Connecting students, institutions, mentors and industry across Chennai.",
    ]
  },
];

export interface AboutLink {
  label: string;
  href: string;
  kind: 'linkedin' | 'instagram' | 'whatsapp' | 'email';
}

export const ABOUT_SOCIAL_LINKS: AboutLink[] = [
  { label: 'LinkedIn', href: GSX_LINKEDIN_URL, kind: 'linkedin' },
  { label: 'Instagram', href: GSX_INSTAGRAM_URL, kind: 'instagram' },
  { label: 'WhatsApp Community', href: GSX_WHATSAPP_URL, kind: 'whatsapp' },
];

export const ABOUT_CONTACT = {
  name: 'Dedeepya Yakkala',
  role: 'Chapter Lead, GSX Chennai',
  org: 'GirlScript Foundation · Chennai Institute of Technology',
  links: [
    { label: 'Email', href: 'mailto:dedeepya.yakkala@gmail.com', kind: 'email' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/dedeepyayakkala/', kind: 'linkedin' },
  ] as AboutLink[],
};
