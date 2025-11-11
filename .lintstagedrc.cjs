module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix',
    'prettier --write',
    () => 'node scripts/check-tests.mjs',
  ],
  '*.{json,md,css,scss}': [
    'prettier --write',
  ],
};
