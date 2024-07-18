import * as actionTypes from '../actionTypes';

export const clientRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLIENT_REGISTER_REQUEST:
      return { loading: true };
    case actionTypes.CLIENT_REGISTER_SUCCESS:
      return { loading: false, client: action.payload };
    case actionTypes.CLIENT_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const clientSignInReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLIENT_SIGNIN_REQUEST:
      return { loading: true };
    case actionTypes.CLIENT_SIGNIN_SUCCESS:
      return {
        loading: false,
        client: { ...action.payload },
      };
    case actionTypes.CLIENT_SIGNIN_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const clientListReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLIENT_LIST_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.CLIENT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        clients: action.payload,
      };
    case actionTypes.CLIENT_LIST_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const clientUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLIENT_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.CLIENT_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        client: action.payload,
      };
    case actionTypes.CLIENT_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const clientReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLIENT_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.CLIENT_SUCCESS:
      return {
        loading: false,
        success: true,
        client: action.payload,
      };
    case actionTypes.CLIENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export const clientAuthReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.AUTH_USERNAME:
      return {
        loading: false,
        success: true,
        clientId: action.payload,
      };

    default:
      return state;
  }
};

export const clientLogoutReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CLIENT_LOGOUT_REQUEST:
      return { loading: true };
    case actionTypes.CLIENT_LOGOUT_SUCCESS:
      return {
        loading: true,
        client: action.payload,
      };
    case actionTypes.CLIENT_LOGOUT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
