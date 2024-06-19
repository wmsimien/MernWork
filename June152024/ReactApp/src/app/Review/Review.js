/////////////////////////////////////////////////
// 12-06-2024 - Review Page
// This should get its reviews from recent orders page
// User should be allowed to give ratings and his comments to each products

// Upon successful submission each product should have a link to show its review

// When user expands product detail we should also see the button to which will take us to its review
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from 'axios';

import Accordion from 'react-bootstrap/Accordion';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Review = () => {
  const { id } = useParams();
  console.log('order id: ', id);

  const loginUser = useSelector((store) => store.userLoginReducer.userInfo);

  const [items, setItems] = useState([]);
  const [comments, setComment] = useState('');
  const [rating, setRating] = useState(1);

  //   const orderToReview = useSelector(
  //     (store) => store.recentOrdersListReducer.recentOrders
  //   );
  console.log('orderToReview', id);
  //   const dispatch = useDispatch();

  const getOrder = async () => {
    // dispatch(listOrder());
    try {
      // server call
      const { data } = await axios.get(
        `http://localhost:9000/reviewOrderItem/api/${id}`
      );
      // console.log('order data: ', data);
      setItems([...data[0]?.items]);
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  // console.log('items: ', items);

  const handleAddReview = async (item) => {
    // console.log('item review: ', item);
    // console.log('item review comments: ', comments);
    // console.log('item review rating: ', rating);
    // console.log('item review made by: ', loginUser);

    const review = {
      user: loginUser,
      order: id,
      item,
      comment: comments,
      rating,
    };
    // console.log('reviewObj: ', review);
    try {
      // server call
      const { data } = await axios.post(
        `http://localhost:9000/reviewOrderItem/api/createItemReview`,
        review
      );
      // console.log('order data: ', data);
      alert('Review saved.');
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Review Items Order </h2>
      <Accordion>
        {items &&
          items.map((item) => (
            <Accordion.Item key={item._id} eventKey={`${item._id}`}>
              <Accordion.Header>{item.desc}</Accordion.Header>
              <Accordion.Body>
                <Row className="g-2">
                  <Col md>
                    <FloatingLabel
                      // controlId="floatingInputGrid"
                      label="Comments"
                    >
                      <Form.Control
                        as="textarea"
                        placeholder="Leave a review here"
                        style={{ height: '100px' }}
                        onChange={(e) => setComment(e.target.value)}
                      />
                    </FloatingLabel>
                  </Col>
                  <Col xs="auto">
                    <FloatingLabel
                      // controlId="floatingSelectGrid"
                      label="Rating"
                    >
                      <Form.Select
                        aria-label="Rating"
                        style={{ weight: '40px' }}
                        onChange={(e) => setRating(e.target.value)}
                      >
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                        <option value="4">Four</option>
                        <option value="5">Five</option>
                      </Form.Select>
                    </FloatingLabel>
                  </Col>
                  <Button
                    variant="outline-primary"
                    onClick={() => handleAddReview(item)}
                  >
                    Add Review
                  </Button>
                </Row>
              </Accordion.Body>
            </Accordion.Item>
          ))}
      </Accordion>
    </>
  );
};

export default Review;
