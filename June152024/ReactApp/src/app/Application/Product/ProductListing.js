import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Products from './Products';
import { ViewUserShoppingCart } from '../../../state/Cart/cartAction';

function ProductListing() {
  const user = useSelector((store) => store.userLoginReducer.userInfo);
  const userLogin = user && user.existingUser ? user?.existingUser : '';

  const cart = useSelector((store) => store.cartReducer.cart);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(ViewUserShoppingCart(userLogin));
  }, [dispatch]);

  return (
    <div>
      <Container>
        {userLogin?.userName === 'admin2' && (
          <Button variant="warning" size="sm">
            <Link to="/addProduct">Add Product</Link>
          </Button>
        )}
        {cart.length > 0 && cart[0]?.products.length > 0 && (
          <Button variant="info" size="sm">
            <Link to="/viewCart">View Cart</Link>
          </Button>
        )}
      </Container>

      <h1>Products</h1>

      <Products />
    </div>
  );
}

export default ProductListing;
