const mongoose = require("mongoose");

const ShippingSchema = new mongoose.Schema(
  {
    sellerId: {
      type: String,
      required: true,
    },
    buyerId: {
      type: String,
      required: true,
    },
    orderId: String,
    shippingFee: {
      type: Number,
      required: true,
    },
    fromDistrict: {
      type: String,
      required: true,
    },
    toDistrict: {
      type: String,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["calculated", "pending", "shipped", "delivered"],
      default: "calculated",
    },
  },
  { timestamps: true }
);

const Shipping = mongoose.model("Shipping", ShippingSchema);

module.exports = Shipping;