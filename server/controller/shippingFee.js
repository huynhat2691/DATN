const express = require("express");
const router = express.Router();
const Shop = require("../model/shop");
const Shipping = require("../model/shippingFee");
const axios = require("axios");

// Hàm helper để parse giá
function parsePrice(price) {
  return typeof price === 'string' ? parseFloat(price.replace(/[^0-9.-]+/g, "")) : price;
}

router.post("/calculate-shipping", async (req, res) => {
  try {
    const { sellerId, toDistrict, toWard, items } = req.body;

    // Validation
    if (!sellerId || !toDistrict || !toWard || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: "Thiếu thông tin cần thiết hoặc định dạng không hợp lệ" });
    }

    // Lấy thông tin người bán từ database
    const seller = await Shop.findById(sellerId);
    if (!seller) {
      return res.status(404).json({ error: "Không tìm thấy người bán" });
    }

    // Chuẩn bị payload cho API GHN
    const shippingData = {
      from_district_id: seller.districtId, // Giả sử shop model có trường districtId
      service_id: 53320,
      to_district_id: toDistrict,
      to_ward_code: toWard,
      weight: items.reduce((sum, item) => sum + (item.weight || 0), 0),
      length: Math.max(...items.map(item => item.length || 0), 1),
      width: Math.max(...items.map(item => item.width || 0), 1),
      height: Math.max(...items.map(item => item.height || 0), 1),
      insurance_value: items.reduce((sum, item) => sum + parsePrice(item.discountPrice) * item.quantity, 0),
    };

    const response = await axios.post(
      "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      shippingData,
      {
        headers: {
          "Content-Type": "application/json",
          Token: process.env.GHN_API_KEY,
        },
      }
    );

    if (!response.data || !response.data.data || !response.data.data.total) {
      throw new Error("Không nhận được phí vận chuyển hợp lệ từ API");
    }

    // Lưu kết quả vào database
    const newShipping = new Shipping({
      sellerId: seller._id,
      buyerId: req.user?._id, // Sử dụng optional chaining
      shippingFee: response.data.data.total,
      fromDistrict: seller.district,
      toDistrict: toDistrict,
      weight: shippingData.weight,
      status: "calculated",
    });
    await newShipping.save();

    res.json({
      shippingFee: response.data.data.total,
      shippingId: newShipping._id,
    });
  } catch (error) {
    console.error("Lỗi khi tính phí vận chuyển:", error);
    console.error("Lỗi response:", error.response?.data);
    res.status(error.response?.status || 500).json({ 
      error: "Lỗi khi tính phí vận chuyển", 
      details: error.message 
    });
  }
});

module.exports = router;