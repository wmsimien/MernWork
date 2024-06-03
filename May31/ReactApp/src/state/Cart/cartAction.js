import * as actionTypes from '../actionTypes';
import axios from 'axios';

export const AddToCart = (cart) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: cart,
  };
};

export const ShowShoppingCart = (cart) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: cart,
  };
};

// server call
export const SaveCartToDB = (cart) => {
  return (dispatch) => {
    axios
      .post('http://localhost:9000/cart/api/createCart', cart)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        console.log(cartData);
        dispatch(AddToCart(cart));
      })
      .catch((err) => {
        console.log('Error occurred while saving new hobby.');
      });
  };
};

export const ViewShoppingCart = () => {
  return (dispatch) => {
    axios
      .get('http://localhost:9000/cart/api/cart')
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        dispatch(ShowShoppingCart(cartData));
      })
      .catch((e) => {
        console.log('Error while fetching all items in cart.', e);
      });
  };
};

export const ViewShoppingCartItem = (id) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/cart/api/cart/${id}`)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
      })
      .catch((e) => {
        console.log('Error while fetching all items in cart.', e);
      });
  };
};
