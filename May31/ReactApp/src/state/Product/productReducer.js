import * as actionTypes from '../actionTypes';

let initialState = {
  product: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_PRODUCT_TO_STORE:
      return {
        ...state,
        product: action.payload,
      };
    case actionTypes.DISPLAY_ALL_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case actionTypes.SELECT_PRODUCT:
      return {
        ...state,
        product: action.payload,
      };
    case actionTypes.REMOVE_SELECTED_PRODUCT:
      return { product: [] };

    default:
      return state;
  }
};

export default productReducer;
