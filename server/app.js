const express = require("express");
const ErrorHandler = require("./middleware/error");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "server/config/.env" });
}

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use("/", express.static(path.join(__dirname, "./uploads")));

app.use(
  cors({
    origin: "https://datnclient-huynhat2691s-projects.vercel.app",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use("/test", (req, res) => {
  res.send("Hello world!");
});
// app.use(express.static("uploads"));

// import routes
const user = require("./controller/user");
app.use("/api/v2/user", user);
const shop = require("./controller/shop");
app.use("/api/v2/shop", shop);
const product = require("./controller/product");
app.use("/api/v2/product", product);
const event = require("./controller/event");
app.use("/api/v2/event", event);
const coupon = require("./controller/couponCode");
app.use("/api/v2/coupon", coupon);
const payment = require("./controller/payment");
app.use("/api/v2/payment", payment);
const order = require("./controller/order");
app.use("/api/v2/order", order);
const conversation = require("./controller/conversation");
app.use("/api/v2/conversation", conversation);
const message = require("./controller/message");
app.use("/api/v2/message", message);
const withdraw = require("./controller/withdraw");
app.use("/api/v2/withdraw", withdraw);
const banner = require("./controller/banner");
app.use("/api/v2/banner", banner);
const couponCodeAdmin = require("./controller/couponCodeAdmin");
app.use("/api/v2/couponCodeAdmin", couponCodeAdmin);
const shippingFee = require("./controller/shippingFee");
app.use("/api/v2/shippingFee", shippingFee);
const cart = require("./controller/cart");
app.use("/api/v2/cart", cart);

// for ErrorHandling
app.use(ErrorHandler);

module.exports = app;
