import type { Localized } from '@/types/common';

interface LanguageProficiency {
  name: Localized;
  level: Localized;
}

interface Education {
  degree: Localized;
  school: string;
  period: Localized;
  honours: Localized;
  coursework: string[];
  languages: LanguageProficiency[];
}

/** Education block (from the CV) — degree, honours, coursework, languages. */
export const education: Education = {
  degree: { en: 'BSc Software Engineering', ar: 'بكالوريوس هندسة البرمجيات' },
  school: 'Al Buraimi University College · Al Buraimi, Oman',
  period: { en: 'Oct 2022 – Jul 2026', ar: 'أكتوبر ٢٠٢٢ – يوليو ٢٠٢٦' },
  honours: {
    en: 'CGPA 3.96 / 4.00 — First-Class Distinction · College Honour Roll (both semesters) · Dean’s List. Senior capstone (StudyNest) graded Distinction.',
    ar: 'معدّل ٣٫٩٦ / ٤٫٠٠ — امتياز مع مرتبة الشرف الأولى · لوحة شرف الكلية (الفصلين) · قائمة العميد. مشروع التخرّج (StudyNest) بتقدير امتياز.',
  },
  coursework: [
    'Data Structures & Algorithms',
    'Software Architecture & Design',
    'Web Design & Development',
    'Software Quality Assurance',
    'Database Systems',
    'Network & Communications',
    'Object-Oriented Programming',
    'Artificial Intelligence',
  ],
  languages: [
    {
      name: { en: 'Arabic', ar: 'العربية' },
      level: { en: 'Native (C2)', ar: 'اللغة الأم (C2)' },
    },
    {
      name: { en: 'English', ar: 'الإنجليزية' },
      level: { en: 'Upper-Intermediate (B2)', ar: 'فوق المتوسط (B2)' },
    },
  ],
};
