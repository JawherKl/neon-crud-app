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
  type Review {
    id: ID!
    user: User!
    product: Product!
    rating: Int!
    comment: String
    createdAt: String!
  }

  # Queries
  type Query {
    # User Queries
    getUserOrders: [Order]

    # Product Queries
    getProducts: [Product]
    getProductById(id: ID!): Product

    # Order Queries
    getOrderById(id: ID!): Order
    getOrders: [Order!]!

    # Review Queries
    getReviewsByProduct(productId: ID!): [Review!]!
    getReviewById(id: ID!): Order
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
    updateOrderStatus(id: ID!, status: String!): Order
    deleteOrder(id: ID!): Boolean

    # Review Mutations
    createReview(productId: ID!, rating: Int!, comment: String): Review
  }

  # Input types
  input OrderInput {
    productId: ID!
    quantity: Int!
  }
`;

module.exports = typeDefs;
