'use client';

import { useLocale, useTranslations } from 'next-intl';
import { proof } from '@content/proof';
import { pick } from '@/lib/localized';
import { Reveal } from '@/components/motion/Reveal';
import { Emphasise } from '@/components/ui/SectionHeading';
import { FlowBranch } from '@/components/flow/FlowBranch';

/**
 * The through-line: the one claim the rest of the page is evidence for, and
 * the four measured facts that back it.
 *
 * This sits directly under the hero on purpose. A recruiter scanning a new
 * graduate's portfolio wants to know within five seconds whether the work is
 * real; burying the record below three project cards costs exactly the
 * attention it needs. The figures are the argument, so they lead.
 *
 * Set as a hairline LEDGER, not a grid of stat cards. Four identical bordered
 * boxes with a big number in each is the single most templated way to present
 * numbers, and it makes measured outcomes look like decoration. Rows separated
 * by a rule read as a record — which is what these are.
 */
export function ThroughLine() {
  const t = useTranslations('throughLine');
  const locale = useLocale();

  return (
    <FlowBranch>
      <Reveal>
        <h2 className="display-2 measure text-text">
          <Emphasise title={t('title')} emphasis={t('emphasis')} />
        </h2>
      </Reveal>

      <Reveal delay={0.06}>
        <p className="measure mt-phi text-lg text-text-muted">{t('body')}</p>
      </Reveal>

      <dl className="mt-phi-3 border-t border-border">
        {proof.map((p, i) => (
          <Reveal
            key={p.label.en}
            delay={0.05 + i * 0.06}
            distance={12}
            className="border-b border-border"
          >
            {/*
              The figure reads first, but <dt> must come before its <dd> in the
              DOM. So the term leads in source order and the grid places the
              figure back into column one — explicit placement on desktop,
              `order` on the single-column mobile stack. Screen readers get
              "term, then definition"; sighted readers get the number first.
            */}
            <div className="grid gap-x-phi gap-y-1 py-6 sm:grid-cols-[11rem_1fr] sm:py-7">
              <dt className="order-2 text-lg text-text sm:order-none sm:col-start-2 sm:row-start-1">
                {pick(p.label, locale)}
              </dt>
              {/*
                Deliberately NOT counted up.

                A count-up here would spend a second asserting things that are
                false — "Top 29 of 738", "CGPA 3.88" — and these are verifiable
                credentials, not decoration. The animation buys a flourish and
                costs the one thing this section exists to establish. Set in the
                display face rather than mono, too: at this size mono opens the
                gaps ("Top  30", "3 . 96") and reads as data rather than as a
                headline figure.
              */}
              <dd className="tnum display-3 order-1 leading-none text-accent sm:order-none sm:col-start-1 sm:row-span-2 sm:row-start-1">
                {pick(p.value, locale)}
              </dd>
              <dd className="measure order-3 text-sm text-text-muted sm:order-none sm:col-start-2 sm:row-start-2 sm:mt-1">
                {pick(p.detail, locale)}
              </dd>
            </div>
          </Reveal>
        ))}
      </dl>
    </FlowBranch>
  );
}
