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
      en: 'A full-stack study partner matching and collaboration platform. Students find compatible partners, share notes, join live study sessions, video-call each other, and get AI study assistance.',
      ar: 'منصة متكاملة لمطابقة شركاء الدراسة والتعاون بينهم. يجد الطلاب فيها شركاء متوافقين، ويتبادلون الملاحظات، وينضمون إلى جلسات دراسية مباشرة، ويتواصلون بالفيديو، ويحصلون على مساعدة ذكية في المذاكرة.',
    },
    problem: {
      en: 'Remote learning leaves students isolated. They have no easy way to find a compatible study partner, no shared space to work together, and no help at the moment they get stuck.',
      ar: 'يترك التعلّم عن بُعد الطلاب معزولين. لا توجد طريقة سهلة لإيجاد شريك دراسة متوافق، ولا مساحة مشتركة للعمل معًا، ولا مساعدة في لحظة التعثّر.',
    },
    solution: {
      en: 'An end-to-end platform. A weighted matching engine ranks compatible partners across the whole profile (subjects, academic level, study style, availability, country, institution, age, interests and experience) in under a second. A low-latency real-time layer runs chat, voice and video study rooms with screen sharing. A Google Gemini-powered study assistant reads documents and images, answers by text or voice, and builds study plans and flashcards.',
      ar: 'منصة متكاملة. محرّك مطابقة مرجّح يرتّب الشركاء المتوافقين عبر الملف الشخصي كاملًا (المواد، والمستوى الأكاديمي، وأسلوب الدراسة، والتوافر، والبلد، والجامعة، والعمر، والاهتمامات، والخبرات) في أقل من ثانية. وطبقة لحظية منخفضة الكمون تشغّل المحادثة وغرف الدراسة الصوتية والمرئية مع مشاركة الشاشة. ومساعد دراسة مدعوم بـ Google Gemini يقرأ المستندات والصور، ويجيب نصًّا أو صوتًا، ويبني خطط المراجعة والبطاقات التعليمية.',
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
        en: 'Weighted matching engine. Scores partners on subjects, academic level, study style, availability, country, institution, age, interests and experience, then returns ranked recommendations in under a second. Subject overlap carries the most weight at 35%, then academic level at 20%.',
        ar: 'محرّك مطابقة مرجّح. يقيس التوافق حسب المواد والمستوى الأكاديمي وأسلوب الدراسة والتوافر والبلد والجامعة والعمر والاهتمامات والخبرات، ثم يعيد توصيات مرتّبة في أقل من ثانية. وتطابق المواد هو الأثقل وزنًا بنسبة ٣٥٪، يليه المستوى الأكاديمي بـ ٢٠٪.',
      },
      {
        en: 'Real-time collaboration layer (Socket.IO + WebRTC): live chat, voice and video study rooms with screen sharing, and session scheduling.',
        ar: 'طبقة تعاون لحظية (Socket.IO + WebRTC): محادثة مباشرة، وغرف دراسة صوتية ومرئية مع مشاركة الشاشة، وجدولة الجلسات.',
      },
      {
        en: 'Multimodal study assistant (Google Gemini API). Reads documents and images, answers by text or voice, and builds study plans and flashcards.',
        ar: 'مساعد دراسة متعدّد الوسائط (Google Gemini API) يحلّل المستندات والصور، ويجيب نصًّا أو صوتًا، ويولّد خطط مراجعة وبطاقات تعليمية.',
      },
      {
        en: 'Secured with JWT auth, refresh-token rotation, role-based room controls (host / co-host / participant / viewer), 2FA and email verification.',
        ar: 'مؤمّن بمصادقة JWT وتدوير رموز التحديث والتحكّم بالأدوار في الغرف (مضيف / مساعد / مشارك / مشاهد) والتحقّق بخطوتين وتأكيد البريد.',
      },
      {
        en: 'Substantial architecture: 100+ REST endpoints, 100+ real-time socket events, 20 data models and 125 passing tests. Bilingual EN/AR, five themes, an installable PWA, and an automated Cloudinary media pipeline.',
        ar: 'بنية كبيرة: أكثر من ١٠٠ نقطة نهاية REST، وأكثر من ١٠٠ حدث لحظي، و٢٠ نموذج بيانات، و١٢٥ اختبارًا ناجحًا. ثنائية اللغة (إنجليزي/عربي)، وخمسة سمات، وتطبيق ويب قابل للتثبيت (PWA)، وخط معالجة وسائط آلي عبر Cloudinary.',
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
            en: 'The idea began in my first weeks at university. I knew nobody. I wanted someone taking the same subjects, in the same year, who studied the way I did. Apps for messaging people were everywhere. None of them helped me find the right people.',
            ar: 'بدأت الفكرة في أسابيعي الأولى بالجامعة. لم أكن أعرف أحدًا، وكنت أبحث عن طالب يدرس المقررات نفسها، وفي المستوى نفسه، ويشارك أسلوبًا مشابهًا في الدراسة. كانت تطبيقات التواصل موجودة بكثرة، لكنها لم تساعدني في الوصول إلى الشخص المناسب.',
          },
          {
            en: 'After the remote learning period, many students ended up studying alone. Nothing brought together the three things they needed: finding a suitable study partner, a space to work with them, and help the moment a problem came up while studying. Those are the moments a student needs support.',
            ar: 'بعد فترة التعلّم عن بُعد أصبح كثير من الطلاب يدرسون بمفردهم. ولم تكن هناك وسيلة تجمع بين ثلاثة أمور أساسية: العثور على زميل مناسب للدراسة، وتوفير مساحة للعمل معه، والحصول على المساعدة فور مواجهة صعوبة أثناء المذاكرة. وهذه هي اللحظة التي يحتاج فيها الطالب إلى الدعم فعلًا.',
          },
        ],
      },
      {
        title: { en: 'Three days to a working version', ar: 'ثلاثة أيام حتى أول نسخة' },
        body: [
          {
            en: 'I started in June 2025, during a summer course, a week before midterms. The capstone was not due to begin for months. I started early on purpose, to build the project calmly instead of under the pressure of a full semester.',
            ar: 'بدأت العمل على StudyNest في يونيو 2025 أثناء الدورة الصيفية، قبل اختبارات منتصف الفصل بأسبوع. ورغم أن مشروع التخرج كان لا يزال بعيدًا، قررت البدء مبكرًا حتى أتمكن من تطويره بهدوء، بدلًا من إنجازه تحت ضغط الدراسة.',
          },
          {
            en: 'I wrote down three ideas, picked one, and had a working prototype three days later. I kept building on the same prototype for a full year, up to the final capstone evaluation. I presented the work there for the Information Technology Department, and entered the project into the London International Youth Science Forum.',
            ar: 'كتبت ثلاث أفكار، ثم اخترت واحدة، وبعد ثلاثة أيام فقط أصبحت لدي نسخة أولية تعمل. وواصلت العمل على المشروع سنة كاملة حتى عرضته في التقييم النهائي لمشروع التخرج، حيث مثّلت قسم تقنية المعلومات، وشاركت به في منتدى لندن الدولي لعلوم الشباب.',
          },
        ],
        facts: [
          { label: { en: 'First prototype', ar: 'أول نسخة عاملة' }, value: '3 days' },
          { label: { en: 'Started', ar: 'بداية المشروع' }, value: 'Jun 2025' },
        ],
      },
      {
        title: { en: 'Not another LMS', ar: 'ليست نظام إدارة تعلّم آخر' },
        body: [
          {
            en: 'Moodle and Google Classroom were never the competition. They manage courses and organise teaching material, and they do the job well.',
            ar: 'لم يكن هدفي منافسة Moodle أو Google Classroom، فهذه المنصات تؤدي دورها في إدارة المقررات وتنظيم المحتوى التعليمي.',
          },
          {
            en: 'Neither one helps a student find people to study with, or work alongside them once found. StudyNest completes those platforms and adds the social, collaborative side they leave out.',
            ar: 'لكنها لا تساعد الطالب في العثور على زملاء يدرسون معه أو التعاون معهم. وهنا يأتي دور StudyNest. فهو يكمل هذه المنصات ويضيف الجانب الاجتماعي والتعاوني الذي تفتقده.',
          },
        ],
      },
      {
        title: { en: 'Matching, not searching', ar: 'المطابقة بدلًا من البحث' },
        body: [
          {
            en: 'I did not want to leave a student searching through hundreds of profiles.',
            ar: 'لم أرد أن أضع على الطالب عبء البحث بين مئات المستخدمين.',
          },
          {
            en: 'The engine scores compatibility across the profile: subjects, academic level, study style, free time, country, institution, age, interests and experience. It then returns a list ordered by best fit. The weights are not equal. Subject overlap carries 35%, academic level 20%, and study style and schedule 15% each.',
            ar: 'لذلك يعتمد النظام على خوارزمية تقيس مدى التوافق بين الطلاب وفق عدة معايير: المواد الدراسية، والمستوى الأكاديمي، وأسلوب الدراسة، وأوقات التفرغ، والبلد، والجامعة، والعمر، والاهتمامات، والخبرات. ثم يعرض قائمة مرتبة بحسب أفضل تطابق. والأوزان ليست متساوية، فتطابق المواد يأخذ ٣٥٪، والمستوى الأكاديمي ٢٠٪، وأسلوب الدراسة وأوقات التفرغ ١٥٪ لكل منهما.',
          },
          {
            en: 'A search tells you who meets the conditions. The ranking tells you who is worth starting with.',
            ar: 'فالبحث يخبرك بمن يطابق الشروط، أما الترتيب فيرشدك إلى الشخص الذي يستحق أن تبدأ معه أولًا.',
          },
        ],
        facts: [{ label: { en: 'Ranked results in', ar: 'زمن إظهار النتائج' }, value: '< 1s' }],
      },
      {
        title: { en: 'A room, not a chat box', ar: 'غرفة دراسة متكاملة، لا مجرد محادثة' },
        body: [
          {
            en: 'Finding a study partner is not enough on its own, so the platform gives students a space to study in directly.',
            ar: 'العثور على شريك دراسة لا يكفي، لذلك وفرت المنصة مساحة يمكن للطلاب الدراسة فيها مباشرة.',
          },
          {
            en: 'Rooms carry live chat, voice and video calls, and screen sharing, alongside scheduled study sessions. They support host, co-host, participant and viewer roles, so a room stays orderly when a lot of people are in it.',
            ar: 'تشمل الغرف محادثات فورية، ومكالمات صوتية ومرئية، ومشاركة الشاشة، بالإضافة إلى جلسات دراسية مجدولة. كما تدعم أدوارًا مختلفة مثل المضيف، والمضيف المساعد، والمشارك، والمشاهد، حتى تبقى الغرفة منظمة عند وجود عدد كبير من المستخدمين.',
          },
          {
            en: 'Most of the work went into the details nobody notices. When the host leaves, control passes automatically to the co-host, then to the first participant who joined. Clients send a connection signal every 15 seconds, and anyone who drops gets 30 seconds to return to the same session without losing their state or starting again.',
            ar: 'أما الجزء الأكبر من العمل فكان في التفاصيل التي لا يلاحظها المستخدم. فإذا غادر المضيف تنتقل إدارة الغرفة تلقائيًا إلى المضيف المساعد، ثم إلى أول مشارك انضم للجلسة. كما ترسل التطبيقات إشارة اتصال كل 15 ثانية، ويُمنح المستخدم الذي ينقطع اتصالُه 30 ثانية للعودة إلى الجلسة نفسها دون أن يفقد حالته أو يبدأ من جديد.',
          },
        ],
        facts: [
          { label: { en: 'Realtime events', ar: 'الأحداث الفورية' }, value: '100+' },
          { label: { en: 'REST endpoints', ar: 'واجهات REST' }, value: '100+' },
        ],
      },
      {
        title: { en: 'Help at the moment of being stuck', ar: 'المساعدة وقت الحاجة' },
        body: [
          {
            en: 'StudyNest includes a Gemini-powered assistant. It answers typed questions, and it also reads the files and images a student uploads, explains what is in them, and replies by text or voice.',
            ar: 'يتضمن StudyNest مساعدًا ذكيًا يعتمد على Gemini، لا يجيب عن الأسئلة النصية فقط، بل يستطيع قراءة الملفات والصور التي يرفعها الطالب، ثم يشرح محتواها ويجيب عنها كتابةً أو صوتًا.',
          },
          {
            en: 'It also turns a course syllabus into an organised study plan, or into flashcards for revision.',
            ar: 'كما يساعد في تحويل المقرر الدراسي إلى خطة مذاكرة منظمة أو بطاقات تعليمية للمراجعة.',
          },
          {
            en: 'The aim was never to supply more information. The aim was to deliver the right information at the moment a student needs it.',
            ar: 'الفكرة لم تكن توفير المزيد من المعلومات، بل إيصال المعلومة المناسبة في اللحظة التي يحتاجها الطالب.',
          },
        ],
      },
      {
        title: { en: 'Built to be trusted', ar: 'مبنيّ ليكون موثوقًا' },
        body: [
          {
            en: 'The system handles personal and academic data, so security was a core part of the project rather than an afterthought.',
            ar: 'يتعامل النظام مع بيانات شخصية ودراسية مهمة، لذلك كان الاهتمام بالأمان جزءًا أساسيًا من المشروع.',
          },
          {
            en: 'The work covers JWT sign-in with refresh-token rotation, role-based permissions, two-factor authentication and email confirmation, alongside 125 passing tests across 20 data models.',
            ar: 'يشمل ذلك تسجيل الدخول باستخدام JWT مع تدوير رموز التحديث، والتحكم في الصلاحيات حسب الأدوار، والمصادقة الثنائية، وتأكيد البريد الإلكتروني، بالإضافة إلى 125 اختبارًا ناجحًا تغطي 20 نموذجًا للبيانات.',
          },
          {
            en: 'An access token lives fifteen minutes and a refresh token seven days, so a stolen one dies fast. Accounts are never removed outright either. They are disabled logically, which lets a student come back later on the same email without losing their data.',
            ar: 'ويعيش رمز الوصول خمس عشرة دقيقة، ورمز التحديث سبعة أيام، فلا يبقى الرمز المسروق صالحًا طويلًا. كما صُممت آلية إدارة الحسابات بحيث لا تُحذف الحسابات نهائيًا، وإنما تُعطَّل منطقيًا، مما يسمح للمستخدم بالعودة لاحقًا باستخدام البريد الإلكتروني نفسه دون فقدان بياناته.',
          },
        ],
        facts: [
          { label: { en: 'Passing tests', ar: 'اختبارات ناجحة' }, value: '125' },
          { label: { en: 'Data models', ar: 'نماذج بيانات' }, value: '20' },
        ],
      },
      {
        title: { en: 'What happened', ar: 'النتائج' },
        body: [
          {
            en: 'Forty-four students used the platform during the pilot.',
            ar: 'استُخدمت المنصة من قبل 44 طالبًا خلال المرحلة التجريبية.',
          },
          {
            en: 'The surveys showed 86% were satisfied with the experience, while 95% said the AI assistant improved how they study.',
            ar: 'وأظهرت الاستبيانات أن 86٪ من المستخدمين كانوا راضين عن تجربتهم، بينما ذكر 95٪ أن المساعد الذكي ساعدهم على تحسين طريقة المذاكرة.',
          },
          {
            en: 'The project was graded Distinction as a senior capstone, and selected among the top 30 of 738 projects nationally at the London International Youth Science Forum finals held in Muscat.',
            ar: 'كما حصل المشروع على تقدير امتياز كمشروع تخرج، واختير ضمن أفضل 30 مشروعًا من أصل 738 مشروعًا على مستوى السلطنة، في نهائيات منتدى لندن الدولي لعلوم الشباب التي أُقيمت في مسقط.',
          },
        ],
        facts: [
          { label: { en: 'Pilot students', ar: 'طلاب المرحلة التجريبية' }, value: '44' },
          { label: { en: 'High satisfaction', ar: 'نسبة الرضا' }, value: '86%' },
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
    /**
     * The site you are standing in.
     *
     * A portfolio listing itself reads as padding only when there is nothing
     * to say about it. Here the artefact is in front of the reader while they
     * read the claims, so every one of them is checkable on the spot, which is
     * the opposite of padding. Every fact below is true of this repository.
     */
    slug: 'portfolio',
    featured: false,
    title: 'This portfolio',
    year: 2026,
    role: 'Design & Front-End',
    summary: {
      en: 'The site you are reading. A bilingual, accessible portfolio staged as a gallery, with a WebGL backdrop and a full fallback for anyone who cannot run it.',
      ar: 'الموقع الذي تتصفّحه الآن. معرض أعمال بلغتين، مبني ليكون سهل الوصول للجميع، بخلفية ثلاثية الأبعاد ونسخة كاملة بديلة لمن لا يعمل جهازه بها.',
    },
    problem: {
      en: 'A portfolio has to do two jobs at once. A recruiter needs the record in seconds. A design-led team needs proof the person can actually build an interface. Most portfolios pick one and lose the other.',
      ar: 'موقع الأعمال الشخصي مطالب بأمرين في وقت واحد. من يوظّف يريد أن يرى السجل خلال ثوانٍ، وفريق التصميم يريد دليلًا على أن صاحبه يجيد بناء الواجهات فعلًا. وأغلب المواقع تنجح في أحدهما وتفرّط في الآخر.',
    },
    solution: {
      en: 'The verified record sits above the first project, so it is readable in about five seconds. The craft argument is the site itself: a scroll-driven WebGL backdrop, a coverflow deck, real Arabic typography, and a design system where contrast is measured rather than assumed.',
      ar: 'وضعت السجل الموثّق قبل أول مشروع ليُقرأ في خمس ثوانٍ. أما الدليل على الإتقان فهو الموقع ذاته: خلفية تتفاعل مع التمرير، وشريط أعمال بعمق ثلاثي الأبعاد، ونصّ عربي مضبوط بخط عربي أصيل، ونظام ألوان يُقاس فيه التباين ولا يُفترض.',
    },
    liveUrl: 'https://rashidalghafri.com',
    repoUrl: 'https://github.com/rworldx/rashidalghafri-portfolio',
    stack: [
      'Next.js 15',
      'TypeScript',
      'Tailwind CSS',
      'Three.js',
      'Framer Motion',
      'next-intl',
      'Vitest',
      'Vercel',
    ],
    stats: [
      { label: { en: 'Locales, with RTL', ar: 'لغتان مع اتجاه معكوس' }, value: '2' },
      { label: { en: 'Contrast target', ar: 'مستوى التباين' }, value: 'WCAG AA' },
      { label: { en: 'Static pages', ar: 'صفحات ثابتة' }, value: '24' },
    ],
    highlights: [
      {
        en: 'Bilingual English and Arabic with full RTL. Arabic is set in Thmanyah with no letter spacing and no small caps, because Arabic joins its letters and both habits break the joins.',
        ar: 'الموقع بلغتين، العربية والإنجليزية، مع دعم كامل للكتابة من اليمين إلى اليسار. والعربية بخط «ثمانية» من دون تباعد بين الحروف، حفاظًا على اتصال الحرف العربي.',
      },
      {
        en: 'A WebGL backdrop written as a shader rather than shipped as video, so it weighs almost nothing and recolours itself per theme.',
        ar: 'الخلفية المتحركة مرسومة برمجيًا لا مسجّلة كفيديو، فحجمها لا يكاد يُذكر وتتبدّل ألوانها تلقائيًا مع الوضع الفاتح والداكن.',
      },
      {
        en: 'Every text and background pair is measured against WCAG before shipping. Body text clears AAA in both themes.',
        ar: 'قِست التباين بين كل نص وخلفيته وفق معايير WCAG قبل النشر، ونص المتن يتجاوز أعلى مستوياتها في الوضعين.',
      },
      {
        en: 'Reduced motion turns off WebGL entirely and leaves nothing hidden. Reduced transparency and high contrast each get a real surface instead of a blurred one.',
        ar: 'عند تفعيل تقليل الحركة تتوقف الرسوم ثلاثية الأبعاد تمامًا من دون أن يختفي أي محتوى. وعند تقليل الشفافية أو رفع التباين تتحول الأسطح الضبابية إلى أسطح صريحة واضحة.',
      },
    ],
    // Two captures, because the site itself has two themes and one file
    // cannot honestly represent both.
    cover: '/images/projects/portfolio-light.png',
    coverDark: '/images/projects/portfolio-dark.png',
    coverKind: 'screenshot',
    /**
     * The design notes, moved here from a standalone "About this site" section.
     * They belong to the work, not to Rashid, so they read better as part of
     * the case study than as a separate page telling a visitor about a site
     * they are already standing in.
     */
    chapters: [
      {
        title: { en: 'Where it came from', ar: 'من أين جاءت الفكرة' },
        body: [
          {
            en: 'I kept looking at exhibition design rather than at other portfolios. A gallery gives one work a wall and lets you walk up to it. Nothing on that wall competes with the picture. Apple keynotes do the same thing with a stage and one idea at a time.',
            ar: 'كنت أستلهم من تصميم المعارض الفنية أكثر مما أستلهم من مواقع الأعمال. المعرض يخصّص للعمل الواحد جدارًا كاملًا، ويتيح لك أن تقترب منه على مهل، ولا يزاحمه شيء على ذلك الجدار. وعروض آبل تسير على المبدأ نفسه: مسرح واحد وفكرة واحدة في كل لحظة.',
          },
          {
            en: 'So the site is a room. One work at a time, and as little interface as I could get away with. If the work is worth looking at, you should not have to look past a wrapper to see it.',
            ar: 'فبنيت الموقع على هيئة قاعة عرض: عمل واحد في كل مرة، وأقلّ قدر ممكن من عناصر الواجهة. فإن كان العمل يستحق أن يُرى، فلا ينبغي لشيء أن يحجبه.',
          },
        ],
      },
      {
        title: { en: 'Type does most of the work', ar: 'الخطّ يقوم بأكثر العمل' },
        body: [
          {
            en: 'Headings run large and upright in the system face. One word in a headline turns italic when it carries the weight of the line. I tried setting every heading in italic first. A whole page of it reads as costume, so the italic went back to one word.',
            ar: 'العناوين كبيرة ومنتصبة بخط النظام، وتُمال كلمة واحدة فقط حين تحمل معنى السطر كله. جرّبت في البداية إمالة كل العناوين، فبدت الصفحة متكلّفة، فأعدت الإمالة إلى كلمة واحدة.',
          },
          {
            en: 'Arabic uses Thmanyah everywhere, with no letter spacing and no small caps. Arabic joins its letters. Both of those habits come from Latin and they pull the joins apart.',
            ar: 'والعربية بخط «ثمانية» في الموقع كله، من دون تباعد بين الحروف ولا محاكاة للأحرف الكبيرة. فالحرف العربي متّصل بطبيعته، وهاتان عادتان لاتينيتان تقطعان اتصاله.',
          },
        ],
      },
      {
        title: { en: 'Quiet on purpose', ar: 'هادئ بقصد' },
        body: [
          {
            en: 'One accent colour. Contrast measured, not guessed. No animation you did not start by scrolling. Anyone whose device or settings would rather skip the moving parts gets a full version without them, and nothing stays hidden in that version.',
            ar: 'لون واحد مميّز، وتباين مقيس لا مُقدَّر بالحدس، ولا حركة تبدأ من تلقاء نفسها دون أن تحرّك الصفحة. ومن كان جهازه أو إعداداته لا تناسبها الحركة، يحصل على نسخة كاملة ساكنة لا ينقصها شيء.',
          },
        ],
      },
    ],
    gallery: [],
    links: [
      { label: 'Live', href: 'https://rashidalghafri.com', external: true },
      {
        label: 'Source',
        href: 'https://github.com/rworldx/rashidalghafri-portfolio',
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
      en: 'Every great idea starts with a problem I lived. When I was a student renting in Buraimi, my building switched to prepaid electricity — I had to pay an estimated amount up front each month, and the balance kept running out early, forcing repeated top-ups. One evening, lying in bed watching my favourite series, the power simply cut out — and it kept happening. That is when I asked: why is there no product that continuously tracks each device’s power consumption, so you can see exactly what is draining your money, cut waste, and only run what truly matters?',
      ar: 'فكرتنا بدأت من مشكلة عشتُها بنفسي. كنت طالبًا أسكن في سكنٍ مستأجر في البريمي، وحوّل صاحب العمارة نظام الكهرباء إلى الدفع المسبق — فصرت أدفع مبلغًا تقديريًا قبل كل شهر، وكان الرصيد ينفد بسرعة قبل نهاية الشهر فأضطر لإعادة الشحن أكثر من مرة. وفي إحدى الليالي بينما كنت ممددًا على السرير أتابع مسلسلي، انقطعت الكهرباء فجأة — وتكرّر هذا كثيرًا. حينها سألت نفسي: لماذا لا نصنع منتجًا يقيس استهلاك كل جهاز باستمرار، حتى نرى أيّ جهاز يستهلك أكثر، فنوفّر الطاقة ونقلّل الفواتير ونطفئ ما لا نحتاجه؟',
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
