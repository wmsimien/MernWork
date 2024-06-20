import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Link } from 'react-router-dom';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { ViewUserShoppingCart } from '../../../state/Cart/cartAction';
import { createOrderFromPayment } from '../../../state/RecentOrders/RecentOrderActions';
import UserDetailsView from '../User/UserDetailsView';
import Coupon from '../Coupon/Coupon';

const CheckoutView = () => {
  let cart = useSelector((store) => store.cartReducer.cart);
  // const loginUser = useSelector((store) => store.userLoginReducer.userInfo);

  const user = useSelector((store) => store.userLoginReducer.userInfo);
  const loginUser = user && user.existingUser ? user?.existingUser : '';

  // console.log('userLogin:', loginUser);

  let dispatchToDB = useDispatch();

  const [isShowMsg, setIsShowMsg] = useState(true);

  let showCart = () => {
    dispatchToDB(ViewUserShoppingCart(loginUser));
  };

  useEffect(() => {
    showCart();
  }, [dispatchToDB]);

  let shoppedItems = [];
  let cartTotal = 0;

  if (cart) {
    for (let i = 0; i < cart.length; i++) {
      for (let j = 0; j < cart[i].products.length; j++) {
        shoppedItems.push(cart[i].products[j]);
      }
    }
    cartTotal = shoppedItems.reduce(
      (acc, item) => acc + item.price * item.qty,
      0
    );
  }
  /**
 // Second Task :
// Create a state using useState to show hide (Make Payment Message)
// Upon Clicking on MakePayment button, hide everything and just show the message - "Thankyou for the payment, your items under process!"
// Change the header from Checkout Page to Payment Page
 */
  const MakePayment = () => {
    // console.log('make payment...', isShowMsg);
    setIsShowMsg(false);
    dispatchToDB(createOrderFromPayment(cart));
    // console.log('afterwards make payment...', isShowMsg);
  };

  return (
    <>
      <h1>{isShowMsg ? 'Checkout' : 'Payment'}</h1>
      {isShowMsg ? (
        <>
          <div className="cartscreen">
            <div className="cartscreen__left">
              <UserDetailsView />
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
                        </Col>
                      </Row>
                    </Container>
                  ))}
              </div>
            </div>
            <Coupon />
            <div className="cartscreen__right">
              <div className="cartscreen__info">
                <p>Subtotal ({shoppedItems.length}) items</p>
                <p> ${cartTotal}</p>
              </div>
              <div>
                <button onClick={MakePayment}>Go To Payment</button>
              </div>
            </div>
          </div>{' '}
        </>
      ) : (
        'Thank you for the payment, your order is being processed!'
      )}
    </>
  );
};

export default CheckoutView;
