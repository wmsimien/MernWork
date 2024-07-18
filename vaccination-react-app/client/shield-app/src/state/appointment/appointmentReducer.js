import * as actionTypes from '../actionTypes';

export const appointmentReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.APPOINTMENT_REQUEST:
      return { loading: true };
    case actionTypes.APPOINTMENT_SUCCESS:
      return { loading: false, appointment: action.payload };
    case actionTypes.APPOINTMENT_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentListingReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.APPOINTMENT_LIST_REQUEST:
      return { loading: true };
    case actionTypes.APPOINTMENT_LIST_SUCCESS:
      return { loading: false, appointments: action.payload };
    case actionTypes.APPOINTMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const appointmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.APPOINTMENT_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.APPOINTMENT_UPDATE_SUCCESS:
      return { loading: false, appointment: action.payload };
    case actionTypes.APPOINTMENT_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case actionTypes.APPOINTMENT_EMAIL_REQUEST:
      return { loading: false };
    default:
      return state;
  }
};
