import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Col, Form, Row } from 'react-bootstrap';

import { searchHealthFacilities } from '../../state/healthFacility/healthFacilityActions';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

import './appointment.css';

const AppointmentSearchZipCode = () => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  let searchList = [];
  // get search for health facilities by Zip Code
  const getListing = async () => {
    searchList = await searchHealthFacilities(search);

    if (searchList?.data) {
      if (searchList?.data.length === 0) {
        return toast.error(`No Results found for zip code ${search}.`, {
          position: 'top-center',
        });
      }
      navigate('/healthFacilitiesListByZipTbl', { state: searchList?.data });
    } else {
      return toast.error('Not Authorized', {
        position: 'top-center',
      });
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    getListing();
  };

  return (
    <>
      <div className="appt-search-container">
        <h1>Make Appointment</h1>
        <Form onSubmit={handleSearch}>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="name">
              <Form.Label>Enter Your or Health Facility Zip Code</Form.Label>
              <Form.Control
                type="text"
                required={true}
                pattern="^.*[a-zA-Z0-9]+.*$"
                placeholder="enter zip code"
                autoComplete="off"
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

export default AppointmentSearchZipCode;
