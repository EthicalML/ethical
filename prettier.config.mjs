export default {
  printWidth: 100,
  proseWrap: 'preserve',
  plugins: ['prettier-plugin-astro'],
  singleQuote: true,
  overrides: [
    {
      files: ['*.astro', '*.mdx'],
      options: {
        printWidth: 160,
      },
    },
  ],
};
