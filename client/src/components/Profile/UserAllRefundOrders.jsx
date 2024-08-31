// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { ChevronRight } from "lucide-react";
// import { getAllOrdersOfUser } from "../../redux/actions/order";
// import { Button } from "../ui/button";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { CardContent } from "../ui/card";

// const UserAllRefundOrders = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user._id));
//   }, [dispatch, user._id]);

//   const eligibleOrders =
//     orders && orders.filter((item) => item.status === "Processing Refund");

//   if (!orders || orders.length === 0) {
//     return (
//       <div className="w-full mx-auto m-4">
//         <CardContent>
//           <p>Không có đơn hàng nào.</p>
//         </CardContent>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto">
//       <Table>
//         <TableHeader>
//           <TableRow>
//             <TableHead>ID đơn hàng</TableHead>
//             <TableHead>Trạng thái</TableHead>
//             <TableHead className="text-center">Số lượng</TableHead>
//             <TableHead className="text-center">Tổng cộng</TableHead>
//             <TableHead className="text-center">Xem đơn hàng</TableHead>
//           </TableRow>
//         </TableHeader>
//         <TableBody>
//           {eligibleOrders &&
//             eligibleOrders.map((order) => (
//               <TableRow key={order._id}>
//                 <TableCell>{order._id}</TableCell>
//                 <TableCell>
//                   <span
//                     className={
//                       order.status === "Đã giao hàng"
//                         ? "text-green-500"
//                         : "text-red-500"
//                     }
//                   >
//                     {order.status}
//                   </span>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {order.cart.length}
//                 </TableCell>
//                 <TableCell className="text-center">
//                   {order.totalPrice}
//                   <sup>₫</sup>
//                 </TableCell>
//                 <TableCell className="text-center">
//                   <Link to={`/user/order/${order._id}`}>
//                     <Button variant="ghost" size="sm">
//                       <ChevronRight className="h-4 w-4" />
//                     </Button>
//                   </Link>
//                 </TableCell>
//               </TableRow>
//             ))}
//         </TableBody>
//       </Table>
//     </div>
//   );
// };

// export default UserAllRefundOrders;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { CardContent } from "../ui/card";

const UserAllRefundOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

  const eligibleOrders =
    orders && orders.filter((item) => item.status === "Processing Refund");

  if (!orders || orders.length === 0) {
    return (
      <div className="w-full mx-auto m-4">
        <CardContent>
          <p>Không có đơn hàng nào.</p>
        </CardContent>
      </div>
    );
  }

  return (
    <div className="container mx-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID đơn hàng</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-center">Số lượng</TableHead>
            <TableHead className="text-center">Tổng cộng</TableHead>
            <TableHead className="text-center">Phân loại</TableHead>
            <TableHead className="text-center">Xem đơn hàng</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {eligibleOrders &&
            eligibleOrders.map((order) => (
              <TableRow key={order._id}>
                <TableCell>{order._id}</TableCell>
                <TableCell>
                  <span
                    className={
                      order.status === "Đã giao hàng"
                        ? "text-green-500"
                        : "text-red-500"
                    }
                  >
                    {order.status}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  {order.cart.length}
                </TableCell>
                <TableCell className="text-center">
                  {order.totalPrice}
                  <sup>₫</sup>
                </TableCell>
                <TableCell className="text-center">
                  {order.hasClassifications ? (
                    <span className="text-green-500">Có</span>
                  ) : (
                    <span className="text-red-500">Không</span>
                  )}
                </TableCell>
                <TableCell className="text-center">
                  <Link to={`/user/order/${order._id}`}>
                    <Button variant="ghost" size="sm">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserAllRefundOrders;
