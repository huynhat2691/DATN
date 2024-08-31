import DashboardHeader from "../../components/Shop/Layout/DashboardHeader"
import DashboardSidebar from "../../components/Shop/Layout/DashboardSidebar"
import AllCoupons from "../../components/Shop/AllCoupons"


const ShopAllCoupons = () => {
  return (
    <div>
      <DashboardHeader />
      <div className="flex justify-between w-full">
      <div className="w-[60px] 800px:w-[16rem]">
          <DashboardSidebar active={8} />
        </div>
        <div className="w-full justify-center flex">
          <AllCoupons />
        </div>
      </div>
    </div>
  )
}

export default ShopAllCoupons