/*
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)

// Make API to Save and Fetch from RecentOrders

// Make a component RecentOrders to Show all previous Orders of current user

// Add a button to Cancel (like) we have remove in CartComponent and then save again, 

// order can be cancelled within 2 days after that it should be marked delivered
*/

import {
  ORDER_REQUEST,
  ORDER_SUCCESS,
  ORDER_FAIL,
  RECENT_ORDERS_LIST_REQUEST,
  RECENT_ORDERS_LIST_SUCCESS,
  RECENT_ORDERS_LIST_FAIL,
  SET_ORDER_STATUS_REQUEST,
  SET_ORDER_STATUS_FAIL,
  SET_ORDER_STATUS_SUCCESS,
} from '../actionTypes';

import axios from 'axios';

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: RECENT_ORDERS_LIST_REQUEST,
    });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    // server call
    const { data } = await axios.post(
      `http://localhost:9000/recentOrders/api/recentOrders/`,
      userInfo
    );

    dispatch({
      type: RECENT_ORDERS_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECENT_ORDERS_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const createOrderFromPayment = (cart) => async (dispatch, getState) => {
  try {
    dispatch({ type: ORDER_REQUEST });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: userInfo,
      },
    };

    // server call
    const { data } = await axios.post(
      'http://localhost:9000/recentOrders/api/createOrder',
      cart,
      config
    );

    dispatch({
      type: ORDER_SUCCESS,
      payload: data, // what comes back from db
    });

    return await axios.put(
      `http://localhost:9000/cart/api/cart/${cart[0]._id}`,
      config
    );
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_FAIL,
      payload: message,
    });
  }
};

export const setOrderStatus = (order, status) => async (dispatch, getState) => {
  console.log('recent order set status action...', order, status);

  try {
    dispatch({ type: SET_ORDER_STATUS_REQUEST });

    // server call
    const { data } = await axios.post(
      'http://localhost:9000/recentOrders/api/',
      order
    );
    console.log('data for set order status: ', data);
    dispatch({
      type: SET_ORDER_STATUS_SUCCESS,
      payload: data.value,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SET_ORDER_STATUS_FAIL,
      payload: message,
    });
  }
};

export const getOrderForReview = (order) => async (dispatch, getState) => {
  console.log('get order for review action...', order);

  try {
    dispatch({ type: SET_ORDER_STATUS_REQUEST });

    // server call
    const { data } = await axios.put(
      'http://localhost:9000/recentOrders/api/',
      order
    );

    dispatch({
      type: SET_ORDER_STATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: SET_ORDER_STATUS_FAIL,
      payload: message,
    });
  }
};
