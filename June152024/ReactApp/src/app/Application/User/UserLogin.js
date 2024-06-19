import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

import { login } from '../../../state/User/userAction';

import './UserLogin.css';

const UserLogin = () => {
  let userLogin = useSelector((store) => store.userLoginReducer.userInfo);

  let cart = useSelector((store) => store.cartReducer.cart);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();

    if (username === '' || password === '') {
      alert('Please enter user login credentials.');
    } else {
      dispatch(login(username, password));
    }
  };

  return (
    <div className="loginContainer">
      <h1>User Login</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>User Name</Form.Label>
          <Form.Control
            type="text"
            value={username} // controlled input
            onChange={(e) => setUsername(e.target.value)}
            placeholder="User name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={password} // controlled input
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <Row className="py-3">
        <Col>
          New user ? <Link to="/signup">SignUp Here</Link>
        </Col>
      </Row>
    </div>
  );
};

export default UserLogin;
