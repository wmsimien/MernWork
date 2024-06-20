/*
// Upon MakePayment Click
// Save the cart to RecentOrders collection (should have userid, order, dateTime)

// Make API to Save and Fetch from RecentOrders

// Make a component RecentOrders to Show all previous Orders of current user

// Add a button to Cancel (like) we have remove in CartComponent and then save again, 

// order can be cancelled within 2 days after that it should be marked delivered

////////////////////////Reorder Page
// Reorder
// User to reorder from recent orders or from cancelled orders
// A Simple process just add the order to your cart and replace or merge whatever is present in cart

// 12-06-2024 - Review Page
// This should get its reviews from recent orders page
// User should be allowed to give ratings and his comments to each products

// Upon successful submission each product should have a link to show its review 

// When user expands product detail we should also see the button to which will take us to its review
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone

*/

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';

import {
  listOrders,
  setOrderStatus,
} from '../../../state/RecentOrders/RecentOrderActions';

import { ViewUserShoppingCart } from '../../../state/Cart/cartAction';

const RecentOrders = () => {
  // const loginUser = useSelector((store) => store.userLoginReducer.userInfo);

  const user = useSelector((store) => store.userLoginReducer.userInfo);
  const loginUser = user && user.existingUser ? user?.existingUser : '';

  const listRecentOrders = useSelector(
    (store) => store.recentOrdersListReducer.recentOrders
  );

  const dispatch = useDispatch();

  const listUserOrders = () => {
    dispatch(listOrders());
  };

  let showCart = () => {
    dispatch(ViewUserShoppingCart(loginUser));
  };

  const handleAction = (order) => {
    let orderDate = order.createdAt.substring(0, 10);
    let currDay = new Date();

    let timeDff = currDay.getTime() - Date.parse(orderDate);
    let diffDays = Math.round(timeDff / (1000 * 3600 * 24));

    if (diffDays <= 2 && order.status == 'inprocess') {
      let ans = prompt('Cancel Order? Yes/No');
      if (ans === null || ans == '') return;

      if (ans.toLocaleLowerCase() == 'yes' || ans.toLocaleLowerCase() == 'y') {
        dispatch(setOrderStatus(order, 'cancelled'));
        dispatch(listOrders());
      }
    } else if (order.status == 'cancelled' || order.status == 'delivered') {
      alert('Please reorder.');
    } else {
      alert('You order has been delivered.');
    }
  };

  useEffect(() => {
    listUserOrders();

    showCart();
  }, []);

  return (
    <>
      {loginUser?.userName}'s Orders
      <Table striped>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Order #</th>
            <th style={{ textAlign: 'center' }}>Order Date</th>
            <th style={{ textAlign: 'center' }}>Order Details</th>
            <th style={{ textAlign: 'center' }}>Order Status</th>
            <th style={{ textAlign: 'center' }} colSpan={3}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {listRecentOrders?.map((o, i) => (
            <tr key={i}>
              <td>{o._id}</td>
              <td>{o.createdAt.substring(0, 10)}</td>
              <td>
                {o.items.map((i, n) => (
                  <div key={n} style={{ textAlign: 'center' }}>
                    Item: {i.name} - {i.desc} <br /> Price: ${i.price} Qty:{' '}
                    {i.qty} <br />
                  </div>
                ))}
              </td>
              <td>{o.status}</td>
              <td>
                <Button variant="danger" onClick={() => handleAction(o)}>
                  Take Action
                </Button>
              </td>
              <td>
                <Button variant="info">
                  <Link to={`/reorder/${o._id}`}>Re-Oder</Link>
                </Button>
              </td>
              {o.status == 'delivered' && (
                <td>
                  <Button variant="info">
                    <Link to={`/review/${o._id}`}>Review</Link>
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
};

export default RecentOrders;
