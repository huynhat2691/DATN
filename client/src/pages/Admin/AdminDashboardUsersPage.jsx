import AdminSidebar from "../../components/Admin/Layout/AdminSidebar";
import AdminHeader from "../../components/Layout/AdminHeader";
import AllUsers from "../../components/Admin/AllUsers";

const AdminDashboardUsersPage = () => {
  return (
    <div className="flex flex-col h-screen">
      <AdminHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem] ">
          <AdminSidebar active={6} />
        </div>
        <div className="w-full justify-center flex">
          <AllUsers />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardUsersPage;
