import type { GraphNodeKind } from '@/types/graph';

/** Maps a node kind to a CSS-variable colour (PRD: no hardcoded colours). */
export function nodeColor(kind: GraphNodeKind): string {
  switch (kind) {
    case 'self':
      return 'var(--accent)';
    case 'project':
      return 'var(--success)';
    case 'recognition':
      return 'var(--text)';
    case 'skill':
    default:
      return 'var(--text-muted)';
  }
}

export function nodeRadius(weight: number): number {
  return 4 + weight * 2.5;
}
