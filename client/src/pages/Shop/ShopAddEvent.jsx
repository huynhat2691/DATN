import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AddEvent from "../../components/Shop/AddEvent";

const ShopAddEvent = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem]">
          <DashboardSidebar active={7} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <AddEvent />
        </div>
      </div>
    </div>
  );
};

export default ShopAddEvent;

