// /* eslint-disable react/prop-types */
// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import axios from "axios";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { backend_url, server } from "../../../server";
// const Banner = () => {
//   const [banners, setBanners] = useState([]);

//   useEffect(() => {
//     const fetchBanners = async () => {
//       const response = await axios.get(
//         `${server}/banner/active-banners-homepage`,
//         {
//           withCredentials: true,
//         }
//       );
//       setBanners(response.data);
//     };
//     fetchBanners();
//   }, []);

//   const settings = {
//     dots: false,
//     infinite: banners.length > 1, // Chỉ vô hạn khi có nhiều hơn 1 banner
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: banners.length > 1, // Chỉ tự động chạy khi có nhiều hơn 1 banner
//     autoplaySpeed: 2000,
//     arrows: banners.length > 1, // Ẩn mũi tên khi chỉ có 1 banner
//   };

//   return (
//     <div className="w-full h-[calc(27rem-8px)] block bg-white py-8">
//       <div className="w-[1200px] mx-auto h-[360px]">
//         <Slider {...settings}>
//           {banners.map((banner) => (
//             <div key={banner._id}>
//               <img
//                 src={`${backend_url}${banner.image}`}
//                 alt={banner.title}
//                 className="w-full h-[360px] object-cover rounded-md "
//               />
//               <div className="absolute bottom-5 left-5 text-black">
//                 <h2>{banner.title}</h2>
//                 <p>{banner.subtitle}</p>
//                 {banner.link && <a href={banner.link}>Xem thêm</a>}
//               </div>
//             </div>
//           ))}
//         </Slider>
//       </div>
//     </div>
//   );
// };

// export default Banner;

import { useEffect, useState, useMemo } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { backend_url, server } from "../../../server";
import Loader from "../../Layout/Loader";

const Banner = () => {
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(
          `${server}/banner/active-banners-homepage`,
          {
            withCredentials: true,
          }
        );
        setBanners(response.data);
      } catch (error) {
        console.error("Error fetching banners:", error);
      }
    };
    fetchBanners();
  }, []);

  const settings = useMemo(
    () => ({
      dots: true, // Thay đổi từ false thành true
      infinite: banners.length > 1,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: banners.length > 1,
      autoplaySpeed: 2000,
      arrows: banners.length > 1,
      lazyLoad: "progressive",
      // Thêm các cài đặt sau để tùy chỉnh dots
      dotsClass: "slick-dots slick-thumb", // Thêm class cho dots
      appendDots: (dots) => (
        <div
          style={{
            position: "absolute",
            bottom: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "auto",
          }}
        >
          <ul style={{ margin: "0" }}> {dots} </ul>
        </div>
      ),
    }),
    [banners.length]
  );

  if (banners.length === 0) {
    return <Loader />; // hoặc có thể render một loading indicator
  }

  return (
    <div className=" bg-white p-4 rounded-md border">
      <div className="">
        <Slider {...settings}>
          {banners.map((banner) => (
            <div key={banner._id}>
              <img
                src={`${backend_url}${banner.image}`}
                alt={banner.title}
                className="w-full h-[300px] object-cover rounded-md border"
                loading="lazy"
              />
              <div className="absolute bottom-5 left-5 text-black">
                <h2>{banner.title}</h2>
                <p>{banner.subtitle}</p>
                {banner.link && <a href={banner.link}>Xem thêm</a>}
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
