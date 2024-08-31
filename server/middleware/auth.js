const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../model/user");
const Shop = require("../model/shop");

module.exports = {
  isAuthenticated: catchAsyncErrors(async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
      return next(new ErrorHandler("Vui lòng đăng nhập để tiếp tục", 401));
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(decoded.id);

    next();
  }),

  isSellerAuthenticated: catchAsyncErrors(async (req, res, next) => {
    const { seller_token } = req.cookies;
    if (!seller_token) {
      return next(new ErrorHandler("Vui lòng đăng nhập để tiếp tục", 401));
    }

    const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);

    req.seller = await Shop.findById(decoded.id);

    next();
  }),

  isAdminAuthenticated: (...roles) => {
    return catchAsyncErrors(async (req, res, next) => {
      if (!req.user) {
        return next(new ErrorHandler("Vui lòng đăng nhập để tiếp tục", 401));
      }

      if (!roles.includes(req.user.role)) {
        return next(
          new ErrorHandler("Bạn không được phép truy cập vào mục này", 403)
        );
      }

      next();
    });
  },
};
