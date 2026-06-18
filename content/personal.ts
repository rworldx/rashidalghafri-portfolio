import type { Localized, Travel } from '@/types/common';

interface NumberStat {
  value: string;
  label: Localized;
}

/** "By the numbers" — light, personal stats (not professional metrics). */
export const personalStats: NumberStat[] = [
  { value: '7', label: { en: 'Countries visited', ar: 'دولة زرتُها' } },
  { value: '27', label: { en: 'Anime watched', ar: 'أنمي شاهدته' } },
  { value: '200+', label: { en: 'Films seen', ar: 'فيلم' } },
  { value: '20+', label: { en: 'Series finished', ar: 'مسلسل' } },
];

/** Travel log — rendered as boarding-pass cards on the About page. */
export const travels: Travel[] = [
  {
    fromCode: 'OM',
    toCode: 'TH',
    to: { en: 'Thailand', ar: 'تايلاند' },
    year: 2007,
    note: { en: 'My first flight — age 3', ar: 'أول رحلة طيران — في الثالثة من عمري' },
    mode: 'flight',
  },
  {
    fromCode: 'OM',
    toCode: 'DE',
    to: { en: 'Germany', ar: 'ألمانيا' },
    year: 2013,
    note: { en: 'Summer holiday', ar: 'عطلة الصيف' },
    mode: 'flight',
  },
  {
    fromCode: 'OM',
    toCode: 'AZ',
    to: { en: 'Azerbaijan', ar: 'أذربيجان' },
    year: 2018,
    note: { en: 'New region, new culture', ar: 'منطقة جديدة وثقافة جديدة' },
    mode: 'flight',
  },
  {
    fromCode: 'OM',
    toCode: 'TH',
    to: { en: 'Thailand, again', ar: 'تايلاند، مجددًا' },
    year: 2022,
    note: { en: 'Back to Bangkok', ar: 'عودة إلى بانكوك' },
    mode: 'flight',
  },
  {
    fromCode: 'OM',
    toCode: 'QA',
    to: { en: 'GCC road trip', ar: 'رحلة برية خليجية' },
    year: 2023,
    note: {
      en: 'Oman → UAE → Saudi Arabia → Bahrain → Qatar',
      ar: 'عُمان ← الإمارات ← السعودية ← البحرين ← قطر',
    },
    mode: 'road',
    stops: ['OM', 'AE', 'SA', 'BH', 'QA'],
  },
];

/** Early schooling — rendered as an academic "path" on the About page. */
export const schooling: { grades: string; name: Localized }[] = [
  { grades: '1–4', name: { en: 'Shumūʿ Al-Maʿrifa School', ar: 'مدرسة شموع المعرفة' } },
  {
    grades: '5–10',
    name: { en: 'Mohammed bin Sulaiman Al Ghafri School', ar: 'مدرسة محمد بن سليمان الغافري' },
  },
  {
    grades: '11–12',
    name: { en: 'Dirar bin Al-Azwar — Basic Education', ar: 'مدرسة ضرار بن الأزور للتعليم الأساسي' },
  },
];

/** Footnote under the schooling path. */
export const schoolingNote: Localized = {
  en: 'Scouts (grades 5–10) · consistently among the top students.',
  ar: 'الكشافة (الصفوف ٥–١٠) · من الطلاب المتفوّقين باستمرار.',
};

/** Aside note for the travel log (UAE is uncounted — too frequent). */
export const travelNote: Localized = {
  en: 'UAE — lost count somewhere past 100 visits; it’s practically a second home.',
  ar: 'الإمارات — فقدتُ العدّ بعد أكثر من ١٠٠ زيارة؛ تكاد تكون بيتي الثاني.',
};
