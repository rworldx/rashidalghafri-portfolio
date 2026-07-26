'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, m, useMotionValueEvent, useScroll } from 'framer-motion';
import { Link, usePathname } from '@/i18n/navigation';
import { navItems } from '@/config/nav.config';
import { site } from '@content/site';
import { cn } from '@/lib/cn';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';

/**
 * Floating translucent chrome. At the top of a page it is invisible and the
 * content owns the viewport; once the page scrolls it settles into a quiet
 * bar with a hairline edge, so content passes under a real layer instead of
 * meeting a permanent 1px divider.
 *
 * Scroll state comes from Framer's `useScroll`, never a scroll event listener.
 */
export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [lifted, setLifted] = useState(false);

  const { scrollY } = useScroll();
  useMotionValueEvent(scrollY, 'change', (y) => setLifted(y > 24));

  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    triggerRef.current?.focus();
  }, []);

  // Close on route change.
  useEffect(() => setOpen(false), [pathname]);

  // Escape dismisses, focus stays inside the sheet, page scroll is locked.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== 'Tab' || !panel) return;
      const focusables = panel.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!first || !last) return;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    panel?.querySelector<HTMLElement>('a[href]')?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <header className="fixed inset-x-0 top-0 z-nav px-3 pt-3 sm:px-6 sm:pt-4">
      <div
        className={cn(
          'mx-auto flex h-14 max-w-shell items-center justify-between rounded-full pe-2 ps-5 sm:h-16 sm:pe-3 sm:ps-7',
          'transition-[background-color,box-shadow,backdrop-filter] duration-500 ease-out',
          lifted || open ? 'material' : 'bg-transparent shadow-none',
        )}
      >
        <Link
          href="/"
          aria-label={site.name}
          // The wordmark is a mark, not a sentence: forced LTR so the period
          // stays on the right of "RA" instead of being flipped to ".RA" by
          // the bidi algorithm in Arabic.
          className="force-ltr -ms-2 inline-flex min-h-11 items-center gap-px rounded-full px-2 text-lg font-medium tracking-[-0.03em] text-text transition-opacity duration-quick ease-out hover:opacity-70"
        >
          {site.monogram}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop: one line, always. */}
        <div className="hidden items-center gap-1 md:flex">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const active =
                pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={cn(
                      'relative inline-flex h-9 items-center rounded-full px-4 text-sm transition-colors duration-quick ease-out',
                      active ? 'text-text' : 'text-text-muted hover:text-text',
                    )}
                  >
                    {active && (
                      <m.span
                        layoutId="nav-active"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-surface-2"
                        transition={{ type: 'spring', bounce: 0.18, duration: 0.5 }}
                      />
                    )}
                    <span className="relative">{t(item.labelKey)}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
          <span className="mx-2 h-4 w-px bg-border" aria-hidden />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-0.5 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            ref={triggerRef}
            type="button"
            onClick={() => (open ? close() : setOpen(true))}
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            aria-controls="mobile-nav"
            className="-me-1 inline-flex size-11 items-center justify-center rounded-full text-text transition-transform duration-press ease-out active:scale-[0.94]"
          >
            {/* Two bars that rotate into an X rather than swapping icons. */}
            <span className="relative block h-3 w-5" aria-hidden>
              <span
                className={cn(
                  'absolute inset-x-0 top-0 h-px bg-current transition-transform duration-500 ease-drawer',
                  open && 'translate-y-[6px] rotate-45',
                )}
              />
              <span
                className={cn(
                  'absolute inset-x-0 bottom-0 h-px bg-current transition-transform duration-500 ease-drawer',
                  open && '-translate-y-[5px] -rotate-45',
                )}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile sheet: one material surface, links staggered in and back out. */}
      <AnimatePresence>
        {open && (
          <m.div
            id="mobile-nav"
            ref={panelRef}
            initial={{ opacity: 0, y: -10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.99 }}
            transition={{ type: 'spring', bounce: 0, duration: 0.42 }}
            style={{ transformOrigin: 'top center' }}
            className="material absolute inset-x-3 top-[4.75rem] rounded-lg p-3 sm:inset-x-6 md:hidden"
          >
            <m.ul
              initial="hidden"
              animate="visible"
              transition={{ staggerChildren: 0.05, delayChildren: 0.06 }}
            >
              {navItems.map((item, i) => {
                const active =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <m.li
                    key={item.href}
                    variants={{
                      hidden: { opacity: 0, y: 12 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      onClick={close}
                      className={cn(
                        'flex items-center justify-between rounded-sm px-4 py-3.5 text-xl transition-colors duration-quick ease-out active:bg-surface-2',
                        active ? 'text-text' : 'text-text-muted',
                      )}
                    >
                      {t(item.labelKey)}
                      <span className="tnum font-mono text-2xs text-text-faint">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </Link>
                  </m.li>
                );
              })}
            </m.ul>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
