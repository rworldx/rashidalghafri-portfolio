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
      en: 'An end-to-end platform: an algorithmic, multi-factor matching engine ranks compatible partners (subjects, study style, availability, academic level) in under a second; a low-latency real-time layer powers chat, voice and video study rooms with screen sharing; and a Google Gemini-powered study assistant analyses documents and images, answers by text or voice, and generates study plans and flashcards.',
      ar: 'منصة متكاملة: محرّك مطابقة خوارزمي متعدّد العوامل يرتّب الشركاء المتوافقين (المواد، أسلوب الدراسة، التوافر، المستوى الأكاديمي) في أقل من ثانية؛ وطبقة لحظية منخفضة الكمون تشغّل المحادثة وغرف الدراسة الصوتية والمرئية مع مشاركة الشاشة؛ ومساعد دراسة مدعوم بـ Google Gemini يحلّل المستندات والصور، ويجيب نصًّا أو صوتًا، ويولّد خطط المراجعة والبطاقات التعليمية.',
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
      { label: { en: 'API endpoints', ar: 'نقاط نهاية API' }, value: '100+' },
      { label: { en: 'Realtime events', ar: 'أحداث لحظية' }, value: '100+' },
      { label: { en: 'Data models', ar: 'نماذج بيانات' }, value: '20' },
      { label: { en: 'Passing tests', ar: 'اختبارات ناجحة' }, value: '125' },
      { label: { en: 'Match time', ar: 'زمن المطابقة' }, value: '< 1s' },
      { label: { en: 'Pilot satisfaction', ar: 'رضا التجربة' }, value: '86%' },
      { label: { en: 'AI improved study', ar: 'حسّن الدراسة' }, value: '95%' },
    ],
    highlights: [
      {
        en: 'Algorithmic, multi-factor matching engine — pairs partners on subjects, study style, availability and academic level, returning ranked recommendations in under a second.',
        ar: 'محرّك مطابقة خوارزمي متعدّد العوامل — يوائم الشركاء حسب المواد وأسلوب الدراسة والتوافر والمستوى الأكاديمي، ويعيد توصيات مرتّبة في أقل من ثانية.',
      },
      {
        en: 'Real-time collaboration layer (Socket.IO + WebRTC): live chat, voice and video study rooms with screen sharing, and session scheduling.',
        ar: 'طبقة تعاون لحظية (Socket.IO + WebRTC): محادثة مباشرة، وغرف دراسة صوتية ومرئية مع مشاركة الشاشة، وجدولة الجلسات.',
      },
      {
        en: 'Multimodal study assistant (Google Gemini API) that analyses documents and images, answers by text or voice, and generates study plans and flashcards.',
        ar: 'مساعد دراسة متعدّد الوسائط (Google Gemini API) يحلّل المستندات والصور، ويجيب نصًّا أو صوتًا، ويولّد خطط مراجعة وبطاقات تعليمية.',
      },
      {
        en: 'Secured with JWT auth, refresh-token rotation, role-based room controls (host / co-host / participant / viewer), 2FA and email verification.',
        ar: 'مؤمّن بمصادقة JWT وتدوير رموز التحديث والتحكّم بالأدوار في الغرف (مضيف / مساعد / مشارك / مشاهد) والتحقّق بخطوتين وتأكيد البريد.',
      },
      {
        en: 'Substantial architecture: 100+ REST endpoints, 100+ real-time socket events, 20 data models and 125 passing tests — bilingual EN/AR, five themes, an installable PWA, and an automated Cloudinary media pipeline.',
        ar: 'بنية كبيرة: أكثر من ١٠٠ نقطة نهاية REST، وأكثر من ١٠٠ حدث لحظي، و٢٠ نموذج بيانات، و١٢٥ اختبارًا ناجحًا — ثنائية اللغة (إنجليزي/عربي)، خمسة سمات، تطبيق ويب قابل للتثبيت (PWA)، وخط معالجة وسائط آلي عبر Cloudinary.',
      },
      {
        en: 'Validated in a 44-student pilot: 86% reported high satisfaction and 95% said the AI assistant improved how they study.',
        ar: 'جرى التحقّق منها في تجربة مع ٤٤ طالبًا: ٨٦٪ أبدوا رضًا عاليًا و٩٥٪ قالوا إن المساعد الذكي حسّن طريقة دراستهم.',
      },
    ],
    /**
     * The documentary. Every claim here is traceable to the CV or the pilot —
     * nothing about the process has been invented to round out the arc. Where
     * a beat is missing (early sketches, the things that failed), it is simply
     * absent rather than filled in.
     */
    chapters: [
      {
        title: { en: 'The problem', ar: 'المشكلة' },
        body: [
          {
            en: 'Remote learning left students working alone. There was no reliable way to find someone studying the same subject at the same level, no shared space to actually work together once you had, and no help at the moment you got stuck — which is the only moment help matters.',
            ar: 'ترك التعلّم عن بُعد الطلاب يعملون بمفردهم. لم تكن هناك طريقة موثوقة لإيجاد شخص يدرس المادة نفسها بالمستوى نفسه، ولا مساحة مشتركة للعمل معًا بعد إيجاده، ولا مساعدة في لحظة التعثّر — وهي اللحظة الوحيدة التي تنفع فيها المساعدة.',
          },
        ],
      },
      {
        title: { en: 'Matching, not searching', ar: 'مطابقة لا بحث' },
        body: [
          {
            en: 'A search box would have put the work back on the student. Instead the platform scores compatibility across four axes — subject, study style, availability and academic level — and returns a ranked list. Ranking matters more than filtering: a filter tells you who is eligible, a score tells you who is worth messaging first.',
            ar: 'كان مربّع البحث سيعيد العبء إلى الطالب. بدلًا من ذلك تحسب المنصّة درجة التوافق عبر أربعة محاور — المادة، وأسلوب الدراسة، والتوافر، والمستوى الأكاديمي — وتعيد قائمة مرتّبة. الترتيب أهم من التصفية: التصفية تخبرك بمن يستوفي الشروط، والدرجة تخبرك بمن يستحق أن تراسله أولًا.',
          },
        ],
        facts: [{ label: { en: 'Ranked results in', ar: 'نتائج مرتّبة خلال' }, value: '< 1s' }],
      },
      {
        title: { en: 'A room, not a chat box', ar: 'غرفة لا صندوق محادثة' },
        body: [
          {
            en: 'Matching two people accomplishes nothing if they then have nowhere to go. The real-time layer carries live chat, voice and video rooms with screen sharing, and scheduled sessions — with host, co-host, participant and viewer roles, because a study room with no roles becomes unusable the moment it has more than four people in it.',
            ar: 'لا قيمة لمطابقة شخصين إن لم يكن لديهما مكان يذهبان إليه. تحمل الطبقة اللحظية محادثة مباشرة، وغرفًا صوتية ومرئية مع مشاركة الشاشة، وجلسات مجدولة — بأدوار المضيف والمساعد والمشارك والمشاهد، لأن غرفة الدراسة بلا أدوار تصبح غير صالحة للاستخدام فور تجاوزها أربعة أشخاص.',
          },
        ],
        facts: [
          { label: { en: 'Realtime events', ar: 'أحداث لحظية' }, value: '100+' },
          { label: { en: 'REST endpoints', ar: 'نقاط نهاية REST' }, value: '100+' },
        ],
      },
      {
        title: { en: 'Help at the moment of being stuck', ar: 'المساعدة عند التعثّر' },
        body: [
          {
            en: 'A Gemini-powered assistant reads the material a student is actually holding — documents and images, not just typed questions — answers by text or voice, and turns a syllabus into a study plan or a set of flashcards. It exists because the gap was never information; it was information at the right moment.',
            ar: 'مساعد مدعوم بـ Gemini يقرأ المادة التي بين يدي الطالب فعلًا — مستندات وصور، لا أسئلة مكتوبة فحسب — ويجيب نصًّا أو صوتًا، ويحوّل المقرّر إلى خطة مراجعة أو مجموعة بطاقات تعليمية. وُجد لأن الفجوة لم تكن في المعلومة يومًا، بل في وصولها في اللحظة الصحيحة.',
          },
        ],
      },
      {
        title: { en: 'Built to be trusted', ar: 'مبنيّ ليكون موثوقًا' },
        body: [
          {
            en: 'Student accounts hold timetables, coursework and a face on a video call, so the security work was not optional: JWT auth with refresh-token rotation, role-based access control, two-factor authentication and email verification — plus 125 passing tests across 20 data models.',
            ar: 'تحتوي حسابات الطلاب على جداولهم وأعمالهم ووجوههم في مكالمة مرئية، لذا لم يكن العمل الأمني اختياريًا: مصادقة JWT مع تدوير رموز التحديث، وتحكّم بالوصول حسب الأدوار، وتحقّق بخطوتين، وتأكيد بريد — إضافة إلى ١٢٥ اختبارًا ناجحًا عبر ٢٠ نموذج بيانات.',
          },
        ],
        facts: [
          { label: { en: 'Passing tests', ar: 'اختبارات ناجحة' }, value: '125' },
          { label: { en: 'Data models', ar: 'نماذج بيانات' }, value: '20' },
        ],
      },
      {
        title: { en: 'What happened', ar: 'ما الذي حدث' },
        body: [
          {
            en: 'Forty-four students used it. 86% reported high satisfaction and 95% said the AI assistant improved how they study. The project was graded Distinction as a senior capstone and selected among the top 30 of 738 STEM projects nationally at the London International Youth Science Forum finals in Muscat.',
            ar: 'استخدمها أربعة وأربعون طالبًا. أبدى ٨٦٪ رضًا عاليًا، وقال ٩٥٪ إن المساعد الذكي حسّن طريقة دراستهم. ونال المشروع تقدير امتياز كمشروع تخرّج، واختير ضمن أفضل ٣٠ من ٧٣٨ مشروعًا وطنيًا في نهائيات منتدى لندن الدولي لعلوم الشباب بمسقط.',
          },
        ],
        facts: [
          { label: { en: 'Pilot students', ar: 'طلاب التجربة' }, value: '44' },
          { label: { en: 'High satisfaction', ar: 'رضا عالٍ' }, value: '86%' },
        ],
      },
    ],
    // The mark leads everywhere — grid, feature block and case study. The
    // landing-page capture read as an unrecognisable smudge at any small size.
    // Themed pair: the logo has a baked-in background, so one file cannot
    // serve both modes (light mark on white, dark mark on black).
    cover: '/images/projects/studynest-lightlogo.jpg',
    coverDark: '/images/projects/studynest-darklogo.jpg',
    coverKind: 'logo',
    gallery: [],
    links: [
      { label: 'Live demo', href: 'https://studynest.dev', external: true },
      {
        label: 'Source',
        href: 'https://github.com/rworldx/StudyNest-Source',
        external: true,
      },
      {
        label: 'Instagram · @studynest.om',
        href: 'https://instagram.com/studynest.om',
        external: true,
      },
    ],
  },
  {
    slug: 'ieee-buc-website',
    featured: false,
    title: 'IEEE BUC Student Branch Website',
    year: 2026,
    role: 'Webmaster · Built & maintained',
    summary: {
      en: 'The official website for the IEEE Student Branch at Al Buraimi University College — built and maintained as branch Webmaster.',
      ar: 'الموقع الرسمي لفرع طلاب IEEE في كلية البريمي الجامعية — بنيتُه وأتولّى صيانته بصفتي مسؤول الموقع.',
    },
    problem: {
      en: 'A newly launched student branch needed a credible, fast official web presence to share its activities and reach its members.',
      ar: 'احتاج فرعٌ طلابي حديث الإطلاق إلى حضور رقمي رسمي سريع وموثوق للتعريف بأنشطته والوصول إلى أعضائه.',
    },
    solution: {
      en: 'A responsive, SEO-optimized website (sitemap, robots, and JSON-LD structured data) built with Next.js and TypeScript — designed, built and maintained single-handedly as the branch Webmaster.',
      ar: 'موقع متجاوب ومُحسَّن لمحرّكات البحث (خريطة موقع، وملف robots، وبيانات JSON-LD المنظَّمة) بُني باستخدام Next.js وTypeScript — صمّمته وبنيته وأتولّى صيانته بمفردي بصفتي مسؤول الموقع.',
    },
    liveUrl: 'https://ieee-buc-website.vercel.app',
    repoUrl: 'https://github.com/rworldx/ieee-buc-website',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      {
        en: 'Designed, built and maintained single-handedly as the branch Webmaster.',
        ar: 'صُمّم وبُني وتُتولّى صيانته بمفردي بصفتي مسؤول الموقع.',
      },
      {
        en: 'Responsive across devices, built with Next.js, TypeScript, Tailwind CSS and Framer Motion.',
        ar: 'متجاوب عبر الأجهزة، مبني باستخدام Next.js وTypeScript وTailwind CSS وFramer Motion.',
      },
      {
        en: 'SEO-optimized: sitemap, robots, and JSON-LD structured data.',
        ar: 'مُحسَّن لمحرّكات البحث: خريطة موقع، وملف robots، وبيانات JSON-LD المنظَّمة.',
      },
    ],
    cover: '/images/projects/ieee-buc.png',
    gallery: [],
    links: [
      { label: 'Live demo', href: 'https://ieee-buc-website.vercel.app', external: true },
      {
        label: 'Source',
        href: 'https://github.com/rworldx/ieee-buc-website',
        external: true,
      },
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
    // A brand mark, not a screenshot: shown whole rather than cropped.
    cover: '/images/projects/energrid-logo.jpg',
    coverKind: 'logo',
    gallery: [],
  },
];

/** Convenience selectors. */
export const featuredProjects = projects.filter((p) => p.featured);
export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
