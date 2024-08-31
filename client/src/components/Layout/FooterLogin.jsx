import {
  footerProductLinks,
  footerSupportLinks,
  footercompanyLinks,
} from "../../static/data";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin } from "lucide-react";
import logo from "../../assets/logo4.png";

const Footer = () => {
  return (
    <div className="w-full bg-white border-t">
      <div className=" w-[1300px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-16  py-8 sm:text-center">
          <ul className="text-center sm:text-start flex sm:block flex-col items-center">
            <img src={logo} alt="" className="w-[280px]" />
            <p>Tiện lợi, nhanh chóng, mọi lúc mọi nơi</p>
            <br />
            <div className="flex items-center justify-center mt-[15px]">
              <Facebook size={25} className="cursor-pointer" />

              <Instagram size={25} className="cursor-pointer ml-4" />
              <Linkedin size={25} className="cursor-pointer ml-4" />
            </div>
          </ul>
          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Hỗ trợ khách hàng</h1>
            {footerProductLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className=" hover:text-[#27b3e2] duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="text-center sm:text-start ">
            <h1 className="mb-1 font-semibold">Phương thức thanh toán</h1>
            <div className="grid grid-cols-4 gap-2 w-[200px]">
              {footercompanyLinks.map((link) => (
                <div key={link.id}>
                  <Link
                    className=" hover:text-[#27b3e2] duration-300 text-sm cursor-pointer leading-6"
                    to={link.link}
                  >
                    <img src={link.image_Url} alt="" />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <ul className="text-center sm:text-start">
            <h1 className="mb-1 font-semibold">Về eCommUnity</h1>
            {footerSupportLinks.map((link) => (
              <li key={link.name}>
                <Link
                  className=" hover:text-[#27b3e2] duration-300 text-sm cursor-pointer leading-6"
                  to={link.link}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-10 text-center pt-2  text-sm pb-4 items-center">
          <span>© 2024 HNBCorp. All Rights Reserved.</span>
          <span>Điều khoản & Điều kiện</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
