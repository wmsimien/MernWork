import React, { useEffect, useState, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { Button, Col, Form, Row } from 'react-bootstrap';

import { getByFacilityId } from '../../state/healthFacility/healthFacilityActions';

import './appointmentSelection.css';

import AuthContext from '../../context/AuthContext';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

const AppointmentSelection = () => {
  // read value out of context
  const { getLoggedIn } = useContext(AuthContext);

  const healthFacility = useSelector(
    (state) => state.healthFacilityReducer.healthFacility
  );

  const vaccineOptions = useSelector((state) => state.vaccineReducer.vaccines);
  console.log('vaccineOptions: ', vaccineOptions);
  const clientId = useSelector((state) => state.clientSignInReducer.client);
  console.log('clientId: ', clientId);

  const [appDate, setAppDate] = useState('');
  const [appTime, setAppTime] = useState('');
  const [vaccine, setVaccine] = useState('');

  let location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let currentDate = new Date();
  let startDate = currentDate.toLocaleString().split(',')[0];
  let timeSlots = [
    '8:45',
    '9:00',
    '9:15',
    '9:30',
    '9:45',
    '10:00',
    '10:15',
    '10:30',
    '10:45',
    '11:00',
    '11:15',
    '11:45',
  ];

  // Get Name of selected health facility
  const getSelectedName = () => {
    dispatch(getByFacilityId(location.state.id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // selected date
    let aYear = appDate.split('-')[0];
    let aMonth = appDate.split('-')[1];
    let aDate = appDate.split('-')[2];

    // selected must be greater than current data
    if (
      aYear >= currentDate.getFullYear() &&
      aMonth - 1 >= currentDate.getMonth() &&
      aDate > currentDate.getDate()
    ) {
    } else {
      return toast.error('Invalid date selected date selected.', {
        position: 'top-center',
      });
    }
    console.log('selected vaccine: ', vaccine);
    // confirm appoint on next screen and make payment
    navigate('/appointmentConfirmation', {
      state: {
        clientId: clientId.id,
        healthFacility,
        appDate,
        appTime,
        vaccine,
        vaccineOptions,
      },
    });
  };

  useEffect(() => {
    getSelectedName();
  }, []);

  useEffect(() => {
    getLoggedIn();
  }, []);

  return (
    <>
      {healthFacility && (
        <>
          <h1 className="heading-one">
            Selected Health Facility Location
            <em>
              {' : '}
              (#{healthFacility.healthFacId}) {healthFacility.name}
              {' , '}
              {healthFacility.address}
            </em>
          </h1>
          <h2 className="heading-two">
            Select Appointment Date, Time and Vaccine
          </h2>
          <div className="appt-select-container">
            <Form className="appt-form">
              <Row className="mb-4">
                <Form.Group as={Col} controlId="date">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={startDate}
                    onChange={(e) => setAppDate(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="timeSlot">
                  <Form.Label>Select Appointment Time</Form.Label>
                  <Form.Select
                    aria-label="Select an appointment time"
                    onChange={(e) => setAppTime(e.target.value)}
                  >
                    <option>Select An Appoitment Time</option>
                    {timeSlots.map((t, index) => (
                      <option className="timeSlot" key={index + 1} value={t}>
                        {t}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="vaccine">
                  <Form.Label>Select Vaccine</Form.Label>
                  <Form.Select
                    aria-label="Select a vaccine"
                    onChange={(e) => setVaccine(e.target.value)}
                  >
                    <option>Select A Vaccine</option>
                    {vaccineOptions.map((opt, index) => (
                      <option
                        className="vaccine"
                        key={index + 1}
                        value={opt.id}
                        id={opt.id}
                      >
                        {opt.value}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Row>

              <Button
                className="apptBtn"
                onClick={handleSubmit}
                variant="primary"
                type="submit"
              >
                Confirm
              </Button>
            </Form>
            <Toaster richColors />
          </div>
        </>
      )}
    </>
  );
};

export default AppointmentSelection;
