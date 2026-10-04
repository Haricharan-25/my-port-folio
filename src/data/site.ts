/**
 * Site-wide configuration and exact social/profile information for Hari Charan (Kakarla).
 */
export const SITE = {
  name: 'Kakarla Hari Charan',
  brandName: 'KAKARLA',
  nameJp: 'カカルラ・ハリ・チャラン',
  github: 'https://github.com/Haricharan-25',
  linkedin: 'https://www.linkedin.com/in/hari-charan-81340532b/',
  email: 'charanhari072@gmail.com',
  resume: '/resume.pdf',
} as const;

export const isPlaceholder = (value: string | null | undefined) =>
  !value || value.startsWith('YOUR_');

export interface NavLink {
  id: string;
  label: string;
  kanji: string;
}

export const NAV_LINKS: NavLink[] = [
  { id: 'home', label: 'HOME', kanji: '始' },
  { id: 'about', label: 'ABOUT', kanji: '我' },
  { id: 'skills', label: 'SKILLS', kanji: '技' },
  { id: 'projects', label: 'PROJECTS', kanji: '戦' },
  { id: 'forge', label: 'FORGE', kanji: '鍛' },
  { id: 'victories', label: 'VICTORIES', kanji: '勝' },
  { id: 'journey', label: 'JOURNEY', kanji: '道' },
  { id: 'contact', label: 'CONTACT', kanji: '連絡' },
];

export interface Milestone {
  year: string;
  title: string;
  kanji: string;
  description: string;
}

export const JOURNEY: Milestone[] = [
  { year: '2024', title: 'STARTED CODING', kanji: '始', description: 'Learning the foundations of programming.' },
  { year: '2025', title: 'BUILDING', kanji: '築', description: 'Started developing real-world applications.' },
  {
    year: '2026',
    title: 'ENGINEERING',
    kanji: '工',
    description: 'Exploring backend development, AI, machine learning and intelligent systems.',
  },
  { year: 'NOW', title: 'THE JOURNEY CONTINUES', kanji: '続', description: 'Every day on the path is another repetition.' },
];

export interface VictoryMetric {
  id: string;
  category: string;
  kanji: string;
  count: number;
  formattedNumber: string;
}

/**
 * Required totals for Victories / SHŌ:
 * Hackathons = 4, Projects = 6, Competitions = 2, Certifications = 4.
 * Strictly adhering to prompt: no fake names of competitions/hackathons invented.
 */
export const VICTORIES: VictoryMetric[] = [
  { id: 'hackathons', category: 'HACKATHONS', kanji: '四', count: 4, formattedNumber: '04' },
  { id: 'projects', category: 'PROJECTS', kanji: '六', count: 6, formattedNumber: '06' },
  { id: 'competitions', category: 'COMPETITIONS', kanji: '二', count: 2, formattedNumber: '02' },
  { id: 'certifications', category: 'CERTIFICATIONS', kanji: '四', count: 4, formattedNumber: '04' },
];

/**
 * 現在 (GENZAI) - CURRENTLY pursuits
 */
export const GENZAI_FOCUS = [
  { kanji: '智', text: 'Building intelligent applications' },
  { kanji: '研', text: 'Learning AI / ML' },
  { kanji: '基', text: 'Exploring backend engineering' },
  { kanji: '磨', text: 'Improving DSA and problem solving' },
] as const;
