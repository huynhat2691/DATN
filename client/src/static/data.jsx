import laptop from "../assets/categories/120_84719_laptop_asus_gaming_vivobook_k3605zu_rp296w_i5_12500_16gb_ram_512gb_ssd_16_wuxga_rtx4050_6gb_win11_den__4_.jpg";
import cosmetic from "../assets/categories/78eb9df3-11e9-4d48-8290-f4db0181317e1681984721229-Charmacy-Milano-Flattering-Nude-Lipstick---Corset-Love-06-58-1.png";
import assesories from "../assets/categories/magnifeye-reading-glasses-86023-14-64_600.jpg";
import menswear from "../assets/categories/Tshirt_noun_001_18267.jpg";
import womenswear from "../assets/categories/istockphoto-178851955-612x612.jpg";
import menshoe from "../assets/categories/closeup-elegant-mens-shoes-on-260nw-156770609.jpg";
import womenshoe from "../assets/categories/close-red-high-heels-on-260nw-1149370748.jpg";
import television from "../assets/categories/SLE43S400-01.jpg";
import smartphone from "../assets/categories/57049-zte-nubia-red-magic-9-pro-1.jpg";
import smartwatch from "../assets/categories/49085_apple_watch_series_8_41mm_gps_vien_nhom_day_cao_su_midnight_mnp53vna_1.jpg";
import camera from "../assets/categories/istockphoto-185278433-612x612.jpg";
import petcare from "../assets/categories/petcare.jpg";
import healthcare from "../assets/categories/pngtree-drug-capsule-pill-from-prescription-in-drugstore-pharmacy-for-treatment-health-png-image_12466918.png";
import travel from "../assets/categories/pngtree-travel-suitcase-set-png-image_14646657.png";
import audio from "../assets/categories/png-transparent-black-speaker-system-microphone-electro-voice-audio-loudspeaker-sound-reinforcement-system-sound-system-electronics-sound-audio-equipment-thumbnail.png";
import beverage from "../assets/categories/png-transparent-fizzy-drinks-energy-drink-pepsi-fast-food-drink-food-plastic-bottle-packaging-and-labeling-thumbnail.png";
import momandbaby from "../assets/categories/png-clipart-bed-frame-cots-wood-wood-furniture-infant.png";
import babyfashion from "../assets/categories/pngegg.png";
import gaming from "../assets/categories/pngwing.com.png";
import homedecor from "../assets/categories/minimalistic-modern-living-room-grey-sofa-clipart-on-transparent-background-modern-home-decor-interior-couch-living-room-furniture-living-room-decor-home-interior-dec.png";
import camping from "../assets/categories/pngtree-camping-illustration-with-mountain-landscape-png-image_4560378.png";
import stationery from "../assets/categories/pngwing.com1.png";
import hobbies from "../assets/categories/5361551.png";

import coupons from "../assets/navbar/coupon.png";
import shops from "../assets/navbar/shop.png";
import socialnetwork from "../assets/navbar/social-media.png";
import sales from "../assets/navbar/sale.png";

import img1 from "../assets/paymentmethods/img.png";
import img2 from "../assets/paymentmethods/img2.png";
import img3 from "../assets/paymentmethods/img3.png";
import img4 from "../assets/paymentmethods/img4.png";
import img5 from "../assets/paymentmethods/img5s.png";

// navigation Data
export const navItems = [
  {
    title: "Mã giảm giá",
    url: "/coupons",
    image_Url: coupons,
  },
  {
    title: "Mạng xã hội eCommUnity",
    url: "/",
    image_Url: socialnetwork,
  },
  {
    title: "Bán hàng cùng eCommUnity",
    url: "/shop-create",
    image_Url: shops,
  },
  {
    title: "TOP DEAL",
    url: "/best-selling",
    image_Url: sales,
  },
];

