import type { SiteContent } from '@/types/site';
import { socials } from './socials';

/** Core identity. All facts here are confirmed from Rashid's 2026 CV. */
export const site: SiteContent = {
  name: 'Rashid Al Ghafri',
  monogram: 'RA',
  role: {
    en: 'Software Engineer · Final-year SE student at BUC',
    ar: 'مهندس برمجيات · طالب هندسة برمجيات في السنة النهائية بكلية البريمي الجامعية',
  },
  tagline: {
    en: 'I build full-stack systems and AI-driven tools — from real-time collaboration to multimodal assistants — shipped end to end.',
    ar: 'أبني أنظمة متكاملة وأدوات مدعومة بالذكاء الاصطناعي — من التعاون اللحظي إلى المساعدات متعددة الوسائط — من الفكرة حتى الإطلاق.',
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
