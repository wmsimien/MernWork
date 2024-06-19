// 07-02-2024 - Reorder Page
// Reorder
// User to reorder from recent orders or from cancelled orders
// A Simple process just add the order to your cart and replace or merge whatever is present in cart
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Table from 'react-bootstrap/Table';

import { reorderAction } from '../../../state/Reorder/ReorderActions';

const Reorder = () => {
  const { id } = useParams();
  console.log('order id: ', id);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reorderAction(id));
    navigate('/product');
  }, [dispatch]);

  return (
    <>
      <h2> ReOrder Page</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Line #</th>
            <th>Item</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <td>3</td>
            <td colSpan={2}>Larry the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default Reorder;
