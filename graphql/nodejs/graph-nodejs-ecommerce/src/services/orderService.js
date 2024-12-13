const Order = require('../models/Order');
const Product = require('../models/Product');

const orderService = {
  async getUserOrders(userId) {
    return await Order.find({ user: userId }).populate('products.product');
  },

  async createOrder(userId, products, totalAmount) {
    const productDetails = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product with ID ${item.productId} not found`);

        return {
          product,
          quantity: item.quantity,
        };
      })
    );

    const order = new Order({
      user: userId,
      products: productDetails,
      totalAmount,
      status: 'Pending',
    });
    return await order.save();
  },

  async updateOrderStatus(orderId, status) {
    const order = await Order.findById(orderId);
    if (!order) throw new Error('Order not found');

    order.status = status;
    return await order.save();
  },
};

module.exports = orderService;
