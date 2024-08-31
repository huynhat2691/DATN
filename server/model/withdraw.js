const mongoose = require("mongoose");

const withdrawSchema = new mongoose.Schema({
  seller: {
    type: Object,
    required: [true, "Xin vui lòng vào shop"],
  },
  amount: {
    type: Number,
    required: [true, "Vui lòng nhập số tiền"],
  },
  status: {
    type: String,
    default: "Processing",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  updatedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("Withdraw", withdrawSchema);
