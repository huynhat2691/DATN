import { useNavigate } from "react-router-dom";
import ShopCreate from "../components/Shop/ShopCreate";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ShopCreatePage = () => {
  const navigate = useNavigate();
  const { isSellerAuthenticated, seller } = useSelector(
    (state) => state.seller
  );

  useEffect(() => {
    if (isSellerAuthenticated === true) {
      navigate(`/shop/${seller._id}`);
    }
  }, [ isSellerAuthenticated, navigate, seller ]);

  return (
    <div>
      <ShopCreate />
    </div>
  );
};

export default ShopCreatePage;
