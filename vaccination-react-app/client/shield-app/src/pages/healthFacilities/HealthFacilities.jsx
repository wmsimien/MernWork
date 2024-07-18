import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../../components/form/FormInput';

import './healthFacilities.css';

//https://sonner.emilkowal.ski/toast
import { toast, Toaster } from 'sonner';

import { createHealthFacility } from '../../state/healthFacility/healthFacilityActions';

const HealthFacilities = () => {
  const [values, setValues] = useState({
    name: '',
    type: '',
    address: '',
    zipCode: '',
    charges: '',
  });

  const inputs = [
    {
      id: 1,
      name: 'name',
      type: 'text',
      placeholder: 'Enter health facility name',
      errorMessage: 'Health facility name should be at lease one character!',
      label: 'Health Facility Name',
      pattern: '^.*[a-zA-Z0-9]+.*$',
      required: true,
    },
    {
      id: 2,
      name: 'type',
      type: 'text',
      placeholder: 'Enter Govt or Private',
      errorMessage: 'Health Facility type should be Govt or Private!',
      label: 'Type',
      pattern: '^.*[a-zA-Z0-9]+.*$',
      required: true,
    },
    {
      id: 3,
      name: 'address',
      type: 'text',
      placeholder: 'Enter address of health facility',
      errorMessage: 'Health facility address should be entered!',
      label: 'Address',
      pattern: '^.*[a-zA-Z0-9]+.*$',
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
      name: 'zipCode',
      type: 'text',
      placeholder: 'Enter zip code of health facility',
      errorMessage: 'Health facility address should be entered!',
      label: 'Zip Code',
      pattern: '^.*[0-9]+.*$',
      required: true,
    },
  ];

  const isLoading = useSelector((state) => state.healthFacilityReducer);

  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(createHealthFacility(values));

    if (isLoading?.success) {
      setValues({ name: '' });
      setValues({ type: '' });
      setValues({ address: '' });
      setValues({ charges: '' });
      setValues({ zipCode: '' });

      return toast.success(
        `Health Facility, ${values['name']}, has been added.`,
        {
          position: 'top-center',
        }
      );
    } else {
      return toast.error(`Not Authorized`, {
        position: 'top-center',
      });
    }
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="health-container">
      <h1>Add Health Facility</h1>
      <form onSubmit={handleSubmit}>
        <div className="health-inputs">
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={handleChange}
            />
          ))}
        </div>
        <button className="health-bth">Add</button>
        <Toaster richColors />
      </form>
    </div>
  );
};

export default HealthFacilities;
