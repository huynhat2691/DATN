const Withdraw = require("../model/withdraw");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const express = require("express");
const {
  isSellerAuthenticated,
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth");
const sendMail = require("../utils/sendMail");
const router = express.Router();
const Shop = require("../model/shop");
const mongoose = require("mongoose");

router.post(
  "/create-withdraw-request",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { amount } = req.body;

      const data = {
        seller: req.seller,
        amount,
      };

      // Tạo withdraw request
      const withdraw = await Withdraw.create(data);

      // Gửi email
      try {
        await sendMail({
          email: req.seller.email,
          subject: "Yêu cầu thanh toán",
          message: `Xin chào ${req.seller.name}, yêu cầu thanh toán ${amount} của bạn đã được tạo thành công.`,
        });
      } catch (error) {
        // Log lỗi gửi email nhưng không throw error
        console.error("Lỗi không gửi được email:", error);
      }

      // Gửi response
      res.status(201).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get all withdraw request for admin
router.get(
  "/admin-get-all-withdraw-request",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const withdraws = await Withdraw.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        withdraws,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update withdraw request status for admin
router.put(
  "/admin-update-withdraw-status/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;
      const { sellerId } = req.body;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return next(new ErrorHandler("Invalid withdraw ID", 400));
      }

      const withdraw = await Withdraw.findById(id);

      if (!withdraw) {
        return next(new ErrorHandler("Withdraw request not found", 404));
      }

      if (withdraw.status === "Approved") {
        return next(
          new ErrorHandler("This withdraw request is already approved", 400)
        );
      }

      withdraw.status = "Approved";
      withdraw.updatedAt = Date.now();
      await withdraw.save();

      const seller = await Shop.findById(sellerId);

      if (!seller) {
        return next(new ErrorHandler("Seller not found", 404));
      }

      // Cập nhật shop balance chỉ khi status được cập nhật thành Approved
      if (seller.availableBalance < withdraw.amount) {
        return next(new ErrorHandler("Insufficient balance", 400));
      }
      seller.availableBalance -= withdraw.amount;

      const transaction = {
        _id: withdraw._id,
        amount: withdraw.amount,
        updatedAt: withdraw.updatedAt,
        status: withdraw.status,
      };

      seller.transaction.unshift(transaction);

      await seller.save();

      try {
        await sendMail({
          email: seller.email,
          subject: "Yêu cầu thanh toán đã được chấp thuận",
          message: `Xin chào ${seller.name}, yêu cầu thanh toán của bạn đã được chấp thuận thành công.`,
        });
      } catch (error) {
        console.error("Lỗi không gửi được email:", error);
      }

      res.status(200).json({
        success: true,
        withdraw,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete withdraw request for admin
router.delete(
  "/admin-delete-withdraw-request/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { id } = req.params;

      if (!id || !mongoose.Types.ObjectId.isValid(id)) {
        return next(
          new ErrorHandler("ID yêu cầu thanh toán không hợp lệ", 400)
        );
      }

      const withdraw = await Withdraw.findById(id);

      if (!withdraw) {
        return next(new ErrorHandler("Không tìm thấy yêu cầu thanh toán", 404));
      }

      if (withdraw.status !== "Processing") {
        return next(
          new ErrorHandler("Chỉ có thể xóa yêu cầu thanh toán đang xử lý", 400)
        );
      }

      await Withdraw.findByIdAndDelete(id);

      const seller = await Shop.findById(withdraw.seller);

      if (seller) {
        try {
          await sendMail({
            email: seller.email,
            subject: "Yêu cầu thanh toán đã bị xóa",
            message: `Xin chào ${seller.name}, yêu cầu thanh toán của bạn đã bị xóa.`,
          });
        } catch (error) {
          console.error("Lỗi không gửi được email:", error);
        }
      }

      res.status(200).json({
        success: true,
        message: "Yêu cầu thanh toán đã được xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
