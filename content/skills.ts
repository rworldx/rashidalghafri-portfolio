import type { SkillGroup } from '@/types/skill';

/** Grouped skills (from the CV). Add an item or group here — the UI maps over it. */
export const skills: SkillGroup[] = [
  {
    id: 'languages',
    label: { en: 'Languages', ar: 'لغات البرمجة' },
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'PHP', 'HTML', 'CSS'],
  },
  {
    id: 'frontend',
    label: { en: 'Frontend', ar: 'الواجهة الأمامية' },
    items: ['React.js', 'Tailwind CSS', 'Vite', 'Framer Motion'],
  },
  {
    id: 'backend',
    label: { en: 'Backend & Data', ar: 'الخلفية والبيانات' },
    items: ['Node.js', 'Express.js', 'REST APIs', 'Socket.IO', 'MongoDB'],
  },
  {
    id: 'ai',
    label: { en: 'AI & Prompt Engineering', ar: 'الذكاء الاصطناعي وهندسة الأوامر' },
    items: ['Gemini API', 'Prompt Engineering', 'Multimodal AI', 'Agentic workflows (n8n)'],
  },
  {
    id: 'security',
    label: { en: 'Security', ar: 'الأمن' },
    items: ['JWT', 'Refresh-token Rotation', 'RBAC'],
  },
  {
    id: 'tools',
    label: { en: 'Tools & IDEs', ar: 'الأدوات وبيئات التطوير' },
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Cursor', 'Claude Code', 'Figma'],
  },
];
