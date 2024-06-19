/*
    Coupon Page 
Create a component with Name - CouponComponent (Functional Component and Use Hooks)
On the page add a Button - GenerateCoupon
Upon Click Generate a random coupon of - 6 digits (basically a numeric random value)

Dispatch this generated coupon using useDispatch

Create a Coupon Reducer to have Coupon Value, Use Reducer to update the coupon value (useSelector coupon)
Create action to pass coupon to reducer, with type and payload
*/

import {
  COUPON_REQUEST,
  COUPON_SUCCESS,
  COUPON_FAIL,
  RESET_COUPON,
} from '../actionTypes';
// import axios from 'axios';

let couponNumber = '';
let couponValue = 0.0;

const generateCoupon = () => {
  const min = 100000;
  const max = 999999;

  couponNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  if (couponNumber > 0) {
    couponValue = calculateValue(couponNumber);
  }
};

const calculateValue = (val) => {
  return Math.trunc((val / 100000) % 100000) / 100;
};

export const createCouponAction = () => (dispatch, getState) => {
  try {
    dispatch({ type: COUPON_REQUEST });
    // generate coupon
    generateCoupon();
    let data = {
      cpnNumber: couponNumber,
      val: couponValue,
    };
    dispatch({
      type: COUPON_SUCCESS,
      payload: data, // what comes back from db
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: COUPON_FAIL,
      payload: message,
    });
  }
};

export const couponReset = () => (dispatch, getState) => {
  try {
    dispatch({
      type: RESET_COUPON,
    });
  } catch (error) {
    console.log(error.message);
  }
};
