/* eslint-disable react/prop-types */
import { MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";

const ShippingInfo = ({ selectedAddress, handleChangeAddress }) => {
  return (
    <div className="w-full bg-white rounded-lg border p-5">
      <div className="flex items-center mb-4">
        <MapPin size={20} className="mr-2" />
        <h5 className="text-[18px] font-[500]">Địa chỉ nhận hàng</h5>
      </div>
      {selectedAddress ? (
        <div className="w-full bg-white h-[80px] rounded-lg flex items-center justify-between shadow  px-5 font-[500] border">
          <div className="w-1/6 text-center">
            <p>{selectedAddress.fullname}</p>
            <p>0{selectedAddress.phoneNumber}</p>
          </div>
          <div className="w-1/2">
            <p className="break-words whitespace-normal ">
              {selectedAddress.address1}, {selectedAddress.ward},{" "}
              {selectedAddress.district}, {selectedAddress.province}
            </p>
          </div>
          <div className="w-1/12 flex items-center justify-center">
            <p className="w-[70px] border-[#27b3e2] border text-center text-[14px] text-[#27b3e2]">
              {selectedAddress.addressType}
            </p>
          </div>
          <div
            className="w-1/12 flex items-center justify-center text-[#27b3e2] cursor-pointer"
            onClick={handleChangeAddress}
          >
            Thay đổi
          </div>
        </div>
      ) : (
        <div className="w-full bg-white h-[70px] rounded-lg flex items-center shadow justify-between px-5 font-[500] border">
          <p>Vui lòng chọn địa chỉ giao hàng</p>
          <Link to="/profile/addresses">
            <Button>
              <span className="text-[#fff] flex items-center">
                Chọn địa chỉ
              </span>
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ShippingInfo;

