import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Col, Row, InputGroup } from 'react-bootstrap';

import {
  updateClientInfo,
  getClientInfoForEdit,
} from '../../state/client/clientActions';
import './clients.css';

//https://sonner.emilkowal.ski/toast
import { Toaster } from 'sonner';

const Clients = () => {
  const clientId = useSelector(
    (state) => state.clientSignInReducer?.client?.id
  );

  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [conceptName, setConceptName] = useState('');
  const [profession, setProfession] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [address, setAddress] = useState('');
  const [disease, setDisease] = useState('');
  const [email, setEmail] = useState('');

  const [validated, setValidated] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const updatedClient = {
      firstName,
      lastName,
      username,
      password,
      age,
      gender,
      conceptName,
      profession,
      contactName,
      contactNumber,
      address,
      disease,
      email,
    };

    dispatch(updateClientInfo(clientId, updatedClient));

    setValidated(true);
  };

  useEffect(() => {
    const getClientForEdit = async () => {
      const edits = await getClientInfoForEdit(clientId);
      console.log('edits: ', edits);
      if (edits) {
        setFirstName(edits.data.firstName);
        setLastName(edits.data.lastName);
        setUsername(edits.data.username);
        setPassword('');
        setAge(edits.data.age);
        setGender(edits.data.gender);
        setConceptName(edits.data.conceptName);
        setProfession(edits.data.profession);
        setContactName(edits.data.contactName);
        setContactNumber(edits.data.contactNumber);
        setAddress(edits.data.address);
        setDisease(edits.data.disease);
        setEmail(edits.data.email);
      }
    };

    getClientForEdit();
  }, [clientId]);

  return (
    <>
      <div className="clients">
        <h1>Client Information</h1>
        <Form onSubmit={handleSubmit} noValidate validated={validated}>
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  pattern="^[A-Za-z]{3,16}$"
                  required={true}
                  value={firstName}
                  placeholder="First name"
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  pattern={'^[A-Za-z]{3,16}$'}
                  required={true}
                  value={lastName}
                  placeholder="Last name"
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  required={true}
                  value={username}
                  pattern={'^[A-Za-z0-9]{3,16}$'}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <InputGroup hasValidation>
                  <Form.Control
                    type="password"
                    required={true}
                    pattern={`^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`}
                    value={password}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Form.Control.Feedback type="invalid">
                    Password is required
                  </Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="age">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  required={true}
                  value={age}
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <fieldset>
                <Form.Group>
                  <Form.Label as="legend" column>
                    Select One
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      id="months"
                      label="Month(s)"
                      name="conceptName"
                      value="months"
                      checked={conceptName === 'months'}
                      onChange={(e) => setConceptName(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      id="years"
                      name="conceptName"
                      label="Year(s)"
                      value="years"
                      checked={conceptName === 'years'}
                      onChange={(e) => setConceptName(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Col>
            <Col>
              <fieldset>
                <Form.Group>
                  <Form.Label as="legend" column>
                    Select One
                  </Form.Label>
                  <Col sm={10}>
                    <Form.Check
                      type="radio"
                      id="male"
                      label="Male"
                      name="gender"
                      value="Male"
                      checked={gender === 'Male'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                    <Form.Check
                      type="radio"
                      id="female"
                      name="gender"
                      label="Female"
                      value="Female"
                      checked={gender === 'Female'}
                      onChange={(e) => setGender(e.target.value)}
                    />
                  </Col>
                </Form.Group>
              </fieldset>
            </Col>
          </Row>
          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              type="text"
              value={address}
              placeholder="Complete Address"
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Row>
            <Col>
              <Form.Group controlId="profession">
                <Form.Label>Profession</Form.Label>
                <Form.Control
                  type="text"
                  value={profession}
                  placeholder="Profession"
                  onChange={(e) => setProfession(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  placeholder="Enter email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="contactName">
                <Form.Label>Contact Name</Form.Label>
                <Form.Control
                  type="text"
                  value={contactName}
                  placeholder="Contact full name"
                  onChange={(e) => setContactName(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="contactNumber">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control
                  type="text"
                  value={contactNumber}
                  placeholder="Contact Number"
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group controlId="disease">
            <Form.Label>Disease(s)</Form.Label>
            <Form.Control
              type="text"
              value={disease}
              placeholder="heart diseast, diabetes, "
              onChange={(e) => setDisease(e.target.value)}
            />
          </Form.Group>

          <Button className="client-btn" variant="primary" type="submit">
            Submit
          </Button>
          <Toaster richColors />
        </Form>
      </div>
    </>
  );
};

export default Clients;
