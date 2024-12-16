const Product = require('../models/Product');

const productService = {
  async getProducts() {
    return await Product.find();
  },

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');
    return product;
  },

  async createProduct({ name, description, price }) {
    const product = new Product({ name, description, price });
    return await product.save();
  },

  async updateProduct({ id, name, description, price }) {
    const product = await Product.findById(id);
    if (!product) throw new Error('Product not found');

    if (name) product.name = name;
    if (description) product.description = description;
    if (price) product.price = price;

    return await product.save();
  },
  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new Error('Product not found');
    return product;
  },
};

module.exports = productService;
