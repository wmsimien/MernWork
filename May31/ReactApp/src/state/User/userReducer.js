import * as actionTypes from '../actionTypes';

let initialState = {
  user: {},
};

// action will contain two properties: type and payload
let userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_USER_TO_STORE:
      // ...state => is extracting all the state present in the store
      // action.payload => is the new user data that we need to add to stroe
      // User => action.payload - new payload is assigned to user
      return {
        ...state,
        user: action.payload, // new state dispatched to store upon update
      };

    default:
      return state; // if no action matched return default state
  }
};

export default userReducer;
