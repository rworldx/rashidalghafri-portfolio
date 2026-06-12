/**
 * Navigation map. `labelKey` resolves against the `nav` namespace in messages.
 * hrefs are locale-agnostic; the locale-aware Link adds the prefix.
 */
export interface NavItem {
  href: string;
  labelKey: 'work' | 'about' | 'contact';
}

export const navItems: NavItem[] = [
  { href: '/projects', labelKey: 'work' },
  { href: '/about', labelKey: 'about' },
  { href: '/contact', labelKey: 'contact' },
];
