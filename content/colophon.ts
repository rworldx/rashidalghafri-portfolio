import type { Localized } from '@/types/common';

/**
 * The note about how the site is made. On /about, and nowhere else.
 *
 * Written to Rashid's rules: short sentences, active voice, no dashes, no
 * semicolons, no filler. A colophon listing adjectives says nothing. One that
 * names decisions is the only kind worth printing, and every claim here can be
 * checked against the page it sits on.
 */
export const colophon: { body: Localized[] } = {
  body: [
    {
      en: 'This site is built like a gallery. One room, one work at a time, and as little interface as I could get away with. If the work is worth looking at, you should not have to look past a wrapper to see it.',
      ar: 'هذا الموقع مبنيّ كصالة عرض. غرفة واحدة، وعمل واحد في كل مرة، وأقلّ ما استطعت من الواجهة. إن كان العمل يستحقّ النظر، فلا ينبغي أن تنظر من خلف غلاف لتراه.',
    },
    {
      en: 'Type does most of the work. Headings run large and upright in the system face. One word in a headline turns italic when it carries the weight of the line. Arabic uses Thmanyah everywhere, with no letter spacing and no small caps, because Arabic joins its letters and those two habits pull the joins apart.',
      ar: 'الخطّ يقوم بأكثر العمل هنا. تأتي العناوين كبيرة ومنتصبة بخط النظام. وتميل كلمة واحدة في العنوان حين تحمل ثقل السطر. والعربية بخط «ثمانية» في كل مكان، بلا تباعد بين الحروف وبلا محاكاة للأحرف الكبيرة، لأن العربية تصل حروفها وهاتان العادتان تفصلانها.',
    },
    {
      en: 'The rest is quiet on purpose. One accent colour. Contrast measured, not guessed. No animation you did not start by scrolling. Anyone whose device or settings would rather skip the moving parts gets a full version without them. Built with Next.js and Three.js, in English and Arabic.',
      ar: 'وما تبقّى هادئ بقصد. لون مميّز واحد. وتباين مقيس لا مُخمّن. ولا حركة لم تبدأها أنت بتمريرك. ومن لا يريد جهازه أو إعداداته تشغيل الأجزاء المتحرّكة يحصل على نسخة كاملة بدونها. بُني بـ Next.js وThree.js، بالعربية والإنجليزية.',
    },
  ],
};
