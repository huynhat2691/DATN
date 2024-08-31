import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AllCancelledOrders from "../../components/Shop/AllCancelledOrders";

const ShopAllCancelledOrders = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[60px] 800px:w-[16rem]">
          <DashboardSidebar active={13} />
        </div>
        <div className="w-full justify-center flex">
          <AllCancelledOrders />
        </div>
      </div>
    </div>
  );
};

export default ShopAllCancelledOrders;
