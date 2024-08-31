import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement,
} from "chart.js";
import { Pie, Line, Bar } from "react-chartjs-2";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import { getAllOrdersAdmin } from "../../redux/actions/order";
import { getAllSellersAdmin } from "../../redux/actions/seller";
import { getAllProducts } from "../../redux/actions/product";
import { getAllUsersAdmin } from "../../redux/actions/user";
import { NumericFormat } from "react-number-format";
import moment from "moment-timezone";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  BarElement
);

const AdminDashboardMain = () => {
  const dispatch = useDispatch();
  const { adminOrders } = useSelector((state) => state.order);
  const { sellers } = useSelector((state) => state.seller);
  const { allProducts } = useSelector((state) => state.product);
  const { users } = useSelector((state) => state.user);

  const [timeRange, setTimeRange] = useState("weekly");

  useEffect(() => {
    dispatch(getAllOrdersAdmin());
    dispatch(getAllSellersAdmin());
    dispatch(getAllProducts());
    dispatch(getAllUsersAdmin());
  }, [dispatch]);

  const adminTotalEarning =
    adminOrders &&
    adminOrders.reduce((acc, item) => {
      if (item.status === "Delivered") {
        return acc + parseFloat(item.totalPrice.toString().replace(".", ""));
      }
      return acc;
    }, 0);

  const totalSoldProducts =
    allProducts && allProducts.reduce((acc, item) => acc + item.sold_out, 0);

  // Pie Chart Data for Order Status
  const orderStatusData = {
    labels: ["Đã giao", "Đang giao", "Đã hủy", "Hoàn trả"],
    datasets: [
      {
        data: [
          adminOrders?.filter((order) => order.status === "Delivered").length,
          adminOrders?.filter((order) => order.status === "Processing").length,
          adminOrders?.filter((order) => order.status === "Cancelled").length,
          adminOrders?.filter((order) => order.status === "Refund Success")
            .length,
        ],
        backgroundColor: ["#4ade80", "#facc15", "#f87171", "#60a5fa"],
        borderColor: ["#22c55e", "#eab308", "#ef4444", "#3b82f6"],
        borderWidth: 1,
      },
    ],
  };

  const calculateMonthlyRevenue = (orders) => {
    const monthlyRevenue = new Array(12).fill(0);

    orders?.forEach((order) => {
      if (order.status === "Delivered") {
        const date = new Date(order.deliveredAt);
        const month = date.getMonth();
        monthlyRevenue[month] += parseFloat(order.totalPrice);
      }
    });

    return monthlyRevenue;
  };

  // Line Chart Data for Revenue
  const revenueData = {
    labels: [
      "T1",
      "T2",
      "T3",
      "T4",
      "T5",
      "T6",
      "T7",
      "T8",
      "T9",
      "T10",
      "T11",
      "T12",
    ],
    datasets: [
      {
        label: "Doanh thu",
        data: calculateMonthlyRevenue(adminOrders),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  // Bar Chart Data for Top Selling Products
  const topSellingProductsData = allProducts
    ? (() => {
        // Sắp xếp sản phẩm theo sold_out giảm dần
        const sortedProducts = [...allProducts].sort(
          (a, b) => b.sold_out - a.sold_out
        );

        // Lấy 5 sản phẩm bán chạy nhất
        const top5Products = sortedProducts.slice(0, 5);

        return {
          labels: top5Products.map((product) => product.name),
          datasets: [
            {
              label: "Số lượng bán",
              data: top5Products.map((product) => product.sold_out),
              backgroundColor: "rgba(75, 192, 192, 0.6)",
            },
          ],
        };
      })()
    : {
        labels: [],
        datasets: [
          {
            label: "Số lượng bán",
            data: [],
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      };

  return (
    <div className="w-full p-4 bg-gray-100">
      <h3 className="text-3xl font-bold mb-6 text-gray-800">Tổng quan</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng doanh thu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[18px] font-bold text-indigo-600">
              <NumericFormat
                value={adminTotalEarning}
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
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Số lượng đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[18px] font-bold text-indigo-600">
              {adminOrders?.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Sản phẩm đã bán
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[18px] font-bold text-indigo-600">
              {totalSoldProducts}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Người dùng hoạt động
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[18px] font-bold text-indigo-600">
              {users?.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Số lượng seller
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[18px] font-bold text-indigo-600">
              {sellers?.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tổng sản phẩm
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-[18px] font-bold text-indigo-600">
              {allProducts?.length}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white shadow-lg w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Phân bổ trạng thái đơn hàng
            </CardTitle>
          </CardHeader>
          <CardContent className="flex justify-center">
            <div className="w-full h-[400px]">
              <Pie
                data={orderStatusData}
                options={{ responsive: true, maintainAspectRatio: false }}
              />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg w-full mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Doanh thu theo thời gian
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select
              value={timeRange}
              onValueChange={(value) => setTimeRange(value)}
            >
              <SelectTrigger className="w-[180px] mb-4">
                <SelectValue placeholder="Chọn khoảng thời gian" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="daily">Hàng ngày</SelectItem>
                <SelectItem value="weekly">Hàng tuần</SelectItem>
                <SelectItem value="monthly">Hàng tháng</SelectItem>
                <SelectItem value="yearly">Hàng năm</SelectItem>
              </SelectContent>
            </Select>
            <div style={{ width: "100%", height: "300px" }}>
              <Line
                data={revenueData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  scales: {
                    y: {
                      beginAtZero: true,
                      ticks: {
                        callback: function (value) {
                          // Giả sử giá trị thực tế là value * 1000
                          const actualValue = value * 1000;
                          return (
                            new Intl.NumberFormat("vi-VN", {
                              style: "decimal",
                              minimumFractionDigits: 0,
                              maximumFractionDigits: 0,
                            }).format(actualValue) + "₫"
                          );
                        },
                      },
                    },
                  },
                  plugins: {
                    tooltip: {
                      callbacks: {
                        label: function (context) {
                          let label = context.dataset.label || "";
                          if (label) {
                            label += ": ";
                          }
                          if (context.parsed.y !== null) {
                            // Giả sử giá trị thực tế là context.parsed.y * 1000
                            const actualValue = context.parsed.y * 1000;
                            label += new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(actualValue);
                          }
                          return label;
                        },
                      },
                    },
                  },
                }}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Top 5 sản phẩm bán chạy
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Bar data={topSellingProductsData} />
          </CardContent>
        </Card>

        <Card className="bg-white shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Top 5 seller có doanh thu cao nhất
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Seller</TableHead>
                  <TableHead className="text-right">Doanh thu</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.values(sellers ?? {})
                  .sort((a, b) => b.availableBalance - a.availableBalance)
                  .slice(0, 5)
                  .map((seller) => (
                    <TableRow key={seller._id}>
                      <TableCell>{seller.name}</TableCell>
                      <TableCell className="text-right">
                        {seller.availableBalance}
                        <sup>₫</sup>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-2xl font-semibold mb-4 text-gray-800">
        Đơn hàng mới nhất
      </h3>
      <Card className="bg-white shadow-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-gray-600">ID đơn hàng</TableHead>
              <TableHead className="text-center text-gray-600">
                Trạng thái
              </TableHead>
              <TableHead className="text-center text-gray-600">
                Số lượng
              </TableHead>
              <TableHead className="text-center text-gray-600">
                Tổng cộng
              </TableHead>
              <TableHead className="text-center text-gray-600">
                Ngày đặt hàng
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {adminOrders &&
              adminOrders.slice(0, 5).map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="font-medium">{order._id}</TableCell>
                  <TableCell className="text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-800"
                          : order.status === "Processing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    {order.cart.reduce((acc, item) => acc + item.quantity, 0)}
                  </TableCell>
                  <TableCell className="text-center">
                    {order.totalPrice.toLocaleString()}
                    <sup>₫</sup>
                  </TableCell>
                  <TableCell className="text-center">
                    {moment(order.createdAt)
                      .tz("Asia/Ho_Chi_Minh")
                      .format("DD-MM-YYYY | HH:mm")}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Card>

      {/* <div className="mt-8">
        <h3 className="text-2xl font-semibold mb-4 text-gray-800">
          Công cụ Quản lý
        </h3>
        <Tabs defaultValue="sellers" className="w-full">
          <TabsList>
            <TabsTrigger value="sellers">Quản lý shop</TabsTrigger>
            <TabsTrigger value="products">Quản lý sản phẩm</TabsTrigger>
            <TabsTrigger value="orders">Quản lý đơn hàng</TabsTrigger>
          </TabsList>
          <TabsContent value="sellers">
            Nội dung quản lý seller
          </TabsContent>
          <TabsContent value="products">
            Nội dung quản lý sản phẩm
          </TabsContent>
          <TabsContent value="orders">
            Nội dung quản lý đơn hàng
          </TabsContent>
        </Tabs>
      </div> */}
    </div>
  );
};

export default AdminDashboardMain;
