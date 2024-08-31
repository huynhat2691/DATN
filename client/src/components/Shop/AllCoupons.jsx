import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDelete } from "react-icons/ai";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ScrollArea } from "../ui/scroll-area";
import moment from "moment-timezone";

const AllCoupons = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [discountType, setDiscountType] = useState("");
  const [discountValue, setDiscountValue] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [coupons, setCoupons] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { seller } = useSelector((state) => state.seller);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${server}/coupon/get-all-coupons/${seller._id}`, {
        withCredentials: true,
      })
      .then((res) => {
        setIsLoading(false);
        setCoupons(res.data.couponCodes);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, [seller._id]);

  const handleDelete = (id) => {
    axios
      .delete(`${server}/coupon/delete-coupon/${id}`, {
        withCredentials: true,
      })
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
        toast.success("Mã giảm giá đã được xóa thành công");
        setCoupons(coupons.filter((coupon) => coupon._id !== id));
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/coupon/add-coupon-code`,
        {
          name,
          code,
          discountType,
          discountValue,
          maxUses,
          expiryDate,
          selectedProduct,
          shopId: seller._id,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Mã giảm giá đã được thêm thành công");
        setOpen(false);
        setCoupons([...coupons, res.data.couponCode]);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Đang tải...
        </div>
      ) : (
        <Card className="w-full mx-auto m-4">
          <div className="flex justify-between items-center mb-6">
            <CardHeader>
              <CardTitle>Quản lý mã giảm giá</CardTitle>
            </CardHeader>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild className="m-3 mx-5">
                <Button>Thêm mã giảm giá</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Thêm mã giảm giá mới</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="name" className="text-right">
                        Tên
                      </Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="code" className="text-right">
                        Mã
                      </Label>
                      <Input
                        id="code"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="discountType" className="text-right">
                        Loại giảm giá
                      </Label>
                      <Select
                        onValueChange={(value) => setDiscountType(value)}
                        defaultValue={discountType}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Chọn loại giảm giá" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Phần trăm</SelectItem>
                          <SelectItem value="fixed">Cố định</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="discountValue" className="text-right">
                        Giá trị giảm giá
                      </Label>
                      <Input
                        id="discountValue"
                        type="number"
                        value={discountValue}
                        onChange={(e) => setDiscountValue(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="maxUses" className="text-right">
                        Số lần sử dụng tối đa
                      </Label>
                      <Input
                        id="maxUses"
                        type="number"
                        value={maxUses}
                        onChange={(e) => setMaxUses(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="expiryDate" className="text-right">
                        Ngày hết hạn
                      </Label>
                      <Input
                        id="expiryDate"
                        type="date"
                        value={expiryDate}
                        onChange={(e) => setExpiryDate(e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="selectedProduct" className="text-right">
                        Sản phẩm áp dụng
                      </Label>
                      <Select
                        onValueChange={(value) => setSelectedProduct(value)}
                        defaultValue={selectedProduct}
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Chọn sản phẩm" />
                        </SelectTrigger>
                        <SelectContent>
                          {products &&
                            products.map((product) => (
                              <SelectItem key={product._id} value={product._id}>
                                {product.name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="flex justify-end">
                    <Button type="submit">Thêm mã giảm giá</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
          <CardContent>
            {!coupons || coupons.length === 0 ? (
              <div className="w-full mx-auto m-4">
                <CardContent>
                  <p>Không có mã giảm giá nào.</p>
                </CardContent>
              </div>
            ) : (
              <ScrollArea className="h-[700px]">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tên</TableHead>
                      <TableHead>Mã</TableHead>
                      <TableHead>Loại giảm giá</TableHead>
                      <TableHead className="text-center">
                        Giá trị giảm giá
                      </TableHead>
                      <TableHead className="text-center">
                        Số lần sử dụng
                      </TableHead>
                      <TableHead className="text-center">
                        Ngày hết hạn
                      </TableHead>
                      <TableHead className="text-center">Hành động</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon._id}>
                        <TableCell>{coupon.name}</TableCell>
                        <TableCell>{coupon.code}</TableCell>
                        <TableCell>{coupon.discountType}</TableCell>
                        <TableCell className="text-center">
                          {coupon.discountValue}
                        </TableCell>
                        <TableCell className="text-center">{`${coupon.usedCount}/${coupon.maxUses}`}</TableCell>
                        <TableCell className="text-center">
                          {moment(coupon.expiryDate)
                            .tz("Asia/Ho_Chi_Minh")
                            .format("DD-MM-YYYY | HH:mm")}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleDelete(coupon._id)}
                          >
                            <AiOutlineDelete className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default AllCoupons;
