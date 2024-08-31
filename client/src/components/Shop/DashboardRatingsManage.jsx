// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { getAllProductsShop } from "../../redux/actions/product";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../ui/table";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { StarIcon } from "lucide-react";
// import { backend_url } from "../../server";
// import moment from "moment-timezone";

// const DashboardRatingsManage = () => {
//   const dispatch = useDispatch();
//   const { seller } = useSelector((state) => state.seller);
//   const { products, isLoading } = useSelector((state) => state.product);

//   useEffect(() => {
//     if (seller._id) {
//       dispatch(getAllProductsShop(seller._id));
//     }
//   }, [dispatch, seller._id]);

//   if (isLoading) {
//     return <div>Đang tải...</div>;
//   }

//   return (
//     <Card className="w-full h-[calc(100vh-6rem)] mx-auto m-4">
//       <CardHeader>
//         <CardTitle>Quản lý đánh giá</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Khách hàng</TableHead>
//               <TableHead className="text-center">Đánh giá</TableHead>
//               <TableHead className="text-center">Ngày</TableHead>
//               <TableHead>Bình luận</TableHead>
//               <TableHead>Sản phẩm</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {products?.flatMap((product) =>
//               product.reviews.map((review, index) => (
//                 <TableRow key={`${product._id}-${index}`}>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <Avatar>
//                         <AvatarImage
//                           src={`${backend_url}/${review.user.avatar}`}
//                           alt={review.user.name}
//                         />
//                         <AvatarFallback>
//                           {review.user.name.charAt(0)}
//                         </AvatarFallback>
//                       </Avatar>
//                       <div>
//                         <p className="font-medium">{review.user.name}</p>
//                         <p className="text-sm text-gray-500">
//                           {review.user.email}
//                         </p>
//                       </div>
//                     </div>
//                   </TableCell>
//                   <TableCell >
//                     <div className="flex items-center justify-center">
//                       {[...Array(5)].map((_, i) => (
//                         <StarIcon
//                           key={i}
//                           className={
//                             i < review.rating
//                               ? "text-yellow-400"
//                               : "text-gray-300"
//                           }
//                           size={16}
//                         />
//                       ))}
//                     </div>
//                   </TableCell>
//                   <TableCell  className="text-center">
//                     {moment(review.createdAt)
//                       .tz("Asia/Ho_Chi_Minh")
//                       .format("DD-MM-YYYY | HH:mm")}
//                   </TableCell>
//                   <TableCell>{review.comment}</TableCell>
//                   <TableCell>
//                     <div className="flex items-center space-x-3">
//                       <img
//                         src={`${backend_url}${
//                           product.images[0] && product.images[0]
//                         }`}
//                         alt={product.name}
//                         className="w-10 h-10 object-cover rounded"
//                       />
//                       <p className="font-medium">{product.name}</p>
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </CardContent>
//     </Card>
//   );
// };

// export default DashboardRatingsManage;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { StarIcon } from "lucide-react";
import { backend_url } from "../../server";
import moment from "moment-timezone";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Ratings from "../Products/Ratings";

const DashboardRatingsManage = () => {
  const dispatch = useDispatch();
  const { seller } = useSelector((state) => state.seller);
  const { products, isLoading } = useSelector((state) => state.product);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (seller._id) {
      dispatch(getAllProductsShop(seller._id));
    }
  }, [dispatch, seller._id]);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

  const allReviews = products?.flatMap((product) => product.reviews) || [];

  const filterReviews = (reviews, rating) => {
    if (rating === "all") return reviews;
    return reviews.filter((review) => review.rating === parseInt(rating));
  };

  const renderReviewsTable = (reviews) => {
    if (reviews.length === 0) {
      return <div className="text-center py-4">Chưa có đánh giá nào</div>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Khách hàng</TableHead>
            <TableHead className="text-center">Đánh giá</TableHead>
            <TableHead className="text-center">Ngày</TableHead>
            <TableHead className="text-center">Bình luận</TableHead>
            <TableHead className="text-center">Sản phẩm</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.flatMap((product) =>
            product.reviews.map((review, index) => (
              <TableRow key={index}>
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage
                        src={`${backend_url}/${review.user.avatar}`}
                        alt={review.user.name}
                      />
                      <AvatarFallback>
                        {review.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{review.user.name}</p>
                      <p className="text-sm text-gray-500">
                        {review.user.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={
                          i < review.rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                        size={16}
                      />
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  {moment(review.createdAt)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("DD-MM-YYYY | HH:mm")}
                </TableCell>
                <TableCell className="text-center">{review.comment}</TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center space-x-3">
                    <img
                      src={`${backend_url}${
                        product.images[0] && product.images[0]
                      }`}
                      alt={product.name}
                      className="w-10 h-10 object-cover rounded"
                    />
                    <p className="font-medium">{product.name}</p>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(1);

  return (
    <Card className="w-full h-[calc(100vh-6rem)] mx-auto m-4">
      <CardHeader>
        <CardTitle>Quản lý đánh giá</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full min-h-[6rem] border p-4 mb-4 bg-[#fffbf8]">
            <div className="w-full mx-2 h-[80px] flex flex-col items-center justify-center mr-6 ">
              <div className="flex items-center text-[#27b3e2] font-[450] mb-1">
                <p className="text-[22px] mr-1 ">{averageRating}</p>
                <p>trên 5</p>
              </div>
              <div className="text-[22px]">
                <Ratings rating={parseFloat(averageRating)} />
              </div>
            </div>
            <TabsTrigger
              value="all"
              className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
            >
              Tất cả
            </TabsTrigger>
            <TabsTrigger
              value="5"
              className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
            >
              5 sao
            </TabsTrigger>
            <TabsTrigger
              value="4"
              className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
            >
              4 sao
            </TabsTrigger>
            <TabsTrigger
              value="3"
              className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
            >
              3 sao
            </TabsTrigger>
            <TabsTrigger
              value="2"
              className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
            >
              2 sao
            </TabsTrigger>
            <TabsTrigger
              value="1"
              className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
            >
              1 sao
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            {renderReviewsTable(allReviews)}
          </TabsContent>
          <TabsContent value="5">
            {renderReviewsTable(filterReviews(allReviews, "5"))}
          </TabsContent>
          <TabsContent value="4">
            {renderReviewsTable(filterReviews(allReviews, "4"))}
          </TabsContent>
          <TabsContent value="3">
            {renderReviewsTable(filterReviews(allReviews, "3"))}
          </TabsContent>
          <TabsContent value="2">
            {renderReviewsTable(filterReviews(allReviews, "2"))}
          </TabsContent>
          <TabsContent value="1">
            {renderReviewsTable(filterReviews(allReviews, "1"))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DashboardRatingsManage;
