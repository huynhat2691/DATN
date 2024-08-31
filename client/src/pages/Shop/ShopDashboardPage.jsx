import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardMain from "../../components/Shop/DashboardMain";

const ShopDashboardPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem]">
          <DashboardSidebar active={1} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <DashboardMain />
        </div>
      </div>
    </div>
  );
};

export default ShopDashboardPage;
