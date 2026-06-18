import type { TimelineEntry } from '@/types/common';

/**
 * Professional journey (PRD §B.3) — the chronological path through education,
 * projects, recognition and leadership. Drives the scroll-draw timeline on the
 * Résumé page (the personal travel story lives on /about instead).
 */
export const journey: TimelineEntry[] = [
  {
    year: 2022,
    kind: 'education',
    title: {
      en: 'Began B.Eng, Software Engineering — BUC',
      ar: 'بدأت بكالوريوس هندسة البرمجيات — كلية البريمي الجامعية',
    },
    detail: {
      en: 'Al Buraimi University College, Oman · Oct 2022',
      ar: 'كلية البريمي الجامعية، عُمان · أكتوبر ٢٠٢٢',
    },
  },
  {
    year: 2024,
    kind: 'award',
    title: {
      en: 'Injaz Oman — National Pre-Finals ("Techno Water")',
      ar: 'إنجاز عُمان — التصفيات قبل النهائية ("تكنو ووتر")',
    },
    detail: { en: 'Exhibited at Al Arefan City, Muscat', ar: 'عُرض في مدينة العرفان، مسقط' },
  },
  {
    year: 2024,
    kind: 'hackathon',
    title: { en: 'Omantel × Hafeet Rail Hackathon', ar: 'هاكاثون عُمانتل × قطار حفيت' },
    detail: {
      en: 'IoT smart waste-sorting bin concept · NB-IoT on Omantel',
      ar: 'فكرة حاوية فرز نفايات ذكية بإنترنت الأشياء · NB-IoT على شبكة عُمانتل',
    },
  },
  {
    year: 2025,
    kind: 'project',
    title: { en: 'Started building StudyNest', ar: 'بدأت بناء StudyNest' },
    detail: {
      en: 'AI-powered collaborative study platform',
      ar: 'منصّة دراسة تعاونية مدعومة بالذكاء الاصطناعي',
    },
  },
  {
    year: 2025,
    kind: 'award',
    title: {
      en: '2nd Place — Promising Student Projects Camp (EnerGrid)',
      ar: 'المركز الثاني — مخيم مشاريع الطلاب الواعدة (EnerGrid)',
    },
    detail: {
      en: 'Smart energy-monitoring concept · cash prize from Riyada',
      ar: 'فكرة ذكية لمراقبة الطاقة · جائزة نقدية من ريادة',
    },
  },
  {
    year: 2026,
    kind: 'milestone',
    title: {
      en: 'Webmaster — IEEE Student Branch (BUC launch)',
      ar: 'مسؤول الموقع — فرع IEEE الطلابي (إطلاق BUC)',
    },
    detail: { en: 'Official branch launch · Feb 2026', ar: 'الإطلاق الرسمي للفرع · فبراير ٢٠٢٦' },
  },
  {
    year: 2026,
    kind: 'milestone',
    title: {
      en: 'Department Representative — Capstone Showcase',
      ar: 'ممثّل القسم — معرض مشاريع التخرّج',
    },
    detail: { en: 'Presented to the Dean & faculty · Apr 2026', ar: 'قدّمت أمام العميد وأعضاء الهيئة · أبريل ٢٠٢٦' },
  },
  {
    year: 2026,
    kind: 'award',
    title: { en: 'LIYSF — National Finalist, Top 30', ar: 'LIYSF — متأهل وطني، أفضل ٣٠' },
    detail: { en: 'Top 30 of 738 STEM projects · Jun 2026', ar: 'أفضل ٣٠ من ٧٣٨ مشروعًا · يونيو ٢٠٢٦' },
  },
  {
    year: 2026,
    kind: 'milestone',
    title: { en: 'StudyNest live · graduating (Distinction)', ar: 'إطلاق StudyNest · التخرّج بامتياز' },
    detail: { en: 'studynest.dev · B.Eng completes Jul 2026', ar: 'studynest.dev · إتمام البكالوريوس يوليو ٢٠٢٦' },
  },
];
