import { createAction, createReducer } from "@reduxjs/toolkit";

// Tạo actions
const LoadSellerRequest = createAction("LoadSellerRequest");
const LoadSellerSuccess = createAction("LoadSellerSuccess");
const LoadSellerFail = createAction("LoadSellerFail");
const clearErrors = createAction("clearErrors");

// Khởi tạo trạng thái ban đầu
const initialState = {
  isLoading: true,
};

// Sử dụng builder callback notation để đăng ký reducer handlers
export const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LoadSellerRequest, (state) => {
      state.isLoading = true;
    })
    .addCase(LoadSellerSuccess, (state, action) => {
      state.isSellerAuthenticated = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase(LoadSellerFail, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.isSellerAuthenticated = false;
    })

    // get all sellers for admin 
    .addCase("getAllSellersAdminRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllSellersAdminSuccess", (state, action) => {
      state.isLoading = false;
      state.sellers = action.payload;
    })
    .addCase("getAllSellersAdminFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    // get shop info
    .addCase("getShopDetailsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getShopDetailsSuccess", (state, action) => {
      state.isLoading = false;
      state.sellerDetails = action.payload;
    })
    .addCase("getShopDetailsFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })


    // clear errors
    .addCase(clearErrors, (state) => {
      state.error = null;
    });
});
