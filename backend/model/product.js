const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true],
  },

  description: {
    type: String,
    required: [true],
  },

  category: {
    type: String,
    required: [true],
  },

  tags: {
    type: String,
  },

  originalPrice: {
    type: Number,
  },

  discountPrice: {
    type: Number,
    required: [true],
  },

  stock: {
    type: Number,
    required: [true],
  },

  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],

  reviews: [
    {
      user: {
        type: Object,
      },
      rating: {
        type: Number,
      },
      comment: {
        type: String,
      },
      productId: {
        type: String,
      },
      createdAt: {
        type: Date,
        default: Date.now(),
      },
    },
  ],

  ratings: {
    type: Number,
  },

  shopId: {
    type: String,
    required: true,
  },

  shop: {
    type: Object,
    required: true,
  },

  sold_out: {
    type: Number,
    default: 0,
  },

  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Product", productSchema);
