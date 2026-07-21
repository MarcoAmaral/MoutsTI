import js from '@eslint/js'
import cypressPlugin from 'eslint-plugin-cypress'
import prettier from 'eslint-config-prettier'

export default [
  {
    ignores: [
      'node_modules/',
      'cypress/videos/',
      'cypress/screenshots/',
      'cypress/downloads/',
      'cypress/reports/',
      'ServeRest/',
      'ServeRestFront/',
      '.env*',
      '!.env.example',
      'npm-debug.log*',
      '*.log',
      '.DS_Store',
      '.vscode/',
      '.idea/',
    ],
  },
  {
    files: ['cypress.config.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: {
        require: 'readonly',
        module: 'readonly',
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ['cypress/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: cypressPlugin.configs.recommended.languageOptions.globals,
    },
    plugins: {
      cypress: cypressPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...cypressPlugin.configs.recommended.rules,
    },
  },
  prettier,
]
