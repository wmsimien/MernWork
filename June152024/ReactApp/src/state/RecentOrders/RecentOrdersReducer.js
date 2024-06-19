/*
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)

// Make API to Save and Fetch from RecentOrders

// Make a component RecentOrders to Show all previous Orders of current user

// Add a button to Cancel (like) we have remove in CartComponent and then save again, 

// order can be cancelled within 2 days after that it should be marked delivered
*/

import * as actionTypes from '../actionTypes';

export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.ORDER_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.ORDER_SUCCESS:
      return {
        loading: false,
        success: true,
        recentOrder: action.payload,
      };
    case actionTypes.ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const recentOrdersListReducer = (
  state = { recentOrders: [] },
  action
) => {
  switch (action.type) {
    case actionTypes.RECENT_ORDERS_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.RECENT_ORDERS_LIST_SUCCESS:
      return {
        loading: false,
        recentOrders: action.payload,
      };
    case actionTypes.RECENT_ORDERS_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.RECENT_ORDERS_LIST_DELIVERED:
      return {
        loading: false,
        recentOrders: action.payload,
      };
    default:
      return state;
  }
};

export const orderStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_ORDER_STATUS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.SET_ORDER_STATUS_SUCCESS:
      console.log('order success in order status reducer: ', action.payload);
      return {
        loading: false,
        recentOrder: action.payload,
      };
    case actionTypes.SET_ORDER_STATUS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
