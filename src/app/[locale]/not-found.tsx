import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Container } from '@/components/layout/Container';
import { buttonVariants } from '@/components/ui/Button';

/** Localized 404 (PRD FR-8). */
export default function NotFound() {
  const t = useTranslations('notFound');
  return (
    <Container className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <p className="font-mono text-6xl font-bold text-accent">{t('code')}</p>
      <h1 className="mt-4 font-display text-3xl font-semibold text-text">{t('title')}</h1>
      <p className="mt-2 max-w-md text-text-muted">{t('body')}</p>
      <Link href="/" className={buttonVariants({ variant: 'primary', size: 'lg' }) + ' mt-8'}>
        {t('home')}
      </Link>
    </Container>
  );
}
