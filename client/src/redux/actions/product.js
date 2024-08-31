import axios from "axios";
import { server } from "../../server";

// add product
export const addProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "AddProductRequest",
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      `${server}/product/add-product`,
      newForm,
      config
    );

    dispatch({
      type: "AddProductSuccess",
      payload: data.product,
    });
  } catch (error) {
    dispatch({
      type: "AddProductFail",
      payload: error.response.data.message,
    });
  }
};

// get all products of shop
export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsShopRequest",
    });
    const { data } = await axios.get(
      `${server}/product/get-all-products-shop/${id}`
    );
    dispatch({
      type: "getAllProductsShopSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsShopFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// delete product
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteProductRequest",
    });
    const { data } = await axios.delete(
      `${server}/product/delete-product/${id}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteProductSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteProductFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};

// get all products
export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllProductsRequest",
    });

    const { data } = await axios.get(`${server}/product/get-all-products`);
    dispatch({
      type: "getAllProductsSuccess",
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: "getAllProductsFail",
      payload: error.response?.data?.message || "An error occurred",
    });
  }
};
