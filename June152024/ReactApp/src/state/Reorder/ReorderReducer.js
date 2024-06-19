// 07-02-2024 - Reorder Page
// Reorder
// User to reorder from recent orders or from cancelled orders
// A Simple process just add the order to your cart and replace or merge whatever is present in cart

import * as actionTypes from '../actionTypes';

export const reorderReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.REORDER_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.REORDER_SUCCESS:
      return {
        loading: false,
        recentOrder: action.payload,
      };
    case actionTypes.REORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
