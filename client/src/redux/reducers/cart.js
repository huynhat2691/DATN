import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder.addCase("addToCart", (state, action) => {
    const item = action.payload;
    const isItemExist = state.cart.find((i) => {
      if (i._id === item._id) {
        if (i.hasClassifications && item.hasClassifications) {
          return (
            i.selectedClassification?.group1 ===
              item.selectedClassification?.group1 &&
            i.selectedClassification?.group2 ===
              item.selectedClassification?.group2
          );
        } else if (!i.hasClassifications && !item.hasClassifications) {
          return true;
        }
      }
      return false;
    });

    if (isItemExist) {
      return {
        ...state,
        cart: state.cart.map((i) =>
          i._id === isItemExist._id &&
          (!i.hasClassifications ||
            (i.hasClassifications &&
              i.selectedClassification?.group1 ===
                item.selectedClassification?.group1 &&
              i.selectedClassification?.group2 ===
                item.selectedClassification?.group2))
            ? { ...i, quantity: item.quantity } // Sử dụng quantity thay vì qty
            : i
        ),
      };
    } else {
      return {
        ...state,
        cart: [...state.cart, item],
      };
    }
  });

  builder.addCase("removeFromCart", (state, action) => {
    const itemToRemove = action.payload;
    return {
      ...state,
      cart: state.cart.filter((item) => {
        if (item._id !== itemToRemove._id) return true;

        if (item.hasClassifications && itemToRemove.hasClassifications) {
          // So sánh cả group1 và group2 của selectedClassification
          return !(
            item.selectedClassification?.group1 ===
              itemToRemove.selectedClassification?.group1 &&
            item.selectedClassification?.group2 ===
              itemToRemove.selectedClassification?.group2
          );
        } else {
          // Nếu không có classifications, so sánh theo _id
          return false;
        }
      }),
    };
  });
});
