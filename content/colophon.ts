import type { Localized } from '@/types/common';

/**
 * The short note about how the site is made, on /about and nowhere else.
 *
 * Kept honest and specific. A colophon that lists adjectives ("clean, modern,
 * user-focused") says nothing; one that names actual decisions is the only
 * kind worth printing. Everything claimed here is verifiable by looking at
 * the page it is printed on.
 */
export const colophon: { body: Localized[] } = {
  body: [
    {
      en: 'This site is staged as a gallery: one room, one work at a time, and as little interface as I could get away with. The argument is simple — if the work is worth looking at, it should not have to compete with the thing it is displayed in.',
      ar: 'هذا الموقع مُقامٌ كصالة عرض: غرفة واحدة، وعملٌ واحد في كل مرة، وأقلّ ما يمكن من الواجهة. والفكرة بسيطة: إن كان العمل يستحقّ النظر، فلا ينبغي أن ينافسه ما يُعرض فيه.',
    },
    {
      en: 'The type does the work. A didone italic carries the titles the way an exhibition label would; everything structural is set in a narrowed grotesque so the two never compete. Arabic is set in Thmanyah throughout, with none of the letter-spacing or small caps that Latin habits tend to impose on a cursive script.',
      ar: 'الخطّ هو الذي يحمل العمل هنا. تحمل الحروف المائلة العناوين كما تفعل لوحة التعريف في المعرض، ويُضبط كل ما هو بنيويّ بخطٍّ مضغوط حتى لا يتنافس الاثنان. والعربية مضبوطة بخط «ثمانية» في كل الموقع، بلا تباعدٍ بين الحروف ولا محاكاةٍ لعادات لاتينية لا تناسب خطًّا متّصلًا.',
    },
    {
      en: 'The rest is deliberate and quiet: one accent colour, contrast checked rather than assumed, no animation a reader did not ask for by scrolling, and a full fallback for anyone whose device or settings would rather not run the moving parts. Built with Next.js and Three.js, in English and Arabic.',
      ar: 'وما تبقّى متعمَّدٌ وهادئ: لونٌ مميّز واحد، وتباينٌ مُتحقَّقٌ منه لا مفترَض، ولا حركةَ لم يطلبها القارئ بتمريره، وبديلٌ كامل لمن لا يرغب جهازه أو إعداداته في تشغيل الأجزاء المتحرّكة. بُني بـ Next.js وThree.js، بالعربية والإنجليزية.',
    },
  ],
};
