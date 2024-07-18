import {
  VACCINE_ADD_REQUEST,
  VACCINE_ADD_SUCCESS,
  VACCINE_ADD_FAIL,
  VACCINE_UPDATE_REQUEST,
  VACCINE_UPDATE_SUCCESS,
  VACCINE_UPDATE_FAIL,
  VACCINE_GET_REQUEST,
  VACCINE_GET_SUCCESS,
  VACCINE_GET_FAIL,
  VACCINE_LIST_REQUEST,
  VACCINE_LIST_SUCCESS,
  VACCINE_LIST_FAIL,
} from "../actionTypes";

import axios from "axios";

const BASE_URL = `http://localhost:9000/api`;

// allows axios to set credentials/cookies
axios.defaults.withCredentials = true;

export const createVaccine =
  ({ ...vaccine }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: VACCINE_ADD_REQUEST });

      const {
        authReducer: { token },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const {
        name,
        type,
        price,
        sideEffect,
        origin,
        doseRequired,
        otherInfo,
        address,
        startDate,
        endDate,
      } = vaccine;

      console.log("vaccine name from vaccineActions: ", vaccine);
      const { data } = await axios.post(
        `${BASE_URL}/vaccines`,
        {
          name,
          type,
          price,
          sideEffect,
          origin,
          doseRequired,
          otherInfo,
          address,
          startDate,
          endDate,
        },
        config
      );

      dispatch({ type: VACCINE_ADD_SUCCESS, payload: data });
    } catch (error) {
      dispatch({
        type: VACCINE_ADD_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getVaccinesList = () => async (dispatch) => {
  try {
    dispatch({ type: VACCINE_LIST_REQUEST });

    //server call
    const response = await axios.get(`${BASE_URL}/vaccines`);
    console.log("vaccines", response.data);
    const results = response.data;
    let options = [];
    results.forEach((vac) =>
      options.push({
        value: vac.name + ", $" + vac.price + " (" + vac.type + ")",
        id: vac._id,
      })
    );
    dispatch({ type: VACCINE_LIST_SUCCESS, payload: options });
  } catch (error) {
    dispatch({
      type: VACCINE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVaccineByName = (name, type) => async (dispatch, getState) => {
  try {
    dispatch({ type: VACCINE_GET_REQUEST });

    // const {
    //   authReducer: { token },
    // } = getState();

    // const config = {
    //   headers: {
    //     'Content-Type': 'application/json',
    //     // authorization: `Bearer ${token}`,
    //   },
    // };
    //server call
    const response = await axios.put(`${BASE_URL}/vaccines/`, { name, type });
    response.data.startDate = response.data.startDate.substring(0, 10);
    if (response.data.endDate == null) response.data.endDate = "1900-01-01";
    console.log("returned vaccine in data: ", response.data);
    dispatch({ type: VACCINE_GET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: VACCINE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getVaccineById = (id) => async (dispatch) => {
  try {
    dispatch({ type: VACCINE_GET_REQUEST });

    //server call
    const response = await axios.get(`${BASE_URL}/vaccines/${id}`);
    console.log("getVaccineById actions response: ", response);
    if (response.data.endDate == null) response.data.endDate = "1900-01-01";
    console.log("returned vaccine in data: ", response.data);
    dispatch({ type: VACCINE_GET_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: VACCINE_GET_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const searchVaccine = async (name, type, token) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };

    //server call
    const response = await axios.get(
      `${BASE_URL}/vaccines/${name}/${type}`,
      config
    );

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};

export const updateVaccine = (vaccine) => async (dispatch, getState) => {
  try {
    dispatch({ type: VACCINE_UPDATE_REQUEST });

    const {
      authReducer: { token },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
    };
    //server call
    const response = await axios.put(
      `${BASE_URL}/vaccines/`,
      { vaccine },
      config
    );
    response.data.startDate = response.data.startDate.substring(0, 10);
    if (response.data.endDate == null) response.data.endDate = "1900-01-01";
    console.log("returned vaccine in data: ", response.data);
    dispatch({ type: VACCINE_UPDATE_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: VACCINE_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
