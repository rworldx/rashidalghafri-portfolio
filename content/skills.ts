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
    id: 'ai-tools',
    label: { en: 'AI Tools', ar: 'أدوات الذكاء الاصطناعي' },
    items: [
      'Claude',
      'ChatGPT',
      'Gemini',
      'Claude Code',
      'Cursor',
      'Codex',
      'Antigravity',
      'Higgsfield',
      'Nano Banana',
    ],
  },
  {
    id: 'security',
    label: { en: 'Security', ar: 'الأمن' },
    items: ['JWT', 'Refresh-token Rotation', 'RBAC'],
  },
  {
    id: 'tools',
    label: { en: 'IDEs & Tools', ar: 'بيئات التطوير والأدوات' },
    items: ['Git', 'GitHub', 'Postman', 'VS Code', 'Visual Studio', 'Android Studio', 'NetBeans'],
  },
  {
    id: 'design',
    label: { en: 'Design & Creative', ar: 'التصميم والإبداع' },
    items: ['Figma', 'Adobe Photoshop', 'Adobe Animate', 'Canva'],
  },
  {
    id: 'productivity',
    label: { en: 'Productivity', ar: 'الإنتاجية' },
    items: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
  },
  {
    id: 'strengths',
    label: { en: 'Strengths', ar: 'نقاط القوة' },
    items: [
      'Problem Solving',
      'Critical Thinking',
      'Teamwork',
      'Presentation',
      'Technical Leadership',
      'Event Management',
    ],
  },
];

/** Sub-note for the Skills section footer. */
export const exploring = {
  en: 'Currently exploring: AI agents, agentic workflows & automation (n8n) · deepening design in Figma',
  ar: 'أستكشف حاليًا: وكلاء الذكاء الاصطناعي وسير العمل الوكيلي والأتمتة (n8n) · وتعميق التصميم في فيغما',
};
