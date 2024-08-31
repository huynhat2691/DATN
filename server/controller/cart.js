const express = require("express");
const router = express.Router();
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Cart = require("../model/cart");
const { isAuthenticated } = require("../middleware/auth");

// Sync cart
router.post(
  "/sync-cart",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { items } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    cart.items = items;
    await cart.save();

    res.status(200).json({
      success: true,
      cart: cart.items,
    });
  })
);

// Get cart
router.get(
  "/get-cart",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const userId = req.user.id;

    const cart = await Cart.findOne({ user: userId }).populate("items.product");

    if (!cart) {
      return next(new ErrorHandler("Không tìm thấy giỏ hàng", 404));
    }

    res.status(200).json({
      success: true,
      cart: cart.items,
    });
  })
);

// Add item to cart
router.post(
  "/add-to-cart",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { productId, quantity, selectedClassification } = req.body;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
      existingItem.selectedClassification = selectedClassification;
    } else {
      cart.items.push({ product: productId, quantity, selectedClassification });
    }

    await cart.save();

    res.status(200).json({
      success: true,
      cart: cart.items,
    });
  })
);

// Remove item from cart
router.delete(
  "/remove-cart/:productId",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    const { productId } = req.params;
    const userId = req.user.id;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return next(new ErrorHandler("Không tìm thấy giỏ hàng", 404));
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      success: true,
      cart: cart.items,
    });
  })
);

module.exports = router;
