/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  BookUser,
  ClipboardList,
  CreditCard,
  Images,
  LayoutDashboard,
  Settings,
  ShoppingBag,
  Store,
  Tag,
  TicketPercent,
} from "lucide-react";

const AdminSidebar = ({ active }) => {
  return (
    <div className="w-[16rem] font-medium flex flex-col justify-around bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10 h-full">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/admin/dashboard" className="w-full flex items-center">
          <LayoutDashboard
            size={20}
            color={`${active === 1 ? "red" : "#555"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 1 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/add-banners" className="w-full flex items-center">
          <Images size={20} color={`${active === 2 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 2 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý banner
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link
          to="/admin/add-coupons-and-preview"
          className="w-full flex items-center"
        >
          <TicketPercent size={20} color={`${active === 3 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 3 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Phiếu giảm giá
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/orders" className="w-full flex items-center">
          <ClipboardList size={20} color={`${active === 4 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 4 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý đơn hàng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/sellers" className="w-full flex items-center">
          <Store size={20} color={`${active === 5 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 5 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý shop
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/users" className="w-full flex items-center">
          <BookUser size={20} color={`${active === 6 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 6 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý người dùng
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/products" className="w-full flex items-center">
          <ShoppingBag size={20} color={`${active === 7 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 7 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý sản phẩm
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/events" className="w-full flex items-center">
          <Tag size={20} color={`${active === 8 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 8 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý sự kiện
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/admin/withdraw-request" className="w-full flex items-center">
          <CreditCard size={20} color={`${active === 9 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 9 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Quản lý thanh toán
          </h5>
        </Link>
      </div>

      <div className="w-full flex items-center p-4">
        <Link to="/profile" className="w-full flex items-center">
          <Settings size={20} color={`${active === 10 ? "red" : "#555"}`} />
          <h5
            className={`hidden 800px:block pl-2 font-[600] text-[gray] ${
              active === 10 ? "text-[red]" : "text-[#555]"
            }`}
          >
            Cài đặt
          </h5>
        </Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
