import { useEffect, useState } from "react";
import axios from "axios";
import Footer from "../components/Layout/Footer";
import Header from "../components/Layout/Header";
import { server } from "../server";
import { Copy } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllSellersAdmin } from "../redux/actions/seller";
import moment from "moment-timezone";
import { NumericFormat } from "react-number-format";

const CouponsPage = () => {
  const [couponShops, setCouponShops] = useState({});
  const [couponAdmins, setCouponAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [copiedCode, setCopiedCode] = useState(null);
  const [shops, setShops] = useState({});
  const { sellers } = useSelector((state) => state.seller);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllSellersAdmin());
  }, [dispatch]);

  useEffect(() => {
    const fetchCouponsForSellers = async () => {
      if (!sellers || sellers.length === 0) return; // Đảm bảo sellers đã được tải

      setLoading(true);
      try {
        const response = await axios.get(`${server}/coupon/get-all-coupons`, {
          withCredentials: true,
        });
        const allCoupons = response.data.couponCodes;

        // Tạo một object với key là shopId và value là tên shop
        const shopMap = sellers.reduce((acc, seller) => {
          acc[seller._id] = seller.name;
          return acc;
        }, {});

        setShops(shopMap);

        // Nhóm các coupon theo shopId
        const groupedCoupons = allCoupons.reduce((acc, coupon) => {
          if (!acc[coupon.shopId]) {
            acc[coupon.shopId] = [];
          }
          acc[coupon.shopId].push(coupon);
          return acc;
        }, {});

        setCouponShops(groupedCoupons);
      } catch (error) {
        setError(
          "Không thể tải mã giảm giá của các shop. Vui lòng thử lại sau."
        );
        console.error("Error fetching coupons for sellers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCouponsForSellers();
  }, [sellers]);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `${server}/couponCodeAdmin/all-coupons-admin`
        );
        setCouponAdmins(response.data.coupons);
        setLoading(false);
      } catch (err) {
        setError("Không thể tải mã giảm giá. Vui lòng thử lại sau.");
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    });
  };

  if (loading)
    return <div className="text-center">Đang tải mã giảm giá...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div>
      <Header />
      <br />
      <div className="w-[1300px] bg-white rounded-lg border mx-auto p-4">
        <h2 className="text-2xl font-bold mb-4">Mã giảm giá có sẵn</h2>
        <div className="h-[2px] w-[100%] bg-gray-300 rounded" />
        <div className="grid grid-cols-2 gap-8 my-2">
          <div>
            <h3 className="text-xl font-semibold">Mã giảm giá toàn sàn</h3>
            <div className="space-y-4">
              {couponAdmins.map((couponAdmin) => (
                <div
                  key={couponAdmin._id}
                  className="border rounded-lg p-4 shadow-md relative my-3"
                >
                  <h3 className="text-lg text-[#27b3e2] font-semibold mb-2">
                    {couponAdmin.name}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    Mã: <span className="font-bold">{couponAdmin.code}</span>
                    <button
                      onClick={() => handleCopyCode(couponAdmin.code)}
                      className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                      title="Copy mã giảm giá"
                    >
                      <Copy size={16} />
                    </button>
                    {copiedCode === couponAdmin.code && (
                      <span className="text-green-500 text-sm ml-2">
                        Đã copy!
                      </span>
                    )}
                  </p>

                  <div className="flex items-center mb-1">
                    <p className="mr-1">Giảm:</p>
                    <p>
                      {couponAdmin.discountValue === "percentage" ? (
                        "%"
                      ) : (
                        <NumericFormat
                          value={couponAdmin.discountValue}
                          displayType={"text"}
                          thousandSeparator={"."}
                          decimalSeparator={","}
                          decimalScale={0}
                          renderText={(value) => <p>{value}</p>}
                        />
                      )}
                    </p>
                    <p>
                      {couponAdmin.discountValue === "percentage" ? "%" : "₫"}
                    </p>
                  </div>
                  <p className="mb-1">Số lượng: {couponAdmin.maxUses}</p>
                  <p className="text-sm text-gray-500">
                    Hết hạn:{" "}
                    {moment(couponAdmin.expiryDate)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD-MM-YYYY | HH:mm")}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Mã giảm giá của shop</h3>
            {Object.entries(couponShops).map(([shopId, coupons]) => (
              <div key={shopId}>
                <div className="">
                  {coupons.map((couponShop) => (
                    <div
                      key={couponShop._id}
                      className="border rounded-lg p-4 shadow-md relative my-3"
                    >
                      <div className="flex justify-between items-center mb-2">
                        <h3 className="text-xl text-[#27b3e2] font-semibold ">
                          {couponShop.name}
                        </h3>
                        <div className="flex items-center">
                          <p>Shop:</p>
                          <p className="text-lg  text-[#27b3e2] font-semibold ml-2">
                            {shops[shopId] || "Unknown"}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">
                        Mã: <span className="font-bold">{couponShop.code}</span>
                        <button
                          onClick={() => handleCopyCode(couponShop.code)}
                          className="ml-2 p-1 rounded-full hover:bg-gray-200 transition-colors duration-200"
                          title="Copy mã giảm giá"
                        >
                          <Copy size={16} />
                        </button>
                        {copiedCode === couponShop.code && (
                          <span className="text-green-500 text-sm ml-2">
                            Đã copy!
                          </span>
                        )}
                      </p>
                      <div className="flex items-center mb-1">
                        <p className="mr-1">Giảm:</p>
                        <p>
                          {couponShop.discountValue === "percentage" ? (
                            "%"
                          ) : (
                            <NumericFormat
                              value={couponShop.discountValue}
                              displayType={"text"}
                              thousandSeparator={"."}
                              decimalSeparator={","}
                              decimalScale={0}
                              renderText={(value) => <p>{value}</p>}
                            />
                          )}
                        </p>
                        <p>
                          {couponShop.discountType === "percentage" ? "%" : "₫"}
                        </p>
                      </div>
                      <p className="mb-1">
                        Số lượng: {couponShop.maxUses - couponShop.usedCount}
                      </p>
                      <p className="text-sm text-gray-500">
                        Hết hạn:{" "}
                        {moment(couponShop.expiryDate)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("DD-MM-YYYY | HH:mm")}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <br />
      <Footer />
    </div>
  );
};

export default CouponsPage;
