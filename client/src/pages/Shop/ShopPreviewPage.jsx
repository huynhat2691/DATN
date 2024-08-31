import ShopInfo from "../../components/Shop/ShopInfo";
import ShopProfileData from "../../components/Shop/ShopProfileData";
import Header from "../../components/Layout/Header";
import Footer from "../../components/Layout/Footer";
import ShopCouponData from "../../components/Shop/ShopCouponData";

const ShopPreviewPage = () => {
  return (
    <div>
      <Header />
      <div className="w-full mx-auto">
        <div className="">
          <div className="w-full">
            <ShopInfo isOwner={false} />
          </div>
          <div className="w-[1100px] mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
            <ShopCouponData isOwner={false} />
          </div>
          <div className="w-[1100px] min-h-screen mx-auto bg-white border my-4 p-3 800px:mt-['unset'] rounded-lg">
            <ShopProfileData isOwner={false} />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ShopPreviewPage;
