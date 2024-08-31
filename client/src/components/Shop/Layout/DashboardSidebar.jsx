/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import {
  ClipboardList,
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  ShoppingBag,
  Tag,
} from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../ui/accordion";
import { useSelector } from "react-redux";

const DashboardSidebar = ({ active }) => {
  const { seller } = useSelector((state) => state.seller);

  return (
    <div className="w-[16rem] font-medium flex flex-col justify-start bg-white shadow-sm overflow-y-auto sticky top-0 left-0 z-10 h-[calc(100vh-60px)] custom-scrollbar ">
      {/* single item */}
      <div className="w-full flex items-center p-4">
        <Link to="/dashboard" className="w-full flex items-center font-[600] ">
          <LayoutDashboard
            size={20}
            color={`${active === 1 ? "red" : "gray"}`}
          />
          <h5
            className={`hidden 800px:block pl-2 ${
              active === 1 ? "text-[red]" : "text-[gray]"
            }`}
          >
            Dashboard
          </h5>
        </Link>
      </div>

      <Accordion
        defaultValue={[
          "order-management",
          "product-management",
          "sales-management",
          "settings-management",
          "customers-management",
        ]}
        type="multiple"
        className="w-full"
      >
        <AccordionItem value="order-management" className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline ">
            <div className="flex items-center text-[gray] font-[600] ">
              <ClipboardList size={20} />
              <h5 className="pl-2">Quản Lý Đơn Hàng</h5>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              to="/dashboard/orders"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 2 ? "text-[red]" : "text-black"
                }`}
              >
                Danh Sách Đơn Hàng
              </h5>
            </Link>
            <Link
              to="/dashboard/refunds"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 3 ? "text-[red]" : "text-black"
                }`}
              >
                Trả Hàng/Hoàn Tiền
              </h5>
            </Link>
            <Link
              to="/dashboard/cancelled-orders"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 13 ? "text-[red]" : "text-black"
                }`}
              >
                Đơn huỷ
              </h5>
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="product-management" className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center text-[gray] font-[600] ">
              <ShoppingBag size={20} />
              <h5 className="pl-2">Quản Lý Sản Phẩm</h5>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              to="/dashboard/products"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 4 ? "text-[red]" : "text-black"
                }`}
              >
                Danh Sách Sản Phẩm
              </h5>
            </Link>
            <Link
              to="/dashboard/add-product"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 5 ? "text-[red]" : "text-black"
                }`}
              >
                Thêm Sản Phẩm
              </h5>
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sales-management" className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center text-[gray] font-[600] ">
              <Tag size={20} />
              <h5 className="pl-2">Kênh Marketing</h5>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              to="/dashboard/events"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 6 ? "text-[red]" : "text-black"
                }`}
              >
                Flash Sale Của Shop
              </h5>
            </Link>
            <Link
              to="/dashboard/add-event"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 7 ? "text-[red]" : "text-black"
                }`}
              >
                Thêm Flash Sale
              </h5>
            </Link>
            <Link
              to="/dashboard/coupons"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 8 ? "text-[red]" : "text-black"
                }`}
              >
                Mã Giảm Giá Của Shop
              </h5>
            </Link>
          </AccordionContent>
        </AccordionItem>

        <div className="w-full flex items-center p-4 font-[600]">
          <Link
            to="/dashboard/withdraw-money"
            className="w-full flex items-center "
          >
            <CreditCard size={20} color={`${active === 9 ? "red" : "gray"}`} />
            <h5
              className={`hidden 800px:block pl-2 ${
                active === 9 ? "text-[red]" : "text-[gray]"
              }`}
            >
              Thanh toán
            </h5>
          </Link>
        </div>

        <AccordionItem value="customers-management" className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center text-[gray] font-[600] ">
              <MessageSquare size={20} />
              <h5 className="pl-2">Chăm sóc khách hàng</h5>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link
              to="/dashboard/messages"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 10 ? "text-[red]" : "text-black"
                }`}
              >
                Quản Lý Tin Nhắn
              </h5>
            </Link>
            <Link
              to="/dashboard/ratings"
              className="w-full flex items-center p-2 pl-11"
            >
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 11 ? "text-[red]" : "text-black"
                }`}
              >
                Quản Lý Đánh Giá
              </h5>
            </Link>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="settings-management" className="border-none">
          <AccordionTrigger className="p-4 hover:no-underline">
            <div className="flex items-center text-[gray] font-[600] ">
              <Settings size={20} />
              <h5 className="pl-2">Quản Lý Shop</h5>
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <Link to="/settings" className="w-full flex items-center p-2 pl-11">
              <h5
                className={`hidden 800px:block text-[14px] ${
                  active === 12 ? "text-[red]" : "text-black"
                }`}
              >
                Hồ Sơ Shop
              </h5>
            </Link>
            <Link
              to={`/shop/${seller?._id}`}
              className="w-full flex items-center p-2 pl-11"
            >
              <h5 className="text-black">Tổng Quan Shop</h5>
            </Link>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default DashboardSidebar;
