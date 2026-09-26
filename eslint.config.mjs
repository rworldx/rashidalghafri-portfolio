import coreWebVitals from 'eslint-config-next/core-web-vitals';
import typescript from 'eslint-config-next/typescript';

/**
 * Flat config. Next 16 removed `next lint`, so ESLint is invoked directly and
 * therefore no longer runs in eslintrc compatibility mode. The rules below are
 * the same two the old .eslintrc.json carried.
 */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'coverage/**', 'next-env.d.ts'] },
  ...coreWebVitals,
  ...typescript,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['src/components/sections/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['@/components/sections/*', './*', '../sections/*'],
              message:
                'Sections must not import other sections. Compose from ui/, motion/, graph/, lib/, content/, types/ instead.',
            },
          ],
        },
      ],
    },
  },
];

export default config;
