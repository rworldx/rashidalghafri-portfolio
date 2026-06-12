import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

/**
 * Locale-aware navigation primitives. Always import Link / useRouter / usePathname
 * from here (never from next/link) so locale prefixing stays correct.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
