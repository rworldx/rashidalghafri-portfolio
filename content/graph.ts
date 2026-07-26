import type { GraphData } from '@/types/graph';

/**
 * How the work connects: what Rashid built, what it took, and what it earned.
 *
 * Drives the interactive graph on large screens and the ledger on small ones.
 *
 * CURATED, NOT EXHAUSTIVE. This used to list a single project and read as if
 * StudyNest were the whole record. It now covers every shipped project and the
 * recognition each one earned, but it still stops well short of the full CV:
 * a graph that lists everything says nothing, and the résumé page already
 * exists for completeness.
 *
 * `weight` is the editorial decision. 3 is the flagship, 2 is load-bearing, 1
 * is real but supporting. The ledger brightens anything at 2 or above, so a
 * weight here is a claim about importance, not a size setting.
 *
 * Keep ids stable: they are the join between nodes and edges.
 *
 * Labels are SHORT on purpose. They are drawn onto a canvas roughly 330px wide
 * on a phone, so a label of more than about a dozen characters cannot fit
 * whatever the layout does. The full wording lives on /resume and in the
 * awards content; this is the map, not the record.
 */
export const graph: GraphData = {
  nodes: [
    { id: 'rashid', label: 'Rashid', labelAr: 'راشد', kind: 'self', weight: 3 },

    // ---- Projects, newest work included ----
    { id: 'studynest', label: 'StudyNest', kind: 'project', weight: 3 },
    { id: 'energrid', label: 'EnerGrid', kind: 'project', weight: 2 },
    { id: 'ieee-site', label: 'IEEE BUC site', kind: 'project', weight: 2 },
    { id: 'portfolio', label: 'Portfolio', labelAr: 'هذا الموقع', kind: 'project', weight: 1 },
    { id: 'wastebin', label: 'Waste bin', labelAr: 'حاوية الفرز', kind: 'project', weight: 1 },

    // ---- What it took ----
    { id: 'fullstack', label: 'Full-stack', labelAr: 'تطوير متكامل', kind: 'skill', weight: 3 },
    { id: 'frontend', label: 'Frontend & UI', labelAr: 'الواجهات وتصميمها', kind: 'skill', weight: 3 },
    { id: 'ai', label: 'AI', labelAr: 'الذكاء الاصطناعي', kind: 'skill', weight: 2 },
    { id: 'realtime', label: 'Real-time', labelAr: 'الأنظمة اللحظية', kind: 'skill', weight: 2 },
    { id: 'security', label: 'Security', labelAr: 'الأمان', kind: 'skill', weight: 1 },
    { id: 'iot', label: 'IoT', labelAr: 'إنترنت الأشياء', kind: 'skill', weight: 1 },

    // ---- What it earned ----
    { id: 'liysf', label: 'LIYSF top 30', labelAr: 'LIYSF أفضل 30', kind: 'recognition', weight: 3 },
    { id: 'distinction', label: 'Distinction', labelAr: 'مرتبة الشرف', kind: 'recognition', weight: 3 },
    { id: 'riyada', label: 'Riyada 2nd', labelAr: 'ريادة الثاني', kind: 'recognition', weight: 2 },
    { id: 'webmaster', label: 'IEEE web', labelAr: 'موقع IEEE', kind: 'recognition', weight: 2 },
    { id: 'showcase', label: 'Dept. rep', labelAr: 'ممثل القسم', kind: 'recognition', weight: 1 },
    { id: 'hackathon', label: 'Omantel', labelAr: 'عمانتل', kind: 'recognition', weight: 1 },
    { id: 'injaz', label: 'Injaz', labelAr: 'إنجاز', kind: 'recognition', weight: 1 },
  ],

  /**
   * Edges are claims about how things actually relate, not decoration. A
   * project links to the skills it genuinely needed and to the recognition it
   * genuinely earned.
   */
  edges: [
    // Rashid to the work.
    { source: 'rashid', target: 'studynest' },
    { source: 'rashid', target: 'energrid' },
    { source: 'rashid', target: 'ieee-site' },
    { source: 'rashid', target: 'portfolio' },
    { source: 'rashid', target: 'wastebin' },
    { source: 'rashid', target: 'distinction' },
    { source: 'rashid', target: 'showcase' },
    // Injaz was the Techno Water startup, not the hackathon bin. Separate work.
    { source: 'rashid', target: 'injaz' },

    // StudyNest: the capstone, and what it took.
    { source: 'studynest', target: 'fullstack' },
    { source: 'studynest', target: 'ai' },
    { source: 'studynest', target: 'realtime' },
    { source: 'studynest', target: 'security' },
    { source: 'studynest', target: 'liysf' },
    { source: 'studynest', target: 'distinction' },

    // EnerGrid took the Riyada prize.
    { source: 'energrid', target: 'riyada' },
    { source: 'energrid', target: 'iot' },

    // The IEEE site is why he is branch Webmaster.
    { source: 'ieee-site', target: 'frontend' },
    { source: 'ieee-site', target: 'webmaster' },

    // This site is the frontend argument.
    { source: 'portfolio', target: 'frontend' },
    { source: 'portfolio', target: 'fullstack' },

    // The hackathon bin was an IoT build.
    { source: 'wastebin', target: 'iot' },
    { source: 'wastebin', target: 'hackathon' },
  ],
};
