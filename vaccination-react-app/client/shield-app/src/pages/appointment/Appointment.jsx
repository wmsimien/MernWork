import { useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

import './appointment.css';

const Appointment = () => {
  const [search, setSearch] = useState('');

  const handleSearch = () => {};
  return (
    <>
      <div className="vaccine-container">
        <h1>Make Appointment</h1>
        <Form onSubmit={handleSearch}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Enter Zip Code</Form.Label>
              <Form.Control
                type="text"
                required={true}
                pattern="^.*[a-zA-Z0-9]+.*$"
                placeholder="enter your or health facility zip code "
                onChange={(e) => setSearch(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button variant="primary" type="submit">
            Search
          </Button>
        </Form>
        <Toaster richColors />
      </div>
    </>
  );
};

export default Appointment;
