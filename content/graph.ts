import type { GraphData } from '@/types/graph';

/**
 * The signature connection graph (PRD §3.5 / §5.4). Nodes connect Rashid's
 * projects, skills and recognition; edges express how they relate. Grows as
 * achievements grow — keep node ids stable.
 */
export const graph: GraphData = {
  nodes: [
    { id: 'rashid', label: 'Rashid', kind: 'self', weight: 3 },

    { id: 'studynest', label: 'StudyNest', kind: 'project', weight: 3 },

    { id: 'fullstack', label: 'Full-Stack', kind: 'skill', weight: 2 },
    { id: 'ai', label: 'AI / Gemini', kind: 'skill', weight: 2 },
    { id: 'realtime', label: 'Real-time', kind: 'skill', weight: 2 },
    { id: 'security', label: 'Security', kind: 'skill', weight: 1 },

    { id: 'liysf', label: 'LIYSF Top 30', kind: 'recognition', weight: 2 },
    { id: 'ieee', label: 'IEEE', kind: 'recognition', weight: 1 },
    { id: 'entrepreneurship', label: 'Entrepreneurship', kind: 'recognition', weight: 1 },
    { id: 'hackathon', label: 'Hackathon', kind: 'recognition', weight: 1 },
  ],
  edges: [
    { source: 'rashid', target: 'studynest' },
    { source: 'rashid', target: 'fullstack' },
    { source: 'rashid', target: 'ai' },
    { source: 'rashid', target: 'ieee' },
    { source: 'rashid', target: 'entrepreneurship' },
    { source: 'rashid', target: 'hackathon' },

    { source: 'studynest', target: 'fullstack' },
    { source: 'studynest', target: 'ai' },
    { source: 'studynest', target: 'realtime' },
    { source: 'studynest', target: 'security' },
    { source: 'studynest', target: 'liysf' },

    { source: 'ai', target: 'liysf' },
    { source: 'fullstack', target: 'realtime' },
  ],
};