// categories data
export const categoriesData = [
  {
    id: 1,
    title: "Thời trang nam",
    image_Url: menswear,
    subcategories: [
      {
        id: 101,
        title: "Quần jean",
      },
      {
        id: 102,
        title: "Hoodie & Áo nỉ",
        subclassifications: [
          {
            id: 1001,
            title: "Hoodie",
          },
          {
            id: 1002,
            title: "Áo nỉ",
          },
          {
            id: 1003,
            title: "Khác",
          },
        ],
      },
      {
        id: 103,
        title: "Áo len",
      },
      {
        id: 104,
        title: "Áo khoác",
        subclassifications: [
          {
            id: 1004,
            title: "Áo khoác mùa đông & Áo choàng",
          },
          {
            id: 1005,
            title: "Áo khoác",
          },
          {
            id: 1006,
            title: "Áo khoác vest",
          },
          {
            id: 1007,
            title: "Khác",
          },
        ],
      },
      {
        id: 105,
        title: "Com lê",
        subclassifications: [
          {
            id: 1008,
            title: "Bộ Com lê",
          },
          {
            id: 1009,
            title: "Áo Khoác & Blazer",
          },
          {
            id: 1010,
            title: "Quần âu",
          },
          {
            id: 1011,
            title: "Áo vest & Gi lê",
          },
          {
            id: 1012,
            title: "Khác",
          },
        ],
      },
      {
        id: 106,
        title: "Quần dài",
        subclassifications: [
          {
            id: 1013,
            title: "Quần túi hộp",
          },
          {
            id: 1014,
            title: "Quần jogger",
          },
          {
            id: 1015,
            title: "Quần dài",
          },
          {
            id: 1016,
            title: "Khác",
          },
        ],
      },
      {
        id: 107,
        title: "Quần đùi",
      },
      {
        id: 108,
        title: "Áo",
        subclassifications: [
          {
            id: 1017,
            title: "Áo sơ mi",
          },
          {
            id: 1018,
            title: "Áo polo",
          },
          {
            id: 1019,
            title: "Áo thun",
          },
          {
            id: 1020,
            title: "Áo ba lỗ",
          },
          {
            id: 1021,
            title: "Khác",
          },
        ],
      },
      {
        id: 109,
        title: "Đồ lót",
        subclassifications: [
          {
            id: 1022,
            title: "Quần lót",
          },
          {
            id: 1023,
            title: "Áo lót",
          },
          {
            id: 1024,
            title: "Đồ lót giữ nhiệt",
          },
          {
            id: 1025,
            title: "Khác",
          },
        ],
      },
      {
        id: 110,
        title: "Đồ ngủ",
      },
      {
        id: 111,
        title: "Bộ",
      },
      {
        id: 112,
        title: "Trang phục truyền thống",
        subclassifications: [
          {
            id: 1026,
            title: "Áo",
          },
          {
            id: 1027,
            title: "Quần",
          },
          {
            id: 1028,
            title: "Bộ",
          },
          {
            id: 1029,
            title: "Khác",
          },
        ],
      },
      {
        id: 113,
        title: "Đồ hoá trang",
      },
      {
        id: 114,
        title: "Vớ/Tất",
      },
      {
        id: 115,
        title: "Khác",
      },
    ],
  },
  {
    id: 2,
    title: "Thời trang nữ",
    image_Url: womenswear,
    subcategories: [
      {
        id: 201,
        title: "Váy cưới",
      },
      {
        id: 202,
        title: "Đồ liền thân",
        subclassifications: [
          {
            id: 2001,
            title: "Đồ bay(Jumpsuits)",
          },
          {
            id: 2002,
            title: "Đồ bay ngắn(Playsuits)",
          },
          {
            id: 2003,
            title: "Quần yếm",
          },
          {
            id: 2004,
            title: "Khác",
          },
        ],
      },
      {
        id: 203,
        title: "Áo khoác",
        subclassifications: [
          {
            id: 2005,
            title: "Áo khoác mùa đông",
          },
          {
            id: 2006,
            title: "Áo choàng",
          },
          {
            id: 2007,
            title: "Áo blazer",
          },
          {
            id: 2008,
            title: "Áo khoác ngoài",
          },
          {
            id: 2009,
            title: "Áo vest",
          },
          {
            id: 2010,
            title: "Khác",
          },
        ],
      },
      {
        id: 204,
        title: "Áo len",
      },
      {
        id: 205,
        title: "Hoodie và Áo nỉ",
        subclassifications: [
          {
            id: 2011,
            title: "Áo khoác nỉ",
          },
          {
            id: 2012,
            title: "Áo hoodies",
          },
          {
            id: 2013,
            title: "Khác",
          },
        ],
      },
      {
        id: 206,
        title: "Bộ",
        subclassifications: [
          {
            id: 2014,
            title: "Bộ đồ đôi",
          },
          {
            id: 2015,
            title: "Bộ đồ gia đình",
          },
          {
            id: 2016,
            title: "Đồ lẻ",
          },
          {
            id: 2017,
            title: "Khác",
          },
        ],
      },
      {
        id: 207,
        title: "Đồ lót",
        subclassifications: [
          {
            id: 2018,
            title: "Bộ đồ lót",
          },
          {
            id: 2019,
            title: "Áo ngực",
          },
          {
            id: 2020,
            title: "Quần lót",
          },
          {
            id: 2021,
            title: "Đồ lót giữ nhiệt",
          },
          {
            id: 2022,
            title: "Phụ kiện đồ lót",
          },
          {
            id: 2023,
            title: "Đồ định hình",
          },
          {
            id: 2024,
            title: "Đồ lót bảo hộ",
          },
          {
            id: 2025,
            title: "Đồ lót gợi cảm",
          },
          {
            id: 2026,
            title: "Khác",
          },
        ],
      },
      {
        id: 208,
        title: "Đồ ngủ",
        subclassifications: [
          {
            id: 2027,
            title: "Pyjama",
          },
          {
            id: 2028,
            title: "Váy ngủ",
          },
          {
            id: 2029,
            title: "Khác",
          },
        ],
      },
      {
        id: 209,
        title: "Đồ bầu",
        subclassifications: [
          {
            id: 2030,
            title: "Áo ngực cho con bú",
          },
          {
            id: 2031,
            title: "Đầm bầu",
          },
          {
            id: 2032,
            title: "Áo bầu",
          },
          {
            id: 2033,
            title: "Đồ mặc cho con bú",
          },
          {
            id: 2034,
            title: "Bộ đồ bầu",
          },
          {
            id: 2035,
            title: "Quần bầu, Váy bầu",
          },
          {
            id: 2036,
            title: "Khác",
          },
        ],
      },
      {
        id: 210,
        title: "Đồ truyền thống",
        subclassifications: [
          {
            id: 2037,
            title: "Áo",
          },
          {
            id: 2038,
            title: "Quần và chân váy",
          },
          {
            id: 2039,
            title: "Bộ",
          },
          {
            id: 2040,
            title: "Đầm",
          },
          {
            id: 2041,
            title: "Khác",
          },
        ],
      },
      {
        id: 211,
        title: "Vớ/Tất",
        subclassifications: [
          {
            id: 2042,
            title: "Tất",
          },
          {
            id: 2043,
            title: "Quần tất",
          },
          {
            id: 2044,
            title: "Khác",
          },
        ],
      },
      {
        id: 212,
        title: "Khác",
      },
    ],
  },
  {
    id: 3,
    title: "Sắc Đẹp",
    image_Url: cosmetic,
    subcategories: [
      {
        id: 301,
        title: "Chăm sóc tay, chân & móng",
        subclassifications: [
          {
            id: 3001,
            title: "Chăm sóc tay",
          },
          {
            id: 3002,
            title: "Chăm sóc chân",
          },
          {
            id: 3003,
            title: "Chăm sóc móng",
          },
          {
            id: 3004,
            title: "Khác",
          },
        ],
      },
      {
        id: 302,
        title: "Chăm sóc tóc",
        subclassifications: [
          {
            id: 3005,
            title: "Dầu gội",
          },
          {
            id: 3006,
            title: "Thuốc nhuộm tóc",
          },
          {
            id: 3007,
            title: "Sản phẩm dưỡng tóc",
          },
          {
            id: 3008,
            title: "Dầu xả",
          },
          {
            id: 3009,
            title: "Sản phẩm tạo kiểu tóc",
          },
          {
            id: 3010,
            title: "Khác",
          },
        ],
      },
      {
        id: 303,
        title: "Chăm sóc nam giới",
        subclassifications: [
          {
            id: 3011,
            title: "Sữa tắm & chăm sóc cơ thể",
          },
          {
            id: 3012,
            title: "Chăm sóc da",
          },
          {
            id: 3013,
            title: "Sản phẩm cạo râu & hớt tóc",
          },
          {
            id: 3014,
            title: "Chăm sóc tóc",
          },
          {
            id: 3015,
            title: "Khác",
          },
        ],
      },
      {
        id: 304,
        title: "Nước hoa",
      },
      {
        id: 305,
        title: "Trang điểm",
        subclassifications: [
          {
            id: 3016,
            title: "Trang điểm mặt",
          },
          {
            id: 3017,
            title: "Trang điểm mắt",
          },
          {
            id: 3018,
            title: "Trang điểm môi",
          },
          {
            id: 3019,
            title: "Tẩy trang",
          },
          {
            id: 3020,
            title: "Khác",
          },
        ],
      },
      {
        id: 306,
        title: "Dụng cụ làm đẹp",
        subclassifications: [
          {
            id: 3021,
            title: "Dụng cụ trang điểm",
          },
          {
            id: 3022,
            title: "Dụng cụ chăm sóc da mặt",
          },
          {
            id: 3023,
            title: "Dụng cụ làm thon gọn cơ thể",
          },
          {
            id: 3024,
            title: "Dụng cụ tẩy lông",
          },
          {
            id: 3025,
            title: "Dụng cụ chăm sóc tóc",
          },
          {
            id: 3026,
            title: "Khác",
          },
        ],
      },
      {
        id: 307,
        title: "Chăm sóc da mặt",
        subclassifications: [
          {
            id: 3027,
            title: "Sữa rửa mặt",
          },
          {
            id: 3028,
            title: "Nước cân bằng da",
          },
          {
            id: 3029,
            title: "Kem dưỡng ẩm",
          },
          {
            id: 3030,
            title: "Dầu dưỡng ẩm",
          },
          {
            id: 3031,
            title: "Xịt khoáng",
          },
          {
            id: 3032,
            title: "Tinh chất dưỡng",
          },
          {
            id: 3033,
            title: "Tẩy tế bào chết",
          },
          {
            id: 3034,
            title: "Mặt nạ",
          },
          {
            id: 3035,
            title: "Sản phẩm dưỡng mắt",
          },
          {
            id: 3036,
            title: "Sản phẩm dưỡng môi",
          },
          {
            id: 3037,
            title: "Kem chống nắng cho mặt",
          },
          {
            id: 3038,
            title: "Kem dưỡng sau chống nắng",
          },
          {
            id: 3039,
            title: "Giấy thấm dầu",
          },
          {
            id: 3040,
            title: "Sản phẩm trị mụn",
          },
          {
            id: 3041,
            title: "Khác",
          },
        ],
      },
      {
        id: 308,
        title: "Bộ sản phẩm làm đẹp",
      },
      {
        id: 309,
        title: "Tắm & chăm sóc cơ thể",
        subclassifications: [
          {
            id: 3042,
            title: "Xà phòng & sữa tắm",
          },
          {
            id: 3043,
            title: "Tẩy tế bào chết cơ thể",
          },
          {
            id: 3044,
            title: "Mặt nạ ủ cơ thể",
          },
          {
            id: 3045,
            title: "Dầu dưỡng da",
          },
          {
            id: 3046,
            title: "Kem & sữa dưỡng thể",
          },
          {
            id: 3047,
            title: "Khử mùi cơ thể",
          },
          {
            id: 3048,
            title: "Dầu massage",
          },
          {
            id: 3049,
            title: "Kem tẩy lông & wax lông",
          },
          {
            id: 3050,
            title: "Chống nắng",
          },
          {
            id: 3051,
            title: "Chăm sóc ngực",
          },
          {
            id: 3052,
            title: "Khác",
          },
        ],
      },
    ],
  },
  {
    id: 4,
    title: "Sức Khoẻ",
    image_Url: healthcare,
    subcategories: [
      {
        id: 401,
        title: "Thực phẩm chức năng",
        subclassifications: [
          {
            id: 4001,
            title: "Hỗ trợ kiểm soát cân nặng",
          },
          {
            id: 4002,
            title: "Hỗ trợ làm đẹp",
          },
          {
            id: 4003,
            title: "Hỗ trợ tăng cơ",
          },
          {
            id: 4004,
            title: "Hỗ trợ sức khoẻ",
          },
          {
            id: 4005,
            title: "Khác",
          },
        ],
      },
      {
        id: 402,
        title: "Vật tư y tế",
        subclassifications: [
          {
            id: 4006,
            title: "Cân sức khoẻ và phân tích cơ thể",
          },
          {
            id: 4007,
            title: "Chăm sóc mũi",
          },
          {
            id: 4008,
            title: "Dụng cụ sơ cứu",
          },
          {
            id: 4009,
            title: "Ống nghe y tế",
          },
          {
            id: 4010,
            title: "Sản phẩm giảm đau dùng ngoài da",
          },
          {
            id: 4011,
            title: "Dụng cụ thí nghiệm",
          },
          {
            id: 4012,
            title: "Bao tay và khẩu trang y tế",
          },
          {
            id: 4013,
            title: "Khác",
          },
        ],
      },
      {
        id: 403,
        title: "Chăm sóc cá nhân",
        subclassifications: [
          {
            id: 4014,
            title: "Dung dịch sát khuẩn tay",
          },
          {
            id: 4015,
            title: "Chăm sóc mắt",
          },
          {
            id: 4016,
            title: "Chăm sóc tai",
          },
          {
            id: 4017,
            title: "Vệ sinh răng miệng",
          },
          {
            id: 4018,
            title: "Tã người lớn",
          },
          {
            id: 4019,
            title: "Chăm sóc phụ nữ",
          },
          {
            id: 4020,
            title: "Dụng cụ massage và trị liệu",
          },
          {
            id: 4021,
            title: "Chống muỗi và xua đuổi côn trùng",
          },
          {
            id: 4022,
            title: "Khác",
          },
        ],
      },
      {
        id: 404,
        title: "Hỗ trợ tình dục",
        subclassifications: [
          {
            id: 4023,
            title: "Bao cao su",
          },
          {
            id: 4024,
            title: "Bôi trơn",
          },
          {
            id: 4025,
            title: "Tăng cường sinh lý",
          },
          {
            id: 4026,
            title: "Khác",
          },
        ],
      },
    ],
  },
  {
    id: 5,
    title: "Phụ Kiện Thời Trang",
    image_Url: assesories,
    subcategories: [
      {
        id: 501,
        title: "Nhẫn",
      },
      {
        id: 502,
        title: "Bông tai",
      },
      {
        id: 503,
        title: "Khăn choàng",
      },
      {
        id: 504,
        title: "Găng tay",
      },
      {
        id: 505,
        title: "Phụ kiện tóc",
        subclassifications: [
          {
            id: 5001,
            title: "Băng đô tóc",
          },
          {
            id: 5002,
            title: "Đồ buộc tóc & Nơ",
          },
          {
            id: 5003,
            title: "Kẹp tóc",
          },
          {
            id: 5004,
            title: "Tóc giả & tóc nối",
          },
          {
            id: 5005,
            title: "Cài tóc, vương miện cài tóc",
          },
          {
            id: 5006,
            title: "Khác",
          },
        ],
      },
      {
        id: 506,
        title: "Vòng tay & Lắc tay",
      },
      {
        id: 507,
        title: "Lắc chân",
      },
      {
        id: 508,
        title: "Mũ",
      },
      {
        id: 509,
        title: "Dây chuyền",
      },
      {
        id: 510,
        title: "Kính mắt",
        subclassifications: [
          {
            id: 5007,
            title: "Kính mát",
          },
          {
            id: 5008,
            title: "Gọng kính",
          },
          {
            id: 5009,
            title: "Hộp kính và phụ kiện",
          },
          {
            id: 5010,
            title: "Khác",
          },
        ],
      },
      {
        id: 511,
        title: "Thắt lưng",
      },
      {
        id: 512,
        title: "Cà vạt & Nơ cổ",
      },
      {
        id: 513,
        title: "Bộ phụ kiện",
      },
      {
        id: 514,
        title: "Khác",
      },
    ],
  },
  {
    id: 6,
    title: "Thiết Bị Điện Gia Dụng",
    image_Url: television,
    subcategories: [
      {
        id: 601,
        title: "Máy chiếu & Phụ kiện",
        subclassifications: [
          {
            id: 6001,
            title: "Máy chiếu & Màn hình chiếu",
          },
          {
            id: 6002,
            title: "Bút trình chiếu",
          },
          {
            id: 6003,
            title: "Khác",
          },
        ],
      },
      {
        id: 602,
        title: "Thiết bị điện gia dụng nhỏ",
        subclassifications: [
          {
            id: 6004,
            title: "Thiết bị vệ sinh chân & Thư giãn",
          },
          {
            id: 6005,
            title: "Máy tăm nước",
          },
          {
            id: 6006,
            title: "Máy may & Phụ kiện",
          },
          {
            id: 6007,
            title: "Bàn là khô & Hơi nước",
          },
          {
            id: 6008,
            title: "Thiết bị xử lý không khí",
          },
          {
            id: 6009,
            title: "Máy hút bụi & Thiết bị làm sạch",
          },
          {
            id: 6010,
            title: "Khác",
          },
        ],
      },
      {
        id: 603,
        title: "Thiết bị điện gia dụng lớn",
        subclassifications: [
          {
            id: 6011,
            title: "Máy giặt & Máy sấy",
          },
          {
            id: 6012,
            title: "Máy nước nóng",
          },
          {
            id: 6013,
            title: "Thiết bị làm mát",
          },
          {
            id: 6014,
            title: "Thiết bị sấy khô nệm & Giày",
          },
          {
            id: 6015,
            title: "Máy sưởi",
          },
          {
            id: 6016,
            title: "Khác",
          },
        ],
      },
      {
        id: 604,
        title: "Tivi & Phụ kiện",
        subclassifications: [
          {
            id: 6017,
            title: "Tivi",
          },
          {
            id: 6018,
            title: "Ăng ten Tivi",
          },
          {
            id: 6019,
            title: "Tivi box & Đầu thi kỹ thuật số",
          },
          {
            id: 6020,
            title: "Giá treo tivi",
          },
          {
            id: 6021,
            title: "Khác",
          },
        ],
      },
      {
        id: 605,
        title: "Đồ gia dụng nhà bếp",
        subclassifications: [
          {
            id: 6022,
            title: "Máy lọc nước",
          },
          {
            id: 6023,
            title: "Ấm đun siêu tốc",
          },
          {
            id: 6024,
            title: "Máy ép, Xay sinh tố",
          },
          {
            id: 6025,
            title: "Máy pha cà phê & Phụ kiện",
          },
          {
            id: 6026,
            title: "Máy rửa bát đĩa",
          },
          {
            id: 6027,
            title: "Lò sưởi, Bếp từ",
          },
          {
            id: 6028,
            title: "Nồi chiên không dầu",
          },
          {
            id: 6029,
            title: "Nồi chiên ngập dầu",
          },
          {
            id: 6030,
            title: "Lò vi sóng",
          },
          {
            id: 6031,
            title: "Lò nướng",
          },
          {
            id: 6032,
            title: "Máy nướng bánh",
          },
          {
            id: 6033,
            title: "Nồi nấu đa năng",
          },
          {
            id: 6034,
            title: "Nồi áp suất",
          },
          {
            id: 6035,
            title: "Nồi cơm điện",
          },
          {
            id: 6036,
            title: "Tủ lạnh",
          },
          {
            id: 6037,
            title: "Tủ đông",
          },
          {
            id: 6038,
            title: "Khác",
          },
        ],
      },
      {
        id: 606,
        title: "Mạch điện & Phụ tùng",
        subclassifications: [
          {
            id: 6039,
            title: "Ổ cắm điện & Dây nối",
          },
          {
            id: 6040,
            title: "Thiết bị an toàn điện tử",
          },
          {
            id: 6041,
            title: "Chuông cửa",
          },
          {
            id: 6042,
            title: "Công tắc",
          },
          {
            id: 6043,
            title: "Thiết bị báo động nhà ở",
          },
          {
            id: 6044,
            title: "Thiết bị chống sấm sét",
          },
          {
            id: 6045,
            title: "Khác",
          },
        ],
      },
      {
        id: 607,
        title: "Pin",
      },
      {
        id: 608,
        title: "Thiết bị điều khiển từ xa",
      },
      {
        id: 609,
        title: "Khác",
      },
    ],
  },
  {
    id: 7,
    title: "Giày Dép Nam",
    image_Url: menshoe,
    subcategories: [
      {
        id: 701,
        title: "Bốt",
        subclassifications: [
          {
            id: 7001,
            title: "Bốt thời trang",
          },
          {
            id: 7002,
            title: "Bốt đi mưa",
          },
          {
            id: 7003,
            title: "Bốt bảo hộ",
          },
          {
            id: 7004,
            title: "Khác",
          },
        ],
      },
      {
        id: 702,
        title: "Giày thể thao/Sneakers",
      },
      {
        id: 703,
        title: "Giày sục",
      },
      {
        id: 704,
        title: "Giày tây lười",
      },
      {
        id: 705,
        title: "Xăng-đan & Dép",
        subclassifications: [
          {
            id: 7005,
            title: "Dép xỏ ngón",
          },
          {
            id: 7006,
            title: "Xăng đan",
          },
          {
            id: 7007,
            title: "Dép đi trong nhà",
          },
          {
            id: 7008,
            title: "Khác",
          },
        ],
      },
      {
        id: 706,
        title: "Phụ kiện giày dép",
        subclassifications: [
          {
            id: 7009,
            title: "Dụng cụ chăm sóc & Vệ sinh giày",
          },
          {
            id: 7010,
            title: "Khử mùi giày dép",
          },
          {
            id: 7011,
            title: "Dây giày",
          },
          {
            id: 7012,
            title: "Cây đón lót & Giữ form giày",
          },
          {
            id: 7013,
            title: "Lót giày",
          },
          {
            id: 7014,
            title: "Khác",
          },
        ],
      },
      {
        id: 707,
        title: "Khác",
      },
    ],
  },
  {
    id: 8,
    title: "Điện Thoại & Phụ Kiện",
    image_Url: smartphone,
    subcategories: [
      {
        id: 801,
        title: "Thẻ sim",
      },
      {
        id: 802,
        title: "Máy tính bảng",
      },
      {
        id: 803,
        title: "Điện thoại",
      },
      {
        id: 804,
        title: "Thiết bị đeo thông minh",
        subclassifications: [
          {
            id: 8001,
            title: "Đồng hồ thông minh & Vòng đeo tay sức khoẻ",
          },
          {
            id: 8002,
            title: "Thiết bị thực tế ảo",
          },
          {
            id: 8003,
            title: "Thiết bị định vị GPS",
          },
          {
            id: 8004,
            title: "Khác",
          },
        ],
      },
      {
        id: 805,
        title: "Phụ kiện",
        subclassifications: [
          {
            id: 8005,
            title: "Phụ kiện selfie",
          },
          {
            id: 8006,
            title: "Ốp kính điện thoại",
          },
          {
            id: 8007,
            title: "Đèn flash điện thoại & Đèn selfie",
          },
          {
            id: 8008,
            title: "Quạt USB & Quạt điện thoại",
          },
          {
            id: 8009,
            title: "Bút cảm ứng",
          },
          {
            id: 8010,
            title: "Kẹp điện thoại",
          },
          {
            id: 8011,
            title: "Dây đeo điện thoại và móc khoá",
          },
          {
            id: 8012,
            title: "Thẻ nhớ",
          },
          {
            id: 8013,
            title: "Thiết bị trình chiếu",
          },
          {
            id: 8014,
            title: "Túi đựng điện thoại",
          },
          {
            id: 8015,
            title: "Cáp, sạc & bộ chuyển đổi",
          },
          {
            id: 8016,
            title: "Đèn USB & Đèn điện thoại",
          },
          {
            id: 8017,
            title: "Bộ phát wifi bỏ túi",
          },
          {
            id: 8018,
            title: "Sạc dự phòng & Pin",
          },
          {
            id: 8019,
            title: "Phụ kiện cho đồng hồ thông minh",
          },
          {
            id: 8020,
            title: "Miếng dán màn hình",
          },
          {
            id: 8021,
            title: "Vỏ bao, Ốp lưng & Miếng dán",
          },
          {
            id: 8022,
            title: "Khác",
          },
        ],
      },
      {
        id: 806,
        title: "Bộ đàm",
      },
      {
        id: 807,
        title: "Khác",
      },
    ],
  },
  {
    id: 9,
    title: "Du lịch & Hành lý",
    image_Url: travel,
    subcategories: [
      {
        id: 901,
        title: "Vali",
      },
      {
        id: 902,
        title: "Túi du lịch",
        subclassifications: [
          {
            id: 9001,
            title: "Túi trống",
          },
          {
            id: 9002,
            title: "Túi gấp gọn",
          },
          {
            id: 9003,
            title: "Túi dây rút",
          },
          {
            id: 9004,
            title: "Túi khác",
          },
        ],
      },
      {
        id: 903,
        title: "Phụ kiện du lịch",
        subclassifications: [
          {
            id: 9005,
            title: "Ví hộ chiếu",
          },
          {
            id: 9006,
            title: "Túi du lịch nhiều ngăn",
          },
          {
            id: 9007,
            title: "Áo trùm vali",
          },
          {
            id: 9008,
            title: "Thẻ hành lý",
          },
          {
            id: 9009,
            title: "Khoá vali",
          },
          {
            id: 9010,
            title: "Gối & Bịt mắt",
          },
          {
            id: 9011,
            title: "Bộ chiết mỹ phẩm",
          },
          {
            id: 9012,
            title: "Phụ kiện khác",
          },
        ],
      },
      {
        id: 904,
        title: "Khác",
      },
    ],
  },
  {
    id: 10,
    title: "Giày Dép nữ",
    image_Url: womenshoe,
    subcategories: [
      {
        id: 1001,
        title: "Bốt",
        subclassifications: [
          {
            id: 10001,
            title: "Bốt đi mưa",
          },
          {
            id: 10002,
            title: "Bốt thời trang",
          },
          {
            id: 10003,
            title: "Khác",
          },
        ],
      },
      {
        id: 1002,
        title: "Giày thể thao/Sneakers",
      },
      {
        id: 1003,
        title: "Giày đế bằng",
        subclassifications: [
          {
            id: 10004,
            title: "Giày bale",
          },
          {
            id: 10005,
            title: "Giày lười",
          },
          {
            id: 10006,
            title: "Giày Oxford & Giày buộc dây",
          },
          {
            id: 10007,
            title: "Giày sục",
          },
          {
            id: 10008,
            title: "Khác",
          },
        ],
      },
      {
        id: 1004,
        title: "Giày cao gót",
      },
      {
        id: 1005,
        title: "Giày đế xuồng",
      },
      {
        id: 1006,
        title: "Xăng-đan & dép",
        subclassifications: [
          {
            id: 10009,
            title: "Xăng-đan đế bằng",
          },
          {
            id: 10010,
            title: "Dép kẹp/dép xỏ ngón",
          },
          {
            id: 10011,
            title: "Dép mát-xa",
          },
          {
            id: 10012,
            title: "Dép đi trong nhà",
          },
          {
            id: 10013,
            title: "Khác",
          },
        ],
      },
      {
        id: 1007,
        title: "Phụ kiện & chăm sóc giày",
        subclassifications: [
          {
            id: 10014,
            title: "Đồ khử mùi giày",
          },
          {
            id: 10015,
            title: "Miếng lót giày",
          },
          {
            id: 10016,
            title: "Cây đón gót & Giữ form dày",
          },
          {
            id: 10017,
            title: "Đồ chăm sóc và làm sạch giày",
          },
          {
            id: 10018,
            title: "Dây giày",
          },
          {
            id: 10019,
            title: "Khác",
          },
        ],
      },
      {
        id: 1008,
        title: "Khác",
      },
    ],
  },
  {
    id: 11,
    title: "Đồng Hồ",
    image_Url: smartwatch,
    subcategories: [
      {
        id: 1101,
        title: "Đồng hồ nữ",
      },
      {
        id: 1102,
        title: "Đồng hồ nam",
      },
      {
        id: 1103,
        title: "Bộ đồng hồ & Đồng hồ cặp",
      },
      {
        id: 1104,
        title: "Phụ kiện đồng hồ",
        subclassifications: [
          {
            id: 11001,
            title: "Dây đồng hồ",
          },
          {
            id: 11002,
            title: "Dụng cụ sửa chữa",
          },
          {
            id: 11003,
            title: "Khoá đồng hồ",
          },
          {
            id: 11004,
            title: "Pin đồng hồ",
          },
          {
            id: 11005,
            title: "Hộp đựng đồng hồ",
          },
          {
            id: 11006,
            title: "Khác",
          },
        ],
      },
      {
        id: 1105,
        title: "Khác",
      },
    ],
  },
  {
    id: 12,
    title: "Thiết Bị Âm Thanh",
    image_Url: audio,
    subcategories: [
      {
        id: 1201,
        title: "Tai nghe nhét tai & chụp tai",
      },
      {
        id: 1202,
        title: "Máy nghe nhạc",
        subclassifications: [
          {
            id: 12001,
            title: "MP3 & MP4",
          },
          {
            id: 12002,
            title: "CD, DVD & Bluray",
          },
          {
            id: 12003,
            title: "Máy ghi âm",
          },
          {
            id: 12004,
            title: "Radio & Cát-sét",
          },
          {
            id: 12005,
            title: "Khác",
          },
        ],
      },
      {
        id: 1203,
        title: "Micro thu âm",
      },
      {
        id: 1204,
        title: "Amply và đầu chỉnh âm",
      },
      {
        id: 1205,
        title: "Dàn âm thanh",
        subclassifications: [
          {
            id: 12006,
            title: "Loa",
          },
          {
            id: 12007,
            title: "Hệ thống âm thanh giải trí tại gia",
          },
          {
            id: 12008,
            title: "Thu sóng AV",
          },
          {
            id: 12009,
            title: "Khác",
          },
        ],
      },
      {
        id: 1206,
        title: "Cáp âm thanh/video & Đầu chuyển",
      },
      {
        id: 1207,
        title: "Khác",
      },
    ],
  },
  {
    id: 13,
    title: "Thực phẩm và đồ uống",
    image_Url: beverage,
    subcategories: [
      {
        id: 1301,
        title: "Đồ chế biến sẵn",
        subclassifications: [
          {
            id: 13001,
            title: "Đồ ăn chế biến sẵn",
          },
          {
            id: 13002,
            title: "Cơm và cháo ăn liền",
          },
          {
            id: 13003,
            title: "Lẩu ăn liền",
          },
          {
            id: 13004,
            title: "Mì ăn liền",
          },
          {
            id: 13005,
            title: "Khác",
          },
        ],
      },
      {
        id: 1302,
        title: "Đồ ăn vặt",
        subclassifications: [
          {
            id: 13006,
            title: "Kẹo",
          },
          {
            id: 13007,
            title: "Sô cô la",
          },
          {
            id: 13008,
            title: "Bánh quy",
          },
          {
            id: 13009,
            title: "Khoai tây lát",
          },
          {
            id: 13010,
            title: "Các loại hạt sấy khô",
          },
          {
            id: 13011,
            title: "Bỏng ngô",
          },
          {
            id: 13012,
            title: "Các loại rong biển ăn liền",
          },
          {
            id: 13013,
            title: "Các loại đậu sấy khô",
          },
          {
            id: 13014,
            title: "Pudding, thạch & kẹo dẻo",
          },
          {
            id: 13015,
            title: "Thức ăn khô",
          },
          {
            id: 13016,
            title: "Khác",
          },
        ],
      },
      {
        id: 1303,
        title: "Nhu yếu phẩm",
        subclassifications: [
          {
            id: 13017,
            title: "Thực phẩm khô",
          },
          {
            id: 13018,
            title: "Mì",
          },
          {
            id: 13019,
            title: "Gạo",
          },
          {
            id: 13020,
            title: "Mỳ Ý",
          },
          {
            id: 13021,
            title: "Thực phẩm đóng hộp",
          },
          {
            id: 13022,
            title: "Rau củ ngâm",
          },
          {
            id: 13023,
            title: "Khác",
          },
        ],
      },
      {
        id: 1304,
        title: "Nguyên liệu nấu ăn",
        subclassifications: [
          {
            id: 13024,
            title: "Dầu ăn",
          },
          {
            id: 13025,
            title: "Gia vị & Hương liệu",
          },
          {
            id: 13026,
            title: "Đường",
          },
          {
            id: 13027,
            title: "Chất tạo ngọt",
          },
          {
            id: 13028,
            title: "Sốt & súp ăn liền",
          },
          {
            id: 13029,
            title: "Gói/bột gia vị",
          },
          {
            id: 13030,
            title: "Phụ gia thực phẩm",
          },
          {
            id: 13031,
            title: "Bột phủ",
          },
          {
            id: 13032,
            title: "Khác",
          },
        ],
      },
      {
        id: 1305,
        title: "Đồ làm bánh",
        subclassifications: [
          {
            id: 13033,
            title: "Hương liệu",
          },
          {
            id: 13034,
            title: "Bột nở và muối nở",
          },
          {
            id: 13035,
            title: "Bột pha sẵn",
          },
          {
            id: 13036,
            title: "Bột mì",
          },
          {
            id: 13037,
            title: "Chất tạo màu",
          },
          {
            id: 13038,
            title: "Đồ trang trí",
          },
          {
            id: 13039,
            title: "Khác",
          },
        ],
      },
      {
        id: 1306,
        title: "Ngũ cốc & mứt",
        subclassifications: [
          {
            id: 13040,
            title: "Mật ong và siro",
          },
          {
            id: 13041,
            title: "Mứt",
          },
          {
            id: 13042,
            title: "Ngũ cốc",
          },
          {
            id: 13043,
            title: "Thanh dinh dưỡng",
          },
          {
            id: 13044,
            title: "Khác",
          },
        ],
      },
      {
        id: 1307,
        title: "Đồ uống",
        subclassifications: [
          {
            id: 13045,
            title: "Cà phê",
          },
          {
            id: 13046,
            title: "Trà & trà túi lọc",
          },
          {
            id: 13047,
            title: "Thức uống Sô cô la",
          },
          {
            id: 13048,
            title: "Nước tăng lực",
          },
          {
            id: 13049,
            title: "Nước tinh khiết",
          },
          {
            id: 13050,
            title: "Nước trái cây lên men",
          },
          {
            id: 13051,
            title: "Siro pha",
          },
          {
            id: 13052,
            title: "Nước có ga",
          },
          {
            id: 13053,
            title: "Bột pha",
          },
          {
            id: 13054,
            title: "Đồ tráng miệng",
          },
          {
            id: 13055,
            title: "Trà thảo mộc",
          },
          {
            id: 13056,
            title: "Topping",
          },
          {
            id: 13057,
            title: "Sữa thực vật",
          },
          {
            id: 13058,
            title: "Khác",
          },
        ],
      },
      {
        id: 1308,
        title: "Sữa - trứng",
        subclassifications: [
          {
            id: 13059,
            title: "Sữa",
          },
          {
            id: 13060,
            title: "Sữa chua",
          },
          {
            id: 13061,
            title: "Bột kem béo",
          },
          {
            id: 13062,
            title: "Bơ động vật & thực vật",
          },
          {
            id: 13063,
            title: "Phô mai & bột phô mai",
          },
          {
            id: 13064,
            title: "Kem",
          },
          {
            id: 13065,
            title: "Trứng",
          },
          {
            id: 13066,
            title: "Đậu phụ",
          },
          {
            id: 13067,
            title: "Khác",
          },
        ],
      },
      {
        id: 1309,
        title: "Thực phẩm tươi sống & đông lạnh",
        subclassifications: [
          {
            id: 13068,
            title: "Thịt",
          },
          {
            id: 13069,
            title: "Hải sản",
          },
          {
            id: 13070,
            title: "Thịt chay",
          },
          {
            id: 13071,
            title: "Rau củ",
          },
          {
            id: 13072,
            title: "Trái cây",
          },
          {
            id: 13073,
            title: "Nấm",
          },
          {
            id: 13074,
            title: "Thực phẩm đông lạnh chế biến sẵn",
          },
          {
            id: 13075,
            title: "Thịt và hải sản chế biến sẵn",
          },
          {
            id: 13076,
            title: "Khác",
          },
        ],
      },
      {
        id: 1310,
        title: "Các loại bánh",
        subclassifications: [
          {
            id: 13077,
            title: "Bánh mì",
          },
          {
            id: 13078,
            title: "Bánh kem",
          },
          {
            id: 13079,
            title: "Bánh ngọt/pastry",
          },
          {
            id: 13080,
            title: "Khác",
          },
        ],
      },
      {
        id: 1311,
        title: "Đồ uống có cồn",
        subclassifications: [
          {
            id: 13081,
            title: "Bia và trái cây lên men",
          },
          {
            id: 13082,
            title: "Rượu vang & Sâm panh",
          },
          {
            id: 13083,
            title: "Rượu mạnh",
          },
          {
            id: 13084,
            title: "Rượu sake, soju & umeshu",
          },
          {
            id: 13085,
            title: "Khác",
          },
        ],
      },
      {
        id: 1312,
        title: "Bộ quà tặng",
      },
      {
        id: 1313,
        title: "Khác",
      },
    ],
  },
  {
    id: 14,
    title: "Chăm Sóc Thú Cưng",
    image_Url: petcare,
    subcategories: [
      {
        id: 1401,
        title: "Thức ăn cho thú cưng",
        subclassifications: [
          {
            id: 14001,
            title: "Thức ăn cho chó",
          },
          {
            id: 14002,
            title: "Snack cho chó",
          },
          {
            id: 14003,
            title: "Thức ăn cho mèo",
          },
          {
            id: 14004,
            title: "Snack cho mèo",
          },
          {
            id: 14005,
            title: "Thức ăn cho thú nhỏ",
          },
          {
            id: 14006,
            title: "Snack cho thú nhỏ",
          },
          {
            id: 14007,
            title: "Thức ăn cho cá",
          },
          {
            id: 14008,
            title: "Thức ăn cho chim",
          },
          {
            id: 14009,
            title: "Thức ăn cho bò sát",
          },
          {
            id: 14010,
            title: "Khác",
          },
        ],
      },
      {
        id: 1402,
        title: "Phụ kiện cho thú cưng",
        subclassifications: [
          {
            id: 14011,
            title: "Bát & dụng cụ ăn",
          },
          {
            id: 14012,
            title: "Thiết bị du lịch",
          },
          {
            id: 14013,
            title: "Vòng cổ, dây dắt & rọ mõm",
          },
          {
            id: 14014,
            title: "Đồ chơi",
          },
          {
            id: 14015,
            title: "Nội thất cho thú cưng",
          },
          {
            id: 14016,
            title: "Phụ kiện thuỷ sinh",
          },
          {
            id: 14017,
            title: "Khác",
          },
        ],
      },
      {
        id: 1403,
        title: "Vệ sinh cho thú cưng",
        subclassifications: [
          {
            id: 14018,
            title: "Khay & Bồn vệ sinh cho mèo",
          },
          {
            id: 14019,
            title: "Lót chuồng cho thú nhỏ",
          },
          {
            id: 14020,
            title: "Tã cho thú cưng",
          },
          {
            id: 14021,
            title: "Khay huấn luyện và vệ sinh cho chó",
          },
          {
            id: 14022,
            title: "Túi & Xẻng dọn vệ sinh",
          },
          {
            id: 14023,
            title: "Khác",
          },
        ],
      },
      {
        id: 1404,
        title: "Làm đẹp cho thú cưng",
        subclassifications: [
          {
            id: 14024,
            title: "Chăm sóc lông",
          },
          {
            id: 14025,
            title: "Chăm sóc răng miệng",
          },
          {
            id: 14026,
            title: "Chăm sóc móng",
          },
          {
            id: 14027,
            title: "Khác",
          },
        ],
      },
      {
        id: 1405,
        title: "Quần áo & phụ kiện",
        subclassifications: [
          {
            id: 14028,
            title: "Quần áo thú cưng",
          },
          {
            id: 14029,
            title: "Áo mưa chó mèo",
          },
          {
            id: 14030,
            title: "Giày, tất & bảo vệ móng",
          },
          {
            id: 14031,
            title: "Phụ kiện đeo cổ",
          },
          {
            id: 14032,
            title: "Kính mắt",
          },
          {
            id: 14033,
            title: "Phụ kiện lông",
          },
          {
            id: 14034,
            title: "Mũ nón thú cưng",
          },
          {
            id: 14035,
            title: "Khác",
          },
        ],
      },
      {
        id: 1406,
        title: "Chăm sóc sức khoẻ",
        subclassifications: [
          {
            id: 14036,
            title: "Vitamin & chất bổ sung dinh dưỡng",
          },
          {
            id: 14037,
            title: "Khác",
          },
        ],
      },
      {
        id: 1407,
        title: "Khác",
      },
    ],
  },
  {
    id: 15,
    title: "Mẹ & Bé",
    image_Url: momandbaby,
    subcategories: [
      {
        id: 1501,
        title: "Đồ dùng du lịch cho bé",
        subclassifications: [
          {
            id: 15001,
            title: "Địu em bé",
          },
          {
            id: 15002,
            title: "Xe đẩy",
          },
          {
            id: 15003,
            title: "Phụ kiện xe đẩy",
          },
          {
            id: 15004,
            title: "Ghế ngồi ô tô & xe máy",
          },
          {
            id: 15005,
            title: "Phụ kiện ghế ngồi ô tô & xe máy",
          },
          {
            id: 15006,
            title: "Túi đựng bỉm sữa",
          },
          {
            id: 15007,
            title: "Dây & Đai dắt trẻ",
          },
          {
            id: 15008,
            title: "Khác",
          },
        ],
      },
      {
        id: 1502,
        title: "Đồ dùng ăn dặm cho bé",
        subclassifications: [
          {
            id: 15009,
            title: "Bình sữa",
          },
          {
            id: 15010,
            title: "Đồ dùng cho con bú",
          },
          {
            id: 15011,
            title: "Ghế ăn dặm",
          },
          {
            id: 15012,
            title: "Đồ dùng cho bé",
          },
          {
            id: 15013,
            title: "Yếm",
          },
          {
            id: 15014,
            title: "Ti giả",
          },
          {
            id: 15015,
            title: "Máy xay cắt thực phẩm",
          },
          {
            id: 15016,
            title: "Khác",
          },
        ],
      },
      {
        id: 1503,
        title: "Phụ kiện cho mẹ",
        subclassifications: [
          {
            id: 15017,
            title: "Đai hỗ trợ bụng",
          },
          {
            id: 15018,
            title: "Gối bầu",
          },
          {
            id: 15019,
            title: "Khác",
          },
        ],
      },
      {
        id: 1504,
        title: "Chăm sóc sức khoẻ mẹ",
        subclassifications: [
          {
            id: 15020,
            title: "Sữa bầu",
          },
          {
            id: 15021,
            title: "Vitamin & Thực phẩm bổ sung",
          },
          {
            id: 15022,
            title: "Kem dưỡng ẩm cho mẹ",
          },
          {
            id: 15023,
            title: "Khác",
          },
        ],
      },
      {
        id: 1505,
        title: "Đồ dùng phòng tắm & Chăm sóc cơ thể bé",
        subclassifications: [
          {
            id: 15024,
            title: "Chậu tắm & Ghế tắm",
          },
          {
            id: 15025,
            title: "Áo choàng tắm, Khăn tắm & Khăn mặt",
          },
          {
            id: 15026,
            title: "Nón tắm",
          },
          {
            id: 15027,
            title: "Dụng cụ tắm & Phụ kiện",
          },
          {
            id: 15028,
            title: "Sản phẩm tắm & gội cho bé",
          },
          {
            id: 15029,
            title: "Nước hoa cho bé",
          },
          {
            id: 15030,
            title: "Bộ chăm sóc trẻ sơ sinh",
          },
          {
            id: 15031,
            title: "Khăn lau",
          },
          {
            id: 15032,
            title: "Giặt xả quần áo trẻ em",
          },
          {
            id: 15033,
            title: "Khác",
          },
        ],
      },
      {
        id: 1506,
        title: "Đồ dùng phòng ngủ cho bé",
        subclassifications: [
          {
            id: 15034,
            title: "Nôi & Cũi & Giường cho bé",
          },
          {
            id: 15035,
            title: "Ghế rung, Ghế nhún & Xích đu tập đi",
          },
          {
            id: 15036,
            title: "Xe tập đi",
          },
          {
            id: 15037,
            title: "Nệm và chăn ga",
          },
          {
            id: 15038,
            title: "Kệ & Tủ",
          },
          {
            id: 15039,
            title: "Khác",
          },
        ],
      },
      {
        id: 1507,
        title: "An toàn cho bé",
        subclassifications: [
          {
            id: 15040,
            title: "Bộ đệm cũi, Quây cũi & Thanh chắn giường",
          },
          {
            id: 15041,
            title: "Bọc góc & Cạnh",
          },
          {
            id: 15042,
            title: "Thanh chắn cửa & Cầu thang",
          },
          {
            id: 15043,
            title: "Khoá & Dây đai an toàn",
          },
          {
            id: 15044,
            title: "Khác",
          },
        ],
      },
      {
        id: 1508,
        title: "Sữa công thức & Thực phẩm cho bé",
        subclassifications: [
          {
            id: 15045,
            title: "Sữa công thức",
          },
          {
            id: 15046,
            title: "Cháo, Thực phẩm xay nhuyễn & Ngũ cốc",
          },
          {
            id: 15047,
            title: "Đồ ăn nhẹ cho bé",
          },
          {
            id: 15048,
            title: "Sữa pha sẵn",
          },
          {
            id: 15049,
            title: "Khác",
          },
        ],
      },
      {
        id: 1509,
        title: "Chăm sóc sức khoẻ bé",
        subclassifications: [
          {
            id: 15050,
            title: "Vitamin & Thực phẩm bổ sung",
          },
          {
            id: 15051,
            title: "Chăm sóc mũi cho bé",
          },
          {
            id: 15052,
            title: "Chăm sóc da cho bé",
          },
          {
            id: 15053,
            title: "Chăm sóc răng miệng cho bé",
          },
          {
            id: 15054,
            title: "Chống nắng cho bé",
          },
          {
            id: 15055,
            title: "Khác",
          },
        ],
      },
      {
        id: 1510,
        title: "Tã & bô em bé",
        subclassifications: [
          {
            id: 15056,
            title: "Bộ lót thay tã",
          },
          {
            id: 15057,
            title: "Bộ thu nhỏ bồn cầu & Bô vệ sinh",
          },
          {
            id: 15058,
            title: "Tã dùng một lần",
          },
          {
            id: 15059,
            title: "Tã vải & Phụ kiện",
          },
          {
            id: 15060,
            title: "Khác",
          },
        ],
      },
      {
        id: 1511,
        title: "Đồ chơi",
        subclassifications: [
          {
            id: 15061,
            title: "Đồ chơi cho trẻ sơ sinh & trẻ nhỏ",
          },
          {
            id: 15062,
            title: "Đồ chơi lắp ráp",
          },
          {
            id: 15063,
            title: "Búp bê & Thú nhồi bông",
          },
          {
            id: 15064,
            title: "Đồ chơi nhập vai",
          },
          {
            id: 15065,
            title: "Xe đồ chơi",
          },
          {
            id: 15066,
            title: "Đồ chơi vận động & Ngoài trời",
          },
          {
            id: 15067,
            title: "Đồ chơi giáo dục",
          },
          {
            id: 15068,
            title: "Đồ chơi robot",
          },
          {
            id: 15069,
            title: "Khác",
          },
        ],
      },
      {
        id: 1512,
        title: "Bộ & Gói quà tặng",
      },
      {
        id: 1513,
        title: "Khác",
      },
    ],
  },
  {
    id: 16,
    title: "Thời trang trẻ em & trẻ sơ sinh",
    image_Url: babyfashion,
    subcategories: [
      {
        id: 1601,
        title: "Quần áo trẻ em",
        subclassifications: [
          {
            id: 16001,
            title: "Áo khoác nhẹ",
          },
          {
            id: 16002,
            title: "Áo khoác mùa đông",
          },
          {
            id: 16003,
            title: "Váy",
          },
          {
            id: 16004,
            title: "Quần/Chân váy",
          },
          {
            id: 16005,
            title: "Đồ ngủ",
          },
          {
            id: 16006,
            title: "Áo",
          },
          {
            id: 16007,
            title: "Bộ đồ liền thân",
          },
          {
            id: 16008,
            title: "Bộ quần áo",
          },
          {
            id: 16009,
            title: "Đồ bơi",
          },
          {
            id: 16010,
            title: "Khác",
          },
        ],
      },
      {
        id: 1602,
        title: "Bao tay trẻ em & Tất",
      },
      {
        id: 1603,
        title: "Phụ kiện trẻ em & trẻ sơ sinh",
        subclassifications: [
          {
            id: 16011,
            title: "Túi xách & vali",
          },
          {
            id: 16012,
            title: "Mũ & mũ lưỡi trai",
          },
          {
            id: 16013,
            title: "Mắt kính",
          },
          {
            id: 16014,
            title: "Phụ kiện tóc",
          },
          {
            id: 16015,
            title: "Găng tay",
          },
          {
            id: 16016,
            title: "Thắt lưng",
          },
          {
            id: 16017,
            title: "Tất",
          },
          {
            id: 16018,
            title: "Khăn",
          },
          {
            id: 16019,
            title: "Đồng hồ",
          },
          {
            id: 16020,
            title: "Trang sức",
          },
          {
            id: 16021,
            title: "Đồ đi mưa",
          },
          {
            id: 16022,
            title: "Chụp tai",
          },
          {
            id: 16023,
            title: "Khác",
          },
        ],
      },
      {
        id: 1604,
        title: "Quần áo bé trai",
        subclassifications: [
          {
            id: 16024,
            title: "Đồ hoá trang",
          },
          {
            id: 16025,
            title: "Đồ lót",
          },
          {
            id: 16026,
            title: "Đồ ngủ",
          },
          {
            id: 16027,
            title: "Đồ bơi",
          },
          {
            id: 16028,
            title: "Áo",
          },
          {
            id: 16029,
            title: "Áo khoác",
          },
          {
            id: 16030,
            title: "Quần",
          },
          {
            id: 16031,
            title: "Com lê & đồ bộ",
          },
          {
            id: 16032,
            title: "Khác",
          },
        ],
      },
      {
        id: 1605,
        title: "Quần áo bé gái",
        subclassifications: [
          {
            id: 16033,
            title: "Đồ hoá trang",
          },
          {
            id: 16034,
            title: "Đồ lót",
          },
          {
            id: 16035,
            title: "Đồ ngủ",
          },
          {
            id: 16036,
            title: "Đồ bơi",
          },
          {
            id: 16037,
            title: "Áo",
          },
          {
            id: 16038,
            title: "Áo khoác",
          },
          {
            id: 16039,
            title: "Quần",
          },
          {
            id: 16040,
            title: "Đồ liền thân",
          },
          {
            id: 16041,
            title: "Váy",
          },
          {
            id: 16042,
            title: "Com lê & đồ bộ",
          },
          {
            id: 16043,
            title: "Khác",
          },
        ],
      },
      {
        id: 1606,
        title: "Giày bé trai",
        subclassifications: [
          {
            id: 16044,
            title: "Bốt",
          },
          {
            id: 16045,
            title: "Dép quai hậu",
          },
          {
            id: 16046,
            title: "Giày thể thao",
          },
          {
            id: 16047,
            title: "Dép lê",
          },
          {
            id: 16048,
            title: "Giày tây",
          },
          {
            id: 16049,
            title: "Giày lười",
          },
          {
            id: 16050,
            title: "Khác",
          },
        ],
      },
      {
        id: 1607,
        title: "Giày bé gái",
        subclassifications: [
          {
            id: 16051,
            title: "Bốt",
          },
          {
            id: 16052,
            title: "Dép quai hậu",
          },
          {
            id: 16053,
            title: "Giày thể thao",
          },
          {
            id: 16054,
            title: "Giày lười",
          },
          {
            id: 16055,
            title: "Dép lê",
          },
          {
            id: 16056,
            title: "Giày bệt",
          },
          {
            id: 16057,
            title: "Khác",
          },
        ],
      },
      {
        id: 1608,
        title: "Khác",
      },
    ],
  },
  {
    id: 17,
    title: "Gaming & Console",
    image_Url: gaming,
    subcategories: [
      {
        id: 1701,
        title: "Máy chơi game",
        subclassifications: [
          {
            id: 17001,
            title: "Playstation",
          },
          {
            id: 17002,
            title: "Xbox",
          },
          {
            id: 17003,
            title: "Wii",
          },
          {
            id: 17004,
            title: "Nintendo DS",
          },
          {
            id: 17005,
            title: "Gameboy",
          },
          {
            id: 17006,
            title: "Switch",
          },
          {
            id: 17007,
            title: "PS Vita",
          },
          {
            id: 17008,
            title: "PSP",
          },
          {
            id: 17009,
            title: "Khác",
          },
        ],
      },
      {
        id: 1702,
        title: "Phụ kiện console",
      },
      {
        id: 1703,
        title: "Video Games",
        subclassifications: [
          {
            id: 17010,
            title: "Game Playstation",
          },
          {
            id: 17011,
            title: "Game Xbox",
          },
          {
            id: 17012,
            title: "Game Wii",
          },
          {
            id: 17013,
            title: "Game Nintendo DS",
          },
          {
            id: 17014,
            title: "Game Gameboy",
          },
          {
            id: 17015,
            title: "Game Switch",
          },
          {
            id: 17016,
            title: "Game PS Vita",
          },
          {
            id: 17017,
            title: "Game PSP",
          },
          {
            id: 17018,
            title: "Game PC",
          },
          {
            id: 17019,
            title: "Game Máy Khác",
          },
        ],
      },
      {
        id: 1704,
        title: "Khác",
      },
    ],
  },
  {
    id: 18,
    title: "Cameras & Flycam",
    image_Url: camera,
    subcategories: [
      {
        id: 1801,
        title: "Máy ảnh",
        subclassifications: [
          {
            id: 18001,
            title: "Máy ảnh kỹ thuật số",
          },
          {
            id: 18002,
            title: "Máy ảnh không gương lật",
          },
          {
            id: 18003,
            title: "Máy quay hành động",
          },
          {
            id: 18004,
            title: "Máy quay phim",
          },
          {
            id: 18005,
            title: "Máy ảnh chụp lấy liền",
          },
          {
            id: 18006,
            title: "Máy ảnh film",
          },
          {
            id: 18007,
            title: "Máy ảnh cơ/DSLRs",
          },
          {
            id: 18008,
            title: "Khác",
          },
        ],
      },
      {
        id: 1802,
        title: "Camera giám sát",
        subclassifications: [
          {
            id: 18009,
            title: "Camera giám sát kết nối internet",
          },
          {
            id: 18010,
            title: "Đầu ghi hình",
          },
          {
            id: 18011,
            title: "Camera giả chống trộm",
          },
          {
            id: 18012,
            title: "Khác",
          },
        ],
      },
      {
        id: 1803,
        title: "Ống kính",
      },
      {
        id: 1804,
        title: "Phụ kiện ống kính",
        subclassifications: [
          {
            id: 18013,
            title: "Ngàm ống kính & Ngàm chuyển đổi ống",
          },
          {
            id: 18014,
            title: "Nắp ống kính",
          },
          {
            id: 18015,
            title: "Kính lọc",
          },
          {
            id: 18016,
            title: "Loa che sáng ống kính",
          },
          {
            id: 18017,
            title: "Khác",
          },
        ],
      },
      {
        id: 1805,
        title: "Phụ kiện máy ảnh",
        subclassifications: [
          {
            id: 18018,
            title: "Đèn Flash",
          },
          {
            id: 18019,
            title: "Phụ kiện đèn Flash",
          },
          {
            id: 18020,
            title: "Tay cầm chống rung",
          },
          {
            id: 18021,
            title: "Thiết bị ánh sáng và phòng chụp",
          },
          {
            id: 18022,
            title: "Giấy & phim in ảnh",
          },
          {
            id: 18023,
            title: "Máy in ảnh",
          },
          {
            id: 18024,
            title: "Túi đựng máy ảnh",
          },
          {
            id: 18025,
            title: "Bộ sạc pin",
          },
          {
            id: 18026,
            title: "Đế pin",
          },
          {
            id: 18027,
            title: "Chân máy ảnh",
          },
          {
            id: 18028,
            title: "Khác",
          },
        ],
      },
      {
        id: 1806,
        title: "Phụ kiện chăm sóc máy ảnh",
        subclassifications: [
          {
            id: 18029,
            title: "Tủ & hộp chống ẩm",
          },
          {
            id: 18030,
            title: "Bộ vệ sinh máy ảnh",
          },
          {
            id: 18031,
            title: "Gói hút ẩm",
          },
          {
            id: 18032,
            title: "Bóng thổi bụi",
          },
          {
            id: 18033,
            title: "Bút lau & bàn chải làm sạch ống kính",
          },
          {
            id: 18034,
            title: "Khác",
          },
        ],
      },
      {
        id: 1807,
        title: "Flycam",
      },
      {
        id: 1808,
        title: "Khác",
      },
    ],
  },
  {
    id: 19,
    title: "Nhà cửa & Đời sống",
    image_Url: homedecor,
    subcategories: [
      {
        id: 1901,
        title: "Chất khử mùi, làm thơm nhà",
        subclassifications: [
          {
            id: 19001,
            title: "Chất khử mùi, làm thơm",
          },
          {
            id: 19002,
            title: "Tinh dầu thơm",
          },
          {
            id: 19003,
            title: "Máy khuếch tán, tạo ẩm & xông tinh dầu",
          },
          {
            id: 19004,
            title: "Khác",
          },
        ],
      },
      {
        id: 1902,
        title: "Đồ dùng phòng tắm",
        subclassifications: [
          {
            id: 19005,
            title: "Bồn cầu, ghế và nắp bồn cầu",
          },
          {
            id: 19006,
            title: "Kệ đựng bàn chải, kệ nhả kem đánh răng",
          },
          {
            id: 19007,
            title: "Kệ đựng xà phòng",
          },
          {
            id: 19008,
            title: "Kệ để đồ phòng tắm",
          },
          {
            id: 19009,
            title: "Bồn tắm",
          },
          {
            id: 19010,
            title: "Khăn mặt, khăn tắm, áo choàng tắm",
          },
          {
            id: 19011,
            title: "Vòi sen & vòi xịt vệ sinh",
          },
          {
            id: 19012,
            title: "Bông tắm",
          },
          {
            id: 19013,
            title: "Rèm cửa nhà tắm",
          },
          {
            id: 19014,
            title: "Ghế nhà tắm, ghế chống trượt",
          },
          {
            id: 19015,
            title: "Tay cầm an toàn",
          },
          {
            id: 19016,
            title: "Mũ tắm",
          },
          {
            id: 19017,
            title: "Khác",
          },
        ],
      },
      {
        id: 1903,
        title: "Chăn ga gối nệm",
        subclassifications: [
          {
            id: 19018,
            title: "Chiếu điều hoà",
          },
          {
            id: 19019,
            title: "Tấm bảo vệ nệm, topper",
          },
          {
            id: 19020,
            title: "Chăn, mền",
          },
          {
            id: 19021,
            title: "Gối",
          },
          {
            id: 19022,
            title: "Ga trải giường, vỏ gối",
          },
          {
            id: 19023,
            title: "Nệm",
          },
          {
            id: 19024,
            title: "Mùng/Màn chống muỗi",
          },
          {
            id: 19025,
            title: "Gối ôm",
          },
          {
            id: 19026,
            title: "Khác",
          },
        ],
      },
      {
        id: 1904,
        title: "Trang trí nhà cửa",
        subclassifications: [
          {
            id: 19027,
            title: "Hoa trang trí",
          },
          {
            id: 19028,
            title: "Vỏ bọc nội thất",
          },
          {
            id: 19029,
            title: "Rèm cửa, màn che",
          },
          {
            id: 19030,
            title: "Khung ảnh & vật trang trí tường",
          },
          {
            id: 19031,
            title: "Decal, tranh dán tường",
          },
          {
            id: 19032,
            title: "Đồng hồ",
          },
          {
            id: 19033,
            title: "Thảm chùi chân",
          },
          {
            id: 19034,
            title: "Thảm trải sàn",
          },
          {
            id: 19035,
            title: "Bình trang trí",
          },
          {
            id: 19036,
            title: "Nến & đồ đựng nến",
          },
          {
            id: 19037,
            title: "Gương",
          },
          {
            id: 19038,
            title: "Khăn trải bàn",
          },
          {
            id: 19039,
            title: "Khác",
          },
        ],
      },
      {
        id: 1905,
        title: "Túi làm ấm",
      },
      {
        id: 1906,
        title: "Nội thất",
        subclassifications: [
          {
            id: 19040,
            title: "Đệm ngồi",
          },
          {
            id: 19041,
            title: "Miếng chặn cửa",
          },
          {
            id: 19042,
            title: "Giường, khung giường",
          },
          {
            id: 19043,
            title: "Bàn",
          },
          {
            id: 19044,
            title: "Tủ quần áo",
          },
          {
            id: 19045,
            title: "Ghế, ghế dài, ghế đẩu",
          },
          {
            id: 19046,
            title: "Ghế sofa",
          },
          {
            id: 19047,
            title: "Tủ bếp",
          },
          {
            id: 19048,
            title: "Kệ & Giá",
          },
          {
            id: 19049,
            title: "Khác",
          },
        ],
      },
      {
        id: 1907,
        title: "Làm vườn",
        subclassifications: [
          {
            id: 19050,
            title: "Cây cảnh",
          },
          {
            id: 19051,
            title: "Trang trí vườn",
          },
          {
            id: 19052,
            title: "Đất trồng",
          },
          {
            id: 19053,
            title: "Phân bón",
          },
          {
            id: 19054,
            title: "Hạt giống & chất hỗ trợ trồng cây",
          },
          {
            id: 19055,
            title: "Chậu cây",
          },
          {
            id: 19056,
            title: "Hệ thống tưới nước",
          },
          {
            id: 19057,
            title: "Dụng cụ làm vườn",
          },
          {
            id: 19058,
            title: "Máy cắt cỏ, dụng cụ cắt cỏ",
          },
          {
            id: 19059,
            title: "Khác",
          },
        ],
      },
      {
        id: 1908,
        title: "Dụng cụ & Thiết bị tiện ích",
        subclassifications: [
          {
            id: 19060,
            title: "Keo & chất kết dính công nghiệp",
          },
          {
            id: 19061,
            title: "Găng tay, kính bảo hộ & mặt nạ",
          },
          {
            id: 19062,
            title: "Chậu rửa & vòi nước",
          },
          {
            id: 19063,
            title: "Sơn & Chất chống thấm tường",
          },
          {
            id: 19064,
            title: "Mái & sàn",
          },
          {
            id: 19065,
            title: "Dụng cụ",
          },
          {
            id: 19066,
            title: "Máy bơm nước & phụ kiện",
          },
          {
            id: 19067,
            title: "Máy bơm khí & phụ kiện",
          },
          {
            id: 19068,
            title: "Thang",
          },
          {
            id: 19069,
            title: "Xe đẩy",
          },
          {
            id: 19070,
            title: "Mái hiên, bạt phủ",
          },
          {
            id: 19071,
            title: "Vật liệu xây dựng",
          },
          {
            id: 19072,
            title: "Cửa & cửa sổ",
          },
          {
            id: 19073,
            title: "Khác",
          },
        ],
      },
      {
        id: 1909,
        title: "Dụng cụ chăm sóc nhà cửa",
        subclassifications: [
          {
            id: 19074,
            title: "Dây phơi & giá phơi quần áo",
          },
          {
            id: 19075,
            title: "Bàn chải vệ sinh",
          },
          {
            id: 19076,
            title: "Chổi",
          },
          {
            id: 19077,
            title: "Chổi phủi bụi",
          },
          {
            id: 19078,
            title: "Cây lau nhà",
          },
          {
            id: 19079,
            title: "Chậu, xô & gáo nước",
          },
          {
            id: 19080,
            title: "Miếng bọt biển, miếng chà vệ sinh",
          },
          {
            id: 19081,
            title: "Thùng rác",
          },
          {
            id: 19082,
            title: "Túi nilon & túi rác",
          },
          {
            id: 19083,
            title: "Khăn vệ sinh",
          },
          {
            id: 19084,
            title: "Thuốc và dụng cụ diệt côn trùng",
          },
          {
            id: 19085,
            title: "Khăn giấy, giấy ướt",
          },
          {
            id: 19086,
            title: "Giấy vệ sinh",
          },
          {
            id: 19087,
            title: "Chất tẩy rửa",
          },
          {
            id: 19088,
            title: "Phụ kiện giặt là",
          },
          {
            id: 19089,
            title: "Khác",
          },
        ],
      },
      {
        id: 1910,
        title: "Dụng cụ nhà bếp",
        subclassifications: [
          {
            id: 19090,
            title: "Lò nướng & phụ kiện",
          },
          {
            id: 19091,
            title: "Dụng cụ nướng & trang trí bánh",
          },
          {
            id: 19092,
            title: "Chảo",
          },
          {
            id: 19093,
            title: "Nồi",
          },
          {
            id: 19094,
            title: "Hộp đựng thực phẩm",
          },
          {
            id: 19095,
            title: "Màng bọc thực phẩm",
          },
          {
            id: 19096,
            title: "Giấy bạc",
          },
          {
            id: 19097,
            title: "Dụng cụ pha trà, cà phê",
          },
          {
            id: 19098,
            title: "Kệ để đồ nhà bếp",
          },
          {
            id: 19099,
            title: "Tạp dề & găng tay nấu nướng",
          },
          {
            id: 19100,
            title: "Cây vét bột & đồ gắp thức ăn",
          },
          {
            id: 19101,
            title: "Thớt",
          },
          {
            id: 19102,
            title: "Dao & kéo",
          },
          {
            id: 19103,
            title: "Phới đánh trứng",
          },
          {
            id: 19104,
            title: "Dụng cụ mở hộp",
          },
          {
            id: 19105,
            title: "Dụng cụ đo lường",
          },
          {
            id: 19106,
            title: "Dụng cụ lọc",
          },
          {
            id: 19107,
            title: "Bàn nạo, dụng cụ bào, cắt",
          },
          {
            id: 19108,
            title: "Cân nhà bếp",
          },
          {
            id: 19109,
            title: "Dụng cụ hút chân không",
          },
          {
            id: 19110,
            title: "Khác",
          },
        ],
      },
      {
        id: 1911,
        title: "Bộ đồ bàn ăn",
        subclassifications: [
          {
            id: 19111,
            title: "Bình nước",
          },
          {
            id: 19112,
            title: "Bộ ấm trà",
          },
          {
            id: 19113,
            title: "Cốc, ly, tách uống nước",
          },
          {
            id: 19114,
            title: "Bình nước & phụ kiện",
          },
          {
            id: 19115,
            title: "Tô",
          },
          {
            id: 19116,
            title: "Dĩa",
          },
          {
            id: 19117,
            title: "Bộ dao kéo",
          },
          {
            id: 19118,
            title: "Ống hút",
          },
          {
            id: 19119,
            title: "Lồng bàn",
          },
          {
            id: 19120,
            title: "Khay, tấm lót bàn ăn",
          },
          {
            id: 19121,
            title: "Khác",
          },
        ],
      },
      {
        id: 1912,
        title: "Đèn",
      },
      {
        id: 1913,
        title: "Bảo hộ gia đình",
        subclassifications: [
          {
            id: 19122,
            title: "Két sắt",
          },
          {
            id: 19123,
            title: "Thiết bị chữa cháy",
          },
          {
            id: 19124,
            title: "Khoá, ổ khoá",
          },
          {
            id: 19125,
            title: "Khác",
          },
        ],
      },
      {
        id: 1914,
        title: "Sắp xếp nhà cửa",
        subclassifications: [
          {
            id: 19126,
            title: "Mắc áo",
          },
          {
            id: 19127,
            title: "Hộp đựng, giỏ đựng đồ",
          },
          {
            id: 19128,
            title: "Kệ giày, hộp giày",
          },
          {
            id: 19129,
            title: "Móc treo",
          },
          {
            id: 19130,
            title: "Túi giặt, giỏ đựng quần áo",
          },
          {
            id: 19131,
            title: "Kệ sách để bàn",
          },
          {
            id: 19132,
            title: "Sắp xếp tủ quần áo",
          },
          {
            id: 19133,
            title: "Hộp đựng trang sức",
          },
          {
            id: 19134,
            title: "Hộp khăn giấy",
          },
          {
            id: 19135,
            title: "Khác",
          },
        ],
      },
      {
        id: 1915,
        title: "Trang trí tiệc tùng",
        subclassifications: [
          {
            id: 19136,
            title: "Bong bóng",
          },
          {
            id: 19137,
            title: "Kẹp gỗ",
          },
          {
            id: 19138,
            title: "Phông nền, biểu ngữ",
          },
          {
            id: 19139,
            title: "Thiệp",
          },
          {
            id: 19140,
            title: "Chén, đĩa dùng một lần",
          },
          {
            id: 19141,
            title: "Mũ, mặt nạ dự tiệc",
          },
          {
            id: 19142,
            title: "Băng đeo chéo",
          },
          {
            id: 19143,
            title: "Khác",
          },
        ],
      },
      {
        id: 1916,
        title: "Đồ thờ cúng, phong thuỷ",
      },
      {
        id: 1917,
        title: "Khác",
      },
    ],
  },
  {
    id: 20,
    title: "Thể Thao & Dã Ngoại",
    image_Url: camping,
    subcategories: [
      {
        id: 2001,
        title: "Dụng cụ thể thao & Dã ngoại",
        subclassifications: [
          {
            id: 20001,
            title: "Câu cá",
          },
          {
            id: 20002,
            title: "Đạp xe",
          },
          {
            id: 20003,
            title: "Cắm trại & Dã ngoại",
          },
          {
            id: 20004,
            title: "Leo núi",
          },
          {
            id: 20005,
            title: "Thể thao ván trượt",
          },
          {
            id: 20006,
            title: "Bóng đá, Futsal & Cầu mây",
          },
          {
            id: 20007,
            title: "Bóng rổ",
          },
          {
            id: 20008,
            title: "Bóng chuyền",
          },
          {
            id: 20009,
            title: "Cầu lông",
          },
          {
            id: 20010,
            title: "Tennis",
          },
          {
            id: 20011,
            title: "Bóng bàn",
          },
          {
            id: 20012,
            title: "Đấm bốc & Võ tổng hợp",
          },
          {
            id: 20013,
            title: "Golf",
          },
          {
            id: 20014,
            title: "Bóng chày & Bóng ném",
          },
          {
            id: 20015,
            title: "Bóng quần",
          },
          {
            id: 20016,
            title: "Bắn súng & Game sinh tồn",
          },
          {
            id: 20017,
            title: "Bóng bầu dục",
          },
          {
            id: 20018,
            title: "Bida",
          },
          {
            id: 20019,
            title: "Lướt ván",
          },
          {
            id: 20020,
            title: "Trượt tuyết & Thể thao mùa đông",
          },
          {
            id: 20021,
            title: "Bơi lội & Lặn",
          },
          {
            id: 20022,
            title: "Chèo thuyền",
          },
          {
            id: 20023,
            title: "Yoga & Pilates",
          },
          {
            id: 20024,
            title: "Thiết bị thể thao",
          },
          {
            id: 20025,
            title: "Ném phi tiêu",
          },
          {
            id: 20026,
            title: "Môn thể thao khác",
          },
        ],
      },
      {
        id: 2002,
        title: "Giày thể thao",
        subclassifications: [
          {
            id: 20027,
            title: "Giày bóng rổ",
          },
          {
            id: 20028,
            title: "Giày chạy bộ",
          },
          {
            id: 20029,
            title: "Giày tập luyện",
          },
          {
            id: 20030,
            title: "Giày tennis",
          },
          {
            id: 20031,
            title: "Giày bóng chuyền",
          },
          {
            id: 20032,
            title: "Giày cầu lông",
          },
          {
            id: 20033,
            title: "Giày futsal",
          },
          {
            id: 20034,
            title: "Giày dã ngoại",
          },
          {
            id: 20035,
            title: "Giày bóng đá",
          },
          {
            id: 20036,
            title: "Giày thể thao trẻ em",
          },
          {
            id: 20037,
            title: "Giày thể thao khác",
          },
        ],
      },
      {
        id: 2003,
        title: "Thời trang thể thao & Dã ngoại",
        subclassifications: [
          {
            id: 20038,
            title: "Bộ đồ thể thao",
          },
          {
            id: 20039,
            title: "Áo khoác",
          },
          {
            id: 20040,
            title: "Áo thể thao",
          },
          {
            id: 20041,
            title: "Áo CLB",
          },
          {
            id: 20042,
            title: "Quần thể thao",
          },
          {
            id: 20043,
            title: "Đồ bơi",
          },
          {
            id: 20044,
            title: "Áo lót thể thao",
          },
          {
            id: 20045,
            title: "Thời trang thể thao trẻ em",
          },
          {
            id: 20046,
            title: "Khác",
          },
        ],
      },
      {
        id: 2004,
        title: "Phụ kiện thể thao & Dã ngoại",
        subclassifications: [
          {
            id: 20047,
            title: "Đồng hồ bấm giây & Máy đếm bước chân",
          },
          {
            id: 20048,
            title: "Túi đựng giày",
          },
          {
            id: 20049,
            title: "Vòng tay thể thao",
          },
          {
            id: 20050,
            title: "Băng đô thể thao",
          },
          {
            id: 20051,
            title: "Mũ thể thao & Dã ngoại",
          },
          {
            id: 20052,
            title: "Túi chống thấm",
          },
          {
            id: 20053,
            title: "Áo mưa",
          },
          {
            id: 20054,
            title: "Ô/Dù",
          },
          {
            id: 20055,
            title: "Dụng cụ bảo vệ miệng & Băng keo thể thao",
          },
          {
            id: 20056,
            title: "Phụ kiện tập luyện",
          },
          {
            id: 20057,
            title: "Đồ bảo hộ gym",
          },
          {
            id: 20058,
            title: "Phụ kiện khác",
          },
        ],
      },
      {
        id: 2005,
        title: "Khác",
      },
    ],
  },
  {
    id: 21,
    title: "Văn Phòng Phẩm",
    image_Url: stationery,
    subcategories: [
      {
        id: 2101,
        title: "Quà tặng - Giấy gói",
        subclassifications: [
          {
            id: 21001,
            title: "Giấy gói quà",
          },
          {
            id: 21002,
            title: "Hộp quà tặng",
          },
          {
            id: 21003,
            title: "Túi quà tặng",
          },
          {
            id: 21004,
            title: "Ruy băng",
          },
          {
            id: 21005,
            title: "Xốp chống sốc",
          },
          {
            id: 21006,
            title: "Hộp carton",
          },
          {
            id: 21007,
            title: "Khác",
          },
        ],
      },
      {
        id: 2102,
        title: "Bút các loại",
        subclassifications: [
          {
            id: 21008,
            title: "Bút & Mực",
          },
          {
            id: 21009,
            title: "Bút chì",
          },
          {
            id: 21010,
            title: "Dụng cụ tẩy xoá",
          },
          {
            id: 21011,
            title: "Bút lông màu",
          },
          {
            id: 21012,
            title: "Bút dạ quang",
          },
          {
            id: 21013,
            title: "Khác",
          },
        ],
      },
      {
        id: 2103,
        title: "Thiết bị trường học",
        subclassifications: [
          {
            id: 21014,
            title: "Bảng viết & giá treo bảng",
          },
          {
            id: 21015,
            title: "Máy tính cầm tay",
          },
          {
            id: 21016,
            title: "Dao rọc giấy & Máy cắt giấy",
          },
          {
            id: 21017,
            title: "Dây & Băng keo dán",
          },
          {
            id: 21018,
            title: "Hồ dán",
          },
          {
            id: 21019,
            title: "Máy in nhãn",
          },
          {
            id: 21020,
            title: "Dây đeo thẻ & Thẻ tên",
          },
          {
            id: 21021,
            title: "Kẹp & Ghim bấm",
          },
          {
            id: 21022,
            title: "Máy đục lỗ",
          },
          {
            id: 21023,
            title: "Kéo",
          },
          {
            id: 21024,
            title: "Mực đóng dấu",
          },
          {
            id: 21025,
            title: "Đồ bấm kim và kim bấm",
          },
          {
            id: 21026,
            title: "Lịch",
          },
          {
            id: 21027,
            title: "Dụng cụ lưu trữ giấy tờ",
          },
          {
            id: 21028,
            title: "Thước các loại & Giấy nến",
          },
          {
            id: 21029,
            title: "Gọt bút chì",
          },
          {
            id: 21030,
            title: "Hộp bút",
          },
          {
            id: 21031,
            title: "Khác",
          },
        ],
      },
      {
        id: 2104,
        title: "Hoạ cụ",
        subclassifications: [
          {
            id: 21032,
            title: "Bút chì màu",
          },
          {
            id: 21033,
            title: "Bút màu & Phấn màu",
          },
          {
            id: 21034,
            title: "Màu nước",
          },
          {
            id: 21035,
            title: "Sơn dầu",
          },
          {
            id: 21036,
            title: "Sơn acrylic",
          },
          {
            id: 21037,
            title: "Cọ vẽ",
          },
          {
            id: 21038,
            title: "Bảng màu",
          },
          {
            id: 21039,
            title: "Vải & Giá vẽ",
          },
          {
            id: 21040,
            title: "Sổ vẽ phác thảo",
          },
          {
            id: 21041,
            title: "Khác",
          },
        ],
      },
      {
        id: 2105,
        title: "Sổ & Giấy các loại",
        subclassifications: [
          {
            id: 21042,
            title: "Đánh dấu trang",
          },
          {
            id: 21043,
            title: "Bọc sách",
          },
          {
            id: 21044,
            title: "Giấy nhiệt",
          },
          {
            id: 21045,
            title: "Giấy in",
          },
          {
            id: 21046,
            title: "Ruột sổ",
          },
          {
            id: 21047,
            title: "Giấy ghi chú",
          },
          {
            id: 21048,
            title: "Giấy mỹ thuật",
          },
          {
            id: 21049,
            title: "Tập, Vở các loại",
          },
          {
            id: 21050,
            title: "Nhãn dán các loại",
          },
          {
            id: 21051,
            title: "Khác",
          },
        ],
      },
      {
        id: 2106,
        title: "Thư tín",
        subclassifications: [
          {
            id: 21052,
            title: "Phong bì & Bao lì xì",
          },
          {
            id: 21053,
            title: "Bưu thiếp",
          },
          {
            id: 21054,
            title: "Tem các loại",
          },
          {
            id: 21055,
            title: "Khác",
          },
        ],
      },
      {
        id: 2107,
        title: "Khác",
      },
    ],
  },
  {
    id: 22,
    title: "Sở thích & Sưu tầm",
    image_Url: hobbies,
    subcategories: [
      {
        id: 2201,
        title: "Đồ sưu tầm",
        subclassifications: [
          {
            id: 22001,
            title: "Mô hình nhân vật",
          },
          {
            id: 22002,
            title: "Tượng tĩnh",
          },
          {
            id: 22003,
            title: "Mô hình mecha/gundam",
          },
          {
            id: 22004,
            title: "Mô hình xe",
          },
          {
            id: 22005,
            title: "Bộ sưu tập nhân vật nổi tiếng",
          },
          {
            id: 22006,
            title: "Bộ sưu tập thể thao",
          },
          {
            id: 22007,
            title: "Bộ sưu tập hoạt hình truyện tranh",
          },
          {
            id: 22008,
            title: "Tiền xu & tiền giấy sưu tầm",
          },
          {
            id: 22009,
            title: "Khác",
          },
        ],
      },
      {
        id: 2202,
        title: "Quà lưu niệm",
        subclassifications: [
          {
            id: 22010,
            title: "Quạt cầm tay",
          },
          {
            id: 22011,
            title: "Móc khoá",
          },
          {
            id: 22012,
            title: "Ống tiết kiệm",
          },
          {
            id: 22013,
            title: "Nam châm",
          },
          {
            id: 22014,
            title: "Khác",
          },
        ],
      },
      {
        id: 2203,
        title: "Đồ chơi - Giải trí",
        subclassifications: [
          {
            id: 22015,
            title: "Đồ chơi thẻ bài & boardgame",
          },
          {
            id: 22016,
            title: "Đồ chơi ảo thuật",
          },
          {
            id: 22017,
            title: "Đồ chơi chọc ghẹo",
          },
          {
            id: 22018,
            title: "Đồ chơi rubik",
          },
          {
            id: 22019,
            title: "Đồ chơi con xoay",
          },
          {
            id: 22020,
            title: "Kendama",
          },
          {
            id: 22021,
            title: "Yo yo",
          },
          {
            id: 22022,
            title: "Đồ chơi điều khiển từ xa",
          },
          {
            id: 22023,
            title: "Đồ chơi trứng",
          },
          {
            id: 22024,
            title: "Khác",
          },
        ],
      },
      {
        id: 2204,
        title: "Băng - Đĩa",
      },
      {
        id: 2205,
        title: "Nhạc cụ & Phụ kiện",
        subclassifications: [
          {
            id: 22025,
            title: "Đàn piano & Organ",
          },
          {
            id: 22026,
            title: "Nhạc cụ gõ",
          },
          {
            id: 22027,
            title: "Sáo, kèn",
          },
          {
            id: 22028,
            title: "Phụ kiện âm nhạc",
          },
          {
            id: 22029,
            title: "Nhạc cụ dây",
          },
          {
            id: 22030,
            title: "Khác",
          },
        ],
      },
      {
        id: 2206,
        title: "Đĩa than",
      },
      {
        id: 2207,
        title: "Album ảnh",
      },
      {
        id: 2208,
        title: "Dụng cụ may vá",
      },
      {
        id: 2209,
        title: "Khác",
      },
    ],
  },
  {
    id: 23,
    title: "Máy tính & Laptop",
    image_Url: laptop,
    subcategories: [
      {
        id: 2301,
        title: "Máy tính bàn",
        subclassifications: [
          {
            id: 23001,
            title: "Bộ máy tính bàn",
          },
          {
            id: 23002,
            title: "Máy tính mini",
          },
          {
            id: 23003,
            title: "Máy chủ",
          },
          {
            id: 23004,
            title: "Máy tính All in one",
          },
          {
            id: 23005,
            title: "Khác",
          },
        ],
      },
      {
        id: 2302,
        title: "Màn hình",
      },
      {
        id: 2303,
        title: "Linh kiện máy tính",
        subclassifications: [
          {
            id: 23006,
            title: "Quạt và tản nhiệt",
          },
          {
            id: 23007,
            title: "CPU - Bộ vi xử lý",
          },
          {
            id: 23008,
            title: "Mainboard - Bo mạch chủ",
          },
          {
            id: 23009,
            title: "VGA - Card màn hình",
          },
          {
            id: 23010,
            title: "Keo tản nhiệt",
          },
          {
            id: 23011,
            title: "Nguồn máy tính",
          },
          {
            id: 23012,
            title: "Ram máy tính",
          },
          {
            id: 23013,
            title: "Bộ lưu điện",
          },
          {
            id: 23014,
            title: "Case máy tính",
          },
          {
            id: 23015,
            title: "Ổ đĩa quang",
          },
          {
            id: 23016,
            title: "Bo mạch âm thanh",
          },
          {
            id: 23017,
            title: "Khác",
          },
        ],
      },
      {
        id: 2304,
        title: "Thiết bị lưu trữ",
        subclassifications: [
          {
            id: 23018,
            title: "Ổ cứng di động",
          },
          {
            id: 23019,
            title: "Ổ cứng SSD",
          },
          {
            id: 23020,
            title: "Ổ cứng mạng(NAS)",
          },
          {
            id: 23021,
            title: "USB & OTG",
          },
          {
            id: 23022,
            title: "Thiết bị đựng ổ cứng",
          },
          {
            id: 23023,
            title: "Đĩa CD",
          },
          {
            id: 23024,
            title: "Khác",
          },
        ],
      },
      {
        id: 2305,
        title: "Thiết bị mạng",
        subclassifications: [
          {
            id: 23025,
            title: "Bộ phát Wifi",
          },
          {
            id: 23026,
            title: "Bộ kích Wifi",
          },
          {
            id: 23027,
            title: "Bộ thu Wifi",
          },
          {
            id: 23028,
            title: "Bộ chuyển đổi mạng",
          },
          {
            id: 23029,
            title: "Bộ chia mạng",
          },
          {
            id: 23030,
            title: "Cáp máy tính",
          },
          {
            id: 23031,
            title: "Bộ chuyển mạch KVM",
          },
          {
            id: 23032,
            title: "Máy chủ máy in",
          },
          {
            id: 23033,
            title: "Khác",
          },
        ],
      },
      {
        id: 2306,
        title: "Phần mềm",
      },
      {
        id: 2307,
        title: "Thiết bị văn phòng",
        subclassifications: [
          {
            id: 23034,
            title: "Máy đánh chữ",
          },
          {
            id: 23035,
            title: "Máy chấm công",
          },
          {
            id: 23036,
            title: "Máy huỷ tài liệu",
          },
          {
            id: 23037,
            title: "Máy đếm tiền",
          },
          {
            id: 23038,
            title: "Khác",
          },
        ],
      },
      {
        id: 2308,
        title: "Máy in & Máy scan",
        subclassifications: [
          {
            id: 23039,
            title: "Máy in, máy scan & Máy photo",
          },
          {
            id: 23040,
            title: "Máy in mã vạch",
          },
          {
            id: 23041,
            title: "Máy in & Khay mực",
          },
          {
            id: 23042,
            title: "Máy in 3D",
          },
          {
            id: 23043,
            title: "Khác",
          },
        ],
      },
      {
        id: 2309,
        title: "Phụ kiện máy tính",
        subclassifications: [
          {
            id: 23044,
            title: "Bộ chia cổng USB & Đọc thẻ nhớ",
          },
          {
            id: 23045,
            title: "Webcam",
          },
          {
            id: 23046,
            title: "Miếng dán & Ốp laptop",
          },
          {
            id: 23047,
            title: "Đế tản nhiệt",
          },
          {
            id: 23048,
            title: "Bàn laptop",
          },
          {
            id: 23049,
            title: "Miếng dán bàn phím",
          },
          {
            id: 23050,
            title: "Pin laptop",
          },
          {
            id: 23051,
            title: "Bộ sạc laptop",
          },
          {
            id: 23052,
            title: "Thiết bị truyền hình hội nghị",
          },
          {
            id: 23053,
            title: "Bàn di chuột",
          },
          {
            id: 23054,
            title: "Khác",
          },
        ],
      },
      {
        id: 2310,
        title: "Chuột & Bàn phím",
        subclassifications: [
          {
            id: 23055,
            title: "Chuột máy tính",
          },
          {
            id: 23056,
            title: "Bàn phím máy tính",
          },
          {
            id: 23057,
            title: "Bảng vẽ điện tử",
          },
          {
            id: 23058,
            title: "Khác",
          },
        ],
      },
      {
        id: 2311,
        title: "Laptop",
      },
      {
        id: 2312,
        title: "Phụ kiện máy tính khác",
      },
    ],
  },
];

