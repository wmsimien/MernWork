import * as actionTypes from '../actionTypes';

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.AUTH_REQUEST:
      return { loading: true };
    case actionTypes.AUTH_SUCCESS:
      return { loading: false, token: action.payload };
    case actionTypes.AUTH_LOGOUT:
      return { loading: false, token: action.payload };
    case actionTypes.AUTH_LOGOUT_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.AUTH_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
