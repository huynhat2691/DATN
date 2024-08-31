import { createAction, createReducer } from "@reduxjs/toolkit";

// Tạo actions
const LoadUserRequest = createAction("LoadUserRequest");
const LoadUserSuccess = createAction("LoadUserSuccess");
const LoadUserFail = createAction("LoadUserFail");
const clearErrors = createAction("clearErrors");
const clearMessages = createAction("clearMessages");

// Khởi tạo trạng thái ban đầu
const initialState = {
  isAuthenticated: false,
};

// Sử dụng builder callback notation để đăng ký reducer handlers
export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(LoadUserRequest, (state) => {
      state.loading = true;
    })
    .addCase(LoadUserSuccess, (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase(LoadUserFail, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    })

    //update user information
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("updateUserInfoFail", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })

    // update user address
    .addCase("updateUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("updateUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // delete user address
    .addCase("deleteUserAddressRequest", (state) => {
      state.addressLoading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.addressLoading = false;
      state.successMessage = action.payload.successMessage;
      state.user = action.payload.user;
    })
    .addCase("deleteUserAddressFail", (state, action) => {
      state.addressLoading = false;
      state.error = action.payload;
    })

    // get all users for admin 
    .addCase("getAllUsersAdminRequest", (state) => {
      state.usersLoading = true;
    })
    .addCase("getAllUsersAdminSuccess", (state, action) => {
      state.usersLoading = false;
      state.users = action.payload;
    })
    .addCase("getAllUsersAdminFail", (state, action) => {
      state.usersLoading = false;
      state.error = action.payload;
    })

    .addCase(clearErrors, (state) => {
      state.error = null;
    })

    .addCase(clearMessages, (state) => {
      state.successMessage = null;
    });
});
