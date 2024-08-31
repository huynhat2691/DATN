import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import DashboardRatingsManage from "../../components/Shop/DashboardRatingsManage";

const ShopRatingsPage = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex items-start justify-between w-full">
        <div className="w-[60px] 800px:w-[16rem]">
          <DashboardSidebar active={11} />
        </div>
        <DashboardRatingsManage />
      </div>
    </div>
  );
};

export default ShopRatingsPage;
