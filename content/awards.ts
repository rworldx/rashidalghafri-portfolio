import type { Award, Certification } from '@/types/award';

/** Honours & achievements (from the CV). Sorted by `order` desc in the UI. */
export const awards: Award[] = [
  {
    id: 'liysf-2026',
    order: 4,
    title: {
      en: 'London International Youth Science Forum — National Finalist, Top 30',
      ar: 'منتدى لندن الدولي للعلوم للشباب — متأهل وطني، أفضل ٣٠',
    },
    date: 'Jun 2026',
    tag: { en: 'National finalist', ar: 'متأهل وطني' },
    description: {
      en: 'Presented StudyNest at the national finals (Military Technological College, Muscat) — selected among the top 30 of 738 STEM projects nationwide.',
      ar: 'قدّم StudyNest في النهائيات الوطنية (الكلية التقنية العسكرية، مسقط) — اختير ضمن أفضل ٣٠ من بين ٧٣٨ مشروعًا في العلوم والتقنية على مستوى البلاد.',
    },
  },
  {
    id: 'entrepreneurship-2025',
    order: 3,
    title: {
      en: '2nd Place — Promising Student Projects Camp',
      ar: 'المركز الثاني — مخيم مشاريع الطلاب الواعدة',
    },
    org: {
      en: 'SME Development Authority (Riyada) · Oman Promising Startups Programme',
      ar: 'هيئة تنمية المشاريع الصغيرة والمتوسطة (ريادة) · برنامج الشركات الناشئة الواعدة العُماني',
    },
    date: '2025',
    tag: { en: 'EnerGrid', ar: 'EnerGrid' },
    href: '/projects/energrid',
    description: {
      en: 'Pitched EnerGrid — a smart energy-monitoring concept that tracks real-time power consumption per device to cut waste and lower household bills — placing 2nd of 20+ teams and earning a cash prize and recognition from Riyada’s Chairperson.',
      ar: 'قدّم EnerGrid — فكرة ذكية لمراقبة الطاقة تتتبّع استهلاك كل جهاز لحظيًا لتقليل الهدر وخفض فواتير المنزل — محقّقًا المركز الثاني بين أكثر من ٢٠ فريقًا، ونال جائزة نقدية وتكريمًا من رئيس هيئة ريادة.',
    },
  },
  {
    id: 'hackathon-2024',
    order: 2,
    title: {
      en: 'Omantel × Hafeet Rail Hackathon',
      ar: 'هاكاثون عُمانتل × قطار حفيت',
    },
    date: '2024',
    description: {
      en: 'Completed a 4-day intensive hackathon with international teams — collaborating under pressure to design and prototype a working solution.',
      ar: 'أكمل هاكاثونًا مكثفًا لمدة ٤ أيام مع فرق دولية — متعاونًا تحت الضغط لتصميم حلٍّ عملي وبناء نموذجه الأولي.',
    },
  },
  {
    id: 'injaz-2024',
    order: 1,
    title: {
      en: 'Injaz Oman Entrepreneurship Programme',
      ar: 'برنامج إنجاز عُمان لريادة الأعمال',
    },
    date: '2023 – 2024',
    description: {
      en: 'Reached the national pre-finals with student startup “Techno Water”; exhibited at Al Arefan City, Muscat before industry leaders and investors.',
      ar: 'بلغ التصفيات شبه النهائية الوطنية بمشروع الطلاب الناشئ «تكنو ووتر»؛ وعُرض في مدينة العرفان، مسقط أمام قادة الصناعة والمستثمرين.',
    },
  },
];

/** Certifications (from the CV). The section renders only if this is non-empty. */
export const certifications: Certification[] = [
  {
    id: 'ic3-gs5',
    title: 'IC3 Digital Literacy — Global Standard 5 (GS5)',
    issuer: 'Certiport',
    year: 2023,
    detail: {
      en: 'Internationally recognised certification: computing fundamentals, key applications (Word, Excel, PowerPoint), and online collaboration & safety.',
      ar: 'شهادة معترف بها دوليًا: أساسيات الحوسبة، والتطبيقات الرئيسية (Word، Excel، PowerPoint)، والتعاون والأمان عبر الإنترنت.',
    },
  },
];
