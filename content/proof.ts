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
    value: { en: 'Top 30', ar: 'ضمن أفضل 30' },
    label: {
      en: 'of 738 national STEM projects',
      ar: 'من بين 738 مشروعًا علميًا على مستوى السلطنة',
    },
    detail: {
      en: 'London International Youth Science Forum — national finals, Muscat, 2026',
      ar: 'منتدى لندن الدولي لعلوم الشباب، التصفيات الوطنية بمسقط، 2026',
    },
  },
  {
    value: { en: '3.96', ar: '3.96' },
    label: { en: 'CGPA out of 4.00', ar: 'المعدل التراكمي من 4.00' },
    detail: {
      en: 'BSc Software Engineering, First-Class Distinction · College Honour List, every semester since the Foundation year',
      ar: 'بكالوريوس هندسة برمجيات بامتياز مع مرتبة الشرف الأولى، وعلى قائمة شرف الكلية في كل فصل منذ السنة التأسيسية',
    },
  },
  {
    value: { en: '95%', ar: '95%' },
    label: { en: 'said the AI assistant helped', ar: 'قالوا إن المساعد الذكي حسّن طريقة مذاكرتهم' },
    detail: {
      en: 'StudyNest, validated in a 44-student pilot — 86% reported high satisfaction',
      ar: 'StudyNest، بعد تجربة شارك فيها 44 طالبًا، أبدى 86% منهم رضًا عاليًا',
    },
  },
  {
    value: { en: '2nd', ar: 'المركز الثاني' },
    label: { en: 'of 20+ teams', ar: 'بين أكثر من 20 فريقًا' },
    detail: {
      en: 'EnerGrid, Riyada Promising Student Projects Camp — cash prize, 2025',
      ar: 'EnerGrid، ملتقى المشاريع الطلابية الواعدة من ريادة، بجائزة مالية، 2025',
    },
  },
];
