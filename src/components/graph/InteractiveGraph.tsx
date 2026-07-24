'use client';

import { graph } from '@content/graph';
import { useMounted } from '@/hooks/useMounted';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ConnectionGraph } from './ConnectionGraph';
import { ConnectionGraphStatic } from './ConnectionGraph.static';

/**
 * Picks the interactive force graph when motion is allowed, otherwise the
 * static SVG diagram (also used for SSR / first paint so there's no layout
 * shift and the content is still meaningful).
 */
export function InteractiveGraph({ className }: { className?: string }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();

  if (!mounted || reduced) {
    return (
      <ConnectionGraphStatic data={graph} className={className ?? 'h-full w-full'} />
    );
  }
  return <ConnectionGraph className={className} />;
}
