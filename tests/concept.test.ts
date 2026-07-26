import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Guards two rules that are invisible in code review.
 *
 * 1. NO ABANDONED CONCEPT LANGUAGE. This site went through a falaj-themed
 *    direction before landing on the museum. That direction is gone, and the
 *    copy must not still carry its vocabulary — a visitor reading an About
 *    page that explains a metaphor the site no longer uses is being told a
 *    story about a website that does not exist. Nothing breaks when stale
 *    concept copy survives a redesign, which is exactly why it needs a test.
 *
 * 2. ONE ACCENT, LOCKED. A second hue creeping into a badge or a CTA is the
 *    fastest way to make a restrained palette look accidental.
 */

const ROOT = join(__dirname, '..');

/** Words that would turn the invisible architecture into a visible motif. */
const MOTIF = /\bfalaj|aflaj|irrigation|canal\b/i;

function filesUnder(dir: string, exts: string[]): string[] {
  const out: string[] = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) {
      out.push(...filesUnder(full, exts));
    } else if (exts.some((e) => entry.endsWith(e))) {
      out.push(full);
    }
  }
  return out;
}

describe('no stale concept language', () => {
  it('carries no language from the retired concept', () => {
    const offenders: string[] = [];

    // All user-facing copy. Nothing is exempt any more: the concept it came
    // from is retired, so the vocabulary should appear nowhere at all.
    const copy = [
      ...filesUnder(join(ROOT, 'messages'), ['.json']),
      ...filesUnder(join(ROOT, 'content'), ['.ts']),
    ];

    for (const file of copy) {
      if (MOTIF.test(readFileSync(file, 'utf8'))) {
        offenders.push(file.replace(ROOT + '/', ''));
      }
    }

    expect(offenders, `the motif must not appear in: ${offenders.join(', ')}`).toEqual(
      [],
    );
  });

  it('commits to a single accent across both themes', () => {
    // One accent, locked. A second hue creeping into a badge or a CTA is the
    // fastest way to make a restrained palette look accidental.
    const css = readFileSync(join(ROOT, 'src/app/globals.css'), 'utf8');
    const accents = [...css.matchAll(/--accent:\s*oklch\([^)]*\)/g)].map((m) => m[0]);
    // Exactly two declarations: :root (light) and .dark.
    expect(accents).toHaveLength(2);

    // Both must sit in the same blue hue family — a redesign that drifts the
    // dark accent to a different hue breaks the identity across themes.
    const hues = accents.map((a) => Number(a.match(/([\d.]+)\)$/)?.[1]));
    for (const h of hues) expect(h).toBeGreaterThanOrEqual(230);
    for (const h of hues) expect(h).toBeLessThanOrEqual(255);
  });
});
