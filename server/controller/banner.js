// routes/banner.js
const express = require("express");
const router = express.Router();
const Banner = require("../model/banner");
const multer = require("multer");
const path = require("path");
const { isAdminAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const { upload } = require("../multer");

// Thêm banner mới
router.post(
  "/admin-add-banner",
  upload.single("image"),
  // isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "Không có hình ảnh được tải lên" });
      }

      const newBanner = new Banner({
        image: req.file.filename,
        title: req.body.title,
        subtitle: req.body.subtitle,
        link: req.body.link,
        order: req.body.order,
        isActive: req.body.isActive === "true", // Thêm xử lý cho isActive
      });

      // Log để kiểm tra
      console.log("New banner data:", newBanner);

      await newBanner.save();
      res.status(201).json(newBanner);
    } catch (error) {
      console.error("Lỗi khi thêm banner:", error);
      res.status(400).json({ message: error.message });
    }
  })
);

// Lấy danh sách banner
router.get(
  "/admin-get-all-banners",
  // isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res) => {
    try {
      const banners = await Banner.find().sort("order");
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// Lấy danh sách banner active cho homepage
router.get(
  "/active-banners-homepage",
  // isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res) => {
    try {
      const banners = await Banner.find({ isActive: true }).sort("order");
      res.json(banners);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

// Cập nhật banner
router.put(
  "/admin-update-banner/:id",
  upload.single("image"),
  // isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID banner không hợp lệ" });
      }

      const updateData = {
        title: req.body.title,
        subtitle: req.body.subtitle,
        link: req.body.link,
        order: req.body.order,
        isActive: req.body.isActive === true || req.body.isActive === "true",
      };
      if (req.file) {
        updateData.image = req.file.filename;
      }

      // console.log("Update data received:", updateData); // Log dữ liệu nhận được

      const updatedBanner = await Banner.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true, // Thêm option này để chạy các validator của schema
      });

      if (!updatedBanner) {
        return res.status(404).json({ message: "Không tìm thấy banner" });
      }

      // console.log("Updated banner:", updatedBanner); // Log banner sau khi cập nhật

      res.json(updatedBanner);
    } catch (error) {
      console.error("Error updating banner:", error);
      res.status(400).json({ message: error.message });
    }
  })
);

// Xóa banner
router.delete(
  "/admin-delete-banner/:id",
  // isAdminAuthenticated("Admin"),
  catchAsyncErrors(async (req, res) => {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json({ message: "ID banner không hợp lệ" });
      }

      const deletedBanner = await Banner.findByIdAndDelete(id);
      if (!deletedBanner) {
        return res.status(404).json({ message: "Không tìm thấy banner" });
      }
      res.json({ message: "Đã xóa banner thành công" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  })
);

module.exports = router;
