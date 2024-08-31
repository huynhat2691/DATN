const express = require("express");
const router = express.Router();
const Product = require("../model/product");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const Order = require("../model/order");
const {
  isSellerAuthenticated,
  isAuthenticated,
  isAdminAuthenticated,
} = require("../middleware/auth");

// Hàm helper để xác định loại ảnh từ base64
function getImageType(base64String) {
  const match = base64String.match(/^data:image\/(\w+);base64,/);
  return match ? match[1] : null;
}

// add product
router.post(
  "/add-product",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shopId = req.body.shopId;
      const shop = await Shop.findOne({ _id: shopId });
      if (!shop) {
        return next(new ErrorHandler("Không tìm thấy ID shop", 404));
      } else {
        const productData = req.body;
        productData.shop = shop;

        // Xử lý hình ảnh base64
        if (productData.images && Array.isArray(productData.images)) {
          productData.images = productData.images.map((image) => {
            const imageType = getImageType(image);
            if (!imageType || !['jpg', 'jpeg', 'png', 'webp'].includes(imageType)) {
              throw new Error('Định dạng ảnh không hợp lệ');
            }
            return {
              data: image,
              contentType: `image/${imageType}`
            };
          });
        }

        // Xử lý dữ liệu phân loại
        if (productData.hasClassifications === "true") {
          productData.hasClassifications = true;
          productData.group1 = JSON.parse(productData.group1);
          if (productData.group2) {
            productData.group2 = JSON.parse(productData.group2);
          }

          // Xử lý classifications
          productData.classifications = JSON.parse(productData.classifications);
          productData.classifications.forEach((classification) => {
            classification.price = classification.price.replace(/\./g, "");
            classification.stock = Number(classification.stock);
            classification.percentageDiscount =
              Number(classification.percentageDiscount) || 0;
            classification.discountPrice =
              Number(classification.discountPrice) ||
              Number(classification.price);
          });

          // Xóa price, stock, percentageDiscount và discountPrice từ productData chính
          delete productData.price;
          delete productData.stock;
          delete productData.percentageDiscount;
          delete productData.discountPrice;
        } else {
          productData.hasClassifications = false;
          if (productData.price) {
            productData.price = productData.price.replace(/\./g, "");
          } else {
            productData.price = "";
          }
          if (productData.stock) {
            productData.stock = Number(productData.stock);
          } else {
            productData.stock = null;
          }
          productData.percentageDiscount =
            Number(productData.percentageDiscount) || 0;
          productData.discountPrice =
            Number(productData.discountPrice) || Number(productData.price) || 0;
        }

        const product = await Product.create(productData);

        res.status(201).json({
          success: true,
          product,
        });
      }
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all products of shop
router.get(
  "/get-all-products-shop/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find({ shopId: req.params.id });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// delete product
router.delete(
  "/delete-product/:id",
  isSellerAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const productId = req.params.id;

      const productData = await Product.findById(productId);

      productData.images.forEach((imageUrl) => {
        const filename = imageUrl;
        const filePath = `uploads/${filename}`;

        fs.unlink(filePath, (err) => {
          if (err) {
            console.log(err);
            res.status(500).json({ message: "Lỗi khi xóa tập tin" });
          }
        });
      });

      const product = await Product.findByIdAndDelete(productId);

      if (!product) {
        return next(new ErrorHandler("Không tìm thấy sản phẩm", 500));
      }

      res.status(201).json({
        success: true,
        message: "Sản phẩm đã được xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// get all products
router.get(
  "/get-all-products",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({ createdAt: -1 });

      res.status(201).json({
        success: true,
        products,
      });
    } catch (error) {
      return next(new ErrorHandler(error, 400));
    }
  })
);

// review a product
router.put(
  "/create-new-review-product",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { user, rating, comment, productId, createdAt, orderId } = req.body;

      const product = await Product.findById(productId);

      const review = {
        user,
        rating,
        comment,
        productId,
      };

      const isReviewed = product.reviews.find(
        (rev) => rev.user._id === req.user._id
      );

      if (isReviewed) {
        product.reviews.forEach((rev) => {
          if (rev.user._id === req.user._id) {
            (rev.rating = rating), (rev.comment = comment), (rev.user = user);
          }
        });
      } else {
        product.reviews.push(review);
      }

      let average = 0;

      product.reviews.forEach((rev) => {
        average += rev.rating;
      });

      product.ratings = average / product.reviews.length;

      await product.save({ validateBeforeSave: false });

      await Order.findByIdAndUpdate(
        orderId,
        {
          $set: {
            "cart.$[elem].isReviewed": true,
          },
        },
        { arrayFilters: [{ "elem._id": productId }], new: true }
      );

      res.status(201).json({
        success: true,
        message: "Đánh giá đã được thêm thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 400));
    }
  })
);

// all products for admin
router.get(
  "/admin-get-all-products",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const products = await Product.find().sort({
        createdAt: -1,
      });

      res.status(201).json({ success: true, products });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
