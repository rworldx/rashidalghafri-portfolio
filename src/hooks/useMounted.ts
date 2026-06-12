'use client';

import { useEffect, useState } from 'react';

/** True after first client mount — guards against hydration mismatch (theme, etc.). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
