/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import styles from "../../../styles/styles";
import { AiFillHeart, AiOutlineHeart, AiOutlineMessage } from "react-icons/ai";
import { FiMinus, FiPlus } from "react-icons/fi";
import { BsCart2 } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addToCart } from "../../../redux/actions/cart";
import {
  addToWishlist,
  removeFromWishlist,
} from "../../../redux/actions/wishlist";
import { Link, useNavigate } from "react-router-dom";
import { backend_url, server } from "../../../server";
import axios from "axios";

const ProductDetailsCard = ({ setOpen, data }) => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { cart } = useSelector((state) => state.cart);
  const { wishlist } = useSelector((state) => state.wishlist);
  const { products } = useSelector((state) => state.product);
  const { seller } = useSelector((state) => state.seller);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [count, setCount] = useState(1);
  const [click, setClick] = useState(false);

  const handleMessageSubmit = async () => {
    if (isAuthenticated) {
      const groupTitle = data._id + user._id;
      const userId = user._id;
      const sellerId = data.shop._id;
      await axios
        .post(`${server}/conversation/create-new-conversation`, {
          groupTitle,
          userId,
          sellerId,
        })
        // eslint-disable-next-line no-unused-vars
        .then((res) => {
          navigate(`/profile/inbox`);
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } else {
      toast.error("Vui lòng đăng nhập để gửi tin nhắn");
    }
  };

  const decrementCount = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const incrementCount = () => {
    setCount(count + 1);
  };

  const handleInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setCount(isNaN(newValue) ? 1 : newValue); // Kiểm tra xem giá trị mới có phải là số không, nếu không thì đặt là 0
  };

  const addToCartHandler = (id) => {
    const isItemExist = cart && cart.find((i) => i._id === id);
    if (isItemExist) {
      toast.error("Sản phẩm đã có trong giỏ hàng");
    } else {
      if (data.stock < count) {
        toast.error("Sản phẩm đã hết hàng");
      } else {
        const cartData = { ...data, quantity: count };
        dispatch(addToCart(cartData));
        toast.success("Đã thêm sản phẩm vào giỏ hàng thành công");
      }
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

  useEffect(() => {
    if (wishlist && wishlist.find((i) => i._id === data._id)) {
      setClick(true);
    } else {
      setClick(false);
    }
  }, [wishlist, data]);

  const removeFromWishlistHandler = (data) => {
    setClick(!click);
    dispatch(removeFromWishlist(data));
  };

  const addToWishlistHandler = (data) => {
    setClick(!click);
    dispatch(addToWishlist(data));
  };

  return (
    <div className="bg-[#fff]">
      {data ? (
        <div className="fixed w-full h-screen top-0 left-0 bg-[#00000030] z-40 flex items-center justify-center">
          <div className="w-[90%] 800px:w-[60%] h-[90vh] overflow-y-auto 800px:h-[75vh] bg-white rounded-md shadow-sm relative p-4">
            <RxCross1
              size={30}
              className="absolute right-3 top-3 z-50 "
              onClick={() => setOpen(false)}
            />

            <div className="block w-full 800px:flex">
              <div className="w-full 800px:w-[50%]">
                <img
                  src={`${backend_url}${data.images && data.images[0]}`}
                  alt=""
                />
                <div className="flex items-center">
                  {/* can chinh sua rounded-full */}
                  <Link to={`/shop/preview/${data.shop._id}`} className="flex">
                    <img
                      src={`${backend_url}${seller?.avatar}`}
                      alt=""
                      className="size-[60px] rounded-2xl mr-4 object-cover"
                    />
                    <div>
                      <h3
                        className={`${styles.shop_name} font-bold text-[17px]`}
                      >
                        {data.shop.name}
                      </h3>
                      <h5 className="pb-3 text-[15px] font-semibold">
                        ({averageRating}/5) Ratings
                      </h5>
                    </div>
                  </Link>
                </div>
                <div
                  className={`${styles.button} bg-[#000] mt-4 rounded-[4px] h-11`}
                  onClick={handleMessageSubmit}
                >
                  <span className="text-[#fff] flex items-center">
                    Send Message <AiOutlineMessage className="ml-1 " />
                  </span>
                </div>
                <h5 className="text-[16px] text-[red] mt-5">
                  {data.sold_out} Sold
                </h5>
              </div>
              <div className="w-full 800px:[50%] pt-5 pl-[5px] pr-[5px]">
                <h1 className={`${styles.productTitle} text-[20px]`}>
                  {data.name}
                </h1>
                <p>{data.description}</p>
                <div className="flex pt-3">
                  <h4 className={`${styles.productDiscountPrice}`}>
                    {data.discountPrice}$
                  </h4>
                  <h3 className={`${styles.price}`}>
                    {data.price ? data.price + "$" : null}
                  </h3>
                </div>
                <div className="flex items-center mt-12 justify-between pr-3">
                  <div className="flex items-center space-x-0">
                    <button
                      className={`${styles.normalFlex} border border-gray-400 text-white font-bold rounded-l px-2  hover:opacity-75 transition duration-300 ease-in-out h-8`}
                      onClick={decrementCount}
                    >
                      <FiMinus size={18} color="#2d3436" />
                    </button>
                    <input
                      type="text"
                      className=" text-black font-[500] px-2 w-12 h-8 border-t border-b border-gray-400 text-center"
                      value={count}
                      onChange={handleInputChange}
                    />
                    <button
                      className="border border-gray-400 text-white font-bold rounded-r px-2  hover:opacity-75 transition duration-300 ease-in-out h-8"
                      onClick={incrementCount}
                    >
                      <FiPlus size={16} color="#2d3436" />
                    </button>
                  </div>
                  <div>
                    {click ? (
                      <AiFillHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => removeFromWishlistHandler(data)}
                        color={click ? "red" : "#333"}
                        title="Remove from wishlist"
                      />
                    ) : (
                      <AiOutlineHeart
                        size={30}
                        className="cursor-pointer"
                        onClick={() => addToWishlistHandler(data)}
                        title="Add to wishlist"
                      />
                    )}
                  </div>
                </div>
                <div
                  className={`${styles.button} mt-6 rounded-[4px] h-11 flex items-center`}
                  onClick={() => addToCartHandler(data._id)}
                >
                  <span className="text-[#fff] flex items-center">
                    Add to cart <BsCart2 className="ml-1 " />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProductDetailsCard;
