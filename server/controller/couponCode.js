const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const { isSellerAuthenticated } = require("../middleware/auth");
const CouponCode = require("../model/couponCode");

// add coupon code
router.post(
  "/add-coupon-code",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const isCouponCodeExists = await CouponCode.findOne({
        $or: [{ name: req.body.name }, { code: req.body.code }],
      });

      if (isCouponCodeExists) {
        return next(new ErrorHandler("Mã giảm giá đã tồn tại", 400));
      }

      const couponCode = await CouponCode.create(req.body);
      res.status(201).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all coupons of shop
router.get(
  "/get-all-coupons/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find({ shopId: req.seller._id });

      res.status(200).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all coupons
router.get(
  "/get-all-coupons",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCodes = await CouponCode.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        couponCodes,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// delete coupon code
router.delete(
  "/delete-coupon/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findByIdAndDelete(req.params.id);

      if (!couponCode) {
        return next(new ErrorHandler("Mã giảm giá không tồn tại!", 400));
      }

      res.status(200).json({
        success: true,
        message: "Mã giảm giá đã được xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all coupons of shop
router.get(
  "/get-coupon-value/:code",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const couponCode = await CouponCode.findOne({ code: req.params.code });

      if (!couponCode) {
        return next(new ErrorHandler("Mã giảm giá không tồn tại", 404));
      }

      res.status(200).json({
        success: true,
        couponCode,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// Update coupon usage for seller
const updateCouponUsageSeller = catchAsyncErrors(async (req, res, next) => {
  const couponCode = await CouponCode.findOne({ code: req.params.code });

  if (!couponCode) {
    return next(new ErrorHandler("Mã giảm giá không tồn tại", 404));
  }

  // Check expiration date
  if (new Date(couponCode.expiryDate) < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Mã giảm giá đã hết hạn",
    });
  }

  // Check usage limit
  if (couponCode.usedCount >= couponCode.maxUses) {
    return res.status(400).json({
      success: false,
      message: "Mã giảm giá đã hết lượt sử dụng",
    });
  }

  // Increment usedCount and decrement maxUses
  couponCode.usedCount += 1;
  await couponCode.save();

  res.status(200).json({
    success: true,
    message: "Mã giảm giá đã được cập nhật",
  });
});

router.put("/update-coupon-usage-seller/:code", updateCouponUsageSeller);

module.exports = router;
