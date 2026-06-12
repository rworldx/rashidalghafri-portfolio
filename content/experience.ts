import type { ExperienceItem } from '@/types/experience';

/** Education + leadership + activities timeline (from the CV). */
export const experience: ExperienceItem[] = [
  {
    id: 'buc',
    kind: 'education',
    order: 5,
    title: { en: 'BSc Software Engineering', ar: 'بكالوريوس هندسة البرمجيات' },
    org: { en: 'Al Buraimi University College, Oman', ar: 'كلية البريمي الجامعية، عُمان' },
    period: 'Oct 2022 – Jul 2026',
    bullets: [
      {
        en: 'CGPA 3.96 / 4.00 — First-Class Distinction · College Honour Roll · consistent Dean’s List.',
        ar: 'المعدل التراكمي ٣٫٩٦ / ٤٫٠٠ — امتياز مع مرتبة الشرف الأولى · لوحة شرف الكلية · قائمة العميد باستمرار.',
      },
      {
        en: 'Senior Capstone: StudyNest — AI-powered collaborative study platform, graded Distinction.',
        ar: 'مشروع التخرج: StudyNest — منصة دراسة تعاونية مدعومة بالذكاء الاصطناعي، بتقدير امتياز.',
      },
    ],
  },
  {
    id: 'ieee',
    kind: 'leadership',
    order: 4,
    title: { en: 'Webmaster — IEEE Student Branch', ar: 'مسؤول الموقع — فرع طلاب IEEE' },
    org: { en: 'IEEE · BUC Chapter', ar: 'IEEE · فرع كلية البريمي الجامعية' },
    period: '2025 – 2026',
    bullets: [
      {
        en: 'Recognised by the IT Department for contributions to the official launch of the BUC IEEE Student Branch (Feb 2026).',
        ar: 'حصل على تقدير قسم تقنية المعلومات لمساهماته في الإطلاق الرسمي لفرع طلاب IEEE بالكلية (فبراير ٢٠٢٦).',
      },
      {
        en: 'Built and maintained the branch website and led digital presence, content strategy and member communications.',
        ar: 'بنى موقع الفرع وتولّى صيانته وقاد الحضور الرقمي واستراتيجية المحتوى والتواصل مع الأعضاء.',
      },
    ],
  },
  {
    id: 'capstone-rep',
    kind: 'leadership',
    order: 3,
    title: {
      en: 'Department Representative — Capstone Showcase',
      ar: 'ممثّل القسم — معرض مشاريع التخرج',
    },
    org: { en: 'IT Department · BUC', ar: 'قسم تقنية المعلومات · كلية البريمي الجامعية' },
    period: 'Apr 2026',
    bullets: [
      {
        en: 'Selected to deliver the IT Department’s flagship capstone presentation (in English) before the Dean, faculty and students — representing all five disciplines.',
        ar: 'اختير لتقديم العرض الرئيسي لمشاريع تخرج قسم تقنية المعلومات (بالإنجليزية) أمام العميد وأعضاء هيئة التدريس والطلاب — ممثّلًا التخصصات الخمسة جميعها.',
      },
    ],
  },
];
