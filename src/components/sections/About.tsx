'use client';

import { useLocale, useTranslations } from 'next-intl';
import { aboutIntro, aboutStory } from '@content/about';
import { site } from '@content/site';
import type { Locale } from '@/i18n/routing';
import { pick } from '@/lib/localized';
import { cn } from '@/lib/cn';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { PortraitCard } from '@/components/ui/PortraitCard';

/**
 * The origin story, set as a reading column on the long side of the golden
 * split with the portrait held beside it.
 *
 * The story closes on a handwritten signature. That typeface appears exactly
 * once on the whole site — used a second time it stops being a signature and
 * becomes decoration. It is Latin-only, because the face has no Arabic
 * coverage and a fallback would read as a bug rather than a flourish.
 */
export function About() {
  const t = useTranslations('about');
  const locale = useLocale();
  const story = aboutStory[locale as Locale] ?? aboutStory.en;

  return (
    <section className={sectionY}>
      <Container>
        <SectionHeading
          as="h1"
          title={t('title')}
          emphasis={t('emphasis')}
          className="mb-phi-3"
        />

        <div className="grid items-start gap-phi-2 lg:grid-cols-[1.618fr_1fr] lg:gap-phi-3">
          <div>
            <Reveal>
              <p className="display-4 measure text-text">{pick(aboutIntro, locale)}</p>
            </Reveal>

            <div className="measure mt-phi-2 space-y-6">
              {story.map((para, i) => (
                <Reveal key={i} delay={i * 0.05} distance={14}>
                  <p className="text-lg text-text-muted">{para}</p>
                </Reveal>
              ))}
            </div>

            {/*
              The one handwritten moment on the site. Ruqʿah sets much smaller
              on the body than the Latin hand, so Arabic takes its own size.
            */}
            <Reveal delay={0.1} className="mt-phi-2">
              <hr className="rule-fade mb-6 w-12" aria-hidden />
              <p
                aria-hidden
                className={cn(
                  'signature text-text-muted',
                  locale === 'ar' ? 'text-[3.4rem]' : 'text-[2.15rem]',
                )}
              >
                {pick(site.displayName, locale)}
              </p>
            </Reveal>
          </div>

          {/* Held in view while the story scrolls past it. */}
          <Reveal delay={0.08} className="lg:sticky lg:top-28">
            <PortraitCard />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
