import type { Project } from '@/types/project';

/**
 * Project catalogue — single source of truth. To add a project, append an entry
 * here; the grid, case-study route, and graph all derive from this array.
 * StudyNest is the featured reference implementation (PRD §9).
 */
export const projects: Project[] = [
  {
    slug: 'studynest',
    featured: true,
    title: 'StudyNest',
    year: 2026,
    role: 'Founder · Full-Stack Engineer',
    summary: {
      en: 'An AI-powered collaborative study platform that tackles student isolation in remote learning through partner matching and a real-time workspace.',
      ar: 'منصة دراسة تعاونية مدعومة بالذكاء الاصطناعي تعالج عزلة الطلاب في التعلّم عن بُعد عبر مطابقة شركاء الدراسة ومساحة عمل لحظية.',
    },
    problem: {
      en: 'Remote learning leaves students isolated: no easy way to find compatible study partners, no shared space to actually work together, and no contextual help when they get stuck.',
      ar: 'يترك التعلّم عن بُعد الطلاب معزولين: لا توجد طريقة سهلة لإيجاد شركاء دراسة متوافقين، ولا مساحة مشتركة للعمل معًا فعليًا، ولا مساعدة سياقية عند التعثّر.',
    },
    solution: {
      en: 'An end-to-end platform: a Gemini-powered matching engine ranks compatible partners in under a second, a low-latency real-time layer powers chat, voice and video study rooms, and a multimodal AI assistant gives contextual help and generates flashcards.',
      ar: 'منصة متكاملة: محرّك مطابقة مدعوم بـ Gemini يرتّب الشركاء المتوافقين في أقل من ثانية، وطبقة لحظية منخفضة الكمون تشغّل المحادثة والغرف الصوتية والمرئية، ومساعد ذكاء اصطناعي متعدد الوسائط يقدّم مساعدة سياقية ويولّد البطاقات التعليمية.',
    },
    liveUrl: 'https://studynest.dev',
    repoUrl: 'https://github.com/rworldx/StudyNest-Source',
    stack: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'TanStack Query',
      'Node.js',
      'Express',
      'MongoDB Atlas',
      'Socket.IO',
      'WebRTC',
      'Gemini API',
      'Cloudinary',
      'Upstash Redis',
    ],
    stats: [
      { label: { en: 'AI match latency', ar: 'زمن المطابقة بالذكاء الاصطناعي' }, value: '< 1s' },
      { label: { en: 'Concurrent sessions', ar: 'جلسات متزامنة' }, value: '50+' },
      { label: { en: 'Registered users', ar: 'مستخدمون مسجّلون' }, value: '100+' },
      { label: { en: 'Auth incidents', ar: 'حوادث المصادقة' }, value: '0' },
      { label: { en: 'Passing tests', ar: 'اختبارات ناجحة' }, value: '125' },
      { label: { en: 'Media load time', ar: 'زمن تحميل الوسائط' }, value: '−35%' },
    ],
    highlights: [
      {
        en: 'AI-driven partner-matching engine (Gemini API) analysing study habits, subjects and availability to return ranked recommendations in under 1 second.',
        ar: 'محرّك مطابقة مدعوم بالذكاء الاصطناعي (Gemini API) يحلّل عادات الدراسة والمواد والتوافر ليعيد توصيات مرتّبة في أقل من ثانية.',
      },
      {
        en: 'Low-latency real-time layer (Socket.IO + WebRTC) powering live chat, voice rooms and video study sessions — stable across 50+ concurrent sessions.',
        ar: 'طبقة لحظية منخفضة الكمون (Socket.IO + WebRTC) تشغّل المحادثة المباشرة والغرف الصوتية وجلسات الدراسة المرئية — مستقرة عبر أكثر من ٥٠ جلسة متزامنة.',
      },
      {
        en: 'Multimodal AI study assistant (text, voice, image/document) with contextual help and smart flashcard generation, cutting query-to-answer time to under 2 seconds.',
        ar: 'مساعد دراسة ذكي متعدد الوسائط (نص، صوت، صورة/مستند) مع مساعدة سياقية وتوليد ذكي للبطاقات التعليمية، يقلّص زمن الإجابة إلى أقل من ثانيتين.',
      },
      {
        en: 'Backend secured with JWT auth, refresh-token rotation and role-based access control — serving 100+ users with zero reported auth incidents.',
        ar: 'خلفية مؤمّنة بمصادقة JWT وتدوير رموز التحديث والتحكّم بالوصول حسب الدور — تخدم أكثر من ١٠٠ مستخدم دون أي حوادث مصادقة مُبلّغ عنها.',
      },
      {
        en: 'Responsive, accessible UI (streak tracking, dashboards, scheduling) with automated Cloudinary media pipelines that cut average media load time by ~35%.',
        ar: 'واجهة متجاوبة وسهلة الوصول (تتبّع التسلسل، لوحات المعلومات، الجدولة) مع خطوط معالجة وسائط آلية عبر Cloudinary خفّضت متوسط زمن تحميل الوسائط بنحو ٣٥٪.',
      },
    ],
    cover: '/images/projects/studynest-cover.svg',
    gallery: [],
    links: [
      { label: 'Live demo', href: 'https://studynest.dev', external: true },
      { label: 'Source', href: 'https://github.com/rworldx/StudyNest-Source', external: true },
    ],
  },
];

/** Convenience selectors. */
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
