import { Link, useNavigate } from "react-router-dom";
import { categoriesData } from "../../../static/data";
import { Store } from "lucide-react";

const Categories = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`, {
      state: { category: category },
    });
  };

  return (
    <div className="items-center justify-center my-4" id="categories">
      <div className="w-[250px] pr-3 h-[55rem] flex flex-col justify-between sticky top-4 left-0 z-30 overflow-y-auto">
        <div className="bg-white p-2 rounded-lg border h-[50rem] flex flex-col justify-between overflow-y-auto custom-scrollbar">
          <p className="ml-2 text-[16px] font-[500]">Danh mục</p>
          {categoriesData.map((category) => (
            <div
              key={category.id}
              className="flex flex-row items-center cursor-pointer p-2 hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image_Url}
                alt=""
                className="size-[34px] object-cover mr-2"
              />
              <h5 className="text-[14px] font-[400] leading-[1.3]">
                {category.title}
              </h5>
            </div>
          ))}
        </div>
        <Link
          to="/shop-create"
          className="bg-white p-2 mt-3 rounded-lg border flex items-center cursor-pointer"
        >
          <div className="flex items-center hover:bg-[#dadada] hover:rounded-lg hover:transition hover:ease-in-out hover:duration-200 p-2 pl-3">
            <Store size={30} />
            <p className="text-[14px] font-[400] leading-[1.3] text-center">
              Bán hàng cùng eCommUnity
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
