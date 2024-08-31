export const addToCart = (data) => async (dispatch, getState) => {
  const cartItemId =
    data.hasClassifications && data.selectedClassification
      ? data.selectedClassification._id
      : data._id
      ? data._id
      : null;

  if (cartItemId && data._id && data.name) {
    const cartItem = {
      ...data,
      cartItemId,
    };

    dispatch({
      type: "addToCart",
      payload: cartItem,
    });
    
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
    return data;
  }

  return null;
};

export const removeFromCart = (data) => async (dispatch, getState) => {
  dispatch({
    type: "removeFromCart",
    payload: data,
  });

  const updatedCart = getState().cart.cart;
  localStorage.setItem("cartItems", JSON.stringify(updatedCart));

  return data;
};