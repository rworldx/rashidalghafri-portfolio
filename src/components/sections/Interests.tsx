'use client';

import { useLocale, useTranslations } from 'next-intl';
import {
  Film,
  Headphones,
  Clapperboard,
  ChefHat,
  Languages,
  Plane,
  Camera,
  type LucideIcon,
} from 'lucide-react';
import { interests } from '@content/about';
import { personalStats } from '@content/personal';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { AnimatedCounter } from '@/components/motion/AnimatedCounter';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/** Maps the icon name stored in content to a lucide component. */
const icons: Record<string, LucideIcon> = {
  Film,
  Headphones,
  Clapperboard,
  ChefHat,
  Languages,
  Plane,
  Camera,
};

/**
 * What he does when he is not building.
 *
 * Seven interests used to be seven identical cards, which is the shape that
 * makes any page look generated. They are a two-column list separated by
 * hairlines instead: the same information, grouped by space and rhythm rather
 * than boxed one by one.
 */
export function Interests() {
  const t = useTranslations('about');
  const locale = useLocale();

  return (
    <FlowBranch>
      <SectionHeading
        title={t('interestsTitle')}
        emphasis={t('interestsEmphasis')}
        className="mb-phi-2"
      />

      <ul className="grid gap-x-phi-2 sm:grid-cols-2">
        {interests.map((interest, i) => {
          const Icon = icons[interest.icon] ?? Film;
          return (
            <Reveal
              as="li"
              key={interest.icon}
              delay={i * 0.04}
              distance={12}
              className="flex items-center gap-4 border-b border-border py-5"
            >
              <Icon
                strokeWidth={1.5}
                aria-hidden
                className="size-5 shrink-0 text-accent"
              />
              <span className="text-text-muted">{pick(interest.label, locale)}</span>
            </Reveal>
          );
        })}
      </ul>

      {/* Light personal numbers, not professional metrics. */}
      <Reveal className="mt-phi-3">
        <h3 className="label mb-6 text-text-faint">{t('numbersTitle')}</h3>
        <dl className="flex flex-wrap gap-x-phi-2 gap-y-6">
          {personalStats.map((s) => (
            <div key={s.label.en}>
              <dt className="sr-only">{pick(s.label, locale)}</dt>
              <dd>
                <span className="tnum force-ltr block font-mono text-2xl text-text">
                  <AnimatedCounter value={s.value} />
                </span>
                <span className="mt-1 block text-sm text-text-muted">
                  {pick(s.label, locale)}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </FlowBranch>
  );
}
