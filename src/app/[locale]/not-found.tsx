import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { navItems } from '@/config/nav.config';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * Localized 404. An empty screen is an invitation to act, so this one offers
 * every real destination rather than a single "back home" and a dead end.
 */
export default function NotFound() {
  const t = useTranslations('notFound');
  const tn = useTranslations('nav');

  return (
    <Container className="flex min-h-[70dvh] flex-col justify-center py-phi-4">
      <p className="tnum font-mono text-2xs uppercase tracking-[0.2em] text-accent">{t('code')}</p>
      <h1 className="display-1 mt-6 text-text">{t('title')}</h1>
      <p className="measure-tight mt-phi text-lg text-text-muted">{t('body')}</p>

      <div className="mt-phi-2">
        <Link href="/" className={cn(buttonVariants({ variant: 'primary', size: 'lg' }))}>
          {t('home')}
        </Link>
      </div>

      <ul className="mt-phi-3 border-t border-border-strong">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="group flex items-center justify-between gap-4 border-b border-border py-5 text-lg text-text-muted transition-colors duration-quick ease-out hover:text-text"
            >
              {tn(item.labelKey)}
              <ArrowRight
                strokeWidth={1.5}
                aria-hidden
                className="size-4 shrink-0 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
              />
            </Link>
          </li>
        ))}
      </ul>
    </Container>
  );
}
