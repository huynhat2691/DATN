// /* eslint-disable react/prop-types */
// import { useState, useEffect } from "react";
// import styles from "../../styles/styles";
// import { Link, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { addToCart, removeFromCart } from "../../redux/actions/cart";
// import { ShoppingBag, Store, ChevronRight } from "lucide-react";
// import { NumericFormat } from "react-number-format";
// import { Button } from "../ui/button";
// import CartSingle from "./CartSingle";

// const Cart = () => {
//   const { cart } = useSelector((state) => state.cart);
//   const dispatch = useDispatch();
//   const [selectedItems, setSelectedItems] = useState({});
//   const [groupedCart, setGroupedCart] = useState({});
//   const [totalPrice, setTotalPrice] = useState(0);

//   const navigate = useNavigate();

//   useEffect(() => {
//     const grouped = cart.reduce((acc, item) => {
//       const shopId = item.shop?._id;
//       if (!acc[shopId]) {
//         acc[shopId] = {
//           shopName: item.shop?.name,
//           items: [],
//         };
//       }
//       acc[shopId].items.push(item);
//       return acc;
//     }, {});
//     setGroupedCart(grouped);

//     // Load selected items from localStorage
//     const savedSelectedItems = localStorage.getItem("selectedCartItems");
//     if (savedSelectedItems) {
//       try {
//         const parsedSelectedItems = JSON.parse(savedSelectedItems);
//         setSelectedItems(parsedSelectedItems);
//       } catch (error) {
//         console.error(
//           "Error parsing selectedCartItems from localStorage:",
//           error
//         );
//         setSelectedItems({});
//       }
//     } else {
//       setSelectedItems({});
//     }
//   }, [cart]);

//   useEffect(() => {
//     // Save selected items to localStorage
//     if (Object.keys(selectedItems).length > 0) {
//       localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
//     } else {
//       localStorage.removeItem("selectedCartItems");
//     }
//   }, [selectedItems]);

//   const removeFromCartHandler = (data) => {
//     dispatch(removeFromCart(data));
//     setSelectedItems((prev) => {
//       const newSelected = { ...prev };
//       if (data.hasClassifications && data.selectedClassification) {
//         delete newSelected[data.selectedClassification._id];
//       } else {
//         delete newSelected[data._id];
//       }
//       // Cập nhật localStorage
//       localStorage.setItem("selectedCartItems", JSON.stringify(newSelected));
//       return newSelected;
//     });
//   };

//   const updateSelectedItems = (newSelectedItems) => {
//     setSelectedItems(newSelectedItems);
//     localStorage.setItem("selectedCartItems", JSON.stringify(newSelectedItems));
//   };

//   const handleSelectItem = (itemId, isSelected) => {
//     const newSelectedItems = { ...selectedItems };
//     if (isSelected) {
//       newSelectedItems[itemId] = true;
//     } else {
//       delete newSelectedItems[itemId];
//     }
//     updateSelectedItems(newSelectedItems);

//     setSelectedItems(newSelectedItems);
//   };

//   const updateTotalPrice = () => {
//     const newTotalPrice = cart.reduce((acc, item) => {
//       const price = item.discountPrice || item.price || 0;
//       const quantity = item.quantity || 0;

//       if (item.hasClassifications && item.selectedClassification) {
//         const selectedClassId = item.classifications?.find(
//           (c) =>
//             c.group1 === (item.selectedClassification?.group1 || "") &&
//             c.group2 === (item.selectedClassification?.group2 || "")
//         )?._id;

//         if (selectedItems[selectedClassId]) {
//           const selectedClass = item.classifications?.find(
//             (c) =>
//               c.group1 === (item.selectedClassification.group1 || "") &&
//               c.group2 === (item.selectedClassification.group2 || "")
//           );

//           const classPrice =
//             selectedClass?.discountPrice || selectedClass?.price || 0;
//           return acc + classPrice * quantity;
//         }
//       } else if (selectedItems[item._id]) {
//         return acc + price * quantity;
//       }

//       return acc;
//     }, 0);

//     return newTotalPrice;
//   };

//   useEffect(() => {
//     setTotalPrice(updateTotalPrice());
//   }, [cart, selectedItems]);

//   const quantityChangeHandler = (itemId, newQuantity, item) => {
//     dispatch(addToCart({ ...item, quantity: newQuantity }));
//     setTotalPrice(updateTotalPrice());
//   };

