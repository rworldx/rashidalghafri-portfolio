import { describe, it, expect } from 'vitest';
import { z } from 'zod';
import { projects } from '@content/projects';
import { skills } from '@content/skills';
import { awards } from '@content/awards';
import { experience } from '@content/experience';
import { graph } from '@content/graph';
import { site } from '@content/site';

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
  cover: z.string().min(1),
  gallery: z.array(z.string()).optional(),
  links: z
    .array(z.object({ label: z.string(), href: z.string(), external: z.boolean().optional() }))
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
  const schema = z.object({ id: z.string(), label: localized, items: z.array(z.string()).min(1) });
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

describe('content/site', () => {
  it('has a valid email and at least one social', () => {
    expect(z.string().email().safeParse(site.email).success).toBe(true);
    expect(site.socials.length).toBeGreaterThan(0);
  });
});
