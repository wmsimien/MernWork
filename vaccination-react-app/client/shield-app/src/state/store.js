import { combineReducers } from 'redux';
import { configureStore, applyMiddleware } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk';
import {
  clientAuthReducer,
  clientListReducer,
  clientLogoutReducer,
  clientReducer,
  clientRegisterReducer,
  clientSignInReducer,
  clientUpdateReducer,
} from './client/clientReducer';
import { vaccineReducer } from './vaccine/vaccineReducer';
import { authReducer } from './auth/authReducer';
import { healthFacilityReducer } from './healthFacility/healthFacilityReducer';
import {
  appointmentReducer,
  appointmentListingReducer,
  appointmentUpdateReducer,
} from './appointment/appointmentReducer';

const rootReducer = combineReducers({
  clientListReducer,
  clientRegisterReducer,
  vaccineReducer,
  clientSignInReducer,
  clientLogoutReducer,
  authReducer,
  clientReducer,
  clientAuthReducer,
  clientUpdateReducer,
  healthFacilityReducer,
  appointmentReducer,
  appointmentListingReducer,
  appointmentUpdateReducer,
});

const middleware = [thunk];

export default configureStore(
  {
    reducer: rootReducer,
  },
  applyMiddleware(...middleware)
);
