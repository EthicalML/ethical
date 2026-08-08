import eslint from '@eslint/js';
import astro from 'eslint-plugin-astro';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  {
    ignores: [
      '.astro/**',
      // Agent worktrees are checkouts of this same repo. Linting them gives
      // typescript-eslint two tsconfig roots for one file set and floods the
      // run with parse errors that belong to no working file.
      '.claude/**',
      'dist/**',
      'node_modules/**',
      'public/**',
      'tmp/**',
      'tmp2/**',
      '_site/**',
    ],
  },
  {
    files: ['**/*.{astro,js,mjs,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
];
