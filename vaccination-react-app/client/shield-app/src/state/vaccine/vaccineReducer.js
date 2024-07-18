import * as actionTypes from '../actionTypes';

export const vaccineReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.VACCINE_ADD_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VACCINE_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        vaccine: action.payload,
      };
    case actionTypes.VACCINE_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VACCINE_REMOVE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VACCINE_REMOVE_SUCCESS:
      return {
        loading: false,
        success: true,
        vaccine: action.payload,
      };
    case actionTypes.VACCINE_REMOVE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VACCINE_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VACCINE_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        vaccine: action.payload,
      };
    case actionTypes.VACCINE_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VACCINE_GET_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VACCINE_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        vaccine: action.payload,
      };
    case actionTypes.VACCINE_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.VACCINE_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.VACCINE_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        vaccines: action.payload,
      };
    case actionTypes.VACCINE_LIST_OPTIONS:
      return {
        loading: false,
        success: true,
        vaccineOptions: action.payload,
      };
    case actionTypes.VACCINE_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
