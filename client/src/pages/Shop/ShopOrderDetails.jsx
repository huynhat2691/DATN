import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import OrderDetails from "../../components/Shop/OrderDetails";

const ShopOrderDetails = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
        <div className="w-[60px] 800px:w-[16rem]">
          <DashboardSidebar active={2} />
        </div>
        <div className="w-full justify-center flex">
          <OrderDetails />
        </div>
      </div>
    </div>
  );
};

export default ShopOrderDetails;
