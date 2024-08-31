import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminDashboardAddBanners from "../../components/Admin/AdminDashboardAddBanners";

const AdminDashboardBannersPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem] ">
            <AdminSidebar active={2} />
          </div>
          <div className="flex-1 overflow-y-auto">
            <AdminDashboardAddBanners />
          </div>
        </div>
    </div>
  );
};

export default AdminDashboardBannersPage;
