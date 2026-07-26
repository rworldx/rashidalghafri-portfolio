import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { projects } from '@content/projects';
import { skills } from '@content/skills';
import { awards } from '@content/awards';
import { experience } from '@content/experience';
import { graph } from '@content/graph';
import { site } from '@content/site';
import { certifications } from '@content/awards';
import { journey } from '@content/journey';
import { travels, schooling } from '@content/personal';
import { interests, aboutStory } from '@content/about';
import { proof } from '@content/proof';
import { learning } from '@content/skills';
import { colophon } from '@content/colophon';

/**
 * Validates every content entry against a schema mirroring src/types (PRD §14).
 * This catches missing/invalid fields before they reach the build.
 */
const localized = z.object({ en: z.string().min(1), ar: z.string().min(1) });

const projectSchema = z.object({
  slug: z.string().regex(/^[a-z0-9-]+$/),
  featured: z.boolean(),
  title: z.string().min(1),
  year: z.number().int(),
  role: z.string().min(1),
  summary: localized,
  problem: localized,
  solution: localized,
  liveUrl: z.string().url().optional(),
  repoUrl: z.string().url().optional(),
  stack: z.array(z.string()).min(1),
  stats: z.array(z.object({ label: localized, value: z.string() })).optional(),
  highlights: z.array(localized).optional(),
  // Optional: a project without a screenshot renders the generated signature.
  cover: z.string().min(1).optional(),
  coverKind: z.enum(['screenshot', 'logo']).optional(),
  coverDark: z.string().min(1).optional(),
  thumb: z
    .object({
      src: z.string().min(1),
      dark: z.string().min(1).optional(),
      kind: z.enum(['screenshot', 'logo']),
    })
    .optional(),
  gallery: z.array(z.string()).optional(),
  links: z
    .array(
      z.object({ label: z.string(), href: z.string(), external: z.boolean().optional() }),
    )
    .optional(),
});

