import type { CodegenConfig } from '@graphql-codegen/cli';

/**
 * GraphQL Code Generator Configuration
 *
 * This config generates TypeScript types from the GraphQL schema.
 *
 * Usage:
 *   npm install -D @graphql-codegen/cli @graphql-codegen/typescript \
 *     @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
 *   npx graphql-codegen
 *
 * The generated types will be the Single Source of Truth for both FE and BE.
 */
const config: CodegenConfig = {
  // Schema location - the SSoT
  schema: './spec/interface/schema.graphql',

  // Operations that FE uses
  documents: ['./spec/interface/operations.graphql', './src/**/*.graphql'],

  // Output configuration
  generates: {
    // Generate TypeScript types for schema
    './src/generated/graphql.ts': {
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo', // Change to urql/vue-apollo as needed
      ],
      config: {
        // Use exact types
        strictScalars: true,

        // Custom scalar mappings
        scalars: {
          UUID: 'string',
          DateTime: 'string', // ISO 8601 format
          JSON: 'Record<string, unknown>',
        },

        // Generate React hooks for Apollo Client
        withHooks: true,
        withHOC: false,
        withComponent: false,

        // Use TypeScript enums
        enumsAsTypes: false,

        // Add __typename to all types
        addTypename: true,

        // Skip generating types for unknown scalars
        skipTypename: false,

        // Make optional fields optional in TypeScript
        avoidOptionals: false,

        // Use Maybe<T> for nullable fields
        maybeValue: 'T | null',
      },
    },

    // Generate introspection result for Apollo Client
    './src/generated/introspection.json': {
      plugins: ['introspection'],
      config: {
        minify: true,
      },
    },

    // Generate schema AST for runtime validation
    './src/generated/schema.json': {
      plugins: ['introspection'],
    },
  },

  // Hooks for pre/post generation
  hooks: {
    afterAllFileWrite: ['prettier --write'],
  },

  // Watch mode configuration
  watch: process.env.NODE_ENV === 'development',
};

export default config;
