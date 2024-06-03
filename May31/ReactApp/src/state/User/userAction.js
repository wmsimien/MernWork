import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddUserToStore = (user) => {
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
  return (dispatch) => {
    //uri to end point of signinup api
    axios
      .post('http://localhost:9000/user/api/signinup', newUser)
      .then((collection) => {
        let loggedUser = collection.data;
        dispatch(AddUserToStore(loggedUser));
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
        dispatch(AddUserToStore(userData));
      })
      .catch((err) => {
        console.log('error while logging in ', err);
      });
  };
};
