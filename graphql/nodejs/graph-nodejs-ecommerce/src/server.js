const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
require('dotenv').config();

if (!process.env.JWT_SECRET) {
    throw new Error('Missing JWT_SECRET in .env file');
}

// Connect to the database
connectDB();

// Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const token = req.headers.authorization || '';
    if (token) {
      try {
        const user = jwt.verify(token, process.env.JWT_SECRET);
        return { user };
      } catch (error) {
        throw new Error('Invalid token');
      }
    }
    return {};
  },
});

module.exports = server;
