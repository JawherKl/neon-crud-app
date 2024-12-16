const productService = require('../services/productService');
const orderService = require('../services/orderService');
const authService = require('../services/authService');
const reviewService = require('../services/reviewService');
const mongoose = require('mongoose');

const resolvers = {
  Query: {
    // Product Queries
    getProducts: async () => {
        return await productService.getProducts();
    },
    getProductById: async (_, { id }) => {
        return await productService.getProductById(id);
    },
    // Order Queries
    getUserOrders: async (_, __, { user }) => {
        if (!user) throw new Error('Unauthorized');
        return await orderService.getUserOrders(user.id);
    },
    getOrderById: async (_, { id }) => {
      return await orderService.getOrderById(id);
    },
    getOrders: async () => {
      return await orderService.getOrders();
    },
    getReviewsByProduct: async (_, { productId }) => {
      return await reviewService.getReviewsByProduct(productId);
    },
    getReviewById: async (_, { id }) => {
      return await reviewService.getReviewById(id);
    },
  },
  Mutation: {
    // Auth Mutations
    register: async (_, args) => {
        return await authService.register(args);
    },
    login: async (_, args) => {
        return await authService.login(args);
    },
    // Product Mutations
    createProduct: async (_, args, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');
      return productService.createProduct(args);
    },
    updateProduct: async (_, args, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');
      return productService.updateProduct(args);
    },
    deleteProduct: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');
      return productService.deleteProduct(id);
    },
    // Order Mutations
    createOrder: async (_, { products, totalAmount }, { user }) => {
      if (!user) throw new Error('Authentication required');
      return await orderService.createOrder({ userId: user.id, products, totalAmount });
    },
    updateOrderStatus: async (_, { id, status }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');
      return await orderService.updateOrderStatus(id, status);
    },
    deleteOrder: async (_, { id }, { user }) => {
      if (!user || user.role !== 'admin') throw new Error('Unauthorized');
      return orderService.deleteOrder(id);
    },
    // Review Mutations
    createReview: async (_, { productId, rating, comment }, { user }) => {
      if (!user) throw new Error('Authentication required');
      const userId = new mongoose.Types.ObjectId(user.id);
      return await reviewService.createReview({ userId, productId, rating, comment });
    },
  },
};

module.exports = resolvers;
