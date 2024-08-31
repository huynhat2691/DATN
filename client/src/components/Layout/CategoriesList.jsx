import { useNavigate, useLocation } from "react-router-dom";
import { categoriesData } from "../../static/data"; // Đảm bảo đường dẫn đúng

const CategoriesList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { activeCategory, activeSubcategory } = location.state || {};

  // Hàm để lấy tất cả categories và subcategories
  const getCategoriesAndSubcategories = () => {
    return categoriesData
      .map((category) => ({
        ...category,
        subcategories: category.subcategories || [],
      }))
      .filter((item) => item.subcategories.length > 0);
  };

  const categoriesAndSubcategories = getCategoriesAndSubcategories();

  // Chia categories và subcategories thành 5 cột
  const columns = [[], [], [], [], []];
  let columnIndex = 0;

  categoriesAndSubcategories.forEach((item) => {
    if (columns[columnIndex].length > 0) {
      columnIndex = (columnIndex + 1) % 5;
    }
    columns[columnIndex].push(item);
  });

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category.id}`, {
      state: { category: category, activeCategory: category.id },
    });
  };

  const handleSubcategoryClick = (category, subcategory) => {
    navigate(
      `/products?category=${category.id}&subcategory=${subcategory.id}`,
      {
        state: { category: category, activeSubcategory: subcategory.id },
      }
    );
  };

  return (
    <div className="w-full bg-white border-t-4 border-[#27b3e2] ">
      <div className="grid grid-cols-5 gap-8 w-[1300px] mx-auto  p-4 pt-8">
        {columns.map((column, index) => (
          <div key={index}>
            {column.map((item, itemIndex) => (
              <div key={itemIndex} className="mb-5">
                <p
                  className={`text-[14px] font-[550] mb-1 leading-5 cursor-pointer ${
                    activeCategory === item.id
                      ? "text-[#27b3e2]"
                      : "text-[#38383d] hover:text-[#27b3e2]"
                  }`}
                  onClick={() => handleCategoryClick(item)}
                >
                  {item.title}
                </p>
                <p className="text-[12px] text-[#808089] leading-4">
                  {item.subcategories.map((subcategory, subIndex) => (
                    <span
                      key={subIndex}
                      className={`cursor-pointer ${
                        activeSubcategory === subcategory.id
                          ? "text-[#27b3e2]"
                          : "hover:text-[#27b3e2]"
                      }`}
                      onClick={() => handleSubcategoryClick(item, subcategory)}
                    >
                      {subcategory.title}
                      {subIndex < item.subcategories.length - 1 ? " | " : ""}
                    </span>
                  ))}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CategoriesList;
