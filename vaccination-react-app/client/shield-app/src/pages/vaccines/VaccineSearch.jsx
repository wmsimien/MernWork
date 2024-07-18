import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Button, Col, Form, Row } from 'react-bootstrap';

import { searchVaccine } from '../../state/vaccine/vaccineActions';
//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';
import './vaccines.css';

const Vaccines = () => {
  const { token } = useSelector((state) => state.authReducer);

  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  let vaccine = {};

  // get search vaccine
  const getVaccine = async () => {
    vaccine = await searchVaccine(name, type, token);

    if (vaccine) {
      navigate('/vaccineUpdate', { state: vaccine });
    } else {
      return toast.error('Vaccine name and type not found.', {
        position: 'top-center',
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (name === '' || type === '') {
      return toast.error('Vaccine name and type must be entered to search.', {
        position: 'top-center',
      });
    }
    getVaccine();
  };

  return (
    <>
      <div className="vaccine-container">
        <h1>Search A Vaccine</h1>
        <Form onSubmit={handleSearch}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                required={true}
                pattern="^.*[a-zA-Z0-9]+.*$"
                placeholder="enter vaccine name"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group as={Col} controlId="type">
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                pattern="^.*[a-zA-Z0-9]+.*$"
                required={true}
                placeholder="shot/mist/vaccine"
                onChange={(e) => setType(e.target.value)}
              />
            </Form.Group>
          </Row>

          <Button className="search-btn" variant="primary" type="submit">
            Search
          </Button>
        </Form>
        <Toaster richColors />
      </div>
    </>
  );
};

export default Vaccines;
