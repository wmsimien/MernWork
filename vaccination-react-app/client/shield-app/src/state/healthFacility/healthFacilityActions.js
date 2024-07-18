import {
  HEALTH_FACILITY_ADD_REQUEST,
  HEALTH_FACILITY_ADD_SUCCESS,
  HEALTH_FACILITYE_ADD_FAIL,
  HEALTH_FACILITY_UPDATE_REQUEST,
  HEALTH_FACILITY_UPDATE_SUCCESS,
  HEALTH_FACILITY_UPDATE_FAIL,
  HEALTH_FACILITY_GET_REQUEST,
  HEALTH_FACILITY_GET_SUCCESS,
  HEALTH_FACILITY_GET_FAIL,
} from '../actionTypes';

import axios from 'axios';

const BASE_URL = `http://localhost:9000/api`;

// allows axios to set credentials/cookies
axios.defaults.withCredentials = true;

export const createHealthFacility =
  ({ ...healthFacility }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: HEALTH_FACILITY_ADD_REQUEST });

      const {
        authReducer: { token },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };

      const { name, type, address, charges, zipCode } = healthFacility;

      const { data } = await axios.post(
        `${BASE_URL}/healthFacilities`,
        {
          name,
          type,
          address,
          charges,
          zipCode,
        },
        config
      );

      dispatch({ type: HEALTH_FACILITY_ADD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: HEALTH_FACILITYE_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const searchHealthFacility = async (name, type, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    };

    //server call
    const response = await axios.get(
      `${BASE_URL}/healthFacilities/${name}/${type}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateHealthFacility =
  (healthFacility) => async (dispatch, getState) => {
    try {
      dispatch({ type: HEALTH_FACILITY_UPDATE_REQUEST });

      const {
        authReducer: { token },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      };
      //server call
      const response = await axios.put(
        `${BASE_URL}/healthFacilities`,
        { healthFacility },
        config
      );

      console.log('returned health facility in data: ', response.data);
      dispatch({
        type: HEALTH_FACILITY_UPDATE_SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      dispatch({
        type: HEALTH_FACILITY_UPDATE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const searchHealthFacilities = async (zipCode) => {
  try {
    // server call
    return await axios.get(`${BASE_URL}/healthFacilities/${zipCode}`);
  } catch (error) {
    console.log(error);
  }
};

export const getByFacilityId = (id) => async (dispatch) => {
  try {
    dispatch({ type: HEALTH_FACILITY_GET_REQUEST });
    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // authorization: `Bearer ${token}`,
    //   },
    // };

    //server call
    const response = await axios.get(`${BASE_URL}/healthFacility/${id}`);
    console.log('getById: ', response);
    dispatch({
      type: HEALTH_FACILITY_GET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: HEALTH_FACILITY_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
