'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { navItems } from '@/config/nav.config';
import { site } from '@content/site';
import { cn } from '@/lib/cn';
import { ThemeToggle } from './ThemeToggle';
import { LocaleSwitcher } from './LocaleSwitcher';

/** Sticky minimal navbar; collapses to a sheet menu on mobile (PRD FR-1). */
export function Navbar() {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg/80 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link
          href="/"
          className="font-display text-lg font-semibold tracking-tight text-text"
          aria-label={site.name}
        >
          {site.monogram}
          <span className="text-accent">.</span>
        </Link>

        {/* Desktop links */}
        <div className="hidden items-center gap-1 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-sm px-3 py-2 text-sm text-text-muted transition-colors hover:bg-surface-2 hover:text-text"
            >
              {t(item.labelKey)}
            </Link>
          ))}
          <div className="mx-1 h-5 w-px bg-border" />
          <LocaleSwitcher />
          <ThemeToggle />
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-1 md:hidden">
          <LocaleSwitcher />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t('close') : t('menu')}
            aria-expanded={open}
            className="inline-flex h-9 w-9 items-center justify-center rounded-sm text-text-muted hover:bg-surface-2 hover:text-text"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile sheet */}
      <div
        className={cn(
          'overflow-hidden border-border bg-bg transition-[max-height] duration-300 ease-out md:hidden',
          open ? 'max-h-64 border-t' : 'max-h-0',
        )}
      >
        <div className="flex flex-col px-5 py-2 sm:px-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-sm px-2 py-3 text-base text-text transition-colors hover:bg-surface-2"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
