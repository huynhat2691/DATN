import { server } from "../../server";
import axios from "axios";

// get all sellers for admin
export const getAllSellersAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllSellersAdminRequest",
    });

    const { data } = await axios.get(`${server}/shop/admin-get-all-sellers`, {
      withCredentials: true,
    });

    dispatch({
      type: "getAllSellersAdminSuccess",
      payload: data.sellers,
    });
  } catch (error) {
    dispatch({
      type: "getAllSellersAdminRequest",
      payload: error.response.data.message,
    });
  }
};

export const getShopDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: 'getShopDetailsRequest' });
    const { data } = await axios.get(`${server}/shop/get-shop-info/${id}`);
    dispatch({
      type: 'getShopDetailsSuccess',
      payload: data.shop,
    });
  } catch (error) {
    dispatch({
      type: 'getShopDetailsFail',
      payload: error.response.data.message,
    });
  }
};