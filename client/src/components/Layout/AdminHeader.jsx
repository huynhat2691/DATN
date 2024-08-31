import { Link, useNavigate } from "react-router-dom";
import { server } from "../../server";
import { useSelector } from "react-redux";
import logo from "../../assets/logo4.png";
import {
  CalendarDays,
  Package,
  ShoppingBag,
  TicketPercent,
} from "lucide-react";
import { useRef, useState } from "react";
import axios from "axios";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const AdminHeader = () => {
  const { user } = useSelector((state) => state.user);

  //popover
  const [showPopover, setShowPopover] = useState(false);
  const popoverRef = useRef(null);
  const timerRef = useRef(null);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current);
    setShowPopover(true);
  };

  const handleMouseLeave = () => {
    timerRef.current = setTimeout(() => {
      setShowPopover(false);
    }, 300);
  };

  const logoutHandler = () => {
    axios
      .get(`${server}/user/logout`, { withCredentials: true })
      .then((res) => {
        console.log(res.data.message);
        window.location.reload(true);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="w-full h-[60px] bg-white border-b sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-center w-[270px] justify-between">
        <Link to="/">
          <img src={logo} className="w-[200px]" alt="" />
        </Link>
        <p className="text-[16px] font-[500]">Quản trị</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mr-4">
          <Link
            to="/admin/add-coupons-and-preview"
            className="800px:block hidden"
          >
            <TicketPercent className="h-5 w-5 mx-5 cursor-pointer" />
          </Link>
          <Link to="/admin/orders" className="800px:block hidden">
            <ShoppingBag className="h-5 w-5 mx-5 cursor-pointer" />
          </Link>

          <Link to="/admin/products" className="800px:block hidden">
            <Package className="h-5 w-5 mx-5 cursor-pointer" />
          </Link>

          <Link to="/admin/events" className="800px:block hidden">
            <CalendarDays className="h-5 w-5 mx-5 cursor-pointer" />
          </Link>
          <div
            className="relative cursor-pointer ml-3"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={popoverRef}
          >
            <Link to="/profile/account" className="flex items-center">
              <Avatar className="size-[32px] rounded-full object-cover mx-3">
                <AvatarImage
                  src={user.avatar}
                  alt={user?.name}
                  className="object-cover"
                />
                <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
              </Avatar>
              <p className="text-[14px] font-[500]">{user?.name}</p>
            </Link>
            {showPopover && (
              <div
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 font-[500]"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={(e) => e.stopPropagation()}
              >
                <Link
                  to="/profile/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Thông tin tài khoản
                </Link>
                <button
                  onClick={logoutHandler}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Đăng xuất
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminHeader;
