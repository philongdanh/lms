/**
 * LMS Mock Server
 * 
 * Serves both GraphQL (/graphql) and REST API (/api) endpoints
 * Based on Single Source of Truth: schema.graphql and api-v1.yaml
 * 
 * Port: 5000
 */

import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { createYoga, createSchema } from 'graphql-yoga';
import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

import { queryResolvers, mutationResolvers, typeResolvers } from './graphql-resolvers.js';
import restHandlers from './rest-handlers.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 5000;

// -----------------------------------------------------------------------------
// Load GraphQL Schema from SSoT
// -----------------------------------------------------------------------------
let typeDefs;
try {
  typeDefs = readFileSync(join(__dirname, '../../spec/interface/schema.graphql'), 'utf-8');
} catch (e) {
  console.warn('⚠️  Could not load schema.graphql, using inline schema');
  typeDefs = `
    type Query {
      health: Boolean!
    }
    type Mutation {
      ping: Boolean!
    }
  `;
}

// -----------------------------------------------------------------------------
// Create GraphQL Yoga Server
// -----------------------------------------------------------------------------
const schema = createSchema({
  typeDefs,
  resolvers: {
    Query: queryResolvers,
    Mutation: mutationResolvers,
    ...typeResolvers,
  },
});

const yoga = createYoga({
  schema,
  graphqlEndpoint: '/graphql',
  landingPage: true,
  cors: {
    origin: '*',
    credentials: true,
  },
});

// -----------------------------------------------------------------------------
// Create Express Server
// -----------------------------------------------------------------------------
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Request logging
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
  });
  next();
});

// -----------------------------------------------------------------------------
// Mount Routes
// -----------------------------------------------------------------------------

// GraphQL endpoint
app.use('/graphql', yoga);

// REST API endpoints (with /api prefix for v1)
app.use('/api', restHandlers);
app.use('/api/v1', restHandlers); // Also support /api/v1 prefix

// Root health check
app.get('/', (req, res) => {
  res.json({
    name: 'LMS Mock Server',
    version: '1.0.0',
    endpoints: {
      graphql: '/graphql',
      rest: '/api',
      health: '/api/health',
    },
    docs: {
      graphql_playground: `http://localhost:${PORT}/graphql`,
    },
  });
});

// -----------------------------------------------------------------------------
// Error Handler
// -----------------------------------------------------------------------------
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: err.message,
  });
});

// -----------------------------------------------------------------------------
// Start Server
// -----------------------------------------------------------------------------
const server = createServer(app);

server.listen(PORT, () => {
  console.log('');
  console.log('🚀 LMS Mock Server is running!');
  console.log('');
  console.log(`   GraphQL:  http://localhost:${PORT}/graphql`);
  console.log(`   REST API: http://localhost:${PORT}/api`);
  console.log(`   Health:   http://localhost:${PORT}/api/health`);
  console.log('');
  console.log('📚 Based on Single Source of Truth:');
  console.log('   - GraphQL: spec/interface/schema.graphql');
  console.log('   - REST:    spec/interface/api-v1.yaml');
  console.log('');
});
