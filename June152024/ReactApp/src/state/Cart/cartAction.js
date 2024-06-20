import * as actionTypes from '../actionTypes';
import axios from 'axios';
import { useSelector } from 'react-redux';

export const AddToCart = (cart) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: cart,
  };
};

export const RemoveCartItem = (id) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: id,
  };
};

export const RemoveFromCart = (filteredCart) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: filteredCart,
  };
};

export const ShowShoppingCart = (cart) => {
  return {
    type: actionTypes.SHOW_CART,
    payload: cart,
  };
};

export const paymentResetCart = (cart) => {
  return {
    type: actionTypes.RESET_CART,
    payload: cart,
  };
};

// server call
export const addItemToCart = (product, qty) => {
  return (dispatch) => {
    axios
      .get(`http://localhost:9000/cart/api/cart/item/${id}`)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        dispatch(AddToCart(cartData));
      })
      .catch((e) => {
        console.log('Error while fetching all items in cart.', e);
      });
  };
};

export const RemoveItemFromCart = (id) => {
  let cart = useSelector((store) => store.cartReducer.cart);
  return (dispatch) => {
    axios
      .post('http://localhost:9000/cart/api/updateCart', cart)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        // console.log('cartData: ', cartData);
        dispatch(RemoveCartItem(id));

        // update local storeage
        // localStorage.setItem('cart', JSON.stringify(cart.cart));
      })
      .catch((err) => {
        console.log('Error occurred while saving updated cart.');
      });
  };
};

export const SaveCartToDB = (cart) => {
  console.log('SaveCartToDB - cart: ', cart);
  return (dispatch) => {
    axios
      .post('http://localhost:9000/cart/api/createCart', cart)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        dispatch(AddToCart(cart));
        dispatch(ViewUserShoppingCart(cart.user));
      })
      .catch((err) => {
        console.log('Error occurred while saving new shopping cart.', err);
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

export const ViewUserShoppingCart = (user) => {
  console.log('user in cart action: ', user);
  return (dispatch) => {
    axios
      .post(`http://localhost:9000/cart/api/userCart`, user)
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

export const RemovedFromCart = (cart) => {
  console.log('item removed from cart: ', cart);
  return (dispatch) => {
    axios
      .post('http://localhost:9000/cart/api/updateCart', cart)
      .then((cartCollection) => {
        // let data = cartCollection.data;
        dispatch(RemoveFromCart(cart));
        // console.log('item removed from cart: ', cart.user);
        dispatch(ViewUserShoppingCart(cart.user));
      })
      .catch((error) => {
        console.log('Error occurred while saving updated cart.', error);
      });
  };
};

export const ResetCart = (id) => {
  return (dispatch) => {
    axios
      .post(`http://localhost:9000/cart/api/cart/${id}/reset`)
      .then((cartCollection) => {
        let cartData = cartCollection.data;
        dispatch(paymentResetCart(cartData));
      })
      .catch((err) => {
        console.log('Error occurred while setting status of cart to closed.');
      });
  };
};
