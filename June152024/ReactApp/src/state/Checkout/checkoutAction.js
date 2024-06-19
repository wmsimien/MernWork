import * as actionTypes from '../actionTypes';
import axios from 'axios';

import {
  CHECKOUT_PAYMENT_REQUEST,
  CHECKOUT_PAYMENT_SUCCESS,
  CHECKOUT_PAYMENT_FAIL,
} from '../actionTypes';

// export const createOrderFromPayment = () => async (dispatch, getState) => {
//   console.log('checkout payment action...');
//   try {
//     dispatch({ type: CHECKOUT_PAYMENT_REQUEST });

//     const {
//       userLoginReducer: { userLogin },
//     } = getState();

//     const config = {
//       headers: {
//         Authorization: userLogin,
//       },
//     };

//     // server call
//     const { data } = await axios.post(
//       'http://localhost:9000/recentOrders/api/recentOrders',
//       config
//     );
//     console.log('data in coupon action: ', data);
//     dispatch({
//       type: COUPON_SUCCESS,
//       payload: data, // what comes back from db
//     });
//   } catch (error) {
//     const message =
//       error.response && error.response.data.message
//         ? error.response.data.message
//         : error.message;
//     dispatch({
//       type: COUPON_FAIL,
//       payload: message,
//     });
//   }
// };
