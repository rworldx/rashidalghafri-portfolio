import type { Interest } from '@/types/common';
import type { Localized } from '@/types/common';

/** Short About-section intro. */
export const aboutIntro: Localized = {
  en: `I am Rashid. I am 21, from Ibri in Oman, and I finished a Software Engineering degree with First-Class Distinction. My path here was not a straight line. Nothing about me is more honest than that.`,
  ar: `أنا راشد، من ولاية عبري في عُمان، وعمري 21 عامًا. تخرّجت مهندس برمجيات بامتياز مع مرتبة الشرف الأولى. طريقي إلى هنا لم يكن مستقيمًا، ولعل هذا أصدق ما يُقال عني.`,
};

/** Full origin story — rendered as flowing paragraphs on the About page. */
export const aboutStory: { en: string[]; ar: string[] } = {
  en: [
    `As a kid I wanted to be an archaeologist. National Geographic put the idea there. I watched every episode on animals, space and dinosaurs, and I liked how much world there was to dig into. The films I loved pulled the same way. Action, adventure, science fiction, superheroes, Japanese anime. Stories about people who saw the world differently.`,
    `Then came cooking. I had a hand for Italian food. Pasta is still my favourite meal. After cooking came the sky. I wanted to fly, or to work at NASA. What I wanted underneath was to move around the planet and see its cities and cultures myself.`,
    `Technology stayed constant through all of it. I understood computers more deeply than most people my age. I took apart the games I played to see how they worked. The systems running quietly behind daily life held my attention longest. The signal was clear enough. Build.`,
    `So I chose Software Engineering, and a way of working to match. I want flexible work with no fixed address. From home, from a plane, from a beach, on my own schedule. I work quietly and with focus. StudyNest is what happens when I point both at a real problem. Now I am working toward studying abroad, and I have a plan for getting there.`,
  ],
  ar: [
    `في صغري أردت أن أكون عالم آثار، وكان الفضل في ذلك لقناة ناشونال جيوغرافيك لا للرسوم المتحركة. تابعت حلقاتها عن الحيوانات والفضاء والديناصورات، وأدهشني أن في العالم هذا القدر مما يستحق البحث. وكانت الأفلام التي أحببتها تشدّني للسبب نفسه: الأكشن والمغامرة والخيال العلمي والأبطال الخارقون والأنمي الياباني، وكلها حكايات عن أشخاص ينظرون إلى العالم بطريقة تخصّهم.`,
    `ثم شغلني الطبخ، ووجدت لديّ ميلًا إلى المطبخ الإيطالي، وما زالت الباستا أحبّ ما آكل. وبعده جذبتني السماء، فتمنيت أن أصير طيارًا أو أعمل في وكالة ناسا. لكن ما كنت أريده في العمق هو أن أتنقّل بين البلدان وأرى مدنها وأهلها بعيني.`,
    `بقيت التقنية حاضرة في كل مرحلة من هذه المراحل. أدركت أنني أفهم الحاسوب أعمق من أقراني، وكنت أفكّك الألعاب لأعرف كيف صُنعت. وأكثر ما شدّني هو تلك الأنظمة التي تعمل بصمت خلف تفاصيل يومنا. كانت الإشارة واضحة: أن أبني.`,
    `فاخترت هندسة البرمجيات، واخترت معها طريقة عمل تشبهني. أريد عملًا مرنًا لا يقيّدني بمكان: من البيت، أو من الطائرة، أو من شاطئ، وبجدول أرسمه بنفسي. أعمل بهدوء وتركيز، وStudyNest هو ما ينتج حين أوجّه هذا كله نحو مشكلة حقيقية. وأسعى الآن إلى الدراسة في الخارج، ولديّ خطة واضحة للوصول إليها.`,
  ],
};

/** "Beyond the code" — small, tasteful interest grid. */
export const interests: Interest[] = [
  {
    icon: 'Film',
    label: {
      en: 'Marvel Cinematic Universe — lifelong fan',
      ar: 'عالم مارفل السينمائي — مُعجب منذ الصغر',
    },
  },
  {
    icon: 'Headphones',
    label: {
      en: 'Dark, cinematic alt-pop — Lana Del Rey & The Weeknd on repeat',
      ar: 'بوب بديل سينمائي وكئيب — لانا ديل ري و ذا ويكند على الإعادة',
    },
  },
  {
    icon: 'Clapperboard',
    label: { en: 'Films, series & anime', ar: 'الأفلام والمسلسلات والأنمي' },
  },
  {
    icon: 'ChefHat',
    label: {
      en: 'Italian food — pasta above all',
      ar: 'المطبخ الإيطالي — والباستا قبل كل شيء',
    },
  },
  {
    icon: 'Languages',
    label: { en: 'English is my favourite subject', ar: 'الإنجليزية مادتي المفضلة' },
  },
  {
    icon: 'Camera',
    label: {
      en: 'Photography — capturing moments off-screen',
      ar: 'التصوير — التقاط اللحظات خارج الشاشة',
    },
  },
  {
    icon: 'Plane',
    label: {
      en: 'Travelling the world — cultures, cities and countrysides',
      ar: 'أعشق السفر حول العالم — الثقافات والمدن والأرياف',
    },
  },
];
