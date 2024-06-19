import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Form from 'react-bootstrap/Form';
// import InputGroup from 'react-bootstrap/InputGroup';

import ProductToast from './Toast/ProductToast';

import {
  ShowProductToUpdate,
  updateProductAction,
} from '../../../state/Product/productAction';

const EditProduct = () => {
  const { id } = useParams();

  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const product = useSelector((store) => store.productUpdateReducer.product);

  const dispatch = useDispatch();

  const toastRef = useRef();

  let getProductToUpdate = async () => {
    const product = await ShowProductToUpdate(id);

    setName(product.data.name);
    setDesc(product.data.desc);
    setPrice(product.data.price);
    setImage(product.data.image);
    setCategory(product.data.category);
  };

  useEffect(() => {
    if (id && id !== '') {
      getProductToUpdate();
    }
  }, [id]);

  const handleClick = () => {
    toastRef.current.showToast();
  };
  const updateHandler = (e) => {
    e.preventDefault();

    dispatch(updateProductAction(id, name, desc, price, image, category));
    // show toast
    handleClick();
  };
  return (
    <Card>
      <ProductToast msg={`${name} was updated successfully.`} ref={toastRef} />
      <Card.Header>Edit Product</Card.Header>
      <Card.Body>
        <Form onSubmit={updateHandler}>
          <Form.Group controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={50}
            />
          </Form.Group>

          <Form.Group controlId="desc">
            <Form.Label>Description</Form.Label>
            <Form.Control
              value={desc}
              maxLength={80}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="category">
            <Form.Label>Category</Form.Label>
            <Form.Control
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="image">
            <Form.Label>Image</Form.Label>
            <Form.Control
              value={image}
              onChange={(e) => setImage(e.target.value)}
              maxLength={60}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Update Product
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default EditProduct;
