import * as actionTypes from '../actionTypes';

export const checkoutPaymentReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.CHECKOUT_PAYMENT_REQUEST:
      return {
        loading: true,
      };
    case actionTypes.CHECKOUT_PAYMENT_SUCCESS:
      console.log(
        'checkout payment success in checkout payment reducer: ',
        action.payload
      );
      return {
        loading: false,
        success: true,
        checkoutPayment: action.payload,
      };
    case actionTypes.CHECKOUT_PAYMENT_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};
