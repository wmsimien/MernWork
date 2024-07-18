import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Table from 'react-bootstrap/Table';

import {
  getAllAppointments,
  updateAppointment,
  sendEmailNotification,
} from '../../state/appointment/appointmentActions';

import './appointmentListing.css';

const AppointmentListing = () => {
  const appointments = useSelector(
    (state) => state.appointmentListingReducer.appointments
  );

  const [status, setStatus] = useState('');

  const dispatch = useDispatch();

  const getAppointmentListings = () => {
    dispatch(getAllAppointments());
  };

  const handleCancel = (id) => {
    setStatus('Cancel');
    handleAppointmentUpdate(id, 'Cancel');
  };

  const handleApproval = (id) => {
    setStatus('Approve');
    handleAppointmentUpdate(id, 'Approve');
  };

  const handleVaccinated = (id) => {
    setStatus('Vaccinated');
    handleAppointmentUpdate(id, 'Vaccinated');
  };

  const handleAppointmentUpdate = (id, status) => {
    dispatch(updateAppointment(id, status));
    dispatch(sendEmailNotification(id, status));
  };

  useEffect(() => {
    getAppointmentListings();
  }, [status]);

  return (
    <div>
      <h1 className="apptHeading">Appointment Listing</h1>
      {appointments && (
        <Table className="apptTbl" striped bordered hover size="sm">
          <thead>
            <tr>
              <td>
                Appt Date &<br /> Time
              </td>
              <td>
                Appt <br />
                ID
              </td>
              <td>Client Name</td>
              <td>
                Vaccine <br />
                Info
              </td>
              <td>Health Facility</td>
              <td>Payment</td>
              <td>Status</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a) => (
              <tr key={a.apptId}>
                <td>
                  {a.appointmentDate.substring(0, 10)}
                  <br />
                  {a.appointmentTime}
                </td>
                <td>{a.apptId}</td>
                <td>
                  {a.client.firstName} {a.client.lastName}
                </td>
                <td>
                  {a.vaccine.name}
                  {', '}
                  {a.vaccine.type}
                  <br />
                  {'  $'}
                  {a.vaccine.price}
                  {', '}
                  {a.vaccine.origin}
                  {'; '}
                  {a.vaccine.doseRequired}
                </td>
                <td>
                  {a.healthFacility.name}
                  {', '}
                  <br />
                  {a.healthFacility.address} {', '}
                  {a.healthFacility.zipCode}
                </td>
                <td>{a.payment}</td>
                <td>{a.status}</td>
                <td colSpan={2}>
                  <button
                    id={a.apptId}
                    onClick={(e) => handleApproval(e.target.id)}
                  >
                    Approve
                  </button>
                  <button
                    id={a.apptId}
                    onClick={(e) => handleCancel(e.target.id)}
                  >
                    Cancel
                  </button>
                  <button
                    id={a.apptId}
                    onClick={(e) => handleVaccinated(e.target.id)}
                  >
                    Vaccinated
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AppointmentListing;
