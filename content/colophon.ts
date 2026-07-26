import type { Localized } from '@/types/common';

/**
 * The note that explains the site's design, on /about and nowhere else.
 *
 * Two things are deliberately true of this copy:
 *
 *  1. It is written plainly. The idea underneath the site is a piece of Omani
 *     hydraulic engineering, not a poem, and describing it in plain terms is
 *     what keeps it from reading as a marketing metaphor.
 *  2. It is the ONLY place the falaj is named. Everywhere else the idea has to
 *     survive on structure alone. If it needs the caption to work, it does not
 *     work.
 */
export const colophon: { body: Localized[] } = {
  body: [
    {
      en: 'This site is staged as a gallery. One room at a time, one work at a time, and as little interface as I could get away with — the argument being that if the work is worth looking at, it should not have to compete with the thing it is displayed in.',
      ar: 'هذا الموقع مُقام كصالة عرض. غرفة واحدة في كل مرة، وعمل واحد في كل مرة، وأقل قدر ممكن من الواجهة — والحجّة أن العمل إن كان يستحق النظر، فلا ينبغي أن ينافسه ما يُعرض فيه.',
    },
    {
      en: 'The line down the side is the one thing carried over from an earlier version of this site, and it came from the falaj — the gravity-fed channels that have shared water across Oman for about five thousand years. One source, a spine, branches to everyone who needs it. It is a good description of engineering and a better one of this page, so it stayed.',
      ar: 'الخط الممتدّ على الجانب هو الشيء الوحيد الباقي من نسخة سابقة من هذا الموقع، وقد جاء من الفلج — تلك القنوات التي تنقل الماء بالجاذبية وتتقاسمه في عُمان منذ نحو خمسة آلاف عام. منبع واحد، وقناة رئيسية، وفروع تصل إلى كل محتاج. إنه وصف جيّد للهندسة، وأفضل لهذه الصفحة، لذلك بقي.',
    },
    {
      en: 'Everything else is deliberate and boring: one accent colour, verified contrast, no animation that a reader did not ask for by scrolling, and a full fallback for anyone whose machine or settings would rather not run the moving parts. Built with Next.js and Three.js, in English and Arabic.',
      ar: 'وكل ما عدا ذلك متعمَّد وهادئ: لون واحد مميّز، وتباين مُتحقَّق منه، ولا حركة لم يطلبها القارئ بتمريره، وبديل كامل لمن لا يرغب جهازه أو إعداداته في تشغيل الأجزاء المتحرّكة. بُني بـ Next.js وThree.js، بالعربية والإنجليزية.',
    },
  ],
};
