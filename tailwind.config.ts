import type { Config } from 'tailwindcss';

/**
 * Tailwind maps ONLY to the semantic CSS variables defined in globals.css.
 * Never add a raw hex here — colours live as tokens so themes resolve per
 * :root / .dark.
 *
 * The type ramp and the spacing ramp are both golden-ratio derived:
 * minor steps at sqrt(phi) = 1.272, major steps at phi = 1.618.
 */
const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{ts,tsx}', './content/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        'bg-deep': 'var(--bg-deep)',
        surface: 'var(--surface)',
        'surface-2': 'var(--surface-2)',
        border: 'var(--border)',
        'border-strong': 'var(--border-strong)',
        text: 'var(--text)',
        'text-muted': 'var(--text-muted)',
        'text-faint': 'var(--text-faint)',
        accent: 'var(--accent)',
        'accent-hover': 'var(--accent-hover)',
        'accent-soft': 'var(--accent-soft)',
        'accent-line': 'var(--accent-line)',
        'on-accent': 'var(--on-accent)',
        signal: 'var(--signal)',
        danger: 'var(--danger)',
        'danger-soft': 'var(--danger-soft)',
      },
      fontFamily: {
        display: ['var(--font-sans)', 'var(--font-display-ar)', 'sans-serif'],
        sans: ['var(--font-sans)', 'var(--font-sans-ar)', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        script: ['var(--font-script)', 'cursive'],
      },
      fontSize: {
        // Golden-ratio ramp. Display sizes live in the .display-* classes,
        // which are fluid; these are the fixed steps for body and UI.
        '2xs': ['0.6875rem', { lineHeight: '1.45' }],
        xs: ['0.75rem', { lineHeight: '1.5' }],
        sm: ['0.875rem', { lineHeight: '1.55' }],
        base: ['1rem', { lineHeight: '1.62' }],
        lg: ['1.125rem', { lineHeight: '1.6' }],
        xl: ['1.272rem', { lineHeight: '1.5', letterSpacing: '-0.01em' }],
        '2xl': ['1.618rem', { lineHeight: '1.34', letterSpacing: '-0.016em' }],
        '3xl': ['2.058rem', { lineHeight: '1.2', letterSpacing: '-0.022em' }],
        '4xl': ['2.618rem', { lineHeight: '1.1', letterSpacing: '-0.028em' }],
        '5xl': ['3.33rem', { lineHeight: '1.05', letterSpacing: '-0.032em' }],
        '6xl': ['4.236rem', { lineHeight: '1', letterSpacing: '-0.036em' }],
      },
      spacing: {
        phi: '1.618rem',
        'phi-2': '2.618rem',
        'phi-3': '4.236rem',
        'phi-4': '6.854rem',
        'phi-5': '11.089rem',
      },
      borderRadius: {
        xs: 'var(--radius-xs)',
        sm: 'var(--radius-sm)',
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius-lg)',
        xl: 'var(--radius-xl)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        card: 'var(--shadow-card)',
        lift: 'var(--shadow-lift)',
        hairline: 'var(--hairline)',
      },
      ringColor: {
        focus: 'var(--focus-ring)',
      },
      // A semantic z-index scale. No arbitrary z-[9999] anywhere.
      zIndex: {
        raised: '10',
        sticky: '30',
        nav: '40',
        overlay: '60',
        modal: '70',
      },
      transitionTimingFunction: {
        // Strong ease-out: the built-in curves are too weak to read as intent.
        out: 'cubic-bezier(0.23, 1, 0.32, 1)',
        'in-out': 'cubic-bezier(0.77, 0, 0.175, 1)',
        // iOS drawer curve.
        drawer: 'cubic-bezier(0.32, 0.72, 0, 1)',
      },
      transitionDuration: {
        press: '120ms',
        quick: '180ms',
      },
      maxWidth: {
        shell: '78rem',
      },
      keyframes: {
        'signal-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.45', transform: 'scale(1.9)' },
        },
      },
      animation: {
        'signal-pulse': 'signal-pulse 2.6s cubic-bezier(0.23, 1, 0.32, 1) infinite',
      },
    },
  },
  plugins: [],
};

export default config;
