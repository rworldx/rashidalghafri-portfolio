'use client';

import { Component, type ReactNode } from 'react';

interface Props {
  children: ReactNode;
  /** Rendered if a child throws (PRD §5.5 — client islands must fail soft). */
  fallback: ReactNode;
}

interface State {
  hasError: boolean;
}

/** Catches render/runtime errors in a client island and shows a fallback. */
export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    if (process.env.NODE_ENV !== 'production') {
      // eslint-disable-next-line no-console
      console.error('ErrorBoundary caught:', error);
    }
  }

  render() {
    return this.state.hasError ? this.props.fallback : this.props.children;
  }
}
