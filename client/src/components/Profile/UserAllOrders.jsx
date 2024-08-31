// /* eslint-disable no-unused-vars */
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { ChevronRight, Store } from "lucide-react";
// import { getAllOrdersOfUser } from "../../redux/actions/order";
// import { Button } from "../ui/button";
// import { CardContent, Card } from "../ui/card";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
// import { backend_url } from "../../server";

// const UserAllOrders = () => {
//   const { user } = useSelector((state) => state.user);
//   const { orders } = useSelector((state) => state.order);
//   const dispatch = useDispatch();
//   const [activeTab, setActiveTab] = useState("all");

//   useEffect(() => {
//     dispatch(getAllOrdersOfUser(user._id));
//   }, [dispatch, user._id]);

//   const getStatusInVietnamese = (status) => {
//     const statusMap = {
//       Processing: "Đang xử lý",
//       "Transferred to delivery partner": "Đã chuyển cho đối tác vận chuyển",
//       Shipping: "Đang giao hàng",
//       "On the way": "Đang trên đường giao đến bạn",
//       Delivered: "Đã giao hàng",
//       Cancelled: "Đã hủy",
//       "Processing Refund": "Đang xử lý hoàn tiền",
//       "Refund Success": "Hoàn tiền thành công",
//     };
//     return statusMap[status] || status;
//   };

//   const filterOrders = (status) => {
//     if (status === "all") return orders;
//     return orders?.filter((order) => order.status === status);
//   };

//   const renderOrderCards = (filteredOrders) => {
//     if (!filteredOrders || filteredOrders.length === 0) {
//       return (
//         <div className="w-full mx-auto m-4">
//           <CardContent>
//             <p>Không có đơn hàng nào.</p>
//           </CardContent>
//         </div>
//       );
//     }

//     return (
//       <div className="grid grid-cols-1">
//         {filteredOrders.map((order) => (
//           <Card key={order._id} className="p-4 my-2">
//             {order.cart.map((item) => (
//               <div key={item._id} className="pb-4">
//                 <div className="flex flex-col ">
//                   <div className="flex items-center justify-between pb-2">
//                     <p
//                       className={
//                         order.status === "Delivered"
//                           ? "text-green-500"
//                           : order.status === "Processing"
//                           ? "text-yellow-500"
//                           : "text-red-500"
//                       }
//                     >
//                       {getStatusInVietnamese(order.status)}
//                     </p>
//                     <p className="text-sm text-gray-600 flex items-center">
//                       <Store size={16} className="mr-2" />
//                       {item.shop.name}
//                     </p>
//                   </div>
//                   <div className="flex items-center justify-between border-y py-4">
//                     <div className="flex items-center">
//                       <img
//                         src={`${backend_url}${item.images[0]}`}
//                         alt={item.name}
//                         className="w-16 h-16 object-cover mr-4"
//                       />
//                       <div>
//                         <h3 className="font-[500]">{item.name}</h3>
//                         {item.hasClassifications && (
//                           <p className="text-sm">
//                             {item.selectedClassification.group1} -{" "}
//                             {item.selectedClassification.group2}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-sm">
//                         Giá: {item.discountPrice.toLocaleString()}
//                         <sup>₫</sup>
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//             <div className="w-full flex justify-end">
//               <div>
//                 <div className="flex items-center justify-between pb-2">
//                   <p className="mr-2 text-[gray]">Tổng tiền:</p>
//                   <p>
//                     {order.totalPrice.toLocaleString()}
//                     <sup>₫</sup>
//                   </p>
//                 </div>
//                 <div className="flex justify-end">
//                   <Link to={`/user/order/${order._id}`}>
//                     <Button variant="outline" size="sm">
//                       Chi tiết <ChevronRight className="h-4 w-4 ml-1" />
//                     </Button>
//                   </Link>
//                 </div>
//               </div>
//             </div>
//           </Card>
//         ))}
//       </div>
//     );
//   };

//   return (
//     <div className="container mx-auto">
//       <Tabs defaultValue="all" onValueChange={setActiveTab}>
//         <TabsList className="w-full">
//           <TabsTrigger value="all" className="w-1/6">
//             Tất cả đơn hàng
//           </TabsTrigger>
//           <TabsTrigger value="Processing" className="w-1/6">
//             Đang xử lý
//           </TabsTrigger>
//           <TabsTrigger value="Shipping" className="w-1/6">
//             Đang giao hàng
//           </TabsTrigger>
//           <TabsTrigger value="Delivered" className="w-1/6">
//             Đã giao hàng
//           </TabsTrigger>
//           <TabsTrigger value="Cancelled" className="w-1/6">
//             Đã hủy
//           </TabsTrigger>
//           <TabsTrigger
//             value={"Processing Refund" || "Refund Success"}
//             className="w-1/6"
//           >
//             Trả hàng/Hoàn tiền
//           </TabsTrigger>
//         </TabsList>
//         <TabsContent value="all">
//           {renderOrderCards(filterOrders("all"))}
//         </TabsContent>
//         <TabsContent value="Processing">
//           {renderOrderCards(filterOrders("Processing"))}
//         </TabsContent>
//         <TabsContent value="Shipping">
//           {renderOrderCards(filterOrders("Shipping"))}
//         </TabsContent>
//         <TabsContent value="Delivered">
//           {renderOrderCards(filterOrders("Delivered"))}
//         </TabsContent>
//         <TabsContent value="Cancelled">
//           {renderOrderCards(filterOrders("Cancelled"))}
//         </TabsContent>
//         <TabsContent value={"Processing Refund" || "Refund Success"}>
//           {renderOrderCards(
//             filterOrders("Processing Refund" || "Refund Success")
//           )}
//         </TabsContent>
//       </Tabs>
//     </div>
//   );
// };

