import * as actionTypes from '../actionTypes';

let initialState = {
  product: [],
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_REQUEST:
      return {
        loading: true,
        products: [],
      };
    case actionTypes.GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        products: action.payload,
      };
    case actionTypes.GET_PRODUCT_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
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
    case actionTypes.SET_PRODUCT_QTY:
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

export const getProductDetailsReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case actionTypes.GET_PRODUCT_DETAILS_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.GET_PRODUCT_DETAILS_SUCCESS:
      return {
        loading: true,
        product: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.GET_PRODUCT_DETAILS_RESET:
      return {
        product: {},
      };

    default:
      return state;
  }
};

export const productUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };

    default:
      return state;
  }
};

export default productReducer;
