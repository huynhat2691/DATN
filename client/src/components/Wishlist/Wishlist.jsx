/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { RxCross1 } from "react-icons/rx";
import styles from "../../styles/styles";
import { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import { BsCartPlus } from "react-icons/bs";
import { AiOutlineHeart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { removeFromWishlist } from "../../redux/actions/wishlist";
import { addToCart } from "../../redux/actions/cart";
import { backend_url } from "../../server";
import { ShoppingCart, Trash, X } from "lucide-react";

const Wishlist = ({ setOpenWishlist }) => {
  const { wishlist } = useSelector((state) => state.wishlist);
  const dispatch = useDispatch();

  const removeFromWishlistHandler = (data) => {
    dispatch(removeFromWishlist(data));
  };

  const addToCartHandler = (data) => {
    const newData = { ...data, quantity: 1 };
    dispatch(addToCart(newData));
    setOpenWishlist(false);
  };

  return (
    <div className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-40">
      <div className="fixed top-0 right-0 h-full w-[70%] overflow-y-auto 800px:w-[25%] bg-white flex flex-col justify-between shadow-sm ">
        {wishlist && wishlist.length === 0 ? (
          <div className="w-full h-screen flex items-center justify-center">
            <div className="flex w-full justify-end pt-5 pr-5 fixed top-3 right-3">
              <X
                size={25}
                className="cursor-pointer"
                onClick={() => setOpenWishlist(false)}
              />
            </div>
            <h5>Thêm sản phẩm yêu thích của bạn vào danh sách mong muốn</h5>
          </div>
        ) : (
          <>
            <div>
              <div className="flex w-full justify-end pt-5 pr-5">
                <X
                  size={25}
                  className="cursor-pointer"
                  onClick={() => setOpenWishlist(false)}
                />
              </div>
              {/* Item length */}
              <div className={`${styles.normalFlex} p-4`}>
                <AiOutlineHeart size={25} />
                <h5 className="pl-2 text-[20px] font-[500]">
                  {wishlist && wishlist.length} sản phẩm
                </h5>
              </div>

              {/* cart Single Items */}
              <br />
              <div className="w-full border-t">
                {wishlist &&
                  wishlist.map((i, index) => (
                    <CartSingle
                      key={index}
                      data={i}
                      removeFromWishlistHandler={removeFromWishlistHandler}
                      addToCartHandler={addToCartHandler}
                    />
                  ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const CartSingle = ({ data, removeFromWishlistHandler, addToCartHandler }) => {
  const [value, setValue] = useState(1);
  const totalPrice = data.discountPrice * value;

  return (
    <div className="border-b p-4">
      <div className="w-full flex items-center justify-between">
        <div className="flex items-center">
          <Trash
            size={25}
            color="#2d3436"
            className="cursor-pointer m-2"
            onClick={() => removeFromWishlistHandler(data)}
          />
          <img
            src={`${backend_url}${data?.images[0]}`}
            alt=""
            className="size-[50px] 800px:size-[80px] mx-2 rounded-md object-cover"
          />
          <div className="pl-[5px]">
            <h1 className="line-clamp-2 overflow-hidden break-words max-w-[270px]">
              {data.name}
            </h1>

            <h4 className="font-[600] text-[17px] pt-[3px] text-[#d02222]">
              {totalPrice}
              <sup>₫</sup>
            </h4>
          </div>
        </div>
        <div>
          <ShoppingCart
            size={25}
            className="cursor-pointer"
            title="Add to cart"
            onClick={() => addToCartHandler(data)}
          />
        </div>
      </div>
    </div>
  );
};

export default Wishlist;
