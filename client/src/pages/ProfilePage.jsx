import ProfileContent from "../components/Profile/ProfileContent";
import ProfileSidebar from "../components/Profile/ProfileSidebar";
import { useState, useEffect } from "react";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import { useLocation } from "react-router-dom";
import CategoriesList from "../components/Layout/CategoriesList";

const ProfilePage = () => {
  const [active, setActive] = useState(1);
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    if (path.includes("/profile/account")) setActive(1);
    else if (path.includes("/profile/orders")) setActive(2);
    else if (path.includes("/profile/refunds")) setActive(3);
    else if (path.includes("/profile/inbox")) setActive(4);
    else if (path.includes("/profile/track-orders")) setActive(5);
    else if (path.includes("/profile/change-password")) setActive(6);
    else if (path.includes("/profile/addresses")) setActive(7);
    else if (path.includes("/admin/dashboard")) setActive(8);
  }, [location]);

  return (
    <div>
      <Header />
      <div className="w-[1300px] min-h-[700px] flex mx-auto justify-between">
        <div className="w-[250px] sticky top-0">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
        <div className="w-[1030px] min-h-[700px] flex justify-center my-4 bg-white border rounded-lg">
          <div className="w-full h-full p-4 mx-2">
            <ProfileContent active={active} />
          </div>
        </div>
      </div>
      <CategoriesList />
      <Footer />
    </div>
  );
};

export default ProfilePage;
