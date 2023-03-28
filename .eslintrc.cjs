module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:@next/next/recommended',
    'plugin:storybook/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json'],
  },
  plugins: ['react', '@typescript-eslint', 'unused-imports'],
  ignorePatterns: ['build'], // 追加 .eslintignoreに対象外にしているが無いとコンパイルに時間がかかる
  rules: {
    'react/jsx-props-no-spreading': 'off',
    'no-use-before-define': 'off', // 関数や変数が定義される前に使われているとエラーになるデフォルトの機能をoff
    '@typescript-eslint/no-use-before-define': ['error'], // typescript側のno-use-before-defineを使うようにする
    'import/prefer-default-export': 'off', // named exportがエラーになるので使えるようにoff
    '@typescript-eslint/no-unused-vars': 'off', // unused-importsを使うため削除
    'unused-imports/no-unused-imports': 'error', // 不要なimportの削除
    'unused-imports/no-unused-vars': [
      // unused-importsでno-unused-varsのルールを再定義
      'warn',
      { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' },
    ],
    'react/function-component-definition': [
      // アロー関数以外受け付けない設定
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'no-param-reassign': [2, { props: false }],
    'import/extensions': [
      'error',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'react/jsx-filename-extension': [
      'error',
      {
        extensions: ['.jsx', '.tsx'],
      },
    ],
    'react/react-in-jsx-scope': 'off', // import React from 'react'が無くてもエラーを無くす
    'react/prop-types': 'off', // TypeScriptでチェックしているから不要。offにする
    'no-void': [
      // void演算子の許可
      'error',
      {
        allowAsStatement: true,
      },
    ],
    // importの並び順設定
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', ['parent', 'sibling'], 'object', 'type', 'index'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'next/**',
            group: 'external',
            position: 'before',
          },
          {
            pattern: 'API',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'graphql/**',
            group: 'internal',
            position: 'before',
          },
          {
            pattern: 'ui-components/**',
            group: 'index',
            position: 'after',
          },
          {
            pattern: '**\\.css',
            group: 'index',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'next/**'],
        'newlines-between': 'always',
        alphabetize: { order: 'asc', caseInsensitive: false },
      },
    ],
    // importをファイル先頭に記述
    'import/first': 'error',
    // 最後のimportの後に空行を追加
    'import/newline-after-import': 'error',
  },
  settings: {
    'import/resolver': {
      // importするファイルをjsだけではなく、tsを含むファイルを許可する
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
