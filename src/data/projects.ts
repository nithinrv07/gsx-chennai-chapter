import { ProjectItem } from '../types';

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'proj-pulse-transit',
    title: 'ChennaiPulse Transit API & Bus Predictor',
    category: 'AI / ML',
    shortDescription: 'Real-time telemetry analyzer and ML arrival prediction system for Chennai public transit corridors.',
    problem: 'Commuters across Chennai face unpredictable wait times due to traffic bottlenecks along major corridors like OMR and GST Road with fragmented transit data.',
    solution: 'Built an open telemetry aggregator using community GPS beacons and an XGBoost model predicting bus arrival windows with 88% accuracy across 42 key stops.',
    features: [
      'Live bus route tracking across 42 key routes in Chennai',
      'Machine learning arrival time window prediction model',
      'Low-bandwidth mobile web interface optimized for 3G/4G connectivity',
      'Open REST & GraphQL API for third-party student app developers'
    ],
    techStack: ['Python', 'TensorFlow', 'FastAPI', 'React', 'Docker'],
    creators: [
      { name: 'Community Builder Alpha', role: 'ML Architecture' },
      { name: 'Community Builder Beta', role: 'Frontend & API' }
    ],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=900&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com'
  },
  {
    id: 'proj-open-campus-mesh',
    title: 'CampusMesh: Student Research & Project Hub',
    category: 'Web',
    shortDescription: 'A collaborative web platform connecting undergraduate researchers, student builders, and faculty advisors.',
    problem: 'Inter-college collaboration in Chennai was historically siloed, causing duplicated efforts and missed project partnerships.',
    solution: 'Designed an open campus discovery platform where students can showcase prototypes, recruit teammates with specific technical skills, and discover faculty-backed grants.',
    features: [
      'Interactive skill-matching graph for hackathon teammates',
      'Markdown research paper previews and code repository linking',
      'Direct peer messaging with verified student campus badges',
      'Integration with project activity feeds'
    ],
    techStack: ['Next.js', 'React', 'Node.js', 'Tailwind CSS', 'PostgreSQL'],
    creators: [
      { name: 'Student Builder Gamma', role: 'Full Stack Engineer' },
      { name: 'Student Builder Delta', role: 'Product Design' }
    ],
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=900&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com'
  },
  {
    id: 'proj-tamil-speech-ai',
    title: 'VaniAI: Conversational Tamil Speech Engine',
    category: 'Open Source',
    shortDescription: 'Open-weights acoustic fine-tuning pipeline and speech-to-text benchmark tailored for spoken colloquial Chennai Tamil.',
    problem: 'Standard global voice models struggle with code-switching (Tanglish) and local colloquial idioms commonly used in Tamil Nadu.',
    solution: 'Curated a permissive 120-hour open dataset and fine-tuned Whisper checkpoints specifically evaluating colloquial conversational Tamil.',
    features: [
      'Speech-to-text with bilingual Tanglish phrase handling',
      'Edge-deployable ONNX export under 45MB',
      'Interactive benchmark playground and HuggingFace spaces demo',
      'Automated alignment scripts for community audio contributors'
    ],
    techStack: ['Python', 'PyTorch', 'HuggingFace', 'FastAPI'],
    creators: [
      { name: 'AI Community Pod', role: 'Dataset & Model Training' }
    ],
    image: 'https://images.unsplash.com/photo-1589254065878-42c9da997008?w=900&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com'
  },
  {
    id: 'proj-eco-sensor-lora',
    title: 'AuraGrid: Solar Micro-Climate Monitor',
    category: 'Hardware',
    shortDescription: 'Ultra low-power ESP32 + LoRaWAN environmental air and temperature sensing node for urban micro-climates.',
    problem: 'Urban heat islands and coastal humidity shifts in Chennai lack hyper-local neighborhood sensor resolution.',
    solution: 'Created open-hardware solar-powered telemetry nodes transmitting AQI, PM2.5, humidity, and heat indices via LoRaWAN gateways.',
    features: [
      'Sub-100mW average power consumption with 2W solar harvester',
      'LoRaWAN telemetry to TTN (The Things Network) cloud',
      'Open KiCad PCB layout and 3D printable weather-proof casing',
      'Grafana live dashboard with anomaly alerts'
    ],
    techStack: ['ESP32', 'C++', 'LoRaWAN', 'Node.js', 'Grafana'],
    creators: [
      { name: 'Hardware SIG Lead', role: 'Embedded Systems' }
    ],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&auto=format&fit=crop&q=80'
  },
  {
    id: 'proj-blood-relay-mobile',
    title: 'RelayLife: Emergency Blood Match Mobile App',
    category: 'Mobile',
    shortDescription: 'Decentralized geolocation matching app connecting verified voluntary blood donors with regional emergency wards in Chennai.',
    problem: 'Emergency blood requirements often circulate randomly on social media without verified recipient status or prompt response tracking.',
    solution: 'A privacy-first Flutter mobile application notifying verified donors in a 5km radius without publicly revealing personal contact details until mutual consent.',
    features: [
      'End-to-end encrypted notification dispatch',
      'Geo-fenced donor radius alerts for government hospitals',
      'Offline-first caching with automatic sync when connected',
      'Zero advertising, purely community-driven infrastructure'
    ],
    techStack: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    creators: [
      { name: 'Mobile Track Cohort', role: 'Mobile Architecture' }
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=900&auto=format&fit=crop&q=80',
    liveDemoUrl: 'https://example.com'
  }
];
