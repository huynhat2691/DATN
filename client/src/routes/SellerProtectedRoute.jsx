/* eslint-disable react/prop-types */
// import { useSelector } from "react-redux";
// import { Navigate } from "react-router-dom";
// import Loader from "../components/Layout/Loader";

// const SellerProtectedRoute = ({ children }) => {
//   const { isLoading, isSellerAuthenticated } = useSelector(
//     (state) => state.seller
//   );

//   if (isLoading === true) {
//     return <Loader />;
//   } else {
//     if (!isSellerAuthenticated) {
//       return <Navigate to={`/shop-login`} replace />;
//     }
//     return children;
//   }
// };
// export default SellerProtectedRoute;

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import Loader from "../components/Layout/Loader";

const SellerProtectedRoute = ({ children }) => {
  const { isLoading, isSellerAuthenticated } = useSelector(
    (state) => state.seller
  );
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    let timer;
    if (!isLoading) {
      timer = setTimeout(() => {
        setShowLoader(false);
      });
    }
    return () => clearTimeout(timer);
  }, [isLoading]);

  if (isLoading || showLoader) {
    return <Loader />;
  } else {
    if (!isSellerAuthenticated) {
      return <Navigate to={`/shop-login`} replace />;
    }
    return children;
  }
};

export default SellerProtectedRoute;
