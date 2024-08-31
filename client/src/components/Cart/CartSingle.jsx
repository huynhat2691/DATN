/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { Trash, Plus, Minus } from "lucide-react";
import { toast } from "react-toastify";
import styles from "../../styles/styles";
import { backend_url } from "../../server";

const CartSingle = ({
  data,
  quantityChangeHandler,
  removeFromCartHandler,
  selected,
  onSelect,
  updateSelectedItems,
  hideCheckbox = false,
  hideQuantityControls = false,
  hideOriginalPrice = false,
  noBorder = false,
}) => {
  const [value, setValue] = useState(data?.quantity || 1);
  const [isSelected, setIsSelected] = useState(false);

  useEffect(() => {
    if (data?.hasClassifications && data?.selectedClassification) {
      const selectedClassId = data.classifications?.find(
        (c) =>
          c.group1 === (data.selectedClassification?.group1 || "") &&
          c.group2 === (data.selectedClassification?.group2 || "")
      )?._id;
      setIsSelected(
        selectedClassId ? selected?.[selectedClassId] || false : false
      );
    } else {
      setIsSelected(selected?.[data?._id] || false);
    }
  }, [selected, data]);

  const formatPrice = (price) => {
    if (price === undefined || price === null) {
      return "0";
    }
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const getPrice = () => {
    if (data.hasClassifications && data.selectedClassification) {
      const selectedClass = data.classifications?.find(
        (c) =>
          c.group1 === (data.selectedClassification.group1 || "") &&
          c.group2 === (data.selectedClassification.group2 || "")
      );
      return selectedClass ? selectedClass.price : data.price || "0";
    }
    return data.price || "0";
  };

  const getDiscountPrice = () => {
    if (data.hasClassifications && data.selectedClassification) {
      const selectedClass = data.classifications?.find(
        (c) =>
          c.group1 === (data.selectedClassification.group1 || "") &&
          c.group2 === (data.selectedClassification.group2 || "")
      );
      return selectedClass
        ? selectedClass.discountPrice
        : data.discountPrice || "0";
    }
    return data.discountPrice || "0";
  };

  const getStock = () => {
    if (data.hasClassifications && data.selectedClassification) {
      const selectedClass = data.classifications?.find(
        (c) =>
          c.group1 === (data.selectedClassification.group1 || "") &&
          c.group2 === (data.selectedClassification.group2 || "")
      );
      return selectedClass ? selectedClass.stock : data.stock || 0;
    }
    return data.stock || 0;
  };

  const calculateTotalPrice = () => {
    const discountPrice = getDiscountPrice();
    const price = discountPrice;
    return isNaN(price) ? 0 : price * value;
  };

  const finalPrice = calculateTotalPrice();

  const handleRemoveFromCart = () => {
    const itemToRemove = {
      ...data,
      selectedClassification:
        data.hasClassifications && data.selectedClassification
          ? {
              _id: data.selectedClassification._id,
              group1: data.selectedClassification.group1 || "",
              group2: data.selectedClassification.group2 || "",
            }
          : null,
    };
    removeFromCartHandler(itemToRemove);

    updateSelectedItems((prev) => {
      const newSelected = { ...prev };
      if (data.hasClassifications && data.selectedClassification) {
        delete newSelected[data.selectedClassification._id];
      } else {
        delete newSelected[data._id];
      }
      return newSelected;
    });
  };

  const incrementCount = () => {
    if (value < getStock()) {
      const newValue = value + 1;
      setValue(newValue);
      quantityChangeHandler(data._id, newValue, {
        ...data,
        quantity: newValue,
      });
    } else {
      toast.error("Đã đạt số lượng tối đa trong kho!");
    }
  };

  const decrementCount = () => {
    if (value > 1) {
      const newValue = value - 1;
      setValue(newValue);
      quantityChangeHandler(data._id, newValue, {
        ...data,
        quantity: newValue,
      });
    }
  };

  const handleInputChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue) && newValue >= 1 && newValue <= getStock()) {
      setValue(newValue);
      quantityChangeHandler(data._id, newValue, {
        ...data,
        quantity: newValue,
      });
    } else {
      toast.error("Số lượng không hợp lệ!");
    }
  };

  const handleSelect = () => {
    const newSelectedState = !isSelected;
    setIsSelected(newSelectedState);
    const itemId =
      data.hasClassifications && data.selectedClassification
        ? data.classifications.find(
            (c) =>
              c.group1 === (data.selectedClassification.group1 || "") &&
              c.group2 === (data.selectedClassification.group2 || "")
          )?._id
        : data._id;

    if (itemId) {
      onSelect(itemId, newSelectedState);
      updateSelectedItems((prev) => {
        const newSelected = { ...prev, [itemId]: newSelectedState };

        return newSelected;
      });
    }
  };

  return (
    <div className={`p-4 ${noBorder ? "" : "border"} my-4`}>
      <div className="flex items-center">
        <div className="w-full flex items-center justify-between">
          {!hideCheckbox && (
            <div className="cart-single-checkbox">
              {/* <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
                className="size-[18px] cursor-pointer"
              /> */}
              <div className="inline-flex items-center">
                <label className="relative flex items-center p-3 rounded-full cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={handleSelect}
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
            </div>
          )}
          <div className="flex items-center w-[40%]">
            <div className="flex items-center">
              {data.images && data.images[0] && (
                <img
                  src={`${backend_url}${data.images[0]}`}
                  alt=""
                  className="size-[80px] mx-2 rounded-md object-cover"
                />
              )}
              <h1 className="line-clamp-2 overflow-hidden break-words max-w-[400px]">
                {data.name}
                {data.hasClassifications && data.selectedClassification && (
                  <span className="text-sm text-gray-500">
                    {` (${data.selectedClassification.group1 || "N/A"}, ${
                      data.selectedClassification.group2 || "N/A"
                    })`}
                  </span>
                )}
              </h1>
            </div>
          </div>
          <div className="pl-[5px] flex items-center justify-center w-[10%]">
            <h4 className="font-[600] text-[17px] text-[#d02222]">
              {formatPrice(getDiscountPrice())}
              <sup>₫</sup>
            </h4>
            {!hideOriginalPrice && (
              <h4 className="line-through ml-2">
                {formatPrice(getPrice())}
                <sup>₫</sup>
              </h4>
            )}
          </div>

          <div className="flex items-center ml-2 w-[10%]">
            {hideQuantityControls ? (
              <span className="text-center w-full">{value}</span>
            ) : (
              <>
                <button
                  className={`${styles.normalFlex} border border-gray-400 text-white font-bold rounded-l px-2  hover:opacity-75 transition duration-300 ease-in-out h-8`}
                  onClick={decrementCount}
                >
                  <Minus size={18} color="#2d3436" />
                </button>
                <input
                  type="text"
                  className=" text-black font-[500] px-2 w-12 h-8 border-t border-b border-gray-400 text-center"
                  value={value}
                  onChange={handleInputChange}
                />
                <button
                  className="border border-gray-400 text-white font-bold rounded-r px-2  hover:opacity-75 transition duration-300 ease-in-out h-8"
                  onClick={incrementCount}
                >
                  <Plus size={16} color="#2d3436" />
                </button>
              </>
            )}
          </div>
          <div className="w-[10%]">
            <h4 className="font-[600] text-[17px] text-center text-[#d02222]">
              {formatPrice(finalPrice)}
              <sup>₫</sup>
            </h4>
          </div>

          {!hideCheckbox && (
            <Trash
              size={20}
              color="#2d3436"
              className="cursor-pointer w-[5%] flex items-center justify-center"
              onClick={handleRemoveFromCart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CartSingle;
