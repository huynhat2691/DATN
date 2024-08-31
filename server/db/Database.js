// const mongoose = require("mongoose");

// const connectDB = async () => {
//   mongoose.connect(process.env.DB_URL).then((data) => {
//     console.log("MongoDB connected!");
//   });
// };

// module.exports = connectDB;

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL);
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1); // Thoát khỏi process với mã lỗi 1
  }
};

module.exports = connectDB;
