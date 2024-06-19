import React from 'react';
import { useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';

const UserDetailsView = () => {
  let userLogin = useSelector((store) => store.userLoginReducer.userInfo);
  // console.log('userLogin:', userLogin);
  //   const { userName, street, mobile } = userLogin;

  return (
    <Card style={{ width: '20rem' }}>
      <Card.Header>Customer Information</Card.Header>
      <Card.Body>
        {/* <Card.Subtitle>Address:</Card.Subtitle> */}
        <Card.Text>{userLogin?.userName}</Card.Text>
        <Card.Text>{userLogin?.street}</Card.Text>
        {/* <Card.Subtitle>Mobile:</Card.Subtitle> */}
        <Card.Text>{userLogin?.mobile}</Card.Text>

        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default UserDetailsView;
