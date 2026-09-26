'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Toggles EN to AR on the current route, persisting via the next-intl cookie. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations('locale');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const next = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const onSwitch = () => {
    startTransition(() => {
      /*
       * `scroll: false`, then scroll ourselves.
       *
       * Next 16 changed where a navigation lands. Left to its default, a
       * switch taken from the top of the page dropped the reader about 800px
       * down — it scrolls the changed segment into view rather than the
       * document. Next 15 always went to the top, which is what a reader
       * expects from a language toggle, so that is restored explicitly.
       */
      router.replace(pathname, { locale: next, scroll: false });
      window.scrollTo({ top: 0, behavior: 'instant' });
    });
  };

  return (
    <button
      type="button"
      onClick={onSwitch}
      disabled={isPending}
      aria-label={t('switch')}
      className={cn(
        // 44px on touch, tightened to 36px only where a pointer is precise.
        'inline-flex size-11 items-center justify-center rounded-full font-mono text-2xs uppercase tracking-[0.12em] text-text-muted md:size-9',
        'transition-[color,background-color,transform] duration-quick ease-out',
        'hover:bg-surface-2 hover:text-text active:scale-[0.94] active:duration-press disabled:opacity-50',
        className,
      )}
    >
      {next === 'ar' ? 'ع' : 'EN'}
    </button>
  );
}
