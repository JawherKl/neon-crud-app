const { gql } = require('apollo-server');

const typeDefs = gql`
  # User-related types
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
    createdAt: String!
    updatedAt: String!
  }

  type AuthPayload {
    user: User
    token: String!
  }

  # Product-related types
  type Product {
    id: ID!
    name: String!
    description: String!
    price: Float!
    createdAt: String!
    updatedAt: String!
  }

  # Order-related types
  type Order {
    id: ID!
    user: User!
    products: [OrderProduct!]!
    totalAmount: Float!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  type OrderProduct {
    product: Product!
    quantity: Int!
  }

  # Queries
  type Query {
    # User Queries
    getUserOrders: [Order]

    # Product Queries
    getProducts: [Product]
    getProductById(id: ID!): Product
  }

  # Mutations
  type Mutation {
    # Auth Mutations
    register(name: String!, email: String!, password: String!, role: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload

    # Product Mutations
    createProduct(name: String!, description: String!, price: Float!): Product
    updateProduct(id: ID!, name: String, description: String, price: Float): Product
    deleteProduct(id: ID!): Product

    # Order Mutations
    createOrder(products: [OrderInput!]!, totalAmount: Float!): Order
    updateOrderStatus(orderId: ID!, status: String!): Order
  }

  # Input types
  input OrderInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
