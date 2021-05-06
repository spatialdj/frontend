module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'prettier'
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: [
    'react',
    'react-hooks'
  ],
  rules: {
    'react/prop-types': 'off',
    'no-unused-vars': 'off',
    'react/no-children-prop': 'off'
  },
  settings: {
    react: {
      version: 'detect',
    }
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx'
      ]
    }
  ]
}
