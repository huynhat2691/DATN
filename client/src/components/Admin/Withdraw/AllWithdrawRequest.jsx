import { useEffect, useState } from "react";
import { server } from "../../../server";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select";
import { Pencil, Trash2 } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../../ui/pagination";
import moment from "moment-timezone";
import { NumericFormat } from "react-number-format";

const AllWithdrawRequest = () => {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [withdrawData, setWithdrawData] = useState();
  const [withdrawStatus, setWithdrawStatus] = useState("Processing");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);

  useEffect(() => {
    axios
      .get(`${server}/withdraw/admin-get-all-withdraw-request`, {
        withCredentials: true,
      })
      .then((res) => {
        setData(res.data.withdraws);
      })
      .catch((err) => console.log(err.response.data.message));
  }, []);

  const handleDelete = async (id) => {
    setDeleteItemId(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(
        `${server}/withdraw/admin-delete-withdraw-request/${deleteItemId}`,
        {
          withCredentials: true,
        }
      );
      toast.success("Yêu cầu thanh toán đã được xóa thành công");
      setData((prevData) =>
        prevData.filter((item) => item._id !== deleteItemId)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi xóa yêu cầu thanh toán"
      );
    }
    setDeleteDialogOpen(false);
  };

  const handleSubmit = async () => {
    if (!withdrawData || !withdrawData._id) {
      toast.error("Invalid withdraw data");
      return;
    }

    await axios
      .put(
        `${server}/withdraw/admin-update-withdraw-status/${withdrawData._id}`,
        {
          sellerId: withdrawData.seller._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Yêu cầu thanh toán đã được cập nhật thành công");
        setData((prevData) =>
          prevData.map((item) =>
            item._id === withdrawData._id ? res.data.withdraw : item
          )
        );
        setOpen(false);
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || "An error occurred");
      });
  };

  if (!data || data.length === 0) {
    return (
      <Card className="w-full mx-auto m-4">
        <CardHeader>
          <CardTitle>Quản lý thanh toán</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Không có yêu cầu thanh toán nào.</p>
        </CardContent>
      </Card>
    );
  }

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
      Approved: "Đã thanh toán",
    };
    return statusMap[status] || status;
  };

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  return (
    <Card className="w-full mx-auto m-4 flex flex-col h-[calc(100vh-6rem)]">
      <CardHeader>
        <CardTitle>Quản lý thanh toán</CardTitle>
      </CardHeader>
      <CardContent className="flex-grow overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Tên Shop</TableHead>
              <TableHead>Shop Id</TableHead>
              <TableHead>Số tiền</TableHead>
              <TableHead className="text-center">Trạng thái</TableHead>
              <TableHead className="text-center">Ngày tạo</TableHead>
              <TableHead className="text-center">Cập nhật trạng thái</TableHead>
              <TableHead className="text-center">Xoá yêu cầu</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentData.map((item) => (
              <TableRow key={item._id}>
                <TableCell>{item._id}</TableCell>
                <TableCell>{item.seller.name}</TableCell>
                <TableCell>{item.seller._id}</TableCell>
                <TableCell>
                  <NumericFormat
                    value={item.amount}
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
                </TableCell>
                <TableCell className="text-center">
                  {getStatusInVietnamese(item.status)}
                </TableCell>
                <TableCell className="text-center">
                  {moment(item.createdAt)
                    .tz("Asia/Ho_Chi_Minh")
                    .format("DD-MM-YYYY | HH:mm")}
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (item.status === "Processing") {
                        setOpen(true);
                        setWithdrawData(item);
                      }
                    }}
                    disabled={item.status !== "Processing"}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                </TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(item._id)}
                    disabled={item.status !== "Processing"}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
      <div className="mt-auto p-4 border-t">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cập nhật trạng thái thanh toán</DialogTitle>
          </DialogHeader>

          <Select
            onValueChange={setWithdrawStatus}
            defaultValue={withdrawStatus}
          >
            <SelectTrigger >
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Processing">Đang xử lý</SelectItem>
              <SelectItem value="Approved">Chấp nhận</SelectItem>
            </SelectContent>
          </Select>
          <DialogFooter>
            <Button onClick={handleSubmit}>Cập nhật</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
          </DialogHeader>
          <p>Bạn có chắc chắn muốn xóa yêu cầu thanh toán này?</p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmDelete}>
              Xác nhận
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default AllWithdrawRequest;
