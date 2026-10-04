export type ProjectVisualKind = 'invoice' | 'attendance' | 'depth' | 'yatra';
export type ProjectStatus = 'complete' | 'in-progress' | 'upcoming';

export interface Project {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  /** Vertical Japanese label shown beside the project */
  jp: string;
  jpMeaning: string;
  description: string;
  highlights: string[];
  tech: string[];
  github: string;
  demo: string;
  visual: ProjectVisualKind;
  image?: string;
  status: ProjectStatus;
}

/**
 * Battles fought and won by Hari Charan (Kakarla).
 * Project 04 updated to YATRAAI (AI Travel Companion).
 */
export const PROJECTS: Project[] = [
  {
    id: 'invoicehub',
    number: '01',
    title: 'INVOICEHUB',
    subtitle: 'Smart Billing System',
    jp: '請求',
    jpMeaning: 'seikyū — billing',
    description: 'A smart billing and invoice management platform designed to simplify billing workflows.',
    highlights: ['Invoice creation and management', 'QR-based payments', 'Simplified billing workflow'],
    tech: ['Django', 'MySQL', 'QR Payments'],
    github: 'https://github.com/Haricharan-25',
    demo: '',
    visual: 'invoice',
    status: 'complete',
  },
  {
    id: 'attendance-tracker',
    number: '02',
    title: 'ATTENDANCE TRACKER',
    subtitle: 'Automated Attendance Platform',
    jp: '出席',
    jpMeaning: 'shusseki — attendance',
    description:
      'An automated attendance platform that retrieves attendance data and provides useful student-focused features.',
    highlights: ['Automated data retrieval with Playwright', 'Telegram integration', 'Scheduled runs via GitHub Actions'],
    tech: ['Django', 'Playwright', 'MongoDB', 'Telegram', 'GitHub Actions'],
    github: 'https://github.com/Haricharan-25',
    demo: '',
    visual: 'attendance',
    status: 'complete',
  },
  {
    id: 'depthor',
    number: '03',
    title: 'DEPTHOR',
    subtitle: 'Interactive Learning Platform',
    jp: '深層',
    jpMeaning: 'shinsō — depth',
    description:
      'An interactive learning platform focused on making difficult concepts easier to understand through visualization and intelligent learning tools.',
    highlights: ['Concept visualization', 'AI-assisted learning tools', '3D interactive explanations'],
    tech: ['React', 'AI', 'Three.js', 'Interactive Visualization'],
    github: 'https://github.com/Haricharan-25',
    demo: '',
    visual: 'depth',
    status: 'in-progress',
  },
  {
    id: 'yatra-ai',
    number: '04',
    title: 'YATRA-AI',
    subtitle: 'AI Travel Companion',
    jp: '旅',
    jpMeaning: 'tabi — journey',
    description:
      'An intelligent travel experience designed to provide contextual information and useful insights about the places a traveler is currently visiting.',
    highlights: [
      'Contextual location insights & real-time travel intelligence',
      'AI-assisted waypoint exploration and regional discovery',
      'Interactive geospatial travel interface',
    ],
    tech: ['Python', 'AI', 'React', 'Geospatial API'],
    github: 'https://github.com/Haricharan-25',
    demo: '',
    visual: 'yatra',
    image: '/images/yatraai.jpg',
    status: 'in-progress',
  },
];
