import * as actionTypes from '../actionTypes';

let initialState = {
  user: {},
};

let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      return {
        ...state,
        user: action.payload, // new state dispatched to store upon update
      };

    default:
      return state; // if no action matched return default state
  }
};

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        loading: true,
        userInfo: action.payload,
      };
    case actionTypes.USER_LOGIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        loading: true,
        userInfo: action.payload,
      };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case actionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.USER_UPDATE_SUCCESS:
      return { loading: false, userInfo: action.payload, success: true };
    case actionTypes.USER_UPDATE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.USER_LOGOUT_REQUEST:
      return { loading: true };
    case actionTypes.USER_LOGOUT_SUCCESS:
      return {
        loading: true,
        userInfo: action.payload,
      };
    case actionTypes.USER_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
