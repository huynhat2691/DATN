const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Vui lòng nhập tên của bạn!"],
  },
  email: {
    type: String,
    required: [true, "Vui lòng nhập email của bạn!"],
  },
  password: {
    type: String,
    required: [true, "Vui lòng nhập mật khẩu của bạn"],
    minLength: [6, "Mật khẩu phải dài hơn hoặc bằng 6 ký tự"],
    select: false,
  },
  phoneNumber: {
    type: Number,
  },
  addresses: [
    {
      fullname: {
        type: String,
      },
      phoneNumber: {
        type: Number,
      },
      province: {
        type: String,
      },
      district: {
        type: String,
      },
      ward: {
        type: String,
      },
      address1: {
        type: String,
      },
      addressType: {
        type: String,
      },
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  avatar: {
    type: String,
    default: "",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  resetPasswordToken: String,
  resetPasswordTime: Date,
});

//  Hash password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

// jwt token
userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
};

// compare password
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
