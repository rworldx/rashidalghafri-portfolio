'use client';

import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useMounted } from '@/hooks/useMounted';
import type { GraphData } from '@/types/graph';
import { ConnectionGraphStatic } from './ConnectionGraph.static';

/** Heavy canvas graph is client-only and lazy (PRD §5.2). */
const ConnectionGraph = dynamic(
  () => import('./ConnectionGraph').then((m) => m.ConnectionGraph),
  { ssr: false, loading: () => null },
);

interface Props {
  data: GraphData;
  ambient?: boolean;
  className?: string;
}

/**
 * Chooses the interactive graph when motion is allowed, otherwise the static
 * SVG diagram. Also renders static during SSR / before mount so first paint is
 * meaningful and identical (no layout shift).
 */
export function GraphSignature({ data, ambient = false, className }: Props) {
  const mounted = useMounted();
  const reduced = useReducedMotion();

  if (!mounted || reduced) {
    return (
      <ConnectionGraphStatic
        data={data}
        ambient={ambient}
        className={className ?? 'h-full w-full'}
      />
    );
  }
  return <ConnectionGraph data={data} ambient={ambient} className={className} />;
}
