// import { useEffect, useState } from "react";
// import ProductCard from "../ProductCard/ProductCard";
// import { useSelector } from "react-redux";
// import Loader from "../../Layout/Loader";
// import Header from "../../Layout/Header";
// import Footer from "../../Layout/Footer";
// import { categoriesData } from "../../../static/data";

// const BestSellingPage = () => {
//   const [productsByCategory, setProductsByCategory] = useState({});
//   const [visibleProducts, setVisibleProducts] = useState({});
//   const { allProducts, isLoading } = useSelector((state) => state.product);

//   useEffect(() => {
//     if (allProducts) {
//       const sortedProducts = [...allProducts].sort(
//         (a, b) => b.sold_out - a.sold_out
//       );
//       const grouped = categoriesData.reduce((acc, category) => {
//         acc[category.id] = sortedProducts.filter(
//           (product) => product.category === category.id.toString()
//         );
//         return acc;
//       }, {});
//       setProductsByCategory(grouped);

//       const initialVisible = Object.keys(grouped).reduce((acc, categoryId) => {
//         acc[categoryId] = 8;
//         return acc;
//       }, {});
//       setVisibleProducts(initialVisible);
//     }
//   }, [allProducts]);

//   const loadMore = (categoryId) => {
//     setVisibleProducts((prev) => ({
//       ...prev,
//       [categoryId]: prev[categoryId] + 8,
//     }));
//   };

//   return (
//     <>
//       {isLoading ? (
//         <Loader />
//       ) : (
//         <div>
//           <Header />
//           <div className="w-[1100px] mx-auto">
//             <div>
//               {categoriesData.map((category) => (
//                 <div key={category.id} className="mb-6 p-4">
//                   <div className="flex justify-center">
//                     <div className="w-[800px] border-white border-[2px] mb-6 rounded-full bg-[#27b3e2] text-white">
//                       <h2 className="text-4xl font-bold my-4 text-center">
//                         {category.title.toUpperCase()}
//                       </h2>
//                     </div>
//                   </div>
//                   <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-6 justify-items-center">
//                     {productsByCategory[category.id]
//                       ?.slice(0, visibleProducts[category.id])
//                       .map((product, index) => (
//                         <ProductCard data={product} key={index} />
//                       ))}
//                   </div>
//                   {productsByCategory[category.id]?.length >
//                     visibleProducts[category.id] && (
//                     <div className="flex justify-center">
//                       <button
//                         onClick={() => loadMore(category.id)}
//                         className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//                       >
//                         Xem thêm
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//           <Footer />
//         </div>
//       )}
//     </>
//   );
// };

// export default BestSellingPage;

import { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useSelector } from "react-redux";
import Loader from "../../Layout/Loader";
import Header from "../../Layout/Header";
import Footer from "../../Layout/Footer";
import { categoriesData } from "../../../static/data";

const BestSellingPage = () => {
  const [productsByCategory, setProductsByCategory] = useState({});
  const [visibleProducts, setVisibleProducts] = useState({});
  const { allProducts, isLoading } = useSelector((state) => state.product);

  useEffect(() => {
    if (allProducts) {
      const sortedProducts = [...allProducts].sort(
        (a, b) => b.sold_out - a.sold_out
      );
      const grouped = categoriesData.reduce((acc, category) => {
        acc[category.id] = sortedProducts.filter(
          (product) => product.category === category.id.toString()
        );
        return acc;
      }, {});
      setProductsByCategory(grouped);

      const initialVisible = Object.keys(grouped).reduce((acc, categoryId) => {
        acc[categoryId] = 8;
        return acc;
      }, {});
      setVisibleProducts(initialVisible);
    }
  }, [allProducts]);

  const loadMore = (categoryId) => {
    setVisibleProducts((prev) => ({
      ...prev,
      [categoryId]: prev[categoryId] + 8,
    }));
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header />
          <div className="w-[1100px] mx-auto">
            <div>
              {categoriesData.map((category) => {
                // Kiểm tra xem category có sản phẩm hay không
                const hasProducts = productsByCategory[category.id]?.length > 0;
                
                // Nếu không có sản phẩm, không render category này
                if (!hasProducts) return null;

                return (
                  <div key={category.id} className="mb-6 p-4">
                    <div className="flex justify-center">
                      <div className="w-[800px] border-white border-[2px] mb-6 rounded-full bg-[#27b3e2] text-white">
                        <h2 className="text-4xl font-bold my-4 text-center">
                          {category.title.toUpperCase()}
                        </h2>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-4 xl:gap-[30px] mb-6 justify-items-center">
                      {productsByCategory[category.id]
                        ?.slice(0, visibleProducts[category.id])
                        .map((product, index) => (
                          <ProductCard data={product} key={index} />
                        ))}
                    </div>
                    {productsByCategory[category.id]?.length >
                      visibleProducts[category.id] && (
                      <div className="flex justify-center">
                        <button
                          onClick={() => loadMore(category.id)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        >
                          Xem thêm
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default BestSellingPage;