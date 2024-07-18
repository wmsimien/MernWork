import React, { useEffect } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getVaccinesList } from '../../state/vaccine/vaccineActions';

import './healthFacilitiesListByZipTbl.css';

const HealthFacilitiesListByZipTbl = () => {
  const vaccines = useSelector((state) => state.vaccineReducer.vaccines);

  let location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // get list of vaccines
  const getAllVaccines = () => {
    dispatch(getVaccinesList());
  };

  const handleSelection = (id) => {
    navigate('/appointmentSelection', { state: { id, vaccines } });
  };

  useEffect(() => {
    getAllVaccines();
  }, []);

  return (
    <>
      <h1 className="heading">Select Health Facility</h1>
      <div className="table">
        <table>
          <thead>
            <tr>
              <td>Facility #</td>
              <td>Name</td>
              <td>Addres</td>
              <td>ZipCode</td>
              <td>Type</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {location.state.map((facility) => (
              <tr key={facility.healthFacId}>
                <td>{facility.healthFacId}</td>
                <td>{facility.name}</td>
                <td>{facility.address}</td>
                <td>{facility.zipCode}</td>
                <td>{facility.type}</td>
                <td>
                  <button
                    id={facility._id}
                    onClick={(e) => handleSelection(e.target.id)}
                  >
                    Select
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HealthFacilitiesListByZipTbl;
