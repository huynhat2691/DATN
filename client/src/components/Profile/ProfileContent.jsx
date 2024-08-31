
import UserInbox from "./UserInbox";
import UserAllRefundOrders from "./UserAllRefundOrders";
import UserAllOrders from "./UserAllOrders";
import UserTrackOrders from "./UserTrackOrders";
import UserChangePassword from "./UserChangePassword";
import UserAddress from "./UserAddress";
import UserPreviewAndUpdateProfile from "./UserPreviewAndUpdateProfile";

// eslint-disable-next-line react/prop-types
const ProfileContent = ({ active }) => {
  return (
    <div className="w-full h-full">
      {/* profile  */}
      {active === 1 && (
        <div className="w-full h-full">
          <UserPreviewAndUpdateProfile />
        </div>
      )}

      {/* order  */}
      {active === 2 && (
        <div className="w-full">
          <UserAllOrders />
        </div>
      )}

      {/* refund  */}
      {active === 3 && (
        <div className="w-full">
          <UserAllRefundOrders />
        </div>
      )}

      {/* inbox */}
      {active === 4 && (
        <div className="w-full h-full">
          <UserInbox />
        </div>
      )}

      {/* track orders  */}
      {active === 5 && (
        <div className="w-full">
          <UserTrackOrders />
        </div>
      )}

      {/* change password  */}
      {active === 6 && (
        <div className="w-full">
          <UserChangePassword />
        </div>
      )}

      {/* user address  */}
      {active === 7 && (
        <div className="w-full">
          <UserAddress />
        </div>
      )}
    </div>
  );
};

export default ProfileContent;
