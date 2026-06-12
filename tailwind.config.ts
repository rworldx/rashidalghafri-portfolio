import type { Config } from 'tailwindcss';

/**
 * Tailwind maps ONLY to semantic CSS variables defined in globals.css.
 * Never add raw hex here — colours live as tokens so themes resolve per :root / .dark.
 */
const config: Config = {
  darkMode: 'class',
  content: [
    './src/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        accent: 'var(--accent)',
        'accent-soft': 'var(--accent-soft)',
        success: 'var(--success)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'var(--font-display-ar)', 'sans-serif'],
        sans: ['var(--font-sans)', 'var(--font-sans-ar)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      fontSize: {
        // PRD type scale (rem)
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.5' }],
        base: ['1rem', { lineHeight: '1.6' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.25rem', { lineHeight: '1.5' }],
        '2xl': ['1.5rem', { lineHeight: '1.3' }],
        '3xl': ['2rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
        '4xl': ['2.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        '5xl': ['3.75rem', { lineHeight: '1.05', letterSpacing: '-0.02em' }],
      },
      borderRadius: {
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
      },
      boxShadow: {
        card: 'var(--shadow-card)',
      },
      ringColor: {
        focus: 'var(--focus-ring)',
      },
      spacing: {
        // 4px base scale beyond Tailwind defaults
        18: '4.5rem',
        22: '5.5rem',
      },
      transitionTimingFunction: {
        // PRD motion language: out-expo-ish standard
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
