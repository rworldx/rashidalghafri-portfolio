'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useTransition } from 'react';
import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/cn';

/** Toggles EN ⇄ AR on the current route, persisting via next-intl cookie. */
export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations('locale');
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const next = routing.locales.find((l) => l !== locale) ?? routing.defaultLocale;

  const onSwitch = () => {
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <button
      type="button"
      onClick={onSwitch}
      disabled={isPending}
      aria-label={t('switch')}
      className={cn(
        'inline-flex h-9 items-center justify-center rounded-sm px-2.5 font-mono text-xs uppercase tracking-wide text-text-muted transition-colors hover:bg-surface-2 hover:text-text',
        className,
      )}
    >
      {next === 'ar' ? 'ع' : 'EN'}
    </button>
  );
}
