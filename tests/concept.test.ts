import { describe, it, expect } from 'vitest';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Guards the one rule the whole design rests on.
 *
 * The site is built on the falaj — Oman's gravity-fed irrigation network: one
 * source, a spine, branches out to everyone who needs the water. That idea
 * shapes the rail down every page, the way sections branch off it, and the
 * network in the hero.
 *
 * It is named in exactly ONE place: the colophon on /about. Everywhere else it
 * has to survive on structure alone. A concept a portfolio announces is
 * decoration; one a visitor feels first and discovers later is architecture.
 *
 * This test exists because that rule is invisible in code review — nothing
 * breaks if someone drops "falaj" into a headline, it just quietly turns the
 * design into a theme. So it fails the build instead.
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

describe('the concept stays invisible', () => {
  it('names the falaj only in the colophon', () => {
    const offenders: string[] = [];

    // User-facing copy: the translation catalogues and the content layer.
    const copy = [
      ...filesUnder(join(ROOT, 'messages'), ['.json']),
      ...filesUnder(join(ROOT, 'content'), ['.ts']),
    ].filter((f) => !f.endsWith('colophon.ts'));

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
