module.exports = {
  extends: '@redhat-cloud-services/eslint-config-redhat-cloud-services',
  globals: {
    insights: 'readonly',
  },
  overrides: [
    {
      files: ['src/**/*.ts', 'src/**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['plugin:@typescript-eslint/recommended'],
      rules: {
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
      },
    },
  ],
  rules: {
    'react/no-unescaped-entities': 0,
    'sort-imports': [
      'error',
      {
        ignoreDeclarationSort: true,
      },
    ],
    "rulesdir/forbid-pf-relative-imports": 'off'
  },
};
