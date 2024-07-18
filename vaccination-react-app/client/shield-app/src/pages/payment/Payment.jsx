import React from 'react';
import QRCode from 'react-qr-code';
import Card from 'react-bootstrap/Card';
import './payment.css';

const Payment = () => {
  return (
    <div className="qrcode-container">
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title className="qrcode-heading">Processing Payment</Card.Title>
          <Card.Subtitle
            style={{ fontSize: '14px', textAlign: 'center' }}
            className="mb-2 text-muted"
          >
            Scan for receipt.
          </Card.Subtitle>
          <Card.Text>
            <QRCode
              className="qrCode"
              size={150}
              bgColor="white"
              fgColor="black"
              value="Payment currently being processed."
            />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Payment;
