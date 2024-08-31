const express = require("express");
const path = require("path");
const router = express.Router();
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const {
  isSellerAuthenticated,
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const { upload } = require("../multer");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendShopToken = require("../utils/shopToken");
const nodemailterTemplateShop = require("../utils/nodemailterTemplateShop");

// create shop
router.post("/create-shop", async (req, res, next) => {
  console.log("Received data:", req.body);
  try {
    const { name, phoneNumber, email, city, district, ward, password } =
      req.body;

    const sellerEmail = await Shop.findOne({ email });
    if (sellerEmail) {
      return next(new ErrorHandler("Shop đã tồn tại", 400));
    }

    const seller = {
      name,
      phoneNumber,
      email,
      city,
      district,
      ward,
      password,
    };

    console.log("Seller object:", seller);

    const activationToken = createActivationToken(seller);

    const activationUrl = `http://localhost:5173/seller/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Kích hoạt tài khoản bán hàng eCommUnity",
        html: nodemailterTemplateShop(seller.name, activationUrl),
      });

      res.status(201).json({
        success: true,
        message: `Tài khoản bán hàng đã được tạo thành công. Vui lòng kiểm tra email của bạn:- ${seller.email} để kích hoạt tài khoản bán hàng`,
      });
    } catch (error) {
      console.error("Full error:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

// create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

// activate shop account
router.post(
  "/shopactivation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      if (!newSeller) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, phoneNumber, email, city, district, ward, password } =
        newSeller;

      let seller = await Shop.findOne({ email });

      if (seller) {
        return next(new ErrorHandler("Shop đã tồn tại", 400));
      }

      seller = await Shop.create({
        name,
        phoneNumber,
        email,
        // address,
        city,
        district,
        ward,
        password,
      });

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(new ErrorHandler("Vui lòng cung cấp đầy đủ thông tin!", 400));
      }

      const seller = await Shop.findOne({ email }).select("+password");

      if (!seller) {
        return next(new ErrorHandler("Người bán không tồn tại!", 400));
      }

      const isPasswordValid = await seller.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Vui lòng cung cấp đầy đủ thông tin!", 400)
        );
      }

      sendShopToken(seller, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load shop
router.get(
  "/getSeller",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Shop không tồn tại", 400));
      }

      res.status(200).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log out shop
router.get(
  "/logout-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });
      res.status(201).json({
        success: true,
        message: "Đăng xuất thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);

      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-shop-avatar",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { image } = req.body; // Expect base64 string

      if (!image) {
        return next(new ErrorHandler("Không tìm thấy ảnh", 400));
      }

      const shop = await Shop.findByIdAndUpdate(
        req.seller._id,
        { avatar: image },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      console.error("Error in update avatar:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update shop info
router.put(
  "/update-shop-info",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { name, description, ward, district, city, phoneNumber, password } =
        req.body;

      const shop = await Shop.findById(req.seller._id);

      if (!shop) {
        return next(new ErrorHandler("Không tìm thấy shop", 404));
      }

      // Update basic info
      shop.name = name;
      shop.description = description;
      shop.ward = ward;
      shop.district = district;
      shop.city = city;
      shop.phoneNumber = phoneNumber;

      // Update password if provided
      if (password) {
        shop.password = await bcrypt.hash(password, 10);
      }

      await shop.save();

      res.status(200).json({
        success: true,
        message: "Thông tin shop đã được cập nhật thành công",
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all sellers for admin
router.get(
  "/admin-get-all-sellers",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const sellers = await Shop.find().sort({
        createdAt: -1,
      });

      res.status(201).json({ success: true, sellers });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller for admin
router.delete(
  "/delete-seller/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.params.id);

      if (!seller) {
        return next(new ErrorHandler("Không tìm thấy shop", 404));
      }

      await Shop.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Shop đã được xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update seller withdraw methods for seller
router.put(
  "/update-seller-withdraw-method",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { withdrawMethod } = req.body;

      const seller = await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod,
      });

      res.status(201).json({
        success: true,
        seller,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete seller withdraw merthods --- only seller
router.delete(
  "/delete-withdraw-method",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const seller = await Shop.findById(req.seller._id);

      if (!seller) {
        return next(new ErrorHandler("Không tìm thấy shop", 404));
      }

      await Shop.findByIdAndUpdate(req.seller._id, {
        withdrawMethod: null,
      });

      res.status(201).json({
        success: true,
        message: "Phương thức thanh toán đã xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
