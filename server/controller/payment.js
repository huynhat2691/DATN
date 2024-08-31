const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const catchAsyncErrors = require("../middleware/catchAsyncErrors");

router.post(
  "/process",
  catchAsyncErrors(async (req, res, next) => {
    const myPayment = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "vnd",
      metadata: {
        // integration_check: "accept_a_payment",
        company: "BNH2691",
      },
    });

    res.status(200).json({
      // amount: req.body.amount,
      success: true,
      client_secret: myPayment.client_secret,
    });
  })
);

router.get(
  "/stripe-api-key",
  catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
      stripeApiKey: process.env.STRIPE_PUBLISHABLE_KEY,
    });
  })
);

module.exports = router;
