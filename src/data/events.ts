import { EventItem } from '../types';

// "Build Your MVP" tech session series (posters 2/6 to 4/6).
// Dates use "Mon D, YYYY" so every browser parses them for the calendar.
export const EVENTS_DATA: EventItem[] = [
  {
    id: 'build-your-mvp-day-1',
    title: 'Build Your MVP · Day 1: Frontend Development',
    category: 'Tech Sessions',
    date: 'Oct 17, 2026',
    time: '1–2 hours',
    location: 'GSX Chennai',
    venueType: 'In-Person',
    description:
      'Station 01, the Styling Bay: the first stop on the Build Your MVP line. We covered choosing a tech stack that fits your idea, structuring a frontend so it can grow, and UI/UX ideas that make an app look good and feel easy to use.',
    image: '/events/build-your-mvp-day-1-frontend.webp',
    speakers: [
      { name: 'Minhu', role: 'Speaker', company: 'GSX Chennai', avatar: '/team/purple/MINHU.jpg' },
      { name: 'Shameel', role: 'Speaker', company: 'GSX Chennai', avatar: '/team/purple/SHAMEL.jpg' },
    ],
    agenda: [
      { time: '01', topic: 'Tech stack selection: choosing tools that fit your idea' },
      { time: '02', topic: 'Frontend architecture ideas: structuring your app so it can grow' },
      { time: '03', topic: 'UI/UX design ideas: making it look good and feel easy' },
    ],
    status: 'past',
    registrationOpen: false,
  },
  {
    id: 'build-your-mvp-day-2',
    title: 'Build Your MVP · Day 2: Backend & AI Development',
    category: 'Tech Sessions',
    date: 'Oct 19, 2026',
    time: '1–2 hours',
    location: 'GSX Chennai',
    venueType: 'In-Person',
    description:
      'Station 02, the Brain Lab: giving the MVP a brain. We covered what ML models are and when to use one, using API keys safely when plugging into AI services, RAG for letting AI answer from your own data, and how a model actually gets made.',
    image: '/events/build-your-mvp-day-2-backend-ai.webp',
    speakers: [
      { name: 'Sreekanth', role: 'Speaker', company: 'GSX Chennai' },
      { name: 'Kameshwaran', role: 'Speaker', company: 'GSX Chennai', avatar: '/team/purple/KAMESHWARN.jpg' },
    ],
    agenda: [
      { time: '01', topic: 'ML models: what they are and when to use one' },
      { time: '02', topic: 'API keys and their usage: plugging into AI services, safely' },
      { time: '03', topic: 'RAG: letting AI answer from your own data' },
      { time: '04', topic: 'Model creation: how a model actually gets made' },
    ],
    status: 'past',
    registrationOpen: false,
  },
  {
    id: 'build-your-mvp-day-3',
    title: 'Build Your MVP · Day 3: Integration & Doubt-Clearing',
    category: 'Tech Sessions',
    date: 'Oct 21, 2026',
    time: '1–2 hours',
    location: 'GSX Chennai',
    venueType: 'In-Person',
    description:
      'Station 03, Assembly & QA: front meets back. We connected the frontend and backend, wrote a README as the project’s user manual, and cleared every “wait, how do I…?” about building an MVP.',
    image: '/events/build-your-mvp-day-3-integration.webp',
    speakers: [
      { name: 'Adithyan', role: 'Speaker', company: 'GSX Chennai' },
      { name: 'Hariharan', role: 'Speaker', company: 'GSX Chennai', avatar: '/team/purple/Hari%20Haran.jpg' },
      { name: 'Sathappan', role: 'Speaker', company: 'GSX Chennai' },
    ],
    agenda: [
      { time: '01', topic: 'Connecting frontend and backend: getting the two halves talking' },
      { time: '02', topic: 'Creating a README file: your project’s user manual' },
      { time: '03', topic: 'Clearing your MVP doubts' },
    ],
    status: 'past',
    registrationOpen: false,
  },
];
