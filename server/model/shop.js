const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const shopSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên shop!"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Vui lòng nhập số điện thoại!"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng nhập email shop!"],
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: false,
  },
  ward: {
    type: String,
    required: false,
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu"],
    minLength: [6, "Mật khẩu phải dài hơn hoặc bằng 6 ký tự"],
    select: false,
  },
  description: {
    type: String,
  },
  role: {
    type: String,
    default: "Seller",
  },
  avatar: {
    type: String,
    default: "",
  },
  withdrawMethod: {
    type: Object,
  },
  availableBalance: {
    type: Number,
    default: 0,
  },
  transaction: [
    {
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
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now(),
  },

  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
shopSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
shopSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
shopSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("Shop", shopSchema);
