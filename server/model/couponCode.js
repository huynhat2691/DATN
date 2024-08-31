const mongoose = require("mongoose");
const couponCodeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Vui lòng nhập tên mã giảm giá"],
      unique: true,
    },
    code: {
      type: String,
      required: [true, "Vui lòng nhập mã giảm giá"],
      unique: true,
    },
    discountType: {
      type: String,
      required: [true, "Vui lòng chọn loại giảm giá"],
      enum: ["percentage", "fixed"],
    },
    discountValue: {
      type: Number,
      required: [true, "Vui lòng nhập giá trị giảm giá"],
    },
    shopId: {
      type: String,
      required: true,
    },
    selectedProduct: {
      type: String,
    },
    maxUses: {
      type: Number,
      required: [true, "Vui lòng nhập số lượng mã giảm giá"],
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    expiryDate: {
      type: Date,
      required: [true, "Vui lòng nhập ngày hết hạn"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CouponCode", couponCodeSchema);
