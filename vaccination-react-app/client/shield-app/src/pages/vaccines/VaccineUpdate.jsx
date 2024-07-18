import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { Button, Col, Form, Row, FloatingLabel } from 'react-bootstrap';

import { updateVaccine } from '../../state/vaccine/vaccineActions';
//https://sonner.emilkowal.ski/toast
import { Toaster } from 'sonner';
import './vaccines.css';

const Vaccines = () => {
  const location = useLocation();
  const searchedVac = location.state;

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [sideEffect, setSideEffect] = useState('');
  const [origin, setOrigin] = useState('');
  const [doseRequired, setDoseRequired] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [active, setActive] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    let updated = {
      id: searchedVac._id,
      name,
      type,
      price,
      sideEffect,
      origin,
      doseRequired,
      otherInfo,
      startDate,
      endDate,
      active,
    };

    dispatch(updateVaccine(updated));
    navigate('/vaccineSearch');
  };

  useEffect(() => {
    setName(searchedVac.name);
    setType(searchedVac.type);
    setStartDate(searchedVac.startDate.substring(0, 10));
    searchedVac.endDate && setEndDate(searchedVac.endDate.substring(0, 10));
    setSideEffect(searchedVac.sideEffect);
    setOrigin(searchedVac.origin);
    setPrice(searchedVac.price);
    setDoseRequired(searchedVac.doseRequired);
    setActive(searchedVac.active);
    setOtherInfo(searchedVac.otherInfo);
  }, [searchedVac]);

  return (
    <div className="vaccine-container">
      <h1>Vaccine Information</h1>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="name">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              required={true}
              value={name}
              onChange={(e) => setName(e.target.value)}
              pattern="^.*[a-zA-Z0-9]+.*$"
              placeholder="enter name vaccine"
            />
          </Form.Group>

          <Form.Group as={Col} controlId="type">
            <Form.Label>Type</Form.Label>
            <Form.Control
              type="text"
              value={type}
              onChange={(e) => setType(e.target.value)}
              pattern="^.*[a-zA-Z0-9]+.*$"
              required={true}
              placeholder="shot/mist/vaccine"
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="startDate">
            <Form.Label>Start Date (Available)</Form.Label>
            <Form.Control
              type="date"
              required={true}
              onChange={(e) => setStartDate(e.target.value)}
              value={startDate}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="endDate">
            <Form.Label>End Date (End Availability)</Form.Label>
            <Form.Control
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </Form.Group>
        </Row>

        <Form.Group className="mb-3" controlId="sideEffect">
          <Form.Label>Side Effect(s)</Form.Label>
          <Form.Control
            type="text"
            value={sideEffect}
            onChange={(e) => setSideEffect(e.target.value)}
            placeholder="list any side effect(s)"
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="origin">
            <Form.Label>Origin</Form.Label>
            <Form.Control
              type="text"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              pattern="^.*[a-zA-Z]+.*$"
              required={true}
              placeholder="enter origin of vaccine"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="price">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              pattern="^[0-9]*(.+)?$"
              required={true}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="enter price of vaccine"
            />
          </Form.Group>
          <Form.Group as={Col} controlId="doseRequired">
            <Form.Label>Dose Required</Form.Label>
            <Form.Control
              type="number"
              value={doseRequired}
              onChange={(e) => setDoseRequired(e.target.value)}
              pattern="^[0-9]*(.+)?$"
            />
          </Form.Group>
        </Row>

        <FloatingLabel controlId="otherInfo" label="Other Info">
          <Form.Control
            as="textarea"
            placeholder="enter other information"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
            style={{ height: '100px' }}
          />
        </FloatingLabel>

        <Row className="mt-2">
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
      </Form>

      <Toaster richColors />
    </div>
  );
};

export default Vaccines;
