import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";

const SellerActivationPage = () => {
  const [error, setError] = useState(false);
  const { activation_token } = useParams();

  useEffect(() => {
    if (activation_token) {
      const activationEmail = async () => {
        try {
          const res = await axios.post(`${server}/shop/shopactivation`, {
            activation_token,
          });
          console.log(res.data.message);
        } catch (error) {
          console.log(error.response.data.message);
          setError(true);
        }
      };
      activationEmail();
    }
  }, [ activation_token ]);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {error ? (
        <p>Mã thông báo của bạn đã hết hạn!</p>
      ) : (
        <p>Tài khoản bán hàng của bạn đã được tạo thành công!</p>
      )}
    </div>
  );
};

export default SellerActivationPage;
