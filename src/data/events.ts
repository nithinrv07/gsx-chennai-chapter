import { EventItem } from '../types';

export const EVENTS_DATA: EventItem[] = [
  {
    id: 'evt-ai-builders-conclave',
    title: 'Generative AI & Agentic Systems Conclave',
    category: 'Workshops',
    date: 'April 18, 2026',
    time: '10:00 AM – 4:30 PM IST',
    location: 'IIT Madras Research Park, Chennai',
    venueType: 'In-Person',
    description: 'A deep-dive hands-on workshop exploring multi-agent architectures, LLM orchestration, structured outputs, and deploying production AI applications on modern infrastructure.',
    image: 'https://images.unsplash.com/photo-1591453089816-0fbb971b454c?w=900&auto=format&fit=crop&q=80',
    status: 'upcoming',
    registrationOpen: true,
    capacity: '120 Seats (Limited)',
    speakers: [
      {
        name: 'Arun Siddharth',
        role: 'Principal AI Engineer',
        company: 'Neural Systems Lab',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
      },
      {
        name: 'Deepa Narayanan',
        role: 'Staff Solutions Architect',
        company: 'Cloud Scale Global',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80'
      }
    ],
    agenda: [
      { time: '10:00 AM - 10:30 AM', topic: 'Keynote: State of Developer AI & Agent Systems in 2026' },
      { time: '10:30 AM - 1:00 PM', topic: 'Hands-on Lab: Multi-Agent Workflows & Function Calling' },
      { time: '1:00 PM - 2:00 PM', topic: 'Networking Lunch & Ecosystem Showcase' },
      { time: '2:00 PM - 4:00 PM', topic: 'Hack Jam: Building and Deploying an Autonomous AI Tool' },
      { time: '4:00 PM - 4:30 PM', topic: 'Project Demos & Q&A Panel' }
    ]
  },
  {
    id: 'evt-chennai-hack-2026',
    title: 'BuildFest Chennai: 24-Hour Chapter Hackathon',
    category: 'Hackathons',
    date: 'May 02 – May 03, 2026',
    time: '09:00 AM (Sat) – 11:00 AM (Sun)',
    location: 'Anna University Tech Hub / Guindy, Chennai',
    venueType: 'Hybrid',
    description: 'Join over 250+ student developers, designers, and innovators building solutions for smart cities, healthcare accessibility, open education, and fintech in Chennai.',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&auto=format&fit=crop&q=80',
    status: 'upcoming',
    registrationOpen: true,
    capacity: '250 Participants (Free Registration)',
    speakers: [
      {
        name: 'Karthik Ramanathan',
        role: 'Head of Developer Experience',
        company: 'TechCatalyst Asia',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&auto=format&fit=crop&q=80'
      }
    ],
    agenda: [
      { time: '09:00 AM', topic: 'Opening Ceremony & Track Disclosures' },
      { time: '11:00 AM', topic: 'Hacking Commences & Mentor Pod Check-ins' },
      { time: '08:00 PM', topic: 'Midnight Lightning Tech Talks & Snacks' },
      { time: '08:00 AM', topic: 'Code Freeze & Judging Review' },
      { time: '10:30 AM', topic: 'Prizes & Fellowship Announcements' }
    ]
  },
  {
    id: 'evt-systems-modern-web',
    title: 'Systems & Modern Web Architectures Meetup',
    category: 'Tech Sessions',
    date: 'May 16, 2026',
    time: '3:00 PM – 6:30 PM IST',
    location: 'Tidel Park Auditoria, OMR, Chennai',
    venueType: 'In-Person',
    description: 'Deep dive into next-gen edge runtimes, Rust-based tooling, micro-frontends, high-throughput backend services, and distributed cache strategies.',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=900&auto=format&fit=crop&q=80',
    status: 'upcoming',
    registrationOpen: true,
    capacity: '90 Seats',
    speakers: [
      {
        name: 'Venkatesh Prasad',
        role: 'Lead Systems Architect',
        company: 'Veloce Edge',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&auto=format&fit=crop&q=80'
      }
    ],
    agenda: [
      { time: '3:00 PM - 3:30 PM', topic: 'Arrival & Coffee Networking' },
      { time: '3:30 PM - 4:45 PM', topic: 'Deep Dive: Rust, WebAssembly & Cloud Run Optimization' },
      { time: '5:00 PM - 6:00 PM', topic: 'Panel: What Production Engineering Actually Demands' },
      { time: '6:00 PM - 6:30 PM', topic: 'Open Mic & Community Announcements' }
    ]
  },
  {
    id: 'evt-community-mixer-omr',
    title: 'GSX Chennai Community Mixer & Demo Night',
    category: 'Community',
    date: 'June 06, 2026',
    time: '5:00 PM – 8:00 PM IST',
    location: 'CoWorks OMR, Sholinganallur, Chennai',
    venueType: 'In-Person',
    description: 'An informal evening of lightning project demos, community fireside chats, open-mic pitches, pizza, and pairing up for upcoming summer open-source initiatives.',
    image: 'https://images.unsplash.com/photo-1528605248644-14dd04022da1?w=900&auto=format&fit=crop&q=80',
    status: 'upcoming',
    registrationOpen: true,
    capacity: '80 Seats',
    speakers: [
      {
        name: 'GSX Core Team',
        role: 'Community Leadership',
        company: 'GSX Chennai Chapter',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
      }
    ]
  },
  // Past Events for historical recap
  {
    id: 'evt-past-kickoff',
    title: 'GSX Chennai Chapter Inaugural Summit',
    category: 'Community',
    date: 'February 14, 2026',
    time: '2:00 PM – 6:00 PM IST',
    location: 'Siruseri IT Corridor, Chennai',
    venueType: 'In-Person',
    description: 'The foundation chapter kickoff uniting 180+ student leaders and tech professionals from 14 colleges across Chennai to outline the 2026 builder roadmap.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=900&auto=format&fit=crop&q=80',
    status: 'past',
    registrationOpen: false
  },
  {
    id: 'evt-past-flutter-bootcamp',
    title: 'Cross-Platform App Development Intensive',
    category: 'Workshops',
    date: 'January 24, 2026',
    time: '10:00 AM – 4:00 PM IST',
    location: 'Virtual / Discord Stage',
    venueType: 'Virtual',
    description: 'A weekend intensive workshop guiding participants from zero to a live production mobile app using Flutter, state management, and real-time backend sync.',
    image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=900&auto=format&fit=crop&q=80',
    status: 'past',
    registrationOpen: false
  },
  {
    id: 'evt-past-open-source-sprint',
    title: 'Chennai Open Source Contribution Sprint',
    category: 'Meetups',
    date: 'December 19, 2025',
    time: '11:00 AM – 5:00 PM IST',
    location: 'ThoughtWorks Hall, Ascendas IT Park, Chennai',
    venueType: 'In-Person',
    description: 'Over 65 merged Pull Requests to open source repositories in one afternoon, paired with senior maintainers who reviewed code live on projector.',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=900&auto=format&fit=crop&q=80',
    status: 'past',
    registrationOpen: false
  }
];
