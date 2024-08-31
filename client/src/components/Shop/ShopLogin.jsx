/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import FooterLogin from "../Layout/FooterLogin";
import HeaderLoginShop from "../Layout/HeaderLoginShop";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const ShopLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .post(
        `${server}/shop/login-shop`,
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        toast.error(err.response.data.message);
      });
  };

  return (
    <>
      <HeaderLoginShop isRegisterShop={false}/>
      <div className="h-[600px] bg-[#27b3e2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="bg-white py-8 w-[400px] min-h-[480px] px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <h2 className="px-8 py-6 text-center text-3xl font-[500] text-gray-900 m-h-[80px]">
                Đăng nhập
              </h2>
              <div>
                <div className="mt-1">
                  <Input
                    placeholder="Email"
                    type="email"
                    name="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div>
                <div className="mt-1 relative">
                  <Input
                    type={visible ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mật khẩu"
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
              <div className={`${styles.normalFlex} justify-between`}>
                <div className={`${styles.normalFlex}`}>
                  <input
                    type="checkbox"
                    name="remember-me"
                    id="remember-me"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Nhớ tài khoản
                  </label>
                </div>
                <div className="text-sm">
                  <a
                    href=".forgot-password"
                    className="font-medium text-[#27b3e2] hover:text-[#27b3e2] duration-300"
                  >
                    Quên mật khẩu
                  </a>
                </div>
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full duration-300"
                >
                  Đăng nhập
                </Button>
              </div>
              <div className={`text-[14px] w-full flex items-center justify-center `}>
                <h4>Bạn mới biết đến eCommUnity?</h4>
                <Link to="/shop-create" className="text-[#27b3e2] pl-2">
                  Đăng ký
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

export default ShopLogin;
