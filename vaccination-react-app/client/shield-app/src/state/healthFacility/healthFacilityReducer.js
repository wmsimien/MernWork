import * as actionTypes from "../actionTypes";

export const healthFacilityReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.HEALTH_FACILITY_ADD_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.HEALTH_FACILITY_ADD_SUCCESS:
      return {
        loading: false,
        success: true,
        healthFacility: action.payload,
      };
    case actionTypes.HEALTH_FACILITYE_ADD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.HEALTH_FACILITY_UPDATE_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.HEALTH_FACILITY_UPDATE_SUCCESS:
      return {
        loading: false,
        success: true,
        healthFacility: action.payload,
      };
    case actionTypes.HEALTH_FACILITY_UPDATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.HEALTH_FACILITY_GET_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.HEALTH_FACILITY_GET_SUCCESS:
      return {
        loading: false,
        success: true,
        healthFacility: action.payload,
      };
    case actionTypes.HEALTH_FACILITY_GET_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
