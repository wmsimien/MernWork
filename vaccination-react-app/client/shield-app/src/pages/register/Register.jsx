import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './register.css';
import FormInput from '../../components/form/FormInput';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

import { register } from '../../state/client/clientActions';

const Register = () => {
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    username: '',
    password: '',
    age: '',
    conceptName: '',
    profession: '',
    contactName: '',
    contactNumber: '',
    address: '',
    disease: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'firstName',
      type: 'text',
      placeholder: 'Enter first name',
      errorMessage:
        "First name should be 1-16 characters and shouldn't include any special character!",
      label: 'First Name',
      pattern: '^[A-Za-z]{3,16}$',
      required: true,
    },
    {
      id: 2,
      name: 'lastName',
      type: 'text',
      placeholder: 'Enter last name',
      errorMessage:
        "Username should be 1-16 characters and shouldn't include any special character!",
      label: 'Last Name',
      pattern: '^[A-Za-z]{3,16}$',
      required: true,
    },
    {
      id: 3,
      name: 'username',
      type: 'text',
      placeholder: 'Username',
      errorMessage:
        "Username should be 3-16 characters and shouldn't include any special character!",
      label: 'Username',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 4,
      name: 'password',
      type: 'password',
      placeholder: 'Enter password',
      errorMessage:
        'Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!',
      label: 'Password',
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: 'age',
      type: 'number',
      placeholder: 'Enter age',
      errorMessage: 'Age should be entered!',
      label: 'Age',
      required: true,
    },
    {
      id: 6,
      name: 'conceptName',
      type: 'radio',
      required: true,
    },
    {
      id: 7,
      name: 'gender',
      type: 'radio',
      required: true,
    },
    {
      id: 8,
      name: 'profession',
      type: 'text',
      placeholder: 'Enter profession',
      label: 'Profession',
      required: false,
    },
    {
      id: 9,
      name: 'email',
      type: 'email',
      placeholder: 'Enter email',
      label: 'Email',
      required: false,
    },
    {
      id: 10,
      name: 'contactName',
      type: 'text',
      placeholder: 'Enter contact person full name',
      label: 'Contact Full Name',
      required: false,
    },
    {
      id: 11,
      name: 'contactNumber',
      type: 'tel',
      placeholder: '1234056789',
      label: 'Contact Number',
      // pattern: `^(+d{1,2}s?)?(?d{3})?[s.-]?d{3}[s.-]?d{4}$`,
      required: false,
    },
    {
      id: 12,
      name: 'address',
      type: 'text',
      placeholder: 'Enter address',
      label: 'Address',
      required: false,
    },
    {
      id: 13,
      name: 'disease',
      type: 'text',
      placeholder: 'polio, diabetes',
      label: 'List Any Disease',
      required: false,
    },
  ];

  // const { client } = useSelector((state) => state.clientRegisterReducer);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createClient = () => {
    dispatch(register({ ...values }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    createClient();
    navigate('/login');
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="wrapper">
      <form className="reg-form" onSubmit={handleSubmit}>
        <h1 className="register-title">Register</h1>
        <div className="input-box">
          {inputs.map((input) => (
            <FormInput
              className="input-field"
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          ))}
        </div>
        <button className="button">Submit</button>
      </form>
      <Row style={{ marginTop: '4px' }}>
        <Col>
          Already have an Account ? <Link to="/login">Sign In</Link>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
