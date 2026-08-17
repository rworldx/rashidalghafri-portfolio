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
    // Written out rather than read from `site.email`, because site.ts imports
    // THIS file — deriving it here makes the two modules circular and the
    // build dies collecting /resume. Keep the two in step by hand.
    href: 'mailto:rashidalghafri.dev@gmail.com',
  },
];
