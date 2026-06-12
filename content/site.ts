import type { SiteContent } from '@/types/site';
import { socials } from './socials';

/** Core identity. All facts here are confirmed from Rashid's 2026 CV. */
export const site: SiteContent = {
  name: 'Rashid Al Ghafri',
  monogram: 'RA',
  role: {
    en: 'Software Engineer · Full-Stack Developer',
    ar: 'مهندس برمجيات · مطوّر متكامل',
  },
  tagline: {
    en: 'Final-year Software Engineering student building AI-driven, real-time full-stack systems — from concept to launch.',
    ar: 'طالب هندسة برمجيات في سنته الأخيرة، يبني أنظمة متكاملة فورية مدعومة بالذكاء الاصطناعي — من الفكرة إلى الإطلاق.',
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
  cvPath: '/resume/Rashid_Al_Ghafri_CV.pdf',
  socials,
};
