import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { backend_url, server } from "../../../server";
import {
  ChevronDown,
  ClipboardList,
  LayoutDashboard,
  MessageSquare,
  ShoppingBag,
  Tag,
  TicketPercent,
} from "lucide-react";
import axios from "axios";
import logo from "../../../assets/logo4.png";
import { Button } from "../../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../../ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../ui/tooltip";

const DashboardHeader = () => {
  const { seller } = useSelector((state) => state.seller);
  const navigate = useNavigate();

  const logoutHandler = async () => {
    axios.get(`${server}/shop/logout-shop`, {
      withCredentials: true,
    });
    window.location.reload();
    navigate("/shop-login");
  };

  const getAvatarSrc = (avatar) => {
    if (avatar && avatar.startsWith("data:image")) {
      return avatar;
    } else if (avatar) {
      return `${backend_url}${avatar}`;
    }
    return "";
  };

  return (
    <div className="w-full h-[60px] bg-white border-b sticky top-0 left-0 z-30 flex items-center justify-between px-4">
      <div className="flex items-center w-[320px] justify-between">
        <Link to="/">
          <img src={logo} className="w-[200px]" alt="" />
        </Link>
        <p className="text-[16px] font-medium">Kênh bán hàng</p>
      </div>
      <div className="flex items-center">
        <div className="flex items-center mx-4">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard" className="800px:block hidden">
                  <LayoutDashboard className="h-5 w-5 mx-5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Bảng điều khiển</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard/coupons" className="800px:block hidden">
                  <TicketPercent className="h-5 w-5 mx-5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mã giảm giá</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard/events" className="800px:block hidden">
                  <Tag className="h-5 w-5 mx-5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sale</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard/products" className="800px:block hidden">
                  <ShoppingBag className="h-5 w-5 mx-5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Sản phẩm</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard/orders" className="800px:block hidden">
                  <ClipboardList className="h-5 w-5 mx-5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Đơn hàng</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Link to="/dashboard/messages" className="800px:block hidden">
                  <MessageSquare className="h-5 w-5 mx-5 cursor-pointer" />
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <p>Tin nhắn</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center font-medium">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage
                    src={getAvatarSrc(seller?.avatar)}
                    alt={seller?.name}
                    className="object-cover"
                  />
                  <AvatarFallback>{seller?.name?.charAt(0)}</AvatarFallback>
                </Avatar>

                {seller?.name}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link to={`/shop/${seller?._id}`}>Tổng quan shop</Link>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={logoutHandler}>
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
