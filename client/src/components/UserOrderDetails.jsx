import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getAllOrdersOfUser } from "../redux/actions/order";
import { backend_url, server } from "../server";
import { Star, ShoppingBag } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Textarea } from "../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "../components/ui/dialog";
import { NumericFormat } from "react-number-format";
import moment from "moment-timezone";

const UserOrderDetails = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [comment, setComment] = useState("");
  const [selectedItem, setSelectedItem] = useState(null);
  const [rating, setRating] = useState(1);
  const [isRefundDialogOpen, setIsRefundDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  const reviewHandler = async () => {
    await axios
      .put(
        `${server}/product/create-new-review-product`,
        {
          user,
          rating,
          comment,
          productId: selectedItem?._id,
          orderId: id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
        setComment("");
        setRating(null);
        setOpen(false);
      })
      .catch((err) => {
        toast.error(err);
      });
  };

  const checkOrCreateConversation = async (userId, sellerId) => {
    try {
      const response = await axios.get(
        `${server}/conversation/check-conversation`,
        {
          params: { userId, sellerId },
          withCredentials: true,
        }
      );

      if (response.data.exists) {
        return response.data.conversation._id;
      } else {
        const newConversation = await axios.post(
          `${server}/conversation/create-new-conversation`,
          { userId, sellerId },
          { withCredentials: true }
        );
        return newConversation.data.conversation._id;
      }
    } catch (error) {
      console.error("Error checking/creating conversation:", error);
      toast.error("Lỗi khi tạo cuộc trò chuyện");
    }
  };

  const handleMessageSubmit = async () => {
    try {
      const conversationId = await checkOrCreateConversation(
        user._id,
        data.cart[0].shop._id
      );
      if (conversationId) {
        navigate(`/profile/inbox?conversationId=${conversationId}`);
      } else {
        toast.error("Không thể tạo hoặc tìm thấy cuộc trò chuyện");
      }
    } catch (error) {
      console.error("Error handling message submit:", error);
      toast.error("Lỗi khi gửi tin nhắn");
    }
  };

  const refundHandler = async () => {
    await axios
      .put(`${server}/order/refund-order/${id}`, {
        status: "Processing Refund",
      })
      .then((res) => {
        toast.success(res.data.message);
        dispatch(getAllOrdersOfUser(user._id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const cancelOrderHandler = async () => {
    try {
      const res = await axios.put(
        `${server}/order/cancel-order/${id}`,
        {},
        {
          withCredentials: true,
        }
      );
      toast.success(res.data.message);
      dispatch(getAllOrdersOfUser(user._id));
    } catch (err) {
      toast.error(
        err.response?.data?.message || "Có lỗi xảy ra khi huỷ đơn hàng"
      );
    }
  };

  const openRefundDialog = () => {
    setIsRefundDialogOpen(true);
  };

  const closeRefundDialog = () => {
    setIsRefundDialogOpen(false);
  };

  const confirmRefund = async () => {
    await refundHandler();
    closeRefundDialog();
  };

  const openCancelDialog = () => {
    setIsCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setIsCancelDialogOpen(false);
  };

  const confirmCancel = async () => {
    await cancelOrderHandler();
    closeCancelDialog();
  };

  const getStatusInVietnamese = (status) => {
    const statusMap = {
      Processing: "Đang xử lý",
      "Transferred to delivery partner": "Đã chuyển cho đối tác vận chuyển",
      Shipping: "Đang giao hàng",
      "On the way": "Đang trên đường giao đến bạn",
      Delivered: "Đã giao hàng",
      Cancelled: "Đã hủy",
      "Processing Refund": "Đang xử lý hoàn tiền",
      "Refund Success": "Hoàn tiền thành công",
    };
    return statusMap[status] || status;
  };

  return (
    <div className="w-[1300px] mx-auto py-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center">
              <ShoppingBag className="mr-2" />
              Chi tiết đơn hàng
            </div>
            <Link to="/profile/orders">
              <Button variant="outline">Danh sách đơn hàng</Button>
            </Link>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <p className="text-sm text-muted-foreground">
              Mã đơn hàng:{" "}
              <span className="font-medium">#{data?._id?.slice(0, 8)}</span>
            </p>
            <p className="text-sm text-muted-foreground">
              Ngày đặt hàng:{" "}
              <span className="font-medium">
                {moment(data?.createdAt)
                  .tz("Asia/Ho_Chi_Minh")
                  .format("DD-MM-YYYY | HH:mm")}
              </span>
            </p>
          </div>

          {data &&
            data?.cart.map((item, index) => (
              <div key={index} className="flex items-start mb-5 border-b pb-4">
                <img
                  src={`${backend_url}/${item.images[0]}`}
                  alt=""
                  className="w-20 h-20 object-cover mr-4"
                />
                <div className="flex-grow">
                  <h5 className="text-lg font-medium">{item.name}</h5>
                  <div className="text-sm text-muted-foreground flex items-center">
                    <NumericFormat
                      value={
                        item.hasClassifications
                          ? item.selectedClassification.discountPrice
                          : item.discountPrice
                      }
                      displayType={"text"}
                      thousandSeparator={"."}
                      decimalSeparator={","}
                      decimalScale={0}
                      renderText={(value) => (
                        <p>
                          {value}
                          <sup>₫</sup>
                        </p>
                      )}
                    />
                    <p className="mx-1">x</p>
                    {item.quantity}
                  </div>
                  {item.hasClassifications && (
                    <p className="text-sm text-muted-foreground">
                      {item.selectedClassification.group1} -{" "}
                      {item.selectedClassification.group2}
                    </p>
                  )}
                </div>
                {!item.isReviewed && data?.status === "Delivered" && (
                  <Button
                    onClick={() => setOpen(true) || setSelectedItem(item)}
                  >
                    Viết đánh giá
                  </Button>
                )}
              </div>
            ))}

          <div className="text-right mt-4">
            <p className="text-lg font-medium">
              Tổng cộng: {data?.totalPrice}
              <sup>₫</sup>
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-2">Địa chỉ giao hàng:</h4>
              <p>{data?.shippingAddress?.fullname}</p>
              <p>{data?.shippingAddress?.address1}</p>
              <p>
                {data?.shippingAddress?.ward}, {data?.shippingAddress?.district}
                , {data?.shippingAddress?.province}
              </p>
              <p>{data?.user?.phoneNumber}</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-2">
                Thông tin thanh toán:
              </h4>
              <p>Trạng thái: {getStatusInVietnamese(data?.status)}</p>
              <p>Phương thức: {data?.paymentInfo?.type}</p>
            </div>
          </div>

          {/* Dialog xác nhận trả hàng/hoàn tiền */}
          <Dialog
            open={isRefundDialogOpen}
            onOpenChange={setIsRefundDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận trả hàng/hoàn tiền</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn trả hàng và yêu cầu hoàn tiền cho đơn
                  hàng này không?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={closeRefundDialog}>
                  Hủy
                </Button>
                <Button onClick={confirmRefund}>Xác nhận</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Dialog xác nhận hủy đơn hàng */}
          <Dialog
            open={isCancelDialogOpen}
            onOpenChange={setIsCancelDialogOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Xác nhận hủy đơn hàng</DialogTitle>
                <DialogDescription>
                  Bạn có chắc chắn muốn hủy đơn hàng này không?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button variant="outline" onClick={closeCancelDialog}>
                  Không
                </Button>
                <Button onClick={confirmCancel}>Xác nhận hủy</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-2 mt-8">
            <Button className="w-1/4" onClick={handleMessageSubmit}>
              Gửi tin nhắn
            </Button>
            {data?.status === "Processing" && (
              <Button onClick={openCancelDialog} className="w-1/4">
                Huỷ đơn hàng
              </Button>
            )}
            {data?.status === "Delivered" && (
              <Button onClick={openRefundDialog} className="w-1/4">
                Trả hàng/Hoàn tiền
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gửi đánh giá</DialogTitle>
          </DialogHeader>
          <div className="flex items-center mb-4">
            <img
              src={`${backend_url}/${selectedItem?.images[0]}`}
              alt=""
              className="w-24 h-24 object-cover mr-4"
            />
            <div>
              <h3 className="font-medium">{selectedItem?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedItem?.hasClassifications
                  ? selectedItem?.selectedClassification.discountPrice
                  : selectedItem?.discountPrice}
                ₫ x {selectedItem?.quantity}
              </p>
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Đánh giá:</label>
            <div className="flex">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star
                  key={i}
                  className={`mr-1 cursor-pointer ${
                    rating >= i
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => setRating(i)}
                />
              ))}
            </div>
          </div>
          <Textarea
            placeholder="Bạn thấy sản phẩm này như thế nào, hãy để lại đánh giá nhé!"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <Button onClick={rating > 1 ? reviewHandler : null} className="mt-4">
            Gửi
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UserOrderDetails;
