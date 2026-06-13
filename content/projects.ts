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
      { label: 'Instagram · @studynest.om', href: 'https://instagram.com/studynest.om', external: true },
    ],
  },
  {
    slug: 'energrid',
    featured: false,
    title: 'EnerGrid',
    year: 2025,
    role: 'Concept & Pitch · 2nd Place, Riyada Camp',
    summary: {
      en: 'A smart energy-monitoring concept that tracks real-time power consumption per device — so you can see what is draining your bill, cut waste, and pay only for what matters. 2nd place at Riyada’s Promising Student Projects Camp.',
      ar: 'فكرة ذكية لمراقبة الطاقة تتتبّع استهلاك كل جهاز لحظيًا — لترى ما الذي يستنزف فاتورتك، فتقلّل الهدر وتدفع مقابل ما يهم فقط. حصلت على المركز الثاني في مخيم مشاريع الطلاب الواعدة من هيئة ريادة.',
    },
    problem: {
      en: 'Every great idea starts with a problem I lived. As a student renting in Buraimi, my building switched to prepaid electricity — I had to pay an estimated amount up front each month, and the balance kept running out early, forcing repeated top-ups. One evening, lying in bed watching my favourite series, the power simply cut out — and it kept happening. That is when I asked: why is there no product that continuously tracks each device’s power consumption, so you can see exactly what is draining your money, cut waste, and only run what truly matters?',
      ar: 'فكرتنا بدأت من مشكلة عشتُها بنفسي. أنا طالب أسكن في سكنٍ مستأجر في البريمي، وقبل أشهر حوّل صاحب العمارة نظام الكهرباء إلى الدفع المسبق — فصرت أدفع مبلغًا تقديريًا قبل كل شهر، وكان الرصيد ينفد بسرعة قبل نهاية الشهر فأضطر لإعادة الشحن أكثر من مرة. وفي إحدى الليالي بينما كنت ممددًا على السرير أتابع مسلسلي، انقطعت الكهرباء فجأة — وتكرّر هذا كثيرًا. حينها سألت نفسي: لماذا لا نصنع منتجًا يقيس استهلاك كل جهاز باستمرار، حتى نرى أيّ جهاز يستهلك أكثر، فنوفّر الطاقة ونقلّل الفواتير ونطفئ ما لا نحتاجه؟',
    },
    solution: {
      en: 'EnerGrid — a smart energy-monitoring system that measures real-time consumption per device and surfaces the biggest drains, so households on prepaid meters can cut waste, lower their bills, and switch off what does not matter. The concept placed 2nd of 20+ teams at Riyada’s Promising Student Projects Camp, held at Al Buraimi University College.',
      ar: 'EnerGrid — نظام ذكي لمراقبة الطاقة يقيس الاستهلاك اللحظي لكل جهاز ويكشف أكثرها استنزافًا، ليتمكّن سكان العدّادات مسبقة الدفع من تقليل الهدر وخفض الفواتير وإطفاء ما لا يهم. حقّقت الفكرة المركز الثاني بين أكثر من ٢٠ فريقًا في مخيم مشاريع الطلاب الواعدة من هيئة ريادة، الذي أُقيم في كلية البريمي الجامعية.',
    },
    stack: ['IoT', 'Smart Energy', 'Real-time Monitoring', 'Hardware + App'],
    stats: [
      { label: { en: 'Placed', ar: 'الترتيب' }, value: '2nd' },
      { label: { en: 'Teams', ar: 'الفرق' }, value: '20+' },
    ],
    highlights: [
      {
        en: 'Born from a real pain point — prepaid electricity that ran out unpredictably, mid-month and mid-series.',
        ar: 'وُلدت من ألمٍ حقيقي — كهرباء مسبقة الدفع تنفد بشكل غير متوقع، في منتصف الشهر ومنتصف المسلسل.',
      },
      {
        en: 'The concept: real-time, per-device power tracking that pinpoints the biggest energy drains.',
        ar: 'الفكرة: تتبّع لحظي لاستهلاك كل جهاز يحدّد أكثر الأجهزة استنزافًا للطاقة.',
      },
      {
        en: 'Pitched to a panel of industry judges at the Promising Student Projects Camp (Riyada × Oman Promising Startups Programme), held at Al Buraimi University College.',
        ar: 'عُرضت أمام لجنة من خبراء الصناعة في مخيم مشاريع الطلاب الواعدة (ريادة × برنامج الشركات الناشئة الواعدة)، الذي أُقيم في كلية البريمي الجامعية.',
      },
      {
        en: 'Placed 2nd of 20+ teams — earning a cash prize and recognition from Riyada’s Chairperson.',
        ar: 'حصلت على المركز الثاني بين أكثر من ٢٠ فريقًا — ونالت جائزة نقدية وتكريمًا من رئيس هيئة ريادة.',
      },
    ],
    cover: '/images/projects/energrid-cover.svg',
    gallery: [],
  },
];

/** Convenience selectors. */
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
