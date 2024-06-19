/**
 action is an object with two properties: type and payload

 */

import * as actionTypes from '../actionTypes';
import axios from 'axios';

import { ViewUserShoppingCart } from '../../state/Cart/cartAction';

import { listOrders } from '../../state/RecentOrders/RecentOrderActions';

export const AddUserToStore = (user) => {
  return {
    //actionTypes to be matched in user reducer
    type: actionTypes.ADD_USER_TO_STORE,
    // payload which will update the user state
    payload: user,
  };
};

export const SaveRegisterUser = (user) => {
  return {
    //actionTypes to be matched in user reducer
    type: actionTypes.ADD_USER_TO_STORE,
    // payload which will update the user state
    payload: user,
  };
};

// server call
// to save user to mongodb and do a sign-in or sign up
export const SaveUserToDB = (newUser) => {
  console.log(newUser);
  return (dispatch) => {
    //uri to end point of signinup api
    axios
      .post('http://localhost:9000/user/api/signinup', newUser)
      .then((collection) => {
        let loggedUser = collection.data;
        console.log(loggedUser);
        dispatch(AddUserToStore(loggedUser));
      })
      .catch((err) => {
        console.log('Error while logging in ', err);
      });
  };
};

export const RegisterUser = (newUser) => {
  console.log(newUser);
  return (dispatch) => {
    //uri to end point of signinup api
    axios
      .post('http://localhost:9000/user/api/register', newUser)
      .then((collection) => {
        let loggedUser = collection.data;
        console.log(loggedUser);
        dispatch(SaveRegisterUser(loggedUser));
      })
      .catch((err) => {
        console.log('Error while logging in ', err);
      });
  };
};

export const SaveUserToDBUsingFetch = (newUser) => {
  return (dispatch) => {
    window
      .fetch('http://localhost:9000/user/api/signinup', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      })
      .then((response) => response.json())
      .then((userData) => {
        console.log(userData);
        dispatch(AddUserToStore(userData));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};
/////////////////////////////////////////////////////////////////////////
export const login = (username, password) => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.USER_LOGIN_REQUEST });

    const config = {
      headers: {
        'Content-type': 'application/json',
      },
    };

    const { data } = await axios.post(
      'http://localhost:9000/user/api/userLogin',
      { username, password },
      config
    );

    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

    dispatch(ViewUserShoppingCart(data));

    dispatch(listOrders());

    localStorage.setItem('userInfo', JSON.stringify(data._id));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: actionTypes.USER_LOGOUT_REQUEST });

    dispatch({ type: actionTypes.USER_LOGOUT_SUCCESS, payload: {} });

    const {
      userLoginReducer: { userInfo },
    } = getState();

    console.log('userInfo from user actions: ', userInfo);

    localStorage.setItem('userInfo', '');
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGOUT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
