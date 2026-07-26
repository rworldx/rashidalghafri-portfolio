'use client';

import { useLocale, useTranslations } from 'next-intl';
import { graph } from '@content/graph';
import type { GraphNodeKind } from '@/types/graph';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InteractiveGraph } from '@/components/graph/InteractiveGraph';
import { FlowBranch } from '@/components/flow/FlowBranch';

/** The groups, in the order they earn their place. */
const groups: {
  kind: GraphNodeKind;
  key: 'legendProject' | 'legendSkill' | 'legendRecognition';
}[] = [
  { kind: 'project', key: 'legendProject' },
  { kind: 'skill', key: 'legendSkill' },
  { kind: 'recognition', key: 'legendRecognition' },
];

/**
 * What Rashid has built, what it took, and what it earned.
 *
 * The graph runs on EVERY screen. What changes with the screen is the space
 * it gets and how much of it is labelled.
 *
 * A phone gets a PORTRAIT canvas, taller than it is wide. A 5:2 letterbox
 * leaves a narrow screen almost no vertical room, which forced every node into
 * one band and made the labels collide. Height is the cheapest thing to give a
 * graph on a phone. The canvas also labels only the heaviest nodes there, and
 * reveals the rest on touch, because labelling a dozen at 390px is the same
 * illegible knot as labelling all of them.
 *
 * The text version underneath is not a fallback layout, it is the accessible
 * one: a canvas is invisible to assistive technology, so without it this
 * section would say nothing at all to a screen reader.
 */
export function Connections() {
  const t = useTranslations('about');
  const locale = useLocale();
  const self = graph.nodes.find((n) => n.kind === 'self');

  return (
    <FlowBranch>
      <SectionHeading
        title={t('graphTitle')}
        emphasis={t('graphEmphasis')}
        className="mb-phi-2"
      />

      <Reveal>
        <div className="overflow-hidden rounded-lg border border-border bg-surface/50">
          <div className="flex items-center justify-end border-b border-border px-5 py-3 sm:px-6">
            <p className="font-mono text-2xs text-text-faint">
              <span className="hint-fine">{t('graphHint')}</span>
              <span className="hint-coarse">{t('graphHintTouch')}</span>
            </p>
          </div>
          {/*
            PORTRAIT on a phone, wide on a desktop. A 5:2 letterbox gives a
            narrow screen almost no vertical room, which is what forced every
            node into the same band and made the labels collide. Height is the
            cheapest thing to give a graph on a phone.
          */}
          <div className="aspect-[3/4] w-full sm:aspect-[3/2] lg:aspect-[5/2]">
            <InteractiveGraph className="size-full" />
          </div>
        </div>
      </Reveal>

      {/*
        The same relationships as text, for screen readers and for anyone
        whose graph never renders. A canvas is invisible to assistive tech, so
        without this the section says nothing at all to a screen reader.
      */}
      <div className="sr-only">
          <dl className="border-t border-border">
            {/* The source, named once at the top rather than repeated per row. */}
            <div className="flex items-baseline gap-4 border-b border-border py-5">
              <dt className="label w-24 shrink-0 text-accent">{t('legendSelf')}</dt>
              <dd className="text-lg text-text">
                {(locale === 'ar' ? self?.labelAr : self?.label) ?? 'Rashid'}
              </dd>
            </div>

            {groups.map(({ kind, key }) => {
              const items = graph.nodes.filter((n) => n.kind === kind);
              if (items.length === 0) return null;
              return (
                <div
                  key={kind}
                  className="flex flex-col gap-1.5 border-b border-border py-5 sm:flex-row sm:items-baseline sm:gap-4"
                >
                  <dt className="label w-24 shrink-0 text-text-faint">{t(key)}</dt>
                  <dd className="text-base text-text-muted">
                    {/*
                      Plain text with separators, not chips. A row of pills
                      would read as filters you can press, and none of these
                      do anything. Weight decides emphasis, so the things that
                      matter most read first without a second colour.
                    */}
                    {items.map((n, i) => (
                      <span key={n.id}>
                        {i > 0 && <span className="text-text-faint"> · </span>}
                        <span className={(n.weight ?? 1) >= 2 ? 'text-text' : undefined}>
                          {/* Proper names stay Latin in both languages. */}
                          {locale === 'ar' ? (n.labelAr ?? n.label) : n.label}
                        </span>
                      </span>
                    ))}
                  </dd>
                </div>
              );
            })}
        </dl>
      </div>
    </FlowBranch>
  );
}
