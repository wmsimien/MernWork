/*
store => its a redux object which help us handle state changes

reducer => 
    each component will have its respective reducer
    a reducer is a functio which works with switch case (for each action type) and updates the state
    for every change returns new state
action => is the object a reducer accepts to create a new state
    action is an object which will contain action type (increment), payload (+5)
*/

import { combineReducers } from 'redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';

import userReducer, {
  userLoginReducer,
  userLogoutReducer,
  userRegisterReducer,
} from './User/userReducer';
import productReducer, {
  getProductDetailsReducer,
  productUpdateReducer,
} from './Product/productReducer';
import cartReducer from './Cart/cartReducer';
import { couponReducer } from './Coupon/CouponReducer';
import {
  orderReducer,
  recentOrdersListReducer,
  orderStatusReducer,
} from './RecentOrders/RecentOrdersReducer';
import { reorderReducer } from './Reorder/ReorderReducer';

const rootReducer = combineReducers({
  userReducer,
  productReducer,
  getProductDetailsReducer,
  cartReducer,
  productUpdateReducer,
  userLoginReducer,
  userRegisterReducer,
  couponReducer,
  orderReducer,
  recentOrdersListReducer,
  orderStatusReducer,
  reorderReducer,
  // userLogoutReducer,
});

const middleware = [thunk];

// create or configure and export the store from this code
export default configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(...middleware),
  {} // initial state if we want to set from store instead of reducer
);
