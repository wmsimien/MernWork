import React, { useState } from "react";

import { useLocation } from "react-router-dom";

import "./healthFacilitiesListByZip.css";

const HealthFacilitiesListByZip = ({ list }) => {
  let location = useLocation();

  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [address, setAddress] = useState("");
  const [charges, setCharges] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [active, setActive] = useState("");

  console.log("list of HFs: ", location.state);

  const handleSelection = (e) => {
    // e.preventDefault();
    console.log("select: ", e);
  };

  return (
    <div className="card-container">
      {location.state.map((facility) => (
        <div key={facility.healthFacId} className="card">
          <div className="card-content">
            <h3>
              {facility.name} <span>Facility ID {facility.healthFacId}</span>
            </h3>
            <p>{facility.address}</p>
            <p>{facility.type}</p>
          </div>
          <hr className="dash"></hr>
          <button
            id={facility.healthFacId}
            onClick={(e) => handleSelection(e.target.id)}
            className="btn"
          >
            Select
          </button>
        </div>
      ))}
    </div>
  );
};

export default HealthFacilitiesListByZip;
