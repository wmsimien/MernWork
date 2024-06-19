// 07-02-2024 - Reorder Page
// Reorder
// User to reorder from recent orders or from cancelled orders
// A Simple process just add the order to your cart and replace or merge whatever is present in cart

import { REORDER_REQUEST, REORDER_SUCCESS, REORDER_FAIL } from '../actionTypes';

import axios from 'axios';

export const reorderAction = (order) => async (dispatch, getState) => {
  try {
    dispatch({ type: REORDER_REQUEST });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo,
      },
    };
    console.log('config: ', config);
    // server call
    const { data } = await axios.post(
      `http://localhost:9000/reorder/api/${order}`,
      config
    );

    dispatch({
      type: REORDER_SUCCESS,
      payload: data, // what comes back from db
    });

    // return await axios.put(
    //   `http://localhost:9000/cart/api/cart/${cart[0]._id}`,
    //   config
    // );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: REORDER_FAIL,
      payload: message,
    });
  }
};

/**
 * export const SaveCartToDB = (cart) => {
  console.log('cart: ', cart);
  return (dispatch) => {
    axios
      .post('http://localhost:9000/cart/api/createCart', cart)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        dispatch(AddToCart(cart));
      })
      .catch((err) => {
        console.log('Error occurred while saving new shopping cart.', err);
      });
  };
};
 */
