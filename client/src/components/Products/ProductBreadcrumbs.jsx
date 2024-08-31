/* eslint-disable react/prop-types */
// import {
//   Breadcrumb,
//   BreadcrumbItem,
//   BreadcrumbLink,
//   BreadcrumbList,
//   BreadcrumbPage,
//   BreadcrumbSeparator,
// } from "../ui/breadcrumb";
// import {
//   getCategoryTitle,
//   getSubcategoryTitle,
//   getSubclassificationTitle,
//   categoriesData, // Thêm import này
// } from "../../static/data";
// import { useNavigate } from "react-router-dom";

// const ProductBreadcrumbs = ({ data }) => {
//   const navigate = useNavigate();

//   const handleCategoryClick = (categoryId) => {
//     const category = categoriesData.find((cat) => cat.id === categoryId);
//     if (category) {
//       navigate(`/products?category=${category.id}`, {
//         state: { category: category },
//       });
//     }
//   };

//   return (
//     <Breadcrumb className="flex items-center mb-3 font-[500]">
//       <BreadcrumbList>
//         <BreadcrumbItem>
//           <BreadcrumbLink
//             href="/"
//             className="cursor-pointer hover:text-[#27b3e2]"
//           >
//             Trang chủ
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />

//         <BreadcrumbItem>
//           <BreadcrumbLink
//             className="cursor-pointer hover:text-[#27b3e2]"
//             onClick={() => handleCategoryClick(Number(data.category))}
//           >
//             {getCategoryTitle(Number(data.category))}
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />

//         <BreadcrumbItem>
//           <BreadcrumbLink className="cursor-pointer hover:text-[#27b3e2]">
//             {getSubcategoryTitle(
//               Number(data.category),
//               Number(data.subcategory)
//             )}
//           </BreadcrumbLink>
//         </BreadcrumbItem>
//         <BreadcrumbSeparator />

//         {data.subclassification && (
//           <>
//             <BreadcrumbItem>
//               <BreadcrumbLink className="cursor-pointer hover:text-[#27b3e2]">
//                 {getSubclassificationTitle(
//                   Number(data.category),
//                   Number(data.subcategory),
//                   Number(data.subclassification)
//                 )}
//               </BreadcrumbLink>
//             </BreadcrumbItem>
//             <BreadcrumbSeparator />
//           </>
//         )}

//         <BreadcrumbItem>
//           <BreadcrumbPage>{data.name}</BreadcrumbPage>
//         </BreadcrumbItem>
//       </BreadcrumbList>
//     </Breadcrumb>
//   );
// };

// export default ProductBreadcrumbs;

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import {
  getCategoryTitle,
  getSubcategoryTitle,
  getSubclassificationTitle,
  categoriesData,
} from "../../static/data";
import { useNavigate } from "react-router-dom";

const ProductBreadcrumbs = ({ data }) => {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    if (category) {
      navigate(`/products?category=${category.id}`, {
        state: { category: category, activeCategory: category.id },
      });
    }
  };

  const handleSubcategoryClick = (categoryId, subcategoryId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    if (category) {
      const subcategory = category.subcategories.find(
        (subcat) => subcat.id === subcategoryId
      );
      if (subcategory) {
        navigate(`/products?category=${category.id}&subcategory=${subcategory.id}`, {
          state: { category: category, activeSubcategory: subcategory.id },
        });
      }
    }
  };

  const handleSubclassificationClick = (categoryId, subcategoryId, subclassificationId) => {
    const category = categoriesData.find((cat) => cat.id === categoryId);
    if (category) {
      const subcategory = category.subcategories.find(
        (subcat) => subcat.id === subcategoryId
      );
      if (subcategory) {
        const subclassification = subcategory.subclassifications.find(
          (subclass) => subclass.id === subclassificationId
        );
        if (subclassification) {
          navigate(
            `/products?category=${category.id}&subcategory=${subcategory.id}&subclassification=${subclassification.id}`,
            {
              state: {
                category: category,
                activeSubcategory: subcategory.id,
                activeSubclassification: subclassification.id,
              },
            }
          );
        }
      }
    }
  };

  return (
    <Breadcrumb className="flex items-center mb-3 font-[500]">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/"
            className="cursor-pointer hover:text-[#27b3e2]"
          >
            Trang chủ
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink
            className="cursor-pointer hover:text-[#27b3e2]"
            onClick={() => handleCategoryClick(Number(data.category))}
          >
            {getCategoryTitle(Number(data.category))}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        <BreadcrumbItem>
          <BreadcrumbLink
            className="cursor-pointer hover:text-[#27b3e2]"
            onClick={() =>
              handleSubcategoryClick(Number(data.category), Number(data.subcategory))
            }
          >
            {getSubcategoryTitle(Number(data.category), Number(data.subcategory))}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />

        {data.subclassification && (
          <>
            <BreadcrumbItem>
              <BreadcrumbLink
                className="cursor-pointer hover:text-[#27b3e2]"
                onClick={() =>
                  handleSubclassificationClick(
                    Number(data.category),
                    Number(data.subcategory),
                    Number(data.subclassification)
                  )
                }
              >
                {getSubclassificationTitle(
                  Number(data.category),
                  Number(data.subcategory),
                  Number(data.subclassification)
                )}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        )}

        <BreadcrumbItem>
          <BreadcrumbPage>{data.name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumbs;