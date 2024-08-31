const mongoose = require("mongoose");

const classificationSchema = new mongoose.Schema(
  {
    group1: String,
    group2: String,
    price: String,
    stock: Number,
    sku: String,
    percentageDiscount: {
      type: Number,
      default: 0,
      min: 0,
      max: 100,
    },
    discountPrice: {
      type: String,
    },
  },
  { _id: true }
);

const eventSchema = new mongoose.Schema({
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
  start_Date: {
    type: Date,
    required: [true, "Vùi lòng chọn thời gian bắt đầu"],
  },
  end_Date: {
    type: Date,
    required: [true, "Vui lòng chọn thời gian kết thúc"],
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
    type: String,
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
    type: String,
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

module.exports = mongoose.model("Event", eventSchema);
