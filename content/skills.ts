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
    items: [
      'Gemini API',
      'Prompt Engineering',
      'Multimodal AI',
    ],
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
    items: [
      'Git',
      'GitHub',
      'Postman',
      'VS Code',
      'Visual Studio',
      'Android Studio',
      'NetBeans',
    ],
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

/**
 * Sub-note for the Skills section footer.
 *
 * This is a WANT-TO-LEARN list, not a doing-it-now list, and the wording says
 * so. The two are different claims, and a reader deciding whether to hire
 * someone has to be able to tell them apart.
 *
 * Anything Rashid cannot do yet belongs here and NOT in the skills list above.
 * n8n and Swift/Xcode sit here for that reason. Figma is the one overlap and
 * it is a real one: he uses it already, and wants to go further with it.
 */
export const learning = {
  en: 'Want to learn next: AI agents and agentic workflows, automation with n8n, iOS apps with Swift and Xcode, and deeper design work in Figma',
  ar: 'ما أريد تعلّمه بعد ذلك: وكلاء الذكاء الاصطناعي وسير العمل الوكيلي، والأتمتة عبر n8n، وتطبيقات iOS بلغة Swift وبيئة Xcode، وتعميق العمل التصميمي في فيغما',
};
