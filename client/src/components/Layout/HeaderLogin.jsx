/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import logo from "../../assets/logo4.png";

const HeaderLogin = ({ isRegister = false, }) => {
  return (
    <div className="w-full">
      <div className="w-[1300px] mx-auto h-[84px] flex items-center">
        <Link to="/">
          <img src={logo} alt="" className="w-[200px]" />
        </Link>
        {isRegister ? (
          <p className="ml-[15px] text-[24px] font-[500]">Đăng ký</p>
        ) : (
          <p className="ml-[15px] text-[24px] font-[500]">Đăng nhập</p>
        )}
      </div>
    </div>
  );
};

export default HeaderLogin;
