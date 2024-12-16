const productService = require('../services/productService');
const orderService = require('../services/orderService');
const authService = require('../services/authService');

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
    getAllOrders: async () => {
      const orders = await Order.find().populate('products.product', 'id name price');
      return orders;
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
  },
};

module.exports = resolvers;
