/*
    Coupon Page 
Create a component with Name - CouponComponent (Functional Component and Use Hooks)
On the page add a Button - GenerateCoupon
Upon Click Generate a random coupon of - 6 digits (basically a numeric random value)
Dispatch this generated coupon using useDispatch
Create a Coupon Reducer to have Coupon Value, Use Reducer to update the coupon value (useSelector coupon)
Create action to pass coupon to reducer, with type and payload
*/
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import {
  createCouponAction,
  couponReset,
} from '../../../state/Coupon/CouponAction';

const Coupon = () => {
  let coupon = useSelector((store) => store.couponReducer.coupon);

  const dispatch = useDispatch();

  const generateCoupon = () => {
    dispatch(createCouponAction());
  };

  useEffect(() => {
    dispatch(couponReset());
  }, [dispatch]);

  return (
    <div>
      <div>
        <p>Customer Coupon</p>
      </div>
      <Button variant="outlined-success" onClick={generateCoupon}>
        Generate Coupon
      </Button>
      {coupon?.cpnNumber &&
        `Number: ${coupon?.cpnNumber} & Value: ${coupon?.val}.`}
    </div>
  );
};

export default Coupon;
