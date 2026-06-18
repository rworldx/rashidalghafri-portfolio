import type { Localized } from '@/types/common';

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

/** Places travelled (home first). Used as a small chip row. */
export const places: { name: Localized; home?: boolean }[] = [
  { name: { en: 'Oman', ar: 'عُمان' }, home: true },
  { name: { en: 'UAE', ar: 'الإمارات' } },
  { name: { en: 'Thailand', ar: 'تايلاند' } },
  { name: { en: 'Germany', ar: 'ألمانيا' } },
  { name: { en: 'Azerbaijan', ar: 'أذربيجان' } },
  { name: { en: 'Saudi Arabia', ar: 'السعودية' } },
  { name: { en: 'Bahrain', ar: 'البحرين' } },
  { name: { en: 'Qatar', ar: 'قطر' } },
];
