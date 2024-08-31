import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

export const orderReducer = createReducer(initialState, (builder) => {
  builder
    // get all orders of user
    .addCase("getAllOrdersUserRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersUserSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersUserFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all orders of shop
    .addCase("getAllOrdersShopRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllOrdersShopSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get all orders for admin 
    .addCase("getAllOrdersAdminRequest", (state) => {
      state.adminOrderLoading = true;
    })
    .addCase("getAllOrdersAdminSuccess", (state, action) => {
      state.adminOrderLoading = false;
    state.adminOrders = action.payload;
    })
    .addCase("getAllOrdersAdminFail", (state, action) => {
      state.adminOrderLoading = false;
    state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
