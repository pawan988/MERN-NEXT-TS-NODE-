let mongoose = require("mongoose");

const productSchema = {
  name: {
    type: String,
    required: [true, "Please enter product name."],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Please enter product description."],
  },
  price: {
    type: Number,
    required: [true, "Please enter product price."],
    maxLength: [8, "Price should be a maximum of 8 characters long."],
  },
  rating: {
    type: Number,
    default: 0,
  },
  images: {
    type: Object,
  },
  category: {
    type: String,
    required: [true, "Please enter product category."],
  },
  stock: {
    type: Number,
    required: [true, "Please provide the product's stock quantity."],
    maxLength: [3, "Stock should be a maximum of 3 characters long."],
    default: 1,
  },
  // numberOfReviews: {
  //   type: Number,
  //   default: 0,
  //   reviews: [
  //     {
  //       name: {
  //         type: String,
  //         required: true,
  //       },
  //       rating: {
  //         type: Number,
  //         required: true,
  //       },
  //       comment: {
  //         type: String,
  //         required: true,
  //       },
  //     },
  //   ],
  // },
  createdAt: {
    type: Date,
    default: Date.now,
  },
};

module.exports = mongoose.model("Product", productSchema);
