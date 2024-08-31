import { useDispatch, useSelector } from "react-redux";
import { server } from "../../server";
import { useEffect, useState } from "react";
import axios from "axios";
import { loadSeller } from "../../redux/actions/user";
import { toast } from "react-toastify";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ShopSettings = () => {
  const { seller } = useSelector((state) => state.seller);
  const [avatar, setAvatar] = useState();
  const [name, setName] = useState(seller && seller.name);
  const [description, setDescription] = useState(
    seller && seller.description ? seller.description : ""
  );
  const [address, setAddress] = useState(
    seller && seller.ward + ", " + seller.district + ", " + seller.city
  );
  const [phoneNumber, setPhoneNumber] = useState(seller && seller.phoneNumber);
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setCities(response.data);
      } catch (error) {
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const handleCityChange = (cityId) => {
    setSelectedCity(cityId);
    setSelectedDistrict("");
    setSelectedWard("");
    const city = cities.find((c) => c.Id === cityId);
    setDistricts(city ? city.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedWard("");
    const city = cities.find((c) => c.Id === selectedCity);
    const district = city.Districts.find((d) => d.Id === districtId);
    setWards(district ? district.Wards : []);
  };

  const handleWardChange = (wardId) => {
    setSelectedWard(wardId);
  };

  const handleAddressConfirm = () => {
    const cityName = cities.find((c) => c.Id === selectedCity)?.Name;
    const districtName = districts.find((d) => d.Id === selectedDistrict)?.Name;
    const wardName = wards.find((w) => w.Id === selectedWard)?.Name;

    if (cityName && districtName && wardName) {
      setAddress(`${wardName}, ${districtName}, ${cityName}`);
    }
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
            `${server}/shop/update-shop-avatar`,
            { image: reader.result },
            {
              withCredentials: true,
            }
          );
          dispatch(loadSeller());
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

  const updateHandler = async (e) => {
    e.preventDefault();

    // Split the address into ward, district, and city
    const [ward, district, city] = address.split(", ");

    try {
      await axios.put(
        `${server}/shop/update-shop-info`,
        {
          name,
          description,
          ward,
          district,
          city,
          phoneNumber,
          password,
        },
        {
          withCredentials: true,
        }
      );
      toast.success("Thông tin shop cập nhật thành công");
      dispatch(loadSeller());
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <Card className="w-full m-4 rounded-lg border">
      <CardHeader>
        <CardTitle>Thông tin shop</CardTitle>
        <CardDescription>Cập nhật thông tin shop tại đây</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center mb-6 ">
          <div className="flex items-center">
            <Avatar className="w-32 h-32 border">
              <AvatarImage
                src={avatar ? URL.createObjectURL(avatar) : seller?.avatar}
                alt="Shop Avatar"
                className="object-cover"
              />
              <AvatarFallback>{seller?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="w-full ml-5 flex items-center justify-center cursor-pointer ">
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

        <form onSubmit={updateHandler} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Tên</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nhập tên shop"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Mô tả</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Nhập mô tả"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="address">Địa chỉ</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Nhập địa chỉ"
                required
              />
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Thay đổi địa chỉ</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Chọn địa chỉ</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <Select
                      onValueChange={handleCityChange}
                      value={selectedCity}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Chọn tỉnh thành" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city.Id} value={city.Id}>
                            {city.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    {districts.length > 0 && (
                      <Select
                        onValueChange={handleDistrictChange}
                        value={selectedDistrict}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn quận huyện" />
                        </SelectTrigger>
                        <SelectContent>
                          {districts.map((district) => (
                            <SelectItem key={district.Id} value={district.Id}>
                              {district.Name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}

                    {wards.length > 0 && (
                      <Select
                        onValueChange={handleWardChange}
                        value={selectedWard}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn phường xã" />
                        </SelectTrigger>
                        <SelectContent>
                          {wards.map((ward) => (
                            <SelectItem key={ward.Id} value={ward.Id}>
                              {ward.Name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <Button onClick={handleAddressConfirm}>Xác nhận</Button>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber">Số điện thoại</Label>
            <Input
              id="phoneNumber"
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="zipCode">Đổi mật khẩu</Label>
            <Input
              id="zipCode"
              type="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>

          <Button type="submit" className="w-full">
            Cập nhật
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ShopSettings;
