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
      ar: 'منصة متكاملة لمطابقة شركاء الدراسة والتعاون بينهم. تساعد StudyNest الطلاب على العثور على شركاء دراسة متوافقين، وتوفر لهم مساحة للتعاون عبر تبادل الملاحظات، والانضمام إلى جلسات دراسية مباشرة، والتواصل بالصوت والصورة، والاستفادة من مساعد ذكي يدعم عملية المذاكرة.',
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
      { label: { en: 'Realtime events', ar: 'الأحداث اللحظية' }, value: '100+' },
      { label: { en: 'Data models', ar: 'نماذج البيانات' }, value: '20' },
      { label: { en: 'Passing tests', ar: 'الاختبارات الناجحة' }, value: '125' },
      { label: { en: 'Match time', ar: 'زمن المطابقة' }, value: '< 1s' },
      { label: { en: 'Pilot satisfaction', ar: 'رضا المستخدمين' }, value: '86%' },
      { label: { en: 'AI improved study', ar: 'تحسّن أسلوب الدراسة' }, value: '95%' },
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
        ar: 'مساعد دراسة متعدّد الوسائط (Google Gemini API). يقرأ المستندات والصور، ويجيب نصًّا أو صوتًا، ويبني خطط المراجعة والبطاقات التعليمية.',
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
            ar: 'بدأت الفكرة في أسابيعي الأولى بالجامعة. لم أكن أعرف أحدًا، وكنت أبحث عن طالب يدرس المقررات نفسها، وفي المستوى نفسه، ويتبع أسلوبًا قريبًا من أسلوبي في الدراسة. كانت تطبيقات التواصل منتشرة، لكنها لم تساعدني في العثور على الشخص المناسب.',
          },
          {
            en: 'After the remote learning period, many students ended up studying alone. Nothing brought together the three things they needed: finding a suitable study partner, a space to work with them, and help the moment a problem came up while studying. Those are the moments a student needs support.',
            ar: 'ومع انتشار التعلّم عن بُعد، أصبح كثير من الطلاب يدرسون بمفردهم. ولم تكن هناك منصة تجمع بين العثور على شريك دراسة مناسب، وتوفير مساحة للتعاون، وتقديم المساعدة عند مواجهة صعوبة أثناء المذاكرة. وهي اللحظة التي يكون فيها الدعم أكثر قيمة.',
          },
        ],
      },
      {
        title: { en: 'Three days to a working version', ar: 'ثلاثة أيام حتى أول نسخة' },
        body: [
          {
            en: 'I started in June 2025, during a summer course, a week before midterms. The capstone was not due to begin for months. I started early on purpose, to build the project calmly instead of under the pressure of a full semester.',
            ar: 'بدأت العمل على StudyNest في يونيو 2025 خلال الدورة الصيفية، قبل اختبارات منتصف الفصل بأسبوع. ورغم أن موعد مشروع التخرج كان لا يزال بعيدًا، قررت البدء مبكرًا حتى أتمكن من تطويره بهدوء، بدلًا من تنفيذه تحت ضغط الدراسة.',
          },
          {
            en: 'I wrote down three ideas, picked one, and had a working prototype three days later. I kept building on the same prototype for a full year, up to the final capstone evaluation. I presented the work there for the Information Technology Department, and entered the project into the London International Youth Science Forum.',
            ar: 'دوّنت ثلاث أفكار، ثم اخترت واحدة، وبعد ثلاثة أيام فقط أصبحت لدي نسخة أولية تعمل. ومنذ ذلك الحين واصلت تطوير المشروع لمدة عام كامل، حتى عرضته في التقييم النهائي لمشروع التخرج، ممثلًا قسم تقنية المعلومات، ثم شاركت به في منتدى لندن الدولي لعلوم الشباب.',
          },
        ],
        facts: [
          { label: { en: 'First prototype', ar: 'أول نسخة عاملة' }, value: '3 days' },
          { label: { en: 'Started', ar: 'بداية المشروع' }, value: 'Jun 2025' },
        ],
      },
      {
        title: { en: 'Not another LMS', ar: 'ليست منصة لإدارة التعلّم' },
        body: [
          {
            en: 'Moodle and Google Classroom were never the competition. They manage courses and organise teaching material, and they do the job well.',
            ar: 'لم يكن هدفي منافسة Moodle أو Google Classroom، فهذه المنصات تؤدي دورها بكفاءة في إدارة المقررات وتنظيم المحتوى التعليمي.',
          },
          {
            en: 'Neither one helps a student find people to study with, or work alongside them once found. StudyNest completes those platforms and adds the social, collaborative side they leave out.',
            ar: 'لكنها لا تساعد الطالب على العثور على زملاء للدراسة أو بناء مجموعات تعاونية. وهنا يأتي دور StudyNest. فهو يكمل ما تقدمه تلك المنصات، ويضيف الجانب الاجتماعي والتعاوني الذي تفتقده.',
          },
        ],
      },
      {
        title: { en: 'Matching, not searching', ar: 'المطابقة بدلًا من البحث' },
        body: [
          {
            en: 'I did not want to leave a student searching through hundreds of profiles.',
            ar: 'لم أرد أن أحمّل الطالب عبء البحث بين مئات المستخدمين.',
          },
          {
            en: 'The engine scores compatibility across the profile: subjects, academic level, study style, free time, university, country, age, interests and past experience. The list comes back ordered by best fit. The weights are not equal. Subjects carry 35% of the match score, academic level 20%, and study style and free time 15% each.',
            ar: 'لذلك تعتمد المنصة على خوارزمية تقيس مدى التوافق بين الطلاب وفق مجموعة من المعايير، تشمل المقررات الدراسية، والمستوى الأكاديمي، وأسلوب الدراسة، وأوقات التفرغ، والجامعة، والدولة، والعمر، والاهتمامات، والخبرات السابقة.',
          },
          {
            en: 'A search tells you who meets the conditions. The ranking tells you who is worth starting with.',
            ar: 'فالمرشحات تخبرك بمن يستوفي الشروط، أما نظام الترتيب فيقترح عليك الشخص الأكثر ملاءمة لتبدأ معه.',
          },
        ],
        facts: [{ label: { en: 'Ranked results in', ar: 'زمن المطابقة' }, value: '< 1s' }],
      },
      {
        title: { en: 'A room, not a chat box', ar: 'غرفة دراسة متكاملة، لا مجرد محادثة' },
        body: [
          {
            en: 'Finding a study partner is not enough on its own, so the platform gives students a space to study in directly.',
            ar: 'العثور على شريك دراسة لا يكفي، لذلك توفر المنصة مساحة متكاملة يمكن للطلاب الدراسة فيها معًا.',
          },
          {
            en: 'Rooms carry live chat, voice and video calls, screen sharing, and scheduled study sessions. They support host, co-host, participant and viewer roles, which keeps a session orderly as the number of people grows.',
            ar: 'تشمل الغرف محادثات فورية، ومكالمات صوتية ومرئية، ومشاركة الشاشة، وجلسات دراسية مجدولة. كما تدعم أدوارًا مختلفة، مثل المضيف، والمضيف المساعد، والمشارك، والمشاهد، للحفاظ على تنظيم الجلسات مع ازدياد عدد المشاركين.',
          },
          {
            en: 'Most of the work went into the details nobody notices. When the host leaves, control passes automatically to the co-host, then to the first participant who joined. Clients send a connection signal every 15 seconds, and anyone who drops gets 30 seconds to return to the same session without losing their state or starting again.',
            ar: 'أما الجزء الأكبر من العمل فكان في التفاصيل التي لا يلاحظها المستخدم. فإذا غادر المضيف، تنتقل إدارة الجلسة تلقائيًا إلى المضيف المساعد، ثم إلى أول مشارك انضم إليها. وترسل التطبيقات نبضة اتصال كل 15 ثانية، ويُمنح المستخدم الذي ينقطع اتصالُه مهلة 30 ثانية للعودة إلى الجلسة بالحالة نفسها، دون الحاجة إلى البدء من جديد.',
          },
        ],
        facts: [
          { label: { en: 'Realtime events', ar: 'الأحداث اللحظية' }, value: '100+' },
          { label: { en: 'REST endpoints', ar: 'نقاط نهاية REST' }, value: '100+' },
        ],
      },
      {
        title: { en: 'Help at the moment of being stuck', ar: 'المساعدة عند الحاجة' },
        body: [
          {
            en: 'StudyNest includes a Gemini-powered assistant. The assistant answers typed questions, reads the documents and images a student uploads, explains the contents, and replies by text or voice.',
            ar: 'يتضمن StudyNest مساعدًا ذكيًا يعتمد على Gemini. يجيب عن الأسئلة النصية، ويقرأ كذلك المستندات والصور التي يرفعها الطالب، ثم يشرح محتواها ويجيب عنها كتابةً أو صوتًا.',
          },
          {
            en: 'The assistant also turns a course syllabus into an organised study plan, or into flashcards for revision.',
            ar: 'كما يمكنه تحويل المقرر الدراسي إلى خطة مذاكرة منظمة أو بطاقات تعليمية تساعد على المراجعة.',
          },
          {
            en: 'The information was always available. What was missing was reaching the right information at the right time.',
            ar: 'المعلومات كانت متوفرة دائمًا. الناقص كان الوصول إلى المعلومة المناسبة في الوقت المناسب.',
          },
        ],
      },
      {
        title: { en: 'Built to be trusted', ar: 'مبنيّ ليكون موثوقًا' },
        body: [
          {
            en: 'The system handles personal and academic data, so security was a core part of the project rather than an afterthought.',
            ar: 'يتعامل النظام مع بيانات شخصية ودراسية حساسة، لذلك كان الاهتمام بالأمان جزءًا أساسيًا من عملية التطوير.',
          },
          {
            en: 'The work covers JWT authentication with refresh-token rotation, role-based permissions, two-factor authentication and email confirmation, alongside 125 passing tests across 20 data models.',
            ar: 'يشمل ذلك المصادقة باستخدام JWT مع تدوير رموز التحديث، والتحكم في الصلاحيات وفق الأدوار، والمصادقة الثنائية، وتأكيد البريد الإلكتروني، بالإضافة إلى 125 اختبارًا ناجحًا تغطي 20 نموذجًا للبيانات.',
          },
          {
            en: 'An access token lives 15 minutes and a refresh token seven days, which limits the damage a stolen token does. The platform disables accounts logically instead of deleting them, so a student returns later on the same email without losing their data.',
            ar: 'ويبلغ عمر رمز الوصول 15 دقيقة، بينما يبقى رمز التحديث صالحًا لمدة سبعة أيام، مما يحد من مخاطر إساءة استخدام الرموز المسروقة. كما تعتمد المنصة الحذف المنطقي للحسابات بدلًا من حذفها نهائيًا، بحيث يستطيع المستخدم العودة لاحقًا باستخدام البريد الإلكتروني نفسه دون فقدان بياناته.',
          },
        ],
        facts: [
          { label: { en: 'Passing tests', ar: 'الاختبارات الناجحة' }, value: '125' },
          { label: { en: 'Data models', ar: 'نماذج البيانات' }, value: '20' },
        ],
      },
      {
        title: { en: 'What happened', ar: 'النتائج' },
        body: [
          {
            en: 'Forty-four students used the platform during the pilot.',
            ar: 'شارك 44 طالبًا في المرحلة التجريبية للمنصة.',
          },
          {
            en: 'The surveys showed 86% were satisfied with the experience, while 95% said the AI assistant improved how they study.',
            ar: 'وأظهرت نتائج الاستبيانات أن 86٪ من المشاركين كانوا راضين عن تجربتهم، فيما أفاد 95٪ منهم بأن المساعد الذكي ساعدهم على تحسين أسلوب المذاكرة.',
          },
          {
            en: 'The project was graded Distinction as a senior capstone, and selected among the top 30 of 738 projects nationally at the London International Youth Science Forum finals held in Muscat.',
            ar: 'وحصل المشروع على تقدير امتياز بوصفه مشروع التخرج، كما اختير ضمن أفضل 30 مشروعًا من أصل 738 مشروعًا على مستوى سلطنة عُمان، وتأهل للمشاركة في نهائيات منتدى لندن الدولي لعلوم الشباب التي أُقيمت في مسقط.',
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
     * A solo build, 9 to 26 August 2026. Independent fan project with no affiliation
     * to Marvel, Disney, Sony or Fox, and the copy says so wherever the
     * project appears. Every number below is checked against the repository
     * on 2026-09-20, not rounded.
     */
    slug: 'the-thread',
    featured: false,
    title: 'The Thread',
    year: 2026,
    role: 'Solo build · Design & Engineering',
    summary: {
      en: 'A Marvel watch-order site built as a dependency resolver. Name one title and the site computes the shortest honest watch path across eight universes and 216 films and series. 699 characters, 1,893 static pages, English and Arabic. Independent fan project, not affiliated with Marvel or Disney.',
      ar: 'موقع يرتّب لك مشاهدة عالم مارفل. اختر عملًا واحدًا، ويخبرك الموقع بما يجب أن تشاهده قبله، بأقصر ترتيب ممكن، عبر ثمانية أكوان و216 فيلمًا ومسلسلًا. فيه 699 شخصية و1,893 صفحة ثابتة، ويعمل بالعربية والإنجليزية. مشروع مستقل من صنع أحد المعجبين، ولا صلة له بمارفل أو ديزني.',
    },
    problem: {
      en: 'Every Marvel watch guide is one flat list serving two different people. The newcomer wants a starting point under 200 hours. The returning viewer wants to watch one thing tonight and needs to know what comes before. Both share one screen, and neither is served well. Film rights make the canon harder still: Fox made the X-Men, Sony makes Spider-Man, Netflix made the Defenders, and most guides pretend none of this exists.',
      ar: 'كل أدلة المشاهدة الموجودة قائمة واحدة طويلة تُقدَّم لشخصين مختلفين تمامًا: مبتدئ يريد أن يعرف من أين يبدأ دون أن يقضي 200 ساعة، ومشاهد يعرف ما يريد ويحتاج فقط أن يعرف ما الذي عليه مشاهدته قبله. القائمة الواحدة لا تناسب أيًّا منهما. ثم تأتي حقوق الإنتاج لتزيد الأمر تعقيدًا: أفلام إكس-من من فوكس، وسبايدر-مان من سوني، والمدافعون من نتفليكس، ومعظم الأدلة تتصرف كأن هذا كله غير موجود.',
    },
    solution: {
      en: 'Two front doors. The newcomer gets the Infinity Saga as a spine: 23 films, about 50 hours. The returning viewer types a title and gets the computed watch path. Underneath, 216 titles form a graph where every prerequisite is an edge, and every order on the site is derived from the graph. Nothing is typed by hand. Universes are modelled as rights-holders, so a cross-universe detour like No Way Home pulling in five Sony films is a real edge with an editor\'s note attached. The whole site is 1,893 prerendered pages making zero API calls in production.',
      ar: 'لذلك للموقع مدخلان. المبتدئ يبدأ بملحمة اللانهاية: 23 فيلمًا في نحو 50 ساعة. والمشاهد الذي يعرف وجهته يكتب اسم العمل فيحصل على ما يسبقه بالترتيب. وخلف هذا كله 216 عملًا مرتبطة في شبكة واحدة، كل علاقة «شاهد هذا قبل ذاك» محفوظة فيها، وكل ترتيب يظهر في الموقع مستخرج من هذه الشبكة لا مكتوب باليد. والأكوان مقسّمة حسب مالك الحقوق، فحين يستدعي No Way Home خمسة أفلام من سوني يظهر ذلك علاقةً حقيقية في الشبكة ومعها ملاحظة توضّح السبب. والموقع كله 1,893 صفحة جاهزة مسبقًا، ولا يستدعي أي خدمة خارجية أثناء التصفح.',
    },
    liveUrl: 'https://the-thread-marvel.vercel.app',
    repoUrl: 'https://github.com/rworldx/the-thread',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'next-intl',
      'zod',
      'Vitest',
      'Playwright',
      'Vercel',
    ],
    stats: [
      { label: { en: 'Titles', ar: 'الأعمال' }, value: '216' },
      { label: { en: 'Characters', ar: 'الشخصيات' }, value: '699' },
      { label: { en: 'Static pages', ar: 'الصفحات الثابتة' }, value: '1,893' },
      { label: { en: 'Unit tests', ar: 'اختبارات الوحدة' }, value: '321' },
      { label: { en: 'Runtime API calls', ar: 'طلبات خارجية أثناء التصفح' }, value: '0' },
      { label: { en: 'Commits', ar: 'الإيداعات' }, value: '240' },
    ],
    highlights: [
      {
        en: 'Path to any title. One route computes the watch path for both kinds of visitor. The MCU is treated as one continuous saga, so an MCU target seeds every MCU title behind the target. Everywhere else the path is the strict dependency closure.',
        ar: 'مسار إلى أي عمل. صفحة واحدة تخدم الزائرَين معًا. الكون السينمائي يُعامل كقصة واحدة متصلة، فاختيار أي عمل منه يجلب كل ما سبقه فيه. أما في بقية الأكوان فلا يُعرض إلا ما يعتمد عليه العمل فعلًا.',
      },
      {
        en: 'Eight universes side by side, each with a release order, a curated story order and a whole-thread view.',
        ar: 'ثمانية أكوان متجاورة، لكل منها ترتيب حسب تاريخ العرض، وترتيب قصصي مختار بعناية، وعرض يجمع الخيط كله.',
      },
      {
        en: '699 characters. Appearances are computed from cast credits, never hand-listed, and the Strongest sort is derived from ten power tiers with no rank column anywhere in the data.',
        ar: '699 شخصية. ظهور كل شخصية في الأعمال مستخرج من قوائم الممثلين لا مكتوب باليد، وترتيب «الأقوى» محسوب من عشر درجات قوة دون أن يُخزَّن رقم ترتيب لأي شخصية.',
      },
      {
        en: 'A spoiler shield on every title. The safe one-liner shows by default, and the full context is fetched only on tap, never hidden in the DOM.',
        ar: 'حماية من حرق الأحداث في كل عمل. يظهر لك سطر آمن أولًا، ولا يُحمَّل السياق الكامل إلا حين تطلبه بنفسك، ولا يُخبَّأ في الصفحة.',
      },
      {
        en: 'English and Arabic with full RTL and self-hosted Thmanyah type. The Arabic renders on every page and is awaiting editorial review.',
        ar: 'بالعربية والإنجليزية، مع اتجاه كامل من اليمين إلى اليسار وخطوط ثمانية مستضافة على الموقع نفسه. العربية تعمل في كل صفحة، وما زالت بانتظار مراجعة لغوية.',
      },
      {
        en: 'Zero billed image requests. Posters come from TMDB at a width written into the URL, so a full crawl costs nothing on Vercel.',
        ar: 'لا طلبات صور مدفوعة. الملصقات تأتي من TMDB بالعرض المطلوب مكتوبًا في الرابط، فتصفّح الموقع كاملًا لا يكلّف شيئًا على Vercel.',
      },
    ],
    chapters: [
      {
        title: { en: 'Two doors', ar: 'مدخلان' },
        body: [
          {
            en: 'Watch-order lists already exist. Each one makes a newcomer and a returning viewer share a single page, and the page serves neither. The Thread gives each their own door. The newcomer gets the Infinity Saga as a spine, 23 films in about 50 hours, Iron Man through Far From Home. The returning viewer types a title and gets the path. The whole product follows from refusing to make those two people share a screen.',
            ar: 'قوائم ترتيب المشاهدة كثيرة، لكنها كلها تضع المبتدئ والمشاهد المتمرّس في صفحة واحدة، فلا تريح هذا ولا ذاك. في The Thread لكل واحد منهما مدخله. المبتدئ يبدأ بملحمة اللانهاية: 23 فيلمًا في نحو 50 ساعة، من Iron Man إلى Far From Home. والمتمرّس يكتب اسم ما يريد مشاهدته فيحصل على ما يسبقه. والفكرة كلها تقوم على ألا يُجبر هذان الشخصان على شاشة واحدة.',
          },
        ],
        facts: [
          { label: { en: 'Films in the spine', ar: 'أفلام البداية' }, value: '23' },
          { label: { en: 'Spine runtime, about', ar: 'مدتها تقريبًا' }, value: '50h' },
        ],
      },
      {
        title: { en: 'Order is derived, never written', ar: 'الترتيب يُحسب ولا يُكتب' },
        body: [
          {
            en: 'Every title is a node and every prerequisite is an edge. Release order, the essentials spine, each universe\'s story order and the path to any title all fall out of one graph. There is no hand-maintained list anywhere in the repository. Three kinds of ordering data stay separate because they mean different things: a hard dependency, a soft recommendation, and a curated reading order inside one universe, which is not a dependency and must never be stored as one.',
            ar: 'كل عمل في الموقع عنصر في شبكة، وكل علاقة «شاهد هذا أولًا» رابط بين عنصرين. ترتيب العرض، وقائمة البداية، والترتيب القصصي لكل كون، والمسار إلى أي عمل، كلها تُستخرج من هذه الشبكة الواحدة. لا توجد في المشروع قائمة واحدة مكتوبة باليد. وهناك ثلاثة أنواع من العلاقات تُحفظ منفصلة لأن لكل منها معنى مختلفًا: ما يجب مشاهدته أولًا، وما يُستحسن مشاهدته أولًا، وترتيب القراءة المختار داخل الكون الواحد، وهذا الأخير ليس شرطًا ويجب ألا يُحفظ كأنه شرط.',
          },
          {
            en: 'The corpus is TypeScript validated by zod, and the build fails on a dozen cross-node rules. A dependency cycle is reported as a path, not a boolean. An essential title depending on a non-essential one fails. A cross-universe detour with no editor\'s note fails. A missing runtime fails loudly instead of shipping as a confident wrong number.',
            ar: 'المحتوى مكتوب بلغة TypeScript ويتحقق منه zod، ويتوقف البناء إذا خُرقت أي قاعدة من نحو اثنتي عشرة قاعدة تربط الأعمال ببعضها. إذا وُجدت حلقة مفرغة في العلاقات ظهر مسارها كاملًا لا مجرد إشارة إلى وجودها. وإذا اعتمد عمل أساسي على عمل غير أساسي توقف البناء. وإذا رُبط كونان دون ملاحظة تشرح السبب توقف البناء. وإذا نقصت مدة عمل توقف البناء بدل أن ينشر رقمًا خاطئًا بثقة.',
          },
        ],
        facts: [
          { label: { en: 'Titles in the graph', ar: 'عمل في الشبكة' }, value: '216' },
          { label: { en: 'Universes', ar: 'الأكوان' }, value: '8' },
        ],
      },
      {
        title: { en: 'Appearances are a join, not a list', ar: 'الظهور يُستخرج ولا يُكتب' },
        body: [
          {
            en: 'A character is in a title when the cast credits for the title name them. Nothing is typed twice, because the second copy of a fact rots. The matcher works on aliases and handles how credits are written in practice, such as Logan / Wolverine or Ted (Man-Thing). Whole segments are compared, never substrings. An earlier substring match put Vision in every title crediting the word Television. Two escape hatches exist, one for real uncredited appearances and one for a credit using the character\'s word for somebody else, and the second throws at build time the moment the exception stops being needed.',
            ar: 'تُعدّ الشخصية ظاهرة في عمل ما إذا ورد اسمها في قائمة ممثليه. لا يُكتب شيء مرتين، لأن النسخة الثانية من أي معلومة تتقادم مع الوقت. وأداة المطابقة تعرف الأسماء البديلة وتفهم الطريقة التي تُكتب بها القوائم فعلًا، مثل Logan / Wolverine أو Ted (Man-Thing). وتقارن الأسماء كاملة لا أجزاءً منها، بعد أن وضعت مطابقة جزئية قديمة Vision في كل عمل ورد فيه لفظ Television. ولا يوجد سوى استثناءين: أحدهما لظهور حقيقي لم يُذكر في القوائم، والآخر لاسم في القائمة يُقصد به شخص آخر، وهذا الأخير يوقف البناء تلقائيًا إذا لم يعد له داعٍ.',
          },
        ],
        facts: [
          { label: { en: 'Characters', ar: 'الشخصيات' }, value: '699' },
          { label: { en: 'Episodes', ar: 'الحلقات' }, value: '2,193' },
        ],
      },
      {
        title: { en: 'A ranking with no rank column', ar: 'ترتيب للقوة بلا رقم ترتيب' },
        body: [
          {
            en: 'All 699 characters sort by strength, and there is no powerRank field. The order is derived from species, mutant class, affiliation and each character\'s own power bullets, scored by a small vocabulary engine, with a hand-ordered head per tier where sources agree. Inserting a character never renumbers anyone. The lesson written into the code, more than once, is this: a bad rank is almost always a thin record or a word the scorer misreads, not a ranking bug. The tier documents are generated from the same definition, so they cannot disagree with the site.',
            ar: 'الشخصيات الـ699 كلها مرتبة حسب القوة، ومع ذلك لا يوجد حقل يحمل رقم ترتيب أي منها. الترتيب يُحسب من نوع الشخصية، ودرجة التحوّل، والانتماء، ونقاط القوة المذكورة في وصفها، عبر محرّك صغير يفهم المفردات، مع ترتيب يدوي لرأس كل درجة حيث تتفق المصادر. إضافة شخصية جديدة لا تغيّر رقم أحد. والدرس المكتوب في الشيفرة أكثر من مرة: إذا بدا ترتيب شخصية خاطئًا فالسبب في الغالب وصف ناقص أو كلمة أساء المحرّك فهمها، لا خلل في الترتيب نفسه. ووثائق الدرجات تُولَّد من التعريف ذاته، فلا يمكن أن تختلف عمّا في الموقع.',
          },
        ],
      },
      {
        title: { en: 'Images at zero cost', ar: 'صور بلا تكلفة' },
        body: [
          {
            en: '216 posters plus 699 portraits plus galleries used up Vercel\'s free image-optimisation quota. Past the quota the optimiser errors instead of degrading, so the deployed site lost most of its images while localhost looked perfect. The fix took Vercel out of the image path entirely. TMDB serves posters at a width written into the URL. One host of eighteen refuses hotlinking and goes through a free proxy. Everything else is used directly. A full crawl now makes zero billed requests.',
            ar: '216 ملصقًا و699 صورة شخصية ومعارض الصور استهلكت كلها حصة Vercel المجانية لمعالجة الصور. وحين تنفد الحصة لا تتراجع الخدمة بهدوء بل تعطّل الصور تمامًا، فاختفى معظمها من الموقع المنشور بينما كان كل شيء سليمًا على جهازي. كان الحل إخراج Vercel من مسار الصور نهائيًا: TMDB يقدّم الملصقات بالعرض المطلوب مكتوبًا في الرابط، ومضيف واحد من ثمانية عشر يرفض الربط المباشر فيمرّ عبر وسيط مجاني، وما عداه يُستخدم كما هو. تصفّح الموقع كاملًا الآن لا يُنتج طلبًا مدفوعًا واحدًا.',
          },
        ],
        facts: [{ label: { en: 'Billed image requests', ar: 'طلبات صور مدفوعة' }, value: '0' }],
      },
      {
        title: { en: 'Arabic done properly', ar: 'عربية تُكتب ولا تُترجم' },
        body: [
          {
            en: 'Full RTL layout with a self-hosted Arabic display face and body face. Western numerals by decision, because those are what GCC streaming and banking interfaces use. One test guards a fact most codebases learn the hard way: JavaScript\'s \\b and \\w are ASCII-only and fail open on Arabic text, which silently broke a season-label regex. Approximation is written with the Arabic word, not a tilde, because the tilde is bidi-neutral and lands on the wrong side of a Latin numeral inside an RTL paragraph.',
            ar: 'اتجاه كامل من اليمين إلى اليسار، وخط عربي للعناوين وآخر للنصوص، كلاهما مستضاف على الموقع نفسه. والأرقام غربية عن قصد، لأنها ما تعتمده تطبيقات البث والبنوك في الخليج. ويحرس اختبار واحد حقيقة يكتشفها معظم المطوّرين متأخرين: أن \\b و\\w في JavaScript لا تفهم إلا حروف ASCII وتمرّ على النص العربي كأنه لا شيء، وهو ما أفسد تعبيرًا يسمّي المواسم دون أن يلاحظ أحد. والتقريب يُكتب بكلمة «نحو» لا بعلامة ~، لأن العلامة لا اتجاه لها فتقع في الجهة الخطأ من الرقم داخل الفقرة العربية.',
          },
        ],
      },
      {
        title: { en: 'Tests named after the bug they caught', ar: 'اختبارات تحمل أسماء الأخطاء التي كشفتها' },
        body: [
          {
            en: 'The suite is documented by failure, not by coverage. A render test caught 130 pages rendering empty behind a green build. An end-to-end test caught the CSP blocking every script. A contrast test disproved the design brief\'s own claim about the brand red on dark: 4.04 to 1, not 4.5. A screenshot matrix of widths, themes and routes caught dark mode unrendered for four commits, and an Arabic runtime reading as 44 hours instead of 1h 44m.',
            ar: 'مجموعة الاختبارات موثّقة بما كشفته من أخطاء، لا بنسبة التغطية. اختبار عرض كشف 130 صفحة تظهر فارغة رغم نجاح البناء. واختبار شامل كشف أن سياسة أمان المحتوى تمنع كل السكربتات. واختبار تباين أثبت أن ما ادّعاه موجز التصميم عن الأحمر على الخلفية الداكنة غير صحيح: 4.04 إلى 1، لا 4.5. ومصفوفة لقطات شاشة تجمع العروض والسمات والمسارات كشفت أن الوضع الداكن لم يُعرض طوال أربعة إيداعات، وأن مدة عربية ظهرت 44 ساعة بدل ساعة و44 دقيقة.',
          },
        ],
        facts: [
          { label: { en: 'Unit tests', ar: 'اختبارات الوحدة' }, value: '321' },
          { label: { en: 'Browser tests', ar: 'اختبارات المتصفح' }, value: '55' },
        ],
      },
    ],
    // Real product captures from the live site, 1800px, dark is the site's
    // own default. Both themes ship because the homepage wall reads as a
    // cinema on black and a contact sheet on white, and a cover should show
    // the site the way most visitors meet it.
    cover: '/images/projects/the-thread-light.jpg',
    coverDark: '/images/projects/the-thread-dark.jpg',
    coverKind: 'screenshot',
    gallery: [
      '/images/projects/the-thread-path.jpg',
      '/images/projects/the-thread-characters.jpg',
      '/images/projects/the-thread-ar.jpg',
    ],
    links: [
      { label: 'Live site', href: 'https://the-thread-marvel.vercel.app', external: true },
      { label: 'Source', href: 'https://github.com/rworldx/the-thread', external: true },
    ],
  },
  {
    /**
     * Client work, and the only entry here that is. Live at kadi-hse.om and
     * still receiving change rounds.
     *
     * Everything below is checked against the repository and the live site on
     * 25 September 2026, not taken from its README, which is stale in five
     * places. The client's own docs say "twelve specialised engagements"; the
     * message catalogue holds eleven in both locales, so eleven is what this
     * says.
     *
     * Three standing restrictions. The repo is PRIVATE, so no source link.
     * The founder is not named, because an absent NDA is not permission. And
     * delivery of the contact form is described as built, never as proven:
     * confirming it would mean sending real mail to a real client.
     */
    slug: 'kadi-hse',
    featured: false,
    title: 'KADI HSE Consultancy',
    year: 2026,
    role: 'Client work · Design & Engineering',
    summary: {
      en: 'A bilingual English and Arabic site for KADI HSE Consultancy in Muscat. A buyer arrives from a tender shortlist or a WhatsApp link with about ten seconds to decide, so every section on the page earns its place or goes. Client work, live and still moving.',
      ar: 'موقع ثنائي اللغة لشركة كادي للاستشارات في الصحة والسلامة والبيئة بمسقط. يصل إليه المشتري من قائمة مناقصة أو من رابط في واتساب، ولا يملك سوى عشر ثوانٍ ليقرّر، فلا يبقى في الصفحة قسم لا يخدم ذلك القرار. عمل لعميل، منشور وما زال يتطوّر.',
    },
    problem: {
      en: 'Buyers judge a health and safety consultancy on trust before price, and they judge in seconds. The buyer is an operations manager checking a bidder, or an SME owner with an inspection coming, often reading Arabic on a phone on a poor connection. A site loading slowly, or rendering Arabic in a system font, has already answered the question.',
      ar: 'شركة الاستشارات في السلامة يُحكم عليها بالثقة قبل السعر، ويُحكم عليها في ثوانٍ. المشتري إما مدير عمليات يتحقق من مورّد قبل إدراجه، وإما صاحب منشأة صغيرة أمامه تفتيش قادم، وكثيرًا ما يقرأ بالعربية على هاتفه وباتصال ضعيف. والموقع الذي يتأخر في الظهور، أو يعرض العربية بخط النظام، يكون قد أجاب عن السؤال قبل أن يُطرح.',
    },
    solution: {
      en: 'One page per language, seven sections, and nothing on them beyond trust, clarity and the call. The Arabic is a second original, not a translation, set in the client\'s licensed typeface with layout mirrored properly. Contact runs through a form which validates on the server, rate limits by address and refuses to fake success, alongside WhatsApp, phone and the company profile as a download. Desktop Lighthouse scores 100 on the English page and 99 on the Arabic, and layout shift measured zero on every run.',
      ar: 'صفحة واحدة لكل لغة، وسبعة أقسام، ولا شيء فيها لا يخدم الثقة أو الوضوح أو المكالمة. والعربية نصّ أصلي لا ترجمة، بخطّ العميل المرخّص وبتخطيط معكوس كما ينبغي. أما التواصل فيمرّ عبر نموذج يتحقق من المُدخلات على الخادم، ويحدّ من التكرار حسب العنوان، ويرفض أن يدّعي النجاح، إلى جانب واتساب والهاتف وملف الشركة للتنزيل. ويسجّل لايتهاوس على سطح المكتب 100 للصفحة الإنجليزية و99 للعربية، بينما بقيت إزاحة التخطيط صفرًا في كل قياس.',
    },
    liveUrl: 'https://kadi-hse.om',
    stack: [
      'Next.js 15',
      'React 19',
      'TypeScript',
      'Tailwind CSS v4',
      'next-intl',
      'Framer Motion',
      'zod',
      'Resend',
      'Vitest',
      'Playwright',
      'Vercel',
    ],
    stats: [
      {
        label: { en: 'Lighthouse desktop performance, EN / AR', ar: 'أداء لايتهاوس على سطح المكتب، إنجليزي / عربي' },
        value: '100 / 99',
      },
      {
        label: { en: 'Layout shift, every Lighthouse run', ar: 'إزاحة التخطيط في كل قياس' },
        value: '0',
      },
      { label: { en: 'Unit tests', ar: 'اختبارات الوحدة' }, value: '141' },
      { label: { en: 'Contrast assertions', ar: 'فحوص التباين' }, value: '75' },
      { label: { en: 'Languages', ar: 'اللغتان' }, value: '2' },
      { label: { en: 'Build window', ar: 'مدة البناء الأولى' }, value: '15 days' },
    ],
    highlights: [
      {
        en: 'Two originals, not a page and its translation. The Arabic is written natively in professional MSA and set in the client\'s licensed Thmanyah Sans, self-hosted, with the layout mirrored, not flipped.',
        ar: 'نصّان أصليان، لا صفحة وترجمتها. العربية مكتوبة بلسان عربي فصيح، وبخط ثمانية المرخّص للعميل ومستضاف على الموقع نفسه، والتخطيط معكوس بعناية لا مقلوب.',
      },
      {
        en: 'Desktop Lighthouse 100 on the English page and 99 on the Arabic, mobile 92 to 94 and 87 to 88. Layout shift measured zero across all twelve runs.',
        ar: 'لايتهاوس على سطح المكتب 100 للصفحة الإنجليزية و99 للعربية، وعلى الهاتف من 92 إلى 94 ومن 87 إلى 88. وبقيت إزاحة التخطيط صفرًا في القياسات الاثني عشر كلها.',
      },
      {
        en: 'A contact route which refuses instead of pretending: server-side validation, five requests a minute per address, a honeypot, and a same-origin check. A failed send tells the visitor so, and offers a direct address.',
        ar: 'مسار تواصل يرفض ولا يتظاهر: تحقّق على الخادم، وخمسة طلبات في الدقيقة لكل عنوان، ومصيدة للبرامج الآلية، وفحص للمصدر. وإذا تعذّر الإرسال أخبر الزائر وأعطاه عنوانًا يراسله مباشرة.',
      },
      {
        en: '141 unit tests, of which 75 assert colour contrast, plus 558 browser tests across laptop, iPad and phone: 550 passing and 8 deliberately skipped.',
        ar: '141 اختبار وحدة، منها 75 لفحص تباين الألوان، إضافة إلى 558 اختبارًا في المتصفح على الحاسوب والآيباد والهاتف: ينجح 550 منها ويُستثنى 8 عن قصد.',
      },
      {
        en: 'Three-way theme control with dark as a designed composition, not an inversion, and no flash of the wrong theme on first paint.',
        ar: 'تحكّم ثلاثي بالمظهر، والوضع الداكن تصميم قائم بذاته لا قلب للألوان، ولا ومضة لمظهر خاطئ عند أول ظهور للصفحة.',
      },
      {
        en: 'The whole page works with JavaScript off, and the site is delivered under a per-request CSP nonce with HSTS preloaded.',
        ar: 'تعمل الصفحة كاملة مع تعطيل جافاسكربت، ويُقدَّم الموقع بسياسة أمان محتوى برمز يتغيّر مع كل طلب، مع تفعيل HSTS مسبقًا.',
      },
    ],
    chapters: [
      {
        title: { en: 'Ten seconds', ar: 'عشر ثوانٍ' },
        body: [
          {
            en: 'The brief set the whole design. A buyer lands here from a LinkedIn post, a WhatsApp link or a tender shortlist, and inside about ten seconds has to trust the company, understand the work, and be one tap from the founder. Everything on the page serves one of those three. Anything serving none of them does not belong.',
            ar: 'الموجز هو ما حدّد التصميم كله. يصل المشتري من منشور في لينكدإن أو رابط في واتساب أو قائمة مناقصة، وعليه خلال عشر ثوانٍ تقريبًا أن يثق بالشركة، ويفهم ما تقدّمه، ويصبح على بُعد نقرة واحدة من مؤسّسها. كل ما في الصفحة يخدم واحدًا من هذه الثلاثة، وما لا يخدم أيًّا منها لا مكان له.',
          },
          {
            en: 'The rule explains the absences more than the features. No content system, no blog, no carousel of testimonials. The rule also picks out which reader the engineering answers to. Of the three the site expects, one is an owner with an inspection coming, reading Arabic on a phone on a poor connection. The Arabic side is built as hard as the English because of them.',
            ar: 'وهذه القاعدة تفسّر ما غاب أكثر مما تفسّر ما حضر. لا نظام محتوى، ولا مدوّنة، ولا شريط شهادات عملاء. وتفسّر كذلك أيّ قارئ تخدمه الهندسة. فمن بين القرّاء الثلاثة الذين يتوقّعهم الموقع، واحد صاحب منشأة أمامه تفتيش، يقرأ بالعربية على هاتفه وباتصال ضعيف. وهذا القارئ هو سبب الجهد الذي بُذل في الجانب العربي.',
          },
        ],
      },
      {
        title: { en: 'The font was never downloading', ar: 'الخط لم يكن يُحمَّل أصلًا' },
        body: [
          {
            en: 'The font stack led with the Latin face for both languages, on the reasonable-sounding grounds of a browser resolving fallbacks one glyph at a time. Browsers do. The problem was the face they resolved through first.',
            ar: 'كانت قائمة الخطوط تبدأ بالخط اللاتيني في اللغتين معًا، استنادًا إلى فكرة تبدو سليمة: أن المتصفح يختار الخط البديل حرفًا بحرف. وهو يفعل ذلك بالفعل. لكن المشكلة في الخط الذي يمرّ عليه أولًا.',
          },
          {
            en: 'The metric-adjusted fallback sits on Arial, and Arial carries a complete Arabic. So every Arabic letter found a home before the stack ever reached Thmanyah, and the licensed typeface the client pays for was never requested at all. The Arabic site had been shipping in Arial while looking approximately right, which is the worst kind of bug: nothing is broken on screen and the thing you bought is simply absent.',
            ar: 'فالخط الاحتياطي المضبوط على المقاسات مبني على Arial، وArial يحمل عربية كاملة. فوجد كل حرف عربي مأواه قبل أن تصل القائمة إلى ثمانية أصلًا، ولم يُطلب الخط المرخّص الذي يدفع العميل ثمنه ولو مرة واحدة. كان الموقع العربي يُنشر بخط Arial وهو يبدو صحيحًا تقريبًا، وهذا أسوأ أنواع الأخطاء: لا شيء مكسور على الشاشة، والشيء الذي اشتريته غائب ببساطة.',
          },
          {
            en: 'The Arabic stack now leads with Thmanyah and is scoped to the Arabic document, so the single Arabic character on the language toggle never drags the face onto the English page. Anything holding the Latin voice is marked as English in the markup.',
            ar: 'صارت القائمة العربية تبدأ بثمانية، ومحصورة في المستند العربي، حتى لا يجرّ الحرف العربي الوحيد في زرّ تبديل اللغة الخطَّ كله إلى الصفحة الإنجليزية. وكل ما يجب أن يبقى بالصوت اللاتيني موسوم في الشيفرة بأنه إنجليزي.',
          },
        ],
      },
      {
        title: { en: 'The contrast suite disproved the review', ar: 'فحص التباين نقض ما أقرّته المراجعة' },
        body: [
          {
            en: 'Colour was being checked by eye and against a token table, which is how a dark-theme form border shipped at 2.90 to 1 and a footer outline at 2.60. The suite caught both, and settled something larger: the brand\'s own leaf green is 2.85 to 1 on white and will never carry text, whatever a brand guide says.',
            ar: 'كان فحص الألوان يجري بالعين وبجدول الرموز، وهكذا نُشر إطار حقل في الوضع الداكن بنسبة 2.90 إلى 1، وحدّ في التذييل بنسبة 2.60. وكشف الفحص الاثنين معًا. بل حسم ما هو أكبر: الأخضر في هوية العميل نسبته 2.85 إلى 1 على الأبيض، ولا يصلح لحمل نصّ مهما قال دليل الهوية.',
          },
          {
            en: 'So the palette split in two. One green draws shapes, a darker one at 5.33 to 1 carries words, and the single green panel on the site sets its text in deep navy, because white on the green is the same 2.85 an instinct for "green panel, white text" walks straight into.',
            ar: 'فانقسمت لوحة الألوان إلى اثنتين: أخضر يرسم الأشكال، وأغمق منه بنسبة 5.33 إلى 1 يحمل الكلمات، واللوح الأخضر الوحيد في الموقع يضع نصّه بالكحلي الغامق، لأن الأبيض على ذلك الأخضر هو النسبة 2.85 نفسها التي يقع فيها كل من يفكّر تلقائيًا في «لوح أخضر ونصّ أبيض».',
          },
          {
            en: 'The suite then found its own blind spot. Raw token pairs were being asserted, which is not what a reader sees, and a note at 65% opacity over a white button slipped a violation through the gap. Pairs now flatten their opacity and are asserted as the rendered colour, and the file reads the tokens out of the stylesheet itself, so editing a hex moves the assertion too.',
            ar: 'ثم كشف الفحص عيبًا في نفسه. كان يفحص أزواج الرموز كما هي، وهذا ليس ما يراه القارئ، فتسلّل خلل عبر ملاحظة بشفافية 65% فوق زرّ أبيض. صارت الأزواج الآن تُحسب بعد دمج الشفافية وتُفحص باللون كما يُعرض فعلًا، ويقرأ الملف الرموز من ملف الأنماط نفسه، فتغيير أي لون يحرّك الفحص معه.',
          },
        ],
        facts: [
          { label: { en: 'Contrast assertions', ar: 'فحوص التباين' }, value: '75' },
          { label: { en: 'Brand green on white', ar: 'أخضر الهوية على الأبيض' }, value: '2.85:1' },
        ],
      },
      {
        title: { en: 'A fixed sleep hid four failures', ar: 'تأخير ثابت أخفى أربعة إخفاقات' },
        body: [
          {
            en: 'Four accessibility tests failed on and off on the iPad and phone projects for weeks, and twice the evidence was destroyed by the hunt itself, because the test runner clears its results directory at the start of every run. When artefacts finally survived on a real CI machine, the message read: reveals never reached full opacity, for every element below the fold.',
            ar: 'ظلّت أربعة اختبارات للوصولية تفشل وتنجح بالتناوب على الآيباد والهاتف أسابيع، ومرّتين أتلف البحث دليله بنفسه، لأن منصّة الاختبار تمسح مجلد النتائج مع بداية كل تشغيل. وحين نجت الملفات أخيرًا على جهاز تكامل حقيقي، كانت الرسالة أن عناصر الظهور لم تبلغ كامل وضوحها، وذلك في كل عنصر أسفل الشاشة الأولى.',
          },
          {
            en: 'The audit walked the page in steps of 80% of a viewport and slept 120 milliseconds between them. Under load, 120 milliseconds is less than one rendered frame. An element might enter and leave the viewport between two observer checks, and because reveals fire once, the element stayed invisible for good. Failure came only on the slowest engine on the busiest machine, which is why the whole thing read as flakiness instead of a bug.',
            ar: 'كان الفحص يتنقّل في الصفحة بخطوات مقدارها 80% من ارتفاع الشاشة، وينتظر 120 جزءًا من الألف من الثانية بين خطوة وأخرى. وتحت الضغط تقلّ هذه المدة عن زمن إطار واحد معروض. فقد يدخل العنصر الشاشة ويخرج منها بين فحصين متتاليين، ولأن الظهور يحدث مرة واحدة فقط، يبقى مخفيًا إلى الأبد. ولم يكن يفشل إلا على أبطأ محرّك وأكثر الأجهزة انشغالًا، ولهذا بدا تذبذبًا لا خللًا.',
          },
          {
            en: 'The walk now waits for rendering instead of for time: two animation frames, then a zero-delay task, then half-viewport steps, and anything still hidden is scrolled to on its own. The record keeps the first fix too, which was wrong: polling one kind of element left six CSS animations completely uncovered.',
            ar: 'صار التنقّل ينتظر العرض لا الزمن: إطاران متتاليان، ثم مهمة بلا تأخير، ثم خطوات بنصف ارتفاع الشاشة، وما بقي مخفيًا يُنتقل إليه وحده. ويحتفظ السجلّ بالإصلاح الأول أيضًا، وكان خاطئًا: فقد فحص نوعًا واحدًا من العناصر وترك ست حركات مكتوبة بـ CSS دون تغطية.',
          },
        ],
      },
      {
        title: { en: 'A gate that measured the runner', ar: 'بوابة كانت تقيس الخادم لا الموقع' },
        body: [
          {
            en: 'Mobile Lighthouse assertions kept failing in CI. On code differing only in a test file, total blocking time read 250 milliseconds, then 318, then 362, then 845 across consecutive runs. The same page on an idle machine reads 10 to 30. The runner is a shared two-core machine, also hosting the server being measured, and its timings swung by nearly three times between back-to-back runs of identical code.',
            ar: 'ظلّت فحوص لايتهاوس للهاتف تفشل في التكامل المستمر. وعلى شيفرة لا تختلف إلا في ملف اختبار، سجّل زمن الحجب الكلي 250 جزءًا من الألف من الثانية، ثم 318، ثم 362، ثم 845 في تشغيلات متتالية. والصفحة نفسها على جهاز خامل تسجّل بين 10 و30. فالخادم جهاز بنواتين يتشاركه غيرنا، ويستضيف في الوقت نفسه الخادم الذي يجري قياسه، وتذبذبت قراءاته نحو ثلاثة أضعاف بين تشغيلين متتاليين لشيفرة واحدة.',
          },
          {
            en: 'So the signal moved instead of disappearing. The three processor-bound mobile checks became warnings, still measured and still reported. Desktop stays a hard gate. The structural mobile checks stay hard too, layout shift among them, because none of those depends on how many cores the machine has. A gate unable to tell a slower codebase from a busier neighbour is worse than no gate at all.',
            ar: 'فنُقلت الإشارة ولم تُلغَ. صارت الفحوص الثلاثة المرتبطة بالمعالج على الهاتف تنبيهات، لكنها ما زالت تُقاس وتُسجَّل. وبقيت فحوص سطح المكتب بوابة صارمة. وبقيت كذلك الفحوص البنيوية على الهاتف، ومنها إزاحة التخطيط، لأن أيًّا منها لا يتأثر بعدد أنوية الجهاز. فالبوابة التي لا تفرّق بين شيفرة صارت أبطأ وجهاز صار أكثر انشغالًا أسوأ من غياب البوابة.',
          },
        ],
      },
      {
        title: { en: 'Arabic written, not translated', ar: 'عربية تُكتب ولا تُترجم' },
        body: [
          {
            en: 'The English is the company\'s own profile text. The Arabic is written natively in professional MSA, which is why the two sides read as two originals, not as a document and its translation. The client, a native speaker, signed the Arabic off line by line and sent three rounds of corrections, one of them about punctuation. There has been no separate editorial pass.',
            ar: 'الإنجليزية نصّ الشركة من ملفها التعريفي. والعربية مكتوبة بلسان عربي فصيح، ولهذا يقرأ الجانبان كنصّين أصليين لا كوثيقة وترجمتها. وقد أقرّ العميل، وهو عربي، النصّ العربي سطرًا سطرًا، وأرسل ثلاث جولات من التصحيحات، إحداها عن علامات الترقيم. ولم يخضع النصّ لمراجعة تحريرية منفصلة.',
          },
          {
            en: 'Three corrections sit outside the utility layer so they outrank the utilities. Letter-spacing is forced to zero, because Arabic letters join and tracking pulls the joins apart into loose shapes. Capitalisation is disabled, because Arabic has no case. And the leading opens up while the display size steps down one notch, because a tight line height, assured in the Latin face, makes consecutive Arabic lines collide.',
            ar: 'وكان لا بدّ من ثلاثة تصحيحات خارج طبقة الأدوات لتتقدّم عليها. تباعد الحروف مضبوط على صفر، لأن الحروف العربية تتصل، والتباعد يفكّ وصلها فتتحوّل إلى أشكال متناثرة. وتحويل الحروف إلى كبيرة مُعطَّل، لأن العربية لا تعرف حالة الحرف. وفُتح تباعد الأسطر مع تخفيض حجم العناوين درجة واحدة، لأن تباعدًا ضيقًا يبدو واثقًا في الخط اللاتيني يجعل الأسطر العربية تتلامس.',
          },
          {
            en: 'The cost is named, not hidden. The Arabic page scores 87 to 88 on mobile against 92 to 94 for the English, and the gap is the licensed face on the path to first paint. Three alternatives were measured and each was worse. Loading the face for both languages taxes English readers for nothing, skipping the preload measured four seconds, and letting the browser drop the face renders an Arabic reader\'s first visit in a system font, which fails the brand and not the metric.',
            ar: 'والكلفة مذكورة لا مخفيّة. تسجّل الصفحة العربية على الهاتف بين 87 و88 مقابل 92 إلى 94 للإنجليزية، والفارق هو الخط المرخّص في طريق أول ظهور. وقيست ثلاثة بدائل فكان كل منها أسوأ: تحميله للّغتين معًا يحمّل القارئ الإنجليزي كلفة بلا مقابل، وتركه دون تحميل مسبق سجّل أربع ثوانٍ، والسماح للمتصفح بتجاوزه يعرض أول زيارة لقارئ عربي بخط النظام، وهذا فشل للهوية لا للمقياس.',
          },
        ],
      },
      {
        title: { en: 'Thirty-eight pixels of movement', ar: 'ثمانية وثلاثون بكسلًا من الحركة' },
        body: [
          {
            en: 'A client copy change lengthened the Arabic headline, and the line wrapped differently in the fallback face than in the real one. The swap moved the page 38 pixels, a layout shift of 0.0136, on a site whose whole claim is never moving. At exactly 390 pixels wide the buttons wrapped too, because the font was deciding where the line broke.',
            ar: 'أدّى تعديل من العميل إلى إطالة العنوان العربي، فصار يلتفّ في الخط الاحتياطي على نحو يختلف عن الخط الحقيقي. وعند التبديل تحرّكت الصفحة ثمانية وثلاثين بكسلًا، بإزاحة مقدارها 0.0136، في موقع كل دعواه أنه لا يتحرّك. وعند عرض 390 بكسلًا بالضبط التفّت الأزرار أيضًا، لأن الخط هو من كان يقرّر موضع كسر السطر.',
          },
          {
            en: 'The fix was a fallback face measured against the real one, weight by weight, so the two occupy the same space before and after the swap, and moving the buttons\' breakpoint off the width where the font was making the decision. Zero movement across sixteen combinations of width and language, tested with the web fonts blocked and again with them loaded.',
            ar: 'كان الحل خطًّا احتياطيًا مقيسًا على الخط الحقيقي، وزنًا بوزن، حتى يشغل الاثنان المساحة نفسها قبل التبديل وبعده، مع نقل نقطة كسر الأزرار بعيدًا عن العرض الذي كان الخط يقرّر عنده. فلم تعد هناك أي حركة في ست عشرة تركيبة من العروض واللغات، اختُبرت مرةً والخطوط محجوبة ومرةً وهي محمّلة.',
          },
        ],
        facts: [
          { label: { en: 'Shift before', ar: 'الإزاحة قبل' }, value: '0.0136' },
          { label: { en: 'Shift after', ar: 'الإزاحة بعد' }, value: '0' },
        ],
      },
    ],
    /*
     * The logo, the brand colours and the photographs are the client's and
     * were supplied. The composition, the type system, the dark theme and the
     * motion are not. Captures are of the live site; the contact frame has the
     * client's phone and email blurred, and no frame carries a project
     * photograph, because one of the four shows a third party's name and
     * mobile number on a notice board and the carousel cross-fades, so which
     * slide paints cannot be proven from outside.
     */
    cover: '/images/projects/kadi-light.jpg',
    coverDark: '/images/projects/kadi-dark.jpg',
    coverKind: 'screenshot',
    gallery: [
      '/images/projects/kadi-ar.jpg',
      '/images/projects/kadi-ar-phone.jpg',
      '/images/projects/kadi-why.jpg',
      '/images/projects/kadi-services.jpg',
      '/images/projects/kadi-services-ar.jpg',
      '/images/projects/kadi-contact.jpg',
    ],
    links: [{ label: 'Live site', href: 'https://kadi-hse.om', external: true }],
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
