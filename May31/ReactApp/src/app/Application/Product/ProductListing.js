import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import Products from './Products';

function ProductListing() {
  return (
    <div>
      <Container>
        <Button variant="warning" size="sm">
          <Link to="/addProduct">Add Product</Link>
        </Button>

        <Button variant="info" size="sm">
          <Link to="/viewCart">View Cart</Link>
        </Button>
      </Container>

      <h1>Products</h1>

      <Products />
    </div>
  );
}

export default ProductListing;
