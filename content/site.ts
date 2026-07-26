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
  /**
   * The hero's one sentence. It states the through-line of the work plainly —
   * every system here connects people to something they need — which is the
   * site's organising idea surfacing as a claim about the engineering, not as
   * a metaphor. Kept under 25 words so the hero stays one moment.
   */
  tagline: {
    en: 'Software Engineering graduate, First-Class Distinction. I build real-time, AI-driven systems that connect people to what they need — concept to launch.',
    ar: 'مهندس برمجيات، تخرّجت بامتياز مع مرتبة الشرف الأولى. أبني أنظمة تعمل لحظيًا وتستعين بالذكاء الاصطناعي، وأتابعها من الفكرة حتى الإطلاق.',
  },
  /**
   * The availability line. Specific beats vague: "available for opportunities"
   * tells a recruiter nothing they can act on, whereas the start date and the
   * geography answer the two questions they actually have. Kept short enough
   * to sit on one line inside the hero's pill at 360px.
   */
  status: {
    en: 'available now · Oman, GCC & remote',
    ar: 'متاح للعمل الآن · عُمان والخليج وعن بُعد',
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