export const getCategoryTitle = (categoryId) => {
  const category = categoriesData.find((cat) => cat.id === categoryId);

  return category ? category.title : "Unknown Category";
};

export const getSubcategoryTitle = (categoryId, subcategoryId) => {
  const category = categoriesData.find((cat) => cat.id === categoryId);
  if (!category) return "Unknown Subcategory";
  const subcategory = category.subcategories.find(
    (subcat) => subcat.id === subcategoryId
  );

  return subcategory ? subcategory.title : "Unknown Subcategory";
};

export const getSubclassificationTitle = (
  categoryId,
  subcategoryId,
  subclassificationId
) => {
  const category = categoriesData.find((cat) => cat.id === categoryId);
  if (!category) return "Unknown Subclassification";
  const subcategory = category.subcategories.find(
    (subcat) => subcat.id === subcategoryId
  );
  if (!subcategory || !subcategory.subclassifications)
    return "Unknown Subclassification";
  const subclassification = subcategory.subclassifications.find(
    (subclass) => subclass.id === subclassificationId
  );

  return subclassification
    ? subclassification.title
    : "Unknown Subclassification";
};

export const footerProductLinks = [
  {
    name: "Hướng dẫn đặt hàng",
    link: "/about",
  },
  {
    name: "Chính sách bảo mật",
    link: "/carrers",
  },
  {
    name: "Chính sách vận chuyển",
  },
  {
    name: "Chính sách trả hàng và hoàn tiền",
  },
  {
    name: "Đánh giá của khách hàng",
  },
];

export const footercompanyLinks = [
  {
    id: "1",
    image_Url: img1,
  },
  {
    id: "2",
    image_Url: img2,
  },
  {
    id: "3",
    image_Url: img3,
  },
  {
    id: "4",
    image_Url: img4,
  },
  {
    id: "5",
    image_Url: img5,
  },
];

export const footerSupportLinks = [
  {
    name: "Câu hỏi thường gặp ",
  },
  {
    name: "Điều khoản eCommUnity",
  },
  {
    name: "Liên hệ",
  },
  {
    name: "Tuyển dụng",
  },
  {
    name: "Hỗ trợ khách hàng",
  },
];
