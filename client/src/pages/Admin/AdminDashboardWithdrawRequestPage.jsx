import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../../components/Layout/AdminHeader";
import AllWithdrawRequest from "../../components/Admin/Withdraw/AllWithdrawRequest";

const AdminDashboardWithdrawRequestPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem] ">
          <AdminSidebar active={9} />
        </div>
        <div className="w-full justify-center flex">
          <AllWithdrawRequest />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardWithdrawRequestPage;
