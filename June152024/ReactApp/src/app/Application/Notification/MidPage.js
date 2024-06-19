import React from 'react';
import OrdersNotice from './OrdersNotice';

const MidPage = () => {
  return (
    <div style={{ background: '#dcdcdc', width: '50%' }}>
      <div
        style={{
          border: '1px solid black',
          borderRadius: '5px',
          width: '100%',
        }}
      >
        <OrdersNotice />
      </div>
    </div>
  );
};

export default MidPage;
