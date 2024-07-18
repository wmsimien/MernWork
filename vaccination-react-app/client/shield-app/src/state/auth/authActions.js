import {
  AUTH_FAIL,
  AUTH_LOGOUT,
  AUTH_LOGOUT_FAIL,
  CLIENT_SIGNIN_SUCCESS,
  CLIENT_LOGOUT_SUCCESS,
  CLIENT_SIGNIN_REQUEST,
  CLIENT_SIGNIN_FAIL,
} from '../actionTypes';

import axios from 'axios';

const BASE_URL = `http://localhost:9000/api`;

export const setCredentials = (username, password) => async (dispatch) => {
  try {
    // dispatch({ type: AUTH_REQUEST });
    dispatch({ type: CLIENT_SIGNIN_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/auth`, {
      username,
      password,
    });
    console.log('set credentials: ', data);
    // await getCredentials(username, password);
    dispatch({
      type: CLIENT_SIGNIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    dispatch({
      type: CLIENT_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCredentials = async (username, password) => {
  console.log('getCreds called');
  try {
    const { data } = await axios.post(`${BASE_URL}/auth`, {
      username,
      password,
    });
    console.log('getCredentials data: ', data);
    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const logOut = () => async (dispatch) => {
  try {
    await axios.post(`${BASE_URL}/auth/logout`);

    dispatch({ type: AUTH_LOGOUT, payload: {} });
    dispatch({ type: CLIENT_LOGOUT_SUCCESS, payload: {} });
  } catch (error) {
    dispatch({
      type: AUTH_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
