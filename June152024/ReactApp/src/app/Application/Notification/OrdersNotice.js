import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { listOrders } from '../../../state/RecentOrders/RecentOrderActions';

import { ViewUserShoppingCart } from '../../../state/Cart/cartAction';

import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

import './Notice.css';

const OrdersNotice = () => {
  const loginUser = useSelector((store) => store.userLoginReducer.userInfo);
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

  useEffect(() => {
    listUserOrders();

    showCart();
  }, []);
  return (
    <div
      className="container"
      style={{ display: 'flex', flexDirection: 'column', gap: '3' }}
    >
      <h3>Orders</h3>
      {listRecentOrders?.map((o, i) => (
        <card className="parentDiv" key={i}>
          <div>{o.createdAt.substring(0, 10)}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-evenly',
              flexWrap: 'wrap',
            }}
          >
            {o.items.map((i, n) => (
              <div key={n} style={{ textAlign: 'left' }}>
                Item: {i.name} - {i.desc} <br /> Price: ${i.price} Qty: {i.qty}{' '}
                <br />
              </div>
            ))}
            <Stack direction="horizontal" gap={2}>
              <Badge styles={{ color: 'white' }} pill bg="light">
                <Link styles={{ color: 'white' }} to="/viewCart">
                  {o.status}
                </Link>
              </Badge>
            </Stack>
          </div>
        </card>
      ))}
    </div>
  );
};

export default OrdersNotice;
