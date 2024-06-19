import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { logout } from '../../../state/User/userAction';
import { ViewUserShoppingCart } from '../../../state/Cart/cartAction';

function UserLogout() {
  let userLogin = useSelector((store) => store.userLoginReducer.userInfo);
  console.log('user:', userLogin);

  let cart = useSelector((store) => store.cartReducer.cart);
  console.log('cart: ', cart[0]?.products.length);

  const dispatch = useDispatch();

  let showCart = () => {
    dispatch(ViewUserShoppingCart(userLogin));
  };

  const navigate = useNavigate();

  const userLogout = () => {
    dispatch(logout());
    setTimeout(() => {
      navigate('/');
    }, [1000]);
  };

  useEffect(() => {
    userLogout();
  }, []);

  return (
    <div>
      <h2>You have been logged out...</h2>
    </div>
  );
}

export default UserLogout;
