import React, { Component, createRef } from 'react';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ProductToast from './Toast/ProductToast';

export default class ProductComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.product.name,
      desc: props.product.desc,
      category: props.product.category,
      price: props.product.price,
      image: props.product.image,
      msg: '',
    };
  }

  toastRef = createRef();

  onTextChange = (e) => {
    e.preventDefault();

    let target = e.target;
    let classList = target.classList;
    let value = target.value;

    if (classList.contains('name')) {
      this.setState({ name: value });
    } else if (classList.contains('desc')) {
      this.setState({ desc: value });
    } else if (classList.contains('price')) {
      this.setState({ price: value });
    } else if (classList.contains('category')) {
      this.setState({ category: value });
    } else {
      this.setState({ image: value });
    }
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    let newProduct = this.state;
    this.props.saveProduct(newProduct);
    this.toastRef.current.showToast();
  };

  render() {
    return (
      <>
        <ProductToast
          msg={`${this.state.name} was created successfully.`}
          ref={this.toastRef}
        />
        <Container>
          <Form>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="name">Name</Form.Label>
                <Form.Control
                  className="mb-2 name"
                  id="name"
                  value={this.state.name}
                  onChange={this.onTextChange}
                  maxLength={50}
                />
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="desc">Description</Form.Label>
                <Form.Control
                  className="mb-2 desc"
                  id="desc"
                  value={this.state.desc}
                  onChange={this.onTextChange}
                  maxLength={80}
                />
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="desc">Category</Form.Label>
                <Form.Control
                  className="mb-2 category"
                  id="category"
                  value={this.state.category}
                  onChange={this.onTextChange}
                  maxLength={80}
                />
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="price">Price</Form.Label>
                <Form.Control
                  className="mb-2 price"
                  id="price"
                  value={this.state.price}
                  onChange={this.onTextChange}
                />
              </Col>
              <Col xs="auto">
                <Form.Label htmlFor="image">Image</Form.Label>
                <Form.Control
                  className="mb-2 image"
                  id="image"
                  type="text"
                  value={this.state.image}
                  onChange={this.onTextChange}
                  maxLength={60}
                />
              </Col>
              <Col xs="auto">
                <Button
                  type="submit"
                  className="mb-2"
                  onClick={this.onFormSubmit}
                >
                  Submit
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </>
    );
  }
}
