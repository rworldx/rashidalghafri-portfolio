'use client';

import { useLocale, useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { aboutIntro } from '@content/about';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * A single statement, set large. No heading above it and no card around it:
 * the sentence is the section, and giving it the full measure is what makes it
 * land differently from the media-led block above.
 */
export function AboutTeaser() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <FlowBranch>
      <Reveal>
        <p className="museum-2 measure text-text">{pick(aboutIntro, locale)}</p>
        <Link
          href="/about"
          className="action group mt-phi-2 inline-flex items-center gap-2 border-b border-accent-line pb-1 font-medium text-accent transition-colors duration-quick ease-out hover:border-accent"
        >
          {t('more')}
          <ArrowRight
            strokeWidth={1.75}
            aria-hidden
            className="size-4 transition-transform duration-quick ease-out group-hover:translate-x-0.5 rtl:rotate-180 rtl:group-hover:-translate-x-0.5"
          />
        </Link>
      </Reveal>
    </FlowBranch>
  );
}
