/* eslint-disable react/prop-types */

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { server } from "../../server";
import { useSelector } from "react-redux";
import {
  BookUser,
  Lock,
  LogOut,
  MessageSquare,
  Shield,
  ShoppingBag,
  UserRound,
} from "lucide-react";

const ProfileSidebar = ({ active, setActive }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);

  const logoutHandler = () => {
    // localStorage.clear();
    // navigate("/login");
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
    <div className="w-full my-4 bg-white shadow-sm flex flex-col justify-around font-[500] border rounded-lg">
      <Link
        to="/profile/account"
        className={`${
          active === 1 ? "text-[red] p-6 px-8 rounded-t-xl" : "p-6 px-8 "
        } flex items-center cursor-pointer w-full`}
        onClick={() => setActive(1)}
      >
        <UserRound size={22} className="mr-3" />
        <span>Thông tin tài khoản</span>
      </Link>

      <Link
        to="/profile/orders"
        className={`${
          active === 2 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
        } flex items-center cursor-pointer w-full`}
        onClick={() => setActive(2)}
      >
        <ShoppingBag size={22} className="mr-3" />
        <span>Quản lý đơn hàng</span>
      </Link>

      {/* <Link to="/profile/refunds"
        className={`${
          active === 3 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
        } flex items-center cursor-pointer w-full`}
        onClick={() => setActive(3)}
      >
        <Undo2 size={22} className="mr-3" />
        <span>Quản lý đổi trả</span>
      </Link> */}

      <Link
        to="/profile/inbox"
        className={`${
          active === 4 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
        } flex items-center cursor-pointer w-full`}
        onClick={() => setActive(4)}
      >
        <MessageSquare size={22} className="mr-3" />
        <span>Quản lý tin nhắn</span>
      </Link>

      <Link
        to="/profile/change-password"
        className={`${
          active === 6 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
        } flex items-center cursor-pointer w-full`}
        onClick={() => setActive(6)}
      >
        <Lock size={22} className="mr-3" />
        <span>Đổi mật khẩu</span>
      </Link>

      <Link
        to="/profile/addresses"
        className={`${
          active === 7 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
        } flex items-center cursor-pointer w-full`}
        onClick={() => setActive(7)}
      >
        <BookUser size={22} className="mr-3" />
        <span>Sổ địa chỉ</span>
      </Link>

      {user && user?.role === "Admin" && (
        <Link to="/admin/dashboard">
          <div
            className={`${
              active === 8 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
            } flex items-center cursor-pointer w-full`}
            onClick={() => setActive(8)}
          >
            <Shield size={22} className="mr-3" />
            <span>Admin Dashboard</span>
          </div>
        </Link>
      )}

      <div
        className={`${
          active === 8 ? "text-[red] p-6 px-8 rounded-xl" : "p-6 px-8"
        } flex items-center cursor-pointer w-full`}
        onClick={logoutHandler}
      >
        <LogOut size={22} className="mr-3" />
        <span>Đăng xuất</span>
      </div>
    </div>
  );
};

export default ProfileSidebar;
