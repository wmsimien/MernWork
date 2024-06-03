import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';

import userReducer from './User/userReducer';
import productReducer from './Product/productReducer';
import cartReducer from './Cart/cartReducer';

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  cartReducer,
});

// create or configure and export the store from this code
export default configureStore(
  {
    reducer: rootReducer,
  },
  {} // initial state if we want to set from store instead of reducer
);
