import {
  APPOINTMENT_REQUEST,
  APPOINTMENT_SUCCESS,
  APPOINTMENT_FAIL,
  APPOINTMENT_LIST_REQUEST,
  APPOINTMENT_LIST_SUCCESS,
  APPOINTMENT_LIST_FAIL,
  APPOINTMENT_UPDATE_REQUEST,
  APPOINTMENT_UPDATE_SUCCESS,
  APPOINTMENT_UPDATE_FAIL,
  APPOINTMENT_EMAIL_REQUEST,
} from '../actionTypes';

import axios from 'axios';

const BASE_URL = `http://localhost:9000/api`;

axios.defaults.withCredentials = true;

export const createAppointment =
  ({ ...appointment }) =>
  async (dispatch) => {
    try {
      console.log('appointment: ', appointment);
      dispatch({ type: APPOINTMENT_REQUEST });

      const { data } = await axios.post(`${BASE_URL}/appointment`, {
        appointment,
      });

      dispatch({ type: APPOINTMENT_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: APPOINTMENT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const searchHealthFacilities = async (id, token) => {
  try {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token.token}`,
      },
    };
    // server call
    return await axios.get(`${BASE_URL}/healthFacilities/${id}`, config);
  } catch (error) {
    console.log(error);
  }
};

export const getAllAppointments = () => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_LIST_REQUEST });
    // server call
    const response = await axios.get(`${BASE_URL}/appointment`);

    dispatch({ type: APPOINTMENT_LIST_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateAppointment = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_UPDATE_REQUEST });

    //server call
    const response = await axios.put(`${BASE_URL}/appointment`, {
      id,
      status,
    });

    dispatch({
      type: APPOINTMENT_UPDATE_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: APPOINTMENT_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const sendEmailNotification = (id, status) => async (dispatch) => {
  try {
    dispatch({ type: APPOINTMENT_EMAIL_REQUEST });

    const response = await axios.post(`${BASE_URL}/email`, { id, status });
  } catch (error) {
    console.log(error.message);
  }
};
