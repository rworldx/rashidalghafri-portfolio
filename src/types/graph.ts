export type GraphNodeKind = 'self' | 'project' | 'skill' | 'recognition';

export interface GraphNode {
  id: string;
  label: string;
  kind: GraphNodeKind;
  /** Relative visual weight (1–3) — drives node radius. */
  weight?: number;
}

export interface GraphEdge {
  source: string;
  target: string;
}

export interface GraphData {
  nodes: GraphNode[];
  edges: GraphEdge[];
}
