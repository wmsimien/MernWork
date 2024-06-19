import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {
  RemovedFromCart,
  ViewUserShoppingCart,
} from '../../../state/Cart/cartAction';

function CartDetails() {
  let cart = useSelector((store) => store.cartReducer.cart);
  const loginUser = useSelector((store) => store.userLoginReducer.userInfo);
  let dispatchToDB = useDispatch();

  let showCart = () => {
    dispatchToDB(ViewUserShoppingCart(loginUser));
  };

  let removeItem = (item) => {
    let filetedShoppedItems = shoppedItems.filter((p) => p._id != item._id);

    let updatedShoppingCard = {
      user: loginUser,
      cart: filetedShoppedItems,
    };

    dispatchToDB(RemovedFromCart(updatedShoppingCard));
    // dispatchToDB(ViewUserShoppingCart(loginUser));
  };

  useEffect(() => {
    showCart();
  }, [dispatchToDB]);

  let shoppedItems = [];
  let cartTotal = 0;

  if (cart) {
    for (let i = 0; i < cart?.length; i++) {
      for (let j = 0; j < cart[i].products?.length; j++) {
        shoppedItems.push(cart[i].products[j]);
      }
    }
    cartTotal = shoppedItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }

  return (
    <>
      <div className="cartscreen">
        <div className="cartscreen__left">
          <h4>
            Items in
            <i className="fas fa-shopping-cart"></i>:{' '}
            <span className="cartlog__badge">{shoppedItems.length}</span>
          </h4>
          <div className="cartitem">
            {cart &&
              shoppedItems.map((item, i) => (
                <Container key={i} fluid="md">
                  <Row>
                    <Col>
                      {i + 1}. {item.name} {item.desc} - ${item.price}{' '}
                      <i className="fas fa-times"></i>
                      {item.qty} = ${item.price * item.qty}
                      <Button
                        variant="light"
                        value={item._id}
                        onClick={() => removeItem(item)}
                      >
                        {' '}
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </Container>
              ))}
          </div>
        </div>
        <div className="cartscreen__right">
          <div className="cartscreen__info">
            <p>Subtotal ({shoppedItems.length}) items</p>
            <p> ${cartTotal}</p>
          </div>
          <div>
            {shoppedItems.length > 0 && (
              <button>
                <Link to={`/checkout`}>Go To Checkout</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CartDetails;
