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
  const userName = user && user.userName ? user.userName : props.userName;

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

  return (
    <>
      <h3 className="header">
        {userName
          ? `Hello, ${userName}, Welcome to Shopping Cart sponsored by SimTechs.`
          : `Welcome to Shopping Cart sponsored by SimTechs.`}
      </h3>
      <div>
        <NavLink to="/home" className="button" activeclassname="true">
          Home
        </NavLink>
        {!user?.userName && !user?.password && (
          <NavLink to="/userLogin" className="button" activeclassname="true">
            Login
          </NavLink>
        )}
        <NavLink to="/about" className="button" activeclassname="true">
          About
        </NavLink>
        {user?.userName && user?.password && (
          <NavLink to="/product" className="button" activeclassname="true">
            Product
          </NavLink>
        )}

        {user?.userName && user?.password && (
          <NavLink to="/recentOrders" className="button" activeclassname="true">
            Recent Orders
          </NavLink>
        )}
        {user?.userName && user?.password && (
          <NavLink to="/userLogout" className="button" activeclassname="true">
            Logout
          </NavLink>
        )}

        <Stack direction="horizontal" gap={3}>
          {/* {user?.userName && user?.password && cart[0]?.products.length > 0 && ( */}
          {user?.userName && user?.password && (
            <Link className="icon" to="/viewCart">
              <div className="iconImg">
                <FaShoppingCart style={{ marginTop: '15px' }} fontSize="30px" />
              </div>
              {cart.length > 0 && cart[0]?.products.length > 0 && (
                <div>
                  <Badge
                    pill
                    bg="warning"
                    text="dark"
                    style={{
                      position: 'relative',
                      left: '10px',
                      bottom: '20px',
                    }}
                  >
                    {cart && cart[0]?.products.length}
                  </Badge>
                </div>
              )}
            </Link>
          )}
          {/* cart[0]?.products.length > 0 && */}
          {user?.userName && user?.password && (
            <Link className="icon" to="/checkout">
              <div className="iconImg">
                <MdPayment style={{ marginTop: '15px' }} fontSize="30px" />
              </div>
              <div>
                {cart.length > 0 && cart[0]?.products.length > 0 && (
                  <Badge
                    pill
                    bg="info"
                    text="white"
                    style={{
                      position: 'relative',
                      left: '10px',
                      bottom: '20px',
                    }}
                  >
                    {cart && cart.length}
                  </Badge>
                )}
              </div>
            </Link>
          )}
          {/* listRecentOrders?.length > 0 &&  */}
          {user?.userName && user?.password && (
            <>
              <div className="iconImg-notice" onClick={() => setOpen(!open)}>
                <IoMdNotifications fontSize="30px" />
              </div>
              <div>
                {listRecentOrders?.length > 0 && read == false && (
                  <Badge
                    pill
                    bg="danger"
                    text="white"
                    style={{
                      position: 'relative',
                      bottom: '10px',
                      right: '20px',
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
        </Stack>

        {open && (
          <div className="notices">
            {listRecentOrders?.map((order, i) => {
              return (
                <span key={i} className="notice">
                  Your order on {order.createdAt.substring(0, 10)} with order
                  number ending with the last four-digits{' '}
                  <b>{order._id.substring(order._id.length - 4)}</b> has been{' '}
                  <em>{order.status}</em>.<br />
                </span>
              );
            })}
            <button className="noticeBtn" onClick={handleRead}>
              Mark As Read
            </button>
          </div>
        )}
      </div>
      <hr />
    </>
  );
};

export default Header;
