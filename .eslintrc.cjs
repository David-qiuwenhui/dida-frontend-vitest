module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2021: true,
    'mocha': true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
    '@vue/eslint-config-typescript'
  ],
  parserOptions: {
    ecmaVersion: 2021,
    parser: '@typescript-eslint/parser',
    sourceType: 'module'
  },
  plugins: [
    'vue',
    '@typescript-eslint'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/multi-word-component-names': 'off',
    '@typescript-eslint/no-unused-vars': 'warn'
  },
  overrides: [
    {
      files: ['cypress/**/*.js', 'cypress/**/*.ts'],
      env: {
        'mocha': true,
        'browser': true
      },
      globals: {
        'cy': true,
        'Cypress': true
      }
    },
    {
      files: ['**/*.test.ts', '**/*.spec.ts', '**/*.setup.ts'],
      env: {
        'mocha': true,
        'jest': true
      }
    }
  ]
};