//   const handleCheckout = () => {
//     const selectedProducts = cart.filter((item) => {
//       if (item.hasClassifications) {
//         return item.classifications.some((c) => selectedItems[c._id]);
//       }
//       return selectedItems[item._id];
//     });
//     navigate("/checkout", { state: { selectedProducts } });
//   };

//   return (
//     <div className="w-[1300px] mx-auto flex flex-col">
//       <div className="flex-grow overflow-y-auto">
//         {cart && cart.length === 0 ? (
//           <div className="w-full flex flex-col h-[20rem] items-center justify-evenly bg-white border rounded-lg my-8">
//             <h5 className="text-[20px]">Giỏ Hàng Đang Trống</h5>
//             <Link to="/">
//               <Button>Tiếp Tục Mua Hàng</Button>
//             </Link>
//           </div>
//         ) : (
//           <>
//             <div>
//               <div className="bg-white my-4 border rounded-lg">
//                 <div className={`${styles.normalFlex} p-4 border-b`}>
//                   <ShoppingBag size={25} className="mr-2" />
//                   <h5 className="pl-2 text-[20px] font-[500] ">
//                     {cart && cart.length} sản phẩm
//                   </h5>
//                 </div>
//                 <div className="flex items-center justify-between p-4">
//                   <p className="w-[50%] pl-6">Sản Phẩm</p>
//                   <p className="w-[10%] flex items-center justify-center">
//                     Đơn Giá
//                   </p>
//                   <p className="w-[10%] flex items-center justify-center">
//                     Số Lượng
//                   </p>
//                   <p className="w-[10%] flex items-center justify-center">
//                     Thành Tiền
//                   </p>
//                   <p className="w-[8%] flex items-center justify-center">Xoá</p>
//                 </div>
//               </div>
//               <div className="w-full">
//                 {Object.entries(groupedCart).map(([shopId, shopData]) => (
//                   <div
//                     key={shopId}
//                     className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
//                   >
//                     <Link
//                       to={`/shop/preview/${shopId}`}
//                       className="flex items-center text-[16px] font-[400] px-6 py-4 bg-white hover:bg-gray-200 border-b"
//                     >
//                       <Store size={18} className="mr-2 text-gray-700" />
//                       <p className="text-gray-800">{shopData.shopName}</p>
//                       <ChevronRight
//                         size={18}
//                         className="ml-auto text-gray-500"
//                       />
//                     </Link>
//                     <div className="px-4 py-2 bg-white">
//                       {shopData.items.map((item) => (
//                         <CartSingle
//                           key={item._id}
//                           data={item}
//                           quantityChangeHandler={quantityChangeHandler}
//                           removeFromCartHandler={removeFromCartHandler}
//                           selected={selectedItems}
//                           onSelect={handleSelectItem}
//                           updateSelectedItems={updateSelectedItems}
//                           className="mb-4 last:mb-0"
//                         />
//                       ))}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </>
//         )}
//       </div>

//       {cart.length > 0 && (
//         <div className="sticky bottom-0 bg-white shadow-lg mt-auto my-3 rounded-lg border">
//           <div className="p-3 py-4">
//             <div className="flex items-center justify-between">
//               <div className="flex items-center justify-center text-[18px] font-[500] mx-4">
//                 <p className="mx-2">Tổng cộng:</p>
//                 <NumericFormat
//                   value={totalPrice}
//                   displayType={"text"}
//                   thousandSeparator={"."}
//                   decimalSeparator={","}
//                   decimalScale={0}
//                   renderText={(value) => (
//                     <p>
//                       {value}
//                       <sup>₫</sup>
//                     </p>
//                   )}
//                 />
//               </div>
//               <button
//                 onClick={handleCheckout}
//                 disabled={totalPrice === 0}
//                 className={`bg-[#ff424e] w-[14rem] h-[2.5rem] rounded-[4px] flex items-center justify-center ml-6 ${
//                   totalPrice === 0 ? "opacity-50 cursor-not-allowed" : ""
//                 }`}
//               >
//                 <h1 className="text-white text-[18px] font-[600]">Mua Hàng</h1>
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;

/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import styles from "../../styles/styles";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/actions/cart";
import { ShoppingBag, Store, ChevronRight } from "lucide-react";
import { NumericFormat } from "react-number-format";
import { Button } from "../ui/button";
import CartSingle from "./CartSingle";

