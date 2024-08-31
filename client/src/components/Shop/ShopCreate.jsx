import { useState, useEffect } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { server } from "../../server";
import FooterLogin from "../Layout/FooterLogin";
import HeaderLoginShop from "../Layout/HeaderLoginShop";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ShopCreate = () => {
  const [email, setEmail] = useState("");
  const [shopName, setShopName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [visibleConfirm, setVisibleConfirm] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    fetchAddressData();
  }, []);

  const fetchAddressData = async () => {
    try {
      const response = await axios.get(
        "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
      );
      setAddressData(response.data);
    } catch (error) {
      console.error("Error fetching address data:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Mật khẩu hiện tại không khớp");
      return;
    }

    const shopData = {
      name: shopName,
      phoneNumber,
      email,
      city: selectedCity,
      district: selectedDistrict,
      ward: selectedWard,
      password,
    };

    try {
      const res = await axios.post(`${server}/shop/create-shop`, shopData);
      toast.success(res.data.message);
      setShopName("");
      setPhoneNumber("");
      setEmail("");
      setSelectedCity("");
      setSelectedDistrict("");
      setSelectedWard("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <>
      <HeaderLoginShop isRegisterShop={true} />
      <div className="h-[600px] bg-[#27b3e2] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="mx-auto">
          <div className="bg-white py-6 w-[700px] min-h-[480px] px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-8" onSubmit={handleSubmit}>
              <h2 className="px-8 pt-4 pb-1 text-center text-3xl font-[500] text-gray-900 m-h-[80px]">
                Đăng ký
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid grid-rows-4 gap-4">
                  <Input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Tên shop"
                    required
                  />

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    required
                  />

                  <div className="relative">
                    <Input
                      type={visible ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mật khẩu"
                      required
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

                  <div className="relative">
                    <Input
                      type={visibleConfirm ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Xác nhận mật khẩu"
                      required
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

                <div className="grid grid-rows-4 gap-4">
                  <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    placeholder="Số điện thoại"
                    required
                  />

                  <Select value={selectedCity} onValueChange={setSelectedCity}>
                    <SelectTrigger>
                      <SelectValue placeholder="Chọn tỉnh thành" />
                    </SelectTrigger>
                    <SelectContent>
                      {addressData.map((city) => (
                        <SelectItem key={city.Id} value={city.Name}>
                          {city.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  {selectedCity && (
                    <Select
                      value={selectedDistrict}
                      onValueChange={setSelectedDistrict}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn quận huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {addressData
                          .find((city) => city.Name === selectedCity)
                          ?.Districts.map((district) => (
                            <SelectItem key={district.Id} value={district.Name}>
                              {district.Name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}

                  {selectedDistrict && (
                    <Select
                      value={selectedWard}
                      onValueChange={setSelectedWard}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn phường xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {addressData
                          .find((city) => city.Name === selectedCity)
                          ?.Districts.find(
                            (district) => district.Name === selectedDistrict
                          )
                          ?.Wards.map((ward) => (
                            <SelectItem key={ward.Id} value={ward.Name}>
                              {ward.Name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-center">
                <Button type="submit" className="w-[40%] duration-300">
                  Đăng ký
                </Button>
              </div>

              <div
                className={`text-[14px] w-full flex items-center justify-center `}
              >
                <h4>Bạn đã có tài khoản?</h4>
                <Link to="/shop-login" className="text-[#27b3e2] pl-2">
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

export default ShopCreate;
