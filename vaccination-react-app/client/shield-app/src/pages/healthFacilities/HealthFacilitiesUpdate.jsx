import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

import './healthFacilities.css';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

import { updateHealthFacility } from '../../state/healthFacility/healthFacilityActions';

const HealthFacilities = () => {
  const location = useLocation();
  const searchedHealthFacility = location.state;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [address, setAddress] = useState('');
  const [charges, setCharges] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [active, setActive] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let updated = {
      id: searchedHealthFacility._id,
      name,
      type,
      charges,
      address,
      zipCode,
      active,
    };

    dispatch(updateHealthFacility(updated));

    navigate('/healthFacilitiesSearch');

    return toast.success('Vaccine has been saved.', {
      position: 'top-center',
    });
  };

  useEffect(() => {
    setName(searchedHealthFacility.name);
    setType(searchedHealthFacility.type);
    setCharges(searchedHealthFacility.charges);
    setAddress(searchedHealthFacility.address);
    setZipCode(searchedHealthFacility.zipCode);
    setActive(searchedHealthFacility.active);
  }, [searchedHealthFacility]);

  return (
    <div className="health">
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Health Facility Name</Form.Label>
            <Form.Control
              type="text"
              required={true}
              pattern="^.*[a-zA-Z0-9]+.*$"
              placeholder="enter facility name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="address">
            <Form.Label>Health Facility Address</Form.Label>
            <Form.Control
              type="text"
              pattern="^.*[a-zA-Z0-9]+.*$"
              required={true}
              value={address}
              placeholder="enter address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="zipCode">
            <Form.Label>Health Facility Zip Code</Form.Label>
            <Form.Control
              type="text"
              pattern="^.*[0-9]+.*$"
              required={true}
              value={zipCode}
              placeholder="enter zip code"
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Form.Group>
          <Form.Group as={Col} controlId="type">
            <Form.Label>Health Facility Type</Form.Label>
            <Form.Control
              type="text"
              pattern="^.*[a-zA-Z0-9]+.*$"
              required={true}
              value={type}
              placeholder="Private/Gov't"
              onChange={(e) => setType(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group as={Col} controlId="charges">
            <Form.Label>Health Facility Charges</Form.Label>
            <Form.Control
              type="text"
              pattern="^.*[a-zA-Z0-9]+.*$"
              value={charges}
              placeholder="enter zip code"
              onChange={(e) => setCharges(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" id="active">
            <Form.Check
              type="checkbox"
              value={active}
              checked={active === true}
              onChange={(e) => setActive(e.target.value)}
              label="Active"
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Update
        </Button>
        <Toaster richColors />
      </Form>
    </div>
  );
};

export default HealthFacilities;