describe('content/projects', () => {
  it('every project matches the Project schema', () => {
    for (const p of projects) expect(() => projectSchema.parse(p)).not.toThrow();
  });
  it('slugs are unique', () => {
    const slugs = projects.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
});

describe('content/skills', () => {
  const schema = z.object({
    id: z.string(),
    label: localized,
    items: z.array(z.string()).min(1),
  });
  it('matches the SkillGroup schema', () => {
    for (const s of skills) expect(() => schema.parse(s)).not.toThrow();
  });
});

describe('content/awards', () => {
  const schema = z.object({
    id: z.string(),
    title: localized,
    date: z.string(),
    order: z.number(),
    org: localized.optional(),
    description: localized,
    tag: localized.optional(),
  });
  it('matches the Award schema', () => {
    for (const a of awards) expect(() => schema.parse(a)).not.toThrow();
  });
});

describe('content/experience', () => {
  const schema = z.object({
    id: z.string(),
    kind: z.enum(['education', 'leadership', 'activity']),
    title: localized,
    org: localized,
    period: z.string(),
    order: z.number(),
    bullets: z.array(localized).optional(),
  });
  it('matches the ExperienceItem schema', () => {
    for (const e of experience) expect(() => schema.parse(e)).not.toThrow();
  });
});

describe('content/graph', () => {
  it('every edge references existing nodes', () => {
    const ids = new Set(graph.nodes.map((n) => n.id));
    for (const e of graph.edges) {
      expect(ids.has(e.source)).toBe(true);
      expect(ids.has(e.target)).toBe(true);
    }
  });
});

describe('content/journey', () => {
  const schema = z.object({
    year: z.number().int(),
    kind: z.enum(['education', 'project', 'award', 'hackathon', 'milestone', 'goal']),
    title: localized,
    detail: localized,
    future: z.boolean().optional(),
  });
  it('matches the TimelineEntry schema', () => {
    for (const e of journey) expect(() => schema.parse(e)).not.toThrow();
  });
  it('is chronologically non-decreasing by year', () => {
    const years = journey.map((e) => e.year);
    expect(years).toEqual([...years].sort((a, b) => a - b));
  });
});

describe('content/travels', () => {
  const schema = z.object({
    fromCode: z.string().min(1),
    toCode: z.string().min(1),
    to: localized,
    year: z.union([z.number(), z.string()]),
    note: localized,
    mode: z.enum(['flight', 'road']),
    stops: z.array(z.string()).optional(),
  });
  it('matches the Travel schema', () => {
    for (const t of travels) expect(() => schema.parse(t)).not.toThrow();
  });
  it('schooling entries are well-formed', () => {
    const s = z.object({ grades: z.string().min(1), name: localized });
    for (const e of schooling) expect(() => s.parse(e)).not.toThrow();
  });
});

describe('content/certifications', () => {
  const schema = z.object({
    id: z.string(),
    title: z.string().min(1),
    issuer: z.string().min(1),
    year: z.number().int(),
    detail: localized.optional(),
    credentialUrl: z.string().url().optional(),
  });
  it('matches the Certification schema', () => {
    for (const c of certifications) expect(() => schema.parse(c)).not.toThrow();
  });
});

describe('content/about', () => {
  const interestSchema = z.object({ icon: z.string().min(1), label: localized });
  it('interests match schema', () => {
    for (const i of interests) expect(() => interestSchema.parse(i)).not.toThrow();
  });
  it('story has matching paragraph counts per locale', () => {
    expect(aboutStory.en.length).toBe(aboutStory.ar.length);
  });
});

describe('content/site', () => {
  it('has a valid email and at least one social', () => {
    expect(z.string().email().safeParse(site.email).success).toBe(true);
    expect(site.socials.length).toBeGreaterThan(0);
  });
});

describe('content/proof', () => {
  const schema = z.object({ value: localized, label: localized, detail: localized });

  it('matches the ProofPoint schema', () => {
    for (const p of proof) expect(() => schema.parse(p)).not.toThrow();
  });

  /**
   * These four figures are the first thing a recruiter reads, and every one of
   * them is a checkable claim about a real award, grade or pilot. Guarding the
   * exact strings means a careless edit to the headline credentials fails the
   * suite instead of quietly shipping. Update these only alongside the CV.
   */
  it('states the verified credentials exactly', () => {
    const byLabel = new Map(proof.map((p) => [p.label.en, p.value.en]));
    expect(byLabel.get('of 738 national STEM projects')).toBe('Top 30');
    expect(byLabel.get('CGPA out of 4.00')).toBe('3.96');
    expect(byLabel.get('said the AI assistant helped')).toBe('95%');
    expect(byLabel.get('of 20+ teams')).toBe('2nd');
  });

  it('keeps the ledger short enough to scan', () => {
    expect(proof.length).toBeLessThanOrEqual(4);
  });
});

describe('content/colophon', () => {
  it('is fully bilingual', () => {
    expect(colophon.body.length).toBeGreaterThan(0);
    for (const p of colophon.body) expect(() => localized.parse(p)).not.toThrow();
  });
});

describe('content/skills', () => {
  /**
   * A skills list is a claim about what Rashid can do today. The learning note
   * is a claim about what he wants to pick up next. Anything he cannot do yet
   * must not appear in both, or the site quietly overstates him to a recruiter.
   *
   * Figma is the deliberate exception: he uses it already and wants to go
   * deeper, so it is honest in both places.
   */
  it('does not claim a skill it also says it wants to learn', () => {
    const claimed = skills.flatMap((group) => group.items.map((i) => i.toLowerCase()));
    const wantsToLearn = ['n8n', 'swift', 'xcode'];

    for (const topic of wantsToLearn) {
      expect(learning.en.toLowerCase()).toContain(topic);
      expect(claimed.some((skill) => skill.includes(topic))).toBe(false);
    }
  });
});
