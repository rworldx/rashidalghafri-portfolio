import type { SocialLink } from '@/types/site';

/** External profiles. Email is handled specially (copy-to-clipboard + mailto). */
export const socials: SocialLink[] = [
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/rworldx',
    external: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/rashid-al-ghafri',
    external: true,
  },
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:rr.abadi44@gmail.com',
  },
];
