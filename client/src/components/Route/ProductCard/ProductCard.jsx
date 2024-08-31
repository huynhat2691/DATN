// /* eslint-disable react/prop-types */
// import { Link } from "react-router-dom";
// import styles from "../../../styles/styles";
// import Ratings from "../../Products/Ratings";
// import { backend_url } from "../../../server";
// import CountDown from "../Events/CountDown";

// const ProductCard = ({ data, isEvent }) => {
//   const getLowestPrice = () => {
//     if (data.hasClassifications) {
//       return Math.min(...data.classifications.map((c) => Number(c.price)));
//     }
//     return Number(data.price);
//   };

//   const getLowestDiscountPrice = () => {
//     if (data.hasClassifications) {
//       return Math.min(
//         ...data.classifications.map((c) => Number(c.discountPrice))
//       );
//     }
//     return Number(data.discountPrice);
//   };

//   const getHighestPercentageDiscount = () => {
//     if (data.hasClassifications) {
//       return Math.max(
//         ...data.classifications.map((c) => Number(c.percentageDiscount))
//       );
//     }
//     return Number(data.percentageDiscount);
//   };

//   const lowestPrice = getLowestPrice();
//   const lowestDiscountPrice = getLowestDiscountPrice();
//   const highestPercentageDiscount = getHighestPercentageDiscount();

//   return (
//     <>
//       <div className="w-[190px] h-[350px] bg-white rounded-md shadow-sm relative cursor-pointer border-[1px] border-[rgba(0,0,0,.09)] hover:border-[#27b3e2] hover:border-opacity-100 group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
//         <Link
//           to={`${
//             isEvent === true
//               ? `/product/${data._id}?isEvent=true`
//               : `/product/${data._id}`
//           }`}
//         >
//           <img
//             src={`${backend_url}${data.images && data.images[0]}`}
//             alt=""
//             className="size-[190px] object-cover rounded-t-md"
//           />
//         </Link>
//         <div className="p-2 h-[160px]">
//           <Link
//             to={`${
//               isEvent === true
//                 ? `/product/${data._id}?isEvent=true`
//                 : `/product/${data._id}`
//             }`}
//             className="flex flex-col justify-between h-full"
//           >
//             <h4
//               className="h-[45px] font-medium text-[15px] line-clamp-2 overflow-hidden break-words max-w-[300px]"
//               title={data.name}
//             >
//               {data.name}
//             </h4>

//             <div className="flex items-center mt-3">
//               {data?.ratings > 0 && (
//                 <div className="flex items-center text-[12px] ">
//                   <Ratings rating={data.ratings} />
//                   <div className="w-[1px] h-[14px] bg-gray-300 mx-1 rounded" />
//                 </div>
//               )}
//               {data?.sold_out > 0 && (
//                 <span className="font-[400] text-[gray] text-[14px]">
//                   Đã bán {data.sold_out}
//                 </span>
//               )}
//             </div>
//             <div className="flex items-center justify-start w-full">
//               {isEvent === true && <CountDown data={data} />}
//             </div>
//             <div className="py-3">
//               <div className="flex flex-col items-start">
//                 {highestPercentageDiscount > 0 ? (
//                   <>
//                     <h5 className={`${styles.productDiscountPrice} mx-1`}>
//                       {lowestDiscountPrice.toLocaleString()}
//                       <sup>₫</sup>
//                     </h5>
//                     <div className="flex items-center ">
//                       <div className="flex items-center bg-gray-300 px-1 rounded">
//                         <span className="text-[14px]">
//                           -{highestPercentageDiscount}%
//                         </span>
//                       </div>
//                       <h4 className={`${styles.price} text-[12px] text-[gray]`}>
//                         {lowestPrice.toLocaleString()}
//                         <sup>₫</sup>
//                       </h4>
//                     </div>
//                   </>
//                 ) : (
//                   <h5 className={`${styles.productDiscountPrice}`}>
//                     {lowestPrice.toLocaleString()}
//                     <sup>₫</sup>
//                   </h5>
//                 )}
//               </div>
//             </div>
//           </Link>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProductCard;

/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../../../styles/styles";
import Ratings from "../../Products/Ratings";
import { backend_url } from "../../../server";
import CountDown from "../Events/CountDown";

const ProductCard = ({ data, isEvent }) => {
  const getLowestPrice = () => {
    if (data.hasClassifications) {
      return Math.min(...data.classifications.map((c) => Number(c.price)));
    }
    return Number(data.price);
  };

  const getLowestDiscountPrice = () => {
    if (data.hasClassifications) {
      return Math.min(
        ...data.classifications.map((c) => Number(c.discountPrice))
      );
    }
    return Number(data.discountPrice);
  };

  const getHighestPercentageDiscount = () => {
    if (data.hasClassifications) {
      return Math.max(
        ...data.classifications.map((c) => Number(c.percentageDiscount))
      );
    }
    return Number(data.percentageDiscount);
  };

  const lowestPrice = getLowestPrice();
  const lowestDiscountPrice = getLowestDiscountPrice();
  const highestPercentageDiscount = getHighestPercentageDiscount();

  return (
    <>
      <div className="w-[190px] h-[350px] bg-white rounded-md shadow-sm relative cursor-pointer border-[1px] border-[rgba(0,0,0,.09)] hover:border-[#27b3e2] hover:border-opacity-100 group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
        <Link
          to={`${
            isEvent === true
              ? `/product/${data._id}?isEvent=true`
              : `/product/${data._id}`
          }`}
          className="relative block overflow-hidden"
        >
          <img
            src={`${backend_url}${data.images && data.images[0]}`}
            alt=""
            className="size-[190px] object-cover rounded-t-md transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
        </Link>
        <div className="p-2 h-[160px]">
          <Link
            to={`${
              isEvent === true
                ? `/product/${data._id}?isEvent=true`
                : `/product/${data._id}`
            }`}
            className="flex flex-col justify-between h-full"
          >
            <h4
              className="h-[45px] font-medium text-[15px] line-clamp-2 overflow-hidden break-words max-w-[300px] transition-colors duration-300 group-hover:text-[#27b3e2]"
              title={data.name}
            >
              {data.name}
            </h4>

            <div className="flex items-center mt-3">
              {data?.ratings > 0 && (
                <div className="flex items-center text-[12px] ">
                  <Ratings rating={data.ratings} />
                  <div className="w-[1px] h-[14px] bg-gray-300 mx-1 rounded" />
                </div>
              )}
              {data?.sold_out > 0 && (
                <span className="font-[400] text-[gray] text-[14px]">
                  Đã bán {data.sold_out}
                </span>
              )}
            </div>
            <div className="flex items-center justify-start w-full">
              {isEvent === true && <CountDown data={data} />}
            </div>
            <div className="py-3">
              <div className="flex flex-col items-start">
                {highestPercentageDiscount > 0 ? (
                  <>
                    <h5 className={`${styles.productDiscountPrice} mx-1`}>
                      {lowestDiscountPrice.toLocaleString()}
                      <sup>₫</sup>
                    </h5>
                    <div className="flex items-center ">
                      <div className="flex items-center bg-gray-300 px-1 rounded">
                        <span className="text-[14px]">
                          -{highestPercentageDiscount}%
                        </span>
                      </div>
                      <h4 className={`${styles.price} text-[12px] text-[gray]`}>
                        {lowestPrice.toLocaleString()}
                        <sup>₫</sup>
                      </h4>
                    </div>
                  </>
                ) : (
                  <h5 className={`${styles.productDiscountPrice}`}>
                    {lowestPrice.toLocaleString()}
                    <sup>₫</sup>
                  </h5>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
