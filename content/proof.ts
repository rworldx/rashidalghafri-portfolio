import type { Localized } from '@/types/common';

export interface ProofPoint {
  /**
   * The figure itself. Localized, and a string rather than a number so that
   * "Top 30" and "3.96" can both live here — and so the Arabic side can say
   * "الثاني" instead of leaving an English "2nd" stranded in an RTL page.
   */
  value: Localized;
  /** What the figure is. */
  label: Localized;
  /** The context that makes the figure mean something. */
  detail: Localized;
}

/**
 * The measured record — the four facts worth reading before any project.
 *
 * Every one is verifiable and comes straight from the 2026 CV. Deliberately
 * FOUR, not twelve: a wall of statistics reads as padding, and the point of
 * this section is that a recruiter can scan it in about five seconds.
 *
 * Order is by how hard the claim is to dismiss, not chronological.
 */
export const proof: ProofPoint[] = [
  {
    value: { en: 'Top 30', ar: 'أفضل ٣٠' },
    label: {
      en: 'of 738 national STEM projects',
      ar: 'من ٧٣٨ مشروعًا وطنيًا في العلوم والتقنية',
    },
    detail: {
      en: 'London International Youth Science Forum — national finals, Muscat, 2026',
      ar: 'منتدى لندن الدولي لعلوم الشباب — التصفيات الوطنية، مسقط، ٢٠٢٦',
    },
  },
  {
    value: { en: '3.96', ar: '٣٫٩٦' },
    label: { en: 'CGPA out of 4.00', ar: 'المعدل التراكمي من ٤٫٠٠' },
    detail: {
      en: 'BSc Software Engineering, First-Class Distinction · College Honour Roll, every semester',
      ar: 'بكالوريوس هندسة البرمجيات، امتياز مع مرتبة الشرف الأولى · لوحة شرف الكلية في جميع الفصول',
    },
  },
  {
    value: { en: '95%', ar: '٩٥٪' },
    label: { en: 'said the AI assistant helped', ar: 'قالوا إن المساعد الذكي ساعدهم' },
    detail: {
      en: 'StudyNest, validated in a 44-student pilot — 86% reported high satisfaction',
      ar: 'ستدي نست، جرى التحقق منها مع ٤٤ طالبًا — ٨٦٪ أبدوا رضًا عاليًا',
    },
  },
  {
    value: { en: '2nd', ar: 'الثاني' },
    label: { en: 'of 20+ teams', ar: 'من أكثر من ٢٠ فريقًا' },
    detail: {
      en: 'EnerGrid, Riyada Promising Student Projects Camp — cash prize, 2025',
      ar: 'إنرغريد، ملتقى المشاريع الطلابية الواعدة من ريادة — جائزة مالية، ٢٠٢٥',
    },
  },
];
