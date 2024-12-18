const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const typeDefs = require('./schema/typeDefs'); // Import your GraphQL schema
const resolvers = require('./schema/resolvers'); // Import your resolvers
const app = express();
const port = 4000;

require('dotenv').config();

// Middleware to extract user from JWT
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const user = jwt.verify(token, process.env.JWT_SECRET);
      req.user = user; // Attach user to request
      console.log('Authenticated User:', user);
    } catch (error) {
      console.error('Invalid Token:', error.message);
    }
  } else {
    console.log('Authorization header missing or invalid');
  }
  next();
};

(async () => {
  // Initialize Apollo Server with typeDefs and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enables GraphQL Playground in development
    playground: true,
    context: ({ req }) => ({
      user: req.user, // Pass authenticated user to context
    }),
  });

  // Middleware for authentication
  app.use(authMiddleware);

  // Middleware for JSON handling
  app.use(express.json());

  // Start the Apollo Server
  await server.start();
  server.applyMiddleware({ app });

  // Start the Express server
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  }
})();

// Export the app for testing
module.exports = app;
