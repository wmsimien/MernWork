// When user expands product detail we should also see the button to which will take us to its review
// on recent order page we can show a popup to submit rating or a new page its up to you //can use -> react bootstrap
// user should only be able to give rating once cancel button is gone

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';
import Accordion from 'react-bootstrap/Accordion';

import axios from 'axios';

import { ShowProduct } from '../../../state/Product/productAction';

function ProductDetails() {
  const { id } = useParams();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [category, setCategory] = useState('');

  const comment = [];
  let [comments, setComments] = useState([]);
  const commentDate = [];
  let [commentDates, setCommentDates] = useState([]);
  const commentBy = [];
  let [commensBy, setCommentsBy] = useState([]);

  let getProduct = async () => {
    const productData = await ShowProduct(id);
    setName(productData.data?.name);
    setDesc(productData.data?.desc);
    setPrice(productData.data?.price);
    setImage(productData.data?.image);
    setCategory(productData.data?.category);
  };

  const getReviews = async () => {
    try {
      // server call
      const { data } = await axios.get(
        `http://localhost:9000/reviewOrderItem/api/${id}/reviews`
      );

      for (let i = 0; i < data.length; i++) {
        comment.push(data[i].comment);
        commentBy.push(data[i].user.userName);
        commentDate.push(data[i].createdAt.substring(0, 10));
      }

      setComments(comment);
      setCommentDates(commentDate);
      setCommentsBy(commentBy);
    } catch (error) {
      console.log('error: ', error.message);
    }
  };

  useEffect(() => {
    // if (id && id !== '')
    getProduct();

    // reivew(s)
    getReviews();
  }, [id]);

  return (
    <>
      <CardGroup key={id}>
        <Card className="h-100" style={{ marginBottom: '10px' }}>
          <div key={id} className="text-center">
            <Card.Img
              variant="top"
              src={`/images/${image}`}
              style={{ width: '100px', height: '130px' }}
            />
          </div>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {desc} <br /> ${price}
            </Card.Text>
          </Card.Body>
        </Card>
      </CardGroup>
      {/* Items Reviews */}
      {comments.length > 0 && (
        <Accordion>
          <Accordion.Item>
            <Accordion.Header>Review(s)</Accordion.Header>
            <Accordion.Body>
              {comments.length > 0 &&
                comments.map((c, i) => (
                  <Card key={i}>
                    <Card.Header>Reviewed On: {commentDates[i]}</Card.Header>
                    <Card.Body>
                      <blockquote className="blockquote mb-0">
                        <p>{c}</p>
                        <footer className="blockquote-footer">
                          {commensBy[i]}
                        </footer>
                      </blockquote>
                    </Card.Body>
                  </Card>
                ))}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}

export default ProductDetails;
