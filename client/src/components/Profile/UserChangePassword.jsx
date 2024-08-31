import axios from "axios";
import { useState } from "react";
import { server } from "../../server";
import { toast } from "react-toastify";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const UserChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const passwordChangeHandler = async (e) => {
    e.preventDefault();
    await axios
      .put(
        `${server}/user/update-user-password`,
        { password, newPassword, confirmPassword },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        toast.success("Mật khẩu thay đổi thành công");
        setPassword("");
        setNewPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        toast.error("Mật khẩu hiện tại không đúng, vui lòng nhập lại");
      });
  };

  return (
    <div className="w-full">
      <div className="text-[20px] font-[600] mb-14 pb-2 flex border-b-[2px] border-gray-300">
        Đổi mật khẩu
      </div>
      <div className="flex justify-center items-center py-10 ">
        <form aria-required onSubmit={passwordChangeHandler} className="">
          <div className="w-[60rem] flex flex-col items-center">
            <div className="flex w-[30rem] min-w-sm items-center gap-1.5 my-3">
              <Label className="w-[50%] flex justify-start">
                Nhập mật khẩu hiện tại
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu hiện tại"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="flex w-[30rem] min-w-sm items-center gap-1.5 my-3">
              <Label className="w-[50%] flex justify-start">
                Nhập mật khẩu mới
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Nhập mật khẩu mới"
                required
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>

            <div className="flex w-[30rem] min-w-sm items-center gap-1.5 my-3">
              <Label className="w-[50%] flex justify-start">
                Xác nhận mật khẩu
              </Label>
              <Input
                type="password"
                id="password"
                placeholder="Xác nhận mật khẩu"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <Button className="w-[30rem] min-w-sm mt-3 flex ">Cập nhật</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserChangePassword;
