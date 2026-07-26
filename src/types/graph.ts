export type GraphNodeKind = 'self' | 'project' | 'skill' | 'recognition';

export interface GraphNode {
  id: string;
  label: string;
  /**
   * Arabic label, where one is meaningful.
   *
   * Proper names (StudyNest, EnerGrid, IEEE, LIYSF) stay Latin in both
   * languages, because that is how they are written and read in Oman. Only
   * the generic terms get an Arabic form, so this is optional rather than a
   * full Localized pair.
   */
  labelAr?: string;
  kind: GraphNodeKind;
  /**
   * Relative visual weight (1–3). Drives node radius in the graph, and text
   * emphasis in the small-screen ledger, so it is a statement about what
   * matters most rather than a styling knob.
   */
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
