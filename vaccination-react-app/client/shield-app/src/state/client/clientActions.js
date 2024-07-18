import {
  CLIENT_REGISTER_SUCCESS,
  CLIENT_REGISTER_REQUEST,
  CLIENT_REGISTER_FAIL,
  CLIENT_LIST_FAIL,
  CLIENT_LIST_REQUEST,
  CLIENT_LIST_SUCCESS,
  CLIENT_SIGNIN_REQUEST,
  CLIENT_SIGNIN_SUCCESS,
  CLIENT_LOGOUT_SUCCESS,
  CLIENT_SIGNIN_FAIL,
  CLIENT_LOGOUT_REQUEST,
  CLIENT_LOGOUT_FAIL,
  CLIENT_REQUEST,
  CLIENT_SUCCESS,
  CLIENT_FAIL,
  CLIENT_UPDATE_REQUEST,
  CLIENT_UPDATE_SUCCESS,
  CLIENT_UPDATE_FAIL,
} from '../actionTypes';

import axios from 'axios';

const BASE_URL = `http://localhost:9000/api`;

// allows axios to set credentials/cookies
axios.defaults.withCredentials = true;

export const register =
  ({ ...register }) =>
  async (dispatch) => {
    try {
      dispatch({ type: CLIENT_REGISTER_REQUEST });

      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const {
        firstName,
        lastName,
        username,
        password,
        age,
        gender,
        conceptName,
        profession,
        contactName,
        contactNumber,
        address,
        disease,
        email,
      } = register;

      console.log('firstName: ', firstName);
      const { data } = await axios.post(
        `${BASE_URL}/clients`,
        {
          firstName,
          lastName,
          username,
          password,
          age,
          gender,
          conceptName,
          profession,
          contactName,
          contactNumber,
          address,
          disease,
          email,
        },
        config
      );

      dispatch({ type: CLIENT_REGISTER_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: CLIENT_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const clientLogin = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: CLIENT_SIGNIN_REQUEST });

    const { data } = await axios.post(`${BASE_URL}/auth`, {
      username,
      password,
    });

    dispatch({
      type: CLIENT_SIGNIN_SUCCESS,
      payload: data.accessObj.accessToken,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listClients = () => async (dispatch) => {
  try {
    dispatch({
      type: CLIENT_LIST_REQUEST,
    });

    // server call
    const { data } = await axios.get(`${BASE_URL}/clients`);

    dispatch({
      type: CLIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const listClientsByCategory = (category) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENT_LIST_REQUEST,
    });

    // server call
    const { data } = await axios.get(`${BASE_URL}/clients/reports/${category}`);

    dispatch({
      type: CLIENT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_LIST_FAIL,
      payload: error.message,
    });
  }
};

export const getClientInfo = (clientId) => async (dispatch) => {
  try {
    dispatch({
      type: CLIENT_REQUEST,
    });
    // server call
    const { data } = await axios.get(`${BASE_URL}/clients/${clientId}`);

    dispatch({
      type: CLIENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_FAIL,
      payload: error.message,
    });
  }
};

const setRefreshToken = (token) => (dispatch) => {
  dispatch({
    type: CLIENT_SIGNIN_SUCCESS,
    payload: token,
  });
};

export const getClientInfoForEdit = async (id) => {
  try {
    // server call
    return await axios.get(`${BASE_URL}/clients/${id}`);
  } catch (error) {
    if (error.request.status === 403) {
      try {
        const refreshResult = await axios.get(`${BASE_URL}/auth/refresh`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log('refreshResult: ', refreshResult);
        setRefreshToken(refreshResult.data.accessToken);
        let config = {
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${refreshResult.data.accessToken}`,
          },
        };
        return await axios.get(`${BASE_URL}/clients/${id}`, config);
      } catch (error) {
        console.log('error: ', error.message);
      }
    }
  }
};

export const updateClientInfo = (id, client) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CLIENT_UPDATE_REQUEST,
    });

    // server call
    const { data } = await axios.put(`${BASE_URL}/clients/${id}`, client);

    dispatch({
      type: CLIENT_UPDATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CLIENT_UPDATE_FAIL,
      payload: error.message,
    });
  }
};

export const clientLogout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: CLIENT_LOGOUT_REQUEST });

    dispatch({ type: CLIENT_LOGOUT_SUCCESS, payload: {} });
  } catch (error) {
    dispatch({
      type: CLIENT_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
