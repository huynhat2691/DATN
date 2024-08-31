/* eslint-disable react/prop-types */
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

const Ratings = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(
        <IoStar
          key={i}
          // size={14}
          color="#f6b100"
          className="mr-[2px] cursor-pointer"
        />
      );
    } else if (i === Math.ceil(rating) && !Number.isInteger(rating)) {
      stars.push(
        <IoStarHalf
          key={i}
          // size={14}
          color="#f6ba00"
          className="mr-[2px] cursor-pointer"
        />
      );
    } else {
      stars.push(
        <IoStarOutline
          key={i}
          // size={14}
          color="#f6ba00"
          className="mr-[2px] cursor-pointer"
        />
      );
    }
  }
  return <div className="flex items-center justify-center"> {stars}</div>;
};

export default Ratings;
