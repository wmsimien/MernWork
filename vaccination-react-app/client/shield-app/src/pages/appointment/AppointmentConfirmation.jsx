import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { getClientInfo } from "../../state/client/clientActions";
import { createAppointment } from "../../state/appointment/appointmentActions";

import "./appointment.css";

import { useDispatch, useSelector } from "react-redux";
import { getVaccineById } from "../../state/vaccine/vaccineActions";

const AppointmentConfirmation = () => {
  let location = useLocation();
  console.log("location: ", location.state);
  console.log("clientId: ", location.state.clientId);
  console.log("location: ", location);
  const clientInfo = useSelector((state) => state.clientReducer.client);

  const { vaccine } = useSelector((state) => state.vaccineReducer);
  console.log("vaccine object: ", vaccine);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [healthFacility, setHealthFacility] = useState({});
  const [appointmentDate, setAppointmentDate] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");

  // get client detail, health facility information
  const getClient = () => {
    dispatch(getClientInfo(location.state.clientId));
    setHealthFacility(location.state.healthFacility);
    setAppointmentDate(location.state.appDate);
    setAppointmentTime(location.state.appTime);
    // get complete vaccine information;
    dispatch(getVaccineById(location.state.vaccine));
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const clientAppointment = {
      client: clientInfo,
      appointmentDate,
      appointmentTime,
      healthFacility,
      vaccine,
      payment: "Paid w/ visa...",
    };

    // call dispatch for payment
    dispatch(createAppointment(clientAppointment));
    navigate("/payment");
  };

  useEffect(() => {
    getClient();
  }, []);

  return (
    <div className="confirm-container">
      <Card style={{ width: "700px", top: "50px" }} className="confirm-card">
        <Card.Header>
          Hello {clientInfo?.firstName} {clientInfo?.lastName},
        </Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Title>Confirmation of your vaccination appointment:</Card.Title>
          <Card.Text>
            <div>
              <span>
                Appointment Date:{"  "}
                {appointmentDate}
              </span>
              <br />
              <span>
                Appointment Time:{"  "}
                {appointmentTime} AM
              </span>
              <br />
              <span>
                Location:{"  "} {healthFacility.name} {healthFacility.address}
                {", "}
                {healthFacility.zipCode}
              </span>
              {vaccine && (
                <>
                  <br />
                  <span>
                    Selected vaccine :{" Name:  "}
                    {vaccine.name}
                    {", Price:  $"}
                    {vaccine.price}
                    {", Type:  "}
                    {vaccine.type}
                    {", Dose Required:  "}
                    {vaccine.doseRequired}
                  </span>
                </>
              )}
            </div>
          </Card.Text>

          <Button onClick={handleSubmit} variant="primary">
            Make Payment
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default AppointmentConfirmation;
