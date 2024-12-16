const Order = require('../models/Order');
const Product = require('../models/Product');

const orderService = {
  async getUserOrders(userId) {
    return await Order.find({ user: userId })
        .populate('products.product', 'id name description price');
  },
  async getProducts() {
      return await Product.find();
    },
  async getOrders() {
      return await Order.find();
  },
  async getOrderById(id) {
    return await Order.findById(id).populate('products.product', 'id name price');
  },
  async getAllOrders() {
    return await Order.find().populate('products.product', 'id name price');
  },
  async createOrder({ userId, products, totalAmount }) {
    const productDetails = await Promise.all(
        products.map(async (item) => {
            const product = await Product.findById(item.productId);
            if (!product) throw new Error(`Product with ID ${item.productId} not found`);

            return {
                product: product._id, // Use only the product's ID
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

    // Save the order and return the fully populated document
    return await order.save().then((savedOrder) =>
        savedOrder.populate('products.product', 'id name description price')
    );
  },

  async updateOrderStatus(id, status) {
    const order = await Order.findById(id);
    if (!order) throw new Error('Order not found');

    order.status = status;
    return await order.save();
  },
  async deleteOrder(id) {
    const order = await Order.findByIdAndDelete(id);
    if (!order) throw new Error(`Order not found`);
    return order;
  }
};

module.exports = orderService;
