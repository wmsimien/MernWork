import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import { ShowProduct } from '../../../state/Product/productAction';

function ProductDetails() {
  const { id } = useParams();

  let product = useSelector((store) => store.productReducer.product);

  let dispatchToDB = useDispatch();

  let showProduct = () => {
    dispatchToDB(ShowProduct(id));
  };

  useEffect(() => {
    if (id && id !== '') showProduct();
  }, [id]);

  return (
    <>
      <CardGroup key={product._id}>
        <Card className="h-100" style={{ marginBottom: '10px' }}>
          <div key={product._id} className="text-center">
            <Card.Img
              variant="top"
              src={`/images/${product.image}`}
              style={{ width: '100px', height: '130px' }}
            />
          </div>
          <Card.Body>
            <Card.Title>{product.name}</Card.Title>
            <Card.Text>
              {product.desc} <br /> ${product.price}
            </Card.Text>
          </Card.Body>
          <Card.Footer style={{ background: 'white' }}></Card.Footer>
        </Card>
      </CardGroup>
    </>
  );
}

export default ProductDetails;
