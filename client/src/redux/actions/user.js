import { server } from "../../server";
import axios from "axios";

// load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// load seller
export const loadSeller = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadSellerRequest",
    });
    const { data } = await axios.get(`${server}/shop/getSeller`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadSellerSuccess",
      payload: data.seller,
    });
  } catch (error) {
    dispatch({
      type: "LoadSellerFail",
      payload: error.response.data.message,
    });
  }
};

// update user information
export const updateUserInfo =
  (email, password, phoneNumber, name) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserInfoRequest",
      });

      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          email,
          password,
          phoneNumber,
          name,
        },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "updateUserInfoSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserInfoFail",
        payload: error.response.data.message,
      });
    }
  };

// update user address
// export const updateUserAddress =
//   (fullname, country, city, address1, zipcode, addressType) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateUserAddressRequest",
//       });
//       const { data } = await axios.put(
//         `${server}/user/update-user-addresses`,
//         {
//           fullname,
//           country,
//           city,
//           address1,
//           zipcode,
//           addressType,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Access-Control-Allow-Credentials": true,
//           },
//         }
//       );

//       dispatch({
//         type: "updateUserAddressSuccess",
//         payload: {
//           user: data.user,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateUserAddressFail",
//         payload: error.response.data.message,
//       });
//     }
//   };

// export const updateUserAddress =
//   (fullname, phoneNumber, province, district, ward, address1, addressType) =>
//   async (dispatch) => {
//     try {
//       dispatch({
//         type: "updateUserAddressRequest",
//       });
//       const { data } = await axios.put(
//         `${server}/user/update-user-addresses`,
//         {
//           fullname,
//           phoneNumber,
//           province,
//           district,
//           ward,
//           address1,
//           addressType,
//         },
//         {
//           withCredentials: true,
//           headers: {
//             "Access-Control-Allow-Credentials": true,
//           },
//         }
//       );

//       dispatch({
//         type: "updateUserAddressSuccess",
//         payload: {
//           user: data.user,
//         },
//       });
//     } catch (error) {
//       dispatch({
//         type: "updateUserAddressFail",
//         payload: error.response.data.message,
//       });
//     }
//   };

export const updateUserAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({
      type: "updateUserAddressRequest",
    });

    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      addressData,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    dispatch({
      type: "updateUserAddressSuccess",
      payload: {
        user: data.user,
        successMessage: data.message, // Assuming your API returns a success message
      },
    });
  } catch (error) {
    dispatch({
      type: "updateUserAddressFail",
      payload: error.response.data.message,
    });
  }
};

// delete user address
export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });

    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${id}`,
      {
        withCredentials: true,
        headers: {
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllUsersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllUsersAdminRequest",
    });

    const { data } = await axios.get(`${server}/user/admin-get-all-users`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllUsersAdminSuccess",
      payload: data.users,
    });
  } catch (error) {
    dispatch({
      type: "getAllUsersAdminFail",
      payload: error.response.data.message,
    });
  }
};
