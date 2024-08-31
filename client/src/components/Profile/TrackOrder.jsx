import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllOrdersOfUser } from "../../redux/actions/order";

const TrackOrder = () => {
  const { orders } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const data = orders && orders.find((item) => item._id === id);

  return (
    <div className="w-full h-[80vh] flex justify-center items-center">
      {data && data?.status === "Processing" ? (
        <h1 className="text-[20px]">Đơn hàng của bạn đang được xử lý</h1>
      ) : data?.status === "Transferred to delivery partner" ? (
        <h1 className="text-[20px]">Đã chuyển cho đối tác vận chuyển</h1>
      ) : data?.status === "Shipping" ? (
        <h1 className="text-[20px]">
          Đơn hàng của bạn hiện đang được vận chuyển
        </h1>
      ) : data?.status === "On the way" ? (
        <h1 className="text-[20px]">Đơn hàng đang trên đường giao đến bạn</h1>
      ) : data?.status === "Delivered" ? (
        <h1 className="text-[20px]">
          Đơn hàng của bạn đã được giao thành công
        </h1>
      ) : data?.status === "Processing Refund" ? (
        <h1 className="text-[20px]">
          Đơn hàng của bạn đang được xử lý để hoàn tiền
        </h1>
      ) : data?.status === "Refund Success" ? (
        <h1 className="text-[20px]">
          Đơn hàng của bạn đã được hoàn tiền thành công
        </h1>
      ) : null}
    </div>
  );
};

export default TrackOrder;
