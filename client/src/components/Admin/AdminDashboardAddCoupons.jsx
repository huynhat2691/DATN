import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, isBefore, startOfDay } from "date-fns";
import axios from "axios";
import { server } from "../../server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { toast } from "react-toastify";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import moment from "moment-timezone";
import { NumericFormat } from "react-number-format";

const AdminDashboardAddCoupons = () => {
  const [coupon, setCoupon] = useState({
    name: "",
    code: "",
    discountType: "percentage",
    discountValue: "",
    maxUses: "",
    expiryDate: new Date(),
  });
  const [coupons, setCoupons] = useState([]);
  const [editingCoupon, setEditingCoupon] = useState(null);

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    try {
      const response = await axios.get(
        `${server}/couponCodeAdmin/all-coupons-admin`
      );
      setCoupons(response.data.coupons);
    } catch (error) {
      console.error("Error fetching coupons:", error);
      toast.error("Lỗi không lấy được phiếu giảm giá");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCoupon((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateSelect = (date) => {
    setCoupon((prev) => ({ ...prev, expiryDate: date }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCoupon) {
        await axios.put(
          `${server}/couponCodeAdmin/update-coupon-admin/${editingCoupon._id}`,
          coupon
        );
        toast.success("Mã giảm giá đã cập nhật thành công");
      } else {
        await axios.post(
          `${server}/couponCodeAdmin/create-coupon-admin`,
          coupon
        );
        toast.success("Mã giảm giá đã được tạo thành công");
      }
      fetchCoupons();
      resetForm();
    } catch (error) {
      console.error("Error saving coupon:", error);
      toast.error("Lỗi không lưu được phiếu giảm giá");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        `${server}/couponCodeAdmin/delete-coupon-admin/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchCoupons();
      } else {
        toast.error("Lỗi không xóa được phiếu giảm giá");
      }
    } catch (error) {
      console.error("Error deleting coupon:", error);
      toast.error(error.response?.data?.message || "Lỗi không xóa được phiếu giảm giá");
    }
  };

  const handleEdit = (couponToEdit) => {
    setEditingCoupon(couponToEdit);
    setCoupon({
      ...couponToEdit,
      expiryDate: new Date(couponToEdit.expiryDate),
    });
  };

  const resetForm = () => {
    setCoupon({
      name: "",
      code: "",
      discountType: "percentage",
      discountValue: "",
      maxUses: "",
      expiryDate: new Date(),
    });
    setEditingCoupon(null);
  };

  return (
    <div className="w-full p-4">
      <h2 className="text-2xl font-bold mb-4">Quản lý mã giảm giá</h2>
      <div className="flex flex-col md:flex-row gap-4">
        <Card className="w-full md:w-2/5">
          <CardHeader>
            <CardTitle>
              {editingCoupon ? "Cập nhật" : "Tạo"} mã giảm giá
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Tên mã giảm giá</Label>
                <Input
                  id="name"
                  name="name"
                  value={coupon.name}
                  onChange={handleChange}
                  required
                  placeholder="Nhập tên mã giảm giá"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="code">Mã giảm giá</Label>
                <Input
                  id="code"
                  name="code"
                  value={coupon.code}
                  onChange={handleChange}
                  required
                  placeholder="Nhập mã giảm giá (viết liền)"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountType">Loại giảm giá</Label>
                <Select
                  name="discountType"
                  value={coupon.discountType}
                  onValueChange={(value) =>
                    handleChange({ target: { name: "discountType", value } })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn loại giảm giá" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Phần trăm</SelectItem>
                    <SelectItem value="fixed">Số tiền cố định</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="discountValue">Giá trị giảm giá</Label>
                <Input
                  id="discountValue"
                  name="discountValue"
                  type="number"
                  value={coupon.discountValue}
                  onChange={handleChange}
                  required
                  placeholder="Nhập giá trị giảm giá"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="maxUses">Số lượng mã giảm giá</Label>
                <Input
                  id="maxUses"
                  name="maxUses"
                  type="number"
                  value={coupon.maxUses}
                  onChange={handleChange}
                  required
                  placeholder="Nhập số lượng giảm giá"
                />
              </div>
              <div className="space-y-2">
                <Label className="mr-2">Ngày hết hạn</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline">
                      {format(coupon.expiryDate, "dd/MM/yyyy")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={coupon.expiryDate}
                      onSelect={handleDateSelect}
                      initialFocus
                      disabled={(date) =>
                        isBefore(date, startOfDay(new Date()))
                      }
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <Button type="submit" className="w-full">
                {editingCoupon ? "Cập nhật" : "Tạo"} mã giảm giá
              </Button>
              {editingCoupon && (
                <Button
                  type="button"
                  onClick={resetForm}
                  variant="outline"
                  className="w-full"
                >
                  Hủy
                </Button>
              )}
            </form>
          </CardContent>
        </Card>

        <Separator className="hidden md:block" orientation="vertical" />

        <Card className="w-full md:w-3/5">
          <CardHeader>
            <CardTitle>Danh sách mã giảm giá</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Tên</TableHead>
                    <TableHead className="text-center">Mã</TableHead>
                    <TableHead className="text-center">Loại</TableHead>
                    <TableHead className="text-center">Giá trị</TableHead>
                    <TableHead className="text-center">Số lượng</TableHead>
                    <TableHead className="text-center">Ngày hết hạn</TableHead>
                    <TableHead className="text-center">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {coupons.map((coupon) => (
                    <TableRow key={coupon._id}>
                      <TableCell>{coupon.name}</TableCell>
                      <TableCell className="text-center">
                        {coupon.code}
                      </TableCell>
                      <TableCell className="text-center">
                        {coupon.discountType}
                      </TableCell>
                      <TableCell className="text-center">
                        <NumericFormat
                          value={coupon.discountValue}
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
                        {coupon.maxUses}
                      </TableCell>
                      <TableCell className="text-center">
                        {moment(coupon.expiryDate)
                          .tz("Asia/Ho_Chi_Minh")
                          .format("DD-MM-YYYY")}
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          onClick={() => handleEdit(coupon)}
                          size="sm"
                          className="mr-2"
                        >
                          Sửa
                        </Button>
                        <Button
                          onClick={() => handleDelete(coupon._id)}
                          variant="destructive"
                          size="sm"
                        >
                          Xóa
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboardAddCoupons;
