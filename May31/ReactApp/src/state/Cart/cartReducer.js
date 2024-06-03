import * as actionTypes from '../actionTypes';

let initialState = {
  cart: {
    user: {},
    product: [{}],
  },
};

let cartReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};

export default cartReducer;
