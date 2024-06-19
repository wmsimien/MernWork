import React, { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import { useSelector, useDispatch } from 'react-redux';
import { GetAllProducts as listProducts } from '../../../state/Product/productAction';
import {
  SaveCartToDB,
  ViewUserShoppingCart,
} from '../../../state/Cart/cartAction';
import { Link } from 'react-router-dom';

function Products() {
  const products = useSelector((store) => store.productReducer.product);

  let userLogin = useSelector((store) => store.userLoginReducer.userInfo);

  let cart = useSelector((store) => store.cartReducer.cart);
  console.log('cart: ', cart);
  let dispatchToDB = useDispatch();

  let addToCart = (product) => {
    let shoppingCart = {
      user: userLogin,
      cart: product,
    };
    console.log('add product to shoppingCart: ', shoppingCart);
    dispatchToDB(SaveCartToDB(shoppingCart));
    // setTimeout(() => {
    //   dispatchToDB(ViewUserShoppingCart(userLogin));
    // }, 1000);
    // dispatchToDB(ViewUserShoppingCart(userLogin));
    // dispatchToDB(listProducts());
  };

  let updateIcon = () => {
    dispatchToDB(ViewUserShoppingCart(userLogin));
  };

  useEffect(() => {
    dispatchToDB(listProducts());
  }, [dispatchToDB]);

  return (
    <>
      <CardGroup key={Object.values(products).length}>
        {products?.length === 0 ? (
          <div>...Loading</div>
        ) : (
          products?.map((product) => (
            <div key={product._id} className="row">
              <Card
                key={product._id}
                className="card h-100 p-3"
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
                      {product.desc.substring(0, 10)} <br /> ${product.price}
                    </Card.Text>
                  </Card.Body>
                </Link>
                <Card.Footer style={{ background: 'white' }}>
                  <Button variant="primary" onClick={() => addToCart(product)}>
                    Add To Cart
                  </Button>
                  {/* <Button variant="primary" onClick={() => updateIcon()}>
                    update icon
                  </Button> */}
                  {userLogin?.userName === 'admin' && (
                    <Button variant="warning">
                      <Link to={`/editProduct/${product._id}`}>
                        Edit Product
                      </Link>
                    </Button>
                  )}
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
