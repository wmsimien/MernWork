/*
    Coupon Page 
Create a component with Name - CouponComponent (Functional Component and Use Hooks)
On the page add a Button - GenerateCoupon
Upon Click Generate a random coupon of - 6 digits (basically a numeric random value)

Dispatch this generated coupon using useDispatch

Create a Coupon Reducer to have Coupon Value, Use Reducer to update the coupon value (useSelector coupon)
Create action to pass coupon to reducer, with type and payload
*/

import * as actionTypes from '../actionTypes';

export const couponReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.COUPON_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.COUPON_SUCCESS:
      return {
        loading: false,
        success: true,
        coupon: action.payload,
      };
    case actionTypes.COUPON_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case actionTypes.RESET_COUPON:
      return {
        coupon: {},
      };
    default:
      return state;
  }
};
