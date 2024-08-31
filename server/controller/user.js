const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const User = require("../model/user");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated, isAdminAuthenticated } = require("../middleware/auth");

const nodemailerTemplate = require("../utils/nodemailerTemplate");

router.post("/create-user", async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const userEmail = await User.findOne({ email });

    if (userEmail) {
      return next(new ErrorHandler("Người dùng đã tồn tại", 400));
    }

    const user = {
      name: name,
      email: email,
      password: password,
    };

    const activationToken = createActivationToken(user);

    const activationUrl = `https://datnclient-huynhat2691s-projects.vercel.app/activation/${activationToken}`;

    try {
      await sendMail({
        email: user.email,
        subject: "Kích hoạt tài khoản eCommUnity",
        html: nodemailerTemplate(user.name, activationUrl),
      });

      res.status(201).json({
        success: true,
        message: `Tài khoản đã được tạo thành công. Vui lòng kiểm tra email của bạn:- ${user.email} để kích hoạt tài khoản`,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  } catch (err) {
    return next(new ErrorHandler(err.message, 400));
  }
});

// create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_TOKEN_SECRET, {
    expiresIn: "5m",
  });
};

// activate user
router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_TOKEN_SECRET
      );

      if (!newUser) {
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password } = newUser;

      let user = await User.findOne({ email });

      if (user) {
        return next(new ErrorHandler("Người dùng đã tồn tại", 400));
      }

      user = await User.create({
        name,
        email,
        password,
      });

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// login user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Vui lòng nhập email và mật khẩu", 400));
      }

      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 400));
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 401));
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// load user
router.get(
  "/getUser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      if (!user) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 400));
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// logout user
router.get(
  "/logout",
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
        sameSite: 'None',
        secure: true, 
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

// update user information
router.put(
  "/update-user-info",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password, phoneNumber, name } = req.body;
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 400));
      }

      const isPasswordMatched = await user.comparePassword(password);

      if (!isPasswordMatched) {
        return next(new ErrorHandler("Email hoặc mật khẩu không hợp lệ", 401));
      }

      user.name = name;
      user.email = email;
      user.phoneNumber = phoneNumber;

      await user.save();

      res.status(201).json({
        success: true,
        message: "Cập nhật thông tin thành công",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user avatar
router.put(
  "/update-user-avatar",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { image } = req.body; // Expect base64 string

      if (!image) {
        return next(new ErrorHandler("Không tìm thấy ảnh", 400));
      }

      const user = await User.findByIdAndUpdate(
        req.user._id,
        { avatar: image },
        { new: true, runValidators: true }
      );

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      console.error("Error in update avatar:", error);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

router.put(
  "/update-user-addresses",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);

      const { _id, addressType, ...addressData } = req.body;

      if (_id) {
        // Updating existing address
        const existingAddressIndex = user.addresses.findIndex(
          (address) => address._id.toString() === _id
        );

        if (existingAddressIndex === -1) {
          return next(new ErrorHandler("Không tìm thấy địa chỉ", 404));
        }

        // Check if the address type is being changed and if it already exists
        if (addressType !== user.addresses[existingAddressIndex].addressType) {
          const sameTypeAddress = user.addresses.find(
            (address) =>
              address.addressType === addressType &&
              address._id.toString() !== _id
          );

          if (sameTypeAddress) {
            return next(new ErrorHandler("Loại địa chỉ đã tồn tại", 400));
          }
        }

        // Update the existing address
        user.addresses[existingAddressIndex] = {
          ...user.addresses[existingAddressIndex],
          ...addressData,
          addressType,
        };
      } else {
        // Adding new address
        const sameTypeAddress = user.addresses.find(
          (address) => address.addressType === addressType
        );

        if (sameTypeAddress) {
          return next(new ErrorHandler("Loại địa chỉ đã tồn tại", 400));
        }

        // Add new address to the array
        user.addresses.push({ ...addressData, addressType });
      }

      await user.save();

      res.status(200).json({
        success: true,
        message: _id
          ? "Địa chỉ đã được cập nhật thành công"
          : "Địa chỉ đã được thêm thành công",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user address
router.delete(
  "/delete-user-address/:id",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const userId = req.user._id;
      const addressId = req.params.id;

      await User.updateOne(
        {
          _id: userId,
        },
        {
          $pull: {
            addresses: {
              _id: addressId,
            },
          },
        }
      );

      const user = await User.findById(userId);

      res.status(200).json({
        success: true,
        message: "Địa chỉ đã được xóa thành công",
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// update user password
router.put(
  "/update-user-password",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id).select("+password");

      const isPasswordMatched = await user.comparePassword(req.body.password);

      if (!isPasswordMatched) {
        return next(
          new ErrorHandler("Mật khẩu không đúng, vui lòng thử lại", 400)
        );
      }

      if (req.body.newPassword !== req.body.confirmPassword) {
        return next(
          new ErrorHandler("Mật khẩu không khớp, vui lòng thử lại", 400)
        );
      }

      user.password = req.body.newPassword;

      await user.save();

      res.status(201).json({
        success: true,
        message: "Mật khẩu đã được cập nhật thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// find user information with the userId
router.get(
  "/user-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      res.status(201).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// all users for admin
router.get(
  "/admin-get-all-users",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const users = await User.find().sort({
        createdAt: -1,
      });

      res.status(201).json({ success: true, users });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// delete user for admin
router.delete(
  "/delete-user/:id",
  isAuthenticated,
  isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.params.id);

      if (!user) {
        return next(new ErrorHandler("Không tìm thấy người dùng", 404));
      }

      await User.findByIdAndDelete(req.params.id);

      res.status(201).json({
        success: true,
        message: "Người dùng đã được xóa thành công",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
