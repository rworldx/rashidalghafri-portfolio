import type { TimelineEntry } from '@/types/common';

/**
 * Personal journey (Addendum B.3) — life & travel, NOT professional milestones
 * (those live on /work and /resume, so nothing is duplicated). Drives the
 * scroll-draw timeline on the About page.
 */
export const timeline: TimelineEntry[] = [
  {
    year: 2004,
    kind: 'birth',
    title: { en: 'Born in Oman', ar: 'وُلدت في عُمان' },
    detail: { en: '3 September 2004 · from Ibri', ar: '٣ سبتمبر ٢٠٠٤ · من ولاية عبري' },
  },
  {
    year: 2007,
    kind: 'travel',
    title: { en: 'First flight — Thailand', ar: 'أول رحلة طيران — تايلاند' },
    detail: { en: 'Three years old', ar: 'في الثالثة من عمري' },
  },
  {
    year: 2013,
    kind: 'travel',
    title: { en: 'Summer in Germany', ar: 'صيف في ألمانيا' },
    detail: { en: 'And online since — on Instagram since 2013', ar: 'ومنذ ذلك الحين على إنستغرام (٢٠١٣)' },
  },
  {
    year: 2014,
    kind: 'milestone',
    title: { en: 'Scouts (grades 5–10)', ar: 'الكشافة (الصفوف ٥–١٠)' },
    detail: { en: 'Six years of teamwork outdoors', ar: 'ست سنوات من العمل الجماعي في الهواء الطلق' },
  },
  {
    year: 2018,
    kind: 'travel',
    title: { en: 'Azerbaijan', ar: 'أذربيجان' },
    detail: { en: 'New region, new culture', ar: 'منطقة جديدة وثقافة جديدة' },
  },
  {
    year: 2022,
    kind: 'education',
    title: { en: 'Started Software Engineering — BUC', ar: 'بدأت هندسة البرمجيات — كلية البريمي الجامعية' },
    detail: { en: 'The pivot to building · also: Thailand again (Feb 2022)', ar: 'التحوّل نحو البناء · وأيضًا: تايلاند مجددًا (فبراير ٢٠٢٢)' },
  },
  {
    year: 2023,
    kind: 'travel',
    title: { en: 'GCC road trip', ar: 'رحلة برية عبر الخليج' },
    detail: {
      en: 'Oman → UAE → Saudi Arabia → Bahrain → Qatar',
      ar: 'عُمان ← الإمارات ← السعودية ← البحرين ← قطر',
    },
  },
  {
    year: 2026,
    kind: 'goal',
    future: true,
    title: { en: 'Working toward studying abroad', ar: 'أعمل على الدراسة في الخارج' },
    detail: { en: 'The next chapter', ar: 'الفصل القادم' },
  },
];
