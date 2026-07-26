'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useMounted } from '@/hooks/useMounted';
import { cn } from '@/lib/cn';

/**
 * Light/dark toggle. The two glyphs cross-fade and counter-rotate in place
 * rather than swapping, so the control never appears to blink. Renders the
 * moon as a stable placeholder until mounted (no hydration flash).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const t = useTranslations('theme');
  const mounted = useMounted();
  const isDark = mounted && resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={t('toggle')}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        // 44px on touch, tightened to 36px only where a pointer is precise.
        'relative inline-flex size-11 items-center justify-center rounded-full text-text-muted md:size-9',
        'transition-[color,background-color,transform] duration-quick ease-out',
        'hover:bg-surface-2 hover:text-text active:scale-[0.94] active:duration-press',
        className,
      )}
    >
      <Sun
        strokeWidth={1.5}
        aria-hidden
        className={cn(
          'absolute size-[18px] transition-[opacity,transform] duration-300 ease-out',
          isDark ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
        )}
      />
      <Moon
        strokeWidth={1.5}
        aria-hidden
        className={cn(
          'absolute size-[18px] transition-[opacity,transform] duration-300 ease-out',
          isDark ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
        )}
      />
    </button>
  );
}
