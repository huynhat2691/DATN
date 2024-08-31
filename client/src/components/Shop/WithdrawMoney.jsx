import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllOrdersOfShop } from "../../redux/actions/order";
import axios from "axios";
import { server } from "../../server";
import { toast } from "react-toastify";
import { loadSeller } from "../../redux/actions/user";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Card, CardContent, CardTitle } from "../ui/card";
import { Trash } from "lucide-react";

const WithdrawMoney = () => {
  const { seller } = useSelector((state) => state.seller);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(100000);
  const [bankInfo, setBankInfo] = useState({
    bankName: "",
    country: "",
    swiftCode: null,
    accountNumber: null,
    holderName: "",
    bankAddress: "",
  });

  useEffect(() => {
    dispatch(getAllOrdersOfShop(seller._id));
  }, [dispatch, seller._id]);

  const fetchSellerData = useCallback(() => {
    dispatch(loadSeller());
  }, [dispatch]);

  useEffect(() => {
    const intervalId = setInterval(fetchSellerData, 60000);
    return () => clearInterval(intervalId);
  }, [fetchSellerData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const withdrawMethod = {
      bankName: bankInfo.bankName,
      country: bankInfo.country,
      swiftCode: bankInfo.swiftCode,
      accountNumber: bankInfo.accountNumber,
      holderName: bankInfo.holderName,
      bankAddress: bankInfo.bankAddress,
    };

    setPaymentMethod(false);

    try {
      await axios.put(
        `${server}/shop/update-seller-withdraw-method`,
        { withdrawMethod },
        { withCredentials: true }
      );
      toast.success("Phương thức thanh toán đã được cập nhật thành công");
      fetchSellerData();
      setBankInfo({
        bankName: "",
        country: "",
        swiftCode: null,
        accountNumber: null,
        holderName: "",
        bankAddress: "",
      });
    } catch (err) {
      console.log(err.response.data.message);
      toast.error("Lỗi khi cập nhật phương thức thanh toán");
    }
  };

  const deleteHandler = async () => {
    try {
      await axios.delete(`${server}/shop/delete-withdraw-method`, {
        withCredentials: true,
      });
      toast.success("Xóa phương thức thanh toán thành công");
      fetchSellerData();
    } catch (err) {
      console.log(err.response.data.message);
      toast.error("Lỗi khi xóa phương thức thanh toán");
    }
  };

  const withdrawHandler = async () => {
    const availableBalanceNumber = parseFloat(availableBalance);
    const withdrawAmountNumber = parseFloat(withdrawAmount);

    if (withdrawAmountNumber < 100000) {
      toast.error("Bạn không thể rút ít hơn 100.000₫");
    } else if (withdrawAmountNumber > availableBalanceNumber) {
      toast.error("Bạn không thể rút nhiều hơn số dư khả dụng của mình");
    } else {
      try {
        await axios.post(
          `${server}/withdraw/create-withdraw-request`,
          { amount: withdrawAmountNumber },
          { withCredentials: true }
        );
        toast.success("Yêu cầu thanh toán đã được tạo thành công");
        fetchSellerData();
        setWithdrawAmount(100000);
      } catch (err) {
        console.log(err.response.data.message);
        toast.error("Lỗi khi tạo yêu cầu thanh toán");
      }
    }
  };

  const error = () => toast.error("Bạn không thể rút ít hơn 100.000₫");

  const availableBalance = seller?.availableBalance;

  return (
    <Card className="w-full m-4 h-[51rem]">
      <CardContent className="flex items-center justify-center flex-col h-full">
        <CardTitle className="text-2xl pb-4">
          Số dư khả dụng: {availableBalance}
          <sup>₫</sup>
        </CardTitle>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button
              onClick={() =>
                availableBalance < 100000 ? error() : setOpen(true)
              }
            >
              Gửi yêu cầu thanh toán
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {paymentMethod
                  ? "Thêm phương thức thanh toán"
                  : "Các phương thức thanh toán có sẵn"}
              </DialogTitle>
            </DialogHeader>
            {paymentMethod ? (
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4 ">
                  {Object.entries(bankInfo).map(([key, value]) => (
                    <div
                      key={key}
                      className="grid grid-cols-4 items-center gap-4"
                    >
                      <Label htmlFor={key} className="text-right">
                        {(() => {
                          switch (key) {
                            case "bankName":
                              return "Tên ngân hàng";
                            case "country":
                              return "Quốc gia";
                            case "swiftCode":
                              return "Mã SWIFT";
                            case "accountNumber":
                              return "Số tài khoản";
                            case "holderName":
                              return "Tên chủ tài khoản";
                            case "bankAddress":
                              return "Địa chỉ ngân hàng";
                            default:
                              return key.charAt(0).toUpperCase() + key.slice(1);
                          }
                        })()}
                      </Label>
                      <Input
                        id={key}
                        type={key === "accountNumber" ? "number" : "text"}
                        value={value}
                        onChange={(e) =>
                          setBankInfo({ ...bankInfo, [key]: e.target.value })
                        }
                        className="col-span-3"
                      />
                    </div>
                  ))}
                </div>
                <Button type="submit" className="w-full">
                  Thêm
                </Button>
              </form>
            ) : (
              <>
                {seller && seller?.withdrawMethod ? (
                  <div className="grid gap-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p>Tên ngân hàng: {seller.withdrawMethod.bankName}</p>
                        <p>
                          Số tài khoản:{" "}
                          {seller.withdrawMethod.accountNumber.slice(0, 4)}*****
                          {seller.withdrawMethod.accountNumber.slice(-3)}
                        </p>
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        onClick={deleteHandler}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                    <p>
                      Số dư khả dụng: {availableBalance}
                      <sup>₫</sup>
                    </p>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        placeholder="Enter Amount"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <Button onClick={withdrawHandler}>Thanh toán</Button>
                    </div>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    <p>Chưa có phương thức thanh toán nào</p>
                    <Button onClick={() => setPaymentMethod(true)}>
                      Thêm phương thức thanh toán
                    </Button>
                  </div>
                )}
              </>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};

export default WithdrawMoney;
