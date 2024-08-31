/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import ShopLogin from "../components/Shop/ShopLogin";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const ShopLoginPage = () => {

  const navigate = useNavigate();
  const { isSellerAuthenticated,isLoading } = useSelector((state) => state.seller);

  useEffect(() => {
    if (isSellerAuthenticated === true) {
      navigate(`/dashboard`);
    }
  }, [isLoading, isSellerAuthenticated]);

  return (
    <div>
    <ShopLogin/>
    </div>
  )
}

export default ShopLoginPage