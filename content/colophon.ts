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
      en: 'A falaj is a channel that carries water out of the mountains and shares it out across a village — one source, a spine, and branches to everyone who needs it. Oman has been running them for about five thousand years, and a good one still moves water across kilometres on gravity alone. It is engineering built to distribute something fairly, and to keep doing it long after the person who cut the channel is gone.',
      ar: 'الفلج قناة تنقل الماء من الجبال وتوزّعه على القرية — منبع واحد، وقناة رئيسية، وفروع تصل إلى كل من يحتاجه. تُشغّل عُمان هذه الأنظمة منذ نحو خمسة آلاف عام، وما يزال الفلج الجيد ينقل الماء لكيلومترات بالجاذبية وحدها. إنها هندسة صُممت لتوزيع شيء ما بعدالة، ولتستمر في ذلك بعد رحيل من شقّ القناة بزمن طويل.',
    },
    {
      en: 'That is the shape of this site. A single line runs down the left of every page; sections branch off it instead of stacking on top of each other, and the line fills as you read. The network in the header is not an ornament either — it is drawn from the same data as the rest of the site, and the light always travels outward, away from the source.',
      ar: 'وهذا هو شكل هذا الموقع. خطٌّ واحد يمتدّ على يمين كل صفحة، وتتفرّع الأقسام عنه بدل أن تتراكم فوق بعضها، ويمتلئ الخط كلما تابعتَ القراءة. والشبكة في المقدّمة ليست زخرفة أيضًا؛ فهي مرسومة من البيانات نفسها التي يقوم عليها الموقع، والضوء فيها يسير دائمًا إلى الخارج، بعيدًا عن المنبع.',
    },
    {
      en: 'It is the honest shape for the work, too. Every project here moves something to someone who could not reach it easily on their own — study partners, live consumption data, a branch’s activity. I did not set out to build the same thing four times; it is just what I keep finding worth building.',
      ar: 'وهو الشكل الصادق للعمل كذلك. كل مشروع هنا ينقل شيئًا إلى من كان يصعب عليه الوصول إليه بمفرده — شركاء دراسة، أو بيانات استهلاك لحظية، أو أنشطة فرعٍ طلابي. لم أقصد أن أبني الشيء نفسه أربع مرات، لكنه ببساطة ما أجده جديرًا بالبناء في كل مرة.',
    },
  ],
};
