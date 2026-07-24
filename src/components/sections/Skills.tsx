'use client';

import { useLocale, useTranslations } from 'next-intl';
import { skills, exploring } from '@content/skills';
import { pick } from '@/lib/localized';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Tag } from '@/components/ui/Tag';

/**
 * Capabilities as a ledger: the category on the short side, the items flowing
 * across the long side, one hairline between rows.
 *
 * Ten groups rendered as ten identical bordered cards was the single most
 * template-looking block on the site, and it also made the page harder to
 * scan — the eye had to re-enter every box. A reader can now run straight
 * down the category column and stop at the one they care about.
 */
export function Skills() {
  const t = useTranslations('skills');
  const locale = useLocale();

  return (
    <section className={sectionY}>
      <Container>
        <SectionHeading title={t('title')} emphasis={t('emphasis')} className="mb-phi-2" />

        <dl className="border-t border-border-strong">
          {skills.map((group, i) => (
            <Reveal
              key={group.id}
              delay={Math.min(i, 6) * 0.04}
              distance={12}
              className="grid gap-x-phi-2 gap-y-3 border-b border-border py-6 sm:grid-cols-[minmax(9rem,1fr)_2.618fr] sm:py-7"
            >
              <dt className="label pt-1 text-text-faint">{pick(group.label, locale)}</dt>
              <dd>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item}>
                      <Tag>{item}</Tag>
                    </li>
                  ))}
                </ul>
              </dd>
            </Reveal>
          ))}
        </dl>

        <Reveal delay={0.08}>
          <p className="measure mt-8 text-sm text-text-muted">{pick(exploring, locale)}</p>
        </Reveal>
      </Container>
    </section>
  );
}
