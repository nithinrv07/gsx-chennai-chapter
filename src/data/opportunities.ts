import { OpportunityItem } from '../types';

export const OPPORTUNITIES_DATA: OpportunityItem[] = [
  {
    number: '01',
    title: 'Learn',
    description: 'Workshops, bootcamps, masterclasses, and hands-on learning experiences across cutting-edge engineering domains.',
    iconName: 'GraduationCap',
    tag: 'Knowledge'
  },
  {
    number: '02',
    title: 'Build',
    description: 'Work on real-world projects, chapter hackathons, and high-impact open-source initiatives alongside peer developers.',
    iconName: 'Code',
    tag: 'Hands-on'
  },
  {
    number: '03',
    title: 'Mentor',
    description: 'Share your knowledge, review student architectures, guide emerging technologists, and help others grow.',
    iconName: 'Award',
    tag: 'Impact'
  },
  {
    number: '04',
    title: 'Volunteer',
    description: 'Help organize flagship events, lead track sessions, curate design assets, and strengthen the developer ecosystem.',
    iconName: 'HeartHandshake',
    tag: 'Community'
  },
  {
    number: '05',
    title: 'Career',
    description: 'Discover internships, technical fellowships, startup co-founder pairings, and career guidance from industry veterans.',
    iconName: 'TrendingUp',
    tag: 'Growth'
  },
  {
    number: '06',
    title: 'Collaborate',
    description: 'Partner with GSX Chennai on student hackathons, institutional labs, company sponsorships, and research pilots.',
    iconName: 'Globe',
    tag: 'Ecosystem'
  }
];

export const COLLABORATION_TYPES = [
  {
    id: 'companies',
    title: 'Companies & Enterprises',
    description: 'Steady pipeline of trained, motivated student talent for internships and hiring. Host workshops, hackathons, or AI Build Days to engage developers hands-on, elevate employer branding across Chennai colleges, and partner on CSR skilling.',
    iconName: 'Cpu',
    bullets: [
      'Steady pipeline of trained student talent for internships and entry-level hiring',
      'Host workshops, hackathons, or an AI Build Day to showcase tech and engage students',
      'Employer branding and visibility across multiple Chennai colleges, not just one campus',
      'CSR & skilling partnerships: sponsor certifications, resume clinics, or AI summits'
    ]
  },
  {
    id: 'ngos',
    title: 'NGOs & Social Impact Orgs',
    description: 'A ready volunteer base for AI-awareness sessions, digital-literacy drives, and school outreach programmes. Co-run local-language AI and cybersecurity-awareness initiatives.',
    iconName: 'Building2',
    bullets: [
      'Ready volunteer base for AI-awareness sessions, digital-literacy drives, and school outreach',
      'Co-run local-language AI and cybersecurity-awareness projects under the Impact vertical',
      'Access students trained in AI basics who can mentor and teach in your community programmes',
      'Shared visibility through joint events and the chapter\'s social and community channels'
    ]
  },
  {
    id: 'colleges',
    title: 'Colleges & Institutions',
    description: 'Cross-college collaboration connecting students across institutions. Co-host campus workshops, hackathons, speaker sessions, and technical curriculum extensions.',
    iconName: 'School',
    bullets: [
      'Cross-college collaboration connecting students from institutions across Chennai',
      'Speaker and mentor opportunities at study circles, meetups, and workshops',
      'Venue and co-hosting partnerships for meetups, talks, and city-wide hackathons',
      'Bridging classroom academics with real-world industry practices'
    ]
  },
  {
    id: 'mentors',
    title: 'Mentors & Tech Communities',
    description: 'Share engineering wisdom, review student architectures, lead guest masterclasses, co-host cross-community events, and guide the next generation of builders.',
    iconName: 'Compass',
    bullets: [
      'Lead specialized track sessions in AI, systems, web, and open source',
      'Guide student project teams on architecture, scalability, and product polish',
      'Participate as judges and mentors in chapter hackathons',
      'Expand cross-community networking across Chennai\'s developer circles'
    ]
  }
];

export const MEMBER_BENEFITS = [
  {
    title: 'Certificates & Recognition',
    description: 'Official recognition from GirlScript Foundation & GSX Chennai for active participation, project releases, and track contributions.',
    icon: 'Award'
  },
  {
    title: 'Mentorship & Industry Experts',
    description: 'Direct guidance from experienced senior engineers, researchers, founders, and community architects.',
    icon: 'Users'
  },
  {
    title: 'Career & Internship Pathways',
    description: 'Priority access to internship drives, tech fellowships, resume audits, certification tracks, and hiring referrals.',
    icon: 'TrendingUp'
  },
  {
    title: 'Exposure & Visibility',
    description: 'Showcase your open-source repositories, agent demos, and research papers across global and city-wide forums.',
    icon: 'Sparkles'
  },
  {
    title: 'Experiences & Hackathons',
    description: 'Exciting weekend Build Days, code sprints, 24-hour hackathons, founder meetups, and vibrant community mixers.',
    icon: 'Flame'
  }
];

export const CONTRIBUTOR_JOURNEY = [
  { step: '01', role: 'Student', desc: 'Curious learner discovering the community ecosystem' },
  { step: '02', role: 'Learner', desc: 'Attending weekly study circles and technical workshops' },
  { step: '03', role: 'Contributor', desc: 'Building open-source tools, datasets, and civic prototypes' },
  { step: '04', role: 'Mentor', desc: 'Guiding junior peers and reviewing cohort project architectures' },
  { step: '05', role: 'Chapter Lead', desc: 'Driving operational verticals, partnerships, and chapter direction' },
  { step: '06', role: 'Fellow / Researcher', desc: 'Publishing deep-tech models, research papers, and frameworks' },
  { step: '07', role: 'Builder & Founder', desc: 'Launching production tech products, startups, and open ecosystems' },
  { step: '08', role: 'Ecosystem Partner', desc: 'Giving back to nurture future generations of creators' },
];
