const Product = require('../models/Product');
const Review = require('../models/Review');
const mongoose = require('mongoose');

const reviewService = {
  async getReviewById(id) {
    return await Review.findById(id).populate('products.product', 'id name price');
  },
  async createReview({ userId, productId, rating, comment }) {
    // Check if product exists
    const productObjectId = new mongoose.Types.ObjectId(productId);
    const product = await Product.findById(productObjectId);
    if (!product) throw new Error('Product not found');

    // Create a new review
    const review = new Review({
        user: userId,
        product: productId,
        rating,
        comment,
    });

    // Save the order and return the fully populated document
    return await review.save();
  },

};

module.exports = reviewService;
