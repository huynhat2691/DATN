import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { deleteUserAddress, updateUserAddress } from "../../redux/actions/user";
import axios from "axios";
import { Plus } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Separator } from "../ui/separator";

const UserAddress = () => {
  const [open, setOpen] = useState(false);
  const [provinces, setProvinces] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedWard, setSelectedWard] = useState("");
  const [address1, setAddress1] = useState("");
  const [fullname, setFullname] = useState("");
  const [addressType, setAddressType] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [editingAddress, setEditingAddress] = useState(null);
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const addressTypeData = [
    { name: "Mặc định" },
    { name: "Nhà" },
    { name: "Công ty" },
  ];

  useEffect(() => {
    const fetchProvinces = async () => {
      try {
        const response = await axios.get(
          "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json"
        );
        setProvinces(response.data);
      } catch (error) {
        console.error("Error fetching provinces:", error);
      }
    };
    fetchProvinces();
  }, []);

  const handleProvinceChange = (provinceId) => {
    setSelectedProvince(provinceId);
    setSelectedDistrict("");
    setSelectedWard("");
    const province = provinces.find((p) => p.Id === provinceId);
    setDistricts(province ? province.Districts : []);
    setWards([]);
  };

  const handleDistrictChange = (districtId) => {
    setSelectedDistrict(districtId);
    setSelectedWard("");
    const district = districts.find((d) => d.Id === districtId);
    setWards(district ? district.Wards : []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      addressType === "" ||
      selectedProvince === "" ||
      (districts.length > 0 && selectedDistrict === "") ||
      (wards.length > 0 && selectedWard === "") ||
      phoneNumber === ""
    ) {
      toast.error("Vui lòng điền vào tất cả các mục");
    } else {
      const province = provinces.find((p) => p.Id === selectedProvince);
      const district = districts.find((d) => d.Id === selectedDistrict);
      const ward = wards.find((w) => w.Id === selectedWard);

      const addressData = {
        fullname,
        phoneNumber,
        province: province ? province.Name : "",
        district: district ? district.Name : "",
        ward: ward ? ward.Name : "",
        address1,
        addressType,
      };

      if (editingAddress) {
        addressData._id = editingAddress._id;
      }

      dispatch(updateUserAddress(addressData));

      setOpen(false);
      resetForm();
      toast.success(
        editingAddress
          ? "Địa chỉ đã được cập nhật thành công"
          : "Địa chỉ đã được thêm thành công"
      );
    }
  };

  const resetForm = () => {
    setFullname("");
    setPhoneNumber("");
    setSelectedProvince("");
    setSelectedDistrict("");
    setSelectedWard("");
    setAddress1("");
    setAddressType("");
    setEditingAddress(null);
  };

  const handleDeleteAddress = (item) => {
    dispatch(deleteUserAddress(item._id));
  };

  const handleUpdateAddress = (address) => {
    setEditingAddress(address);
    setFullname(address.fullname);
    setPhoneNumber(address.phoneNumber);
    setAddress1(address.address1);
    setAddressType(address.addressType);

    // Find and set the province
    const province = provinces.find((p) => p.Name === address.province);
    if (province) {
      setSelectedProvince(province.Id);
      setDistricts(province.Districts);

      // Find and set the district
      const district = province.Districts.find(
        (d) => d.Name === address.district
      );
      if (district) {
        setSelectedDistrict(district.Id);
        setWards(district.Wards);

        // Find and set the ward
        const ward = district.Wards.find((w) => w.Name === address.ward);
        if (ward) {
          setSelectedWard(ward.Id);
        }
      }
    }

    setOpen(true);
  };

  return (
    <div className="w-full">
      <div className="flex w-full justify-between">
        <div className="text-[20px] font-[600] mb-5 pb-2 flex border-b-[2px] border-gray-300 w-[80%]">
          Địa chỉ của tôi
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button onClick={resetForm}>
              <Plus className="mr-2" size={24} />
              Thêm địa chỉ mới
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                {editingAddress ? "Cập nhật địa chỉ" : "Thêm địa chỉ mới"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="fullname" className="text-right">
                    Họ & Tên
                  </Label>
                  <Input
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                    className="col-span-3"
                    placeholder="Nhập họ & tên"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phoneNumber" className="text-right">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="col-span-3"
                    required
                    placeholder="Nhập số điện thoại"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="province" className="text-right">
                    Tỉnh/Thành phố
                  </Label>
                  <Select
                    onValueChange={handleProvinceChange}
                    value={selectedProvince}
                    required
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn tỉnh/thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((province) => (
                        <SelectItem key={province.Id} value={province.Id}>
                          {province.Name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {districts.length > 0 && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="district" className="text-right">
                      Quận/Huyện
                    </Label>
                    <Select
                      required
                      onValueChange={handleDistrictChange}
                      value={selectedDistrict}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn quận/huyện" />
                      </SelectTrigger>
                      <SelectContent>
                        {districts.map((district) => (
                          <SelectItem key={district.Id} value={district.Id}>
                            {district.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {wards.length > 0 && (
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="ward" className="text-right">
                      Phường/Xã
                    </Label>
                    <Select
                      required
                      onValueChange={setSelectedWard}
                      value={selectedWard}
                    >
                      <SelectTrigger className="col-span-3">
                        <SelectValue placeholder="Chọn phường/xã" />
                      </SelectTrigger>
                      <SelectContent>
                        {wards.map((ward) => (
                          <SelectItem key={ward.Id} value={ward.Id}>
                            {ward.Name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address1" className="text-right">
                    Địa chỉ cụ thể
                  </Label>
                  <Input
                    id="address1"
                    value={address1}
                    onChange={(e) => setAddress1(e.target.value)}
                    className="col-span-3"
                    required
                    placeholder="Nhập địa chỉ cụ thể"
                  />
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="addressType" className="text-right">
                    Loại địa chỉ
                  </Label>
                  <Select
                    onValueChange={setAddressType}
                    value={addressType}
                    required
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Chọn loại địa chỉ" />
                    </SelectTrigger>
                    <SelectContent>
                      {addressTypeData.map((item) => (
                        <SelectItem key={item.name} value={item.name}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end">
                <Button type="submit">
                  {editingAddress ? "Cập nhật" : "Thêm mới"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      <br />
      {user &&
        user.addresses.map((item, index) => (
          <div
            className="w-full bg-white h-full border rounded-lg shadow my-2 px-5 py-5 flex items-center justify-between"
            key={index}
          >
            <div>
              <div className="flex items-center mb-1">
                <p className="text-[16px] font-[500]">
                  {item.fullname ? item.fullname : user.name}
                </p>
                <Separator
                  orientation="vertical"
                  className="w-[1px] h-[20px] mx-2 bg-[gray]"
                />
                <p className="text-[14px] text-[gray]">0{item.phoneNumber}</p>
              </div>
              <div className="text-[gray] text-[14px] mb-2">
                <p>{item.address1}</p>
                <p>
                  {item.ward}, {item.district}, {item.province}
                </p>
              </div>
              <div>
                <Label className="border px-2 py-1 border-[#27b3e2] text-[#27b3e2]">
                  {item.addressType}
                </Label>
              </div>
            </div>
            <div className="flex items-center flex-col ">
              <Button
                className="mb-2 w-full"
                onClick={() => handleUpdateAddress(item)}
              >
                Cập nhật
              </Button>
              <Button
                className="w-full"
                variant="destructive"
                onClick={() => handleDeleteAddress(item)}
              >
                Xóa
              </Button>
            </div>
          </div>
        ))}
      {user && user.addresses.length === 0 && (
        <div className="w-full bg-white h-[70px] rounded-[4px] border flex items-center px-3 shadow justify-center pr-10 mb-5">
          <p className="pl-5 font-[600]">Bạn chưa có địa chỉ nào</p>
        </div>
      )}
    </div>
  );
};

export default UserAddress;