// export default UserAllOrders;

/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ChevronRight, Store } from "lucide-react";
import { getAllOrdersOfUser } from "../../redux/actions/order";
import { Button } from "../ui/button";
import { CardContent, Card } from "../ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { backend_url } from "../../server";
import { NumericFormat } from "react-number-format";

const UserAllOrders = () => {
  const { user } = useSelector((state) => state.user);
  const { orders } = useSelector((state) => state.order);
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    dispatch(getAllOrdersOfUser(user._id));
  }, [dispatch, user._id]);

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

  const filterOrders = (status) => {
    if (status === "all") return orders;
    if (status === "Refund") {
      return orders?.filter(
        (order) =>
          order.status === "Processing Refund" ||
          order.status === "Refund Success"
      );
    }
    return orders?.filter((order) => order.status === status);
  };

  const renderOrderCards = (filteredOrders) => {
    if (!filteredOrders || filteredOrders.length === 0) {
      return (
        <div className="w-full mx-auto m-4">
          <CardContent>
            <p>Không có đơn hàng nào.</p>
          </CardContent>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1">
        {filteredOrders.map((order) => (
          <Card key={order._id} className="p-4 my-2">
            {order.cart.map((item) => (
              <div key={item._id} className="pb-4">
                <div className="flex flex-col ">
                  <div className="flex items-center justify-between pb-2">
                    <p
                      className={
                        order.status === "Delivered" ||
                        order.status === "Refund Success"
                          ? "text-green-500"
                          : order.status === "Processing"
                          ? "text-yellow-500"
                          : "text-red-500"
                      }
                    >
                      {getStatusInVietnamese(order.status)}
                    </p>
                    <p className="text-sm text-gray-600 flex items-center">
                      <Store size={16} className="mr-2" />
                      {item.shop.name}
                    </p>
                  </div>
                  <div className="flex items-center justify-between border-y py-4">
                    <div className="flex items-center">
                      <img
                        src={`${backend_url}${item.images[0]}`}
                        alt={item.name}
                        className="w-16 h-16 object-cover mr-4"
                      />
                      <div>
                        <h3 className="font-[500]">{item.name}</h3>
                        {item.hasClassifications && (
                          <p className="text-sm">
                            {item.selectedClassification.group1} -{" "}
                            {item.selectedClassification.group2}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <p className="mr-2">Giá:</p>
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
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="w-full flex justify-end">
              <div>
                <div className="flex items-center justify-between pb-2">
                  <p className="mr-2 text-[gray]">Tổng tiền:</p>
                  <p>
                    {order.totalPrice.toLocaleString()}
                    <sup>₫</sup>
                  </p>
                </div>
                <div className="flex justify-end">
                  <Link to={`/user/order/${order._id}`}>
                    <Button variant="outline" size="sm">
                      Chi tiết <ChevronRight className="h-4 w-4 ml-1" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  };

  return (
    <div className="container mx-auto">
      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <TabsList className="w-full">
          <TabsTrigger value="all" className="w-1/6">
            Tất cả đơn hàng
          </TabsTrigger>
          <TabsTrigger value="Processing" className="w-1/6">
            Đang xử lý
          </TabsTrigger>
          <TabsTrigger value="Shipping" className="w-1/6">
            Đang giao hàng
          </TabsTrigger>
          <TabsTrigger value="Delivered" className="w-1/6">
            Đã giao hàng
          </TabsTrigger>
          <TabsTrigger value="Cancelled" className="w-1/6">
            Đã hủy
          </TabsTrigger>
          <TabsTrigger value="Refund" className="w-1/6">
            Trả hàng/Hoàn tiền
          </TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          {renderOrderCards(filterOrders("all"))}
        </TabsContent>
        <TabsContent value="Processing">
          {renderOrderCards(filterOrders("Processing"))}
        </TabsContent>
        <TabsContent value="Shipping">
          {renderOrderCards(filterOrders("Shipping"))}
        </TabsContent>
        <TabsContent value="Delivered">
          {renderOrderCards(filterOrders("Delivered"))}
        </TabsContent>
        <TabsContent value="Cancelled">
          {renderOrderCards(filterOrders("Cancelled"))}
        </TabsContent>
        <TabsContent value="Refund">
          {renderOrderCards(filterOrders("Refund"))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserAllOrders;
