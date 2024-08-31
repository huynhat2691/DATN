
const mongoose = require("mongoose");

const classificationSchema = new mongoose.Schema(
  {
    group1: String,
    group2: String,
    price: Number,
    stock: Number,
    sku: String,
    percentageDiscount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    discountPrice: {
      type: Number,
    },
  },
  { _id: true }
);

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên sản phẩm"],
  },
  description: {
    type: String,
    required: [true, "Vui lòng nhập mô tả sản phẩm"],
  },
  category: {
    type: String,
    required: [true, "Vui lòng chọn danh mục sản phẩm"],
  },
  subcategory: {
    type: String,
  },
  subclassification: {
    type: String,
  },
  hasClassifications: {
    type: Boolean,
    default: false,
  },
  group1: {
    name: String,
    values: [String],
  },
  group2: {
    name: String,
    values: [String],
  },
  classifications: [classificationSchema],
  price: {
    type: Number,
  },
  stock: {
    type: Number,
  },
  percentageDiscount: {
    type: Number,
    default: 0,
    min: 0,
    max: 100,
  },
  discountPrice: {
    type: Number,
  },
  images: [
    {
      type: String,
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
        default: Date.now,
      },
    },
  ],
  ratings: {
    type: Number,
    default: 0,
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
    default: Date.now,
  },
});

module.exports = mongoose.model("Product", productSchema);
