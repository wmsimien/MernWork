import { useState } from 'react';

import FormInput from '../../components/form/FormInput';

import './healthFacilities.css';

const HealthFacilities = () => {
  const [values, setValues] = useState({
    name: '',
    type: '',
    address: '',
    charges: '',
    active: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Enter health facility name',
      errorMessage: 'Health facility name should be at lease one character!',
      label: 'Health Facility Name',
      pattern: '^[A-Za-z0-9]{1}$',
      required: true,
    },
    {
      id: 2,
      name: 'type',
      type: 'text',
      placeholder: 'Enter Govt or Private',
      errorMessage: 'Health Facility type should be Govt or Private!',
      label: 'Type',
      pattern: '^[A-Za-z]{3,16}$',
      required: true,
    },
    {
      id: 3,
      name: 'address',
      type: 'text',
      placeholder: 'Enter address of health facility',
      errorMessage: 'Health facility address should be entered!',
      label: 'Address',
      pattern: '^[A-Za-z0-9]{3,16}$',
      required: true,
    },
    {
      id: 4,
      name: 'charges',
      type: 'text',
      placeholder: 'Assign fee schedule',
      errorMessage: 'Select fee schedule!',
      label: 'Charges',
      required: false,
    },
    {
      id: 5,
      name: 'active',
      type: 'checkbox',
      label: 'Active',
      required: false,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="health">
      <form onSubmit={handleSubmit}>
        <h1>Add Heath Facility</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={handleChange}
          />
        ))}
        <button>Submit</button>
      </form>
    </div>
  );
};

export default HealthFacilities;
