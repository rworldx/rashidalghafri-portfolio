'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import type { ComponentProps } from 'react';

/**
 * next-themes wrapper. Toggles `class="dark"` on <html> and persists the choice
 * (storageKey `rag_theme` — mirrors StudyNest's naming). No-flash is handled by
 * next-themes' inline script injected in <head>.
 */
export function ThemeProvider({
  children,
  ...props
}: ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      storageKey="rag_theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
