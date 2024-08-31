const express = require("express");
const router = express.Router();
const CouponCodeAdmin = require("../model/couponCodeAdmin");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Tạo mã giảm giá mới
const createCoupon = catchAsyncErrors(async (req, res, next) => {
  const { name, code, discountType, discountValue, maxUses, expiryDate } =
    req.body;

  const coupon = await CouponCodeAdmin.create({
    name,
    code,
    discountType,
    discountValue,
    maxUses,
    expiryDate,
  });

  res.status(201).json({
    success: true,
    coupon,
  });
});

// Lấy tất cả mã giảm giá
const getAllCoupons = catchAsyncErrors(async (req, res, next) => {
  const coupons = await CouponCodeAdmin.find();

  res.status(200).json({
    success: true,
    coupons,
  });
});

// Cập nhật mã giảm giá
const updateCoupon = catchAsyncErrors(async (req, res, next) => {
  let coupon = await CouponCodeAdmin.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Không tìm thấy mã giảm giá", 404));
  }

  coupon = await CouponCodeAdmin.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    coupon,
  });
});

// Xóa mã giảm giá
const deleteCoupon = catchAsyncErrors(async (req, res, next) => {
  const coupon = await CouponCodeAdmin.findById(req.params.id);

  if (!coupon) {
    return next(new ErrorHandler("Không tìm thấy mã giảm giá", 404));
  }

  await Coupon.deleteOne({ _id: req.params.id });

  res.status(200).json({
    success: true,
    message: "Mã giảm giá đã được xóa",
  });
});

// Lấy mã giảm giá theo code
const getCouponByCode = catchAsyncErrors(async (req, res, next) => {
  const coupon = await CouponCodeAdmin.findOne({ code: req.params.code });

  if (!coupon) {
    return next(new ErrorHandler("Mã giảm giá không tồn tại", 404));
  }

  res.status(200).json({
    success: true,
    coupon,
  });
});

// Update usedCount and decrement maxUses
const updateCouponUsage = catchAsyncErrors(async (req, res, next) => {
  const { code } = req.params;

  const coupon = await CouponCodeAdmin.findOne({ code });

  if (!coupon) {
    return next(new ErrorHandler("Mã giảm giá không tồn tại", 404));
  }

  // Check expiration date
  if (new Date(coupon.expiryDate) < new Date()) {
    return res.status(400).json({
      success: false,
      message: "Mã giảm giá đã hết hạn",
    });
  }

  // Check usage limit
  if (coupon.usedCount >= coupon.maxUses) {
    return res.status(400).json({
      success: false,
      message: "Mã giảm giá đã hết lượt sử dụng",
    });
  }

  // Increment usedCount and decrement maxUses
  coupon.usedCount += 1;
  await coupon.save();

  res.status(200).json({
    success: true,
    message: "Mã giảm giá đã được cập nhật",
  });
});

router.put("/update-coupon-usage/:code", updateCouponUsage);
router.post("/create-coupon-admin", createCoupon);
router.get("/all-coupons-admin", getAllCoupons);
router.put("/update-coupon-admin/:id", updateCoupon);
router.delete("/delete-coupon-admin/:id", deleteCoupon);
router.get("/get-admin-coupon-value/:code", getCouponByCode);

module.exports = router;