const Cart = () => {
  const { cart } = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState({});
  const [groupedCart, setGroupedCart] = useState({});
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedShops, setSelectedShops] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const grouped = cart.reduce((acc, item) => {
      const shopId = item.shop?._id;
      if (!acc[shopId]) {
        acc[shopId] = {
          shopName: item.shop?.name,
          items: [],
        };
      }
      acc[shopId].items.push(item);
      return acc;
    }, {});
    setGroupedCart(grouped);

    // Load selected items from localStorage
    const savedSelectedItems = localStorage.getItem("selectedCartItems");
    if (savedSelectedItems) {
      try {
        const parsedSelectedItems = JSON.parse(savedSelectedItems);
        setSelectedItems(parsedSelectedItems);
      } catch (error) {
        console.error(
          "Error parsing selectedCartItems from localStorage:",
          error
        );
        setSelectedItems({});
      }
    } else {
      setSelectedItems({});
    }
  }, [cart]);

  useEffect(() => {
    // Save selected items to localStorage
    if (Object.keys(selectedItems).length > 0) {
      localStorage.setItem("selectedCartItems", JSON.stringify(selectedItems));
    } else {
      localStorage.removeItem("selectedCartItems");
    }
  }, [selectedItems]);

  const removeFromCartHandler = (data) => {
    dispatch(removeFromCart(data));
    setSelectedItems((prev) => {
      const newSelected = { ...prev };
      if (data.hasClassifications && data.selectedClassification) {
        delete newSelected[data.selectedClassification._id];
      } else {
        delete newSelected[data._id];
      }
      // Cập nhật localStorage
      localStorage.setItem("selectedCartItems", JSON.stringify(newSelected));
      return newSelected;
    });
  };

  const updateSelectedItems = (newSelectedItems) => {
    setSelectedItems(newSelectedItems);
    localStorage.setItem("selectedCartItems", JSON.stringify(newSelectedItems));
  };

  const handleSelectItem = (itemId, isSelected) => {
    const newSelectedItems = { ...selectedItems };
    if (isSelected) {
      newSelectedItems[itemId] = true;
    } else {
      delete newSelectedItems[itemId];
    }
    updateSelectedItems(newSelectedItems);

    // Cập nhật trạng thái của checkbox shop
    const newSelectedShops = { ...selectedShops };
    Object.entries(groupedCart).forEach(([shopId, shopData]) => {
      const allItemsSelected = shopData.items.every((item) => {
        const itemId =
          item.hasClassifications && item.selectedClassification
            ? item.classifications.find(
                (c) =>
                  c.group1 === (item.selectedClassification.group1 || "") &&
                  c.group2 === (item.selectedClassification.group2 || "")
              )?._id
            : item._id;
        return newSelectedItems[itemId];
      });
      newSelectedShops[shopId] = allItemsSelected;
    });
    setSelectedShops(newSelectedShops);
  };

  const updateTotalPrice = () => {
    const newTotalPrice = cart.reduce((acc, item) => {
      const price = item.discountPrice || item.price || 0;
      const quantity = item.quantity || 0;

      if (item.hasClassifications && item.selectedClassification) {
        const selectedClassId = item.classifications?.find(
          (c) =>
            c.group1 === (item.selectedClassification?.group1 || "") &&
            c.group2 === (item.selectedClassification?.group2 || "")
        )?._id;

        if (selectedItems[selectedClassId]) {
          const selectedClass = item.classifications?.find(
            (c) =>
              c.group1 === (item.selectedClassification.group1 || "") &&
              c.group2 === (item.selectedClassification.group2 || "")
          );

          const classPrice =
            selectedClass?.discountPrice || selectedClass?.price || 0;
          return acc + classPrice * quantity;
        }
      } else if (selectedItems[item._id]) {
        return acc + price * quantity;
      }

      return acc;
    }, 0);

    return newTotalPrice;
  };

  useEffect(() => {
    setTotalPrice(updateTotalPrice());
  }, [cart, selectedItems]);

  const quantityChangeHandler = (itemId, newQuantity, item) => {
    dispatch(addToCart({ ...item, quantity: newQuantity }));
    setTotalPrice(updateTotalPrice());
  };

  const handleSelectShop = (shopId, isSelected) => {
    setSelectedShops((prev) => ({ ...prev, [shopId]: isSelected }));
    const newSelectedItems = { ...selectedItems };

    groupedCart[shopId].items.forEach((item) => {
      const itemId =
        item.hasClassifications && item.selectedClassification
          ? item.classifications.find(
              (c) =>
                c.group1 === (item.selectedClassification.group1 || "") &&
                c.group2 === (item.selectedClassification.group2 || "")
            )?._id
          : item._id;

      if (itemId) {
        if (isSelected) {
          newSelectedItems[itemId] = true;
        } else {
          delete newSelectedItems[itemId];
        }
      }
    });

    updateSelectedItems(newSelectedItems);
  };

  const handleCheckout = () => {
    const selectedProducts = cart.filter((item) => {
      if (item.hasClassifications) {
        return item.classifications.some((c) => selectedItems[c._id]);
      }
      return selectedItems[item._id];
    });
    navigate("/checkout", { state: { selectedProducts } });
  };

  return (
    <div className="w-[1300px] mx-auto flex flex-col">
      <div className="flex-grow overflow-y-auto">
        {cart && cart.length === 0 ? (
          <div className="w-full flex flex-col h-[20rem] items-center justify-evenly bg-white border rounded-lg my-8">
            <h5 className="text-[20px]">Giỏ Hàng Đang Trống</h5>
            <Link to="/">
              <Button>Tiếp Tục Mua Hàng</Button>
            </Link>
          </div>
        ) : (
          <>
            <div>
              <div className="bg-white my-4 border rounded-lg">
                <div className={`${styles.normalFlex} p-4 border-b`}>
                  <ShoppingBag size={25} className="mr-2" />
                  <h5 className="pl-2 text-[20px] font-[500] ">
                    {cart && cart.length} sản phẩm
                  </h5>
                </div>
                <div className="flex items-center justify-between p-4">
                  <p className="w-[50%] pl-6">Sản Phẩm</p>
                  <p className="w-[10%] flex items-center justify-center">
                    Đơn Giá
                  </p>
                  <p className="w-[10%] flex items-center justify-center">
                    Số Lượng
                  </p>
                  <p className="w-[10%] flex items-center justify-center">
                    Thành Tiền
                  </p>
                  <p className="w-[8%] flex items-center justify-center">Xoá</p>
                </div>
              </div>
              <div className="w-full">
                {Object.entries(groupedCart).map(([shopId, shopData]) => (
                  <div
                    key={shopId}
                    className="mb-4 border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <div className="flex items-center text-[16px] font-[400] px-8 py-4 bg-white hover:bg-gray-200 border-b">
                      {/* <input
                        type="checkbox"
                        checked={selectedShops[shopId] || false}
                        onChange={(e) =>
                          handleSelectShop(shopId, e.target.checked)
                        }
                        className="size-[18px] cursor-pointer"
                      /> */}
                      <div className="inline-flex items-center">
                        <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedShops[shopId] || false}
                            onChange={(e) =>
                              handleSelectShop(shopId, e.target.checked)
                            }
                            className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-gray-300 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-[#27b3e2] before:opacity-0 before:transition-opacity checked:bg-[#27b3e2] checked:bg-[#27b3e2] checked:before:bg-[#27b3e2] hover:before:opacity-10"
                          />
                          <span className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-3.5 w-3.5"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              stroke="currentColor"
                              strokeWidth="1"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              ></path>
                            </svg>
                          </span>
                        </label>
                      </div>
                      <Link
                        to={`/shop/preview/${shopId}`}
                        className="flex items-center"
                      >
                        <Store size={18} className="mx-2 ml-4 text-gray-700" />
                        <p className="text-gray-800">{shopData.shopName}</p>
                        <ChevronRight
                          size={16}
                          className="ml-2 text-gray-700"
                        />
                      </Link>
                    </div>
                    <div className="px-4 py-2 bg-white">
                      {shopData.items.map((item) => (
                        <CartSingle
                          key={item._id}
                          data={item}
                          quantityChangeHandler={quantityChangeHandler}
                          removeFromCartHandler={removeFromCartHandler}
                          selected={selectedItems}
                          onSelect={handleSelectItem}
                          updateSelectedItems={updateSelectedItems}
                          className="mb-4 last:mb-0"
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {cart.length > 0 && (
        <div className="sticky bottom-0 bg-white shadow-lg mt-auto my-3 rounded-lg border">
          <div className="p-3 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center justify-center text-[18px] font-[500] mx-4">
                <p className="mx-2">Tổng cộng:</p>
                <NumericFormat
                  value={totalPrice}
                  displayType={"text"}
                  thousandSeparator={"."}
                  decimalSeparator={","}
                  decimalScale={0}
                  renderText={(value) => (
                    <p>
                      {value}
                      <sup>₫</sup>
                    </p>
                  )}
                />
              </div>
              <button
                onClick={handleCheckout}
                disabled={totalPrice === 0}
                className={`bg-[#ff424e] w-[14rem] h-[2.5rem] rounded-[4px] flex items-center justify-center ml-6 ${
                  totalPrice === 0 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                <h1 className="text-white text-[18px] font-[600]">Mua Hàng</h1>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
