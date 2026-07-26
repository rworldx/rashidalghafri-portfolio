'use client';

import { useCallback, useEffect, useState } from 'react';

/**
 * Read design tokens out of the DOM, and re-read them when the theme actually
 * changes — not when React *thinks* it changed.
 *
 * WHY THIS EXISTS. The obvious version is an effect keyed on next-themes'
 * `resolvedTheme`, and it is subtly wrong. `ThemeProvider` is an ancestor, and
 * React flushes child effects BEFORE parent effects, so a consumer's effect
 * runs while `<html>` still carries the previous theme class. The consumer
 * then reads the OLD custom-property values and caches them. On the site this
 * looked like toggling to light mode while every WebGL surface kept rendering
 * its dark palette — a muddy hero that stayed muddy until a reload.
 *
 * A MutationObserver on the class attribute is authoritative: it fires when
 * the class has genuinely been swapped and styles are recalculated, whatever
 * order the effects happened to run in. `resolvedTheme` is not consulted at
 * all here, which is the point.
 */
export function useThemeTokens<T>(read: () => T): T | null {
  const [tokens, setTokens] = useState<T | null>(null);

  // The reader is inlined by callers, so pin it — otherwise a fresh closure on
  // every render would re-subscribe the observer on every render.
  const stable = useCallback(read, [read]);

  useEffect(() => {
    const root = document.documentElement;

    const sample = () => setTokens(stable());
    sample();

    const observer = new MutationObserver(sample);
    observer.observe(root, { attributes: true, attributeFilter: ['class', 'style'] });
    return () => observer.disconnect();
  }, [stable]);

  return tokens;
}
