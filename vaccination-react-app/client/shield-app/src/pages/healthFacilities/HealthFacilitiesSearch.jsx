import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

import './healthFacilities.css';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

import { searchHealthFacility } from '../../state/healthFacility/healthFacilityActions';

const HealthFacilities = () => {
  const { token } = useSelector((state) => state.authReducer);

  const [name, setName] = useState('');
  const [type, setType] = useState('');

  const navigate = useNavigate();

  let healthFacility = {};
  // search health facility
  const getHealthFacility = async () => {
    healthFacility = await searchHealthFacility(name, type, token);

    if (healthFacility) {
      navigate('/healthFacilitiesUpdate', { state: healthFacility });
    } else {
      return toast.error('Health facility name and type not found.', {
        position: 'top-center',
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (name === '' || type === '') {
      return toast.error(
        'Health facility name and type must be entered to search.',
        {
          position: 'top-center',
        }
      );
    }
    getHealthFacility();
  };

  return (
    <div className="health-container">
      <h1>Search A Health Facility</h1>
      <Form onSubmit={handleSearch}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Health Facility Name</Form.Label>
            <Form.Control
              type="text"
              required={true}
              pattern="^.*[a-zA-Z0-9]+.*$"
              placeholder="Enter name"
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="type">
            <Form.Label>Health Facility Type</Form.Label>
            <Form.Control
              type="text"
              pattern="^.*[a-zA-Z0-9]+.*$"
              required={true}
              placeholder="Private/Gov't"
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Button variant="primary" type="submit">
          Search
        </Button>
      </Form>
      <Toaster richColors />
    </div>
  );
};

export default HealthFacilities;
