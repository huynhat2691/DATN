/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-key */
import { Link } from "react-router-dom";
import { navItems } from "../../static/data";

const NavBar = () => {
  return (
    <div>
      <div className="bg-white h-full my-1 mt-2 px-4 py-2 rounded-md border">
        <div className="flex items-start justify-around ">
          {navItems &&
            navItems.map((i, index) => (
              <div className="w-[250px]" key={index}>
                <Link to={i.url} className="text-black flex flex-col items-center justify-between" >
                  <img
                    src={i.image_Url}
                    alt=""
                    className="size-[46px] object-cover"
                  />
                  <p className="text-center mt-2">{i.title}</p>
                </Link>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
