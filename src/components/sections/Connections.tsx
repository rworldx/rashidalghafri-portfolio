'use client';

import { useTranslations } from 'next-intl';
import { graph } from '@content/graph';
import type { GraphNodeKind } from '@/types/graph';
import { useMounted } from '@/hooks/useMounted';
import { useMediaQuery } from '@/hooks/useMediaQuery';
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
 * TWO PRESENTATIONS, and the small one is not a downgrade.
 *
 * A force-directed graph needs room. In a phone-width box, ten labelled nodes
 * collide with each other and with their own labels, and the reader gets a
 * knot instead of a relationship. Below the large breakpoint the same data is
 * a LEDGER: one source, three groups, hairlines between them. It states the
 * relationships plainly, and plain wins at 390px.
 *
 * The graph mounts only where it fits, so a phone never pays for a canvas it
 * was never going to be able to read. The ledger is also what renders on the
 * server, so the section is meaningful before any JavaScript runs.
 *
 * The old version also put four unexplained hues on a page that commits to one
 * accent. The ledger needs no colour key at all: the groups are named.
 */
export function Connections() {
  const t = useTranslations('about');
  const mounted = useMounted();
  const roomForGraph = useMediaQuery('(min-width: 1024px)');

  const showGraph = mounted && roomForGraph;
  const self = graph.nodes.find((n) => n.kind === 'self');

  return (
    <FlowBranch>
      <SectionHeading
        title={t('graphTitle')}
        emphasis={t('graphEmphasis')}
        className="mb-phi-2"
      />

      {showGraph ? (
        <Reveal>
          <div className="overflow-hidden rounded-lg border border-border bg-surface/50">
            <div className="flex items-center justify-end border-b border-border px-6 py-3">
              <p className="font-mono text-2xs text-text-faint">{t('graphHint')}</p>
            </div>
            <div className="aspect-[5/2] w-full">
              <InteractiveGraph className="size-full" />
            </div>
          </div>
        </Reveal>
      ) : (
        <Reveal>
          <dl className="border-t border-border">
            {/* The source, named once at the top rather than repeated per row. */}
            <div className="flex items-baseline gap-4 border-b border-border py-5">
              <dt className="label w-24 shrink-0 text-accent">{t('legendSelf')}</dt>
              <dd className="text-lg text-text">{self?.label ?? 'Rashid'}</dd>
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
                          {n.label}
                        </span>
                      </span>
                    ))}
                  </dd>
                </div>
              );
            })}
          </dl>
        </Reveal>
      )}
    </FlowBranch>
  );
}
