'use client';

import { useTranslations } from 'next-intl';
import { Container, sectionY } from '@/components/layout/Container';
import { Reveal } from '@/components/motion/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InteractiveGraph } from '@/components/graph/InteractiveGraph';
import { nodeColor } from '@/components/graph/nodeColor';
import type { GraphNodeKind } from '@/types/graph';

const legend: {
  kind: GraphNodeKind;
  key: 'legendSelf' | 'legendProject' | 'legendRecognition' | 'legendSkill';
}[] = [
  { kind: 'self', key: 'legendSelf' },
  { kind: 'project', key: 'legendProject' },
  { kind: 'skill', key: 'legendSkill' },
  { kind: 'recognition', key: 'legendRecognition' },
];

/**
 * The connection graph: what he has built, what it took, and what it earned,
 * as one object you can pull apart.
 *
 * A key was missing before, which left four colours doing unexplained work.
 * The canvas sizes by aspect ratio rather than a fixed 420px so it does not
 * eat a phone screen, and vertical swipes still scroll the page.
 */
export function Connections() {
  const t = useTranslations('about');

  return (
    <section className={sectionY}>
      <Container>
        <SectionHeading
          title={t('graphTitle')}
          emphasis={t('graphEmphasis')}
          className="mb-phi-2"
        />

        <Reveal>
          <div className="bg-surface/50 overflow-hidden rounded-lg border border-border shadow-card">
            <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-border px-5 py-4 sm:px-6">
              <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
                {legend.map(({ kind, key }) => (
                  <li key={kind} className="inline-flex items-center gap-2">
                    <span
                      aria-hidden
                      className="size-2 shrink-0 rounded-full"
                      style={{ background: nodeColor(kind) }}
                    />
                    <span className="text-2xs uppercase tracking-[0.1em] text-text-muted">
                      {t(key)}
                    </span>
                  </li>
                ))}
              </ul>
              {/* The right hint for the input device, chosen in CSS. */}
              <p className="font-mono text-2xs text-text-faint">
                <span className="hint-fine">{t('graphHint')}</span>
                <span className="hint-coarse">{t('graphHintTouch')}</span>
              </p>
            </div>

            <div className="aspect-[4/3] w-full sm:aspect-[2/1] lg:aspect-[5/2]">
              <InteractiveGraph className="size-full" />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
