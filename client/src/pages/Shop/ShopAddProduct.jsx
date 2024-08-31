import DashboardHeader from "../../components/Shop/Layout/DashboardHeader";
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar";
import AddProduct from "../../components/Shop/AddProduct";

const ShopAddProduct = () => {
  return (
    <div className="flex flex-col h-screen">
      <DashboardHeader />
      <div className="flex-1 flex overflow-hidden">
        <div className="w-[80px] 800px:w-[16rem]">
          <DashboardSidebar active={5} />
        </div>
        <div className="flex-1 overflow-y-auto">
          <AddProduct />
        </div>
      </div>
    </div>
  );
};

export default ShopAddProduct;
