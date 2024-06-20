import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';

import { useSelector } from 'react-redux';

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import { FaShoppingCart } from 'react-icons/fa';
import { MdPayment } from 'react-icons/md';
import { IoMdNotifications } from 'react-icons/io';

import './HeaderComponent.css';

let Header = (props) => {
  let user = useSelector((store) => store.userLoginReducer.userInfo);
  const userName =
    user && user.existingUser ? user?.existingUser.userName : props.userName;

  let cart = useSelector((store) => store.cartReducer.cart);
  const listRecentOrders = useSelector(
    (store) => store.recentOrdersListReducer.recentOrders
  );

  const [open, setOpen] = useState(false);
  const [read, setRead] = useState(false);

  const handleRead = () => {
    setOpen(!open);
    setRead(true);
  };
  // console.log('cart - header component: ', cart);
  return (
    <>
      <h3 className="header">
        {userName
          ? `Hello, ${userName}, Welcome to Shopping Cart sponsored by SimTechs.`
          : `Welcome to Shopping Cart sponsored by SimTechs.`}
      </h3>
      <div className="navLinks">
        <NavLink to="/home" className="button" activeclassname="true">
          Home
        </NavLink>
        {!userName && (
          <NavLink to="/userLogin" className="button" activeclassname="true">
            Login
          </NavLink>
        )}
        <NavLink to="/about" className="button" activeclassname="true">
          About
        </NavLink>
        {userName && (
          <NavLink to="/product" className="button" activeclassname="true">
            Product
          </NavLink>
        )}

        {userName && (
          <NavLink to="/recentOrders" className="button" activeclassname="true">
            Recent Orders
          </NavLink>
        )}
        {userName && (
          <NavLink to="/userLogout" className="button" activeclassname="true">
            Logout
          </NavLink>
        )}
      </div>

      <div className="icon-container">
        {/* <Stack direction="horizontal" gap={3}> */}
        {/* {user?.userName && user?.password && cart[0]?.products.length > 0 && ( */}
        {userName && (
          <Link className="icon" to="/viewCart">
            <div className="iconImg">
              <FaShoppingCart fontSize="30px" />
            </div>
            {cart.length > 0 && cart[0]?.products.length > 0 && (
              <div>
                <Badge className="badge" pill bg="warning" text="dark">
                  {cart && cart[0]?.products.length}
                </Badge>
              </div>
            )}
          </Link>
        )}
        {/* cart[0]?.products.length > 0 && */}
        {userName && (
          <Link className="icon" to="/checkout">
            <div className="iconImg">
              <MdPayment fontSize="30px" />
            </div>
            <div>
              {cart.length > 0 && cart[0]?.products.length > 0 && (
                <Badge className="badge" pill bg="info" text="white">
                  {cart && cart.length}
                </Badge>
              )}
            </div>
          </Link>
        )}
        {/* listRecentOrders?.length > 0 &&  */}
        {userName && (
          <>
            <div className="icon iconImg" onClick={() => setOpen(!open)}>
              <IoMdNotifications fontSize="30px" />
            </div>
            <div>
              {listRecentOrders?.length > 0 && read == false && (
                <Badge
                  className="badge"
                  pill
                  bg="danger"
                  text="white"
                  style={{
                    position: 'relative',
                    top: '5px',
                    right: '53px',
                  }}
                  onClick={() => setOpen(!open)}
                >
                  {' '}
                  {listRecentOrders?.length}
                </Badge>
              )}
            </div>
          </>
        )}
        {/* </Stack> */}
      </div>
      {open && (
        <div className="notices">
          {listRecentOrders?.map((order, i) => {
            return (
              <span key={i} className="notice">
                Your order on {order.createdAt.substring(0, 10)} with order
                number ending with the last four-digits{' '}
                <b>{order._id.substring(order._id.length - 4)}</b> has been{' '}
                <em>{order.status}</em>.<hr></hr>
              </span>
            );
          })}
          <button className="noticeBtn" onClick={handleRead}>
            Mark As Read
          </button>
        </div>
      )}

      <hr />
    </>
  );
};

export default Header;
