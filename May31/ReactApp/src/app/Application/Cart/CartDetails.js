import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ViewShoppingCart } from '../../../state/Cart/cartAction';

function CartDetails() {
  let cart = useSelector((store) => store.cartReducer.cart);

  let dispatchToDB = useDispatch();

  let showCart = () => {
    dispatchToDB(ViewShoppingCart());
  };

  useEffect(() => {
    showCart();
  }, []);

  return (
    <>
      <p>IDs of Items in cart: </p>
      {Object.values(cart) &&
        Object.values(cart).map((item) =>
          item.cart
            ? item.cart.map((c, i) => (
                <div key={i}>
                  {i + 1}: {c}
                </div>
              ))
            : 'No items in shopping cart.'
        )}
    </>
  );
}

export default CartDetails;
