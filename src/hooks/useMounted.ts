'use client';

import { useEffect, useState } from 'react';

/** True after first client mount — guards against hydration mismatch (theme, etc.). */
export function useMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  // Deliberate. The whole point of this hook is to render differently after
  // hydration than during it, so the state flip on mount IS the behaviour.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  return mounted;
}
