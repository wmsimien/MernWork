import * as actionTypes from '../actionTypes';

let initialState = {
  cart: [],
};

let cartReducer = (state = initialState, action) => {
  // console.log('Cart Actions in Reducer', action, action.payload);
  switch (action.type) {
    case actionTypes.ADD_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case actionTypes.SHOW_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case actionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };

    case actionTypes.RESET_CART:
      return {
        cart: [],
        status: 'closed',
      };

    default:
      return state;
  }
};

export default cartReducer;
