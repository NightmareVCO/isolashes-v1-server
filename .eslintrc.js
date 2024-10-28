module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'simple-import-sort'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // "plugin:@typescript-eslint/recommended-type-checked",
    'plugin:prettier/recommended',
    'plugin:unicorn/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'unicorn/throw-new-error': 'off',
    'unicorn/prefer-top-level-await': 'off',
    'unicorn/no-null': 'off',
    'unicorn/no-useless-undefined': 'off',
    'unicorn/no-nested-ternary': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': [
      'error',
      {
        "endOfLine": "auto"
      }
    ],
     'unicorn/filename-case': [
      'error',
      {
        'cases': {
            'pascalCase': true,
            'camelCase': true,
            'kebabCase': true
        }
      }
    ],
  },
  overrides: [
    {
      files: ["*.ts"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              [
                "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)"
              ],
              ["^node:.*\\u0000$", "^@?\\w.*\\u0000$", "^[^.].*\\u0000$", "^\\..*\\u0000$"],
              ["^\\u0000"],
              ["^node:"],
              ["^@?\\w"],
              ["^@src(/.*|$)"],
              ["^@shared(/.*|$)"],
              ["^@tests(/.*|$)"],
              ["^"],
              ["^\\."]
            ]
          }
        ]
      }
    }
  ]
};
