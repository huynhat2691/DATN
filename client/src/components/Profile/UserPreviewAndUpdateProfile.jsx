import { toast } from "react-toastify";
import { loadUser, updateUserInfo } from "../../redux/actions/user";
import { server } from "../../server";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const maskString = (str, start, end) => {
  str = String(str); // Chuyển đổi thành chuỗi
  if (str.length <= start + end) return str;
  return (
    str.slice(0, start) + "*".repeat(str.length - start - end) + str.slice(-end)
  );
};

const UserPreviewAndUpdateProfile = () => {
  const { user, error, successMessage } = useSelector((state) => state.user);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [phoneNumber, setPhoneNumber] = useState(user && user.phoneNumber);
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState();
  const [maskedEmail, setMaskedEmail] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      dispatch({ type: "clearErrors" });
    }

    if (successMessage) {
      toast.success(successMessage);
      dispatch({ type: "clearMessage" });
    }
  }, [error, dispatch, successMessage]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserInfo(email, password, phoneNumber, name));
    toast.success("Thông tin tài khoản cập nhật thành công");
  };

  const handleImage = async (e) => {
    e.preventDefault();

    const file = e.target.files[0];
    setAvatar(file);

    const reader = new FileReader();
    reader.onload = async () => {
      if (reader.readyState === 2) {
        try {
          // eslint-disable-next-line no-unused-vars
          const response = await axios.put(
            `${server}/user/update-user-avatar`,
            { image: reader.result },
            {
              withCredentials: true,
            }
          );
          dispatch(loadUser());
          toast.success("Ảnh đại diện cập nhật thành công");
        } catch (err) {
          toast.error(
            err.response?.data?.message ||
              "Có lỗi xảy ra khi cập nhật ảnh đại diện"
          );
        }
      }
    };
    reader.readAsDataURL(file);
  };

  useEffect(() => {
    if (email.includes("@")) {
      const [localPart, domain] = email.split("@");
      setMaskedEmail(maskString(localPart, 3, 2) + "@" + domain);
    } else {
      setMaskedEmail(email);
    }
  }, [email, phoneNumber]);

  return (
    <div className="w-full h-full">
      <div className="text-[20px] font-[600] mb-6 pb-2 flex border-b-[2px] border-gray-300">
        Thông tin tài khoản
      </div>
      <div className="flex items-center justify-center h-[500px]">
        <div>
          <div className="">
            <form onSubmit={handleSubmit} aria-required={true}>
              <div className="w-[450px] flex flex-col">
                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label htmlFor="email" className="w-[40%] flex justify-start">
                    Họ và Tên
                  </Label>
                  <Input
                    type="text"
                    id="text"
                    placeholder="Nhập họ và tên"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label htmlFor="email" className="w-[40%] flex justify-start">
                    Email
                  </Label>
                  <Input
                    disabled
                    type="email"
                    id="email"
                    placeholder="Nhập email"
                    value={maskedEmail}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white"
                  />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label
                    htmlFor="phoneNumber"
                    className="w-[40%] flex justify-start"
                  >
                    Số điện thoại
                  </Label>
                  <Input
                    type="tel"
                    id="phoneNumber"
                    placeholder="Nhập số điện thoại"
                    required
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>

                <div className="flex w-full max-w-sm items-center gap-1.5 my-3">
                  <Label htmlFor="email" className="w-[40%] flex justify-start">
                    Mật khẩu
                  </Label>
                  <Input
                    type="password"
                    id="password"
                    placeholder="Nhập mật khẩu"
                    required
                    value={password}
                    min={1}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <Button className="w-full mt-3 flex max-w-sm">Cập nhật</Button>
              </div>
            </form>
          </div>
        </div>
        <div className="w-[1px] bg-gray-300 rounded h-[250px] mx-3" />
        <div className="flex justify-center mx-10">
          <div>
            <Avatar className="size-[150px] rounded-full object-cover ">
              <AvatarImage
                src={avatar ? URL.createObjectURL(avatar) : user.avatar}
                alt={user?.name}
                className="object-cover"
              />
              <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar>

            <div className="w-full mt-5 flex items-center justify-center cursor-pointer ">
              <div className="h-[40px] font-[600] min-w-[110px] flex items-center justify-center text-[14px] rounded cursor-pointer border bg-[#f5f5f0] hover:bg-[#e6e6e6] transition-all duration-300">
                <input
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={handleImage}
                />
                <label htmlFor="image">
                  <p className="cursor-pointer">Chọn ảnh</p>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPreviewAndUpdateProfile;
