const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs'); // Import your GraphQL schema
const resolvers = require('./schema/resolvers'); // Import your resolvers (you need to implement these)
const app = express();
const port = 4000;

require('dotenv').config({ path: '.env.test' });

(async () => {
  // Initialize Apollo Server with typeDefs and resolvers
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, // Enables GraphQL Playground in development
    playground: true,
  });

  // Apply middleware to the Express app
  await server.start();
  server.applyMiddleware({ app });

  // Middleware for JSON handling
  app.use(express.json());

  // Middleware for error handling
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
  });

  // Start the Express server
  if (require.main === module) {
    app.listen(port, () => {
      console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`);
    });
  }
})();

// Export the app for testing
module.exports = app;
