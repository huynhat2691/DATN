/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "../../styles/styles";
import { backend_url, server } from "../../server";
import { useDispatch, useSelector } from "react-redux";
import { getAllProductsShop } from "../../redux/actions/product";
import { toast } from "react-toastify";
import { addToCart } from "../../redux/actions/cart";
import Ratings from "./Ratings";
import axios from "axios";
import {
  Clock,
  MessagesSquare,
  Minus,
  Plus,
  ShoppingCart,
  Store,
} from "lucide-react";
import { Button } from "../ui/button";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Separator } from "../../components/ui/separator";
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
} from "../../static/data";
import ProductBreadcrumbs from "./ProductBreadcrumbs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import moment from "moment-timezone";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../ui/pagination";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getShopDetails } from "../../redux/actions/seller";
import CountDown from "../Route/Events/CountDown";

const ProductDetails = ({ data, isEvent }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { products } = useSelector((state) => state.product);
  const { sellerDetails } = useSelector((state) => state.seller);
  const [count, setCount] = useState(1);
  const [selectedGroup1, setSelectedGroup1] = useState(null);
  const [selectedGroup2, setSelectedGroup2] = useState(null);
  const [selectedClassification, setSelectedClassification] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [filteredGroup1Values, setFilteredGroup1Values] = useState([]);
  const [filteredGroup2Values, setFilteredGroup2Values] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [discountPriceRange, setDiscountPriceRange] = useState({
    min: 0,
    max: 0,
  });

  useEffect(() => {
    dispatch(getAllProductsShop(data && data?.shop._id));
  }, [data, dispatch]);

  useEffect(() => {
    if (data?.hasClassifications) {
      if (selectedGroup1 && selectedGroup2) {
        const classification = data.classifications.find(
          (c) => c.group1 === selectedGroup1 && c.group2 === selectedGroup2
        );
        setSelectedClassification(classification);
      } else {
        setSelectedClassification(null);
      }
    }
  }, [selectedGroup1, selectedGroup2, data]);

  useEffect(() => {
    if (data && data.hasClassifications) {
      setFilteredGroup1Values(
        data.group1.values.filter((value) => value !== "")
      );
      setFilteredGroup2Values(
        data.group2.values.filter((value) => value !== "")
      );
    }
  }, [data]);

  const getTotalStock = useCallback(() => {
    if (data.hasClassifications) {
      return data.classifications.reduce(
        (total, classification) => total + classification.stock,
        0
      );
    }
    return data.stock;
  }, [data]);

  const calculatePriceRanges = useCallback(() => {
    if (data && data.hasClassifications && data.classifications.length > 0) {
      const prices = data.classifications.map((c) => parseFloat(c.price));
      const discountPrices = data.classifications.map((c) =>
        parseFloat(c.discountPrice)
      );

      setPriceRange({
        min: Math.min(...prices),
        max: Math.max(...prices),
      });

      setDiscountPriceRange({
        min: Math.min(...discountPrices),
        max: Math.max(...discountPrices),
      });
    }
  }, [data]);

  useEffect(() => {
    calculatePriceRanges();
  }, [calculatePriceRanges]);

  const handleGroup1Selection = (value) => {
    setSelectedGroup1((prevValue) => (prevValue === value ? null : value));
  };

  const handleGroup2Selection = (value) => {
    setSelectedGroup2((prevValue) => (prevValue === value ? null : value));
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const addProductToCart = (product, selectedClassification = null) => {
    let cartData;
    if (product.hasClassifications && selectedClassification) {
      cartData = {
        ...product,
        quantity: count, // Sử dụng count ở đây
        selectedClassification,
        cartItemId: selectedClassification._id,
      };
    } else {
      cartData = { ...product, quantity: count, cartItemId: product._id }; // Sử dụng count ở đây
    }
    dispatch(addToCart(cartData));
  };

  const addToCartHandler = (id) => {
    if (isAuthenticated) {
      if (data.hasClassifications) {
        if (!selectedGroup1 || !selectedGroup2) {
          toast.error("Vui lòng chọn đầy đủ các tùy chọn");
          return;
        }

        const classification = data.classifications.find(
          (c) => c.group1 === selectedGroup1 && c.group2 === selectedGroup2
        );

        if (!classification) {
          toast.error("Không tìm thấy phân loại sản phẩm");
          return;
        }

        if (classification.stock < 1) {
          toast.error("Sản phẩm đã hết hàng");
        } else {
          addProductToCart(data, classification); // Bỏ tham số count
          toast.success("Sản phẩm thêm vào giỏ hàng thành công");
        }
      } else {
        if (data.stock < 1) {
          toast.error("Sản phẩm đã hết hàng");
        } else {
          addProductToCart(data); // Bỏ tham số count
          toast.success("Sản phẩm thêm vào giỏ hàng thành công");
        }
      }
    } else {
      toast.error("Vui lòng đăng nhập để thêm vào giỏ hàng");
    }
  };

  const totalReviewsLength =
    products &&
    products.reduce((acc, product) => acc + product.reviews.length, 0);

  const totalRatings =
    products &&
    products.reduce(
      (acc, product) =>
        acc + product.reviews.reduce((sum, review) => sum + review.rating, 0),
      0
    );

  const avg = totalRatings / totalReviewsLength || 0;

  const averageRating = avg.toFixed(1);

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setCount(isNaN(newValue) ? 1 : newValue);
  };

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      if (!data || !data._id) {
        toast.error("Không thể lấy thông tin shop. Vui lòng thử lại sau.");
        return;
      }

      const userId = user._id;
      const sellerId = data.shop._id;

      try {
        // Check if the conversation exists based on both user IDs
        const checkResponse = await axios.get(
          `${server}/conversation/check-conversation`,
          {
            params: { userId, sellerId },
          }
        );

        let conversationId;

        if (checkResponse.data.exists) {
          // If conversation exists, use its ID
          conversationId = checkResponse.data.conversation._id;
        } else {
          // If conversation doesn't exist, create a new one
          const createResponse = await axios.post(
            `${server}/conversation/create-new-conversation`,
            {
              userId,
              sellerId,
            }
          );
          conversationId = createResponse.data.conversation._id;
        }

        // Navigate to the conversation
        navigate(`/profile/inbox?conversationId=${conversationId}`);
      } catch (err) {
        toast.error(
          err.response?.data?.message ||
            "Có lỗi xảy ra khi xử lý cuộc trò chuyện"
        );
      }
    } else {
      toast.error("Vui lòng đăng nhập để gửi tin nhắn");
    }
  };

  const handleBuyNow = () => {
    if (data.hasClassifications && (!selectedGroup1 || !selectedGroup2)) {
      toast.error("Vui lòng chọn đầy đủ các tùy chọn");
    } else {
      addToCartHandler(data._id);
      navigate("/cart");
    }
  };

  const [images, setImages] = useState([]);

  useEffect(() => {
    if (data && data.images) {
      const galleryImages = data.images.map((image) => ({
        original: `${backend_url}${image}`,
        thumbnail: `${backend_url}${image}`,
      }));
      setImages(galleryImages);
    }
  }, [data]);

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getAvatarSrc = (avatar) => {
    if (avatar && avatar.startsWith("data:image")) {
      return avatar;
    } else if (avatar) {
      return `${backend_url}${avatar}`;
    }
    return "";
  };

  useEffect(() => {
    if (data && data.shop && data.shop._id) {
      dispatch(getShopDetails(data.shop._id));
    }
  }, [data, dispatch]);

  return (
    <div className="bg-[#f6f6f5] w-[1300px] mx-auto my-4">
      {data ? (
        <>
          <ProductBreadcrumbs data={data} />
          <div className="w-full flex flex-col justify-between shadow bg-white rounded-lg border">
            <div className="w-full p-5 min-h-[650px]">
              <div className="flex w-full h-full justify-between">
                <div>
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    showNav={true}
                    lazyLoad={true}
                    thumbnailPosition="bottom"
                    useBrowserFullscreen={false}
                  />
                </div>
                <Separator
                  orientation="vertical"
                  className="mx-6 bg-transparent"
                />
                <div className="w-[760px] min-h-[600px] flex flex-1 flex-col justify-between">
                  <div>
                    <h1
                      className={`${styles.productTitle} text-ellipsis flex-nowrap max-w-[760px] break-words`}
                    >
                      {data.name}
                    </h1>

                    {data?.ratings > 0 ? (
                      <div className="flex items-center mt-3">
                        <div className="text-[18px] flex items-center">
                          <p className="text-[16px] mr-2">{averageRating}/5</p>
                          <Ratings rating={data.ratings} />
                        </div>
                        <div className="w-[1px] h-[14px] bg-gray-300 mx-4 rounded" />
                        {data?.sold_out > 0 && (
                          <span className="font-[400] text-[gray] flex items-center">
                            {data.sold_out} <p className="ml-2">Đã bán</p>
                          </span>
                        )}
                      </div>
                    ) : (
                      <p className="mt-3">Chưa có đánh giá</p>
                    )}
                    <div className="w-full mt-[10px]">
                      {isEvent === true ? (
                        <div className="w-full flex items-center justify-end  bg-gradient-to-r from-[#4bd2ff] to-[#007497] bg-blend-overlay h-[2.25rem]">
                          <div className="w-full mx-6 h-full flex items-center justify-between">
                            <img
                              alt="icon flash sale"
                              src="https://deo.shopeemobile.com/shopee/shopee-pcmall-live-sg/productdetailspage/dea74facf15efdbdb982.svg"
                              className="flex items-center justify-center h-[20px]"
                            />
                            <div className="text-white flex items-center font-light">
                              <Clock size={18} />
                              <p className="mx-2">KẾT THÚC TRONG</p>
                              <CountDown data={data} isProductDetails={true} />
                            </div>
                          </div>
                        </div>
                      ) : null}
                      <div className="flex p-3 bg-gray-100">
                        <div className="flex items-center">
                          <h4
                            className={`${styles.price} text-[16px] text-[gray]`}
                          >
                            {data.hasClassifications
                              ? selectedClassification
                                ? `${formatPrice(selectedClassification.price)}`
                                : priceRange.min === priceRange.max
                                ? `${formatPrice(priceRange.min)}`
                                : `${formatPrice(
                                    priceRange.min
                                  )} - ${formatPrice(priceRange.max)}`
                              : `${formatPrice(data.price)}`}
                            <sup>₫</sup>
                          </h4>
                          <h5
                            className={`${styles.productDiscountPrice} text-[30px] mx-[10px]`}
                          >
                            {data.hasClassifications
                              ? selectedClassification
                                ? `${formatPrice(
                                    selectedClassification.discountPrice
                                  )}`
                                : discountPriceRange.min ===
                                  discountPriceRange.max
                                ? `${formatPrice(discountPriceRange.min)}`
                                : `${formatPrice(
                                    discountPriceRange.min
                                  )} - ${formatPrice(discountPriceRange.max)}`
                              : `${formatPrice(data.discountPrice)}`}
                            <sup>₫</sup>
                          </h5>

                          <p className="w-[70px] h-[18px] text-[12px] flex items-center justify-center ml-2 bg-gray-300 rounded">
                            -
                            {data.hasClassifications
                              ? selectedClassification
                                ? selectedClassification.percentageDiscount
                                : Math.min(
                                    ...data.classifications.map(
                                      (c) => c.percentageDiscount
                                    )
                                  )
                              : data.percentageDiscount}
                            % Giảm
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="px-5">
                      {data.hasClassifications && (
                        <div>
                          <div className="flex items-center mb-6">
                            <p className="w-[110px]">{data.group1.name}</p>
                            <div className="flex flex-wrap gap-3">
                              {filteredGroup1Values.map((value, index) => (
                                <Button
                                  variant="outline"
                                  key={index}
                                  onClick={() => handleGroup1Selection(value)}
                                  className={
                                    selectedGroup1 === value
                                      ? "bg-[#27b3e2] text-white"
                                      : ""
                                  }
                                >
                                  {value}
                                </Button>
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center mb-6">
                            <p className="w-[110px]">{data.group2.name}</p>
                            <div className="flex flex-wrap gap-3">
                              {filteredGroup2Values.map((value, index) => (
                                <Button
                                  variant="outline"
                                  key={index}
                                  onClick={() => handleGroup2Selection(value)}
                                  className={
                                    selectedGroup2 === value
                                      ? "bg-[#27b3e2] text-white "
                                      : ""
                                  }
                                >
                                  {value}
                                </Button>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center justify-between w-full">
                          <div className="">
                            <div className="flex items-center mb-6 mt-4">
                              <p className="w-[110px]">Số lượng</p>
                              <button
                                className={`${styles.normalFlex} border  text-white font-bold rounded-l px-2  hover:opacity-75 transition duration-300 ease-in-out h-8`}
                                onClick={decrementCount}
                              >
                                <Minus size={18} color="#2d3436" />
                              </button>
                              <input
                                type="text"
                                className=" text-black font-[500] px-2 w-12 h-8 border-t border-b  text-center"
                                value={count}
                                onChange={handleInputChange}
                              />
                              <button
                                className="border  text-white font-bold rounded-r px-2  hover:opacity-75 transition duration-300 ease-in-out h-8"
                                onClick={incrementCount}
                              >
                                <Plus size={16} color="#2d3436" />
                              </button>
                              <div>
                                {data.hasClassifications ? (
                                  selectedClassification ? (
                                    <div className="flex items-center w-[180px] justify-center text-[gray]">
                                      <p className="mr-1">
                                        {selectedClassification.stock}
                                      </p>
                                      <p>sản phẩm có sẵn</p>
                                    </div>
                                  ) : (
                                    <div className="flex items-center w-[180px] justify-center text-[gray]">
                                      <p className="mr-1">
                                        {data.classifications.reduce(
                                          (total, classification) =>
                                            total + classification.stock,
                                          0
                                        )}
                                      </p>
                                      <p>sản phẩm có sẵn</p>
                                    </div>
                                  )
                                ) : (
                                  <div className="flex items-center w-[180px] justify-center text-[gray]">
                                    <p className="mr-1">{data.stock}</p>
                                    <p>sản phẩm có sẵn</p>
                                  </div>
                                )}
                              </div>
                            </div>
                            {isAuthenticated ? (
                              <div className="flex items-center pt-4">
                                <Button
                                  variant="outline"
                                  onClick={() => addToCartHandler(data._id)}
                                  className="w-[200px] mr-4 h-[50px] "
                                >
                                  <span className=" flex items-center">
                                    <ShoppingCart className="mr-2 " size={20} />{" "}
                                    Thêm vào giỏ hàng
                                  </span>
                                </Button>
                                <Button
                                  className="w-[200px] h-[50px] bg-[#27b3e2] text-white"
                                  onClick={handleBuyNow}
                                >
                                  Mua ngay
                                </Button>
                              </div>
                            ) : (
                              <Link to="/login">
                                <div className="flex items-center pt-4">
                                  <Button
                                    variant="outline"
                                    onClick={() => addToCartHandler(data._id)}
                                    className="w-[200px] mr-4 h-[50px] "
                                  >
                                    <span className=" flex items-center">
                                      <ShoppingCart
                                        className="mr-2 "
                                        size={20}
                                      />{" "}
                                      Thêm vào giỏ hàng
                                    </span>
                                  </Button>
                                  <Link
                                    to={
                                      data.hasClassifications &&
                                      (!selectedGroup1 || !selectedGroup2)
                                        ? ""
                                        : "/cart"
                                    }
                                    onClick={(e) => {
                                      if (
                                        data.hasClassifications &&
                                        (!selectedGroup1 || !selectedGroup2)
                                      ) {
                                        e.preventDefault();
                                        toast.error(
                                          "Vui lòng chọn đầy đủ các tùy chọn"
                                        );
                                      } else {
                                        addToCartHandler(data._id);
                                      }
                                    }}
                                  >
                                    <Button className="w-[200px] h-[50px] bg-[#27b3e2] text-white">
                                      Mua ngay
                                    </Button>
                                  </Link>
                                </div>
                              </Link>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    <Separator className="my-8" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full flex items-center mt-4 justify-between bg-white p-6 border rounded-lg shadow">
            <div className="flex items-center">
              <Link to={`/shop/preview/${sellerDetails?._id}`}>
                <Avatar className="size-[80px] rounded-full mr-2">
                  <AvatarImage
                    src={getAvatarSrc(sellerDetails?.avatar)}
                    alt={sellerDetails?.name}
                    className="object-cover"
                  />
                  <AvatarFallback>
                    {sellerDetails?.name?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
              <div className="px-4 flex flex-col justify-between">
                <Link to={`/shop/preview/${data?.shop?._id}`}>
                  <h3 className={`${styles.shop_name} pb-1 pt-0 text-[16px]`}>
                    {data.shop.name}
                  </h3>
                </Link>
                <div className="flex items-center size-[15px]"></div>
                <div className="800px:flex justify-between">
                  <Button
                    className="h-[34px] border-[#27b3e2] text-[#27b3e2] mr-[10px]"
                    variant="outline"
                    onClick={handleMessageSubmit}
                  >
                    <MessagesSquare className="mr-2" size={15} />
                    <p className="text-[14px]">Chat ngay</p>
                  </Button>
                  <Link to={`/shop/preview/${data?.shop?._id}`}>
                    <Button className="h-[34px]" variant="outline">
                      <Store className="mr-2" size={15} />
                      Xem Shop
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <Separator
              orientation="vertical"
              className="bg-[#27b3e2] w-[1px] h-[60px]"
            />

            <div className="p-6">
              <div className="w-full mt-5 800px:mt-0">
                <div className=" grid grid-cols-3 gap-10 text-center ">
                  <h5 className=" flex items-center justify-between w-[180px]">
                    <p className="text-[gray] font-[500]">Sản phẩm</p>
                    <span className="font-[500] text-[#27b3e2]">
                      {products && products.length}
                    </span>
                  </h5>

                  <h5 className=" flex items-center justify-between w-[180px]">
                    <p className="text-[gray] font-[500]">Đánh giá</p>
                    <span className="font-[500] text-[#27b3e2]">
                      {totalReviewsLength}
                    </span>
                  </h5>

                  <h5 className=" flex items-center justify-between w-[180px]">
                    <p className="text-[gray] font-[500]">Tham gia</p>
                    <span className="font-[500] text-[#27b3e2]">
                      {data.shop?.createdAt?.slice(0, 10)}
                    </span>
                  </h5>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full bg-white mt-4 border rounded-lg shadow p-6">
            <div>
              <p className="font-[600] text-[18px] w-full bg-[#f6f6f6] p-4">
                CHI TIẾT SẢN PHẨM
              </p>
              <div className="min-h-full text-[16px] leading-8 whitespace-pre-line m-4 flex items-center">
                <p className="w-[140px] text-[gray]">Danh Mục</p>
                <Breadcrumb className="flex items-center">
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        <BreadcrumbLink>
                          {getCategoryTitle(Number(data.category))}
                        </BreadcrumbLink>
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />

                    <BreadcrumbItem>
                      <BreadcrumbPage>
                        {getSubcategoryTitle(
                          Number(data.category),
                          Number(data.subcategory)
                        )}
                      </BreadcrumbPage>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    {data.subclassification && (
                      <BreadcrumbItem>
                        <BreadcrumbPage>
                          {getSubclassificationTitle(
                            Number(data.category),
                            Number(data.subcategory),
                            Number(data.subclassification)
                          )}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    )}
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
              <div className="min-h-full text-[16px] leading-8 whitespace-pre-line m-4 flex items-center">
                <p className="w-[140px] text-[gray]">Kho </p>
                <div>{getTotalStock()}</div>
              </div>
            </div>
            <div>
              <p className="font-[600] text-[18px] w-full bg-[#f6f6f6] p-4">
                MÔ TẢ SẢN PHẨM
              </p>
              <p className="min-h-full text-[18px] leading-8 whitespace-pre-line my-8 mx-4">
                {data.description}
              </p>
            </div>
          </div>

          <div className="w-full bg-white border rounded-lg shadow mt-4 min-h-full flex flex-col items-center p-6 ">
            <div className="w-full">
              <p className="text-[18px] font-[600]">ĐÁNH GIÁ SẢN PHẨM</p>
            </div>
            <div className="w-full">
              {data?.ratings >= 0 && (
                <div className="flex items-center justify-start mt-3">
                  <div className="flex items-center w-full">
                    <Tabs defaultValue="all" className="w-full ">
                      <TabsList className="w-full min-h-[6rem] border p-4 mb-4 bg-[#fffbf8]">
                        <div className="w-full mx-2 h-[80px] flex flex-col items-center justify-center mr-6 ">
                          <div className="flex items-center text-[#27b3e2] font-[450] mb-1">
                            <p className="text-[22px] mr-1 ">{averageRating}</p>
                            <p>trên 5</p>
                          </div>
                          <div className="text-[22px]">
                            <Ratings rating={data.ratings} />
                          </div>
                        </div>
                        <TabsTrigger
                          value="all"
                          className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
                        >
                          Tất cả
                        </TabsTrigger>
                        <TabsTrigger
                          value="5"
                          className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
                        >
                          5 sao (
                          {data.reviews.filter((r) => r.rating === 5).length})
                        </TabsTrigger>
                        <TabsTrigger
                          value="4"
                          className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
                        >
                          4 sao (
                          {data.reviews.filter((r) => r.rating === 4).length})
                        </TabsTrigger>
                        <TabsTrigger
                          value="3"
                          className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
                        >
                          3 sao (
                          {data.reviews.filter((r) => r.rating === 3).length})
                        </TabsTrigger>
                        <TabsTrigger
                          value="2"
                          className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
                        >
                          2 sao (
                          {data.reviews.filter((r) => r.rating === 2).length})
                        </TabsTrigger>
                        <TabsTrigger
                          value="1"
                          className="w-full border mx-2 h-[40px] data-[state=active]:text-[#27b3e2] data-[state=active]:border-[#27b3e2]"
                        >
                          1 sao (
                          {data.reviews.filter((r) => r.rating === 1).length})
                        </TabsTrigger>
                      </TabsList>
                      <TabsContent value="all">
                        {data && data.reviews && data.reviews.length > 0 ? (
                          <>
                            {data.reviews
                              .slice(
                                (currentPage - 1) * itemsPerPage,
                                currentPage * itemsPerPage
                              )
                              .map((item, index) => (
                                <div
                                  className="w-full flex p-4 border-b"
                                  key={index}
                                >
                                  <img
                                    src={`${backend_url}/${item?.user?.avatar}`}
                                    alt=""
                                    className="size-[50px] rounded-full object-cover mr-3"
                                  />
                                  <div>
                                    <div className="w-full">
                                      <h1 className="font-[500]">
                                        {item.user.name}
                                      </h1>
                                      <div className="flex items-center !justify-start mt-[6px]">
                                        <Ratings rating={item.rating} />
                                      </div>
                                      <div>
                                        <p className="text-[13px] font-[450] text-[#0000008a] my-[6px]">
                                          {moment(item.createdAt)
                                            .tz("Asia/Ho_Chi_Minh")
                                            .format("DD-MM-YYYY HH:mm")}
                                        </p>
                                      </div>
                                    </div>
                                    <p>{item.comment}</p>
                                  </div>
                                </div>
                              ))}
                            {data.reviews.length > itemsPerPage && (
                              <Pagination className="mt-4">
                                <PaginationContent>
                                  <PaginationItem>
                                    <PaginationPrevious
                                      onClick={() =>
                                        setCurrentPage((prev) =>
                                          Math.max(1, prev - 1)
                                        )
                                      }
                                      disabled={currentPage === 1}
                                    />
                                  </PaginationItem>
                                  {[
                                    ...Array(
                                      Math.ceil(
                                        data.reviews.length / itemsPerPage
                                      )
                                    ),
                                  ].map((_, index) => (
                                    <PaginationItem key={index}>
                                      <PaginationLink
                                        onClick={() =>
                                          setCurrentPage(index + 1)
                                        }
                                        isActive={currentPage === index + 1}
                                      >
                                        {index + 1}
                                      </PaginationLink>
                                    </PaginationItem>
                                  ))}
                                  <PaginationItem>
                                    <PaginationNext
                                      onClick={() =>
                                        setCurrentPage((prev) =>
                                          Math.min(
                                            Math.ceil(
                                              data.reviews.length / itemsPerPage
                                            ),
                                            prev + 1
                                          )
                                        )
                                      }
                                      disabled={
                                        currentPage ===
                                        Math.ceil(
                                          data.reviews.length / itemsPerPage
                                        )
                                      }
                                    />
                                  </PaginationItem>
                                </PaginationContent>
                              </Pagination>
                            )}
                          </>
                        ) : (
                          <div className="w-full flex justify-center h-[25rem]">
                            <h5 className="flex items-center justify-center">
                              Chưa có đánh giá
                            </h5>
                          </div>
                        )}
                      </TabsContent>
                      {[5, 4, 3, 2, 1].map((rating) => {
                        const reviewsWithRating =
                          data?.reviews?.filter((r) => r.rating === rating) ||
                          [];

                        return (
                          <TabsContent key={rating} value={rating.toString()}>
                            {reviewsWithRating.length > 0 ? (
                              <>
                                {reviewsWithRating
                                  .slice(
                                    (currentPage - 1) * itemsPerPage,
                                    currentPage * itemsPerPage
                                  )
                                  .map((item, index) => (
                                    <div
                                      className="w-full flex p-4 border-b"
                                      key={index}
                                    >
                                      <img
                                        src={`${backend_url}/${item?.user?.avatar}`}
                                        alt=""
                                        className="size-[50px] rounded-full object-cover mr-3"
                                      />
                                      <div>
                                        <div className="w-full">
                                          <h1 className="font-[500]">
                                            {item.user.name}
                                          </h1>
                                          <div className="flex items-center !justify-start mt-[6px]">
                                            <Ratings rating={item.rating} />
                                          </div>
                                          <div>
                                            <p className="text-[13px] font-[450] text-[#0000008a] my-[6px]">
                                              {moment(item.createdAt)
                                                .tz("Asia/Ho_Chi_Minh")
                                                .format("DD-MM-YYYY HH:mm")}
                                            </p>
                                          </div>
                                        </div>
                                        <p>{item.comment}</p>
                                      </div>
                                    </div>
                                  ))}
                                {reviewsWithRating.length > itemsPerPage && (
                                  <Pagination className="mt-4">
                                    <PaginationContent>
                                      <PaginationItem>
                                        <PaginationPrevious
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              Math.max(1, prev - 1)
                                            )
                                          }
                                          disabled={currentPage === 1}
                                        />
                                      </PaginationItem>
                                      {[
                                        ...Array(
                                          Math.ceil(
                                            reviewsWithRating.length /
                                              itemsPerPage
                                          )
                                        ),
                                      ].map((_, index) => (
                                        <PaginationItem key={index}>
                                          <PaginationLink
                                            onClick={() =>
                                              setCurrentPage(index + 1)
                                            }
                                            isActive={currentPage === index + 1}
                                          >
                                            {index + 1}
                                          </PaginationLink>
                                        </PaginationItem>
                                      ))}
                                      <PaginationItem>
                                        <PaginationNext
                                          onClick={() =>
                                            setCurrentPage((prev) =>
                                              Math.min(
                                                Math.ceil(
                                                  reviewsWithRating.length /
                                                    itemsPerPage
                                                ),
                                                prev + 1
                                              )
                                            )
                                          }
                                          disabled={
                                            currentPage ===
                                            Math.ceil(
                                              reviewsWithRating.length /
                                                itemsPerPage
                                            )
                                          }
                                        />
                                      </PaginationItem>
                                    </PaginationContent>
                                  </Pagination>
                                )}
                              </>
                            ) : (
                              <div className="w-full flex justify-center h-[25rem]">
                                <h5 className="flex items-center justify-center">
                                  Chưa có đánh giá {rating} sao
                                </h5>
                              </div>
                            )}
                          </TabsContent>
                        );
                      })}
                    </Tabs>
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ProductDetails;
