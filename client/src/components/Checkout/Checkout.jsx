/* eslint-disable no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { server } from "../../server";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CartSingle from "../Cart/CartSingle";
import { Button } from "../ui/button";
import {
  CardNumberElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import ShippingInfo from "./ShippingInfo";
import CartData from "./CartData";
import PaymentInfo from "./PaymentInfo";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { Store, Ticket } from "lucide-react";
import { Separator } from "../ui/separator";
import { Label } from "../ui/label";
import moment from "moment-timezone";

const Checkout = () => {
  const { user } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const [couponCodeData, setCouponCodeData] = useState(null);
  const [adminCouponData, setAdminCouponData] = useState(null);
  const [adminDiscountPrice, setAdminDiscountPrice] = useState(0);
  const [openShopCouponsDialog, setOpenShopCouponsDialog] = useState(false);
  const [openAdminCouponsDialog, setOpenAdminCouponsDialog] = useState(false);
  const [shopCoupons, setShopCoupons] = useState([]);
  const [adminCoupons, setAdminCoupons] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(
    user?.addresses[0] || null
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [orderData, setOrderData] = useState([]);
  const stripe = useStripe();
  const elements = useElements();
  const [selectedCoupons, setSelectedCoupons] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);

  useEffect(() => {
    const savedSelectedItems = JSON.parse(
      localStorage.getItem("selectedCartItems") || "{}"
    );
    const filteredProducts = cart
      .filter((item) => savedSelectedItems[item.cartItemId] === true)
      .map((item) => {
        if (item.hasClassifications) {
          const selectedClassificationId = item.cartItemId;
          const selectedClassification = item.classifications.find(
            (c) => c._id === selectedClassificationId
          );
          return { ...item, selectedClassification };
        }
        return item;
      });
    console.log("Filtered Products:", filteredProducts);
    console.log("Saved Selected Items:", savedSelectedItems);
    setSelectedProducts(filteredProducts);
  }, [cart]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const orderData = JSON.parse(localStorage.getItem("latestOrder"));
    setOrderData(orderData);
  }, []);

  useEffect(() => {
    if (cart.length > 0) {
      const shopIds = [...new Set(cart.map((item) => item.shopId))];
      shopIds.forEach((shopId) => fetchShopCoupons(shopId));
    }
  }, [cart]);

  const fetchShopCoupons = async (shopId) => {
    try {
      const res = await axios.get(
        `${server}/coupon/get-all-coupons/${shopId}`,
        {
          withCredentials: true,
        }
      );
      setShopCoupons((prev) => ({ ...prev, [shopId]: res.data.couponCodes }));
    } catch (error) {
      console.error("Error fetching shop coupons:", error);
      setShopCoupons((prev) => ({ ...prev, [shopId]: [] }));
    }
  };

  const handleCouponAction = (shopId) => {
    if (selectedCoupons[shopId]) {
      // Nếu đã có mã giảm giá, xoá nó
      setSelectedCoupons((prev) => {
        const newCoupons = { ...prev };
        delete newCoupons[shopId];
        return newCoupons;
      });
      toast.success("Đã xoá mã giảm giá");
    } else {
      // Nếu chưa có mã giảm giá, mở dialog để chọn
      setOpenShopCouponsDialog((prev) => ({
        ...prev,
        [shopId]: true,
      }));
    }
  };

  const handleApplyCoupon = (shopId, coupon) => {
    setSelectedCoupons((prev) => ({ ...prev, [shopId]: coupon }));
    setOpenShopCouponsDialog((prev) => ({ ...prev, [shopId]: false }));
    toast.success("Mã giảm giá áp dụng thành công");
  };

  // Calculate shipping based on the most expensive item per shop
  const calculateShopShipping = (items) => {
    const mostExpensiveItemPrice = Math.max(
      ...items.map((item) => parsePrice(item.discountPrice) * item.quantity)
    );
    return calculateShipping(mostExpensiveItemPrice);
  };

  const groupSelectedProducts = (cartItems) => {
    return cartItems.reduce((acc, product) => {
      const shopId = product.shopId;
      if (!acc[shopId]) {
        acc[shopId] = [];
      }
      if (product.hasClassifications && product.selectedClassification) {
        acc[shopId].push({
          ...product,
          price: product.selectedClassification.price,
          discountPrice: product.selectedClassification.discountPrice,
        });
      } else {
        acc[shopId].push(product);
      }
      return acc;
    }, {});
  };

  const groupedSelectedProducts = groupSelectedProducts(selectedProducts);

  const fetchAdminCoupons = async () => {
    try {
      const res = await axios.get(
        `${server}/couponCodeAdmin/all-coupons-admin`
      );
      setAdminCoupons(res.data.coupons);
    } catch (error) {
      console.error("Error fetching admin coupons:", error);
      toast.error("Không thể tải mã giảm giá của admin. Vui lòng thử lại.");
    }
  };

  const handleChangeAddress = () => {
    setOpen(true);
  };

  const parsePrice = (price) => parseFloat(price);

  const calculateShipping = (price) => {
    if (price >= 30000000) return 0;
    if (price >= 10000000) return 100000;
    if (price >= 3000000) return 50000;
    return 30000;
  };

  const calculateProductDiscount = (item, coupon) => {
    const itemPrice = parsePrice(
      item.hasClassifications && item.selectedClassification
        ? item.selectedClassification.discountPrice
        : item.discountPrice
    );
    if (coupon) {
      if (coupon.discountType === "percentage") {
        return (item.quantity * itemPrice * coupon.discountValue) / 100;
      } else if (coupon.discountType === "fixed") {
        return Math.min(coupon.discountValue, item.quantity * itemPrice);
      }
    }
    return 0;
  };

  const calculateShopTotalDiscount = () => {
    return Object.entries(groupedSelectedProducts).reduce(
      (acc, [shopId, items]) => {
        const coupon = selectedCoupons[shopId];
        const shopDiscount = items.reduce(
          (sum, item) => sum + calculateProductDiscount(item, coupon),
          0
        );
        return acc + shopDiscount;
      },
      0
    );
  };

  const subTotalPrice = selectedProducts.reduce(
    (acc, item) =>
      acc +
      parsePrice(
        item.selectedClassification
          ? item.selectedClassification.discountPrice
          : item.discountPrice
      ) *
        item.quantity,
    0
  );

  const shopTotalDiscountPrice = calculateShopTotalDiscount();

  const totalDiscountPrice = shopTotalDiscountPrice + adminDiscountPrice;
  // Calculate total shipping for all shops
  const totalShipping = Object.entries(groupedSelectedProducts).reduce(
    (acc, [shopId, items]) => {
      return acc + calculateShopShipping(items);
    },
    0
  );

  // Helper function to calculate total for each shop
  const calculateShopTotal = (items, shopId) => {
    const total = items.reduce((acc, item) => {
      const itemPrice = parsePrice(
        item.hasClassifications && item.selectedClassification
          ? item.selectedClassification.discountPrice
          : item.discountPrice
      );
      const itemDiscount = calculateProductDiscount(
        item,
        selectedCoupons[shopId]
      );
      return acc + item.quantity * itemPrice - itemDiscount;
    }, 0);

    const shipping = calculateShopShipping(items);
    return total + shipping;
  };

  // Calculate the total price for all items in the cart
  const totalPrice = selectedProducts.reduce((acc, item) => {
    const itemPrice = parsePrice(
      item.hasClassifications && item.selectedClassification
        ? item.selectedClassification.discountPrice
        : item.discountPrice
    );
    const itemDiscount = calculateProductDiscount(
      item,
      selectedCoupons[item.shopId]
    );
    return acc + item.quantity * itemPrice - itemDiscount;
  }, 0);

  // Calculate the final total price
  const finalTotalPrice = totalPrice + totalShipping - adminDiscountPrice;

  const updateCouponUsageSeller = async (code) => {
    try {
      await axios.put(`${server}/coupon/update-coupon-usage-seller/${code}`);
    } catch (error) {
      console.error("Error updating coupon usage for seller:", error);
      toast.error("Không thể cập nhật mã giảm giá. Vui lòng thử lại.");
    }
  };

  const applyAdminCoupon = (couponAdmin) => {
    if (!couponAdmin) {
      setAdminDiscountPrice(0);
      setAdminCouponData(null);
      setOpenAdminCouponsDialog(false);
      toast.success("Đã xoá mã giảm giá");
      return;
    }

    if (new Date(couponAdmin.expiryDate) < new Date()) {
      toast.error("Mã giảm giá đã hết hạn");
      return;
    }

    if (couponAdmin.maxUses === 0) {
      toast.error("Mã giảm giá đã hết lượt sử dụng");
      return;
    }

    let discount = 0;
    if (couponAdmin.discountType === "percentage") {
      discount = Math.round((totalPrice * couponAdmin.discountValue) / 100);
    } else if (couponAdmin.discountType === "fixed") {
      discount = Math.min(couponAdmin.discountValue, totalPrice);
    }

    setAdminDiscountPrice(discount);
    setAdminCouponData(couponAdmin);
    setOpenAdminCouponsDialog(false);
    toast.success("Mã giảm giá áp dụng thành công");
  };

  const updateCouponUsageAdmin = async (code) => {
    try {
      await axios.put(`${server}/couponCodeAdmin/update-coupon-usage/${code}`);
    } catch (error) {
      console.error("Error updating coupon usage:", error);
    }
  };

  const updateCouponUsage = async () => {
    if (adminCouponData) {
      await updateCouponUsageAdmin(adminCouponData.code);
    }
    if (couponCodeData) {
      await updateCouponUsageSeller(couponCodeData.code);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            description: "DATN",
            amount: {
              currency_code: "USD",
              value: orderData?.totalPrice,
            },
          },
        ],
        application_context: {
          shipping_preference: "NO_SHIPPING",
        },
      })
      .then((orderId) => {
        return orderId;
      });
  };

  const onApprove = async (data, actions) => {
    return actions.order.capture().then(function (details) {
      const { payer } = details;

      let paymentInfo = payer;

      if (paymentInfo !== undefined) {
        paypalPaymentHandler(paymentInfo);
      }
    });
  };

  const paymentData = {
    amount: Math.round(orderData?.totalPrice * 100),
  };

  const removeSelectedItemsFromCart = () => {
    const currentCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const selectedItems = JSON.parse(
      localStorage.getItem("selectedCartItems") || "{}"
    );

    const updatedCart = currentCart.filter(
      (item) => !selectedItems[item.cartItemId]
    );

    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };

  const createOrders = async (paymentInfo) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const shopOrders = Object.entries(groupedSelectedProducts).map(
      ([shopId, items]) => {
        const shopTotal = calculateShopTotal(items);
        return {
          shopId,
          items,
          totalPrice: shopTotal,
          shippingAddress: selectedAddress,
          paymentInfo,
        };
      }
    );

    try {
      const orderData = {
        orders: shopOrders,
        user,
      };

      const response = await axios.post(
        `${server}/order/create-orders`,
        orderData,
        config
      );

      if (response.data.success) {
        setOpen(false);
        toast.success("Đơn hàng đã đặt thành công");
        // Remove only the selected items from localStorage
        removeSelectedItemsFromCart();
        localStorage.removeItem("selectedCartItems");
        navigate("/order/success", {
          replace: true,
        });
      } else {
        toast.error("Có lỗi xảy ra khi đặt hàng");
      }
    } catch (error) {
      console.error("Error creating orders:", error);
      toast.error("Có lỗi xảy ra khi đặt hàng");
    }
  };

  const paypalPaymentHandler = async (paymentInfo) => {
    await updateCouponUsage();
    await createOrders({
      id: paymentInfo.payer_id,
      status: "succeeded",
      type: "Paypal",
    });
  };

  const paymentHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${server}/payment/process`,
        paymentData,
        config
      );

      const client_secret = data.client_secret;

      if (!stripe || !elements) return;

      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        toast.error(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          await updateCouponUsage();
          await createOrders({
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            type: "Credit Card",
          });
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const cashOnDeliveryHandler = async (e) => {
    e.preventDefault();
    await updateCouponUsage();
    await createOrders({
      type: "Thanh toán khi nhận hàng",
    });
  };

  return (
    <div className="w-[1300px] mx-auto py-8">
      <div>
        {/* Shipping Info */}
        <div className="w-full">
          <ShippingInfo
            user={user}
            selectedAddress={selectedAddress}
            handleChangeAddress={handleChangeAddress}
          />
        </div>

        <div className="flex items-center justify-between p-4 border-x border-t rounded-t-lg bg-white mt-4">
          <p className="w-[40%] text-[18px] font-[500]">Sản Phẩm</p>
          <p className="w-[10%] flex items-center justify-center pl-[5px]">
            Đơn Giá
          </p>
          <p className="w-[10%] flex items-center justify-center ml-2">
            Số Lượng
          </p>
          <p className="w-[10%] flex items-center justify-center">Thành Tiền</p>
        </div>

        {/* Cart and coupon */}
        {Object.entries(groupedSelectedProducts).map(([shopId, items]) => (
          <div key={shopId} className="bg-white border rounded-lg mb-4">
            <div className="flex items-center text-[16px] font-[400] px-6 py-4 bg-white ">
              <Store size={18} className="mr-2 text-gray-700" />
              <p className="text-gray-800">{items[0]?.shop?.name}</p>
            </div>
            {items.map((item, index) => (
              <CartSingle
                key={index}
                data={item}
                quantityChangeHandler={(updatedCartData) => {
                  dispatch(addToCart(updatedCartData));
                }}
                removeFromCartHandler={(item) => {
                  dispatch(removeFromCart(item));
                }}
                selected={{}}
                onSelect={() => {}}
                updateSelectedItems={() => {}}
                hideCheckbox={true}
                hideQuantityControls={true}
                hideOriginalPrice={true}
                noBorder={true}
              />
            ))}
            <div className="flex items-center justify-end">
              <div className="w-[20%] p-4">
                {selectedCoupons[shopId] && (
                  <div className="flex items-center justify-between">
                    <p>Giảm giá</p>
                    <span>
                      {items
                        .reduce(
                          (sum, item) =>
                            sum +
                            calculateProductDiscount(
                              item,
                              selectedCoupons[shopId]
                            ),
                          0
                        )
                        .toLocaleString()}
                      <sup>₫</sup>
                    </span>
                  </div>
                )}
                <div className="flex items-center justify-between pt-4">
                  <p>Phí ship</p>
                  <span>
                    {calculateShopShipping(items).toLocaleString()}
                    <sup>₫</sup>
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4">
                  <p className="mr-2">Tổng cộng</p>
                  <span className="text-green-600 font-bold ">
                    {calculateShopTotal(items, shopId).toLocaleString()}
                    <sup>₫</sup>
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end">
              <div className="w-[40%] flex items-center justify-between p-4">
                <div className="flex items-center">
                  <p className="mr-2">Mã giảm giá của shop:</p>
                  <span className="text-green-600 font-bold">
                    {selectedCoupons[shopId]?.code || "-"}
                  </span>
                </div>
                <Button
                  onClick={() => handleCouponAction(shopId)}
                  variant={selectedCoupons[shopId] ? "destructive" : ""}
                >
                  {selectedCoupons[shopId]
                    ? "Xoá mã giảm giá"
                    : "Chọn mã giảm giá"}
                </Button>
              </div>
            </div>

            <Dialog
              open={openShopCouponsDialog[shopId] || false}
              onOpenChange={(isOpen) =>
                setOpenShopCouponsDialog((prev) => ({
                  ...prev,
                  [shopId]: isOpen,
                }))
              }
            >
              <DialogTrigger asChild>
                <button style={{ display: "none" }}>Open</button>
              </DialogTrigger>
              <DialogContent className="max-w-[60%]">
                <DialogHeader>
                  <DialogTitle>Mã giảm giá của shop</DialogTitle>
                </DialogHeader>
                <div>
                  {shopCoupons[shopId] && shopCoupons[shopId].length > 0 ? (
                    shopCoupons[shopId].map((coupon) => (
                      <div
                        key={coupon._id}
                        className="border rounded-lg p-4 shadow-md my-2"
                      >
                        <p className="text-[#27b3e2] mb-2">
                          <span className="font-bold">{coupon.code}</span>
                        </p>
                        <p className="mb-1">
                          Giảm: {coupon.discountValue}
                          {coupon.discountType === "percentage" ? "%" : " ₫"}
                        </p>
                        <p className="mb-1">
                          Số lượng: {coupon.maxUses - coupon.usedCount}
                        </p>
                        <p className="text-sm text-gray-500">
                          Hết hạn:{" "}
                          {moment(coupon.expiryDate)
                            .tz("Asia/Ho_Chi_Minh")
                            .format("DD-MM-YYYY | HH:mm")}
                        </p>
                        <Button
                          className="mt-2"
                          onClick={() => handleApplyCoupon(shopId, coupon)}
                        >
                          Chọn mã giảm giá
                        </Button>
                      </div>
                    ))
                  ) : (
                    <p>Không có mã giảm giá cho shop này.</p>
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>
        ))}

        {/* Admin coupon */}
        <div className="bg-white border rounded-lg p-4 flex items-center justify-between ">
          <div className="flex items-center mx-4">
            <Ticket size={25} color="red" />
            <p className="mx-2">Mã giảm giá eCommUnity</p>
          </div>
          <div className="flex items-center justify-between w-[25%]">
            {adminCouponData ? (
              <span className="text-green-600 font-bold">
                {adminCouponData.code}
              </span>
            ) : (
              <p className="text-green-600 font-bold">-</p>
            )}
            <Button
              onClick={() => {
                if (adminCouponData) {
                  // Nếu đã có mã giảm giá, xoá nó
                  setAdminCouponData(null);
                  setAdminDiscountPrice(0);
                  toast.success("Đã xoá mã giảm giá");
                } else {
                  // Nếu chưa có mã giảm giá, mở dialog để chọn
                  setOpenAdminCouponsDialog(true);
                  fetchAdminCoupons();
                }
              }}
              variant={adminCouponData ? "destructive" : ""}
            >
              {adminCouponData ? "Xoá mã giảm giá" : "Chọn mã giảm giá"}
            </Button>
          </div>
        </div>

        {/* Cart Data */}
        <div className="mt-4">
          <CartData
            finalTotalPrice={finalTotalPrice}
            shipping={totalShipping}
            subTotalPrice={subTotalPrice}
            totalDiscountPrice={totalDiscountPrice}
          />
        </div>
      </div>

      {/* Payment */}
      <div className="flex flex-col items-center mt-4">
        <div className="w-full">
          <div className="">
            <PaymentInfo
              user={user}
              open={open}
              setOpen={setOpen}
              onApprove={onApprove}
              createOrder={createOrder}
              paymentHandler={paymentHandler}
              cashOnDeliveryHandler={cashOnDeliveryHandler}
            />
          </div>
        </div>
      </div>
      {/* Admin coupon */}
      <Dialog
        open={openAdminCouponsDialog}
        onOpenChange={setOpenAdminCouponsDialog}
      >
        <DialogTrigger asChild>
          <button style={{ display: "none" }}>Open</button>
        </DialogTrigger>
        <DialogContent className="max-w-[60%]">
          <DialogHeader>
            <DialogTitle>Mã giảm giá eCommUnity</DialogTitle>
          </DialogHeader>
          <div>
            {adminCoupons.length > 0 ? (
              adminCoupons.map((adminCoupon) => (
                <div
                  key={adminCoupon._id}
                  className="border rounded-lg p-4 shadow-md my-2"
                >
                  <p className="text-[#27b3e2] mb-2">
                    <span className="font-bold">{adminCoupon.code}</span>
                  </p>
                  <p className="mb-1">
                    Giảm: {adminCoupon.discountValue}
                    {adminCoupon.discountType === "percentage" ? "%" : " ₫"}
                  </p>
                  <p className="mb-1">
                    Số lượng:
                    {adminCoupon.maxUses - adminCoupon.usedCount}
                  </p>
                  <p className="text-sm text-gray-500">
                    Hết hạn:{" "}
                    {moment(adminCoupon.expiryDate)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD-MM-YYYY | HH:mm")}
                  </p>
                  <Button
                    className="mt-2"
                    onClick={() => applyAdminCoupon(adminCoupon)}
                  >
                    Chọn mã giảm giá
                  </Button>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500 py-4">
                Hiện tại chưa có mã giảm giá nào
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Change address  */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button style={{ display: "none" }}>Open</button>
        </DialogTrigger>
        <DialogContent className="max-w-[40%]">
          <DialogHeader>
            <DialogTitle>Thay đổi địa chỉ</DialogTitle>
          </DialogHeader>
          {user &&
            user.addresses.map((item, index) => (
              <div
                className=" bg-white h-full border rounded-lg shadow my-2 px-5 py-5 flex items-center justify-between cursor-pointer"
                key={index}
                onClick={() => {
                  setSelectedAddress(item);
                  setOpen(false);
                }}
              >
                <div>
                  <div className="flex items-end mb-1">
                    <p className="text-[16px] font-[500]">
                      {item.fullname ? item.fullname : user.name}
                    </p>
                    <Separator
                      orientation="vertical"
                      className="w-[1px] h-[20px]  mx-2 bg-[gray]"
                    />
                    <p className="text-[14px] text-[gray]">
                      0{item.phoneNumber}
                    </p>
                  </div>
                  <div className="text-[gray] text-[14px] mb-2">
                    <p>{item.address1}</p>
                    <p>
                      {item.ward}, {item.district}, {item.province}
                    </p>
                  </div>
                  <div>
                    <Label className="border px-2 py-1 border-[#27b3e2] text-[#27b3e2]">
                      {item.addressType}
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          <Link
            to="/profile/addresses"
            className="w-full flex items-center justify-end mt-2"
          >
            <Button
              onClick={() => {
                handleChangeAddress();
                setOpen(false);
              }}
            >
              Thay đổi địa chỉ
            </Button>
          </Link>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Checkout;
