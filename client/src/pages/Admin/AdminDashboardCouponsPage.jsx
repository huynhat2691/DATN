import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../../components/Layout/AdminHeader";
import AdminDashboardAddCoupons from "../../components/Admin/AdminDashboardAddCoupons";

const AdminDashboardCouponsPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem] ">
          <AdminSidebar active={3} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <AdminDashboardAddCoupons />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCouponsPage;
