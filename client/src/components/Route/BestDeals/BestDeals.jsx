// import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import ProductCard from "../ProductCard/ProductCard";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "../../ui/carousel";
// import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
// import { Link } from "react-router-dom";
// import { ChevronRight } from "lucide-react";

// const BestDeals = () => {
//   const [data, setData] = useState([]);
//   const { allProducts } = useSelector((state) => state.product);

//   useEffect(() => {
//     const allProductsData = allProducts ? [...allProducts] : [];
//     const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
//     const firstFifteen = sortedData && sortedData.slice(0, 15);
//     setData(firstFifteen);
//   }, [allProducts]);

//   const chunkedData = data.reduce((resultArray, item, index) => {
//     const chunkIndex = Math.floor(index / 5);
//     if (!resultArray[chunkIndex]) {
//       resultArray[chunkIndex] = [];
//     }
//     resultArray[chunkIndex].push(item);
//     return resultArray;
//   }, []);

//   return (
//     <Card className="mt-2 py-2 px-4">
//       <CardHeader className="!p-0 !py-2 !flex-row !items-center justify-between">
//         <CardTitle className="text-[20px] font-[600]">Bán chạy nhất</CardTitle>
//         <Link to="/best-selling">
//           <CardTitle className="text-[14px] font-[500] !m-0 text-[#27b3e2] flex items-center">
//             Xem tất cả
//           <ChevronRight size={15} className="ml-1"/>
//           </CardTitle>
//         </Link>
//       </CardHeader>
//       <CardContent className="!px-0 ">
//         <Carousel className="w-full">
//           <CarouselContent>
//             {chunkedData.map((chunk, chunkIndex) => (
//               <CarouselItem key={chunkIndex}>
//                 <div className="grid grid-cols-5 gap-3 justify-items-center">
//                   {chunk.map((product, productIndex) => (
//                     <ProductCard key={productIndex} data={product} />
//                   ))}
//                 </div>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
//             <CarouselPrevious className="relative left-2 translate-y-0" />
//             <CarouselNext className="relative right-2 translate-y-0" />
//           </div>
//         </Carousel>
//       </CardContent>
//     </Card>
//   );
// };

// export default BestDeals;

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import ProductCard from "../ProductCard/ProductCard";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

const BestDeals = () => {
  const [data, setData] = useState([]);
  const { allProducts } = useSelector((state) => state.product);

  useEffect(() => {
    const allProductsData = allProducts ? [...allProducts] : [];
    const sortedData = allProductsData?.sort((a, b) => b.sold_out - a.sold_out);
    const firstFifteen = sortedData && sortedData.slice(0, 15);
    setData(firstFifteen);
  }, [allProducts]);

  const chunkedData = data.reduce((resultArray, item, index) => {
    const chunkIndex = Math.floor(index / 5);
    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = [];
    }
    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <Card className="mt-2 py-2 px-4">
      <CardHeader className="!p-0 !py-2 !flex-row !items-center justify-between">
        <CardTitle className="text-[20px] font-[600]">Bán chạy nhất</CardTitle>
        <Link to="/best-selling">
          <CardTitle className="text-[14px] font-[500] !m-0 text-[#27b3e2] flex items-center">
            Xem tất cả
            <ChevronRight size={15} className="ml-1" />
          </CardTitle>
        </Link>
      </CardHeader>
      <CardContent className="!px-0 ">
        {data.length > 5 ? (
          <Carousel className="w-full">
            <CarouselContent>
              {chunkedData.map((chunk, chunkIndex) => (
                <CarouselItem key={chunkIndex}>
                  <div className="grid grid-cols-5 gap-3 justify-items-center">
                    {chunk.map((product, productIndex) => (
                      <ProductCard key={productIndex} data={product} />
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2">
              <CarouselPrevious className="relative left-2 translate-y-0" />
              <CarouselNext className="relative right-2 translate-y-0" />
            </div>
          </Carousel>
        ) : (
          <div className="grid grid-cols-5 gap-3 justify-items-center">
            {data.map((product, index) => (
              <ProductCard key={index} data={product} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BestDeals;
