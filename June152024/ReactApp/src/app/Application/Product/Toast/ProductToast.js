import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from 'react';

import './ProductToast.css';
// useImperativeHandle allows you to extend methods of the child compone
// which then can be called by the parent

const ProductToast = ({ msg }, ref) => {
  const [show, setShow] = useState(false);

  useImperativeHandle(ref, () => ({
    showToast() {
      setShow(true);
      setTimeout(() => {
        setShow(false);
      }, 1500);
    },
  }));

  useEffect(() => {
    const interval = setInterval(() => {}, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return <div className={`toast-container ${show ? 'show' : ''}`}>{msg}.</div>;
};

export default forwardRef(ProductToast);
