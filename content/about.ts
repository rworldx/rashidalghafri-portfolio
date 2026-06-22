import type { Interest } from '@/types/common';
import type { Localized } from '@/types/common';

/** Short About-section intro. */
export const aboutIntro: Localized = {
  en: `I'm Rashid — a 21-year-old Software Engineering student from Ibri, Oman. My path here wasn't a straight line, and that's the most honest thing about me.`,
  ar: `أنا راشد، طالب هندسة برمجيات في الحادية والعشرين من عمري، من ولاية عبري في عُمان. طريقي إلى هنا لم يكن مستقيمًا، وهذا أصدق ما فيّ.`,
};

/** Full origin story — rendered as flowing paragraphs on the About page. */
export const aboutStory: { en: string[]; ar: string[] } = {
  en: [
    `As a kid I was going to be an archaeologist — not because of cartoons, but because of National Geographic. I sat through every episode on animals, space, and dinosaurs, fascinated by how much world there was to dig into. That same curiosity ran through the films I loved: action, adventure, sci-fi, superheroes, and Japanese anime — stories about people who saw the world differently.`,
    `Then it was cooking. I found I actually had a hand for it, especially Italian food. (Pasta is still my favourite meal to this day.) After that, it was the sky — I wanted to be a pilot, or an astronaut at NASA, because what I really wanted was to roam the planet and see its cultures, cities, and landscapes for myself.`,
    `The constant under all of it was technology. Somewhere along the way I realised I understood it more deeply than most people my age — I'd take apart the games I played to see how they worked, endlessly curious about the systems running quietly behind everyday life. That curiosity was the real signal, and it pointed at one thing: build.`,
    `So I chose Software Engineering, and a way of working that matches who I am. I'm drawn to flexible, location-independent work — the kind of career I can do from home, from a plane, or from a beach, on a schedule that's mine. I work quietly, with focus, and StudyNest is what that looks like pointed at a real problem. Right now, I'm working toward studying abroad — and I have a plan for it.`,
  ],
  ar: [
    `عندما كنت صغيرًا أردت أن أصبح عالم آثار — لا بسبب الرسوم المتحركة، بل بسبب قناة ناشونال جيوغرافيك. كنت أتابع كل حلقة عن الحيوانات والفضاء والديناصورات، مفتونًا بكمّ العوالم التي يمكن استكشافها. وامتد الفضول نفسه إلى ما أحببته من أفلام: الأكشن والمغامرة والخيال العلمي والأبطال الخارقين، والأنمي الياباني.`,
    `ثم جاء الطبخ. اكتشفت أن لديّ موهبةً فيه، خاصة المأكولات الإيطالية — وما زالت الباستا أكلتي المفضلة حتى اليوم. بعدها كانت السماء؛ أردت أن أصبح طيارًا أو رائد فضاء في ناسا، لأن ما أردته حقًا هو أن أجوب العالم وأرى ثقافاته ومدنه ومناظره بعينيّ.`,
    `لكن الثابت تحت كل ذلك كان التكنولوجيا. أدركت في مرحلةٍ ما أنني أفهمها أعمق من معظم من هم في سنّي؛ كنت أفكّك الألعاب التي ألعبها لأرى كيف تعمل، وفضولي لا ينتهي تجاه الأنظمة التي تعمل بهدوء خلف تفاصيل حياتنا اليومية. كان ذلك الفضول هو الإشارة الحقيقية، وكان يشير إلى شيء واحد: أن أبني.`,
    `لذلك اخترت هندسة البرمجيات، وطريقة عملٍ تشبهني: أنجذب إلى العمل المرن غير المقيّد بمكان — مهنة أستطيع ممارستها من البيت، أو من الطائرة، أو من شاطئ، بجدولٍ هو جدولي. أعمل بهدوء وتركيز، وStudyNest هو ما يبدو عليه ذلك حين أوجّهه نحو مشكلة حقيقية. والآن أعمل على خطةٍ للدراسة في الخارج.`,
  ],
};

/** "Beyond the code" — small, tasteful interest grid. */
export const interests: Interest[] = [
  { icon: 'Film', label: { en: 'Marvel Cinematic Universe — lifelong fan', ar: 'عالم مارفل السينمائي — مُعجب منذ الصغر' } },
  { icon: 'Headphones', label: { en: 'Dark, cinematic alt-pop — Lana Del Rey & The Weeknd on repeat', ar: 'بوب بديل سينمائي وكئيب — لانا ديل ري و ذا ويكند على الإعادة' } },
  { icon: 'Clapperboard', label: { en: 'Films, series & anime', ar: 'الأفلام والمسلسلات والأنمي' } },
  { icon: 'ChefHat', label: { en: 'Italian food — pasta above all', ar: 'المطبخ الإيطالي — والباستا قبل كل شيء' } },
  { icon: 'Languages', label: { en: 'English is my favourite subject', ar: 'الإنجليزية مادتي المفضلة' } },
  { icon: 'Camera', label: { en: 'Photography — capturing moments off-screen', ar: 'التصوير — التقاط اللحظات خارج الشاشة' } },
  { icon: 'Plane', label: { en: 'Travelling the world — cultures, cities and countrysides', ar: 'أعشق السفر حول العالم — الثقافات والمدن والأرياف' } },
];
