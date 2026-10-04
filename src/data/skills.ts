export type WeaponId = 'katana' | 'yumi' | 'armor' | 'shuriken' | 'shogun';

export interface SkillItemData {
  name: string;
  iconId: string;
}

export interface SkillCategory {
  id: WeaponId;
  weapon: string;
  kanji: string;
  reading: string;
  domain: string;
  skills: SkillItemData[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'katana',
    weapon: 'KATANA',
    kanji: '刀',
    reading: 'katana',
    domain: 'Backend',
    skills: [
      { name: 'Java', iconId: 'java' },
      { name: 'Spring Boot', iconId: 'springboot' },
      { name: 'Python', iconId: 'python' },
      { name: 'Django', iconId: 'django' },
    ],
  },
  {
    id: 'yumi',
    weapon: 'YUMI',
    kanji: '弓',
    reading: 'yumi',
    domain: 'Frontend',
    skills: [
      { name: 'HTML', iconId: 'html' },
      { name: 'CSS', iconId: 'css' },
      { name: 'JavaScript', iconId: 'javascript' },
      { name: 'React', iconId: 'react' },
      { name: 'Tailwind CSS', iconId: 'tailwind' },
    ],
  },
  {
    id: 'armor',
    weapon: 'ARMOR',
    kanji: '鎧',
    reading: 'yoroi',
    domain: 'Databases',
    skills: [
      { name: 'MySQL', iconId: 'mysql' },
      { name: 'MongoDB', iconId: 'mongodb' },
      { name: 'Firebase', iconId: 'firebase' },
    ],
  },
  {
    id: 'shuriken',
    weapon: 'SHURIKEN',
    kanji: '手裏剣',
    reading: 'shuriken',
    domain: 'Tools',
    skills: [
      { name: 'Git', iconId: 'git' },
      { name: 'GitHub', iconId: 'github' },
      { name: 'Docker', iconId: 'docker' },
      { name: 'Maven', iconId: 'maven' },
    ],
  },
  {
    id: 'shogun',
    weapon: 'SHOGUN',
    kanji: '将軍',
    reading: 'shōgun',
    domain: 'AI / ML',
    skills: [
      { name: 'Python', iconId: 'python' },
      { name: 'Machine Learning', iconId: 'ml' },
      { name: 'AI', iconId: 'ai' },
      { name: 'LLMs', iconId: 'llm' },
      { name: 'RAG', iconId: 'rag' },
    ],
  },
];
