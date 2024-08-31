import axios from "axios";

const GHN_API_URL =
  "https://online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";
// const GHN_API_KEY = "0f0afafc-646a-11ef-8e53-0a00184fe694";
const GHN_API_KEY = "56053164-6387-11ef-baf0-9af951e8256f";

export const calculateGHNShippingFee = async (
  fromDistrictId,
  toDistrictId,
  weight
) => {
  try {
    const response = await axios.post(
      GHN_API_URL,
      {
        from_district_id: fromDistrictId,
        to_district_id: toDistrictId,
        weight: weight,
        service_type_id: 2, // Bạn có thể thay đổi loại dịch vụ tùy theo nhu cầu
      },
      {
        headers: {
          "Content-Type": "application/json",
          Token: GHN_API_KEY,
        },
      }
    );
    return response.data.data.total;
  } catch (error) {
    console.error("Error calculating GHN shipping fee:", error);
    return null;
  }
};
