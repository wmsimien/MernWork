import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useSelector, useDispatch } from 'react-redux';
import { ShowAllProducts } from '../../../state/Product/productAction';
import { SaveCartToDB } from '../../../state/Cart/cartAction';
import { Link } from 'react-router-dom';

function Products() {
  const products = useSelector((store) => store.productReducer.product);
  const loginUser = useSelector((store) => store.userReducer.user);
  let dispatchToDB = useDispatch();

  let showProducts = () => {
    dispatchToDB(ShowAllProducts());
  };

  let addToCart = (product) => {
    let shoppingCart = {
      user: loginUser,
      cart: product,
    };
    dispatchToDB(SaveCartToDB(shoppingCart));
  };

  useEffect(() => {
    showProducts();
  }, []);

  return (
    <>
      <CardGroup key={Object.values(products).length}>
        {Object.values(products).length === 0 ? (
          <div>...Loading</div>
        ) : (
          Object.values(products).map((product) => (
            <div key={product._id} className="row">
              <Card
                key={product._id}
                className="h-100 p-3"
                style={{ marginBottom: '10px' }}
              >
                <Link to={`/product/${product._id}`}>
                  <div className="text-center" key={product._id}>
                    <Card.Img
                      key={product._id}
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
                </Link>
                <Card.Footer style={{ background: 'white' }}>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add To Cart
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          ))
        )}
      </CardGroup>
    </>
  );
}

export default Products;
