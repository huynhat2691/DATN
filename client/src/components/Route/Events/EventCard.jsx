/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import { backend_url } from "../../../server";
import styles from "../../../styles/styles";
import CountDown from "./CountDown";
import Ratings from "../../../components/Products/Ratings";
import { Progress } from "../../ui/progress";
import { useState } from "react";

const EventCard = ({ data }) => {
  const [isVisible, setIsVisible] = useState(true);

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
  const soldPercentage = (data.sold_out / data.stock) * 100;

  const handleTimeUp = () => {
    setIsVisible(false);
  };

  if (!isVisible) {
    return null; // Không render gì nếu card không còn hiển thị
  }

  return (
    <div className="w-[190px] h-[350px] bg-white rounded-md shadow-sm relative cursor-pointer border-[1px] border-[rgba(0,0,0,.09)] hover:border-[#27b3e2] hover:border-opacity-100 group transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <Link
        to={`/product/${data?._id}?isEvent=true`}
        className="relative block overflow-hidden"
      >
        <img
          src={`${backend_url}${data?.images[0]}`}
          alt=""
          className="size-[190px] object-cover rounded-t-md transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
      </Link>
      <div className="p-2 h-[160px]">
        <Link
          to={`/product/${data._id}`}
          className="flex flex-col justify-between h-full"
        >
          <h4
            className="h-[45px] font-medium text-[15px] line-clamp-2 overflow-hidden break-words max-w-[300px] transition-colors duration-300 group-hover:text-[#27b3e2]"
            title={data.name}
          >
            {data.name}
          </h4>

          {data?.ratings > 0 && (
            <div className="flex items-center text-[14px] mt-3">
              <Ratings rating={data.ratings} />
            </div>
          )}

          <div className="space-y-1 pb-1">
            <CountDown data={data} onTimeUp={handleTimeUp} />
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
            <div className="relative">
              <Progress value={soldPercentage} className="h-5 bg-[#ff979e]" />
              <div className="absolute top-0 left-0 right-0 bottom-0 flex items-center justify-center text-xs text-gray-700 font-semibold">
                Đã bán: {data.sold_out}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default EventCard;
