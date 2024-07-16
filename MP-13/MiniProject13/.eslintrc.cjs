module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs', 'supabase', 'src/types/database.types.ts', 'src/old code', 'src/store'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'eqeqeq': 'error', // Enforce the use of === and !==
    'no-unused-vars': 'error', // Enforce no unused vars
    '@typescript-eslint/no-unused-vars': 'error', // Enforce no unused vars for TypeScript
    'no-unused-expressions': 'error', // Enforce no unused expressions
    '@typescript-eslint/no-explicit-any': 'off', // Allow the use of any type
    // Custom rules for variable and object property naming
    '@typescript-eslint/naming-convention': [
      'error',
      // Enforce snake_case for variables and object properties
      {
        selector: 'variableLike',
        format: ['snake_case', 'camelCase', 'PascalCase'],
        leadingUnderscore: 'allow',
      },
      // Allow camelCase for function names
      {
        selector: 'function',
        format: ['camelCase'],
        leadingUnderscore: 'allow',
      },
      // Allow camelCase for function parameters
      {
        selector: 'parameter',
        format: ['camelCase', 'snake_case'],
        leadingUnderscore: 'allow',
      },
    ],
  },
}
