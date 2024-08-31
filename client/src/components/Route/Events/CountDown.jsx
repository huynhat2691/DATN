/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { server } from "../../../server";

const CountDown = ({ data, isProductDetails = false, onTimeUp }) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    if (
      timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0
    ) {
      axios.delete(`${server}/event/delete-event/${data?._id}`);
      if (onTimeUp) {
        onTimeUp(); // Gọi callback khi thời gian kết thúc
      }
    }

    return () => clearTimeout(timer);
  });

  function calculateTimeLeft() {
    const difference = +new Date(data?.end_Date) - +new Date();
    let timeLeft = {
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
    if (difference > 0) {
      timeLeft = {
        // days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  const formatTime = (time) => {
    return time.toString().padStart(2, "0");
  };

  const TimeUnit = ({ value, label }) => (
    <span className="inline-block">
      <span
        className={`bg-red-500 text-white ${
          isProductDetails
            ? "text-[16px] bg-[black] rounded-[2px]"
            : "rounded text-[14px]"
        }  inline-flex items-center justify-center w-[36px]`}
      >
        {formatTime(value)}
      </span>
      <span className="text-gray-600 text-xs">{label}</span>
    </span>
  );

  // timeLeft.days === 0 &&
  return (
    <div>
      {timeLeft.hours === 0 &&
      timeLeft.minutes === 0 &&
      timeLeft.seconds === 0 ? (
        <span className="text-[red] text-[15px]">Sản phẩm đã hết</span>
      ) : (
        <div className="text-[13px] font-[600]">
          {/* {timeLeft.days > 0 && (
            <>
              <TimeUnit value={timeLeft.days} />
              <span className="text-red-500">:</span>
            </>
          )} */}
          <TimeUnit value={timeLeft.hours} />
          <span className="text-red-500 mx-1">:</span>
          <TimeUnit value={timeLeft.minutes} />
          <span className="text-red-500 mx-1">:</span>
          <TimeUnit value={timeLeft.seconds} />
        </div>
      )}
    </div>
  );
};

export default CountDown;
