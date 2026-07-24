import type { SiteContent } from '@/types/site';
import { socials } from './socials';

/** Core identity. All facts here are confirmed from Rashid's 2026 CV. */
export const site: SiteContent = {
  name: 'Rashid Al Ghafri',
  displayName: { en: 'Rashid Al Ghafri', ar: 'راشد الغافري' },
  monogram: 'RA',
  role: {
    en: 'Software Engineer · Full-Stack Developer',
    ar: 'مهندس برمجيات · مطوّر متكامل',
  },
  tagline: {
    en: 'Software Engineering graduate (BSc, First-Class Distinction) building AI-driven, real-time full-stack systems, from concept to launch.',
    ar: 'خريج هندسة برمجيات (بكالوريوس، امتياز مع مرتبة الشرف الأولى)، يبني أنظمة متكاملة فورية مدعومة بالذكاء الاصطناعي، من الفكرة إلى الإطلاق.',
  },
  status: {
    en: 'available for opportunities · Oman · 2026',
    ar: 'متاح للفرص · عُمان · ٢٠٢٦',
  },
  location: {
    en: 'Oman',
    ar: 'عُمان',
  },
  email: 'rr.abadi44@gmail.com',
  phone: '+968 9484 6461',
  cvPath: '/resume/Rashid_Al_Ghafri_CV.pdf',
  portrait: '/images/portrait.jpg',
  socials,
};
