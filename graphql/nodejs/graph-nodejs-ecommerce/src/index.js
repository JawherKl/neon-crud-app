const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const connectDB = require('./config/db');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
require('dotenv').config();

connectDB();

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

server.listen().then(({ url }) => {
  console.log(`Server running at ${url}`);
});
