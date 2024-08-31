import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";

import HeaderLogin from "../Layout/HeaderLogin";
import FooterLogin from "../Layout/FooterLogin";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "react-toastify";

const Register = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu và xác nhận mật khẩu không khớp");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const userData = {
      name,
      email,
      password,
    };

    axios
      .post(`${server}/user/create-user`, userData, config)
      .then((res) => {
        toast.success(res.data.message);
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
      })
      .catch((err) => {
        if (err.response) {
          // Lỗi từ server
          toast.error(err.response.data.message);
        } else if (err.request) {
          // Lỗi không nhận được phản hồi từ server
          toast.error("Không thể kết nối đến server. Vui lòng thử lại sau.");
        } else {
          // Lỗi khác
          toast.error("Có lỗi xảy ra. Vui lòng thử lại.");
        }
        console.error("Error:", err);
      });
  };

  return (
    <>
      <HeaderLogin isRegister={true} />
      <div className="h-[600px] bg-[#27b3e2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="bg-white py-8 w-[400px] min-h-[480px] px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-5" onSubmit={handleSubmit}>
              <h2 className="px-8 pt-6 pb-1 text-center text-3xl font-[500] text-gray-900 m-h-[80px]">
                Đăng ký
              </h2>
              <div>
                <div className="mt-1">
                  <Input
                    type="text"
                    name="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Họ và tên"
                  />
                </div>
              </div>
              <div>
                <div className="mt-1">
                  <Input
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                  />
                </div>
              </div>
              <div>
                <div className="mt-1 relative">
                  <Input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="new-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
                  />
                  {visible ? (
                    <FaEye
                      className="absolute right-3 top-[10px] text-xl cursor-pointer"
                      onClick={() => setVisible(false)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-3 top-[10px] text-xl cursor-pointer"
                      onClick={() => setVisible(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <div className="mt-1 relative">
                  <Input
                    type={visibleConfirm ? "text" : "password"}
                    name="confirmPassword"
                    autoComplete="new-password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Xác nhận mật khẩu"
                  />
                  {visibleConfirm ? (
                    <FaEye
                      className="absolute right-3 top-[10px] text-xl cursor-pointer"
                      onClick={() => setVisibleConfirm(false)}
                    />
                  ) : (
                    <FaEyeSlash
                      className="absolute right-3 top-[10px] text-xl cursor-pointer"
                      onClick={() => setVisibleConfirm(true)}
                    />
                  )}
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full duration-300"
                >
                  Đăng ký
                </Button>
              </div>
              <div
                className={`text-[14px] w-full flex items-center justify-center `}
              >
                <h4>Bạn đã có tài khoản?</h4>
                <Link to="/login" className="text-[#27b3e2] pl-2">
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FooterLogin />
    </>
  );
};

export default Register;
