import { describe, it, expect } from 'vitest';
import { ageFrom } from '@/lib/age';
import { site } from '@content/site';
import { aboutIntro } from '@content/about';

/**
 * The age on the About page is derived, not typed. These pin the one place a
 * derived age goes wrong: the day either side of the birthday.
 */
describe('ageFrom', () => {
  const utc = (iso: string) => new Date(`${iso}T12:00:00Z`);

  it('is still the old age the day before the birthday', () => {
    expect(ageFrom('2004-09-03', utc('2026-09-02'))).toBe(21);
  });

  it('turns over on the birthday itself', () => {
    expect(ageFrom('2004-09-03', utc('2026-09-03'))).toBe(22);
  });

  it('holds for the rest of the year', () => {
    expect(ageFrom('2004-09-03', utc('2026-12-31'))).toBe(22);
    expect(ageFrom('2004-09-03', utc('2027-09-02'))).toBe(22);
  });

  it('site.birthDate is a real ISO date', () => {
    expect(site.birthDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(Number.isNaN(Date.parse(site.birthDate))).toBe(false);
  });

  it('the intro carries the computed age in both languages, never a stale literal', () => {
    const age = String(ageFrom(site.birthDate));
    expect(aboutIntro.en).toContain(`I am ${age},`);
    expect(aboutIntro.ar).toContain(`وعمري ${age} عامًا`);
    // The specific number that was wrong.
    expect(aboutIntro.en).not.toMatch(/I am 21,/);
    expect(aboutIntro.ar).not.toContain('وعمري 21 عامًا');
  });
});
