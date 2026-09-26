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
      en: 'An end-to-end platform. A weighted score ranks every other student against you on seven things, shared subjects counting most, and returns the list in under a second. A low-latency real-time layer runs chat, voice and video study rooms with screen sharing. A Google Gemini-powered study assistant reads documents and images, answers by text or voice, and builds study plans and flashcards.',
      ar: 'منصة متكاملة. درجة مرجّحة ترتّب كل طالب آخر أمامك وفق سبعة أمور، أثقلها المواد المشتركة، وتعيد القائمة في أقل من ثانية. وطبقة لحظية منخفضة الكمون تشغّل المحادثة وغرف الدراسة الصوتية والمرئية مع مشاركة الشاشة. ومساعد دراسة مدعوم بـ Google Gemini يقرأ المستندات والصور، ويجيب نصًّا أو صوتًا، ويبني خطط المراجعة والبطاقات التعليمية.',
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
      { label: { en: 'Passing tests', ar: 'الاختبارات الناجحة' }, value: '139' },
      { label: { en: 'Match time', ar: 'زمن المطابقة' }, value: '< 1s' },
      { label: { en: 'Pilot satisfaction', ar: 'رضا المستخدمين' }, value: '86%' },
      { label: { en: 'AI improved study', ar: 'تحسّن أسلوب الدراسة' }, value: '95%' },
    ],
    highlights: [
      {
        en: 'Weighted matching, computed rather than generated. Every other student is scored on seven things: shared subjects, learning style, university, location, shared interests, age and language. Shared subjects count for the most. Academic level filters who appears, and forms no part of the score.',
        ar: 'مطابقة مرجّحة، محسوبة لا مولّدة. يُقاس كل طالب آخر وفق سبعة أمور: المواد المشتركة، وأسلوب الدراسة، والجامعة، والموقع، والاهتمامات المشتركة، والعمر، واللغة. والمواد المشتركة أثقلها وزنًا. أما المستوى الأكاديمي فيحدّد من يظهر، ولا يدخل في الدرجة.',
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
        en: 'Substantial architecture: 100+ REST endpoints, 100+ real-time socket events, 20 data models and 139 passing tests, 125 integration and 14 unit. Bilingual EN/AR, five themes, an installable PWA, and an automated Cloudinary media pipeline.',
        ar: 'بنية كبيرة: أكثر من 100 نقطة نهاية REST، وأكثر من 100 حدث لحظي، و20 نموذج بيانات، و139 اختبارًا ناجحًا، منها 125 تكامليًّا و14 اختبار وحدة. ثنائية اللغة (إنجليزي/عربي)، وخمسة سمات، وتطبيق ويب قابل للتثبيت (PWA)، وخط معالجة وسائط آلي عبر Cloudinary.',
      },
      {
        en: 'Validated in a 44-student pilot: 86% reported high satisfaction and 95% said the AI assistant improved how they study.',
        ar: 'جرى التحقّق منها في تجربة مع 44 طالبًا: 86٪ أبدوا رضًا عاليًا و95٪ قالوا إن المساعد الذكي حسّن طريقة دراستهم.',
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
        title: { en: 'Ranked, not filtered', ar: 'ترتيب لا تصفية' },
        body: [
          {
            en: 'A search box would have handed the work straight back to the student. Filter by subject, filter by year, and you are left looking at a hundred names with no idea which one to message.',
            ar: 'كان مربّع البحث سيعيد العبء إلى الطالب مباشرة. صفِّ حسب المادة، وصفِّ حسب السنة، فتجد أمامك مئة اسم دون أن تعرف أيّها تراسل.',
          },
          {
            en: 'So every other student is given a score against you, built from seven things: the subjects you share, your learning style, your university, where you are, the interests you share, your ages and your language. Shared subjects count for the most, because two people taking the same course have real work to share. Academic level decides who appears in the list at all, and deliberately counts for nothing in the score.',
            ar: 'فيُعطى كل طالب آخر درجةً أمامك، من سبعة أمور: المواد التي تشتركان فيها، وأسلوب دراستك، وجامعتك، وأين أنت، والاهتمامات المشتركة بينكما، والعمر، واللغة. والمواد المشتركة أثقلها وزنًا، لأن اثنين يدرسان المقرّر نفسه لديهما ما يفعلانه معًا فعلًا. أما المستوى الأكاديمي فيقرّر من يظهر في القائمة أصلًا، ولا يُحسب في الدرجة عن قصد.',
          },
          {
            en: 'No model is involved in the number, and the reason matters more than the technique. A score has to be explainable to the student who reads one. "You share three of four subjects and you both revise the same way" is something a person acts on. A number a model produced explains nothing, two students with identical profiles might be given different scores, and nobody would be able to say why.',
            ar: 'ولا يشارك أي نموذج ذكاء اصطناعي في هذا الرقم، والسبب أهمّ من الطريقة. فالدرجة يجب أن تكون قابلة للشرح للطالب الذي ينظر إليها. وعبارة «تشتركان في ثلاث مواد من أربع، وتراجعان بالأسلوب نفسه» شيء يستطيع الإنسان أن يبني عليه قرارًا. أما رقم يخرج من نموذج فلا يُشرح، وقد يحصل طالبان متطابقا الملف على رقمين مختلفين، ولا أحد يعرف لماذا.',
          },
        ],
        facts: [
          { label: { en: 'Things scored', ar: 'أمور تُحسب' }, value: '7' },
          { label: { en: 'Ranked results in', ar: 'نتائج مرتّبة خلال' }, value: '< 1s' },
        ],
      },
      {
        title: { en: 'Somewhere to actually work', ar: 'مكان للعمل فعلًا' },
        body: [
          {
            en: 'Putting two students in touch achieves nothing while they still have nowhere to go. So the match leads into a room: live chat, voice and video, screen sharing, and sessions somebody schedules in advance.',
            ar: 'لا يحقّق التعريف بين طالبين شيئًا إن لم يكن لديهما مكان يذهبان إليه. لذلك تقود المطابقة إلى غرفة: محادثة مباشرة، وصوت وصورة، ومشاركة شاشة، وجلسات يستطيع أحدهم جدولتها مسبقًا.',
          },
          {
            en: 'Rooms have a host, a co-host, participants and viewers, which is not administrative decoration. A study room stops working the moment a fifth person joins and nobody is able to mute anyone, remove anyone, or end the call. Someone needs the power to do so.',
            ar: 'وللغرف مضيف ومضيف مساعد ومشاركون ومشاهدون، وليس هذا ترتيبًا إداريًّا للزينة. فغرفة الدراسة تتوقّف عن العمل فور انضمام شخص خامس دون أن يقدر أحد على كتم أحد، أو إخراجه، أو إنهاء المكالمة. لا بدّ أن يقدر أحد على ذلك.',
          },
          {
            en: 'Most of the work went where nobody looks. When the host closes their laptop the room passes to the co-host who joined first, then to the earliest participant, and ends only when everyone has left. Every device reports in every fifteen seconds, and anyone who drops gets thirty seconds to come back into the same room rather than rejoining as a stranger.',
            ar: 'وأكثر الجهد ذهب إلى ما لا يراه أحد. فحين يغلق المضيف حاسوبه تنتقل الغرفة إلى المساعد الأسبق دخولًا، ثم إلى أوّل المشاركين، ولا تُغلق إلا حين يخرج الجميع. ويُبلّغ كل جهاز عن نفسه كل خمس عشرة ثانية، ومن ينقطع أمامه ثلاثون ثانية ليعود إلى الغرفة نفسها بدل أن يدخل كأنه غريب.',
          },
        ],
        facts: [
          { label: { en: 'Realtime events', ar: 'الأحداث اللحظية' }, value: '100+' },
          { label: { en: 'REST endpoints', ar: 'نقاط نهاية REST' }, value: '100+' },
        ],
      },
      {
        title: { en: 'Help where the student is stuck', ar: 'المساعدة حيث يتعثّر الطالب' },
        body: [
          {
            en: 'The study assistant is the one part of StudyNest using Gemini, and the only part which should.',
            ar: 'مساعد الدراسة هو الجزء الوحيد في StudyNest الذي يستخدم Gemini، والوحيد الذي ينبغي أن يستخدمه.',
          },
          {
            en: 'The assistant answers typed questions, reads the documents and images a student uploads, explains the contents, and replies by text or by voice. A course outline becomes a revision plan, or a set of flashcards.',
            ar: 'يجيب عن الأسئلة المكتوبة، ويقرأ كذلك المستندات والصور التي يرفعها الطالب، ويشرح ما فيها، ويردّ نصًّا أو صوتًا. ويحوّل مفردات المقرّر إلى خطة مراجعة، أو إلى بطاقات تعليمية.',
          },
          {
            en: 'Reading files rather than only questions matters because the missing thing was never information. A student stuck at eleven at night has the whole internet in front of them. What they lack is an answer about the page under their eyes, at the moment of looking.',
            ar: 'وسبب قراءته للملفات لا للأسئلة وحدها أن الناقص لم يكن المعلومة يومًا. فالطالب المتعثّر في الحادية عشرة ليلًا أمامه الإنترنت كله. الذي ليس أمامه جواب عن الصفحة التي ينظر إليها، في اللحظة التي ينظر فيها إليها.',
          },
        ],
      },
      {
        title: { en: 'What a student account holds', ar: 'ما الذي يحمله حساب الطالب' },
        body: [
          {
            en: 'A timetable. Coursework. Notes nobody else was meant to read. A phone number, and a face on a video call. The list is why the security work came first rather than after launch.',
            ar: 'جدول دراسي. وأعمال المقرّرات. وملاحظات لم يكن أحد غيره ليقرأها. ورقم هاتف، ووجه في مكالمة مرئية. هذه القائمة هي سبب تقديم العمل الأمني على غيره لا تأجيله إلى ما بعد الإطلاق.',
          },
          {
            en: 'Signing in uses JWT with refresh-token rotation, permissions follow the role someone holds in a room, and there is two-factor authentication and email confirmation. An access token lives fifteen minutes and a refresh token seven days, so a stolen one stays useful only briefly.',
            ar: 'تسجيل الدخول بـ JWT مع تدوير رموز التحديث، والصلاحيات تتبع دور الشخص في الغرفة، وهناك مصادقة بخطوتين وتأكيد للبريد. ويعيش رمز الوصول خمس عشرة دقيقة ورمز التحديث سبعة أيام، فلا يساوي المسروق منهما كثيرًا ولا يبقى طويلًا.',
          },
          {
            en: 'No account is ever deleted outright. The record is marked and left out of the checks enforcing uniqueness, so a student who leaves keeps the right to come back on the same email instead of losing the address forever. 139 tests cover the parts where a mistake costs something, 125 of them end to end and 14 on the scoring itself, across 20 data models.',
            ar: 'ولا يُحذف أي حساب حذفًا نهائيًّا. يُعلَّم السجل ويُستثنى من الفحوص التي تفرض التفرّد، فيحتفظ الطالب المغادر بحقّه في العودة بالبريد نفسه بدل أن يفقده إلى الأبد. ويغطّي 139 اختبارًا المواضع التي يكلّف الخطأ فيها شيئًا، منها 125 من طرف إلى طرف و14 على حساب الدرجة نفسها، عبر 20 نموذج بيانات.',
          },
        ],
        facts: [
          { label: { en: 'Passing tests', ar: 'الاختبارات الناجحة' }, value: '139' },
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
        title: { en: 'Where do I start?', ar: 'من أين أبدأ؟' },
        body: [
          {
            en: 'Marvel on screen is 216 films and series, made across decades by companies who each owned a different piece. Fox made the X-Men. Sony makes Spider-Man. Netflix made the Defenders. Blade came out before any of the modern run began. None were planned to sit in one order, because for most of those decades nobody expected them to meet.',
            ar: 'عالم مارفل على الشاشة 216 فيلمًا ومسلسلًا، صُنعت على مدى عقود لدى شركات ملك كلٌّ منها جزءًا مختلفًا منه. فوكس صنعت إكس-من. وسوني تصنع سبايدر-مان. ونتفليكس صنعت المدافعين. وبليد صدر قبل أن يبدأ هذا كله. ولم يُخطَّط لأيٍّ منها أن يقف في ترتيب واحد، لأن أحدًا لم يكن يتوقّع طوال معظم تلك المدة أن تلتقي.',
          },
          {
            en: 'The result is a mess for anyone who only wants to watch something. Pick a title and the honest question is what has to come first, and the honest answer runs through studios and decades a viewer has no reason to know about.',
            ar: 'والنتيجة فوضى لمن يريد أن يشاهد شيئًا فحسب. اختر أي عمل، والسؤال الصادق هو ما الذي يجب أن يسبقه، والجواب الصادق يمرّ عبر شركات وعقود لا سبب يدعو المشاهد لمعرفتها.',
          },
        ],
      },
      {
        title: { en: 'Every list is the same list', ar: 'كل القوائم قائمة واحدة' },
        body: [
          {
            en: 'Watch-order guides exist by the dozen. Every one of them is a single flat list, and every one of them is handed to two people who want opposite things.',
            ar: 'أدلة ترتيب المشاهدة موجودة بالعشرات. وكلها قائمة واحدة مسطّحة، وكلها تُقدَّم لشخصين يريدان أمرين متعاكسين.',
          },
          {
            en: 'One has watched none of the canon and wants somewhere to begin without signing up for two hundred hours. The other has watched plenty, wants one specific thing tonight, and only needs to know what has to come first. A single list serves the first badly and the second not at all.',
            ar: 'أحدهما لم يشاهد شيئًا ويريد نقطة يبدأ منها دون أن يلتزم بمئتي ساعة. والآخر شاهد الكثير، ويريد عملًا واحدًا الليلة، ولا يحتاج إلا أن يعرف ما الذي يسبقه. والقائمة الواحدة تخدم الأول بصعوبة ولا تخدم الثاني أبدًا.',
          },
        ],
      },
      {
        title: { en: 'Two doors', ar: 'بابان' },
        body: [
          {
            en: 'So the site has two entrances and asks which visitor you are. Someone starting gets the Infinity Saga: 23 films, about fifty hours, Iron Man through Far From Home. Someone who already knows what they want types the title and gets the path.',
            ar: 'فللموقع مدخلان، ويسألك أيّهما أنت. من يبدأ يحصل على ملحمة اللانهاية: 23 فيلمًا في نحو خمسين ساعة، من Iron Man إلى Far From Home. ومن يعرف ما يريد يكتب اسم العمل فيحصل على المسار إليه.',
          },
          {
            en: 'The paths are not short. Doomsday works out to 93 titles. No Way Home reaches sideways into five Sony Spider-Man films, and the page says why the detour exists rather than leaving a viewer to wonder what those films are doing there.',
            ar: 'والمسارات ليست قصيرة. فـ Doomsday يخرج في 93 عملًا. وNo Way Home يمتدّ جانبًا إلى خمسة أفلام سبايدر-مان من سوني، وتشرح الصفحة سبب هذه الانعطافة بدل أن تترك المشاهد يتساءل ما شأن تلك الأفلام هنا.',
          },
        ],
        facts: [
          { label: { en: 'Films to start with', ar: 'أفلام البداية' }, value: '23' },
          { label: { en: 'Path to Doomsday', ar: 'المسار إلى Doomsday' }, value: '93' },
        ],
      },
      {
        title: { en: 'A map, not a list', ar: 'خريطة لا قائمة' },
        body: [
          {
            en: 'Nothing on the site is a written-out order. What gets stored is smaller and duller: for each title, which titles have to come first. Everything a visitor sees is worked out from one map. Release order, the beginner spine, each universe\'s own story order, the path to any single title.',
            ar: 'لا شيء في الموقع ترتيب مكتوب. فالمحفوظ أصغر من ذلك وأقلّ إثارة: لكل عمل، ما الأعمال التي يجب أن تسبقه. وكل ما يراه الزائر مستخرج من هذه الخريطة الواحدة: ترتيب العرض، وقائمة البداية، والترتيب القصصي لكل كون، والمسار إلى أي عمل بعينه.',
          },
          {
            en: 'Three kinds of link are kept apart on purpose, because they mean different things. What you must watch first. What is worth watching first. And a reading order somebody chose inside one universe, which is a recommendation and must never be stored as a requirement.',
            ar: 'وتُحفظ ثلاثة أنواع من الروابط منفصلة عن قصد، لأن معانيها مختلفة: ما يجب أن تشاهده أولًا، وما يُستحسن أن تشاهده أولًا، وترتيب قراءة اختاره أحدهم داخل كون واحد، وهو توصية ولا يجوز أن يُحفظ كأنه شرط.',
          },
          {
            en: 'The map checks itself before anything is published. If two titles each claim to come first, the build stops and prints the loop as the actual route round both, rather than saying a loop exists. A beginner title depending on a non-beginner one stops the build too, and so does a jump between universes with no note explaining the jump.',
            ar: 'وتفحص الخريطة نفسها قبل نشر أي شيء. فإذا ادّعى عملان أن كلًّا منهما يسبق الآخر توقّف البناء وطبع الحلقة كمسار كامل يدور بينهما، لا كإشعار بوجود حلقة. ويتوقّف البناء كذلك إن اعتمد عمل من قائمة البداية على عمل خارجها، وإن وُجدت قفزة بين كونين بلا ملاحظة تشرحها.',
          },
        ],
        facts: [
          { label: { en: 'Titles in the map', ar: 'أعمال في الخريطة' }, value: '216' },
          { label: { en: 'Universes', ar: 'الأكوان' }, value: '8' },
        ],
      },
      {
        title: { en: '699 characters, and nobody typed them in', ar: '699 شخصية لم تُدخَل يدويًا' },
        body: [
          {
            en: 'A character counts as appearing in a title when the cast list names them. Nothing is written down twice, because the second copy of any fact goes stale the moment the first one changes.',
            ar: 'تُعدّ الشخصية ظاهرة في عمل ما حين تذكرها قائمة ممثليه. ولا يُكتب شيء مرتين، لأن النسخة الثانية من أي معلومة تتقادم لحظة تغيّر الأولى.',
          },
          {
            en: 'Cast lists are written by people, so the matching has to cope with how people write. Logan / Wolverine. Ted (Man-Thing). Whole names are compared, never fragments, after an earlier version compared fragments and quietly put Vision in every title whose credits contained the word Television.',
            ar: 'وقوائم الممثلين يكتبها بشر، فكان على المطابقة أن تتحمّل طريقة البشر في الكتابة: Logan / Wolverine، وTed (Man-Thing). وهي تقارن الأسماء كاملة ولا تقارن أجزاءها، بعد أن قارنت نسخة سابقة الأجزاء فوضعت Vision بهدوء في كل عمل ورد في قوائمه لفظ Television.',
          },
          {
            en: 'The same idea runs the strength ranking. All 699 characters sort from strongest down, and no rank is stored against any of them. The order falls out of what each record already says: species, mutant class, who they run with, and the words used to describe what they do. Adding a character renumbers nobody. When a rank looks wrong the cause is almost always a thin record or a word the scorer read the wrong way, not the ranking itself.',
            ar: 'والفكرة نفسها تدير ترتيب القوة. تُفرز الشخصيات الـ699 من الأقوى نزولًا، ولا يُحفظ لأيٍّ منها رقم ترتيب. فالترتيب ينبثق ممّا يقوله سجلّ كل شخصية أصلًا: نوعها، ودرجة تحوّلها، ومع من تقف، والكلمات التي تصف ما تفعله. وإضافة شخصية لا تعيد ترقيم أحد. وحين يبدو ترتيب خاطئًا فالسبب في الغالب سجلّ ناقص أو كلمة قرأها المحرّك على غير وجهها، لا الترتيب نفسه.',
          },
        ],
        facts: [
          { label: { en: 'Characters', ar: 'الشخصيات' }, value: '699' },
          { label: { en: 'Episodes', ar: 'الحلقات' }, value: '2,193' },
        ],
      },
      {
        title: { en: 'Arabic, and what breaks in it', ar: 'العربية وما ينكسر فيها' },
        body: [
          {
            en: 'The whole site runs in Arabic as well, laid out right to left, with its own Arabic typefaces served from the site rather than borrowed from the phone. Numbers stay Western, because streaming apps and banks in the Gulf use Western numbers.',
            ar: 'الموقع كله يعمل بالعربية أيضًا، بتخطيط من اليمين إلى اليسار، وبخطوط عربية خاصة به مستضافة عليه لا مستعارة من الهاتف. وتبقى الأرقام غربية، لأن هذا ما تستخدمه تطبيقات البثّ والبنوك في الخليج فعلًا.',
          },
          {
            en: 'One fault is worth knowing about, because most codebases meet the same one late. The shorthand JavaScript offers for finding word boundaries only understands English letters. Point the shorthand at Arabic and nothing matches, no error is reported, and the wrong thing happens quietly. The pattern reading season labels had been broken for a while, and nothing had complained.',
            ar: 'وخللٌ واحد يستحق المعرفة لأن معظم المشاريع تلتقيه متأخرة. فالاختصار الذي تقدّمه جافاسكربت لإيجاد حدود الكلمات لا يفهم إلا الحروف الإنجليزية. وجّهه إلى العربية فلا يطابق شيئًا، ولا يعلن خطأ، ويفعل الخطأ بصمت. وقد كسر النمط الذي يقرأ تسميات المواسم، ولم يشتكِ أحد.',
          },
          {
            en: 'Approximate runtimes are written with the Arabic word for about rather than the tilde, because the tilde has no direction of its own and lands on the wrong side of a Latin number inside an Arabic sentence. The Arabic renders on every page and has not been read by an editor yet, so those pages are kept out of search results until someone has.',
            ar: 'وتُكتب المدد التقريبية بكلمة «نحو» لا بعلامة ~، لأن العلامة لا اتجاه لها فتقع في الجهة الخطأ من رقم لاتيني داخل جملة عربية. والعربية تعمل في كل صفحة ولم يقرأها محرّر بعد، فتُستبعد تلك الصفحات من نتائج البحث حتى تُقرأ.',
          },
        ],
      },
      {
        title: { en: 'The bill nobody expects', ar: 'فاتورة لم يتوقّعها أحد' },
        body: [
          {
            en: '216 posters, 699 portraits and the galleries behind them added up to more image processing than the free allowance covers. Past the allowance the service does not quietly serve a lower quality. The service returns an error. So the published site lost most of its pictures while the copy on my own machine looked perfect, which is the worst way to find out.',
            ar: '216 ملصقًا و699 صورة شخصية والمعارض خلفها، بلغت مجتمعةً من معالجة الصور أكثر ممّا تغطّيه الحصة المجانية. وبعد تجاوز الحصة لا تكتفي الخدمة بتقديم جودة أقلّ بهدوء، بل تُرجع خطأ. فخسر الموقع المنشور معظم صوره بينما بدت النسخة على جهازي سليمة تمامًا، وهذه أسوأ طريقة لاكتشاف الأمر.',
          },
          {
            en: 'Spending less afterwards gives nothing back, so the answer was dropping the service for images altogether. The film database already serves each poster at whatever width the address asks for, so the address now asks for the right one. One picture host out of eighteen refuses to be linked to directly and goes through a free go-between. Everything else is used unchanged. Crawling the entire site now costs nothing at all.',
            ar: 'والإنفاق الأقلّ بعد ذلك لا يعيد شيئًا، فكان الحل ألا نستخدم الخدمة للصور أصلًا. فقاعدة بيانات الأفلام تقدّم كل ملصق بالعرض المطلوب في الرابط، فصار الرابط يطلب العرض الصحيح. ومضيف صور واحد من ثمانية عشر يرفض الربط المباشر فيمرّ عبر وسيط مجاني. وما عداه يُستخدم كما هو. وزحف الموقع كاملًا الآن لا يكلّف شيئًا على الإطلاق.',
          },
        ],
        facts: [{ label: { en: 'Billed image requests', ar: 'طلبات صور مدفوعة' }, value: '0' }],
      },
      {
        title: { en: 'Where it stands', ar: 'أين وصل الآن' },
        body: [
          {
            en: 'The site is live, and all 1,893 pages are built before anyone visits. While someone is browsing, nothing is fetched from an outside service, and no image request is billed.',
            ar: 'الموقع منشور، وصفحاته الـ1,893 كلها مبنية قبل أن يزورها أحد. وأثناء استخدامه لا يُجلب شيء من خدمة خارجية، ولا يُحتسب أي طلب صورة.',
          },
          {
            en: 'The tests are named after the faults they found rather than the code they cover. The most useful one caught 130 pages rendering completely blank behind a build reporting success, which is exactly the kind of failure nobody goes looking for.',
            ar: 'والاختبارات تحمل أسماء الأخطاء التي وجدتها لا أسماء الشيفرة التي تغطّيها. وأنفعها كشف 130 صفحة تُعرض فارغة تمامًا خلف بناء أعلن نجاحه، وهذا بالضبط نوع الإخفاق الذي لا يبحث عنه أحد.',
          },
          {
            en: 'The Arabic works everywhere and is still waiting on an editor. And this is an independent fan project, not affiliated with or endorsed by Marvel Studios, Disney, Sony or 20th Century Studios.',
            ar: 'والعربية تعمل في كل مكان وما زالت تنتظر محرّرًا. وهذا مشروع مستقل من صنع أحد المعجبين، لا يرتبط بمارفل ستوديوز أو ديزني أو سوني أو 20th Century Studios ولا يحظى بموافقتها.',
          },
        ],
        facts: [
          { label: { en: 'Static pages', ar: 'الصفحات الثابتة' }, value: '1,893' },
          { label: { en: 'Unit tests', ar: 'اختبارات الوحدة' }, value: '321' },
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
      ar: 'يُحكم على شركة استشارات السلامة بالثقة قبل السعر، ويُحكم عليها في ثوانٍ. المشتري إما مدير عمليات يتحقق من مورّد قبل إدراجه، وإما صاحب منشأة صغيرة أمامه تفتيش قادم، وكثيرًا ما يقرأ بالعربية على هاتفه وباتصال ضعيف. والموقع الذي يتأخر في الظهور، أو يعرض العربية بخط النظام، يكون قد أجاب عن السؤال قبل أن يُطرح.',
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
        title: { en: 'The consultancy', ar: 'الشركة' },
        body: [
          {
            en: 'KADI is a health and safety consultancy in Muscat. Companies call them when an inspection is coming, or when a site has grown past the point where safety fits in somebody\'s head. The work is not writing a folder of documents. The work is making safety rules hold on a real site, with real people, on a real shift.',
            ar: 'كادي شركة استشارات في الصحة والسلامة بمسقط. تتصل بها الشركات حين يقترب موعد تفتيش، أو حين يكبر الموقع فلا تعود السلامة شيئًا يُحفظ في رأس أحدهم. والعمل ليس كتابة ملف من الوثائق، بل جعل قواعد السلامة تصمد في موقع حقيقي، مع أناس حقيقيين، في وردية حقيقية.',
          },
        ],
      },
      {
        title: { en: 'Ten seconds', ar: 'عشر ثوانٍ' },
        body: [
          {
            en: 'Before this site, KADI had only an Instagram account. A company wanting to know what KADI does had to find the account, send a WhatsApp message, and wait for the company profile to come back as a PDF. A long road for a buyer who decides in seconds.',
            ar: 'قبل هذا الموقع لم يكن لكادي سوى حساب في إنستغرام. فالشركة التي تريد أن تعرف ما تقدّمه كادي عليها أن تجد الحساب، وترسل رسالة على واتساب، وتنتظر وصول الملف التعريفي بصيغة PDF. وهذا طريق طويل لمشترٍ يحسم أمره في ثوانٍ.',
          },
          {
            en: 'And the buyer is usually on a phone. Sometimes an operations manager checking a name before adding the company to a bidder list. Sometimes an owner of a small business with an inspection on the way. Often reading Arabic, often on a weak connection. Ten seconds to decide whether this company is worth a call.',
            ar: 'والمشتري غالبًا على هاتفه. قد يكون مدير عمليات يتحقّق من اسم قبل إدراجه في قائمة الموردين، وقد يكون صاحب منشأة صغيرة أمامه تفتيش قادم. وكثيرًا ما يقرأ بالعربية، وكثيرًا ما يكون اتصاله ضعيفًا. عشر ثوانٍ يقرّر فيها هل تستحق هذه الشركة مكالمة.',
          },
        ],
      },
      {
        title: { en: 'One page, one job', ar: 'صفحة واحدة، مهمة واحدة' },
        body: [
          {
            en: 'So the site is one page in each language, and every part does one of three things: build trust, explain the work, or put the visitor a tap away from the founder. A section doing none of those was left out.',
            ar: 'فصار الموقع صفحة واحدة بكل لغة، وكل جزء فيها يؤدّي واحدًا من ثلاثة: يبني الثقة، أو يشرح العمل، أو يضع الزائر على بُعد نقرة من المؤسّس. وما لم يفعل أيًّا من ذلك حُذف.',
          },
          {
            en: 'So there is no blog, no news feed, no wall of client logos and no page counting years in business. Each would be one more thing between a buyer and the phone. What is left is short enough to read while standing on a site.',
            ar: 'ولهذا لا مدوّنة فيه، ولا أخبار، ولا جدار شعارات عملاء، ولا صفحة تعدّ سنوات الخبرة. كل واحد من هذه يضع حاجزًا إضافيًا بين المشتري والهاتف. وما بقي قصير بما يكفي لقراءته على الهاتف وأنت واقف في موقع.',
          },
        ],
      },
      {
        title: { en: 'Arabic as a first language', ar: 'العربية لغة أولى' },
        body: [
          {
            en: 'The Arabic side is not the English side translated. The Arabic was written as Arabic, and the client, an Arabic speaker, read and approved every line, sending three rounds of corrections along the way. One round was about a single punctuation mark, which says how closely the client read.',
            ar: 'الجانب العربي ليس ترجمة للجانب الإنجليزي. كُتب عربيًّا من البداية، وقرأه العميل، وهو عربي، وأقرّه سطرًا سطرًا، وأرسل في الطريق ثلاث جولات من التصحيحات. وكانت إحداها عن علامة ترقيم واحدة، وهذا وحده يقول كم كانت القراءة دقيقة.',
          },
          {
            en: 'The Arabic also has its own typeface, licensed for the client and served from the site rather than borrowed from whatever the phone happens to have. Arabic set in a system font looks like a page nobody finished, and a safety consultancy must not look unfinished.',
            ar: 'وله خطّه الخاص، مرخّص للعميل ومستضاف على الموقع نفسه لا مستعارًا مما يصادف وجوده في الهاتف. فالعربية بخط النظام تبدو صفحة لم يكملها أحد، وشركة استشارات في السلامة لا تحتمل أن تبدو ناقصة.',
          },
        ],
        image: { src: '/images/projects/kadi-ar.jpg', dark: '/images/projects/kadi-ar-dark.jpg', alt: { en: 'The KADI homepage in Arabic, laid out right to left', ar: 'الصفحة الرئيسية لكادي بالعربية، بتخطيط من اليمين إلى اليسار' } },
      },
      {
        title: { en: 'One tap to the founder', ar: 'نقرة واحدة إلى المؤسّس' },
        body: [
          {
            en: 'Everything the site is for ends here. Phone, WhatsApp, email, a short form, and the company profile as a download, ready to forward to whoever signs. The form checks what is typed before sending, and if the mail service is unavailable the page says so and gives the address instead of pretending the message went through.',
            ar: 'كل ما وُجد الموقع من أجله ينتهي هنا. هاتف، وواتساب، وبريد، ونموذج قصير، والملف التعريفي للتنزيل ليرسله المشتري إلى من يوقّع. ويتحقّق النموذج ممّا كُتب قبل الإرسال، وإن تعذّر عمل خدمة البريد قال ذلك وأعطى العنوان بدل أن يوهمك بأن الرسالة وصلت.',
          },
          {
            en: 'The WhatsApp button took two attempts. The first version opened a link in a new tab, and on the client\'s own iPhone the link showed a web page instead of the chat. Now the button asks for the app first and falls back to the web only after a moment of silence. A small thing, and it decides whether the most important button on the site works on the phone the client actually carries.',
            ar: 'أما زرّ واتساب فاحتاج محاولتين. كانت النسخة الأولى تفتح رابطًا في تبويب جديد، فظهرت على آيفون العميل نفسه صفحة ويب بدل المحادثة. صار الزرّ الآن يطلب التطبيق أولًا، ولا يلجأ إلى الويب إلا بعد لحظة صمت. تفصيل صغير يقرّر هل يعمل أهمّ زرّ في الموقع على الهاتف الذي يستخدمه العميل.',
          },
        ],
        image: { src: '/images/projects/kadi-contact.jpg', dark: '/images/projects/kadi-contact-dark.jpg', alt: { en: 'The contact section: form, WhatsApp, phone and the profile download', ar: 'قسم التواصل: النموذج وواتساب والهاتف وتنزيل الملف التعريفي' } },
      },
      {
        title: { en: 'What you do not see', ar: 'ما لا تراه' },
        body: [
          {
            en: 'Two faults turned up which no visitor would ever have reported, because neither looked like a fault.',
            ar: 'اكتُشف خللان ما كان زائر ليبلّغ عن أيٍّ منهما، لأن أيًّا منهما لم يكن يبدو خللًا.',
          },
          {
            en: 'The first was the Arabic typeface. The page looked right, so nobody questioned the page, but the browser was quietly reaching a system font first and finding every Arabic letter needed there. The licensed face the client pays for was never fetched at all. Nothing was broken on screen. The thing bought was simply absent.',
            ar: 'الأول كان الخطّ العربي. بدت الصفحة صحيحة فلم يشكّ أحد، بينما كان المتصفّح يصل بهدوء إلى خط النظام أولًا فيجد فيه كل حرف عربي يحتاجه. أما الخط المرخّص الذي يدفع العميل ثمنه فلم يكن يُطلب أصلًا. لا شيء مكسور على الشاشة، والشيء الذي اشتُري غائب ببساطة.',
          },
          {
            en: 'The second was the green in the client\'s brand. A good green for a shape, and too pale to carry words: put text in the green and a reader with ordinary eyesight has to work. So the palette now has two greens. One draws, the other writes. The single green panel on the site sets its text in deep navy, because white on the same green fails the same test.',
            ar: 'والثاني كان الأخضر في هوية العميل. أخضر جيّد للأشكال وفاتح أكثر من أن يحمل كلمات: ضع فيه نصًّا يجهد القارئ العادي في قراءته. فصار في اللوحة أخضران: واحد يرسم وآخر يكتب. واللوح الأخضر الوحيد في الموقع يضع نصّه بالكحلي الغامق، لأن الأبيض على ذلك الأخضر يسقط في الاختبار نفسه.',
          },
        ],
        image: { src: '/images/projects/kadi-why.jpg', dark: '/images/projects/kadi-why-dark.jpg', alt: { en: 'The one green panel on the site, its text set in deep navy', ar: 'اللوح الأخضر الوحيد في الموقع، ونصّه بالكحلي الغامق' } },
      },
      {
        title: { en: 'Where it stands', ar: 'أين وصل الآن' },
        body: [
          {
            en: 'The site is live at kadi-hse.om. On a desktop the English page scores full marks for speed, accessibility, good practice and search readiness, and the Arabic page one point below. Nothing on the page moves while loading, in any measurement taken.',
            ar: 'الموقع منشور على kadi-hse.om. وعلى سطح المكتب يحصد العلامة الكاملة في السرعة وإتاحة الوصول والممارسات السليمة والجاهزية لمحركات البحث في الصفحة الإنجليزية، وأقلّ منها بنقطة في العربية. ولا يتحرّك شيء في الصفحة أثناء تحميلها في أي قياس أُخذ.',
          },
          {
            en: 'The site is not finished, which is the normal condition of client work rather than a fault. Change rounds are still arriving, the most recent replacing photographs three days after the site moved to its own domain.',
            ar: 'وليس منتهيًا، وهذه حال موقع العميل الطبيعية لا عيبًا فيه. فجولات التعديل ما زالت تصل، وآخرها استبدل صورًا بعد ثلاثة أيام من انتقال الموقع إلى نطاقه الخاص.',
          },
        ],
        facts: [
          { label: { en: 'Lighthouse desktop, EN / AR', ar: 'لايتهاوس سطح المكتب، إنجليزي / عربي' }, value: '100 / 99' },
          { label: { en: 'Layout shift', ar: 'إزاحة التخطيط' }, value: '0' },
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
     * Client work. Live at modernsupply.om, with the client still entering
     * prices and stock, so the catalogue is not yet trading.
     *
     * Checked against the repository, the live site and a read-only aggregate
     * query on 25 September 2026. The aggregates counted rows and nothing
     * else: no customer field was ever selected. The database holds zero
     * orders today, which is why this entry claims nothing about customers,
     * volume, revenue or traffic, and why no route that would render an order
     * is screenshotted.
     *
     * The catalogue is 654 packs across FIVE brand catalogues, not seven. Two
     * of the seven brands have no catalogue at all. The README says otherwise
     * in places; the data wins.
     *
     * The repo is private, so no source link.
     */
    slug: 'modern-supply',
    featured: false,
    title: 'Modern Supply',
    year: 2026,
    role: 'Client work · Design & Engineering',
    summary: {
      en: 'A bilingual storefront and admin console for Modern Supply, an F&B ingredients distributor in Oman. Customers browse 654 packs across five brand catalogues, build one cart, and an order is saved with a tracking number before the branch picks the order up on WhatsApp. Client work, live, with the catalogue still being priced.',
      ar: 'متجر ولوحة تحكم بلغتين لشركة الإمداد العصري، الموزّعة لمكوّنات الأغذية والمشروبات في عُمان. يتصفّح العميل 654 عبوة من خمس قوائم لعلامات مختلفة، ويجمعها في سلّة واحدة، فيُحفظ الطلب برقم تتبّع قبل أن يستلمه الفرع على واتساب. عمل لعميل، منشور، والقائمة ما زالت قيد التسعير.',
    },
    problem: {
      en: 'A distributor with seven brands took orders by WhatsApp, one conversation at a time, with no catalogue for a customer to read and no record for a branch to look up afterwards. The question was never whether to replace WhatsApp. Cafes and restaurants order by message and will carry on. The question was what has to happen before the message is sent.',
      ar: 'كانت الشركة تستقبل طلباتها عبر واتساب، محادثةً محادثة، بلا قائمة يقرؤها العميل ولا سجلّ يعود إليه الفرع بعد ذلك. ولم يكن السؤال يومًا هل نستغني عن واتساب. فالمقاهي والمطاعم تطلب بهذه الطريقة وستبقى. السؤال كان: ما الذي يجب أن يحدث قبل إرسال الرسالة.',
    },
    solution: {
      en: 'The site puts a catalogue and a record in front of the message. A customer browses five brand catalogues, fills one cart across all of them, and the order reaches the database first: a tracking number, prices frozen at the moment of ordering, stock taken under a condition so two people never both take the last unit. Only then does WhatsApp open, pre-filled, to the fulfilling branch. Staff work the same order from an admin console covering status, stock, prices, discounts and delivery fees.',
      ar: 'يضع الموقع قائمةً وسجلًّا قبل الرسالة. يتصفّح العميل خمس قوائم لعلامات مختلفة، ويملأ منها سلّة واحدة، فيُكتب الطلب في قاعدة البيانات أولًا: رقم تتبّع، وأسعار مثبّتة لحظة الطلب، ومخزون يُخصم بشرط يمنع أن يأخذ شخصان آخر وحدة معًا. وعندها فقط يُفتح واتساب برسالة جاهزة إلى الفرع الذي سينفّذ الطلب. ويتابع الموظفون الطلب نفسه من لوحة تحكّم تضبط الحالة والمخزون والأسعار والخصومات ورسوم التوصيل.',
    },
    liveUrl: 'https://modernsupply.om',
    stack: [
      'Next.js 16',
      'React 19',
      'TypeScript',
      'Tailwind CSS',
      'Prisma',
      'PostgreSQL',
      'zod',
      'Vitest',
      'Vercel',
    ],
    stats: [
      { label: { en: 'Products', ar: 'العبوات' }, value: '654' },
      { label: { en: 'Brand catalogues', ar: 'قوائم العلامات' }, value: '5' },
      { label: { en: 'Languages', ar: 'اللغتان' }, value: '2' },
      { label: { en: 'Unit tests', ar: 'اختبارات الوحدة' }, value: '119' },
      {
        label: { en: 'Governorates / wilayats', ar: 'المحافظات / الولايات' },
        value: '11 / 61',
      },
    ],
    highlights: [
      {
        en: 'One cart across five brand catalogues. The cart holds ids and quantities, never prices, and the server re-reads every price when the order is placed.',
        ar: 'سلّة واحدة تجمع خمس قوائم لعلامات مختلفة. تحفظ السلّة المعرّفات والكميات فقط لا الأسعار، ويعيد الخادم قراءة كل سعر عند تسجيل الطلب.',
      },
      {
        en: 'An order becomes a database row before becoming a message: a tracking number, frozen line prices, and stock taken under a condition, all inside one transaction.',
        ar: 'الطلب سجلّ في قاعدة البيانات قبل أن يكون رسالة: رقم تتبّع، وأسعار مثبّتة لكل سطر، ومخزون يُخصم بشرط، وكل ذلك داخل عملية واحدة.',
      },
      {
        en: 'An admin console over the same data: order status, payment, delivery company and fee, stock, prices, discounts scoped to a product, category, brand or everything, and a fee per governorate.',
        ar: 'لوحة تحكّم على البيانات نفسها: حالة الطلب، والدفع، وشركة التوصيل ورسومها، والمخزون، والأسعار، وخصومات تُحدَّد لمنتج أو فئة أو علامة أو للجميع، ورسم توصيل لكل محافظة.',
      },
      {
        en: 'Cash on delivery when every line is priced and the governorate has a fee. Otherwise the order is saved as a quote request, with its tracking number, and the branch confirms the total.',
        ar: 'الدفع عند الاستلام حين تكون كل الأسطر مسعّرة وللمحافظة رسم توصيل. وإن لم يكتمل ذلك يُحفظ الطلب طلبَ عرض سعر برقم تتبّعه، ويؤكّد الفرع المبلغ.',
      },
      {
        en: 'English and Arabic throughout, storefront and admin, with right-to-left layout written in logical properties rather than mirrored by hand.',
        ar: 'بالعربية والإنجليزية في كل مكان، في المتجر ولوحة التحكّم، وباتجاه من اليمين إلى اليسار مكتوب بخصائص منطقية لا بعكسٍ يدوي.',
      },
      {
        en: '119 unit tests over the parts where a mistake costs money: pricing, discounts, stock movement, order status transitions and the WhatsApp message.',
        ar: '119 اختبار وحدة على المواضع التي يكلّف الخطأ فيها مالًا: التسعير، والخصومات، وحركة المخزون، وانتقالات حالة الطلب، ورسالة واتساب.',
      },
    ],
    chapters: [
      {
        title: { en: 'The distributor', ar: 'الموزّع' },
        body: [
          {
            en: 'Modern Supply sells the things a kitchen runs on. Chocolate, fillings, sauces, fruit purees, ice cream powders, syrups. Their customers are cafes, restaurants and hotels across Oman, and they work from five branches.',
            ar: 'تبيع الإمداد العصري ما يقوم عليه المطبخ: الشوكولاتة والحشوات والصلصات ومهروس الفواكه ومساحيق المثلجات والشراب. وعملاؤها مقاهٍ ومطاعم وفنادق في أنحاء عُمان، وتعمل من خمسة فروع.',
          },
        ],
      },
      {
        title: { en: 'A shop you had to visit', ar: 'متجر كان لا بدّ أن تزوره' },
        body: [
          {
            en: 'Before this site, Modern Supply had an Instagram account and its branches. Customers saw some products on Instagram, but there was no full menu, and many products were never shown. To buy, they went to a branch in person, or searched Google Maps for a branch to find its number. There was no delivery, and no way to follow an order.',
            ar: 'قبل هذا الموقع كان للإمداد العصري حساب في إنستغرام وفروعها. يرى العميل بعض المنتجات في إنستغرام، لكن لم تكن هناك قائمة كاملة، وكثير من المنتجات لم يُعرض قط. وليشتري كان عليه أن يذهب إلى فرع بنفسه، أو يبحث في خرائط جوجل عن فرع ليجد رقمه. ولم يكن هناك توصيل، ولا وسيلة لمتابعة طلب.',
          },
          {
            en: 'For a restaurant this is not a small inconvenience. Comparing what is available means going. Checking a price means asking. And once the order is placed there is nothing to point at afterwards if the delivery arrives short.',
            ar: 'وهذا لمطعمٍ ليس إزعاجًا صغيرًا. لا تستطيع أن تقارن المتاح دون أن تذهب، ولا أن تعرف سعرًا دون أن تسأل، وإذا طلبت فلا شيء تعود إليه بعد ذلك إن جاءت الكمية ناقصة.',
          },
        ],
      },
      {
        title: { en: 'The shop comes to you', ar: 'المتجر يأتي إليك' },
        body: [
          {
            en: 'The decision was not to move customers off the way they already buy. A cafe owner who talks to a branch on WhatsApp will keep talking to a branch on WhatsApp, and a site insisting on being the only route would simply go unused.',
            ar: 'كان القرار ألا نُخرج العملاء من الطريقة التي يشترون بها أصلًا. فصاحب المقهى الذي يكلّم الفرع على واتساب سيبقى يفعل ذلك، والموقع الذي يصرّ على أن يكون الطريق الوحيد سيبقى بلا استخدام.',
          },
          {
            en: 'So the order is written down first. The customer browses the full catalogue, fills one basket, and picks the branch. The order is saved with a tracking number, the stock is set aside, and only then does WhatsApp open with everything already typed out. The conversation still happens. What changed is where the conversation starts: from a record both sides share.',
            ar: 'فصار الطلب يُكتب أولًا. يتصفّح العميل القائمة كاملة، ويملأ سلّة واحدة، ويختار الفرع. فيُحفظ الطلب برقم تتبّع، ويُحجز المخزون، وعندها فقط يُفتح واتساب والرسالة مكتوبة كاملة. المحادثة ما زالت تحدث. ما تغيّر أنها صارت تبدأ من سجلّ يراه الطرفان.',
          },
          {
            en: 'And the customer follows the order afterwards with the order number and their phone, through pending, confirmed, being prepared, on the way, delivered.',
            ar: 'ويستطيع العميل بعد ذلك أن يتابع طلبه برقمه ورقم هاتفه، من قيد الانتظار إلى مؤكّد إلى قيد التحضير إلى في الطريق إلى تم التسليم.',
          },
        ],
        image: { src: '/images/projects/ms-track.jpg', dark: '/images/projects/ms-track-dark.jpg', alt: { en: 'The order tracking screen on a phone', ar: 'شاشة تتبّع الطلب على الهاتف' } },
      },
      {
        title: { en: 'A catalogue that arrived broken', ar: 'قائمة وصلت تالفة' },
        body: [
          {
            en: 'The client sent two printed catalogues typed into one file: 654 products, each with an English name and an Arabic name beside. The Arabic column had been damaged before arriving, saved in the wrong text encoding somewhere along the way. Whole letters were missing, including some of the most common in the language. Repair was impossible, because nothing was left to repair.',
            ar: 'أرسل العميل قائمتين مطبوعتين مكتوبتين في ملف واحد: 654 منتجًا، لكل منها اسم إنجليزي وآخر عربي بجانبه. وكان العمود العربي قد تلف قبل أن يصل إلينا، لأنه حُفظ بترميز نصّي خاطئ في مكان ما من الطريق. سقطت حروف كاملة، منها من أكثر حروف اللغة ورودًا. ولم يكن قابلًا للإصلاح، لأنه لم يبقَ فيه ما يُصلَح.',
          },
          {
            en: 'So all 654 Arabic names were rebuilt from the English, by rule, with wording corrected by hand wherever a rule produced something no buyer would say. No native speaker has read these names yet, which is worth knowing rather than assuming otherwise.',
            ar: 'فأُعيد بناء الأسماء العربية الـ654 كلها من الإنجليزية بقواعد، مع تصحيح الصياغة يدويًّا حيث أخرجت القاعدة عبارة لا يقولها مشترٍ. ولم يقرأ هذه الأسماء عربيٌّ بعد، ومعرفة ذلك أولى من افتراض غيره.',
          },
          {
            en: 'The catalogue also changed shape. The same cream in a five kilo tub and a one kilo tub is two different things to sell, each with its own price and its own stock, not one product in two sizes.',
            ar: 'وتغيّر شكل القائمة أيضًا. فالكريمة نفسها في عبوة خمسة كيلوغرامات وعبوة كيلوغرام شيئان مختلفان يُباعان، لكل منهما سعره ومخزونه، لا منتج واحد بحجمين.',
          },
        ],
        image: { src: '/images/projects/ms-catalogue.jpg', dark: '/images/projects/ms-catalogue-dark.jpg', alt: { en: 'A brand catalogue with its category rail and search', ar: 'قائمة إحدى العلامات مع شريط الفئات والبحث' } },
        facts: [
          { label: { en: 'Products rebuilt', ar: 'منتجات أُعيد بناؤها' }, value: '654' },
          { label: { en: 'Brand catalogues', ar: 'قوائم العلامات' }, value: '5' },
        ],
      },
      {
        title: { en: 'Behind the storefront', ar: 'خلف الواجهة' },
        body: [
          {
            en: 'Staff get one place to run everything. Orders arrive there with all the branch needs, and staff move them along, mark them paid, set the delivery company and fee, and leave a note the customer sees on the tracking page.',
            ar: 'وللموظفين مكان واحد يديرون منه كل شيء. تصل الطلبات إليه بكل ما يحتاجه الفرع، فينقلونها بين المراحل، ويعلّمونها مدفوعة، ويحدّدون شركة التوصيل ورسومها، ويتركون ملاحظة يراها العميل في صفحة التتبّع.',
          },
          {
            en: 'The same place holds the catalogue: adding a product, restocking, changing a price, running a discount on one product or a whole brand, and setting a delivery fee for each of the eleven governorates. A product with orders behind is hidden rather than deleted, because deleting would take the history along.',
            ar: 'وفي المكان نفسه القائمة ذاتها: إضافة منتج، وإعادة تعبئة مخزونه، وتغيير سعره، وتشغيل خصم على منتج واحد أو على علامة كاملة، وتحديد رسم توصيل لكل محافظة من المحافظات الإحدى عشرة. والمنتج الذي خلفه طلبات لا يُحذف بل يُخفى، لأن حذفه سيأخذ السجلّ معه.',
          },
        ],
      },
      {
        title: { en: 'Getting money and stock right', ar: 'ضبط المال والمخزون' },
        body: [
          {
            en: 'Two things had to be right before anything else, because both cost real money when they are wrong.',
            ar: 'أمران كان لا بدّ أن يصحّا قبل غيرهما، لأن كليهما يكلّف مالًا حقيقيًّا حين يخطئ.',
          },
          {
            en: 'The first is the price. The basket lives in the customer\'s browser, and anything living there is editable by whoever sits in front of the screen. So the basket only ever says what was chosen and how many. When the order is placed the site looks up every price itself, applies any discount, adds the delivery fee, and writes the prices onto the order, so a later change never rewrites what somebody already agreed to pay.',
            ar: 'الأول السعر. فالسلّة تعيش في متصفّح العميل، وكل ما يعيش هناك يستطيع الجالس أمامه تعديله. لذلك لا تقول السلّة سوى ما اختاره العميل وكم عدده. وعند تسجيل الطلب يبحث الموقع بنفسه عن كل سعر، ويطبّق أي خصم، ويضيف رسم التوصيل، ثم يكتب الأسعار على الطلب حتى لا يعيد تغييرٌ لاحق كتابة ما وافق عليه أحدهم من قبل.',
          },
          {
            en: 'The second is the last item on the shelf. If two customers order the last one at the same moment, one has to be told no, and the earlier version would have quietly sold the same item twice. Now stock is taken only when stock is still there at the instant of taking, so exactly one order wins and the other is refused, with the short lines named. The site is designed for this rather than proven under real traffic. No order has been placed yet.',
            ar: 'والثاني آخر قطعة على الرفّ. فإذا طلبها عميلان في اللحظة نفسها وجب أن يُقال لأحدهما لا، وكانت النسخة الأولى ستبيعها مرتين بصمت. أما الآن فلا يُخصم المخزون إلا إن كان موجودًا لحظة الخصم نفسها، فينجح طلب واحد بالضبط ويُرفض الآخر مع بيان الأسطر الناقصة. والموقع مصمَّم لذلك لا مُثبَت أنه يصمد له: فلم يُسجَّل عليه أي طلب بعد.',
          },
          {
            en: 'A third case comes from the client\'s data rather than from code. A product with no price yet has no total to add up. Instead of refusing the order, the site saves a price request, with a tracking number, and the branch confirms the amount in the chat.',
            ar: 'وهناك حالة ثالثة، مصدرها بيانات العميل لا الشيفرة. فالمنتج الذي لا سعر له بعد لا يمكن جمعه في فاتورة. وبدل رفض الطلب يحفظه الموقع طلبَ سعر، برقم تتبّعه، ويؤكّد الفرع المبلغ في المحادثة.',
          },
        ],
      },
      {
        title: { en: 'Where it stands', ar: 'أين وصل الآن' },
        body: [
          {
            en: 'The site is live at modernsupply.om, in Arabic and English, with all 654 products loaded. What remains is the client\'s part. Prices, stock levels and product photos are entered by the company, and most of the entry has not happened yet, so most of the catalogue still reads as unavailable.',
            ar: 'الموقع منشور على modernsupply.om، بالعربية والإنجليزية، وفيه المنتجات الـ654 كلها. وما ينتظره هو العميل. فالأسعار ومستويات المخزون وصور المنتجات تُدخلها الشركة، ومعظم ذلك لم يُنجز بعد، فما زال أكثر القائمة يظهر غير متاح.',
          },
          {
            en: 'Delivery is built and covers all eleven governorates and sixty-one wilayats, but the fee for each one is set by the company and none has been set yet. Payment is cash on delivery. Card payment is not built.',
            ar: 'والتوصيل مبنيّ ويغطّي المحافظات الإحدى عشرة والولايات الإحدى والستين كلها، لكن رسم كل منها تحدّده الشركة ولم يُحدَّد أيٌّ منها بعد. والدفع عند الاستلام. أما الدفع بالبطاقة فغير مبنيّ.',
          },
          {
            en: 'No order has been placed through the site yet, so nothing here is a claim about customers, sales or traffic. Built, and waiting for its first order.',
            ar: 'ولم يُسجَّل عبر الموقع أي طلب بعد، فليس في هذا كله ادّعاء عن عملاء أو مبيعات أو زيارات. اكتمل بناؤه، وينتظر أول طلب.',
          },
        ],
      },
    ],
    /*
     * Captures are of the live site. Nothing here renders an order: the
     * database holds none today, and the routes that would show one are
     * excluded on principle rather than on today's state. The catalogue frame
     * is cropped to the brand header, the category rail and the search, above
     * the row of stock labels, because 653 of 654 packs read "Out of stock"
     * until the client finishes entering stock, which misrepresents a business
     * that is simply not finished setting up.
     */
    cover: '/images/projects/ms-light.jpg',
    coverDark: '/images/projects/ms-dark.jpg',
    coverKind: 'screenshot',
    gallery: [
      '/images/projects/ms-ar.jpg',
      '/images/projects/ms-catalogue.jpg',
      '/images/projects/ms-contact.jpg',
      '/images/projects/ms-track.jpg',
      '/images/projects/ms-admin.jpg',
    ],
    links: [{ label: 'Live site', href: 'https://modernsupply.om', external: true }],
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
      en: 'The official website for the IEEE Student Branch at Al Buraimi University College, built in the branch\'s founding year, when the branch had nothing online at all. Designed and built alone, and maintained since as branch Webmaster.',
      ar: 'الموقع الرسمي لفرع طلاب IEEE في كلية البريمي الجامعية، بُني في سنة تأسيس الفرع حين لم يكن له وجود على الإنترنت أصلًا. صمّمته وبنيته وحدي، وأتولّى صيانته منذ ذلك الحين بصفتي مسؤول الموقع.',
    },
    problem: {
      en: 'In its founding year the branch had nothing online. No website, no page, no address to give a student who asked where to find out more.',
      ar: 'في سنة تأسيسه لم يكن للفرع وجود على الإنترنت. لا موقع، ولا صفحة، ولا عنوان يُعطى لطالب يسأل أين يعرف المزيد.',
    },
    solution: {
      en: 'A responsive site carrying what a new branch has to say for itself: its vision and mission, its events, why a student would join, and how. Built with Next.js and TypeScript, with a sitemap, a robots file and structured data so search engines find a branch nobody has heard of yet.',
      ar: 'موقع متجاوب يحمل ما يحتاج فرع جديد أن يقوله عن نفسه: رؤيته ورسالته، وفعالياته، ولماذا ينضمّ إليه الطالب، وكيف. بُني بـ Next.js وTypeScript، مع خريطة موقع وملف robots وبيانات منظَّمة حتى تجد محرّكات البحث فرعًا لم يسمع به أحد بعد.',
    },
    liveUrl: 'https://ieee-buc-website.vercel.app',
    repoUrl: 'https://github.com/rworldx/ieee-buc-website',
    stack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    highlights: [
      {
        en: 'Responsive across devices, built with Next.js, TypeScript, Tailwind CSS and Framer Motion.',
        ar: 'متجاوب عبر الأجهزة، مبني باستخدام Next.js وTypeScript وTailwind CSS وFramer Motion.',
      },
      {
        en: 'SEO-optimized: sitemap, robots, and JSON-LD structured data.',
        ar: 'مُحسَّن لمحرّكات البحث: خريطة موقع، وملف robots، وبيانات JSON-LD المنظَّمة.',
      },
    ],
    chapters: [
      {
        title: { en: 'A branch with nowhere to point', ar: 'فرع بلا عنوان' },
        body: [
          {
            en: 'The branch was in its founding year, with nothing online. No website, no page, no address to give a student. A student society existing only in the room where members meet is hard to join and easy to miss.',
            ar: 'كانت تلك سنة تأسيس الفرع، ولم يكن له وجود على الإنترنت. لا موقع، ولا صفحة، ولا عنوان يُعطى لطالب. والجمعية الطلابية التي لا توجد إلا في القاعة التي تجتمع فيها يصعب الانضمام إليها ويسهل أن تمرّ دون أن يلحظها أحد.',
          },
          {
            en: 'A new branch also has to prove the branch is real. A student deciding whether to sign up, a department deciding whether to back the thing, a visiting speaker checking who invited them: all of them want somewhere official to look first. The Instagram account came later, once the committee set one up. The website came first.',
            ar: 'والفرع الجديد عليه أيضًا أن يثبت أنه حقيقي. فالطالب الذي يفكّر في الانضمام، والقسم الذي يقرّر دعمه، والمتحدّث الزائر الذي يتحقّق ممّن دعاه، كلهم يريدون مكانًا رسميًّا ينظرون فيه أولًا. أما حساب إنستغرام فجاء بعد ذلك حين أنشأته اللجنة. الموقع جاء أولًا.',
          },
        ],
      },
      {
        title: { en: 'Chosen for the job', ar: 'اختياري للمهمّة' },
        body: [
          {
            en: 'The branch counselor asked me to join IEEE and to take the Webmaster role. She knew my record, and knew I would build a site and then keep the site running, which is the harder half of the two.',
            ar: 'طلبت منّي مشرفة الفرع أن أنضمّ إلى IEEE وأن أتولّى مسؤولية الموقع. كانت تعرف سجلّي، وتعرف أنني أستطيع بناء موقع ثم المحافظة عليه، وهذا هو الشقّ الأصعب.',
          },
          {
            en: 'I designed and built the whole thing alone. Every one of the 59 commits is mine.',
            ar: 'صمّمت الموقع وبنيته وحدي. وكل سطر فيه من عملي.',
          },
          {
            en: 'The site carries what a branch has to say for itself and nothing else: the vision and mission, the events run so far, why a student would join, and how to do so. Built with Next.js and TypeScript, with a sitemap, a robots file and structured data, because a branch nobody has heard of has to be findable before anyone judges the work.',
            ar: 'ويحمل ما يحتاج الفرع أن يقوله عن نفسه ولا شيء غير ذلك: الرؤية والرسالة، والفعاليات التي أقامها، ولماذا ينضمّ الطالب، وكيف ينضمّ. بُني بـ Next.js وTypeScript، مع خريطة موقع وملف robots وبيانات منظَّمة، لأن الفرع الذي لم يسمع به أحد لا بدّ أن يُعثر عليه قبل أن يُحكم عليه.',
          },
        ],
      },
      {
        title: { en: 'Still mine', ar: 'ما زال في يدي' },
        body: [
          {
            en: 'I have been Webmaster since August 2025 and still maintain the site. Handing a project over at launch is easy. Keeping one current through a year of events, committee changes and new members decides whether a branch site stays worth visiting.',
            ar: 'أتولّى مسؤولية الموقع منذ أغسطس 2025 وما زلت أصونه. تسليم مشروع عند إطلاقه سهل. أما إبقاؤه محدَّثًا عبر سنة من الفعاليات وتغيّر اللجنة وانضمام أعضاء جدد فهو ما يقرّر هل يبقى موقع الفرع يستحقّ الزيارة.',
          },
          {
            en: 'The Information Technology Department awarded me a certificate for my contribution to the branch\'s official launch.',
            ar: 'وقد كرّمني قسم تقنية المعلومات بشهادة تقدير على إسهامي في الإطلاق الرسمي للفرع.',
          },
        ],
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
      en: 'A team concept for a home energy monitor, designed to read consumption device by device and show a household where the money goes instead of watching a prepaid balance fall with no explanation. My part was the website and a front-end prototype on mock data. Second of 20+ teams at Riyada\'s Promising Student Projects Camp.',
      ar: 'فكرة فريق لجهاز يراقب كهرباء المنزل، صُمّم ليقرأ الاستهلاك جهازًا جهازًا ويُظهر للبيت أين يذهب المال، بدل مشاهدة رصيد العدّاد المسبق ينزل بلا تفسير. وكان دوري الموقع ونموذجًا أوّليًا للواجهة ببيانات تجريبية. المركز الثاني بين أكثر من 20 فريقًا في مخيم مشاريع الطلاب الواعدة من هيئة ريادة.',
    },
    problem: {
      en: 'Our idea began with a problem I lived. When I was a student renting in Buraimi, my building switched to prepaid electricity. I paid an estimated amount up front each month, the balance kept running out early, and top-ups piled up. One evening, lying in bed watching my favourite series, the power simply cut out, and the same thing kept happening. Then came the question: why is there no product reading each device’s power continuously, so a household sees exactly what is draining the money, cuts the waste, and runs only what matters?',
      ar: 'فكرتنا بدأت من مشكلة عشتُها بنفسي. كنت طالبًا أسكن في سكنٍ مستأجر في البريمي، وحوّل صاحب العمارة نظام الكهرباء إلى الدفع المسبق، فصرت أدفع مبلغًا تقديريًا قبل كل شهر، وكان الرصيد ينفد بسرعة قبل نهاية الشهر فأضطر لإعادة الشحن أكثر من مرة. وفي إحدى الليالي بينما كنت ممددًا على السرير أتابع مسلسلي، انقطعت الكهرباء فجأة، وتكرّر هذا كثيرًا. حينها سألت نفسي: لماذا لا نصنع منتجًا يقيس استهلاك كل جهاز باستمرار، حتى نرى أيّ جهاز يستهلك أكثر، فنوفّر الطاقة ونقلّل الفواتير ونطفئ ما لا نحتاجه؟',
    },
    solution: {
      en: 'EnerGrid was designed to read a household\'s electricity per appliance and surface the biggest drains, so the answer to what is spending the balance sits on a screen instead of being a guess. The team carried the concept to the camp. My part was the website and a front-end prototype running on mock data. The entry placed 2nd of 20+ teams at Riyada\'s Promising Student Projects Camp, held at Al Buraimi University College.',
      ar: 'صُمّم EnerGrid ليقرأ كهرباء المنزل لكل جهاز ويكشف أكثرها استنزافًا، ليصبح جواب «ما الذي يستهلك الرصيد» على شاشة بدل أن يكون تخمينًا. حمل الفريق الفكرة إلى المخيم، وكان دوري الموقع ونموذجًا أوّليًا للواجهة يعمل ببيانات تجريبية. وحصل المشروع على المركز الثاني بين أكثر من 20 فريقًا في مخيم مشاريع الطلاب الواعدة من هيئة ريادة، الذي أُقيم في كلية البريمي الجامعية.',
    },
    /*
     * These describe the TEAM'S CONCEPT, which is what this entry presents,
     * not a stack anybody shipped. Nothing was wired to a meter and nothing
     * ran in a home. The rooms say so plainly, and every verb around them is
     * "designed to" rather than "does".
     */
    stack: ['IoT', 'Smart Energy', 'Real-time Monitoring', 'Hardware + App'],
    stats: [
      { label: { en: 'Placed', ar: 'الترتيب' }, value: '2nd' },
      { label: { en: 'Teams', ar: 'الفرق' }, value: '20+' },
    ],
    highlights: [
      {
        en: 'Born from a real pain point: prepaid electricity running out unpredictably, mid-month and mid-series.',
        ar: 'وُلدت من ألمٍ حقيقي: كهرباء مسبقة الدفع تنفد بلا توقّع، في منتصف الشهر ومنتصف المسلسل.',
      },
      {
        en: 'The concept: real-time, per-device power tracking, designed to pinpoint the biggest energy drains.',
        ar: 'الفكرة: تتبّع لحظي لاستهلاك كل جهاز يحدّد أكثر الأجهزة استنزافًا للطاقة.',
      },
      {
        en: 'Pitched to a panel of industry judges at the Promising Student Projects Camp (Riyada × Oman Promising Startups Programme), held at Al Buraimi University College.',
        ar: 'عُرضت أمام لجنة من خبراء الصناعة في مخيم مشاريع الطلاب الواعدة (ريادة × برنامج الشركات الناشئة الواعدة)، الذي أُقيم في كلية البريمي الجامعية.',
      },
      {
        en: 'Placed 2nd of 20+ teams, earning a cash prize and recognition from Riyada’s Chairperson.',
        ar: 'حصلت على المركز الثاني بين أكثر من 20 فريقًا، ونالت جائزة نقدية وتكريمًا من رئيس هيئة ريادة.',
      },
    ],
    chapters: [
      {
        title: { en: 'The meter that kept running out', ar: 'العدّاد الذي كان ينفد' },
        body: [
          {
            en: 'I was renting a flat in Buraimi as a student when the building moved to prepaid electricity. Paying an estimated amount up front each month became the rule, and the estimate was never right. The balance kept running out early, so I topped up again, and again.',
            ar: 'كنت أسكن شقة مستأجرة في البريمي وأنا طالب حين حوّلت العمارة كهرباءها إلى الدفع المسبق. فصار عليّ أن أدفع مبلغًا تقديريًا في أول كل شهر، ولم يكن التقدير صحيحًا يومًا. كان الرصيد ينفد مبكرًا، فأعيد شحنه، ثم أعيده مرة أخرى.',
          },
          {
            en: 'One evening I was lying in bed watching a series and the power simply went out. Then the same thing happened again. Paying in advance for something and still losing the thing without warning is a particular kind of annoying, and the annoyance is where the project started.',
            ar: 'وفي إحدى الليالي كنت ممددًا على السرير أتابع مسلسلًا فانقطعت الكهرباء فجأة. ثم تكرّر الأمر. أن تدفع مقدّمًا ثمن شيء ثم تفقده دون إنذار نوع خاص من الإزعاج، ومن هذا الإزعاج بدأ كل شيء.',
          },
        ],
      },
      {
        title: { en: 'Which thing is eating the money?', ar: 'أي جهاز يأكل الفاتورة؟' },
        body: [
          {
            en: 'A prepaid meter tells a household one number: how much is left. Where the rest went is never part of the answer. You watch the balance fall with no way of knowing whether the cost is the air conditioning, the water heater, or something left plugged in and forgotten a month ago.',
            ar: 'العدّاد المسبق يخبر البيت برقم واحد: كم بقي. أما أين ذهب الباقي فلا يقوله أبدًا. ترى الرصيد ينزل ولا تعرف هل السبب المكيّف، أم سخّان الماء، أم شيء تُرك موصولًا ونُسي قبل شهر.',
          },
          {
            en: 'So spending less becomes guesswork. Turn something off, wait a month, see whether the number moved. What we proposed was a reading in place of the guess: show the household what each appliance costs, and let the decision follow.',
            ar: 'فيتحوّل ترشيد الإنفاق إلى تخمين: أطفئ شيئًا، وانتظر شهرًا، وانظر هل تغيّر الرقم. وما اقترحناه قراءةٌ تحلّ محلّ التخمين: أن يرى البيت كم يكلّفه كل جهاز، ثم يبني قراره على ذلك.',
          },
        ],
      },
      {
        title: { en: 'The idea, and the part I built', ar: 'الفكرة، والجزء الذي بنيته' },
        body: [
          {
            en: 'What we took to the camp was a full concept: a monitor for the whole home, designed to read each appliance in real time and put the biggest drains in front of the resident, with the hardware and the app to go with them. All of the concept was designed, and none was built.',
            ar: 'ما حملناه إلى المخيم كان فكرة كاملة: جهاز يراقب البيت كله، مُصمَّم ليقرأ كل جهاز لحظيًا ويضع أكثرها استنزافًا أمام الساكن، مع ما يلزمه من عتاد وتطبيق. كل ذلك صُمِّم، ولم يُبنَ منه شيء.',
          },
          {
            en: 'My part was the website and the front-end prototype: the screens a resident would use, running on mock data. The numbers on them were invented rather than measured. No meter was read, no hardware was made, nothing ran in anyone\'s home. The judging was on the problem, the proposal and the case for both, which is what such a camp is for, and saying so is better than letting a concept sound like a product.',
            ar: 'أما دوري فكان الموقع ونموذج الواجهة الأوّلي: الشاشات التي سيستخدمها الساكن، تعمل ببيانات تجريبية. والأرقام عليها مُفترضة لا مقيسة. لم يُقرأ عدّاد، ولم يُصنع عتاد، ولم يعمل شيء في بيت أحد. وكان التحكيم على المشكلة والمقترح والحجّة لهما، وهذا ما تقوم عليه مخيمات كهذه، وقول ذلك أولى من ترك فكرة تبدو كأنها منتج.',
          },
        ],
      },
      {
        title: { en: 'Where it stands', ar: 'أين وصل الآن' },
        body: [
          {
            en: 'The entry placed 2nd of 20+ teams at the Promising Student Projects Camp, run by Riyada with the Oman Promising Startups Programme and held at Al Buraimi University College in 2025, with a cash prize and recognition from the Chairperson of Oman\'s SME Development Authority.',
            ar: 'حصل المشروع على المركز الثاني بين أكثر من 20 فريقًا في مخيم مشاريع الطلاب الواعدة، الذي نظّمته هيئة ريادة مع برنامج الشركات الناشئة الواعدة وأُقيم في كلية البريمي الجامعية سنة 2025. ورافقته جائزة نقدية وتكريم من رئيس هيئة تنمية المشاريع الصغيرة والمتوسطة.',
          },
          {
            en: 'The project went no further. The prepaid meters are still in those buildings and still say nothing about where the money goes, so the problem outlasted the prototype.',
            ar: 'ولم يمضِ أبعد من ذلك. فالعدّادات المسبقة ما زالت في تلك العمارات، وما زالت لا تقول شيئًا عن وجهة المال، فبقيت المشكلة بعد أن توقّف النموذج.',
          },
        ],
        facts: [
          { label: { en: 'Placed', ar: 'الترتيب' }, value: '2nd' },
          { label: { en: 'Of teams', ar: 'من بين فرق' }, value: '20+' },
        ],
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
