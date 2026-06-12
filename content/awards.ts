import type { Award } from '@/types/award';

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
      en: '2nd Place — Student Entrepreneurship Camp',
      ar: 'المركز الثاني — معسكر ريادة الأعمال الطلابي',
    },
    date: '2025',
    description: {
      en: 'Pitched a tech-based business concept to industry judges, outperforming 20+ teams; earned a cash prize and recognition from the Chairperson of Oman’s SME Authority.',
      ar: 'قدّم فكرة عمل قائمة على التقنية أمام لجنة من خبراء الصناعة، متفوّقًا على أكثر من ٢٠ فريقًا؛ وحصل على جائزة مالية وتقدير من رئيس الهيئة العامة لتنمية المؤسسات الصغيرة والمتوسطة في عُمان.',
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
