module.exports = {
  '*.{ts,tsx,js,jsx}': [
    'eslint --fix --max-warnings=-1',
    'prettier --write',
    () => 'node check-tests.mjs',
  ],
  '*.{json,md,css,scss}': [
    'prettier --write',
  ],
};
